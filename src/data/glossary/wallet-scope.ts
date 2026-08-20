// One sentence, one place. Every claim about a wallet refusing an unauthenticated reader needs the
// same qualifier, and it is now needed in three entry files, so it lives here rather than being
// restated in each. Three independent statements of one rule drift apart, and semantic duplication
// is invisible to a duplicate detector.
//
// The rule: the access certificate gates the EUDI wallet profile, so PID and mDL. It does not gate
// the EU age verification app, whose profile puts reader and client authentication out of scope.
// Source: TrustPlatform/docs/findings-av-profile.md, quoting AV Profile Annex A.
//
// Name the wallet in every sentence you write about this. The original entries were wrong because
// one observation of the EU reference wallet was generalised into a rule about every wallet, one
// plausible summary at a time.
export const AV_PROFILE_EXCEPTION =
  'The EU age verification app is the exception: its own profile puts reader authentication out of scope.';
