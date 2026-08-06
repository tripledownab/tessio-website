// use-case data — one record per vertical. Pages under /use-cases/[slug] are thin wrappers.
// Each targets "age verification for [vertical]" and "[vertical] age assurance".
import type { Faq } from '../lib/seo';
import { API_URL } from '../consts';

export interface HowStep {
  title: string;
  body: string;
}

export interface UseCase {
  slug: string;
  name: string;
  /** Shorter label for nav and cards. */
  short: string;
  category: string;
  title: string;
  description: string;
  lead: string;
  problem: string[];
  before: string[];
  after: string[];
  how: HowStep[];
  snippet?: string;
  faqs: Faq[];
  /** Related regulation slugs (osa, dsa, eudi) for internal linking. */
  regulations: string[];
  /** Related competitor slugs for internal linking. */
  compare: string[];
}

// The API call is the same shape everywhere, we just change the reference label per vertical.
function snippet(reference: string): string {
  return `curl -X POST ${API_URL}/v1/age-checks \\
  -H "Authorization: Bearer tk_live_your_key" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: ${reference}" \\
  -d '{ "minAge": 18, "reference": "${reference}" }'`;
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'igaming',
    name: 'iGaming',
    short: 'iGaming',
    category: 'Betting and gaming',
    title: 'Age verification for iGaming and betting',
    description:
      'Age assurance for iGaming and betting. Prove players are 18+ from the EU Digital Identity Wallet, cut sign-up drop-off and store no personal data. EUDI-native, built on our open-source verifier.',
    lead: "Every licensed market makes you check that players are 18 or older. Tessio does that from the player's EU Digital Identity Wallet, so you get a signed yes or no, less sign-up drop-off and no ID data to hold.",
    problem: [
      'Betting and gaming operators have to verify age in every market they hold a licence in. The usual fix is a document scan or a database check bolted onto sign-up. That adds friction right where you lose the most players, and it means you are now storing identity documents that are a GDPR and breach liability.',
      "It also ages badly. Most of those tools were not built for the EU Digital Identity Wallet, so when the mandate lands you re-integrate. Tessio proves the player is over 18 from their wallet and hands you a signed boolean, so you keep the answer you need and nothing else.",
    ],
    before: [
      'Document upload or database check at sign-up, right where drop-off is worst.',
      'You store identity documents and dates of birth, so a breach exposes real player data.',
      'Separate tooling per market with its own data handling to review.',
      "Bolted-on vendors that weren't built for the EU wallet, so you re-integrate later.",
    ],
    after: [
      'The player confirms 18+ from their wallet in a couple of taps, with no document to upload.',
      'You store a signed over-18 yes or no, so there is no player ID data to leak.',
      'One integration that works across your EU markets.',
      'Built on the EU wallet standards, so you are ready for the mandate instead of re-doing it.',
    ],
    how: [
      {
        title: 'Call the API at sign-up',
        body: 'POST an age check when a player registers or before their first deposit. You get back a hosted verification link.',
      },
      {
        title: 'The player confirms 18+',
        body: 'They prove they are over 18 from their EU Digital Identity Wallet. No ID scan and no selfie.',
      },
      {
        title: 'You get a signed result',
        body: 'A signed yes or no lands on your webhook. You record the answer for your licence and store no personal data.',
      },
    ],
    snippet: snippet('signup-4821'),
    faqs: [
      {
        q: 'Does this satisfy licensing age checks?',
        a: 'Tessio proves a player is over 18 and gives you a signed, auditable result you can keep as evidence. Age rules are set by your national gambling regulator and licence conditions, so check that a wallet-based over-18 proof meets your specific market. We are happy to talk through what your regulator expects.',
      },
      {
        q: 'Will it hurt conversion?',
        a: "A wallet confirmation is a couple of taps with no document upload, so it's usually lighter than a document scan. Players without a wallet yet fall back to another method, so you still cover everyone while the EU wallet rolls out.",
      },
      {
        q: 'What do you store about players?',
        a: 'Nothing personal. The result is an over-18 yes or no, not a date of birth or an ID document. That keeps your GDPR footprint and breach exposure low, which matters when you handle a lot of players.',
      },
    ],
    regulations: ['eudi', 'dsa', 'osa'],
    compare: ['sumsub', 'veriff', 'gbg'],
  },
  {
    slug: 'retail',
    name: 'age restricted retail',
    short: 'Age restricted retail',
    category: 'Nicotine, vape and alcohol',
    title: 'Age verification for age restricted retail',
    description:
      'Age verification for nicotine, vape and alcohol sales online. Prove buyers are 18+ from the EU Digital Identity Wallet at checkout without killing conversion, and store no ID data.',
    lead: 'Selling nicotine, vape or alcohol online means proving the buyer is old enough. Tessio does that at checkout from their EU Digital Identity Wallet, so you meet the law without killing conversion and without holding any ID data.',
    problem: [
      "Nicotine, vape and alcohol are age restricted by national law almost everywhere. Online, that usually means a clunky age gate or a document check at checkout, which is exactly where you don't want more friction. And once you collect an ID, you own the liability of storing it.",
      'Tessio moves the check to the buyer wallet. They confirm they are over 18, you get a signed yes or no, and you store no personal data. It is a lighter checkout step and a much smaller data footprint to defend.',
    ],
    before: [
      'A heavy age gate or document upload at checkout, hurting conversion.',
      'You hold customer IDs and dates of birth, which is data you now have to secure.',
      'Weak self-declaration that regulators increasingly reject.',
      'Different handling per country with no single approach.',
    ],
    after: [
      'A quick wallet confirmation at checkout, with no document to upload.',
      'You store a signed over-18 result and no customer ID data.',
      'A real proof of age rather than a tick-box the buyer can lie on.',
      'One integration across your EU storefronts.',
    ],
    how: [
      {
        title: 'Call the API at checkout',
        body: 'POST an age check before the buyer completes an order for age restricted goods. You get a hosted verification link.',
      },
      {
        title: 'The buyer confirms 18+',
        body: 'They prove they are over 18 from their EU Digital Identity Wallet, at checkout, without uploading anything.',
      },
      {
        title: 'You get a signed result',
        body: 'A signed yes or no lands on your webhook, so you can release the order and keep evidence without storing personal data.',
      },
    ],
    snippet: snippet('order-4821'),
    faqs: [
      {
        q: 'Which products does this cover?',
        a: 'Any age restricted product where you need to prove the buyer is over 18, such as nicotine pouches, vapes, tobacco and alcohol. The minimum age is set by national law, so confirm the threshold for each market you sell into.',
      },
      {
        q: 'Does it slow down checkout?',
        a: "It's a wallet confirmation of a single fact, so it's lighter than uploading and processing an ID. Buyers without a wallet fall back to another method, so you don't lose the sale while the EU wallet rolls out.",
      },
      {
        q: 'Do you store the buyer ID?',
        a: 'No. You get an over-18 yes or no, not a document or a date of birth. There is no ID image on your systems or ours to secure or leak.',
      },
    ],
    regulations: ['eudi', 'osa'],
    compare: ['agechecked', 'idenfy', 'veriff'],
  },
  {
    slug: 'dating',
    name: 'dating apps',
    short: 'Dating',
    category: 'Dating and matchmaking',
    title: 'Age verification for dating apps',
    description:
      'Age assurance for dating apps. Confirm users are 18+ from the EU Digital Identity Wallet, meet DSA and UK Online Safety Act duties and store no personal data. Privacy-first by design.',
    lead: 'Dating apps are under real pressure to keep minors out and to prove they take it seriously. Tessio confirms a user is over 18 from their EU Digital Identity Wallet, so you can meet those duties without turning your app into an ID collector.',
    problem: [
      "Regulators expect dating platforms to keep under-18s off adult-oriented services. The DSA asks platforms accessible to minors to take proportionate protection measures, and the UK Online Safety Act sets age-assurance duties. But collecting IDs to prove age creates its own privacy problem, and users hate handing over documents.",
      'Tessio threads that needle. The user proves they are over 18 from their wallet, you get a signed yes or no, and you store no personal data. You get the assurance regulators want without the ID data users resent giving.',
    ],
    before: [
      'Self-declared birthdays that offer no real assurance.',
      'Document upload that users distrust and abandon.',
      'You store IDs and dates of birth, adding privacy risk to a sensitive product.',
      'No clean audit trail to show a regulator.',
    ],
    after: [
      'A wallet-based over-18 proof that users can give without sharing documents.',
      'A signed, auditable result you can show demonstrates a real age check.',
      'No personal data stored, which suits a product built on trust.',
      'One approach aligned to the EU wallet and its coming mandate.',
    ],
    how: [
      {
        title: 'Call the API at onboarding',
        body: 'POST an age check when a user signs up or before they access adult features. You get a hosted verification link.',
      },
      {
        title: 'The user confirms 18+',
        body: 'They prove they are over 18 from their EU Digital Identity Wallet. No ID upload.',
      },
      {
        title: 'You get a signed result',
        body: 'A signed yes or no lands on your webhook. You gate access and keep evidence, and store no personal data.',
      },
    ],
    snippet: snippet('signup-4821'),
    faqs: [
      {
        q: 'Does this meet DSA and Online Safety Act duties?',
        a: 'The DSA asks platforms accessible to minors to take proportionate measures, and the Commission guidance points to age verification for higher-risk contexts. The UK Online Safety Act sets highly effective age-assurance duties enforced by Ofcom. Tessio gives you a real, auditable over-18 proof, which is the kind of measure both regimes are looking for. Read our summaries and confirm your own duties.',
      },
      {
        q: 'Why is a wallet check better for a dating app?',
        a: "Dating is a trust product, so asking users to upload an ID works against you. A wallet confirmation proves age without sharing documents, and because we store nothing, there's no sensitive dataset to breach.",
      },
      {
        q: 'What about users without an EU wallet?',
        a: 'Today, most people do not have one yet. EU wallet rollout is early and we do not provide a document or selfie fallback, so Tessio is not a drop-in replacement for your current age checks. The realistic path is to run Tessio alongside what you already use and move more traffic to the wallet as adoption grows. We would rather tell you that now than after you have integrated.',
      },
    ],
    regulations: ['dsa', 'osa', 'eudi'],
    compare: ['persona', 'veriff', 'yoti'],
  },
  {
    slug: 'adult',
    name: 'adult platforms',
    short: 'Adult platforms',
    category: 'Adult content',
    title: 'Age verification for adult platforms',
    description:
      'Highly effective age assurance for adult platforms under the UK Online Safety Act and national law. Prove visitors are 18+ from the EU Digital Identity Wallet without collecting any ID.',
    lead: 'Adult platforms now face highly effective age-assurance duties, and the usual answer, upload your ID, is exactly what your users refuse to do. Tessio proves a visitor is over 18 from their EU Digital Identity Wallet and stores no personal data.',
    problem: [
      'The UK Online Safety Act requires highly effective age assurance on services that show pornographic content, enforced by Ofcom with serious penalties. National laws across the EU add their own rules. The friction is real: users do not want to hand an adult site a photo of their ID, and you do not want to store it.',
      'Tessio is built for exactly this. The visitor proves they are over 18 from their wallet, you get a signed yes or no, and neither of us keeps any personal data. It is the strong age check regulators want without the ID collection your users hate.',
    ],
    before: [
      'ID upload that users abandon and distrust.',
      'You store identity documents tied to adult browsing, a serious breach risk.',
      'Self-declaration that fails the highly effective bar.',
      'Vendors not built for the EU wallet, so you re-integrate later.',
    ],
    after: [
      'A wallet-based over-18 proof with no document to upload.',
      'No personal data stored, so there is no sensitive dataset to leak.',
      'A real, auditable age check aimed at the highly effective standard.',
      'Built on the EU wallet standards the Commission blueprint also uses.',
    ],
    how: [
      {
        title: 'Call the API at the gate',
        body: 'POST an age check before you grant access to adult content. You get a hosted verification link to present as a QR code or deep link.',
      },
      {
        title: 'The visitor confirms 18+',
        body: 'They prove they are over 18 from their EU Digital Identity Wallet. No ID upload.',
      },
      {
        title: 'You get a signed result',
        body: 'A signed yes or no lands on your webhook. You grant access and hold evidence, storing no personal data.',
      },
    ],
    snippet: snippet('gate-4821'),
    faqs: [
      {
        q: 'Does this meet the UK Online Safety Act?',
        a: "The Act requires highly effective age assurance, which Ofcom says must be technically accurate, robust, reliable and fair. Ofcom lists digital identity services and wallets among methods that can be highly effective. Tessio gives you a cryptographic over-18 proof, but you're responsible for meeting Ofcom's criteria, so review our Online Safety Act summary and confirm your setup.",
      },
      {
        q: 'Why do users prefer this?',
        a: "The single biggest complaint about age checks on adult sites is being asked to upload an ID. A wallet confirmation proves the visitor is over 18 without sharing any document, and because nothing is stored, there's no record tying identity to adult browsing.",
      },
      {
        q: 'What about visitors without a wallet?',
        a: 'Today, most people do not have one yet. EU wallet rollout is early and we do not provide a document or selfie fallback, so Tessio is not a drop-in replacement for your current age checks. The realistic path is to run Tessio alongside what you already use and move more traffic to the wallet as adoption grows. We would rather tell you that now than after you have integrated.',
      },
    ],
    regulations: ['osa', 'dsa', 'eudi'],
    compare: ['yoti', 'verifymy', 'agechecked'],
  },
  {
    slug: 'social',
    name: 'social and UGC platforms',
    short: 'Social and UGC',
    category: 'Social and user content',
    title: 'Age verification for social and UGC platforms',
    description:
      'Age assurance for social and user-generated content platforms. Meet DSA minor-protection and Online Safety Act duties by confirming users are 18+ from the EU wallet, storing no personal data.',
    lead: 'Social and user content platforms have to protect minors without turning into ID collectors. Tessio confirms a user is over 18 from their EU Digital Identity Wallet, so you can gate adult features and meet your duties while storing no personal data.',
    problem: [
      "Under the DSA, platforms accessible to minors have to take proportionate measures to protect them, and the DSA is explicit that you shouldn't collect extra personal data just to check age. The UK Online Safety Act adds age-assurance duties for services likely to be accessed by children. So you need real assurance and minimal data at the same time.",
      'That is the shape of Tessio. A user proves they are over 18 from their wallet, you get a signed yes or no, and no personal data is stored. You can gate adult features or age restrict parts of the experience without building an identity database.',
    ],
    before: [
      'Self-declared ages that give no real protection.',
      'Heavy ID checks that clash with the DSA data-minimisation expectation.',
      'You store personal data just to estimate age, which regulators caution against.',
      'No auditable record that you took a real measure.',
    ],
    after: [
      'A wallet-based over-18 proof that fits data minimisation.',
      'No extra personal data collected or stored to check age.',
      'A signed, auditable result showing you took a proportionate measure.',
      'One approach aligned to the EU wallet and the Commission age-verification blueprint.',
    ],
    how: [
      {
        title: 'Call the API where you gate',
        body: 'POST an age check when a user reaches an age restricted feature or signs up. You get a hosted verification link.',
      },
      {
        title: 'The user confirms 18+',
        body: 'They prove they are over 18 from their EU Digital Identity Wallet. No ID upload.',
      },
      {
        title: 'You get a signed result',
        body: 'A signed yes or no lands on your webhook. You apply the right experience and store no personal data.',
      },
    ],
    snippet: snippet('gate-4821'),
    faqs: [
      {
        q: 'Does this fit the DSA data minimisation rule?',
        a: 'The DSA says protecting minors should not push you to collect more personal data than you already hold. A wallet-based over-18 proof returns a single yes or no and stores nothing, which sits well with that principle. Read our DSA summary and confirm your own obligations.',
      },
      {
        q: 'Can I age restrict only part of the experience?',
        a: 'Yes. You choose where to require a check, so you can gate adult features or specific spaces rather than the whole platform, and only ask for a check when it actually matters.',
      },
      {
        q: 'What about users without a wallet?',
        a: 'Today, most people do not have one yet. EU wallet rollout is early and we do not provide a document or selfie fallback, so Tessio is not a drop-in replacement for your current age checks. The realistic path is to run Tessio alongside what you already use and move more traffic to the wallet as adoption grows. We would rather tell you that now than after you have integrated.',
      },
    ],
    regulations: ['dsa', 'osa', 'eudi'],
    compare: ['verifymy', 'yoti', 'persona'],
  },
];

export const USE_CASE_INDEX = USE_CASES.map((u) => ({
  slug: u.slug,
  name: u.name,
  short: u.short,
  category: u.category,
}));

export function getUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((u) => u.slug === slug);
}
