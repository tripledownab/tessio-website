// comparison-data — one record per competitor. Pages under /compare/[slug] are thin wrappers.
//
// Rules for this file:
//  - Balanced and fair. Every page has a real "when to choose them over us" section.
//  - No competitor pricing. None of these vendors publish list pricing, so we never state it.
//  - EUDI claims are careful: "accepts the wallet as a document" (Veriff, Sumsub) and
//    "sandbox pilot" (Persona) are true. For the rest we say "none we could find, verify",
//    never a flat assertion of absence.
//  - Only certifications we could verify are named (Yoti: NIST/ACCS, VerifyMy: ACCS).
import type { Faq } from '../lib/seo';

export interface CompareRow {
  feature: string;
  tessio: string | boolean;
  them: string | boolean;
}

export interface Comparison {
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  lead: string;
  intro: string[];
  rows: CompareRow[];
  theirStrengths: string[];
  chooseThem: string;
  chooseUs: string;
  faqs: Faq[];
  /** Slugs of related use-cases, for internal linking. */
  useCases?: string[];
}

// The Tessio column is the same on every page, so we keep it in one place.
const FEATURES = [
  'Core approach',
  'What you get back',
  'Personal data stored',
  'EU Digital Identity Wallet',
  'Self-hosting',
  'Full KYC and AML',
  'Built on',
  'Primary market',
] as const;

type Feature = (typeof FEATURES)[number];

const TESSIO: Record<Feature, string | boolean> = {
  'Core approach': 'EU Digital Identity Wallet credential over OpenID4VP',
  'What you get back': 'A signed over-18 yes or no',
  'Personal data stored': 'None. No date of birth, no document image, no selfie',
  'EU Digital Identity Wallet': 'Native. The whole product is built on it',
  'Self-hosting': 'Yes. Open-source .NET core under Apache-2.0',
  'Full KYC and AML': 'No. Age assurance only, on purpose',
  'Built on': 'Open-source ASP.NET Core (OpenID4VP, SD-JWT VC, mdoc)',
  'Primary market': 'EU age assurance for regulated platforms',
};

function rows(them: Record<Feature, string | boolean>): CompareRow[] {
  return FEATURES.map((f) => ({ feature: f, tessio: TESSIO[f], them: them[f] }));
}

