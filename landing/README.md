# Generation Next Landing

Symfony/Twig landing page for Generation Next.

## Vercel deploy

This project builds to static HTML for Vercel.

```bash
npm run build
```

Vercel uses `vercel.json`:

- Build command: `npm run build`
- Output directory: `dist`
- Clean URLs: enabled

The static build renders the Twig templates from `templates/` and copies `public/assets/` into `dist/assets/`. PHP files are excluded from the static export because Vercel does not execute PHP in a static deployment.

## Local setup

```bash
composer install
symfony server:start
```

The homepage template is `templates/index.html.twig`.

## Included

- `templates/` with the updated Generation Next homepage
- `public/assets/` with all images, CSS, JavaScript, and speaker photos
- `src/`, `config/`, `bin/`, Composer files, and Symfony lock files
- Safe `.env` defaults for local setup

## Ignored

`vendor/`, runtime cache/logs, `.git/`, and local machine files are excluded from this upload folder.
