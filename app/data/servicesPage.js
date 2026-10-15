/* Static editorial content for the Services page.
   Services themselves (title, paragraphs, icon, color, facts) come from the API. */

export const heroStats = [
  { big: "5", small: "Core study abroad services" },
  { big: "2014", small: "Guiding students since" },
  { big: "2", small: "Offices: Dhaka and Sylhet" },
  { big: "Free", small: "First profile assessment" },
];

/* "to" must match the service anchor: svc-{service slug} */
export const stages = [
  {
    when: "10 to 12 months before",
    h: "Free assessment",
    p: "Profile check, budget, English plan and a first country shortlist.",
    to: "svc-counselling-and-visa-processing",
    link: "Counselling",
  },
  {
    when: "8 to 10 months before",
    h: "Shortlist and apply",
    p: "Programs chosen, documents prepared and applications submitted.",
    to: "svc-university-admission-process",
    link: "University Admission",
  },
  {
    when: "5 to 7 months before",
    h: "Offer and tuition",
    p: "Offer accepted, attestation done and tuition paid through a student file.",
    to: "svc-university-admission-process",
    link: "University Admission",
  },
  {
    when: "3 to 5 months before",
    h: "Visa file and interview",
    p: "Embassy checklist, financial papers, submission and mock interview.",
    to: "svc-counselling-and-visa-processing",
    link: "Visa Processing",
  },
  {
    when: "1 to 3 months before",
    h: "Housing and briefing",
    p: "Accommodation booked, flight planned and pre-departure briefing done.",
    to: "svc-accommodation-and-housing",
    link: "Housing & Pre-Departure",
  },
  {
    when: "After arrival",
    h: "Study and career",
    p: "Registration abroad, part-time work rules and your post-study plan.",
    to: "svc-post-study-opportunities",
    link: "Post-Study",
  },
];

export const tableHeads = [
  "Service",
  "When you need it",
  "Main result",
  "What you bring",
  "Official bodies involved",
];

export const docs = [
  {
    title: "Academic documents",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 10 5-10 5L2 8l10-5Z"/><path d="M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"/></svg>',
    items: [
      "SSC and HSC certificates and marksheets",
      "Bachelor's certificate and transcript (for master's applicants)",
      "Attestation by the Education Board or university, Ministry of Education and MOFA, when required",
      "IELTS, PTE, TOEFL or Duolingo score, or an MOI certificate",
      "CIMEA statement or Declaration of Value (Italy)",
    ],
  },
  {
    title: "Application documents",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    items: [
      "Statement of purpose (SOP) or motivation letter",
      "Academic CV",
      "Two recommendation letters",
      "Portfolio for design and architecture programs",
      "Passport-size photos to the embassy's size rules",
    ],
  },
  {
    title: "Identity and financial documents",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/></svg>',
    items: [
      "Passport valid for your full study period",
      "Birth certificate or National ID (NID)",
      "Bank solvency certificate and statements of your sponsor",
      "Sponsor's income proof: tax return, trade licence or salary certificate",
      "Police clearance certificate and medical test, when the embassy asks",
    ],
  },
];

export const promiseYes = [
  {
    h: "Give you an honest assessment",
    p: 'Even when the honest answer is "not this year" or "not this country".',
  },
  {
    h: "Put your checklist in writing",
    p: "So you know exactly which documents your embassy expects.",
  },
  {
    h: "Show you every application",
    p: "You see what is submitted in your name, to which university and when.",
  },
  {
    h: "Work from official sources",
    p: "Embassy, university and government websites, checked before every intake.",
  },
];

export const promiseNo = [
  {
    h: "Guarantee a visa",
    p: "Only the embassy decides. Anyone who guarantees a visa is not telling you the truth.",
  },
  {
    h: 'Prepare fake or "arranged" documents',
    p: "No fake bank statements, certificates or bookings. They cause refusals and bans.",
  },
  {
    h: "Push a country that does not fit you",
    p: "Your budget, results and goals decide the shortlist.",
  },
  {
    h: "Leave you after the visa",
    p: "Pre-departure and post-study support are part of the journey.",
  },
];