export const COMPARISONS: Comparison[] = [
  {
    slug: 'yoti',
    name: 'Yoti',
    category: 'Age assurance and digital ID',
    title: 'Yoti alternative: EUDI-native age verification',
    description:
      'Tessio vs Yoti, compared fairly. A privacy-first age verification API built on the EU Digital Identity Wallet that stores no personal data, next to Yoti age assurance.',
    lead: "Yoti is one of the most established names in age assurance. Tessio takes a narrower, wallet-first route: it proves someone is over 18 straight from the EU Digital Identity Wallet and keeps no personal data. Here's a fair look at where each one fits.",
    intro: [
      "Yoti and Tessio both help you check that a user is old enough, but they come at it from different ends. Yoti built a broad toolkit over the last decade: facial age estimation, a reusable Yoti digital ID app, age tokens and full document plus biometric identity checks. It's a proven, certified option, especially for UK Online Safety Act work.",
      'Tessio does one thing. Your app asks whether someone is over 18, they confirm it from their EU Digital Identity Wallet, and you get back a signed yes or no. There is no ID scan and no selfie, and we store no personal data. If you want the check inside your own boundary, the .NET core is open source and self-hostable.',
    ],
    rows: rows({
      'Core approach': 'Facial age estimation, a reusable digital ID app, age tokens and document plus biometric checks',
      'What you get back': 'An age or identity result, or a reusable ID or age token',
      'Personal data stored': 'Depends on method. Facial age estimation is anonymous, the digital ID app holds identity data',
      'EU Digital Identity Wallet': 'Not EUDI native. Built around its own reusable ID and the UK DIATF framework',
      'Self-hosting': 'No. Hosted service',
      'Full KYC and AML': 'Yes. Offers identity verification and KYC',
      'Built on': 'Proprietary',
      'Primary market': 'UK and global age assurance and digital ID',
    }),
    theirStrengths: [
      'Facial age estimation that has been evaluated by NIST and under the UK Age Check Certification Scheme, with strong documented accuracy.',
      'A large reusable digital ID footprint, so returning users can prove their age again without repeating the whole flow.',
      'Certified under the UK DIATF trust framework and a credible choice for Ofcom-grade age assurance today.',
    ],
    chooseThem:
      "If most of your users are in the UK and you need certified facial age estimation right now for people who don't have an EU wallet yet, Yoti is a safer bet. Its age estimation is independently evaluated, it carries UK certifications, and it covers users of every age with no wallet required. We'd rather point you there than pretend the EU wallet is already in everyone's pocket.",
    chooseUs:
      "Pick Tessio when you're building for the EU, you want to store no personal data at all, and you want to be ready for the wallet mandate instead of re-integrating later. You get a signed over-18 boolean and nothing else, so your GDPR footprint drops to almost nothing. If your compliance team won't let identity data leave your environment, you can self-host the open-source .NET core.",
    faqs: [
      {
        q: 'Is Tessio a Yoti alternative?',
        a: "For age verification, yes. If you only need to prove someone is over 18 and you'd rather not store any personal data, Tessio does that from the EU Digital Identity Wallet. Yoti is broader and covers full identity and reusable digital ID, so the right pick depends on how much you need.",
      },
      {
        q: 'Does Yoti support the EU Digital Identity Wallet?',
        a: "Yoti is primarily built around its own reusable digital ID and age tokens and the UK DIATF framework rather than a native EUDI Wallet verifier. It's active in age-token interoperability work. If native EUDI support matters to you, confirm the current state with Yoti directly.",
      },
      {
        q: 'Can I use both?',
        a: "Sure. Some teams use Yoti facial age estimation for users without a wallet and reach for a wallet-native check like Tessio as EU wallets roll out. They solve overlapping problems, so running both while the wallet ecosystem matures is reasonable.",
      },
    ],
    useCases: ['adult', 'social'],
  },
  {
    slug: 'veriff',
    name: 'Veriff',
    category: 'Identity verification and KYC',
    title: 'Veriff alternative: age verification without storing ID',
    description:
      'Tessio vs Veriff, compared fairly. An EUDI-native age verification API that returns an over-18 yes or no and stores no personal data, next to Veriff document and biometric KYC.',
    lead: "Veriff is a mature global KYC platform built on document and biometric checks. Tessio is a much narrower tool: it proves someone is over 18 from the EU Digital Identity Wallet and stores no personal data. If all you need is an age gate, that difference is the whole story.",
    intro: [
      'Veriff verifies identities at scale. A user photographs an ID document and their face, Veriff matches them against thousands of document types across almost every country, adds liveness and fraud signals, and returns a full identity verification result. It is a strong fit for onboarding where you genuinely need to know who someone is.',
      "Tessio isn't trying to do that. It answers one question, is this person over 18, using a credential from their EU Digital Identity Wallet. There is no document capture and no biometric processing, and we keep no personal data. If you only need an age check, you don't have to take on the data that full KYC brings with it.",
    ],
    rows: rows({
      'Core approach': 'Document scan plus facial biometrics and liveness, matched against thousands of ID types',
      'What you get back': 'A full identity verification result',
      'Personal data stored': 'Processes ID documents and biometric data',
      'EU Digital Identity Wallet': 'Accepts the wallet as one document type in its flow, not a wallet-native design',
      'Self-hosting': 'No. Hosted service',
      'Full KYC and AML': 'Yes',
      'Built on': 'Proprietary',
      'Primary market': 'Global KYC and identity verification',
    }),
    theirStrengths: [
      'Very broad document coverage, matching thousands of ID types across 190 plus countries with strong automation.',
      'Mature fraud and liveness detection, tuned over years of high-volume onboarding.',
      'Well established across fintech, crypto, marketplaces and mobility where full identity proofing is the job.',
    ],
    chooseThem:
      "If you need to actually verify identity, not just age, Veriff is the stronger tool. Full KYC, AML screening, document capture and fraud monitoring across almost every country is exactly what it's built for, and Tessio deliberately does none of that. When your compliance obligation is know your customer rather than confirm the customer is an adult, go with a platform like Veriff.",
    chooseUs:
      'Pick Tessio when the requirement is age, not identity, and you want to hold no personal data. You get a signed over-18 boolean, so there is no document image or biometric template to secure or breach. It is EU wallet native, so it is built for the eIDAS mandate rather than accepting the wallet as one more document type, and you can self-host the .NET core if data cannot leave your environment.',
    faqs: [
      {
        q: 'Is Tessio a Veriff alternative?',
        a: "For age checks, yes. If you only need to confirm someone is over 18, Tessio does it without collecting a document or a selfie. If you need full KYC and identity proofing, Veriff does far more than Tessio does, so it depends on the obligation you're meeting.",
      },
      {
        q: 'Does Veriff support the EU Digital Identity Wallet?',
        a: 'Veriff lists the EU Digital Identity Wallet among accepted document types, so it can take a wallet credential as an input to its identity flow. That is different from a wallet-native, data-minimal design that returns only an age result, which is what Tessio is.',
      },
      {
        q: 'Can I use both?',
        a: 'Yes, and plenty of teams will. Use Veriff for full identity onboarding where you need it, and use Tessio for the high-volume age gate where you only need a yes or no and would rather not store personal data.',
      },
    ],
    useCases: ['igaming', 'dating'],
  },
  {
    slug: 'onfido',
    name: 'Onfido',
    category: 'Identity verification and KYC',
    title: 'Onfido alternative: privacy-first EU age verification',
    description:
      'Tessio vs Onfido (now part of Entrust), compared fairly. An EUDI-native age verification API that stores no personal data, next to Onfido document and biometric identity verification.',
    lead: 'Onfido, now part of Entrust, is an enterprise identity verification suite built on document and biometric checks. Tessio is a focused age verification API that proves someone is over 18 from the EU Digital Identity Wallet and stores no personal data.',
    intro: [
      "Onfido verifies identity with document capture and facial biometrics, wrapped in an orchestration layer that mixes methods and data sources per market. Since Entrust completed the acquisition in 2024, it sits inside a broader identity and credential portfolio. For enterprises that want full IDV plus fraud plus orchestration, that breadth is the point.",
      'Tessio is deliberately small. It confirms one claim, over 18, from a wallet credential, and returns a signed yes or no with no personal data kept. There is no selfie and no document scan. When your job is an age gate rather than full identity proofing, that is far less data to hold and far less to integrate.',
    ],
    rows: rows({
      'Core approach': 'Document verification plus facial biometrics and liveness, with method orchestration',
      'What you get back': 'A full identity verification result',
      'Personal data stored': 'Processes ID documents and biometric data',
      'EU Digital Identity Wallet': 'No EUDI-native age product we could find. Entrust is active in digital identity, so verify',
      'Self-hosting': 'No. Hosted service',
      'Full KYC and AML': 'Yes',
      'Built on': 'Proprietary',
      'Primary market': 'Enterprise KYC and identity, now inside Entrust',
    }),
    theirStrengths: [
      'A mature, well benchmarked document and biometric stack covering thousands of document types.',
      'Backed by Entrust, so it comes with a wider identity, PKI and credential portfolio to cross-sell into.',
      'An orchestration layer that lets large teams mix verification methods per market and risk level.',
    ],
    chooseThem:
      'If you need full identity verification at enterprise scale, with document capture, fraud signals and the wider Entrust identity stack around it, Onfido is built for that and Tessio is not. When the obligation is know your customer and you want one vendor for IDV, fraud and credentials, the Entrust suite is the stronger fit.',
    chooseUs:
      "Pick Tessio when you only need to prove age, you want to store no personal data, and you're building for the EU wallet rollout specifically. You get a signed over-18 boolean and nothing else, which keeps your GDPR footprint tiny, and you can run the open-source .NET verifier inside your own boundary if identity data can't go to a hosted service.",
    faqs: [
      {
        q: 'Is Tessio an Onfido alternative?',
        a: 'For age verification, yes. Tessio confirms someone is over 18 from the EU Digital Identity Wallet without collecting a document or selfie. Onfido, now part of Entrust, does full identity verification, so it does much more than Tessio when you actually need to prove identity.',
      },
      {
        q: 'Does Onfido support the EU Digital Identity Wallet?',
        a: 'We could not find a native EUDI Wallet age product from Onfido or Entrust, though Entrust is broadly active in digital identity and credentials. If native EUDI support matters to your project, confirm the current state with Entrust directly.',
      },
      {
        q: 'Can I use both?',
        a: 'Yes. A common split is Onfido or Entrust for full identity onboarding and Tessio for the age gate, where you only need a yes or no and would rather not store personal data.',
      },
    ],
    useCases: ['igaming', 'retail'],
  },
  {
    slug: 'persona',
    name: 'Persona',
    category: 'Identity platform',
    title: 'Persona alternative: EU wallet age verification',
    description:
      'Tessio vs Persona, compared fairly. An EUDI-native age verification API that returns an over-18 yes or no with no personal data stored, next to the Persona configurable identity platform.',
    lead: "Persona is a flexible identity platform you configure into whatever workflow you need. Tessio is the opposite of flexible on purpose: it does one age check from the EU Digital Identity Wallet and stores no personal data. Persona is also the most EUDI-forward name on this list, so this one's worth reading closely.",
    intro: [
      'Persona gives you building blocks. Document checks, selfie verification, database and knowledge checks, reusable credentials and case review, all orchestrated with your own rules. If you want one platform to design many identity workflows across KYC, KYB and fraud, that configurability is genuinely strong.',
      "Tessio is a single purpose tool. It proves someone is over 18 from their EU wallet and returns a signed yes or no, with no personal data kept. Persona is piloting EUDI wallet support in a sandbox for France and Germany, which is ahead of most US IDV players, but that's early access rather than a wallet-native product like Tessio.",
    ],
    rows: rows({
      'Core approach': 'A configurable platform: document, selfie, database and knowledge checks you orchestrate',
      'What you get back': 'Whatever your workflow returns, from an age check to full KYC',
      'Personal data stored': 'Processes the identity data your workflow collects',
      'EU Digital Identity Wallet': 'Piloting EUDI in a sandbox for France and Germany. Early access, not general availability',
      'Self-hosting': 'No. Hosted service',
      'Full KYC and AML': 'Yes',
      'Built on': 'Proprietary',
      'Primary market': 'US-centric configurable identity workflows',
    }),
    theirStrengths: [
      'Very flexible and developer friendly, so you can build almost any identity workflow without heavy custom work.',
      'Broad method coverage in one platform, spanning KYC, KYB, AML and fraud.',
      'Genuinely forward on EUDI for a US IDV player, with sandbox pilots for French and German wallets.',
    ],
    chooseThem:
      "If you need a configurable platform to run many kinds of identity workflow, not just an age gate, Persona gives you far more surface area than Tessio does. When you want one flexible tool for KYC, KYB and fraud with room to grow, and you're comfortable processing identity data, Persona is a strong pick.",
    chooseUs:
      'Pick Tessio when you only need age, you want EU data residency and a wallet-native design rather than a sandbox pilot, and you want to store no personal data. You get a signed over-18 boolean, the core is open source and self-hostable on .NET, and it is built around the EU wallet from the ground up rather than added to a broader platform.',
    faqs: [
      {
        q: 'Is Tessio a Persona alternative?',
        a: 'For age verification, yes. Tessio does a single wallet-native age check and stores no personal data. Persona is a broad, configurable identity platform, so it does much more, and the right choice depends on whether you need one age gate or a full workflow builder.',
      },
      {
        q: 'Does Persona support the EU Digital Identity Wallet?',
        a: 'Persona has announced sandbox support to verify French and German EUDI wallet credentials, aligned to OpenID4VP. That is early access rather than general availability, and it sits inside a broader platform rather than being wallet native like Tessio.',
      },
      {
        q: 'Can I use both?',
        a: 'Yes. Persona can run your wider identity workflows while Tessio handles the high-volume age gate where you only need a yes or no and want to keep no personal data.',
      },
    ],
    useCases: ['dating', 'social'],
  },
  {
    slug: 'sumsub',
    name: 'Sumsub',
    category: 'KYC, AML and fraud',
    title: 'Sumsub alternative: EU age verification, no PII',
    description:
      'Tessio vs Sumsub, compared fairly. An EUDI-native age verification API that stores no personal data, next to the Sumsub full-funnel KYC, AML and fraud platform.',
    lead: 'Sumsub is a full-funnel KYC, AML and fraud platform, strong in crypto and fintech. Tessio is a narrow age verification API built on the EU Digital Identity Wallet that stores no personal data. If your obligation is compliance onboarding, that gap matters, so here is how they compare.',
    intro: [
      'Sumsub covers the whole compliance funnel. Document and biometric verification, liveness, AML screening, transaction and fraud monitoring, and crypto tooling like travel-rule support. For high-risk verticals that need real KYC and AML, it is a broad and capable suite.',
      "Tessio doesn't do KYC or AML. It proves one claim, over 18, from a wallet credential, and returns a signed yes or no with no personal data kept. When you only need an age gate rather than full compliance onboarding, that is a lot less data to hold and a lot less to wire up.",
    ],
    rows: rows({
      'Core approach': 'Document and biometric verification plus AML screening and fraud monitoring',
      'What you get back': 'A KYC and AML verification result',
      'Personal data stored': 'Processes ID documents and biometric data',
      'EU Digital Identity Wallet': 'Writes about eIDAS 2.0 and can take wallet credentials as an input, not a wallet-native design',
      'Self-hosting': 'No. Hosted service',
      'Full KYC and AML': 'Yes. This is the core of the product',
      'Built on': 'Proprietary',
      'Primary market': 'Crypto, fintech and high-risk KYC and AML',
    }),
    theirStrengths: [
      'A full compliance funnel in one place, from KYC and KYB through AML screening to transaction monitoring.',
      'Particularly strong in crypto and other high-risk verticals with demanding compliance needs.',
      'Broad global document and jurisdiction coverage for onboarding at scale.',
    ],
    chooseThem:
      "When your requirement is real KYC and AML, not just age, Sumsub is built for it and Tessio isn't. If you run a crypto exchange or a fintech that has to screen customers, monitor transactions and hold identity records, a full compliance platform is the right tool and an age gate won't cover it.",
    chooseUs:
      'Pick Tessio when age is the actual requirement and you want to store no personal data. You get a signed over-18 boolean, so there is no document or biometric data to secure. It is EU wallet native and built for the mandate, and the open-source .NET core can run inside your own environment when identity data cannot go to a hosted service.',
    faqs: [
      {
        q: 'Is Tessio a Sumsub alternative?',
        a: "For age checks, yes. Tessio confirms someone is over 18 from the EU wallet with no personal data stored. Sumsub is a full KYC and AML platform, so if you need compliance onboarding it does far more than Tessio, and it depends on the obligation you're meeting.",
      },
      {
        q: 'Does Sumsub support the EU Digital Identity Wallet?',
        a: 'Sumsub publishes eIDAS 2.0 material and can take wallet and national digital ID credentials as inputs to its KYC flows. That is different from a wallet-native, age-only design that stores no personal data, which is what Tessio is.',
      },
      {
        q: 'Can I use both?',
        a: 'Yes. Use Sumsub for KYC and AML where regulation requires it, and use Tessio for the age gate where you only need a yes or no and would rather keep no personal data.',
      },
    ],
    useCases: ['igaming', 'adult'],
  },
  {
    slug: 'idenfy',
    name: 'iDenfy',
    category: 'Identity verification and KYC',
    title: 'iDenfy alternative: EUDI age verification API',
    description:
      'Tessio vs iDenfy, compared fairly. An EUDI-native age verification API that stores no personal data, next to iDenfy document verification, KYC and age estimation.',
    lead: 'iDenfy is an EU-based identity verification and KYC provider that recently added facial age estimation. Tessio is a wallet-native age verification API that proves someone is over 18 from the EU Digital Identity Wallet and stores no personal data.',
    intro: [
      'iDenfy does document OCR and selfie matching across thousands of document types, with AML tools and, more recently, a facial age estimation option and a standalone deployment. Based in Lithuania, it is a cost-conscious EU option for teams that want IDV and KYC together.',
      "Tessio is narrower. It confirms one claim, over 18, from a wallet credential, and returns a signed yes or no with no personal data kept. There's no document scan and no selfie. If you only need an age check, you avoid collecting the identity data that a full IDV flow requires.",
    ],
    rows: rows({
      'Core approach': 'Document OCR and selfie match, with a newer facial age estimation option',
      'What you get back': 'An identity verification or age estimation result',
      'Personal data stored': 'Processes ID documents and biometric data',
      'EU Digital Identity Wallet': 'Baltic national eID (Mobile-ID) integrations. No EUDI-native wallet verifier we could find, so verify',
      'Self-hosting': 'Offers a standalone deployment option, though not an open-source self-host like ours',
      'Full KYC and AML': 'Yes',
      'Built on': 'Proprietary',
      'Primary market': 'Affordable EU identity verification and KYC',
    }),
    theirStrengths: [
      'A cost-conscious full IDV and KYC suite from an EU base in Lithuania.',
      'Recently added facial age estimation and a standalone deployment option.',
      'Integrations with Baltic national eID, including SIM-based Mobile-ID for Estonia and Lithuania.',
    ],
    chooseThem:
      "If you want an affordable EU platform that does full document verification and KYC, plus age estimation as one option among many, iDenfy covers more ground than Tessio does. When you need identity proofing and not just an age gate, a full IDV provider is the right call.",
    chooseUs:
      'Pick Tessio when age is the requirement, you want a wallet-native design rather than document scanning, and you want to store no personal data. You get a signed over-18 boolean, the .NET core is open source and self-hostable, and it is built on the EU wallet standards so you are ready for the mandate rather than relying on document capture.',
    faqs: [
      {
        q: 'Is Tessio an iDenfy alternative?',
        a: 'For age verification, yes. Tessio proves someone is over 18 from the EU wallet without collecting a document or selfie. iDenfy does full IDV and KYC, so it does more than Tessio when you need to verify identity rather than just age.',
      },
      {
        q: 'Does iDenfy support the EU Digital Identity Wallet?',
        a: 'iDenfy integrates Baltic national eID such as Mobile-ID, but we could not find a native EUDI Wallet verifier. If native EUDI support matters to you, confirm the current state with iDenfy directly.',
      },
      {
        q: 'Can I use both?',
        a: 'Yes. iDenfy can handle full identity verification where you need it, while Tessio handles the age gate where a yes or no is enough and you want to store no personal data.',
      },
    ],
    useCases: ['retail', 'igaming'],
  },
  {
    slug: 'agechecked',
    name: 'AgeChecked',
    category: 'Age assurance',
    title: 'AgeChecked alternative: EUDI age verification',
    description:
      'Tessio vs AgeChecked, compared fairly. An EUDI-native age verification API that stores no personal data, next to AgeChecked orchestrated age assurance for regulated sectors.',
    lead: 'AgeChecked is a UK age assurance specialist with a strong record in gambling and age restricted commerce. Tessio is a wallet-native age verification API built on the EU Digital Identity Wallet. Both minimise data, so this comparison is more about market and method than philosophy.',
    intro: [
      'AgeChecked orchestrates multiple age check methods: a client API, batch upload, a consumer pop-up gateway, database and knowledge checks, and a large anonymised database of pre-verified ages. It anonymises consumers and says it keeps no personal data on its systems, which makes it a genuinely privacy-minded option, and it is well suited to UK regulated sectors.',
      'Tessio takes the wallet-native route. A user proves they are over 18 from their EU Digital Identity Wallet, and you get a signed yes or no with no personal data kept. Where AgeChecked leans on UK data sources and its own database, Tessio leans on the EU wallet standards and the coming mandate.',
    ],
    rows: rows({
      'Core approach': 'Orchestrated age checks: database and knowledge checks plus a large anonymised age database',
      'What you get back': 'An age assurance result',
      'Personal data stored': 'Anonymises consumers and says it keeps no personal data on its systems',
      'EU Digital Identity Wallet': 'UK and DIATF oriented. No EUDI-native wallet verifier we could find, so verify',
      'Self-hosting': 'No. Hosted service',
      'Full KYC and AML': 'Offers KYC and AML for regulated sectors',
      'Built on': 'Proprietary',
      'Primary market': 'UK gambling and age restricted commerce',
    }),
    theirStrengths: [
      'A strong UK regulated-sector record, especially in gambling and age restricted commerce.',
      'A large anonymised database of pre-verified ages plus a wide range of permissioned data sources.',
      'A privacy-minded posture that anonymises consumers and holds no personal data on its systems.',
    ],
    chooseThem:
      "If your users are mainly in the UK and you want an established age assurance provider with deep national data coverage and a gambling-sector track record, AgeChecked is a strong fit and covers users who don't have an EU wallet. When UK data-based checks are what you need today, it's the more proven option.",
    chooseUs:
      "Pick Tessio when you're building for the EU wallet, you want a signed over-18 boolean from a wallet credential rather than database matching, and you want the option to self-host the open-source .NET core. It is designed around the eIDAS mandate, so you integrate once and stay ready as wallets roll out.",
    faqs: [
      {
        q: 'Is Tessio an AgeChecked alternative?',
        a: 'For EU age assurance, yes. Both keep personal data to a minimum. AgeChecked leans on UK data sources and its own anonymised database, while Tessio proves age from the EU Digital Identity Wallet, so the right pick depends on your market.',
      },
      {
        q: 'Does AgeChecked support the EU Digital Identity Wallet?',
        a: 'AgeChecked is UK and DIATF oriented, and we could not find a native EUDI Wallet verifier. If native EUDI support matters to your rollout, confirm the current state with AgeChecked directly.',
      },
      {
        q: 'Can I use both?',
        a: 'Yes. You could use AgeChecked for UK data-based checks and Tessio for wallet-native EU checks, especially while the EU wallet ecosystem is still ramping up.',
      },
    ],
    useCases: ['retail', 'igaming'],
  },
  {
    slug: 'verifymy',
    name: 'VerifyMy',
    category: 'Age assurance and online safety',
    title: 'VerifyMy alternative: EU wallet age verification',
    description:
      'Tessio vs VerifyMy, compared fairly. An EUDI-native age verification API that stores no personal data, next to VerifyMy certified age estimation for the UK Online Safety Act.',
    lead: 'VerifyMy is a UK age assurance and online safety specialist with certified, low-friction age estimation. Tessio proves someone is over 18 from the EU Digital Identity Wallet and stores no personal data. Both are privacy-minded, so the split is mostly UK Online Safety Act versus EU wallet.',
    intro: [
      'VerifyMy offers one of the widest ranges of age check methods, including facial age estimation with liveness and a proprietary email-based age estimation, plus card, document and mobile checks. It is ACCS certified and aligned to Ofcom expectations, which makes it a strong option for UK Online Safety Act work where you want high pass rates and minimal friction.',
      "Tessio takes the wallet-native route. A user confirms they are over 18 from their EU Digital Identity Wallet, and you get a signed yes or no with no personal data kept. Where VerifyMy shines at estimating age for users who don't have a wallet, Tessio proves it cryptographically from one they do.",
    ],
    rows: rows({
      'Core approach': 'Facial and email age estimation plus card, document and mobile checks',
      'What you get back': 'An age assurance result',
      'Personal data stored': 'Privacy-minded estimation designed to minimise data, aligned to Ofcom expectations',
      'EU Digital Identity Wallet': 'UK and Ofcom oriented. No EUDI-native wallet verifier we could find, so verify',
      'Self-hosting': 'No. Hosted service',
      'Full KYC and AML': 'Focused on age assurance and online safety',
      'Built on': 'Proprietary',
      'Primary market': 'UK Online Safety Act age assurance',
    }),
    theirStrengths: [
      'ACCS certified against the age-check and data-protection standards Ofcom looks for.',
      'A wide menu of low-friction methods, including email and facial age estimation, to maximise pass rates.',
      'Built around UK Online Safety Act expectations, with online safety and content moderation tooling alongside.',
    ],
    chooseThem:
      "If your priority is the UK Online Safety Act right now and you want certified age estimation that works for users without an EU wallet, VerifyMy is a strong, low-friction choice. Its email and facial estimation cover people of any age with no wallet required, which Tessio can't do on its own today.",
    chooseUs:
      'Pick Tessio when you are building for the EU wallet, you want a cryptographic over-18 proof rather than an estimate, and you want to store no personal data. You get a signed boolean, the core is open source and self-hostable on .NET, and it is designed around the eIDAS mandate so you are ready as wallets roll out.',
    faqs: [
      {
        q: 'Is Tessio a VerifyMy alternative?',
        a: 'For EU age verification, yes. VerifyMy estimates age with certified methods that need no wallet, while Tessio proves age cryptographically from the EU wallet. Both keep data to a minimum, so the right pick depends on your market and whether you want an estimate or a wallet proof.',
      },
      {
        q: 'Does VerifyMy support the EU Digital Identity Wallet?',
        a: 'VerifyMy is UK and Ofcom oriented, and we could not find a native EUDI Wallet verifier. If native EUDI support matters to you, confirm the current state with VerifyMy directly.',
      },
      {
        q: 'Can I use both?',
        a: "Yes. A sensible mix is VerifyMy age estimation for users who don't have a wallet and Tessio for wallet-native checks as EU wallets roll out, so you cover everyone without storing personal data.",
      },
    ],
    useCases: ['adult', 'social'],
  },
  {
    slug: 'gbg',
    name: 'GBG',
    category: 'Identity data and fraud',
    title: 'GBG alternative: EUDI age verification, no PII',
    description:
      'Tessio vs GBG, compared fairly. An EUDI-native age verification API that stores no personal data, next to the GBG identity data network, location intelligence and fraud tools.',
    lead: 'GBG is a large, listed identity data and fraud company built on a global data network. Tessio is a narrow age verification API built on the EU Digital Identity Wallet that stores no personal data. These two are about as far apart in approach as this list gets.',
    intro: [
      'GBG verifies people against a huge network of over 200 data partners, adds location intelligence through Loqate and layers fraud prevention on top. It is an enterprise-scale, data-network approach that is strong for data-driven, low-friction verification and address validation across many markets.',
      'Tessio does not touch a data network. It proves one claim, over 18, from a user wallet credential, and returns a signed yes or no with no personal data kept. Where GBG matches you against large identity databases, Tessio asks the user to prove age from a wallet they control, and holds nothing afterwards.',
    ],
    rows: rows({
      'Core approach': 'Data and database identity checks across 200 plus partners, plus location intelligence and fraud tools',
      'What you get back': 'A data-driven identity or address verification result',
      'Personal data stored': 'Matches against large identity data networks',
      'EU Digital Identity Wallet': 'No EUDI-native wallet verifier we could find. The model is data-network centric, so verify',
      'Self-hosting': 'No. Hosted service',
      'Full KYC and AML': 'Yes. Identity and fraud at enterprise scale',
      'Built on': 'Proprietary',
      'Primary market': 'Enterprise identity data and fraud prevention',
    }),
    theirStrengths: [
      'A massive global identity data network plus Loqate location intelligence, strong for low-friction data-driven checks.',
      'Public-company scale and breadth, with a combined identity, fraud and location suite.',
      'Well suited to large enterprises, banks, telco and retail that need data-based verification at scale.',
    ],
    chooseThem:
      "If you want data-network identity verification, address validation and fraud prevention at enterprise scale, GBG offers a breadth Tessio doesn't try to match. When your job is large-scale identity and fraud rather than a privacy-minimal age gate, a data-network provider is the right tool.",
    chooseUs:
      'Pick Tessio when the requirement is age, you would rather prove it from a user wallet than match against identity databases, and you want to store no personal data. You get a signed over-18 boolean, the .NET core is open source and self-hostable, and it is built on the EU wallet standards for the coming mandate.',
    faqs: [
      {
        q: 'Is Tessio a GBG alternative?',
        a: 'For age verification, yes, though the approaches are very different. GBG matches people against large identity data networks, while Tessio proves age from a user wallet and stores no personal data. For a privacy-minimal age gate, Tessio fits, for enterprise identity and fraud, GBG does far more.',
      },
      {
        q: 'Does GBG support the EU Digital Identity Wallet?',
        a: 'We could not find a native EUDI Wallet verifier from GBG, whose model is data-network centric. If native EUDI support matters to your project, confirm the current state with GBG directly.',
      },
      {
        q: 'Can I use both?',
        a: 'Yes. GBG can handle enterprise identity and fraud where you need it, while Tessio handles the age gate where a wallet-native yes or no is enough and you want to keep no personal data.',
      },
    ],
    useCases: ['igaming', 'retail'],
  },
];

export const COMPARISON_INDEX = COMPARISONS.map((c) => ({
  slug: c.slug,
  name: c.name,
  category: c.category,
}));

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
