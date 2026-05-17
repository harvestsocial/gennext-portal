import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const templatesDir = join(root, "templates");
const publicDir = join(root, "public");
const outDir = join(root, "dist");

function readTemplate(templatePath) {
  return readFileSync(join(templatesDir, templatePath), "utf8");
}

function renderIncludes(source) {
  return source.replace(/\{%\s*include\s+'([^']+)'\s*%\}/g, (_, includePath) => {
    return renderIncludes(readTemplate(includePath));
  });
}

function extractBlocks(source) {
  const blocks = new Map();
  const blockPattern = /\{%\s*block\s+([a-zA-Z0-9_]+)\s*%\}([\s\S]*?)\{%\s*endblock\s*%\}/g;
  for (const match of source.matchAll(blockPattern)) {
    blocks.set(match[1], match[2].trim());
  }
  return blocks;
}

function renderPage(templatePath) {
  const page = readTemplate(templatePath);
  const layoutMatch = page.match(/\{%\s*extends\s+'([^']+)'\s*%\}/);

  if (!layoutMatch) {
    return stripTwig(renderIncludes(page));
  }

  let html = renderIncludes(readTemplate(layoutMatch[1]));
  const blocks = extractBlocks(page);

  for (const [name, content] of blocks) {
    const blockPattern = new RegExp(`\\{%\\s*block\\s+${name}\\s*%\\}[\\s\\S]*?\\{%\\s*endblock\\s*%\\}`, "g");
    html = html.replace(blockPattern, content);
  }

  html = stripTwig(html);
  html = html.replace(/\s*$/, "");

  if (!/<\/body>/i.test(html)) {
    html += "\n</body>";
  }

  if (!/<\/html>/i.test(html)) {
    html += "\n</html>";
  }

  return `${html}\n`;
}

function stripTwig(source) {
  return source
    .replace(/\{%\s*block\s+[a-zA-Z0-9_]+\s*%\}/g, "")
    .replace(/\{%\s*endblock\s*%\}/g, "")
    .replace(/\{%\s*extends\s+'[^']+'\s*%\}/g, "")
    .replace(/\{#([\s\S]*?)#\}/g, "");
}

function outputName(templatePath) {
  return basename(templatePath, ".html.twig") + ".html";
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const assetsDir = join(publicDir, "assets");
if (existsSync(assetsDir)) {
  cpSync(assetsDir, join(outDir, "assets"), {
    recursive: true,
    filter: (source) => !source.endsWith(".php"),
  });
}

const pages = readdirSync(templatesDir)
  .filter((file) => file.endsWith(".html.twig"))
  .filter((file) => file !== "base.html.twig");

for (const page of pages) {
  const target = join(outDir, outputName(page));
  writeFileSync(target, renderPage(page));
  console.log(`Rendered ${page} -> ${target}`);
}
