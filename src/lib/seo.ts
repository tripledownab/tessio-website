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

/** schema.org Product for a page positioning Tessio Cloud against a query. */
export function productLd(opts: { name: string; description: string; url: string; category?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    url: abs(opts.url),
    brand: { '@type': 'Brand', name: 'Tessio' },
    category: opts.category ?? 'Age and identity verification API',
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
