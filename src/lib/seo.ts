// Shared SEO helpers for the data-driven page systems (compare, use-cases, for, regulations).
// JSON-LD builders keep every page's structured data consistent and absolute-URL correct.
const SITE = 'https://tessio.eu';

/** Turn a root-relative path into an absolute URL. Passes through absolute URLs. */
export function abs(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE}${path.startsWith('/') ? '' : '/'}${path}`;
}

export interface Crumb {
  name: string;
  path: string;
}

/** schema.org BreadcrumbList from an ordered trail of crumbs. */
export function breadcrumbLd(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export interface Faq {
  q: string;
  a: string;
}

/** schema.org FAQPage from a list of question/answer pairs. */
export function faqLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** schema.org ItemList for a hub page that links out to a set of pages. */
export function itemListLd(name: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: abs(it.path),
    })),
  };
}

/**
 * schema.org Service for a page positioning Tessio.Cloud against a query.
 *
 * Service, not Product. Google requires a Product to carry offers, review or aggregateRating, and
 * Search Console reported ours as a critical error for lacking all three. We cannot honestly supply
 * any of them: Tessio.Cloud is not free, its pricing is not published, and it has no reviews. The
 * fix is to describe what it actually is, a hosted API, rather than to invent a price. Service has
 * no such requirement. Revisit if pricing goes public: a real Offer would make Product valid.
 */
export function serviceLd(opts: { name: string; description: string; url: string; category?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: abs(opts.url),
    provider: { '@type': 'Organization', name: 'Tessio', url: 'https://tessio.eu' },
    serviceType: opts.category ?? 'Age and identity verification API',
    areaServed: { '@type': 'Place', name: 'European Union' },
  };
}

/**
 * schema.org DefinedTerm for a glossary entry.
 *
 * The short one-sentence definition goes in `description`, deliberately, rather than the full page
 * text. This is the field that gets lifted into a search or assistant answer, so it has to be the
 * sentence that stands on its own.
 */
export function definedTermLd(opts: {
  name: string;
  alternateName: string[];
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: opts.name,
    alternateName: opts.alternateName,
    description: opts.description,
    url: abs(`/glossary/${opts.slug}`),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Tessio glossary of EU digital identity terms',
      url: abs('/glossary'),
    },
  };
}

/** schema.org DefinedTermSet for the glossary hub. */
export function definedTermSetLd(terms: { name: string; description: string; slug: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Tessio glossary of EU digital identity terms',
    url: abs('/glossary'),
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.name,
      description: t.description,
      url: abs(`/glossary/${t.slug}`),
    })),
  };
}

/** Combine several JSON-LD nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.map((n) => {
      // Drop the per-node @context now that the graph carries it.
      const { ['@context']: _ctx, ...rest } = n as Record<string, unknown>;
      return rest;
    }),
  };
}
