// glossary data — one record per term page (/glossary/[slug]).
//
// Scope rule, so this system does not compete with the pages that already earn traffic: a term that
// has its own landing page (EUDI Wallet, Online Safety Act, DSA) does NOT get a full glossary entry.
// Two pages targeting one query split the signal and we lose to ourselves. Those belong in the
// related links pointing at /eudi, /osa and /dsa instead.
//
// Every entry here is written from something we did rather than from a specification summary, and
// where we have a Labs validator for the thing being defined, the entry links to it. That is the
// difference between this and the dozen identikit EUDI glossaries: the reader can go and check one.
//
// Accuracy notes:
//  - The WRPAC provider list, its seven pilot providers and the reference wallet's refusal are from
//    our own run on 2026-08-05, recorded in TrustPlatform/docs/wrpac-access-certificate.md.
//  - The thirteen age thresholds are copied from AgeCheckService.SupportedMinAges, which in turn
//    tracks what eu.europa.ec.av.1 defines. Do not "tidy" that list.
//  - The December 2026 register date is reported by secondary sources and is NOT confirmed against
//    the implementing regulation. It is stated as unconfirmed on the page on purpose. Keep it that way
//    until someone reads the primary text.
import type { Faq } from '../lib/seo';

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

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'wrpac',
    term: 'Wallet-relying party access certificate (WRPAC)',
    aka: ['WRPAC', 'access certificate', 'relying party access certificate', 'reader authentication'],
    category: 'EUDI infrastructure',
    title: 'WRPAC: the EUDI wallet access certificate explained',
    description:
      'A WRPAC is the certificate that proves to an EU Digital Identity Wallet that you are a registered relying party. What it does, who issues one, and what a wallet does when you do not have it.',
    short:
      'A wallet-relying party access certificate, or WRPAC, is the certificate that proves to an EU Digital Identity Wallet that you are a registered relying party. Without one the wallet refuses your request outright, before any data is shared and before the user is even asked.',
    sections: [
      {
        heading: 'What it actually does',
        body: [
          'A wallet does not hand data to whoever asks for it. Before it shows the user a consent screen, it authenticates the requester, a step the specifications call reader authentication. Your presentation request is signed, the signing chain travels with it in the x5c header of the request object, and the wallet checks that chain against a published list of access certificate providers it trusts.',
          'The certificate also pins the request to a hostname. The client_id you send takes the form x509_san_dns:yourhost, and that host has to appear in the certificate as a subject alternative name. So the certificate does not only say "a registered relying party is asking", it says "this specific host is asking". That is what stops someone lifting your request and replaying it from their own domain.',
        ],
      },
      {
        heading: 'What happens without one',
        body: [
          'Nothing degrades gracefully, which is the useful thing to know. We ran this against the EU reference wallet on 5 August 2026. It fetched our signed request, parsed it, reached its reader-authentication decision and refused, logging InvalidJarJwt with the cause "Untrusted x5c". What the user saw was: "Presentation blocked. This presentation request has been blocked because the relying party could not be verified by your Wallet."',
          'It is worth being precise about the consequence, because it is usually described as a production concern. It is not. No data is released, so no check can complete against a real wallet in any environment, including testing. We recorded it as a production-only gate ourselves at first, and that was wrong.',
        ],
      },
      {
        heading: 'Who issues one',
        body: [
          'Access certificates come from providers that the wallet ecosystem publishes as a signed, machine-readable list, which is how a wallet decides whose certificates to trust. When we read the list the EU reference wallet is configured with, on 5 August 2026, it carried seven pilot providers, identified by country: EU, CZ, EE, LU, NL, PT and UT. UT is Utopia, the Commission\'s fictional test member state, which is the pilot lane.',
          'The practical consequence matters more than the list itself. You do not have to wait for your own country\'s register to open before you can develop, because a pilot certificate from the Commission\'s test provider is already trusted by the reference wallet today. Sweden, for one, was not on that list.',
        ],
      },
      {
        heading: 'Where the process actually is',
        body: [
          'There is no published self-serve route to request one. When we went looking in August 2026, what existed was the Commission\'s wallet support mailbox and the team that operates the age-verification issuer. We applied on 5 August 2026 and do not hold a certificate yet.',
          'Secondary sources report that the implementing regulation on registering wallet-relying parties applies from 24 December 2026, which would put national registers in place around then. We have not confirmed that against the primary text, and dates in this area have moved before, so treat it as a lead rather than something to plan a launch around.',
        ],
      },
    ],
    facts: [
      { label: 'Full name', value: 'Wallet-relying party access certificate' },
      { label: 'Proves', value: 'That the requester is a registered relying party' },
      { label: 'Travels in', value: 'The x5c header of the signed OpenID4VP request object' },
      { label: 'Bound to', value: 'A DNS name that must match the client_id (x509_san_dns)' },
      { label: 'Without one', value: 'The wallet refuses before any data is released, in every environment' },
      { label: 'Tessio status', value: 'Applied 5 August 2026, not yet held' },
    ],
    whyItMatters: [
      'If you are comparing age verification vendors for the EU wallet, this is the question to put to all of them: do you hold an access certificate, and who issued it. Every relying party in Europe is behind this same gate, incumbents included, so a vendor claiming live production wallet verification today is worth a second look.',
      'It does not block your integration work, though. The certificate changes which key signs the request, not the shape of what you build, so the integration you write against a sandbox now is the one you go live with.',
    ],
    tools: [
      {
        label: 'EUDI Trusted Entity Checker',
        href: '/lote',
        note: 'Paste a certificate and see whether the EU wallet ecosystem trusts it, and in which role.',
      },
    ],
    faqs: [
      {
        q: 'Is a WRPAC the same as my TLS certificate?',
        a: 'No, and you need both. Your TLS certificate proves your server to a browser and comes from a public web CA. An access certificate proves you to a wallet and comes from a provider the wallet ecosystem trusts. Different chain, different issuer, different question being answered.',
      },
      {
        q: 'Can I build and test without one?',
        a: 'Against a sandbox, yes, and that is most of the integration work. Against a real wallet, no. The wallet refuses the request before any data is released, so there is no partial or degraded mode to test in.',
      },
      {
        q: 'Do I need my own certificate, or does my verification vendor cover me?',
        a: 'Technically the certificate binds to the host that sends the request, so with a hosted verifier that is your provider\'s host and their certificate. Whether the regulation also expects you to be registered as a relying party in your own right is a separate question, it may differ by member state, and it is one for your counsel rather than for a glossary.',
      },
      {
        q: 'Why does the wallet check this at all?',
        a: 'Because the alternative is a wallet that releases identity data to anyone who asks nicely. Reader authentication is what makes "the user consented" mean something: the consent screen can name a party that has been registered and can be held to it.',
      },
    ],
    sources: [
      {
        label: 'The WRPAC provider list the EU reference wallet reads',
        href: 'https://trustedlist.serviceproviders.eudiw.dev/LOTE/json/WRPACProviders.jwt',
      },
      { label: 'Regulation (EU) 2024/1183, the EUDI framework', href: 'https://eur-lex.europa.eu/eli/reg/2024/1183/oj' },
      {
        label: 'OpenID for Verifiable Presentations 1.0',
        href: 'https://openid.net/specs/openid-4-verifiable-presentations-1_0.html',
      },
      { label: 'EU Digital Identity Wallet reference implementation', href: 'https://github.com/eu-digital-identity-wallet' },
    ],
    related: ['trusted-list', 'age-verification-attestation'],
    regulations: ['eudi'],
  },

  {
    slug: 'trusted-list',
    term: 'EU trusted list and the LOTL',
    aka: ['trusted list', 'TL', 'LOTL', 'List of Trusted Lists', 'EU trust list'],
    category: 'eIDAS trust infrastructure',
    title: 'EU trusted list and LOTL explained in plain language',
    description:
      'An EU trusted list is a signed list of the trust service providers a member state has qualified under eIDAS. The LOTL is the list of all 27. How the chain works, and why qualified is not the same as valid.',
    short:
      'An EU trusted list is a signed, machine-readable list that a member state publishes of the trust service providers it has qualified under eIDAS. The LOTL, or List of Trusted Lists, is the European Commission\'s list pointing at all of them, and it is the root you start from when you want to know whether a certificate is genuinely qualified.',
    sections: [
      {
        heading: 'How the chain of lists works',
        body: [
          'You start at a single URL, the LOTL, published and signed by the Commission. It points at each member state\'s own trusted list, and each of those is signed too. A national list names the trust service providers that country supervises and, for each one, the services it has qualified: qualified certificates, qualified timestamps, qualified seals, with the certificates that identify them.',
          'So "is this certificate qualified" is not a property you can read off the certificate. It is a question about whether that certificate appears on a national list, under a service type that was qualified, at the time the thing you are checking was signed. That last part is where implementations quietly go wrong: the lists carry service history, and a provider qualified today may not have been when the signature was made two years ago.',
        ],
      },
      {
        heading: 'Two different kinds of list, and the confusion between them',
        body: [
          'The eIDAS trusted lists above are the established infrastructure, defined in ETSI TS 119 612, and they answer questions about signatures, seals and timestamps.',
          'The EU Digital Identity Wallet ecosystem brought a second, separate family of registries, the Lists of Trusted Entities, defined in ETSI TS 119 602. Those answer a different question: which entities the wallet ecosystem trusts, and in which role, as providers of person identification data, as attestation providers, or as access certificate providers.',
          'They look alike, they are both commonly called "the trusted list", and a certificate can sit on one while being irrelevant to the other. When someone tells you a certificate is on the trusted list, it is worth asking which one they mean. We built separate checkers for each precisely because the answer is not transferable.',
        ],
      },
      {
        heading: 'Why you would ever touch this',
        body: [
          'If you validate eIDAS signatures, this is the whole difference between "the signature is cryptographically valid" and "the signature is qualified". Only the second carries the legal weight people assume they are getting. A perfectly valid signature from a provider nobody ever qualified is just a valid signature, and treating the two as the same thing is the most common mistake in this area.',
          'The lists are also not static. They are versioned, they carry a next-update date, and providers are added, suspended and withdrawn. Fetching one once and caching it forever is a correctness bug rather than an optimisation.',
        ],
      },
    ],
    facts: [
      { label: 'LOTL', value: 'The Commission\'s List of Trusted Lists, the root of the chain' },
      { label: 'National lists', value: 'One per member state, signed, naming qualified providers' },
      { label: 'Format', value: 'ETSI TS 119 612' },
      { label: 'Answers', value: 'Whether a certificate was qualified, for what service, and when' },
      { label: 'Not the same as', value: 'The EUDI Lists of Trusted Entities (ETSI TS 119 602)' },
    ],
    whyItMatters: [
      'Validity and qualification are two different claims, and conflating them is how compliance positions end up resting on nothing. A signature can verify perfectly and still not be qualified. If your obligation is about qualified signatures, you have to resolve the certificate against the lists, at the right point in time, and say so.',
      'If you are buying a validation tool, that is the question to ask it: does it tell you qualified, or only valid, and does it evaluate qualification at signing time or at today\'s date.',
    ],
    tools: [
      {
        label: 'EU Trusted List Checker',
        href: '/trusted-list',
        note: 'Paste a certificate and see whether it is a qualified CA on an EU trusted list, and which national list it came from. It reports current status, not qualification as at some past date.',
      },
      {
        label: 'eIDAS Signature Validator',
        href: '/ades',
        note: 'Check a PAdES, CAdES or JAdES signature, its timestamp, and its trusted-list qualification.',
      },
    ],
    faqs: [
      {
        q: 'Is the LOTL the same as the trusted list the EU wallet uses?',
        a: 'No. The LOTL is the eIDAS chain, about qualified trust services and signatures. The wallet ecosystem publishes its own Lists of Trusted Entities under a different standard, about who is trusted to issue credentials or to ask for them. Both get called "the trusted list" and they answer different questions.',
      },
      {
        q: 'Does being on a trusted list make a signature valid?',
        a: 'No, these are independent. Cryptographic validity says the bytes were signed by that key and have not changed. The trusted list says whether the issuer behind that key was a qualified provider. You need both answers, and a tool that gives you only one is not telling you what you think it is.',
      },
      {
        q: 'How often do the lists change?',
        a: 'Regularly. Each list carries a next-update date, and providers get added, suspended and withdrawn between them. Any implementation that caches a list indefinitely will eventually give a confidently wrong answer.',
      },
    ],
    sources: [
      { label: 'The EU LOTL', href: 'https://ec.europa.eu/tools/lotl/eu-lotl.xml' },
      { label: 'EU Trusted List browser', href: 'https://eidas.ec.europa.eu/efda/tl-browser/' },
      { label: 'eIDAS, Regulation (EU) No 910/2014', href: 'https://eur-lex.europa.eu/eli/reg/2014/910/oj' },
    ],
    related: ['wrpac', 'age-verification-attestation'],
  },

  {
    slug: 'age-verification-attestation',
    term: 'EU age verification attestation (eu.europa.ec.av.1)',
    aka: ['age attestation', 'AV attestation', 'eu.europa.ec.av.1', 'age_over_18 credential'],
    category: 'Credentials',
    title: 'EU age verification attestation (eu.europa.ec.av.1) explained',
    description:
      'The EU age verification attestation carries nothing but age_over_N booleans. No name, no date of birth, no portrait. What is in it, the thirteen thresholds, and the mistake that makes an age check fail open.',
    short:
      'The EU age verification attestation is a credential, doctype eu.europa.ec.av.1, that carries nothing but a set of age_over_N booleans. No name, no date of birth, no document number, no portrait. It exists so a service can check someone is old enough without learning anything else about them.',
    sections: [
      {
        heading: 'What is actually in it',
        body: [
          'Thirteen booleans, and that is the entire payload: age_over_13, 15, 16, 18, 21, 23, 25, 27, 28, 40, 60, 65 and 67. Those numbers are not arbitrary and they are not ours. They are the thresholds the attestation defines, covering the ages that laws around Europe actually draw lines at, from social media minimums through alcohol and gambling to pensioner concessions.',
          'Compare that with the PID, the person identification data credential, which is the wallet\'s identity document and carries a name, a birth date and more. You can work out whether someone is over 18 from a PID, but doing it means receiving their date of birth. The age attestation exists precisely so you do not have to, and as issued today it is the only EU credential that carries age_over_N without also carrying identity attributes.',
        ],
      },
      {
        heading: 'Why this is a stronger privacy claim than a retention promise',
        body: [
          'Most age verification vendors offer some version of "we delete it afterwards". That is a promise about behaviour, and the only way to audit it is to trust them. This is different in kind. The credential does not contain the data, so there is nothing to delete, nothing to breach, and nothing to produce when someone files a subject access request. You cannot leak what the protocol never sends you.',
          'And because it is a property of the credential rather than of the vendor, you do not have to take anyone\'s word for it. The doctype is public, the contents are specified, and you can go and look.',
        ],
      },
      {
        heading: 'The part that trips people up',
        body: [
          'Asking for a claim is not the same as asking for a value. DCQL, the query language OpenID4VP uses, lets you request the age_over_18 attribute. It does not let you require that the attribute be true. A wallet holding age_over_18 = false can satisfy that request perfectly well, and the response it sends back will verify: the signature is good, the disclosure is genuine, the credential is authentic. The answer is simply no.',
          'So a verifier that treats "verified successfully" as "over 18" is wrong, and it is wrong in the direction that fails open, which is the worst way for an age check to be wrong. You have to read the value that was actually disclosed. We know because we made this mistake in our own implementation and only caught it against a real wallet.',
          'There is a third outcome worth designing for as well. If a credential verifies but did not disclose the boolean you asked for, you do not have a yes and you do not have a no. You have a check that cannot be answered. Folding that into "no" is tempting and it is also wrong: it is a different thing, and it deserves its own state in your data model and your retry logic.',
        ],
      },
    ],
    facts: [
      { label: 'Doctype', value: 'eu.europa.ec.av.1' },
      { label: 'Format', value: 'mdoc (ISO 18013-5), as issued today' },
      { label: 'Contains', value: 'Thirteen age_over_N booleans' },
      { label: 'Does not contain', value: 'Name, date of birth, document number, portrait' },
      { label: 'Thresholds', value: '13, 15, 16, 18, 21, 23, 25, 27, 28, 40, 60, 65, 67' },
      { label: 'Requested with', value: 'DCQL, over OpenID4VP 1.0' },
    ],
    whyItMatters: [
      'If you are writing the integration: read the disclosed boolean rather than trusting that verification succeeded, and give the unanswerable case its own state next to yes and no. Those two decisions are the difference between an age check and an age check that quietly lets everyone through.',
      'If you are choosing a vendor: ask which credential they request. A vendor reading a birth date out of a PID is holding personal data about your users, whatever their retention policy says about it afterwards.',
    ],
    tools: [
      {
        label: 'mdoc / mDL Validator',
        href: '/mdoc',
        note: 'Paste a real mdoc and see its Mobile Security Object, its IACA chain and the elements it actually discloses.',
      },
    ],
    faqs: [
      {
        q: 'Does the service learn my date of birth?',
        a: 'Not from this credential, because it does not contain one. It holds a set of yes or no answers about age thresholds, and the service receives the one it asked for after you approve it in your wallet.',
      },
      {
        q: 'Can I ask for a threshold other than 18?',
        a: 'Yes, any of the thirteen the attestation defines. In practice, sandboxes and mock wallets tend to mint only age_over_18, so the other thresholds are meaningful against a real wallet rather than in a test environment.',
      },
      {
        q: 'Is this the same as a mobile driving licence?',
        a: 'No. An mDL is a driving licence and carries identity attributes including a name and usually a portrait. Both are mdocs, so they travel over the same protocol, but the age attestation is deliberately empty of everything except age answers.',
      },
      {
        q: 'What about users who do not have a wallet?',
        a: 'Then this credential cannot answer for them, and you need another route for that traffic. That is a real gap during the rollout rather than something a verifier can solve, and any vendor telling you the wallet covers all your users today is describing a future rather than the present.',
      },
    ],
    sources: [
      {
        label: 'EUDI Architecture and Reference Framework',
        href: 'https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework',
      },
      {
        label: 'OpenID for Verifiable Presentations 1.0, including DCQL',
        href: 'https://openid.net/specs/openid-4-verifiable-presentations-1_0.html',
      },
      { label: 'Regulation (EU) 2024/1183, the EUDI framework', href: 'https://eur-lex.europa.eu/eli/reg/2024/1183/oj' },
    ],
    related: ['wrpac', 'trusted-list'],
    regulations: ['osa', 'dsa'],
  },
];

export function getTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
