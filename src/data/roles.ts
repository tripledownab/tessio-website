// role data — one record per audience. Pages under /for/[slug] solve the dual-audience problem:
// developers want the API, compliance wants the data posture, platform providers want the channel.
import type { Faq } from '../lib/seo';
import { API_URL, ACCESS_MAILTO } from '../consts';

export interface Pillar {
  title: string;
  body: string;
}
export interface RoleCta {
  label: string;
  href: string;
}
export interface Role {
  slug: string;
  name: string;
  audience: string;
  category: string;
  title: string;
  description: string;
  heading: string;
  lead: string;
  intro: string[];
  pillars: Pillar[];
  snippet?: string;
  checklist?: string[];
  checklistHeading?: string;
  primaryCta: RoleCta;
  secondaryCta: RoleCta;
  ctaTitle: string;
  ctaBody: string;
  faqs: Faq[];
  /** Related content for internal linking. */
  useCases: string[];
  regulations: string[];
}

const devSnippet = `curl -X POST ${API_URL}/v1/age-checks \\
  -H "Authorization: Bearer tk_live_your_key" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: order-4821" \\
  -d '{ "minAge": 18, "reference": "order-4821" }'`;

export const ROLES: Role[] = [
  {
    slug: 'developers',
    name: 'Developers',
    audience: 'For developers',
    category: 'Build with the API',
    title: 'Age verification API for developers',
    description:
      'The age verification API for developers. One REST call starts a check, the user proves 18+ from their wallet, and a signed result hits your webhook. No SDK, no documents, no PII to store.',
    heading: 'The age verification API for developers',
    lead: "One REST call starts a check, the user proves they're over 18 from their EU Digital Identity Wallet, and a signed result lands on your webhook. No SDK, no documents to handle, and no personal data to store.",
    intro: [
      'Tessio is a plain REST API. You POST an age check, you get back a hosted verification link and a check id, and the signed result comes to you over a webhook. There is nothing to install, no document capture to build and no identity data to warehouse. You can integrate against the sandbox today.',
      'If you would rather run the verifier yourself, the core is open source. Tessio.Verifier is an ASP.NET Core library on NuGet for .NET 8 to 10, under Apache-2.0, and it does OpenID4VP, SD-JWT VC and mdoc. Cloud is the hosted version of the same core.',
    ],
    pillars: [
      {
        title: 'One API, no SDK',
        body: 'POST to /v1/age-checks and present the returned link as a QR code or a deep link. No SDK to install and no documents to handle. Omit the body to verify age_over_18.',
      },
      {
        title: 'Webhooks and idempotency',
        body: 'Register a webhook and verify the HMAC signature before you trust an event. Send an Idempotency-Key so retries return the original check. Polling stays available as a fallback.',
      },
      {
        title: 'No personal data',
        body: 'A check returns an over-18 boolean, not a date of birth or a document. There is no selfie and no ID scan, so there is nothing for you to store or secure.',
      },
      {
        title: 'Open source and self hostable',
        body: 'The core is Tessio.Verifier, ASP.NET Core, Apache-2.0, on NuGet for .NET 8 to 10. Run it hosted as Tessio Cloud, or self host it on your own stack.',
      },
    ],
    snippet: devSnippet,
    primaryCta: { label: 'Read the docs', href: '/docs' },
    secondaryCta: { label: 'Request access', href: ACCESS_MAILTO },
    ctaTitle: 'Build against the sandbox',
    ctaBody:
      "Request access to get a project API key and integrate against the sandbox today. It's invite only while we onboard design partners, and design partners get preferential pricing.",
    faqs: [
      {
        q: 'Is there an SDK to install?',
        a: "No SDK needed. It's a plain REST API you can call with curl or your HTTP client of choice. If you want the verifier as a library, the open source Tessio.Verifier is on NuGet for .NET.",
      },
      {
        q: 'What do I get back?',
        a: 'A signed over-18 yes or no. Register a webhook to receive results, or poll GET /v1/age-checks/{id} as a fallback. The result carries the boolean you need and no personal data.',
      },
      {
        q: 'Can I self host it?',
        a: 'Yes. Tessio Cloud runs on the open source Tessio.Verifier, an ASP.NET Core library on NuGet under Apache-2.0 for .NET 8 to 10. You can run the verifier inside your own environment.',
      },
    ],
    useCases: ['igaming', 'retail'],
    regulations: ['eudi'],
  },
  {
    slug: 'compliance',
    name: 'Compliance',
    audience: 'For compliance, legal and DPOs',
    category: 'Data posture and audit',
    title: 'Age verification for compliance and DPOs',
    description:
      'Age verification with no personal data stored. Over-18 checks from the EU Digital Identity Wallet, a signed audit trail, GDPR data minimisation, and an open source verifier core you can run inside your own boundary.',
    heading: 'Age verification your DPO will actually like',
    lead: 'Tessio proves a user is over 18 from their EU Digital Identity Wallet and stores no personal data. No document images, no dates of birth, nothing to breach. Here is the compliance posture in plain terms.',
    intro: [
      'Most age checks add data risk. A document scan or a database match means you now hold identity data you have to secure, minimise and justify. Tessio flips that. The user proves one claim, that they are over 18, and you get a signed yes or no. There is no date of birth, no document image and no selfie, on your systems or ours.',
      'That posture lines up with the rules. GDPR asks you to minimise personal data, and the DSA is explicit that protecting minors should not push you to collect more personal data to check age. A single over-18 boolean is about as data-minimal as an age check gets.',
    ],
    pillars: [
      {
        title: 'You store no personal data',
        body: 'The result is an over-18 yes or no, not a date of birth or a document. You cannot leak what you do not hold, so your breach exposure drops to almost nothing.',
      },
      {
        title: 'Data minimisation by design',
        body: 'One question, one answer. That fits the GDPR principle of data minimisation and the DSA caution against collecting extra personal data just to check age.',
      },
      {
        title: 'Auditable results',
        body: 'Each result is signed, so you keep verifiable evidence that you ran a real check for your regulator, without keeping any identity data behind it.',
      },
      {
        title: 'Self-host for data residency',
        body: 'When identity data cannot go to a hosted service, run the open source .NET verifier inside your own environment with managed trust updates. EU based, with EU data residency.',
      },
    ],
    checklist: [
      'No personal data stored: no date of birth, no document image, no selfie.',
      'An over-18 result only, so your GDPR footprint and breach exposure stay low.',
      'A signed, auditable result you can keep as evidence of a real check.',
      'Aligned with the DSA principle that you should not collect extra data to check age.',
      'Built on the EU Digital Identity Wallet standards for the eIDAS mandate.',
      'The verification core is open source under Apache-2.0, so teams that cannot send identity data to a third party cloud can run it themselves.',
    ],
    checklistHeading: 'The compliance posture',
    primaryCta: { label: 'Request access', href: ACCESS_MAILTO },
    secondaryCta: { label: 'Read the DSA summary', href: '/dsa' },
    ctaTitle: 'Talk through your posture',
    ctaBody:
      "Tell us your sector and the duties you're meeting, and we'll walk through how a wallet based over-18 check with no stored data fits. Access is invite only while we onboard design partners.",
    faqs: [
      {
        q: 'Do you store any personal data?',
        a: 'No. A check returns an over-18 yes or no. There is no date of birth, no document image and no selfie kept, on your systems or ours. That is the whole point of the design.',
      },
      {
        q: 'Is it GDPR compliant?',
        a: 'We check one claim and store no personal data, which is the data-minimisation posture GDPR and the EU Digital Identity framework are built for. You stay in control of your own processing, and if you need the check inside your own boundary you can self host the open source core.',
      },
      {
        q: 'Where is verification processed?',
        a: 'Tessio is EU based with EU data residency. If your obligations mean identity data cannot leave your environment at all, you can self host the .NET verifier and keep processing in your own boundary.',
      },
    ],
    useCases: ['dating', 'adult', 'social'],
    regulations: ['dsa', 'osa', 'eudi'],
  },
  {
    slug: 'platform-providers',
    name: 'Platform providers',
    audience: 'For platform providers',
    category: 'Channel and partners',
    title: 'EUDI age verification for platform providers',
    description:
      'Add wallet native EUDI age verification to your platform once and offer it to every operator or merchant you serve. One integration, resell to many, managed trust layer, no PII stored.',
    heading: 'Add EUDI age verification as a module',
    lead: 'If you run a platform for operators or merchants, you can add wallet native age verification once and offer it to all of them. One integration, resell to many, with a managed trust layer and no personal data stored.',
    intro: [
      'Platform and channel providers have the best leverage in age assurance. Your operators and merchants all face the same age rules, and most of them do not want to build verification themselves. Add Tessio once and you can offer a wallet native age check to your whole downstream, as a module of your platform.',
      "Because the result is an over-18 yes or no with no personal data attached, you are not taking on a pile of your customers' customers' identity data. And because we keep the wallet trust layer current, you do not have to chase member state and issuer changes as the rollout continues.",
    ],
    pillars: [
      {
        title: 'One integration, resell to many',
        body: 'Add the age check to your platform once, then turn it on for every operator or merchant you serve. They get compliant age assurance without building it themselves.',
      },
      {
        title: 'Managed trust layer',
        body: 'We keep the EU wallet trust layer current as member states and issuers come online, so you and your downstream do not have to track it yourselves.',
      },
      {
        title: 'No personal data to hold',
        body: 'Your operators get an over-18 yes or no, so you are not warehousing identity data for their customers. Less data risk across your whole platform.',
      },
      {
        title: 'Hosted or self hosted',
        body: 'Run it hosted as part of your stack, or self host the open source .NET core inside your platform when you need full control of processing.',
      },
    ],
    primaryCta: { label: 'Talk to us', href: ACCESS_MAILTO },
    secondaryCta: { label: 'Read the docs', href: '/docs' },
    ctaTitle: 'Add age verification to your platform',
    ctaBody:
      "Tell us about your platform and your downstream operators, and we'll talk through the channel model and partner terms. Access is invite only while we onboard design partners.",
    faqs: [
      {
        q: 'How does the channel model work?',
        a: 'You integrate Tessio once into your platform and offer the age check to the operators or merchants you serve. They get wallet native age assurance without building it, and you add a compliance feature to your product. Talk to us about partner terms.',
      },
      {
        q: 'Can we white label it?',
        a: 'The result is a signed over-18 boolean, so you can surface it in your own product flow however you like. If you need full control of processing, you can self host the open source .NET core inside your platform.',
      },
      {
        q: 'Who keeps the wallet trust layer current?',
        a: 'We do. The managed trust layer stays current as member states and issuers come online through the rollout, so neither you nor your downstream operators have to track it.',
      },
    ],
    useCases: ['igaming', 'retail'],
    regulations: ['eudi'],
  },
];

export const ROLE_INDEX = ROLES.map((r) => ({
  slug: r.slug,
  name: r.name,
  audience: r.audience,
  category: r.category,
}));

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}
