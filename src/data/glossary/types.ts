// Shape of one glossary term. Kept apart from the entries so the category files stay readable and each
// one stays inside the file-size rule; the entries themselves are the bulk.
//
// Scope rule, so this system does not compete with the pages that already earn traffic: a term that has
// its own landing page (EU Digital Identity Wallet, Online Safety Act, DSA) does NOT get a full glossary
// entry. Two pages targeting one query split the signal and we lose to ourselves. Those belong in the
// related links pointing at /eudi, /osa and /dsa instead.
//
// Every entry is written from something we did rather than from a specification summary, and where we
// have a Labs validator for the thing being defined, the entry links to it. That is the difference
// between this and the dozen identikit EUDI glossaries: the reader can go and check one.
import type { Faq } from '../../lib/seo';

export interface TermFact {
  label: string;
  value: string;
}
export interface TermSection {
  heading: string;
  body: string[];
}
export interface TermTool {
  label: string;
  /** Path under labs.tessio.eu, e.g. '/mdoc'. */
  href: string;
  note: string;
}
export interface TermSource {
  label: string;
  href: string;
}
export interface GlossaryTerm {
  slug: string;
  /** The heading and the DefinedTerm name. */
  term: string;
  /** Abbreviations and alternate names. Feeds DefinedTerm.alternateName and the "also called" line. */
  aka: string[];
  category: string;
  title: string;
  description: string;
  /**
   * The one-sentence plain-language definition. This is the sentence that gets quoted, by a person
   * skimming and by an AI answer, so it has to stand alone without the paragraphs under it.
   */
  short: string;
  sections: TermSection[];
  facts: TermFact[];
  whyItMatters: string[];
  /** Labs validators for the thing being defined. The reason to read this glossary and not another. */
  tools: TermTool[];
  faqs: Faq[];
  sources: TermSource[];
  /** Sibling term slugs, for internal linking. */
  related: string[];
  /** Regulation slugs to link out to, for terms a compliance reader arrives at. */
  regulations?: string[];
}
