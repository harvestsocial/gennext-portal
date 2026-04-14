import re

html_path = '/Users/harvestsocial/Downloads/gennext_new/HTML Template/index.html'
with open(html_path, 'r') as f:
    html = f.read()

# Extract head and body
head_match = re.search(r'<head>(.*?)</head>', html, re.DOTALL)
body_match = re.search(r'<body>\s*<div class="page-wrapper">(.*?)</div>\s*<!--End pagewrapper-->', html, re.DOTALL)

head_str = head_match.group(1) if head_match else ""
body_str = body_match.group(1) if body_match else ""

# Replace paths in head
# head_str = head_str.replace('assets/', '/assets/')
# We need to extract all css/js links and inject them into public/index.html
css_links = re.findall(r'<link.*?href="(assets/css/.*?)".*?>', head_str)

js_links = re.findall(r'<script src="(assets/js/.*?)".*?></script>', html)

# Modify React's index.html
react_index_path = '/Users/harvestsocial/Downloads/gennext portal/daevnt-react/index.html'
with open(react_index_path, 'r') as f:
    react_index = f.read()

# Create tags
css_tags = "\n".join([f'  <link rel="stylesheet" href="/{link}">' for link in css_links])
js_tags = "\n".join([f'  <script src="/{link}"></script>' for link in js_links])

react_index = react_index.replace('</head>', f'{css_tags}\n</head>')
react_index = react_index.replace('</body>', f'{js_tags}\n</body>')

with open(react_index_path, 'w') as f:
    f.write(react_index)

# Modify body to be a valid innerHTML string
body_str = body_str.replace('`', '\\`')
body_str = body_str.replace('assets/images', '/assets/images')
# For safety, replace some simple structural things
# body_str = body_str.replace('index.html', '/')
body_str = body_str.replace('https://www.gennextmovement.com/register', '/registration')

# Write to NewHome.tsx
component = f"""
import React, {{ useEffect }} from 'react';

const NewHome: React.FC = () => {{
  useEffect(() => {{
    // Re-initialize any jQuery/Template scripts if needed
    // Assuming the template scripts automatically run on load, 
    // but React routing might need a page reload.
    // Window reload to ensure scripts run on first load if coming from another path.
  }}, []);

  return (
    <div className="page-wrapper" dangerouslySetInnerHTML={{{{ __html: `{body_str}` }}}} />
  );
}};

export default NewHome;
"""

with open('/Users/harvestsocial/Downloads/gennext portal/daevnt-react/src/pages/NewHome.tsx', 'w') as f:
    f.write(component)

print("Conversion finished.")
