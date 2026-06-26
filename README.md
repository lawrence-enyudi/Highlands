# Jewel Highlands Web

Static real-estate website for Jewel Villafranca.

## Local development

```bash
npm install
npm run dev
```

## Publish on GitHub Pages

1. Create a public repository on GitHub.
2. Push this project to the repository.
3. In the repository settings, enable GitHub Pages using GitHub Actions.
4. The workflow in `.github/workflows/deploy-pages.yml` builds the site and publishes the `dist/` output.

## Scripts

- `npm run dev` starts the local dev server.
- `npm run build` creates the production build.
- `npm run preview` previews the production build locally.