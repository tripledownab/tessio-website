// Internal-linking helpers. These turn slugs into consistent {label, href, note} link items and
// build the "related" blocks that tie the compare / use-case / for / regulation systems together.
import { COMPARISONS, type Comparison } from '../data/comparisons';
import { USE_CASES, type UseCase } from '../data/use-cases';
import { ROLES } from '../data/roles';
import { REGULATIONS, type Regulation } from '../data/regulations';

export interface LinkItem {
  label: string;
  href: string;
  note?: string;
}

export function compareLink(slug: string): LinkItem | null {
  const c = COMPARISONS.find((x) => x.slug === slug);
  return c ? { label: `Tessio vs ${c.name}`, href: `/compare/${c.slug}`, note: c.category } : null;
}

export function useCaseLink(slug: string): LinkItem | null {
  const u = USE_CASES.find((x) => x.slug === slug);
  return u ? { label: `Age verification for ${u.name}`, href: `/use-cases/${u.slug}`, note: u.category } : null;
}

export function roleLink(slug: string): LinkItem | null {
  const r = ROLES.find((x) => x.slug === slug);
  return r ? { label: `Tessio for ${r.name.toLowerCase()}`, href: `/for/${r.slug}`, note: r.audience } : null;
}

export function regulationLink(slug: string): LinkItem | null {
  const r = REGULATIONS.find((x) => x.slug === slug);
  return r ? { label: r.name, href: `/${r.slug}`, note: r.category } : null;
}

export const DOCS_LINK: LinkItem = { label: 'Developer docs', href: '/docs', note: 'The age verification API' };

function resolve(items: (LinkItem | null)[]): LinkItem[] {
  return items.filter((x): x is LinkItem => x !== null);
}

// Two sibling comparisons, skipping the current one.
function siblingComparisons(slug: string, count = 2): (LinkItem | null)[] {
  return COMPARISONS.filter((x) => x.slug !== slug)
    .slice(0, count)
    .map((x) => compareLink(x.slug));
}

export function relatedForComparison(c: Comparison): LinkItem[] {
  return resolve([
    ...(c.useCases ?? []).map(useCaseLink),
    ...siblingComparisons(c.slug),
    DOCS_LINK,
  ]);
}

export function relatedForUseCase(u: UseCase): LinkItem[] {
  return resolve([
    ...u.regulations.map(regulationLink),
    ...u.compare.slice(0, 2).map(compareLink),
    roleLink('compliance'),
    DOCS_LINK,
  ]);
}

export function relatedForRole(slug: string): LinkItem[] {
  const r = ROLES.find((x) => x.slug === slug);
  if (!r) return [];
  const otherRoles = ROLES.filter((x) => x.slug !== slug)
    .slice(0, 1)
    .map((x) => roleLink(x.slug));
  return resolve([
    ...r.useCases.map(useCaseLink),
    ...r.regulations.map(regulationLink),
    ...otherRoles,
    DOCS_LINK,
  ]);
}

export function relatedForRegulation(r: Regulation): LinkItem[] {
  const otherRegs = REGULATIONS.filter((x) => x.slug !== r.slug).map((x) => regulationLink(x.slug));
  return resolve([
    ...r.useCases.map(useCaseLink),
    ...otherRegs,
    roleLink('compliance'),
  ]);
}
