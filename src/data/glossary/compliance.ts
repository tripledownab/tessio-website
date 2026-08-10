// Terms a compliance or policy reader arrives at. These carry the commercial intent: someone searching
// "highly effective age assurance" has an obligation and a deadline, not a curiosity.
//
// Accuracy notes: the OSA facts here must match src/data/regulations.ts, which was verified against Ofcom
// and the Act. If one changes, change both.
import type { GlossaryTerm } from './types';

export const COMPLIANCE_TERMS: GlossaryTerm[] = [
  {
    slug: 'age-assurance',
    term: 'Age assurance',
    aka: ['age assurance', 'age checking', 'age gating'],
    category: 'Compliance',
    title: 'Age assurance, age verification and age estimation explained',
    description:
      'Age assurance is the umbrella term for establishing someone is old enough. Verification proves it from a trusted source, estimation guesses it. Regulators care which one you used.',
    short:
      'Age assurance is the umbrella term for any method of establishing that someone is old enough to do something. It splits into age verification, which proves age from an authoritative source, and age estimation, which infers it from a face, a voice or behaviour. The difference matters legally, because a regulator asks not just whether you checked but how well.',
    sections: [
      {
        heading: 'The three words, and why the distinction is not pedantry',
        body: [
          'Age verification establishes age from something authoritative: a government identity source, a bank record, a credential issued by someone who checked. It gives a determinate answer. Age estimation infers age from a signal that correlates with it, usually a face scan, and gives a probability with an error margin, which is why estimation providers publish a "challenge age" buffer and refuse anyone near the threshold.',
          'Age assurance covers both, and self-declaration sits at the bottom of the same ladder. Ticking a box that says "I am 18" is technically age assurance and is worth nothing, which is precisely why the regulators stopped using the word loosely.',
        ],
      },
      {
        heading: 'What changes with a wallet',
        body: [
          'The older methods share a problem: to learn one fact about someone, they collect much more. An ID scan gives you a name, a document number and a photograph in order to answer a yes or no question about age. That solves the regulator\'s problem and creates a data protection one.',
          'A wallet-based check inverts it. The person holds a credential an authority already issued, and releases only the answer to the question asked. There is no document to store, no image to retain and no retention policy to audit, because the data never arrives. Whether that is available to you depends on the rollout rather than on the technology: the credential exists, and the wallets are arriving between now and December 2027.',
        ],
      },
      {
        heading: 'What a regulator actually assesses',
        body: [
          'Not the label. Under the UK Online Safety Act the test is whether the assurance is "highly effective", which has four named criteria, and Ofcom has been explicit that self-declaration and payment-card checks do not meet it. Under the EU Digital Services Act the duty is risk-based rather than a blanket age-check mandate, and Article 28(3) actively resists collecting extra personal data in order to check age.',
          'So the compliance question is two-part: is the method strong enough, and is it proportionate in what it collects. A method can fail either half. An ID scan is strong and often disproportionate; a checkbox is proportionate and useless.',
        ],
      },
    ],
    facts: [
      { label: 'Age verification', value: 'Proves age from an authoritative source. Determinate.' },
      { label: 'Age estimation', value: 'Infers age from a face, voice or behaviour. Probabilistic.' },
      { label: 'Self-declaration', value: 'A tick box. Age assurance in name only.' },
      { label: 'UK test', value: '"Highly effective age assurance" under the Online Safety Act' },
      { label: 'EU position', value: 'Risk-based under the DSA; Article 28(3) resists extra data collection' },
    ],
    whyItMatters: [
      'If you\'re writing a compliance note, say which of the three you use and why it meets the standard that applies to you. "We do age assurance" answers nothing a regulator asked.',
      'If you\'re choosing a vendor, the question that separates them is what they receive, not what they promise to delete. A method that never receives a document can\'t lose one.',
    ],
    tools: [],
    faqs: [
      {
        q: 'Is age estimation good enough on its own?',
        a: 'It depends on the threshold and the regulator. Estimation has an error band, so providers set a challenge age well above the legal one and fall back to another method for anyone inside the band. That fallback is part of the system, so judge the whole flow rather than the estimator alone.',
      },
      {
        q: 'Does asking for a date of birth count?',
        a: 'Asking is self-declaration. Verifying a date of birth against an authoritative source is verification. The words are close and the compliance distance between them is the entire subject.',
      },
      {
        q: 'Do I need age assurance if my users are mostly adults?',
        a: 'The duties are about risk and about what your service carries, not about your average user. That\'s a question for your counsel against your own risk assessment rather than one a glossary can answer.',
      },
    ],
    sources: [
      { label: 'Online Safety Act 2023', href: 'https://www.legislation.gov.uk/ukpga/2023/50/contents' },
      { label: 'Regulation (EU) 2022/2065, the Digital Services Act', href: 'https://eur-lex.europa.eu/eli/reg/2022/2065/oj' },
    ],
    related: ['highly-effective-age-assurance', 'relying-party', 'age-verification-attestation'],
    regulations: ['osa', 'dsa'],
  },

  {
    slug: 'highly-effective-age-assurance',
    term: 'Highly effective age assurance (HEAA)',
    aka: ['HEAA', 'highly effective age assurance', 'Ofcom age assurance standard'],
    category: 'Compliance',
    title: 'Highly effective age assurance (HEAA) under the UK Online Safety Act',
    description:
      'HEAA is the UK Online Safety Act standard: age assurance that is technically accurate, robust, reliable and fair. What the four criteria mean, and what Ofcom has said does not meet them.',
    short:
      'Highly effective age assurance is the standard the UK Online Safety Act sets for services that must keep children away from adult content. Ofcom judges it against four criteria: technically accurate, robust, reliable and fair. It is a higher bar than "we asked", and Ofcom has named methods that do not clear it.',
    sections: [
      {
        heading: 'The four criteria',
        body: [
          'Technically accurate is whether the method correctly determines age in the first place. Robust is whether it holds up against ordinary circumvention rather than only against a cooperative user. Reliable is whether it works consistently across your actual user population rather than in a demonstration. Fair is whether it works equally well across demographics, which is where facial estimation has historically struggled and where a credential-based check has less to prove.',
          'The criteria are cumulative. A method that is accurate but trivially bypassed is not highly effective, and neither is one that is accurate for most people and much worse for some.',
        ],
      },
      {
        heading: 'What does not meet it',
        body: [
          'Ofcom has been direct that self-declaration of age does not meet the standard, and neither does a general-purpose payment method that is available to under-18s. Contractual restrictions in your terms of service are not age assurance at all.',
          'The enforcement is real rather than theoretical: the Act carries penalties up to 18 million pounds or 10% of qualifying worldwide revenue, whichever is greater, and Ofcom has issued seven-figure fines over weak age checks.',
        ],
      },
      {
        heading: 'Where a wallet-based check sits',
        body: [
          'A credential issued by a government-backed source and cryptographically verified is strong on the first three criteria by construction: the answer comes from an authority rather than from an inference, the signature is checkable, and it does not degrade with lighting or accent or age band.',
          'The honest caveat is coverage, not strength. A method nobody can use is not reliable in Ofcom\'s sense, so during the rollout a wallet check is one route among several rather than the whole answer. Anyone telling you the EU wallet covers your whole user base today is describing 2027.',
        ],
      },
    ],
    facts: [
      { label: 'Law', value: 'Online Safety Act 2023' },
      { label: 'Regulator', value: 'Ofcom' },
      { label: 'Criteria', value: 'Technically accurate, robust, reliable and fair' },
      { label: 'Own pornographic content (Part 5)', value: 'Duty in force 17 January 2025' },
      { label: "Children's codes (Part 3)", value: 'Enforced from 25 July 2025' },
      { label: 'Penalties', value: 'Up to 18 million pounds or 10% of qualifying worldwide revenue' },
    ],
    whyItMatters: [
      'The four criteria are the assessment. If you\'re documenting your choice of method, write it against them one by one, because that\'s the shape of the question you will be asked.',
      'Fairness is the criterion most often skipped in vendor material and the one most likely to be tested. Ask any estimation provider for their accuracy broken down by demographic, not just their headline figure.',
    ],
    tools: [],
    faqs: [
      {
        q: 'Is HEAA the same as the EU standard?',
        a: 'No. HEAA is a UK term from the Online Safety Act. The EU Digital Services Act takes a risk-based approach and doesn\'t use it, so a service covering both markets is answering two differently shaped questions.',
      },
      {
        q: 'Does a credit card check count?',
        a: 'Ofcom has been clear that a payment method available to under-18s doesn\'t meet the standard. Whether a particular card product is restricted to adults is a question about that product.',
      },
      {
        q: 'Can one method cover every user?',
        a: 'Rarely, today. Most compliant deployments offer more than one route and record which was used. Be wary of a vendor whose answer to coverage is that the question doesn\'t arise.',
      },
    ],
    sources: [
      { label: 'Online Safety Act 2023', href: 'https://www.legislation.gov.uk/ukpga/2023/50/contents' },
      { label: 'Ofcom: protecting children from harms online', href: 'https://www.ofcom.org.uk/online-safety/protecting-children/' },
    ],
    related: ['age-assurance', 'age-verification-attestation', 'relying-party'],
    regulations: ['osa'],
  },

  {
    slug: 'relying-party',
    term: 'Relying party',
    aka: ['relying party', 'wallet-relying party', 'RP', 'verifier'],
    category: 'Compliance',
    title: 'Relying party in the EU Digital Identity Wallet, explained',
    description:
      'A relying party is whoever asks a wallet for data and acts on the answer. Under the EU framework that role is registered, and registration is what gets you an access certificate.',
    short:
      'A relying party is whoever asks an EU Digital Identity Wallet for data and relies on the answer, which in practice means your service. The EU framework makes it a registered role rather than an informal one: you register with a national authority, and that registration is what eventually gets you the access certificate a wallet checks before releasing anything.',
    sections: [
      {
        heading: 'The role, and who holds it',
        body: [
          'Three parties appear in every wallet interaction. An issuer vouches for an attribute and signs a credential. A holder keeps it on their device and decides what to release. A relying party asks a question and acts on the answer. If you run the shop, the platform or the gambling site, you are the relying party, and the duties attach to you rather than to your vendor.',
          'That last point is the one worth being careful about. Buying a hosted verification service does not move the role; it moves the plumbing. Whether it also moves the registration obligation is genuinely unsettled and may differ by member state, which is a question for counsel rather than a vendor.',
        ],
      },
      {
        heading: 'Registration is not paperwork for its own sake',
        body: [
          'The point of registering relying parties is that a wallet can show its user who is asking and what they are entitled to ask for. Without it, "the user consented" means very little, because the user cannot tell a legitimate request from a convincing one.',
          'This is why the technical and the legal sides meet at the access certificate: registration produces a certificate, the wallet checks the certificate, and only then does the consent screen name you. Without one, a production wallet refuses before the user is asked anything at all.',
        ],
      },
      {
        heading: 'What it means for a timeline',
        body: [
          'Member states must make the wallet available under Regulation (EU) 2024/1183, and relying parties in regulated sectors must accept it by December 2027. Between now and then the constraint is not usually your integration, which is stable, but the ecosystem around it: registers opening, certificates issuing, wallets shipping.',
          'The practical consequence is that integration work does not need to wait. Build against a sandbox, and go live as the rollout lands, because the code is the same either way.',
        ],
      },
    ],
    facts: [
      { label: 'Also called', value: 'Wallet-relying party, verifier' },
      { label: 'Who it is', value: 'Whoever asks the wallet and acts on the answer, usually the service' },
      { label: 'Registered with', value: 'A national registrar, under the EUDI framework' },
      { label: 'Proves itself with', value: 'A wallet-relying party access certificate (WRPAC)' },
      { label: 'Acceptance duty', value: 'Regulated relying parties, December 2027' },
    ],
    whyItMatters: [
      'The role sits with you, not with your verification vendor. When you write your compliance position, write it as the relying party, because that\'s how the regulation reads it.',
      'If a vendor can\'t tell you who holds the registration and the access certificate in their model, that\'s the question to keep asking, since it determines whether a production wallet will complete a check at all.',
    ],
    tools: [
      {
        label: 'EUDI Trusted Entity Checker',
        href: '/lote',
        note: 'See whether a certificate is trusted by the wallet ecosystem, including as an access certificate provider.',
      },
    ],
    faqs: [
      {
        q: 'Is the relying party the same as the verifier?',
        a: 'In practice the words are used interchangeably. "Verifier" tends to mean the software that checks the cryptography, and "relying party" the legal entity that asks and acts. They are often not the same organisation, which is exactly why the distinction is worth keeping.',
      },
      {
        q: 'Do I register if I use a hosted verification service?',
        a: 'Technically the access certificate binds to the host that sends the request, which with a hosted service is your provider. Whether the regulation also expects you to be registered in your own right is unsettled and may vary by member state. Ask your counsel rather than your vendor.',
      },
      {
        q: 'What can a relying party ask for?',
        a: 'Only what its registration covers, which is the point of registering. A wallet is meant to show the user what you\'re entitled to request, so over-asking is visible rather than silent.',
      },
    ],
    sources: [
      { label: 'Regulation (EU) 2024/1183, the EUDI framework', href: 'https://eur-lex.europa.eu/eli/reg/2024/1183/oj' },
      { label: 'EU Digital Identity Wallet reference implementation', href: 'https://github.com/eu-digital-identity-wallet' },
    ],
    related: ['wrpac', 'age-assurance', 'pid'],
    regulations: ['eudi'],
  },
];
