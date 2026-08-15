# Prompt — enhance the Tessio site with SEO page systems

Paste this as a session kickoff. Goal: add the proven SEO page systems (the ones Quaterio uses) to the Tessio marketing site, adapted for a regulated-B2B age/identity verification product.

## Read first
1. `~/Work/Quaterio/MARKETING-PLAN.md §2` (SEO) and `MARKETING-TODO.md` — the template. It uses a data-driven approach (all data in one file, thin page wrappers) for `/compare`, `/use-cases`, `/for`, etc.
2. `~/Work/marketing-engine/docs/engine-spec.md` — the reusable framework and rules.
3. This repo: `src/pages/index.astro`, `src/pages/docs.astro`, `src/layouts/Base.astro` (SEO head + JSON-LD pattern), `src/components/Header.astro` + `Footer.astro`, `src/consts.ts`, the design tokens in `src/styles/`. Reuse all of these.
4. Positioning + market: `~/Work/Tessio Provenance/tessio-cloud/outreach/` (segments, one-pager) and `~/Work/Tessio Provenance/tessio-cloud/planning/tessio-cloud-spec.md`.

## Stack
Astro 5, Tailwind v4, GitHub Pages, EU-blue design system. Sitemap already via `@astrojs/sitemap`. Existing pages: `/` (landing) and `/docs` (developer guide).

## What to build (data-driven, thin Astro wrappers + shared layout components)

**1. `/compare/[competitor]`** — honest comparison pages. Competitors: Yoti, Veriff, Onfido/Entrust, Persona, Sumsub, iDenfy, AgeChecked, VerifyMy, GBG. Tessio's angle: EUDI-native, privacy-first (no PII stored), .NET-native and self-hostable, ready for the wallet rollout. Include an honest "when to choose them over us" section (builds trust, ranks better). One `comparison-data.ts`, thin page wrappers, a shared `ComparisonLayout`.
Targets BOFU: "[competitor] alternative", "age verification api".

**2. `/use-cases/[case]`** — problem, before/after, how it works, code snippet, CTA. Cases: iGaming, age-restricted retail (nicotine/vape/alcohol), dating, adult platforms, social/UGC. Each targets "age verification for [vertical]" and "[vertical] age assurance".

**3. `/for/[role]`** — solve the dual-audience problem in the site structure. `/for/developers` (leads with the API, curl, the /docs link), `/for/compliance` (DPO/compliance/legal: no PII, GDPR posture, audit), `/for/platform-providers` (channel: add EUDI age verification as a module for your operators).

**4. Regulation landing pages** — high intent. `/osa` (UK Online Safety Act age assurance), `/dsa` (EU DSA age assurance), `/eudi` (EU Digital Identity Wallet, what relying parties need). These rank for "OSA age verification", "DSA age assurance".

**5. Optional: `/docs/api`** — a rendered API reference (Scalar or Redoc) from a curated public subset of `docs/openapi.yaml` (public integration endpoints only, not internal/admin). Half-day; see the earlier discussion.

## Keyword tiers
- BOFU (build first): "age verification api", "EUDI age verification", "OSA age assurance", "[competitor] alternative", "privacy-first age verification".
- MOFU: "how to verify age online without storing ID", "age verification for iGaming", "GDPR compliant age check".
- TOFU (blog, later): "what is the EU Digital Identity Wallet", "how does EUDI age verification work".

## SEO checklist (per page)
- Keyword-first `<title>` + meta description via the `Base.astro` props.
- Per-page JSON-LD: `Product` / `FAQPage` / `BreadcrumbList` (reuse the `Base.astro` head slot pattern from `docs.astro`).
- OG image + Twitter card (already handled in `Base.astro`).
- Internal links between compare / use-case / for / docs pages.
- Sitemap picks new pages up automatically. Confirm.
- Honest comparison tables with visible checks, no blank cells.

## Constraints
- Reuse `Base.astro`, `Header.astro`, `Footer.astro`, `consts.ts`, and the EU-blue tokens. Add `Header`/`Footer` nav links to the new hubs.
- Voice = `~/Work/marketing-engine/voice/house-prose-rules.md`, the canonical file for every brand. Read it; do not work from this summary. In short: no em dashes or en dashes, no Oxford comma, no compound-adjective hyphens (but nouns like `sign-up` keep theirs, and never rewrite a slug such as `/use-cases`), contractions at roughly 5 per 1000 words rather than uniformly, honest about competitors, only real traction. The file also carries the AI tell list and the greps that check a draft. Was `~/Work/Quaterio/MARKETING-PLAN.md §11`, which now points at the same place.
- Accuracy: it is invite-only, sandbox today, wallets rolling out 2026-2027. Do not overclaim. Verify regulatory dates against primary EU sources before putting them in copy (wallets available ~December 2026, relying-party acceptance ~December 2027; confirm).
- Do not invent competitor pricing/features. Balanced comparisons only.

## Sequencing
BOFU first (`/compare/*`, `/use-cases/*`, `/osa`), then `/for/*`, then TOFU blog. Ship a shared layout component per page system before filling in many pages. Build locally, verify the build, then one PR.
