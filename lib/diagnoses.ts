export type Bucket =
  | "exit"
  | "name"
  | "dob"
  | "kyc"
  | "bank"
  | "employer"
  | "form"
  | "transfer"
  | "unclear";

export type Diagnosis = {
  title: string;
  summary: string;
  steps: string[];
  docs: string[];
  hr: string;
  grievance: string;
  share: string;
};

export const diagnoses: Record<Bucket, Diagnosis> = {
  exit: {
    title: "Your date of exit is probably missing",
    summary: "EPFO needs your last working date before it can process a final settlement or transfer. This is usually a quick employer-side update, not a new claim.",
    steps: [
      "Open the EPFO member portal and check Service History for the previous job.",
      "Ask your previous employer to add the date of exit and the correct reason for leaving.",
      "If it has been about two months since your last contribution, you may be able to mark the exit yourself in the member portal. Then allow 3–5 working days and retry.",
    ],
    docs: ["Last payslip", "Service History screenshot", "Relieving letter or last working date proof"],
    hr: `Subject: Please update my EPFO date of exit

Hi HR,

My EPFO Service History is missing my date of exit for [COMPANY]. Under Para 72 of the EPF Scheme, 1952, please update the date of exit and reason in the employer portal.

Name: [NAME]
Member ID: [MEMBER ID]
Last working day: [DATE]

Thanks,
[NAME]`,
    grievance: "My EPFO claim is blocked because the date of exit for my previous employment is missing or incorrect. I contacted the employer on [DATE]. Please ask the employer to update it and enable processing. Employer: [COMPANY].",
    share: "My PF claim was stuck because my date of exit was not updated. This free tool gave me a ready HR email and EPFiGMS draft: https://sandeshl702.github.io/why-is-my-pf-stuck/",
  },
  name: {
    title: "Your name may not match across records",
    summary: "Different initials, spacing, surname order or a typo can make EPFO treat your records as different people. Match EPFO to your government ID before trying the claim again.",
    steps: [
      "Compare your EPFO profile with Aadhaar and PAN, including spelling and name order.",
      "Ask HR to correct the EPFO member profile using the correct government record. Do not create another UAN.",
      "Retry KYC or the claim after the correction is approved.",
    ],
    docs: ["Aadhaar (masked)", "PAN card", "EPFO profile screenshot"],
    hr: `Subject: Request to correct name in EPFO records

Hi HR,

Please correct my EPFO member name to [CORRECT NAME] so it matches Aadhaar.

Current name: [CURRENT NAME]
Member ID: [MEMBER ID]

Thanks,
[NAME]`,
    grievance: "My EPFO records have a name mismatch with Aadhaar, preventing my claim. Please advise the correction route. Current name: [CURRENT]. Correct name: [CORRECT].",
    share: "PF claim stuck because of a name mismatch? I got the HR email and EPFiGMS draft I needed: https://sandeshl702.github.io/why-is-my-pf-stuck/",
  },
  dob: {
    title: "Your date of birth may be mismatched",
    summary: "A different DOB in EPFO, Aadhaar or PAN can stop KYC validation and claim processing. Correct the member record instead of opening another UAN.",
    steps: [
      "Compare your date of birth across EPFO, Aadhaar and PAN.",
      "Ask HR to raise a profile correction using the correct proof. Do not create another UAN.",
      "Check KYC again after the correction is approved, then retry the claim.",
    ],
    docs: ["Aadhaar", "PAN", "DOB proof if requested"],
    hr: `Subject: Request to correct DOB in EPFO records

Hi HR,

My EPFO date of birth is incorrect. Please initiate a correction to [DD/MM/YYYY].

Member ID: [MEMBER ID]
Proof attached.

Thanks,
[NAME]`,
    grievance: "My claim is blocked due to a DOB mismatch in EPFO. Please guide the correction and reprocess it. Correct DOB: [DD/MM/YYYY].",
    share: "A DOB mismatch was why my PF claim stalled. Here is the ready-to-send HR email and grievance: https://sandeshl702.github.io/why-is-my-pf-stuck/",
  },
  kyc: {
    title: "Your KYC is not approved yet",
    summary: "Aadhaar, PAN or bank details can be seeded but still be waiting for employer approval. Find the exact item marked Pending and ask for that one action.",
    steps: [
      "Open Manage → KYC in the EPFO member portal and note which item says Pending.",
      "Ask HR to approve that exact Aadhaar, PAN or bank item in the employer portal.",
      "Check again after 3–7 working days, then submit the claim.",
    ],
    docs: ["KYC status screenshot", "Relevant Aadhaar, PAN or cancelled cheque", "Last payslip"],
    hr: `Subject: Please approve my pending EPFO KYC

Hi HR,

My EPFO [AADHAAR / PAN / BANK] KYC is pending employer approval. Please approve it so I can process my PF claim.

Name: [NAME]
Member ID: [MEMBER ID]

Thanks,
[NAME]`,
    grievance: "My [AADHAAR / PAN / BANK] KYC is pending employer approval and blocking my claim. Please facilitate approval or advise the next action.",
    share: "My PF was waiting on employer KYC approval. This tool gave me the nudge email and grievance text: https://sandeshl702.github.io/why-is-my-pf-stuck/",
  },
  bank: {
    title: "Your bank account or IFSC needs attention",
    summary: "A closed account, name mismatch, wrong IFSC or unapproved bank KYC can stop a claim payment. Verify the account before submitting again.",
    steps: [
      "Confirm the account is active, in your name, and the IFSC is current.",
      "Update bank KYC with a clear cancelled cheque or passbook page if requested.",
      "Wait for approval, then retry. Never share OTPs, passwords or your full account number in a message.",
    ],
    docs: ["Cancelled cheque", "Passbook front page", "IFSC confirmation"],
    hr: `Subject: Please approve corrected EPFO bank KYC

Hi HR,

I updated my EPFO bank details because [ISSUE]. Please approve the new bank KYC.

Name: [NAME]
Member ID: [MEMBER ID]
Last 4 digits: [1234]

Thanks,
[NAME]`,
    grievance: "My EPFO claim payment is blocked because bank details or IFSC validation failed. I updated the active account and request verification and reprocessing.",
    share: "Bank or IFSC error holding up your PF? I found the exact checklist and HR note here: https://sandeshl702.github.io/why-is-my-pf-stuck/",
  },
  employer: {
    title: "Your employer is the bottleneck",
    summary: "When HR is silent or the company is closed, keep a clear record and escalate instead of waiting indefinitely. EPFiGMS is the next step when a written request gets no response.",
    steps: [
      "Send one clear request to HR, payroll and your manager with a date for action.",
      "Keep the sent email and delivery proof. If there is no answer after 7 working days, file an EPFiGMS grievance.",
      "If the employer is closed, attach your relieving letter, payslips or other employment proof.",
    ],
    docs: ["HR email and delivery proof", "Relieving letter or payslips", "Service History"],
    hr: `Subject: EPFO action needed by [DATE]

Hi HR / Payroll,

Please complete this EPFO action: [EXACT ACTION]. My claim is blocked because [REASON].

Name: [NAME]
Member ID: [MEMBER ID]

Thanks,
[NAME]`,
    grievance: "My previous employer has not completed the EPFO action needed for my claim: [EXACT ACTION]. I contacted them on [DATES] with no resolution. Please intervene.",
    share: "When HR goes silent, document it and escalate. This PF tool gave me a clean HR follow-up and EPFiGMS draft: https://sandeshl702.github.io/why-is-my-pf-stuck/",
  },
  form: {
    title: "You may be in an EPS or form waiting period",
    summary: "Forms 19, 10C, 10D and scheme certificates have different eligibility and processing paths. A returned claim needs the exact reason before you submit another form.",
    steps: [
      "Identify whether you need final settlement, pension withdrawal benefit or a scheme certificate.",
      "Check total service and whether you are currently employed.",
      "Ask EPFO through EPFiGMS for the correct form and reason before resubmitting.",
    ],
    docs: ["Claim rejection text", "Service History", "Previous claim acknowledgement"],
    hr: `Subject: Please confirm the correct EPFO claim form

Hi HR,

My claim was returned with: [PASTE NOTE]. Please confirm whether I should use Form 19, 10C, 10D or another route.

Name: [NAME]
Member ID: [MEMBER ID]

Thanks,
[NAME]`,
    grievance: "My EPFO claim was returned and I need clarification on the correct claim type based on my service history. Please provide the correct route and reason.",
    share: "Not every PF claim uses the same form. I used this diagnostic to understand my EPS or form wait: https://sandeshl702.github.io/why-is-my-pf-stuck/",
  },
  transfer: {
    title: "Your PF transfer is still in the chain",
    summary: "A transfer can pause when the previous account, exit date, attestation or service history is not aligned. Check both member records before chasing the claim.",
    steps: [
      "Check whether your current or previous employer is expected to act on the transfer.",
      "Confirm both member IDs have matching details, approved KYC and a date of exit.",
      "If the claim is beyond its expected window, raise EPFiGMS with the transfer ID and timeline.",
    ],
    docs: ["Transfer claim screenshot", "Both member IDs (mask publicly)", "Annexure K, if available"],
    hr: `Subject: Please action my pending PF transfer

Hi HR,

My PF transfer from [PREVIOUS COMPANY] is pending. Please check whether attestation or service-history correction is required.

Transfer ID: [ID]
Member ID: [MEMBER ID]

Thanks,
[NAME]`,
    grievance: "My PF transfer claim [CLAIM ID] has been pending since [DATE]. Please check the transfer chain and complete the pending action.",
    share: "PF transfer stuck? The blocker is usually somewhere in the chain. Checklist and grievance: https://sandeshl702.github.io/why-is-my-pf-stuck/",
  },
  unclear: {
    title: "There is not enough signal yet",
    summary: "The wording is too general to identify one blocker. Start with the universal checks, then use the exact EPFO status or rejection text for a sharper answer.",
    steps: [
      "Copy the exact status or rejection reason and remove Aadhaar, bank numbers and other sensitive details.",
      "Check date of exit, KYC, name or DOB, and bank details in that order.",
      "If the claim is beyond the expected window, raise EPFiGMS with the claim ID and timeline.",
    ],
    docs: ["Exact status text", "Service History screenshot", "Claim acknowledgement"],
    hr: `Subject: Help me identify the EPFO claim blocker

Hi HR,

My claim shows: [PASTE STATUS]. Please confirm whether the issue is date of exit, KYC, member details, bank details or claim type.

Name: [NAME]
Member ID: [MEMBER ID]

Thanks,
[NAME]`,
    grievance: "My EPFO claim shows: [PASTE STATUS]. Please confirm the specific blocker, responsible party and action required. Claim ID: [ID].",
    share: "I used a free PF diagnostic to turn a confusing EPFO status into next steps, an HR email and EPFiGMS draft: https://sandeshl702.github.io/why-is-my-pf-stuck/",
  },
};

