// How a credential actually gets from a wallet to a verifier. Both entries here are first-hand: we
// implement OpenID4VP 1.0 with DCQL in Tessio.Verifier, and the DCQL warning below is a bug we shipped
// and fixed rather than a hazard we read about.
import type { GlossaryTerm } from './types';
import { AV_PROFILE_EXCEPTION } from './wallet-scope';

export const PROTOCOL_TERMS: GlossaryTerm[] = [
  {
    slug: 'openid4vp',
    term: 'OpenID for Verifiable Presentations (OpenID4VP)',
    aka: ['OpenID4VP', 'OID4VP', 'verifiable presentation'],
    category: 'Protocols',
    title: 'OpenID4VP explained: how a verifier asks a wallet for a credential',
    description:
      'OpenID4VP is the protocol a verifier uses to request a credential from a wallet and receive the response. What a request contains, and what a wallet checks before answering.',
    short:
      'OpenID for Verifiable Presentations, or OpenID4VP, is the protocol a verifier uses to ask a wallet for credentials and receive the presentation back. It is format neutral: the same exchange carries SD-JWT VC and ISO mdoc, and it is what the EU Digital Identity Wallet uses.',
    sections: [
      {
        heading: 'The shape of an exchange',
        body: [
          'The verifier builds a presentation request: what it wants, who it is, where to send the answer, and a nonce that ties the response to this request and no other. The request is signed, and the wallet fetches it, and does not trust a request handed to it directly. The user is shown what is being asked for and by whom, approves or declines, and the wallet posts the presentation back to the response endpoint.',
          'Because the request is signed and its signing certificate travels with it, the wallet can decide whether to answer before showing anything to the user. That ordering is the important part: authentication of the asker happens before the consent screen, not after.',
        ],
      },
      {
        heading: 'What the wallet checks before it answers',
        body: [
          'An EU Digital Identity Wallet does not release data to whoever asks politely. It reads the signing chain from the request, checks it against the access-certificate providers it trusts, and confirms the certificate covers the hostname the request came from. If any of that fails, it refuses before the user is involved at all. ' +
            AV_PROFILE_EXCEPTION,
          'This is the step that surprises people building against a sandbox. The protocol works end to end, the request parses, and then that wallet says no, because the development certificate is not one it trusts. That refusal is the wallet behaving correctly.',
        ],
      },
      {
        heading: 'Response encryption and why it matters',
        body: [
          'The response can be encrypted to a key the verifier publishes in the request metadata, which keeps the presented attributes from being readable in transit or by anything sitting between the wallet and the verifier. For a check that deliberately reveals as little as possible, leaving the response in the clear would undo some of the point.',
          'Practically, a wallet needs client metadata in the request to know which key to encrypt to, so an omitted or malformed metadata block is a common reason a wallet declines a request that otherwise looks fine.',
        ],
      },
    ],
    facts: [
      { label: 'Spec', value: 'OpenID for Verifiable Presentations 1.0' },
      { label: 'Format-neutral', value: 'Carries SD-JWT VC and ISO mdoc alike' },
      { label: 'Query language', value: 'DCQL, the Digital Credentials Query Language' },
      { label: 'Client identifier', value: 'x509_san_dns: the request host must match the certificate' },
      { label: 'Wallet checks first', value: 'Reader authentication happens before the consent screen' },
    ],
    whyItMatters: [
      'If an EU Digital Identity Wallet refuses your request while your sandbox accepts it, look at reader authentication before looking at your code. The usual answer is that your signing certificate isn\'t one the wallet trusts. The age verification app does not run that check, so look elsewhere there.',
      'The nonce and the response endpoint are what stop a presentation being replayed elsewhere. Treat them as security parameters rather than plumbing.',
    ],
    tools: [],
    faqs: [
      {
        q: 'Is OpenID4VP the same as OpenID Connect?',
        a: 'No, though it comes from the same community. OpenID Connect is about logging in with an identity provider. OpenID4VP is about a wallet presenting credentials it already holds, with no identity provider in the loop at the moment of presentation.',
      },
      {
        q: 'Does the verifier need to be online with the issuer?',
        a: 'No, and that\'s a large part of the appeal. The credential was signed when it was issued; verifying it needs the issuer\'s key and trust list, not a live call to the issuer.',
      },
      {
        q: 'Can I test without a real wallet?',
        a: 'Yes, against a sandbox or a reference wallet, and most integration work can be done that way. What you can\'t test without a trusted access certificate is an EU Digital Identity Wallet completing the exchange. ' +
          AV_PROFILE_EXCEPTION,
      },
    ],
    sources: [
      { label: 'OpenID for Verifiable Presentations 1.0', href: 'https://openid.net/specs/openid-4-verifiable-presentations-1_0.html' },
      { label: 'EU Digital Identity Wallet reference implementation', href: 'https://github.com/eu-digital-identity-wallet' },
    ],
    related: ['dcql', 'wrpac', 'sd-jwt-vc'],
    regulations: ['eudi'],
  },

  {
    slug: 'dcql',
    term: 'DCQL (Digital Credentials Query Language)',
    aka: ['DCQL', 'digital credentials query language', 'credential query'],
    category: 'Protocols',
    title: 'DCQL explained, and the mistake that makes an age check fail open',
    description:
      'DCQL is how an OpenID4VP request says which credential and claims it wants. It asks for a claim, not a value, and mistaking one for the other makes a verifier fail open.',
    short:
      'DCQL, the Digital Credentials Query Language, is how an OpenID4VP request states which credentials it wants and which claims from them. It replaced the earlier Presentation Exchange syntax in OpenID4VP 1.0, and it asks for a claim by name; it does not constrain what that claim\'s value may be.',
    sections: [
      {
        heading: 'What a query says',
        body: [
          'A DCQL query names credential sets and, within them, the claims wanted, along with the format and any document type or credential type filter. A verifier asking for proof of age over 18 from an mdoc names the doctype, the namespace and the element; asking from an SD-JWT VC names the credential type and the claim path.',
          'It is deliberately narrow. The point is to ask for as little as answers the question, so the wallet can show the user a short and truthful consent screen.',
        ],
      },
      {
        heading: 'The mistake worth writing down',
        body: [
          'DCQL asks for a claim. It does not require the claim to have a particular value. A wallet holding age_over_18 with the value false can satisfy a request for age_over_18 perfectly well, and the response it returns will verify: the signature is good, the disclosure is genuine, the credential is authentic. The answer is simply no.',
          'So a verifier that treats "the presentation verified" as "the person is over 18" is wrong, and wrong in the direction that lets everyone through. The value that was disclosed has to be read. We shipped exactly this bug and only caught it against a real wallet, which is why it is in the glossary and not in a footnote.',
          'There is a third outcome too. If a credential verifies but did not disclose the claim you asked for, you have neither a yes nor a no; you have a check that cannot be answered. Folding that into "no" is tempting and wrong, and it deserves its own state in your data model.',
        ],
      },
    ],
    facts: [
      { label: 'Introduced in', value: 'OpenID for Verifiable Presentations 1.0' },
      { label: 'Replaces', value: 'Presentation Exchange, used by earlier drafts' },
      { label: 'Asks for', value: 'A claim by name, in a named credential and format' },
      { label: 'Does not constrain', value: 'The value of that claim' },
      { label: 'Consequence', value: 'Verification success is not the same as the answer being yes' },
    ],
    whyItMatters: [
      'Read the disclosed value, never the verification result alone. "Verified" and "over 18" are different facts, and conflating them fails open.',
      'Give the unanswerable case its own state alongside yes and no. A credential that verified but disclosed nothing relevant isn\'t a refusal, and treating it as one hides a broken integration.',
    ],
    tools: [
      {
        label: 'SD-JWT VC Validator',
        href: '/sd-jwt',
        note: 'See which claims a credential actually discloses, separately from whether it verifies.',
      },
    ],
    faqs: [
      {
        q: 'Can I ask DCQL for "age_over_18 must be true"?',
        a: 'No. The query selects which claim is presented, not which value is acceptable. Evaluating the value is the verifier\'s job after the presentation arrives.',
      },
      {
        q: 'What happens if the wallet does not have the credential I asked for?',
        a: 'The user is told the request can\'t be satisfied, and you get no presentation at all, not an empty one. That\'s a different outcome from a presentation that arrives without the claim you wanted.',
      },
      {
        q: 'Is DCQL specific to the EU wallet?',
        a: 'No, it\'s part of OpenID4VP and format neutral. The EU wallet uses it, and so does anything else built on OpenID4VP 1.0.',
      },
    ],
    sources: [
      { label: 'OpenID for Verifiable Presentations 1.0', href: 'https://openid.net/specs/openid-4-verifiable-presentations-1_0.html' },
    ],
    related: ['openid4vp', 'age-verification-attestation', 'selective-disclosure'],
  },
];
