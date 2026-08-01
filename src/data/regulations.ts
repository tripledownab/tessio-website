// regulation data — one record per high-intent landing page (/osa, /dsa, /eudi).
//
// Accuracy notes (verified against EUR-Lex, Ofcom and European Commission sources):
//  - EUDI "end of 2026 / end of 2027" are DERIVED from the 24 and 36 month clocks that run from
//    the implementing acts (in force ~24 Dec 2024), not fixed calendar dates. Wallet use is
//    voluntary for citizens, and the acceptance duty falls on regulated relying parties.
//  - OSA has TWO dates: Part 5 (a service's own pornographic content) in force 17 Jan 2025,
//    and Part 3 children's codes enforced from 25 Jul 2025. We do not merge them.
//  - The DSA does NOT mandate blanket age verification. Article 28 is risk based and Article 28(3)
//    resists collecting extra personal data to check age. The July 2025 guidelines and the
//    age-verification blueprint are voluntary.
import type { Faq } from '../lib/seo';

export interface RegFact {
  label: string;
  value: string;
}
export interface RegSection {
  heading: string;
  body: string[];
}
export interface RegSource {
  label: string;
  href: string;
}
export interface Regulation {
  slug: string;
  shortName: string;
  name: string;
  category: string;
  title: string;
  description: string;
  lead: string;
  facts: RegFact[];
  sections: RegSection[];
  tessioFit: string[];
  faqs: Faq[];
  /** Related use-case slugs for internal linking. */
  useCases: string[];
  sources: RegSource[];
}