export const symptomOptions: Array<{ bucket: Bucket; label: string }> = [
  { bucket: "exit", label: "Date of exit missing" },
  { bucket: "name", label: "Name mismatch" },
  { bucket: "dob", label: "DOB mismatch" },
  { bucket: "kyc", label: "KYC pending" },
  { bucket: "bank", label: "Bank or IFSC issue" },
  { bucket: "employer", label: "Employer is silent" },
  { bucket: "form", label: "Wrong form or EPS" },
  { bucket: "transfer", label: "Transfer is stuck" },
];

const keywords: Array<[Bucket, string[]]> = [
  ["exit", ["date of exit", "doe", "exit date", "last working", "service history"]],
  ["name", ["name mismatch", "name does not match", "wrong name"]],
  ["dob", ["dob", "date of birth", "birth"]],
  ["kyc", ["kyc", "aadhaar pending", "pan pending", "employer approval"]],
  ["bank", ["bank", "ifsc", "account number", "payment failed"]],
  ["employer", ["employer not", "employer silent", "company closed", "hr not"]],
  ["form", ["10c", "10d", "form 19", "eps", "scheme certificate", "wrong form"]],
  ["transfer", ["transfer", "annexure k", "previous account", "member id"]],
];

export function detect(text: string): Bucket {
  const normalized = text.toLowerCase();
  for (const [bucket, words] of keywords) {
    if (words.some((word) => normalized.includes(word))) return bucket;
  }
  return "unclear";
}
