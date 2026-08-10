// EUDI and eIDAS trust plumbing: who is allowed to ask, and who is allowed to issue.
//
// The WRPAC and trusted-list entries are written from our own runs against the EU reference wallet and
// the live LOTL, not from a spec summary. Dates in them are load-bearing; check them against
// TrustPlatform/docs/wrpac-access-certificate.md before editing.
import type { GlossaryTerm } from './types';

export const INFRASTRUCTURE_TERMS: GlossaryTerm[] = [
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
      'If you\'re comparing age verification vendors for the EU wallet, this is the question to put to all of them: do you hold an access certificate, and who issued it. Every relying party in Europe is behind this same gate, incumbents included, so a vendor claiming live production wallet verification today is worth a second look.',
      'It doesn\'t block your integration work, though. The certificate changes which key signs the request, not the shape of what you build, so the integration you write against a sandbox now is the one you go live with.',
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
        a: 'Against a sandbox, yes, and that\'s most of the integration work. Against a real wallet, no. The wallet refuses the request before any data is released, so there is no partial or degraded mode to test in.',
      },
      {
        q: 'Do I need my own certificate, or does my verification vendor cover me?',
        a: 'Technically the certificate binds to the host that sends the request, so with a hosted verifier that\'s your provider\'s host and their certificate. Whether the regulation also expects you to be registered as a relying party in your own right is a separate question, it may differ by member state, and it\'s one for your counsel rather than for a glossary.',
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
      'If you\'re buying a validation tool, that\'s the question to ask it: does it tell you qualified, or only valid, and does it evaluate qualification at signing time or at today\'s date.',
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
        a: 'No, these are independent. Cryptographic validity says the bytes were signed by that key and have not changed. The trusted list says whether the issuer behind that key was a qualified provider. You need both answers, and a tool that gives you only one isn\'t telling you what you think it\'s.',
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
    slug: 'iaca',
    term: 'IACA (Issuing Authority Certificate Authority)',
    aka: ['IACA', 'issuing authority certificate authority', 'IACA root', 'Document Signer'],
    category: 'EUDI infrastructure',
    title: 'IACA explained: the trust root behind an mdoc or mDL',
    description:
      'An IACA is the certificate authority root behind an mdoc issuer. How mdoc trust anchors on it, and the certificate profile check that is commonly skipped.',
    short:
      'An IACA, or Issuing Authority Certificate Authority, is the root certificate authority an mdoc issuing authority operates. Trust in an mdoc is decided by whether its Document Signer certificate chains to an IACA root the verifier already holds, so the IACA list is the mdoc equivalent of a trusted list.',
    sections: [
      {
        heading: 'How mdoc trust is decided',
        body: [
          'Two certificates matter. The IACA is the root, held by the issuing authority, for example a member state or a licensing body. The Document Signer is the certificate that actually signs each credential\'s Mobile Security Object, and it chains to that root.',
          'A verifier decides trust purely by chain anchoring: does this Document Signer chain to a root I already trust. Unlike a trust model keyed on an issuer string, the identifier inside the document is not consulted at all, so an attacker choosing what the document claims about itself cannot move the answer. That is a good property, and it means the whole question reduces to which roots you loaded.',
        ],
      },
      {
        heading: 'The check most verifiers skip',
        body: [
          'Chaining is necessary and not sufficient. ISO/IEC 18013-5 Annex B specifies a profile for the Document Signer certificate: what extended key usage it must carry, what key usage, and how long it may live. A verifier that checks only the chain will accept a certificate that anchors correctly but is not a valid Document Signer under that profile.',
          'It is worth asking any mdoc library whether it enforces the Annex B profile, because the answer is often no, and a library that does not should say so rather than let a green result imply it did.',
        ],
      },
      {
        heading: 'Where the roots come from',
        body: [
          'That is the practical difficulty. Unlike the eIDAS world, which has a published list of lists, mdoc IACA distribution is still fragmented: roots come from the issuing authorities themselves, from national registries, or from the EU ecosystem\'s trusted entity lists as those fill out.',
          'Until you have loaded real roots, every real mdoc will correctly report as untrusted, which is a configuration state rather than a verdict about the document, and a verifier should distinguish the two.',
        ],
      },
    ],
    facts: [
      { label: 'Stands for', value: 'Issuing Authority Certificate Authority' },
      { label: 'Role', value: 'Root of trust for an mdoc issuing authority' },
      { label: 'Signs credentials', value: 'No: the Document Signer does, and chains to the IACA' },
      { label: 'Trust decided by', value: 'Chain anchoring; the issuer string is not consulted' },
      { label: 'Certificate profile', value: 'ISO/IEC 18013-5 Annex B, commonly unenforced' },
    ],
    whyItMatters: [
      'If every mdoc you test reports untrusted, check which roots you loaded before suspecting the documents. An empty root set produces a confident and meaningless no.',
      'Ask your mdoc library whether it enforces the Annex B Document Signer profile. Chain anchoring alone accepts certificates the spec would not.',
    ],
    tools: [
      {
        label: 'mdoc / mDL Validator',
        href: '/mdoc',
        note: 'Paste a DeviceResponse and see its Document Signer chain and whether it anchors on a trusted root.',
      },
    ],
    faqs: [
      {
        q: 'Is an IACA the same as a trusted list?',
        a: 'It plays the same role and is distributed differently. An eIDAS trusted list is a signed, published list you fetch; IACA roots are certificates you obtain and configure. The eIDAS side has a single root to start from, the mdoc side doesn\'t yet.',
      },
      {
        q: 'Can one issuing authority have several IACA roots?',
        a: 'Yes, and rotation is normal, which is why a verifier holds a set rather than one certificate and why an expired root doesn\'t necessarily mean an invalid document.',
      },
      {
        q: 'Does anchoring on an IACA prove the document is genuine?',
        a: 'It proves the Document Signer chains to an authority you trust. You still need the Mobile Security Object signature to verify and the disclosed elements to match its digests, otherwise you have trusted a signer without checking what they signed.',
      },
    ],
    sources: [
      { label: 'ISO/IEC 18013-5', href: 'https://www.iso.org/standard/69084.html' },
      { label: 'EUDI Architecture and Reference Framework', href: 'https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework' },
    ],
    related: ['mdoc', 'trusted-list', 'wrpac'],
  },
];
