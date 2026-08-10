// The credential formats and the ideas inside them. Where we have a Labs validator for a format, the
// entry links to it, which is the thing no other EUDI glossary can do.
//
// Accuracy notes (verified 2026-08-09, see ~/Work/Tessio/tessio-labs/docs/spec-conformance.md):
//  - SD-JWT core is RFC 9901, published November 2025. It is no longer a draft; do not describe it as one.
//  - SD-JWT VC is still an Internet-Draft, at -17, with v1.0 expected around December 2026. The EUDI ARF
//    pins draft 15. Those are three different numbers and the difference matters to an implementer.
//  - The mdoc facts come from reading Tessio.Verifier.Core.Mdoc, not from the spec summary.
import type { GlossaryTerm } from './types';

export const CREDENTIAL_TERMS: GlossaryTerm[] = [
  {
    slug: 'selective-disclosure',
    term: 'Selective disclosure',
    aka: ['selective disclosure', 'salted hashes', 'data minimisation'],
    category: 'Credentials',
    title: 'Selective disclosure explained: how a credential reveals one claim',
    description:
      'Selective disclosure lets a credential prove one claim without revealing the rest. How salted hashes make it work, and why it is a property of the format rather than a promise.',
    short:
      'Selective disclosure is the ability to reveal some claims from a signed credential while keeping the rest hidden, without breaking the issuer\'s signature. It works by signing digests of salted values rather than the values themselves, so the holder can hand over only the values they choose and the verifier can still check every one against what was signed.',
    sections: [
      {
        heading: 'How it works, in one paragraph',
        body: [
          'The issuer takes each disclosable claim, adds a random salt, and signs a digest of the result instead of the claim itself. The signed credential therefore contains a list of digests and nothing readable. Alongside it travel the disclosures, one per claim, each holding the salt, the name and the value. To reveal a claim you hand over its disclosure; to hide one you simply do not.',
          'The verifier hashes each disclosure it receives and checks the result appears among the signed digests. Anything not handed over stays a digest, which reveals nothing, and the salt is what stops a verifier guessing a low-entropy value like a birth year by brute force.',
        ],
      },
      {
        heading: 'Why this is stronger than a promise',
        body: [
          'The usual alternative is a service that receives everything and undertakes to delete what it does not need. That is a promise about behaviour, audited by trusting the party who made it. Selective disclosure is a property of the format: the undisclosed values are not in the message, so there is nothing to delete, nothing to breach and nothing to produce in response to a subject access request.',
          'It also moves the decision to the holder. The wallet, not the verifier, decides what leaves the device, and the consent screen is the moment that happens.',
        ],
      },
      {
        heading: 'The part implementers get wrong',
        body: [
          'Disclosure is recursive. A disclosed value can itself contain further digests naming more disclosures, so a nested claim like an address with a selectively disclosable street is normal rather than exotic. A verifier that only looks for digests in the top-level signed payload will report a perfectly good nested credential as not binding. We shipped that bug and fixed it, which is why it is called out here.',
          'The other one is arithmetic on multiplicity. RFC 9901 requires rejecting a credential where a digest appears more than once, and a naive implementation storing digests in a set throws away exactly the information that rule is about.',
        ],
      },
    ],
    facts: [
      { label: 'Mechanism', value: 'Salted hashes: sign digests of salted values, not the values' },
      { label: 'Core spec', value: 'RFC 9901, published November 2025' },
      { label: 'Formats using it', value: 'SD-JWT VC (JSON), and mdoc via a comparable digest scheme' },
      { label: 'Salt exists to', value: 'Stop a verifier brute-forcing a low-entropy value' },
      { label: 'Recursive', value: 'A disclosed value can carry further digests' },
    ],
    whyItMatters: [
      'If you\'re assessing a privacy claim, ask whether the data is absent or merely deleted afterwards. Only one of those is checkable by looking at the message.',
      'If you\'re implementing, handle nesting and reject a reused digest. Both are in RFC 9901, and both are the kind of rule that a test suite of happy-path credentials never exercises.',
    ],
    tools: [
      {
        label: 'SD-JWT VC Validator',
        href: '/sd-jwt',
        note: 'Paste a credential and watch each disclosure be hashed and matched against the signed digests.',
      },
    ],
    faqs: [
      {
        q: 'Can the verifier see the claims I did not disclose?',
        a: 'No. What travels is a digest, which reveals nothing about the value. The salt means the verifier can\'t narrow it down by guessing either, which matters for a value with few possibilities like a year of birth.',
      },
      {
        q: 'Does hiding claims break the issuer signature?',
        a: 'No, and that\'s the whole trick. The signature covers the digests, which don\'t change when you choose not to reveal the value behind one.',
      },
      {
        q: 'Is this the same as zero-knowledge proofs?',
        a: 'No. Selective disclosure reveals the actual values you chose to share. A zero-knowledge proof can answer a question about a value without revealing the value at all. Salted hashes are simpler, deployed today, and reveal more.',
      },
    ],
    sources: [
      { label: 'RFC 9901: Selective Disclosure for JSON Web Tokens', href: 'https://www.rfc-editor.org/rfc/rfc9901.html' },
    ],
    related: ['sd-jwt-vc', 'age-verification-attestation', 'mdoc'],
  },

  {
    slug: 'sd-jwt-vc',
    term: 'SD-JWT VC',
    aka: ['SD-JWT VC', 'SD-JWT', 'dc+sd-jwt', 'vc+sd-jwt'],
    category: 'Credentials',
    title: 'SD-JWT VC explained: the JSON credential format for EUDI',
    description:
      'SD-JWT VC is the JSON credential format the EU wallet uses alongside mdoc. What it is, how it differs from a plain JWT, and which spec version to build against.',
    short:
      'SD-JWT VC is a verifiable credential format built on JSON Web Tokens with selective disclosure added, so a holder can reveal individual claims from an issuer-signed credential. It is one of the two formats the EU Digital Identity Wallet uses, the other being ISO mdoc.',
    sections: [
      {
        heading: 'What it adds to a JWT',
        body: [
          'A plain JWT is all-or-nothing: the payload is readable by anyone holding the token, so presenting it reveals every claim in it. SD-JWT keeps the JWS structure and replaces disclosable claims with digests, moving the values into separate disclosures that travel alongside and are handed over one by one.',
          'Around that sits the VC layer, which adds the things a credential needs beyond the mechanism: a type (`vct`), issuer identification and key resolution, and optional holder key binding so a presentation can be tied to the device holding it.',
        ],
      },
      {
        heading: 'Which spec version to build against',
        body: [
          'This is the question that actually costs implementers time, and the answer is three different numbers. The selective disclosure core is settled: it became RFC 9901 in November 2025 and will not move. The SD-JWT VC layer on top is still an Internet-Draft, at -17 as of mid-2026, with a v1.0 expected around December 2026.',
          'And the EU Architecture and Reference Framework pins draft 15, with a note that 16 may be used. So if you are building for the EU wallet specifically, the newest IETF draft is not the target: the ARF\'s pin is. Building against -17 means implementing something the ecosystem you are joining does not yet reference.',
        ],
      },
      {
        heading: 'How a presentation is put together',
        body: [
          'A presentation is the issuer-signed JWT, then each disclosure being revealed, then optionally a key-binding JWT, all joined with tildes. A trailing tilde with nothing after it means there is no key binding. That format detail catches people out, because an empty final segment and a missing final segment mean different things.',
          'The key-binding JWT is signed by the holder\'s own key and ties the presentation to a specific verifier and moment. Verifying it is what shows the presenter holds the credential rather than having copied it, and it is a separate check from verifying the issuer signature.',
        ],
      },
    ],
    facts: [
      { label: 'Core spec', value: 'RFC 9901 (selective disclosure), published November 2025' },
      { label: 'VC layer', value: 'draft-ietf-oauth-sd-jwt-vc, at -17 in mid-2026' },
      { label: 'EUDI ARF pins', value: 'Draft 15, may be updated to 16' },
      { label: 'Media type', value: 'dc+sd-jwt (earlier drafts used vc+sd-jwt)' },
      { label: 'Presentation format', value: 'JWT ~ disclosure ~ ... ~ optional key-binding JWT' },
      { label: 'Sibling format', value: 'ISO 18013-5 mdoc, used for mDL and the EU age attestation' },
    ],
    whyItMatters: [
      'If you\'re building for the EU wallet, target the draft the ARF pins rather than the newest one. The gap between them is currently two revisions, and matching IETF instead of the ecosystem is how you end up conformant to nothing anyone is using.',
      'If you\'re assessing a credential, verifying the issuer signature and verifying key binding are two different checks. Only the second says the person presenting it\'s the person it was issued to.',
    ],
    tools: [
      {
        label: 'SD-JWT VC Validator',
        href: '/sd-jwt',
        note: 'Decode a credential, expand its disclosures, and see each one matched against the signed digests.',
      },
    ],
    faqs: [
      {
        q: 'Is SD-JWT VC replacing mdoc in the EU wallet?',
        a: 'No, both are in use. mdoc comes from the ISO mobile driving licence world and is CBOR-based; SD-JWT VC is JSON-based and comes from the OAuth world. The EU age verification attestation is an mdoc, for example, while other attestations are SD-JWT VC.',
      },
      {
        q: 'Do I need the holder\'s public key to verify one?',
        a: 'You need the issuer\'s key to verify the credential itself. You need the holder key, from the cnf claim, only to verify key binding, and only presentations that carry a key-binding JWT have one.',
      },
      {
        q: 'What does the trailing tilde mean?',
        a: 'That there is no key-binding JWT. A presentation ending in a tilde has none; one ending in a non-empty segment has that segment as the key-binding JWT. It\'s a small distinction that decides whether you\'re looking at a credential or a presentation.',
      },
    ],
    sources: [
      { label: 'RFC 9901: Selective Disclosure for JSON Web Tokens', href: 'https://www.rfc-editor.org/rfc/rfc9901.html' },
      { label: 'draft-ietf-oauth-sd-jwt-vc', href: 'https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/' },
      { label: 'EUDI Architecture and Reference Framework', href: 'https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework' },
    ],
    related: ['selective-disclosure', 'mdoc', 'openid4vp'],
  },

  {
    slug: 'mdoc',
    term: 'mdoc and mDL (ISO/IEC 18013-5)',
    aka: ['mdoc', 'mDL', 'mobile driving licence', 'ISO 18013-5', 'mso_mdoc'],
    category: 'Credentials',
    title: 'mdoc and mDL explained: the ISO mobile document format',
    description:
      'An mdoc is the ISO 18013-5 mobile document format, best known as the mobile driving licence. What the Mobile Security Object does, and what verifying one actually proves.',
    short:
      'An mdoc is a mobile document in the ISO/IEC 18013-5 format, a CBOR-based credential best known as the mDL, the mobile driving licence. It is one of the two formats the EU Digital Identity Wallet uses, and the EU age verification attestation is an mdoc.',
    sections: [
      {
        heading: 'The Mobile Security Object is the load-bearing part',
        body: [
          'An mdoc separates the values from what the issuer signed. Each disclosed data element travels as an issuer-signed item with a random salt and a digest ID. The Mobile Security Object, the MSO, is the structure the issuer actually signs, and it contains the digests of all those items grouped by namespace, plus the document type and a validity window.',
          'So verifying an mdoc means hashing each element you received and finding that digest in the MSO under the right namespace and digest ID. It is the same idea as SD-JWT disclosure, expressed in CBOR. Skip that step and you have checked a signature over a structure while never confirming it covers the values in front of you.',
        ],
      },
      {
        heading: 'Two signatures that prove different things',
        body: [
          'Issuer data authentication is the MSO signature, made by a Document Signer whose certificate chains to an issuing authority root. It proves an authority vouched for these values.',
          'Device authentication is a separate signature or MAC made by the device, over a session transcript that binds the response to this particular request. It proves the holder is presenting it now, rather than someone replaying a copy. An inspection tool that takes a pasted document cannot check the second one, because there is no session to bind to, and it should say so rather than let a green tick imply otherwise.',
        ],
      },
      {
        heading: 'The trust chain, and its soft spot',
        body: [
          'Trust is pure chain anchoring: the Document Signer certificate must chain to an IACA root the verifier already trusts. Unlike an issuer-string allowlist, the identifier in the document is not consulted, so an attacker choosing a label cannot move the answer.',
          'The soft spot is the certificate profile. ISO 18013-5 Annex B constrains what a Document Signer certificate may look like, including its extended key usage and lifetime. A verifier that only checks the chain will accept a certificate that anchors correctly but is not a valid Document Signer, and profile enforcement is commonly missing.',
        ],
      },
    ],
    facts: [
      { label: 'Spec', value: 'ISO/IEC 18013-5' },
      { label: 'Encoding', value: 'CBOR, with COSE signatures' },
      { label: 'Signed structure', value: 'Mobile Security Object (MSO), holding digests by namespace' },
      { label: 'Issuer signature', value: 'issuerAuth, a COSE_Sign1 over the MSO' },
      { label: 'Holder signature', value: 'deviceAuth, over a session transcript' },
      { label: 'Trust anchor', value: 'IACA root; chain anchoring only, the issuer string is not consulted' },
    ],
    whyItMatters: [
      'If you\'re verifying mdocs, the digest match against the MSO is the check that makes the signature mean anything about the values. Confirm your library does it rather than assuming.',
      'If you\'re choosing a library, ask what it does about the Annex B Document Signer profile and about device authentication. Both are commonly skipped, and skipping either is defensible only if the tool says so.',
    ],
    tools: [
      {
        label: 'mdoc / mDL Validator',
        href: '/mdoc',
        note: 'Paste a DeviceResponse and see its Mobile Security Object, its IACA chain and the elements it discloses.',
      },
    ],
    faqs: [
      {
        q: 'Is an mDL the same as an mdoc?',
        a: 'An mDL is one kind of mdoc: the mobile driving licence, with its own document type and namespace. The mdoc format carries other documents too, including the EU age verification attestation.',
      },
      {
        q: 'Why CBOR rather than JSON?',
        a: 'mdoc comes from the ISO identity-document world, where the format also has to work over NFC and Bluetooth in a proximity check, and compactness matters. SD-JWT VC comes from the web world and is JSON.',
      },
      {
        q: 'Does verifying an mdoc prove the person in front of me holds it?',
        a: 'Only if device authentication is checked, and that needs a real session to bind against. A tool validating a pasted document is checking the issuer-signed side, which is a different and weaker claim.',
      },
    ],
    sources: [
      { label: 'ISO/IEC 18013-5', href: 'https://www.iso.org/standard/69084.html' },
      { label: 'EUDI Architecture and Reference Framework', href: 'https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework' },
    ],
    related: ['iaca', 'age-verification-attestation', 'sd-jwt-vc'],
  },

  {
    slug: 'pid',
    term: 'Person Identification Data (PID)',
    aka: ['PID', 'person identification data', 'PID provider'],
    category: 'Credentials',
    title: 'PID (Person Identification Data) in the EU Digital Identity Wallet',
    description:
      'PID is the core identity credential in the EU wallet: the one that says who you are. Why asking for it to check an age is usually the wrong call.',
    short:
      'Person Identification Data, or PID, is the core identity credential in the EU Digital Identity Wallet: the attested set of attributes that establish who someone is, issued by a member-state-designated PID provider. It is the wallet\'s identity document, and it carries a name and a date of birth.',
    sections: [
      {
        heading: 'What it is for',
        body: [
          'PID is the foundation credential. It is what a member state issues to establish identity in the wallet, and what other attestations are anchored to. Where a service genuinely needs to know who someone is, opening a bank account, signing a contract, accessing their own records, PID is the right credential to ask for.',
          'PID providers are designated at member-state level and appear on the ecosystem\'s trusted entity lists, which is how a verifier decides whether a PID it receives came from an authority rather than from someone convincing.',
        ],
      },
      {
        heading: 'Why it is usually the wrong credential for an age check',
        body: [
          'PID contains a date of birth. You can compute whether someone is over 18 from it, and doing so means you received their date of birth, and usually their name with it. You have then answered a yes-or-no question by collecting identity data, which is the exact trade the wallet was designed to avoid, and which brings retention, breach and subject-access obligations with it.',
          'The alternative is a purpose-built attestation carrying age booleans and nothing else. Asking for PID when a narrower credential would answer the question is the wallet-era version of photocopying a passport to check someone is an adult, and under the DSA in particular, collecting more personal data than the check requires is the thing Article 28(3) pushes back on.',
        ],
      },
    ],
    facts: [
      { label: 'What it is', value: 'The wallet\'s core identity credential' },
      { label: 'Issued by', value: 'A member-state-designated PID provider' },
      { label: 'Contains', value: 'Identity attributes including name and date of birth' },
      { label: 'Right for', value: 'Knowing who someone is' },
      { label: 'Wrong for', value: 'Knowing only whether they are old enough' },
    ],
    whyItMatters: [
      'Choosing which credential to request is a data protection decision, not a technical one. Asking for PID to answer an age question means holding identity data you did not need.',
      'If a vendor\'s age-check flow reads a birth date out of a PID, they\'re handling personal data about your users whatever their retention policy says. Ask which credential and which attribute they request.',
    ],
    tools: [
      {
        label: 'EUDI Trusted Entity Checker',
        href: '/lote',
        note: 'See whether a certificate is trusted by the wallet ecosystem as a PID provider.',
      },
    ],
    faqs: [
      {
        q: 'Can I ask for just the date of birth from a PID?',
        a: 'Selective disclosure lets you request fewer attributes, but a date of birth is still identity data and still more than a yes-or-no answer about age. If the question is "is this person over 18", a credential that answers exactly that\'s the proportionate request.',
      },
      {
        q: 'Who issues PID?',
        a: 'Providers designated by each member state. Which entity that\'s varies by country, and a verifier checks the provider against the ecosystem\'s trusted entity lists rather than by name.',
      },
      {
        q: 'Is PID the same as the wallet itself?',
        a: 'No. The wallet is the app holding credentials; PID is the identity credential inside it. A wallet can hold PID plus any number of other attestations.',
      },
    ],
    sources: [
      { label: 'Regulation (EU) 2024/1183, the EUDI framework', href: 'https://eur-lex.europa.eu/eli/reg/2024/1183/oj' },
      { label: 'EUDI Architecture and Reference Framework', href: 'https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework' },
    ],
    related: ['age-verification-attestation', 'relying-party', 'selective-disclosure'],
    regulations: ['eudi'],
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
      'If you\'re writing the integration: read the disclosed boolean rather than trusting that verification succeeded, and give the unanswerable case its own state next to yes and no. Those two decisions are the difference between an age check and an age check that quietly lets everyone through.',
      'If you\'re choosing a vendor: ask which credential they request. A vendor reading a birth date out of a PID is holding personal data about your users, whatever their retention policy says about it afterwards.',
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
        a: 'Not from this credential, because it doesn\'t contain one. It holds a set of yes or no answers about age thresholds, and the service receives the one it asked for after you approve it in your wallet.',
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
        a: 'Then this credential can\'t answer for them, and you need another route for that traffic. That\'s a real gap during the rollout rather than something a verifier can solve, and any vendor telling you the wallet covers all your users today is describing a future rather than the present.',
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
