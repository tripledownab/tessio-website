// glossary data: one record per term page (/glossary/[slug]).
//
// Split by category rather than kept in one file: at three entries it was 330 lines, and thirteen in one
// file would be unreadable and well past the size we hold everything else to. The import path is
// unchanged, because a folder with an index resolves the same way the old module did.
//
// See ./types.ts for the shape and the scope rule.
export * from './types';

import type { GlossaryTerm } from './types';
import { COMPLIANCE_TERMS } from './compliance';
import { CREDENTIAL_TERMS } from './credentials';
import { INFRASTRUCTURE_TERMS } from './infrastructure';
import { PROTOCOL_TERMS } from './protocols';

/**
 * Ordered deliberately, because this is also the order of the hub grid.
 *
 * Compliance first: someone searching "highly effective age assurance" has an obligation and a deadline,
 * and is the reader most likely to become a customer. The protocol terms are further down because a
 * developer searching "DCQL" usually knows what they are looking for already.
 */
export const GLOSSARY: GlossaryTerm[] = [
  ...COMPLIANCE_TERMS,
  ...CREDENTIAL_TERMS,
  ...INFRASTRUCTURE_TERMS,
  ...PROTOCOL_TERMS,
];

export function getTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
