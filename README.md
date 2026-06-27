# tessio-website

Apex marketing site for **tessio.eu** — the Tessio company landing.

Built with Astro 5 + Tailwind v4. Deployed to GitHub Pages with a custom domain
(`tessio.eu`). Sibling to the OSS verifier site at
[verifier.tessio.eu](https://verifier.tessio.eu)
([repo](https://github.com/tripledownab/tessio-verifier)).

## Local dev

```bash
npm ci
npm run dev      # http://localhost:4321 with hot reload
```

## Production build

```bash
npm run build    # outputs static site to ./dist
npm run preview  # serve the production build locally
```

## Design tokens

Shared with the verifier site via `src/styles/tessio-design.css` — currently a
copy-paste sibling of the verifier's file. Once both sites are live we'll
extract this to `@tripledownab/tessio-design` on GitHub Packages and import it
from both sites.

## Deploy

Pushing to `main` runs `.github/workflows/site.yml` → builds with Node 22 →
publishes to GitHub Pages. `public/CNAME` pins the custom domain.

DNS for the apex needs the four GitHub Pages A records pointing at
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