export const sources = [
  {
    t: "Ministry of Foreign Affairs, Bangladesh (attestation)",
    u: "https://mofa.gov.bd/",
  },
  { t: "Ministry of Education, Bangladesh", u: "https://moedu.gov.bd/" },
  {
    t: "Bangladesh Bank (foreign exchange rules)",
    u: "https://www.bb.org.bd/",
  },
  {
    t: "Department of Immigration and Passports",
    u: "https://www.dip.gov.bd/",
  },
  {
    t: "Bangladesh Police clearance certificate",
    u: "https://pcc.police.gov.bd/",
  },
  { t: "VFS Global", u: "https://www.vfsglobal.com/" },
  { t: "U.S. Embassy Dhaka", u: "https://bd.usembassy.gov/" },
  {
    t: "IRCC Canada",
    u: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
  },
  { t: "UK Student visa (GOV.UK)", u: "https://www.gov.uk/student-visa" },
  { t: "Universitaly (Italy)", u: "https://www.universitaly.it/" },
];

export const nextSteps = [
  {
    to: "/study-abroad",
    h: "Choose your destination",
    p: "Compare 15 countries by tuition level, English rules, intakes and post-study work.",
    link: "Compare destinations",
  },
  {
    to: "/success-story",
    h: "Read student stories",
    p: "See how Bangladeshi students reached universities abroad with Sunrise.",
    link: "Success stories",
  },
  {
    to: "/staff",
    h: "Meet your counsellors",
    p: "Get to know the team in Banani and Sylhet who will handle your file.",
    link: "Our team",
  },
];

/* "a" is plain text (used for the FAQ schema). "parts" is the same answer with
   internal links, used on the page. */
export const faqs = [
  {
    q: "What study abroad services does Sunrise offer Bangladeshi students?",
    a: "Sunrise Education Consultants offers five study abroad services for Bangladeshi students: counselling and student visa processing, university admission support, accommodation and housing, pre-departure preparation, and post-study opportunities guidance. Every student starts with a free profile assessment in Banani, Dhaka, in Sylhet or online.",
  },
  {
    q: "Is the first study abroad counselling session free?",
    a: "Yes. The first profile assessment at Sunrise is free, whether you visit the Banani or Sylhet office or join online. Before you start any further service, ask your counsellor to explain the service charge for your chosen country and keep it in writing.",
  },
  {
    q: "Can a study abroad consultant guarantee a student visa?",
    a: "No. Only the embassy or immigration authority decides a visa, so no consultant can honestly guarantee one. A good consultant improves your chances by building a complete, genuine file and preparing you for the interview. Treat any visa guarantee as a warning sign.",
  },
  {
    q: "How long does the study abroad process take from Bangladesh?",
    a: "Most students need 6 to 12 months from the first assessment to departure. Admission usually takes 1 to 3 months, and visa processing takes from a few weeks to several months depending on the embassy. Starting 10 to 12 months before your intake gives you time for scholarships and attestation.",
  },
  {
    q: "Can you help me study abroad without IELTS?",
    a: "Yes. Many universities in Italy, Malta, Cyprus, Malaysia, China and Turkey accept a Medium of Instruction (MOI) certificate or their own English test instead of IELTS. Rules differ by university and embassy, so we check each program before you apply.",
    parts: [
      "Yes. Many universities in Italy, Malta, Cyprus, Malaysia, China and Turkey accept a Medium of Instruction (MOI) certificate or their own English test instead of IELTS. Rules differ by university and embassy, so we check each program before you apply. You can compare the English rules of every country on our ",
      { to: "/study-abroad", label: "study abroad destinations" },
      " page.",
    ],
  },
  {
    q: "Do you help with scholarships?",
    a: "Yes. Your counsellor checks scholarship options during the free assessment, and all scholarships for Bangladeshi students, including Stipendium Hungaricum, the Chinese Government Scholarship, Türkiye Burslari and Italy's DSU, are covered on our dedicated Scholarships page.",
    parts: [
      "Yes. Your counsellor checks scholarship options during the free assessment, and all scholarships for Bangladeshi students, including Stipendium Hungaricum, the Chinese Government Scholarship, Türkiye Burslari and Italy's DSU, are covered on our dedicated ",
      { to: "/scholarships", label: "Scholarships" },
      " page.",
    ],
  },
  {
    q: "Can you help if my student visa was refused before?",
    a: "Yes. Bring your refusal letter. We read the reason the embassy gave, fix that weakness in your documents, finances or interview answers, and help you decide whether to reapply to the same country or change your plan.",
  },
  {
    q: "Can I use your services if I live outside Dhaka?",
    a: "Yes. Students can visit our head office in Banani, Dhaka, or our Sylhet office on Jail Road, and students from any district can take counselling online and share documents digitally.",
  },
  {
    q: "What documents do I need for the first counselling session?",
    a: "Bring your passport if you have one, SSC and HSC results, bachelor's results if you are applying for a master's degree, any English test score or MOI certificate, and a rough idea of your total budget. Copies or phone photos are enough for the first session.",
  },
];