export const REGULATIONS: Regulation[] = [
  {
    slug: 'osa',
    shortName: 'OSA',
    name: 'UK Online Safety Act age assurance',
    category: 'UK regulation',
    title: 'OSA age verification: Online Safety Act age assurance',
    description:
      "The UK Online Safety Act requires highly effective age assurance to keep children away from adult content. Here's what it means, the real dates, and how a wallet-based over-18 check fits.",
    lead: "The Online Safety Act makes many services use highly effective age assurance to keep children away from adult content. Here's what that means in plain language, the dates that actually matter, and where a wallet-based over-18 check fits.",
    facts: [
      { label: 'Law', value: 'Online Safety Act 2023' },
      { label: 'Regulator', value: 'Ofcom' },
      { label: 'Own pornographic content (Part 5)', value: 'Age-assurance duty in force 17 January 2025' },
      { label: "Children's codes (Part 3)", value: 'Enforced from 25 July 2025, risk assessments due 24 July 2025' },
      { label: 'Standard', value: 'Highly effective age assurance: technically accurate, robust, reliable and fair' },
      { label: 'Penalties', value: 'Up to 18 million pounds or 10% of qualifying worldwide revenue' },
    ],
    sections: [
      {
        heading: 'What the Act requires',
        body: [
          'The Online Safety Act puts duties on online services to protect people, and children in particular. Two parts matter most for age checks. Part 5 covers services that publish their own pornographic content, and its highly effective age-assurance duty came into force on 17 January 2025. Part 3 covers user-to-user and search services that are likely to be accessed by children, and Ofcom began enforcing its Protection of Children Codes from 25 July 2025, with children access risk assessments due by 24 July 2025.',
          'The aim is to stop children encountering the most harmful material, which Ofcom calls primary priority content. That includes pornography as well as content encouraging suicide, self-harm or eating disorders. Where a service carries that content, it has to use age assurance to keep under-18s away from it.',
        ],
      },
      {
        heading: 'What counts as highly effective',
        body: [
          'Ofcom does not accept a simple tick-box. Its guidance says highly effective age assurance has to be technically accurate, robust, reliable and fair. Self-declaration of age does not clear that bar.',
          'Ofcom does list methods that can be highly effective when they are implemented well. Those include photo-ID matching, facial age estimation, open banking, mobile network operator age checks, credit-card checks and, importantly here, digital identity services and wallets. You still have to show your chosen method meets the four criteria in practice.',
        ],
      },
      {
        heading: 'How a wallet check fits',
        body: [
          'A wallet-based check asks the user to prove one fact, that they are over 18, from a credential their EU Digital Identity Wallet already holds. Ofcom lists digital identity services and wallets among the methods that can be highly effective, so this is a recognised route rather than a workaround.',
          "The privacy story is the part users notice. The most common complaint about age checks, especially on adult sites, is being told to upload an ID. A wallet proof avoids that. The user confirms they're over 18 and nothing else, and with Tessio there is no document or date of birth stored on your systems or ours.",
        ],
      },
    ],
    tessioFit: [
      'Tessio gives you a cryptographic over-18 proof from the EU Digital Identity Wallet and a signed, auditable result to keep as evidence. There is no ID upload for the user and no personal data stored, which is exactly the friction and the liability that age checks usually add.',
      "You are still responsible for meeting Ofcom's highly effective criteria for your service, and a fallback method covers users who don't have a wallet yet. We're happy to walk through how a wallet check sits in your setup.",
    ],
    faqs: [
      {
        q: 'Does the Online Safety Act require age verification?',
        a: 'It requires highly effective age assurance, which can be met through age verification or age estimation, or both. Ofcom judges a method on whether it is technically accurate, robust, reliable and fair, not on the label. A wallet-based over-18 proof is one recognised way to get there.',
      },
      {
        q: 'Who has to comply, and when?',
        a: 'Services that publish their own pornographic content came under the Part 5 duty on 17 January 2025. User-to-user and search services likely to be accessed by children came under enforcement of the Protection of Children Codes from 25 July 2025. Ofcom is the regulator and can levy large fines.',
      },
      {
        q: 'Is a digital identity wallet an accepted method?',
        a: 'Ofcom lists digital identity services and wallets among the methods that can be highly effective. You still have to show your implementation meets the four criteria, but a wallet check is a recognised route, not a grey area.',
      },
    ],
    useCases: ['adult', 'social', 'dating'],
    sources: [
      {
        label: 'Ofcom: guidance on highly effective age assurance',
        href: 'https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/age-assurance',
      },
      {
        label: 'Ofcom: age checks to protect children online',
        href: 'https://www.ofcom.org.uk/online-safety/protecting-children/age-checks-to-protect-children-online',
      },
      {
        label: 'Online Safety Act 2023 (legislation.gov.uk)',
        href: 'https://www.legislation.gov.uk/ukpga/2023/50/contents',
      },
    ],
  },
  {
    slug: 'dsa',
    shortName: 'DSA',
    name: 'EU Digital Services Act and age assurance',
    category: 'EU regulation',
    title: 'DSA age assurance: what the Digital Services Act asks for',
    description:
      'The EU Digital Services Act does not mandate blanket age verification. It asks platforms to protect minors proportionately. Here is what it actually requires and where a wallet-based age check fits.',
    lead: "The Digital Services Act does not order blanket age verification. It asks platforms accessible to minors to protect them proportionately, and the Commission's 2025 guidance points to age verification for higher-risk services. Here's what it actually asks for.",
    facts: [
      { label: 'Law', value: 'Digital Services Act, Regulation (EU) 2022/2065' },
      { label: 'Key article', value: 'Article 28, protection of minors' },
      { label: 'Requirement', value: 'Proportionate measures for minors, not a blanket age-verification mandate' },
      { label: 'Data', value: 'Article 28(3): no duty to process extra personal data to check age' },
      { label: 'Guidance', value: 'Commission guidelines on protection of minors, 14 July 2025, voluntary' },
      { label: 'Blueprint', value: 'EU age-verification blueprint, 14 July 2025, built on the EUDI Wallet specs' },
    ],
    sections: [
      {
        heading: 'What the DSA actually says',
        body: [
          'It is worth being precise here, because the DSA is often described as an age-verification law and it is not. Article 28(1) asks providers of online platforms accessible to minors to put in place appropriate and proportionate measures for a high level of privacy, safety and security for those minors. Article 28(2) bans profiling-based advertising to users the platform knows with reasonable certainty are minors.',
          'Article 28(3) is the part people miss. It says compliance should not oblige a platform to process additional personal data just to work out whether a user is a minor. So the DSA is risk based and proportionate, and it actively cautions against collecting more data to check age.',
        ],
      },
      {
        heading: 'The 2025 guidelines',
        body: [
          'On 14 July 2025 the Commission published guidelines on the protection of minors under Article 28. They are soft law, so following them is voluntary and does not automatically prove compliance, but the Commission will use them when it assesses whether a platform meets Article 28(1).',
          'The guidelines take a risk-based line. They point to age verification for higher-risk contexts, such as adult content and gambling or where national law sets a minimum age, and to age estimation in other cases. Whatever the method, it should be accurate, reliable, robust, non-intrusive and non-discriminatory.',
        ],
      },
      {
        heading: 'The EU age-verification blueprint',
        body: [
          'On the same day the Commission released the first version of an EU age-verification blueprint. It is a white-label, open-source approach, and the detail that matters for us is that it is built on the same technical specifications as the EU Digital Identity Wallet. Denmark, France, Greece, Italy and Spain were the first to take it up.',
          'That tells you the direction of travel. The Commission is steering age checks towards privacy-preserving, wallet-aligned proofs rather than document uploads and databases.',
        ],
      },
    ],
    tessioFit: [
      'Because Article 28(3) resists collecting extra personal data to check age, a proof that returns only an over-18 yes or no and stores nothing sits well with the DSA. Tessio does exactly that, from the EU Digital Identity Wallet.',
      'It also uses the same standards as the Commission age-verification blueprint, so you are aligned with where EU age assurance is heading rather than betting on a document-based tool that regulators are steering away from.',
    ],
    faqs: [
      {
        q: 'Does the DSA require age verification?',
        a: 'No, there is no blanket age-verification mandate in the DSA. Article 28 asks for proportionate measures to protect minors, and Article 28(3) says you should not have to collect extra personal data just to check age. The Commission guidance recommends age verification for higher-risk services like adult content and gambling.',
      },
      {
        q: 'What does Article 28 actually require?',
        a: 'Appropriate and proportionate measures for a high level of privacy, safety and security for minors on platforms accessible to them, no profiling-based ads to known minors, and no obligation to process additional personal data to assess whether a user is a minor.',
      },
      {
        q: 'Is this the same as the EU age-verification app?',
        a: 'The Commission released an age-verification blueprint on 14 July 2025 that is built on the EU Digital Identity Wallet specifications. It is voluntary, and it points age checks towards the same privacy-preserving, wallet-aligned approach Tessio uses.',
      },
    ],
    useCases: ['social', 'dating', 'adult'],
    sources: [
      {
        label: 'EUR-Lex: Digital Services Act, Regulation (EU) 2022/2065 (Article 28)',
        href: 'https://eur-lex.europa.eu/eli/reg/2022/2065/oj',
      },
      {
        label: 'European Commission: guidelines on protection of minors',
        href: 'https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors',
      },
      {
        label: 'European Commission: age-verification blueprint',
        href: 'https://digital-strategy.ec.europa.eu/en/news/commission-makes-available-age-verification-blueprint',
      },
    ],
  },
  {
    slug: 'eudi',
    shortName: 'EUDI',
    name: 'The EU Digital Identity Wallet, for relying parties',
    category: 'EU Digital Identity',
    title: 'EUDI Wallet for relying parties: the real timeline',
    description:
      'The EU Digital Identity Wallet is coming to all 27 member states. Here is what it is, a realistic timeline, and what relying parties need to accept it and verify an over-18 proof.',
    lead: "The EU Digital Identity Wallet is coming to all 27 member states under the eIDAS update. Here's what it is, a straight read of the timeline, and what relying parties actually need to accept it.",
    facts: [
      { label: 'Law', value: 'Regulation (EU) 2024/1183, amending eIDAS 910/2014' },
      { label: 'In force', value: '20 May 2024' },
      { label: 'Wallets available', value: 'Each member state within 24 months of the implementing acts, around end of 2026' },
      { label: 'Acceptance', value: 'Regulated relying parties within 36 months, around end of 2027' },
      { label: 'For citizens', value: 'Voluntary. Other identification methods stay available' },
      { label: 'Formats', value: 'SD-JWT VC and ISO 18013-5 mdoc, over OpenID4VP' },
    ],
    sections: [
      {
        heading: 'What the wallet is',
        body: [
          'The EU Digital Identity Wallet is a state-backed app that holds verified credentials, from a national ID to attributes like being over 18. The point of it is selective disclosure. Instead of handing over a whole document, the user shares only the fact that is asked for, with a cryptographic proof that it is genuine and unaltered.',
          'For a business that needs to check something about a person, that changes the shape of the problem. You ask a question, the wallet answers it, and you can trust the answer without collecting and storing the underlying identity data.',
        ],
      },
      {
        heading: 'The timeline, realistically',
        body: [
          'The regulation has applied since 20 May 2024. The deadlines that follow are tied to the implementing acts, the first batch of which entered into force around 24 December 2024. Each member state has to make at least one wallet available within 24 months of those acts, which lands around the end of 2026. Regulated relying parties have to accept the wallet within 36 months, which lands around the end of 2027.',
          'Two caveats worth stating. Those dates are derived from the 24 and 36 month clocks rather than fixed in the text, and rollout across 27 member states is likely to be uneven. And using a wallet is voluntary for citizens, so real users will not all have one on day one. That is why a fallback method still matters, and why Tessio ships with one.',
        ],
      },
      {
        heading: 'What relying parties have to accept',
        body: [
          'The acceptance duty is not on everyone. Under Article 5f it falls on private relying parties, other than micro and small enterprises, that are required by law or contract to use strong user authentication for online identification. The regulation names the sectors, including banking and financial services, transport, energy, health, telecommunications and more.',
          'If you are one of those relying parties, you will need to accept the wallet when a user chooses to present it. In practice that means running a verifier that can speak the wallet protocols and check the credential against a current trust layer.',
        ],
      },
      {
        heading: 'What you need to verify a wallet',
        body: [
          'To accept a wallet credential you need a verifier that speaks OpenID4VP and understands both mandated credential formats, SD-JWT VC and ISO 18013-5 mdoc. You also need a trust layer that stays current as member states and issuers come online, so you know a credential really was issued by who it claims.',
          'That is what Tessio is. A hosted verifier and trust layer for age and identity checks, with an open-source .NET core you can self-host if credentials cannot leave your environment.',
        ],
      },
    ],
    tessioFit: [
      'Tessio is built on the EU Digital Identity Wallet standards, so accepting a wallet is the thing it does rather than a feature bolted on. You integrate once and stay ready as wallets roll out, instead of re-integrating a document-based tool later.',
      'For age specifically, Tessio returns a signed over-18 yes or no and stores no personal data. If you are a regulated relying party planning your 2027 rollout, or you just want a wallet-native age check now, that is the fit.',
    ],
    faqs: [
      {
        q: 'When do businesses have to accept the EU Digital Identity Wallet?',
        a: 'Regulated relying parties that must use strong user authentication have to accept the wallet within 36 months of the relevant implementing acts, which lands around the end of 2027. That date is derived from the implementing-acts clock rather than fixed in the regulation, and acceptance applies when a user chooses to present the wallet.',
      },
      {
        q: 'Is the wallet mandatory for everyone?',
        a: 'No. Using a wallet is voluntary for citizens, and other identification methods stay available. The obligation is that each member state makes a wallet available, and that regulated relying parties accept it when a user presents it. That is why a fallback method still matters in practice.',
      },
      {
        q: 'What do I need to verify a wallet credential?',
        a: 'A verifier that speaks OpenID4VP and understands SD-JWT VC and ISO 18013-5 mdoc, plus a trust layer that stays current as issuers come online. Tessio provides both, hosted or self-hosted on .NET.',
      },
    ],
    useCases: ['igaming', 'retail', 'adult'],
    sources: [
      {
        label: 'EUR-Lex: Regulation (EU) 2024/1183',
        href: 'https://eur-lex.europa.eu/eli/reg/2024/1183/oj',
      },
      {
        label: 'European Commission: EUDI regulation and implementing acts',
        href: 'https://digital-strategy.ec.europa.eu/en/policies/eudi-regulation',
      },
    ],
  },
];

export const REGULATION_INDEX = REGULATIONS.map((r) => ({
  slug: r.slug,
  shortName: r.shortName,
  name: r.name,
  category: r.category,
}));

export function getRegulation(slug: string): Regulation | undefined {
  return REGULATIONS.find((r) => r.slug === slug);
}
