<!-- pages/company-profile/index.vue -->
<script setup>
const config = useRuntimeConfig();
const siteUrl = (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";
const brand = "Sunrise Education Consultants";
const pageUrl = siteUrl + "company-profile";
const router = useRouter();

const PHONE = { text: "+88 01911 878 274", href: "+8801911878274" };
const EMAIL = "info@sunrise-bd.net";

/* =====================================================================
   DATA
   Everything below the API is optional: when the API sends a field it is
   used, otherwise the built-in default (copied from the approved HTML
   design) is shown. See the field list in the chat.
   ===================================================================== */
const { data, pending, error, refresh } = await useApi("/company-profile", {
  key: "company-profile",
  transform: (res) => res.data,
});
const { data: servicesData } = await useApi("/services", {
  key: "services-list",
  transform: (res) => res.data,
});
const { data: faqData } = await useApi("/faqs", {
  key: "faqs-company-profile",
  query: { group: "general" },
  transform: (res) => res.data,
});
// Study destinations: the same list the Study Abroad pages use
const { data: destData } = await useApi("/study-abroad", {
  key: "study-abroad-list",
  transform: (res) => res.data,
});

const p = computed(() => data.value || {});
const list = (apiVal, def) => (Array.isArray(apiVal) && apiVal.length ? apiVal : def);

/* ---------- Defaults (from the HTML design) ---------- */
const DEF_LEADERSHIP = [
  { name: "Anisuzzaman Kiron", slug: "anisuzzaman-kiron", position: "Founder & CEO", responsibility: "Leads the company and its counselling standards; reviews the guides on this website" },
  { name: "Yeasmin Akther", slug: "yeasmin-akther", position: "Co-Founder & COO", responsibility: "Runs operations; with Sunrise for 10+ years" },
  { name: "Md Kamrul Hasan", slug: "kamrul", position: "General Manager", responsibility: "12+ years of experience" },
  { name: "Md Samsuzzaman", slug: "md-samsuzzaman", position: "Chief Adviser", responsibility: "11 years of experience" },
  { name: "Afroza Khanam Ruma", slug: "afroza-khanam-ruma", position: "Head Counselor", responsibility: "Leads the student counselling team" },
  { name: "Kauser Hossain", slug: "kauser-hossain", position: "Destination Manager", responsibility: "5+ years with Sunrise" },
  { name: "Arif Rahman", slug: "arif-rahman", position: "Operations Manager", responsibility: "Runs day-to-day operations" },
  { name: "Zahid Hasan Pabel", slug: "zahid-hasan-pabel", position: "Branch Manager, Sylhet", responsibility: "Leads the Sylhet office" },
];

const DEF_OFFICES = [
  {
    label: "Head office",
    tone: "green",
    title: "Banani, Dhaka",
    city: "Dhaka",
    short_address: "Banani, Dhaka-1213",
    street: "House 61 (1st Floor), Block F, Road 08, Banani",
    locality: "Dhaka",
    postal_code: "1213",
    address: "House 61 (1st Floor), Block F, Road 08, Banani, Dhaka-1213",
    phone: "+88 01911 878 274",
    phone_href: "+8801911878274",
    email: EMAIL,
    hours: "Saturday to Thursday, 10 am to 6 pm",
    map_url: "https://www.google.com/maps/search/?api=1&query=Sunrise+Education+Consultants+Banani+Dhaka",
    map_text: "Get directions to Banani",
  },
  {
    label: "Branch office",
    tone: "blue",
    title: "Jail Road, Sylhet",
    city: "Sylhet",
    short_address: "Jail Road, Sylhet-3100",
    street: "Ananda Tower (3rd Floor), Jail Road",
    locality: "Sylhet",
    postal_code: "3100",
    address: "Ananda Tower (3rd Floor), Jail Road, Sylhet-3100",
    phone: "+88 01611 878 274",
    phone_href: "+8801611878274",
    lead: { name: "Zahid Hasan Pabel", slug: "zahid-hasan-pabel" },
    hours: "Saturday to Thursday, 10 am to 6 pm",
    map_url: "https://www.google.com/maps/search/?api=1&query=Sunrise+Education+Consultants+Jail+Road+Sylhet",
    map_text: "Get directions to Sylhet",
  },
];

const DEF_BUSINESS = [
  {
    tag: "Core business",
    title: "Study Abroad Consultancy",
    tone: "green",
    paragraphs: [
      "We guide students from Bangladesh through the full journey to a foreign university: choosing a realistic country and program, preparing applications, finding scholarships, building the student visa file and preparing for departure.",
      "Our clients are mainly HSC graduates applying for bachelor's degrees and graduates applying for master's and PhD programs. Each counsellor handles a limited number of students, so every file gets full attention.",
    ],
    link_text: "Study abroad services for Bangladeshi students",
    link_to: "/services",
  },
  {
    tag: "Specialist service",
    title: "Immigration Consultancy",
    tone: "blue",
    paragraphs: [
      "For skilled professionals, families and business migrants, we advise on relocating to Germany, Italy, Norway, Hungary, Romania and Dubai, including residence visa processing, business migration, qualification recognition and resettlement support.",
      "All immigration advice is given in writing, so clients have a documented record of what we recommended. Where a rule is set by a government, we point clients to the official source.",
    ],
    link_text: "Contact Sunrise about immigration",
    link_to: "/contact-us",
  },
];

const DEF_SERVICES = [
  { name: "Counselling & Visa Processing", text: "Free profile assessment, country and course matching, visa file preparation and interview practice.", to: "/service-details/counselling-and-visa-processing" },
  { name: "University Admission", text: "Program shortlist, applications, documents, statements of purpose and offer letters.", to: "/service-details/university-admission-process" },
  { name: "Scholarship Guidance", text: "Government and university scholarships matched to each profile, with application and interview help.", to: "/scholarships" },
  { name: "Accommodation & Housing", text: "Student residences, private rooms and the housing proof that many visas require.", to: "/service-details/accommodation-and-housing" },
  { name: "Pre-Departure Preparation", text: "Travel, money, insurance, packing and arrival briefings before you fly.", to: "/service-details/pre-departure-preparation" },
  { name: "Post-Study Opportunities", text: "Guidance on part-time work rules, post-study permits and next steps after graduation.", to: "/service-details/post-study-opportunities" },
];

const DEF_REGIONS = [
  {
    name: "Europe",
    text: "Affordable public universities and scholarships, plus the Schengen area.",
    countries: [
      { name: "Italy", to: "/study-abroad/italy" },
      { name: "Malta", to: "/study-in-malta-from-bangladesh" },
      { name: "Hungary", to: "/study-in-hungary-from-bangladesh" },
      { name: "Finland", to: "/study-in-finland-from-bangladesh" },
      { name: "Cyprus", to: "/study-in-cyprus-from-bangladesh" },
      { name: "Norway", to: "/study-in-norway-from-bangladesh" },
      { name: "Greece", to: "/study-in-greece-from-bangladesh" },
    ],
  },
  {
    name: "Asia",
    text: "Close to home, with government scholarships and English-taught degrees.",
    countries: [
      { name: "Malaysia", to: "/study-in-malaysia" },
      { name: "China", to: "/study-in-china" },
      { name: "Turkey", to: "/study-in-turkey-from-bangladesh" },
    ],
  },
  {
    name: "North America",
    text: "Research universities, co-op programs and strong career routes.",
    countries: [
      { name: "Canada", to: "/study-abroad/study-in-canada" },
      { name: "USA", to: "/study-abroad/study-in-usa" },
    ],
  },
  {
    name: "UK and Oceania",
    text: "One-year master's degrees and globally known universities.",
    countries: [
      { name: "UK", to: "/study-abroad/study-in-uk" },
      { name: "Australia", to: "/study-abroad/study-in-australia" },
      { name: "New Zealand", to: "/study-abroad/study-in-new-zealand" },
    ],
  },
];

const DEF_CLIENTS = [
  { icon: "graduation", title: "HSC graduates", paragraphs: ["Students applying for bachelor's degrees after HSC, A-Level or equivalent, often with scholarship goals.", "We help them choose between affordable public universities, scholarship routes and English-taught programs."] },
  { icon: "award", title: "Master's and PhD applicants", paragraphs: ["Graduates applying for postgraduate study, research degrees and funded programs such as government scholarships.", "We focus on program fit, statements of purpose and funding."] },
  { icon: "home", title: "Parents and sponsors", paragraphs: ["Families who fund and support the student, and who need clear answers on costs, bank statements and safety.", "Parents are welcome in every counselling session."] },
  { icon: "briefcase", title: "Skilled professionals", paragraphs: ["Working professionals and families planning to live and work abroad through legal residence and work routes.", "Advice is always given in writing."] },
  { icon: "globe", title: "Business migrants", paragraphs: ["Entrepreneurs and investors exploring business migration and residence options in Europe and Dubai.", "We explain the official requirements before any application."] },
  { icon: "chat", title: "Universities and partners", paragraphs: ["Universities, colleges and education partners abroad that want to reach qualified students from Bangladesh.", `Contact us at ${EMAIL} for partnership enquiries.`] },
];

const DEF_STANDARDS = [
  { title: "Association membership", text: "Member of FACDCAB, so students and parents can check that we operate as a recognised consultancy in Bangladesh." },
  { title: "Written terms and advice", text: "Service terms, fees and our advice are given in writing before you commit, so nothing depends on verbal promises." },
  { title: "Genuine documents only", text: "We never prepare or accept fake bank statements, certificates or bookings. They lead to refusals and bans." },
  { title: "No visa guarantees", text: "Only embassies decide visas. We improve your chances with a complete file and interview practice, and never promise the impossible." },
  { title: "Official sources", text: "Fees, scholarship and visa rules are checked on embassy, university and government websites before every intake." },
  { title: "Limited caseload", text: "We never take on more students than our counsellors can serve well, so every file gets full, personal attention." },
];

const DEF_PLANS = [
  { icon: "globe", title: "More partner universities", text: "We plan to grow our network of partner universities and colleges, so students have more verified options in each destination." },
  { icon: "briefcase", title: "Wider immigration services", text: "We plan to extend our immigration consultancy to additional countries where we can offer reliable, written advice." },
  { icon: "award", title: "A Sunrise scholarship", text: "We plan to launch our own scholarship programme for deserving students. Details will be published here when it opens." },
];

const DEF_MISSION =
  "To help every student we advise reach their full potential abroad through honest, ethical and personal guidance, whatever their background.";
const DEF_VISION =
  "To be the most trusted education consultancy in Bangladesh, known for student success and for bridging the gap between education in Bangladesh and the world.";

const DEF_FAQS = [
  ["What is Sunrise Education Consultants?", "Sunrise Education Consultants is a private study abroad and immigration consultancy in Bangladesh, founded in Dhaka in 2014. It helps students choose a country and university, apply for admission and scholarships, and prepare student visa files, and it advises skilled professionals and families on immigration."],
  ["When was Sunrise Education Consultants founded and by whom?", "Sunrise Education Consultants was founded in 2014 in Dhaka by Anisuzzaman Kiron, who is the Founder and CEO. Yeasmin Akther is the Co-Founder and COO."],
  ["Where are the offices of Sunrise Education Consultants?", "The head office is at House 61 (1st Floor), Block F, Road 08, Banani, Dhaka-1213. The branch office is at Ananda Tower (3rd Floor), Jail Road, Sylhet-3100. Both are open Saturday to Thursday, 10 am to 6 pm."],
  ["Which countries does Sunrise Education Consultants work with?", "__DEST__"],
  ["What services does Sunrise Education Consultants provide?", "Sunrise provides study abroad counselling, university admission, scholarship guidance, student visa processing, accommodation support, pre-departure briefings and post-study guidance. It also offers immigration consultancy for skilled professionals, families and business migrants."],
  ["Is Sunrise Education Consultants a member of any association?", "Yes. Sunrise Education Consultants is a member of the Foreign Admission and Career Development Consultants Association of Bangladesh (FACDCAB)."],
  ["Does Sunrise guarantee a student visa?", "No. Visas are decided only by embassies and immigration authorities, so no consultancy can guarantee one. Sunrise improves your chances with a complete, genuine file and interview preparation."],
].map(([q, a], i) => ({ id: "d" + i, q, a: `<p>${a}</p>`, text: a }));

/* ---------- Merged content (API first, default second) ---------- */
const companyName = computed(() => p.value.company_name || brand);
const pageTitle = computed(() => p.value.title || "Company Profile");
const est = computed(() => String(p.value.established_year || "2014"));
const yearsIn = computed(() => Math.max(0, new Date().getFullYear() - Number(est.value)));

const leadership = computed(() => list(p.value.leadership, DEF_LEADERSHIP));
const offices = computed(() => list(p.value.offices, DEF_OFFICES));
const businessLines = computed(() => list(p.value.business_lines, DEF_BUSINESS));

/* ---------- Study destinations, grouped by the API's `region` ---------- */
const REGION_ORDER = ["europe", "asia", "north_america", "uk_oceania", "others"];
const REGION_INFO = {
  europe: { name: "Europe", text: "Affordable public universities and scholarships, plus the Schengen area." },
  asia: { name: "Asia", text: "Close to home, with government scholarships and English-taught degrees." },
  north_america: { name: "North America", text: "Research universities, co-op programs and strong career routes." },
  uk_oceania: { name: "UK and Oceania", text: "One-year master's degrees and globally known universities." },
  others: { name: "More destinations", text: "Other countries our team advises on." },
};
// Where a country's guide lives. Change this one line if your route differs.
const countryLink = (slug) => `/study-abroad/${slug}`;
const countryName = (c) =>
  c.short_name ||
  String(c.name || "").replace(/^Study in\s+/i, "").replace(/\s+from Bangladesh$/i, "");
const titleCase = (k) => k.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

const dynamicRegions = computed(() => {
  const groups = new Map();
  for (const c of destData.value || []) {
    const key = String(c.region || "others");
    if (!groups.has(key)) groups.set(key, { key, label: null, countries: [] });
    const g = groups.get(key);
    if (c.region_label && !g.label) g.label = c.region_label;
    g.countries.push({ name: countryName(c), to: countryLink(c.slug) });
  }
  const rank = (k) => {
    const i = REGION_ORDER.indexOf(k);
    return i === -1 ? REGION_ORDER.length : i;
  };
  return [...groups.values()]
    .sort((a, b) => rank(a.key) - rank(b.key))
    .map((g) => ({
      name: g.label || REGION_INFO[g.key]?.name || titleCase(g.key),
      text: REGION_INFO[g.key]?.text || "",
      countries: g.countries,
    }));
});

const regions = computed(() =>
  dynamicRegions.value.length ? dynamicRegions.value : list(p.value.regions, DEF_REGIONS),
);
const clients = computed(() => list(p.value.clients, DEF_CLIENTS));
const standards = computed(() => list(p.value.standards, DEF_STANDARDS));
const plans = computed(() => list(p.value.plans, DEF_PLANS));
const mission = computed(() => p.value.mission_summary || DEF_MISSION);
const vision = computed(() => p.value.vision_summary || DEF_VISION);
const destinationCount = computed(() =>
  regions.value.reduce((n, r) => n + (r.countries?.length || 0), 0),
);
const destNames = computed(() =>
  regions.value.flatMap((r) => (r.countries || []).map((c) => c.name)),
);
const joinNames = (a) =>
  a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
const destSentence = computed(
  () => `Sunrise guides students to ${destinationCount.value} study destinations: ${joinNames(destNames.value)}.`,
);

const services = computed(() => {
  const api = (servicesData.value || [])
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((s) => ({ name: s.name, text: s.tagline || s.summary, to: `/service-details/${s.slug}` }));
  return api.length ? api : DEF_SERVICES;
});

const faqs = computed(() =>
  faqData.value?.length
    ? faqData.value.map((f) => ({ id: f.id, q: f.question, a: f.answer, text: f.answer_text }))
    : DEF_FAQS.map((f) => ({
        ...f,
        a: f.a.replace("__DEST__", destSentence.value),
        text: f.text.replace("__DEST__", destSentence.value),
      })),
);

const reviewer = computed(
  () =>
    p.value.reviewed_by || {
      name: "Anisuzzaman Kiron",
      slug: "anisuzzaman-kiron",
      position: "Founder & CEO",
      photo: siteUrl + "upload/team/1873934979029250.jpeg",
    },
);
const initials = (n) =>
  (n || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const updatedIso = computed(() => (p.value.updated_at ? String(p.value.updated_at).slice(0, 10) : ""));
const updatedLabel = computed(() =>
  updatedIso.value
    ? new Date(updatedIso.value + "T00:00:00Z").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "",
);

const keyFacts = computed(() => {
  if (p.value.key_facts?.length) return p.value.key_facts;
  const rows = [
    { label: "Company name", value: companyName.value },
    { label: "Founded", value: `${est.value}, Dhaka, Bangladesh` },
    { label: "Company type", value: p.value.company_type || "Private company" },
    { label: "Industry", value: p.value.industry || "Education and immigration consultancy" },
  ];
  const ceo = leadership.value.find((l) => /founder\s*&?\s*ceo|^ceo/i.test(l.position));
  const coo = leadership.value.find((l) => /coo/i.test(l.position));
  if (ceo) rows.push({ label: "Founder & CEO", value: ceo.name, to: `/staff/${ceo.slug}` });
  if (coo) rows.push({ label: "Co-Founder & COO", value: coo.name, to: `/staff/${coo.slug}` });
  if (offices.value[0]) rows.push({ label: "Head office", value: offices.value[0].short_address || offices.value[0].address });
  if (offices.value[1]) rows.push({ label: "Branch", value: offices.value[1].short_address || offices.value[1].address });
  if (p.value.license_no) rows.push({ label: "License no.", value: p.value.license_no });
  if (p.value.total_staff) {
    rows.push({
      label: "Team",
      value: `${p.value.total_staff} people${p.value.total_counsellors ? `, ${p.value.total_counsellors} counsellors` : ""}`,
    });
  }
  rows.push({ label: "Member of", value: p.value.member_of || "FACDCAB" });
  return rows;
});

const stats = computed(() => {
  if (p.value.stats?.length) return p.value.stats;
  return [
    { value: String(yearsIn.value), suffix: "+", label: `Years in business since ${est.value}` },
    { value: "2,500", suffix: "+", label: "Students and applicants supported" },
    { value: String(destinationCount.value), suffix: "", label: "Study destinations covered" },
    { value: String(offices.value.length), suffix: "", label: `Offices: ${offices.value.map((o) => o.city).join(" and ")}` },
  ];
});

const infoRows = computed(() => {
  if (p.value.info_rows?.length) return p.value.info_rows;
  const o = offices.value[0] || {};
  return [
    { label: "Legal form", value: p.value.company_type ? `${p.value.company_type}, Bangladesh` : "Private company, Bangladesh" },
    { label: "Business lines", value: "Study abroad consultancy; immigration consultancy" },
    { label: "Markets served", value: "Students and families across Bangladesh" },
    { label: "Languages", value: "Bengali and English" },
    { label: "Office hours", value: o.hours || "Saturday to Thursday, 10 am to 6 pm" },
    { label: "Website", value: "sunrise-bd.net", href: siteUrl },
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { label: "Phone", value: PHONE.text, href: `tel:${PHONE.href}` },
  ];
});

/* ---------- Icons (clients + plans) ---------- */
const svg = (inner) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${inner}</svg>`;
const ic = {
  graduation: svg('<path d="m12 3 10 5-10 5L2 8l10-5Z"/><path d="M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"/>'),
  award: svg('<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>'),
  home: svg('<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"/>'),
  briefcase: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
  globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
  chat: svg('<path d="M4 5h16v11H8l-4 4z"/><path d="M9 9h6M9 12h4"/>'),
};
const iconFor = (name) => ic[name] || ic.globe;

/* ---------- Internal links inside FAQ HTML should not reload the page ---------- */
const onProseClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  const a = e.target.closest("a");
  const href = a?.getAttribute("href");
  if (href && href.startsWith("/") && !href.startsWith("//") && !a.target) {
    e.preventDefault();
    router.push(href);
  }
};

/* =====================================================================
   SEO
   ===================================================================== */
const stripHtml = (h) => (h || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const seoTitle = computed(() => p.value.seo?.meta_title || `Company Profile | ${brand}`);
const seoDesc = computed(
  () =>
    p.value.seo?.meta_description ||
    p.value.tagline ||
    `Company profile of ${brand}: founded ${est.value}, services, ${destinationCount.value} study destinations, leadership and offices in Dhaka and Sylhet.`,
);

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  keywords: () => p.value.seo?.meta_keywords || undefined,
  robots: "index, follow, max-image-preview:large",
  ogType: "profile",
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogImage: () => p.value.image || undefined,
  ogUrl: pageUrl,
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

const jsonLd = computed(() => {
  const orgId = `${siteUrl}#organization`;
  const personUrl = (l) => `${siteUrl}staff/${l.slug}`;
  const founder = leadership.value.find((l) => /founder\s*&?\s*ceo|^ceo/i.test(l.position)) || leadership.value[0];
  const staffNum = parseInt(p.value.total_staff, 10);
  const postal = (o) => ({
    "@type": "PostalAddress",
    streetAddress: o.street || o.address,
    addressLocality: o.locality || o.city,
    postalCode: o.postal_code || undefined,
    addressCountry: "BD",
  });

  const org = {
    "@type": "EducationalOrganization",
    "@id": orgId,
    name: companyName.value,
    url: siteUrl,
    logo: `${siteUrl}frontend/assets/images/logo.png`,
    image: p.value.image || undefined,
    slogan: p.value.tagline || undefined,
    foundingDate: est.value,
    foundingLocation: { "@type": "Place", name: "Dhaka, Bangladesh" },
    identifier: p.value.license_no || undefined,
    founder: founder
      ? { "@type": "Person", "@id": `${personUrl(founder)}#person`, name: founder.name, jobTitle: founder.position, url: personUrl(founder) }
      : undefined,
    employee: leadership.value
      .filter((l) => l !== founder)
      .map((l) => ({ "@type": "Person", name: l.name, jobTitle: l.position, url: personUrl(l) })),
    numberOfEmployees: Number.isFinite(staffNum) ? { "@type": "QuantitativeValue", minValue: staffNum } : undefined,
    address: offices.value[0] ? postal(offices.value[0]) : undefined,
    location: offices.value.map((o) => ({ "@type": "Place", name: o.title, address: postal(o) })),
    email: EMAIL,
    telephone: PHONE.href,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: PHONE.href,
        email: EMAIL,
        areaServed: "BD",
        availableLanguage: ["English", "Bengali"],
      },
    ],
    areaServed: { "@type": "Country", name: "Bangladesh" },
    memberOf: {
      "@type": "Organization",
      name: "Foreign Admission and Career Development Consultants Association of Bangladesh (FACDCAB)",
      url: "https://www.facdcab.org/",
    },
    knowsAbout: ["Study abroad counselling", "University admission", "Student visa processing", "Scholarships", "Immigration consultancy"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Study abroad and immigration services",
      itemListElement: services.value.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: siteUrl.replace(/\/$/, "") + s.to },
      })),
    },
    sameAs: ["https://www.facebook.com/SunriseEC", "https://www.youtube.com/@SunriseEducationConsultants"],
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "About Us", item: `${siteUrl}about-us` },
          { "@type": "ListItem", position: 3, name: "Company Profile", item: pageUrl },
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: seoTitle.value,
        description: seoDesc.value,
        inLanguage: "en",
        dateCreated: est.value,
        dateModified: updatedIso.value || undefined,
        mainEntity: { "@id": orgId },
        reviewedBy: reviewer.value?.slug
          ? { "@id": `${siteUrl}staff/${reviewer.value.slug}#person` }
          : undefined,
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}#website`, url: siteUrl, name: brand },
      },
      org,
      {
        "@type": "FAQPage",
        mainEntity: faqs.value.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.text || stripHtml(f.a) },
        })),
      },
    ],
  });
});

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{ type: "application/ld+json", innerHTML: () => jsonLd.value }],
});

/* ---------- Reveal on scroll ---------- */
let io = null;
onMounted(() => {
  const els = document.querySelectorAll(".scf .scf-reveal");
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("is-in"));
  }
});
onBeforeUnmount(() => io?.disconnect());
</script>

<template>
  <main class="scf">
    <div v-if="pending" class="scf-container scf-state">
      <p>Loading company profile…</p>
    </div>

    <div v-else-if="error" class="scf-container scf-state">
      <p>Could not load the company profile right now.</p>
      <button type="button" class="scf-btn scf-btn-primary" @click="refresh()">Try again</button>
    </div>

    <template v-else>
      <!-- ================= HERO ================= -->
      <section class="scf-hero" aria-labelledby="scf-h1">
        <div class="scf-hero-rays" aria-hidden="true"></div>
        <div class="scf-container">
          <nav class="scf-crumb" aria-label="Breadcrumb">
            <NuxtLink to="/">Home</NuxtLink><span>/</span>
            <NuxtLink to="/about-us">About Us</NuxtLink><span>/</span>
            <span aria-current="page">Company Profile</span>
          </nav>

          <div class="scf-hero-grid">
            <div>
              <span class="scf-eyebrow"><i></i>{{ p.tagline || "Company Profile" }}</span>
              <h1 id="scf-h1" class="scf-h1">
                {{ companyName }} <span>{{ pageTitle }}</span>
              </h1>
              <p v-if="p.hero_text" class="scf-sub">{{ p.hero_text }}</p>
              <p v-else class="scf-sub">
                {{ companyName }} is a private study abroad and immigration consultancy in
                Bangladesh, founded in Dhaka in {{ est }}. This page sets out the key facts about
                <NuxtLink to="/">{{ companyName }}</NuxtLink> in one place: what we do, the
                countries we cover, who leads the company, where our offices are and how to verify
                us. It is written for students, parents, universities and partners.
              </p>
              <div class="scf-cta-row">
                <NuxtLink class="scf-btn scf-btn-primary" to="/apply-now"
                  >Get Free Assessment <span aria-hidden="true">&rarr;</span></NuxtLink
                >
                <a class="scf-btn scf-btn-ghost" href="#scf-offices-h">Visit Our Offices</a>
              </div>
              <div v-if="reviewer?.name" class="scf-byline">
                <span class="scf-av" aria-hidden="true"
                  >{{ initials(reviewer.name) }}<img
                    v-if="reviewer.photo"
                    :src="reviewer.photo"
                    alt=""
                    loading="lazy"
                    @error="$event.target.style.display = 'none'"
                /></span>
                <div>
                  Reviewed by
                  <b
                    ><NuxtLink :to="`/staff/${reviewer.slug}`">{{ reviewer.name }}</NuxtLink></b
                  ><template v-if="reviewer.position">, {{ reviewer.position }}</template>
                  <template v-if="updatedLabel"
                    ><br />Last updated: <time :datetime="updatedIso">{{ updatedLabel }}</time></template
                  >
                </div>
              </div>
            </div>

            <aside class="scf-facts" aria-labelledby="scf-facts-h">
              <h2 id="scf-facts-h">Key facts</h2>
              <dl>
                <div v-for="f in keyFacts" :key="f.label">
                  <dt>{{ f.label }}</dt>
                  <dd>
                    <NuxtLink v-if="f.to" :to="f.to">{{ f.value }}</NuxtLink
                    ><template v-else>{{ f.value }}</template>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <div class="scf-stats">
            <div v-for="s in stats" :key="s.label" class="scf-stat">
              <b>{{ s.value }}<span v-if="s.suffix">{{ s.suffix }}</span></b
              ><small>{{ s.label }}</small>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= OVERVIEW ================= -->
      <section class="scf-section" aria-labelledby="scf-ov-h">
        <div class="scf-container scf-overview">
          <div class="scf-prose">
            <span class="scf-eyebrow"><i></i>Overview</span>
            <h2 id="scf-ov-h" class="scf-h2">Company <span>Overview</span></h2>

            <div v-if="p.intro" class="scf-intro" @click="onProseClick" v-html="p.intro"></div>
            <template v-else>
              <p>
                {{ companyName }} was founded in Dhaka in {{ est }} by Anisuzzaman Kiron, with
                Yeasmin Akther as co-founder. The company advises Bangladeshi students who want to
                study at universities and colleges abroad, and it helps skilled professionals,
                families and business migrants who plan to live and work overseas.
              </p>
              <p>
                The company operates from a head office in Banani, Dhaka, and a branch on Jail
                Road, Sylhet, with a team of {{ p.total_staff || "50+" }} people, including
                counsellors, admission officers and destination specialists. Counselling is
                available in person at both offices or online for students anywhere in Bangladesh.
              </p>
              <p>
                Our purpose is to bridge the gap between education in Bangladesh and the world's
                leading study destinations through honest, personal guidance. Every student starts
                with a free profile assessment, and every recommendation is based on official
                university, embassy and government rules. Read the full story on our
                <NuxtLink to="/about-us">About {{ companyName }}</NuxtLink> page.
              </p>
            </template>
          </div>

          <div class="scf-side">
            <figure v-if="p.image" class="scf-fig scf-reveal">
              <img :src="p.image" :alt="p.image_alt || companyName" loading="lazy" />
            </figure>
            <div class="scf-table-wrap scf-reveal">
              <table class="scf-table">
                <thead>
                  <tr><th scope="col" colspan="2">Company information</th></tr>
                </thead>
                <tbody>
                  <tr v-for="r in infoRows" :key="r.label">
                    <td>{{ r.label }}</td>
                    <td>
                      <a v-if="r.href" :href="r.href">{{ r.value }}</a
                      ><template v-else>{{ r.value }}</template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= BUSINESS LINES ================= -->
      <section class="scf-section scf-soft" aria-labelledby="scf-do-h">
        <div class="scf-container">
          <span class="scf-eyebrow"><i></i>What we do</span>
          <h2 id="scf-do-h" class="scf-h2">Two Business Lines, <span>One Team</span></h2>
          <p class="scf-lead">
            Study abroad consultancy is our core business. Immigration consultancy is a smaller,
            specialist service delivered by the same team.
          </p>

          <div class="scf-pillars">
            <article v-for="b in businessLines" :key="b.title" class="scf-pillar scf-reveal">
              <div class="scf-pillar-top" :class="b.tone === 'blue' ? 'g-blue' : 'g-green'">
                <span>{{ b.tag }}</span>
                <h3>{{ b.title }}</h3>
              </div>
              <div class="scf-pillar-body">
                <p v-for="t in b.paragraphs" :key="t">{{ t }}</p>
                <NuxtLink v-if="b.link_to" class="scf-link" :to="b.link_to">
                  {{ b.link_text }}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </NuxtLink>
              </div>
            </article>
          </div>

          <div class="scf-svc">
            <NuxtLink v-for="s in services" :key="s.to" class="scf-reveal" :to="s.to">
              <h3>{{ s.name }}</h3>
              <p v-if="s.text">{{ s.text }}</p>
              <span>Learn more &rarr;</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ================= DESTINATIONS ================= -->
      <section class="scf-section" aria-labelledby="scf-dest-h">
        <div class="scf-container">
          <span class="scf-eyebrow"><i></i>Markets</span>
          <h2 id="scf-dest-h" class="scf-h2">
            {{ destinationCount }} Study Destinations <span>Across {{ regions.length }} Regions</span>
          </h2>
          <p class="scf-lead">
            We advise only on countries where our team has current, hands-on experience with
            admissions and student visas. Each destination has its own detailed guide. Compare them
            all on our <NuxtLink to="/study-abroad">study abroad destinations</NuxtLink> page.
          </p>
          <div class="scf-regions">
            <div v-for="r in regions" :key="r.name" class="scf-region scf-reveal">
              <h3>{{ r.name }}</h3>
              <p v-if="r.text">{{ r.text }}</p>
              <ul>
                <li v-for="c in r.countries" :key="c.name">
                  <NuxtLink :to="c.to">{{ c.name }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= CLIENTS ================= -->
      <section class="scf-section scf-soft" aria-labelledby="scf-seg-h">
        <div class="scf-container">
          <span class="scf-eyebrow"><i></i>Who we serve</span>
          <h2 id="scf-seg-h" class="scf-h2">Our Clients <span>and Partners</span></h2>
          <p class="scf-lead">
            Most of our clients are Bangladeshi students and their families. We also work with
            professionals planning to emigrate and with institutions abroad.
          </p>
          <div class="scf-segs">
            <div v-for="c in clients" :key="c.title" class="scf-card scf-reveal">
              <span class="scf-ci" v-html="iconFor(c.icon)"></span>
              <h3>{{ c.title }}</h3>
              <p v-for="t in c.paragraphs" :key="t">{{ t }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= LEADERSHIP ================= -->
      <section class="scf-section" aria-labelledby="scf-lead-h">
        <div class="scf-container">
          <span class="scf-eyebrow"><i></i>Management</span>
          <h2 id="scf-lead-h" class="scf-h2">Leadership <span>Team</span></h2>
          <p class="scf-lead">
            The company is led by its founders, supported by a management team that oversees
            counselling, destinations, operations and the Sylhet branch. Read a personal
            <NuxtLink to="/message-from-ceo">message from the CEO</NuxtLink>.
          </p>
          <div class="scf-table-wrap scf-reveal">
            <table class="scf-table scf-table-lead">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Position</th>
                  <th scope="col">Responsibility</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="l in leadership" :key="l.slug">
                  <td><NuxtLink :to="`/staff/${l.slug}`">{{ l.name }}</NuxtLink></td>
                  <td>{{ l.position }}</td>
                  <td>{{ l.responsibility }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="scf-note">
            Each name links to that person's profile. Meet every counsellor on our
            <NuxtLink to="/staff">study abroad counsellors in Dhaka</NuxtLink> page.
          </p>
        </div>
      </section>

      <!-- ================= OFFICES ================= -->
      <section class="scf-section scf-soft" aria-labelledby="scf-offices-h">
        <div class="scf-container">
          <span class="scf-eyebrow"><i></i>Locations</span>
          <h2 id="scf-offices-h" class="scf-h2">Our <span>Offices</span></h2>
          <p class="scf-lead">
            Walk-in counselling is available at both offices. Please call before visiting so the
            right counsellor is available for you.
          </p>
          <div class="scf-offices">
            <div v-for="o in offices" :key="o.title" class="scf-office scf-reveal">
              <div class="scf-office-top" :class="o.tone === 'blue' ? 'g-blue' : 'g-green'">
                <span>{{ o.label }}</span>
                <h3>{{ o.title }}</h3>
              </div>
              <dl>
                <div><dt>Address</dt><dd>{{ o.address }}</dd></div>
                <div v-if="o.phone">
                  <dt>Phone</dt>
                  <dd><a :href="`tel:${o.phone_href || o.phone}`">{{ o.phone }}</a></dd>
                </div>
                <div v-if="o.email">
                  <dt>Email</dt>
                  <dd><a :href="`mailto:${o.email}`">{{ o.email }}</a></dd>
                </div>
                <div v-if="o.lead">
                  <dt>Branch lead</dt>
                  <dd><NuxtLink :to="`/staff/${o.lead.slug}`">{{ o.lead.name }}</NuxtLink></dd>
                </div>
                <div v-if="o.hours"><dt>Hours</dt><dd>{{ o.hours }}</dd></div>
              </dl>
              <a
                v-if="o.map_url"
                class="scf-link"
                :href="o.map_url"
                target="_blank"
                rel="noopener"
              >
                {{ o.map_text || "Get directions" }}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
          <p class="scf-note">
            Maps, the contact form and WhatsApp details are on our
            <NuxtLink to="/contact-us">contact {{ companyName }}</NuxtLink> page.
          </p>
        </div>
      </section>

      <!-- ================= STANDARDS ================= -->
      <section class="scf-section scf-values-sec" aria-labelledby="scf-val-h">
        <div class="scf-container">
          <span class="scf-eyebrow"><i></i>Trust and compliance</span>
          <h2 id="scf-val-h" class="scf-h2">Membership and <span>Business Standards</span></h2>
          <p class="scf-lead">
            Sunrise is a member of the Foreign Admission and Career Development Consultants
            Association of Bangladesh (FACDCAB), the national association of study abroad
            consultancies. These are the standards we hold ourselves to.
          </p>
          <div class="scf-values">
            <div v-for="s in standards" :key="s.title" class="scf-value scf-reveal">
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= MISSION + PLANS ================= -->
      <section class="scf-section" aria-labelledby="scf-mv-h">
        <div class="scf-container">
          <span class="scf-eyebrow"><i></i>Direction</span>
          <h2 id="scf-mv-h" class="scf-h2">Mission, Vision and <span>Plans Ahead</span></h2>
          <p class="scf-lead">
            In short, here is why we exist and where the company is going. The full statement and
            our values are on the
            <NuxtLink to="/mission-vision">Sunrise mission and vision</NuxtLink> page.
          </p>
          <div class="scf-mv">
            <blockquote class="scf-reveal"><b>Mission</b><p>{{ mission }}</p></blockquote>
            <blockquote class="scf-reveal"><b>Vision</b><p>{{ vision }}</p></blockquote>
          </div>
          <div class="scf-segs scf-segs-gap">
            <div v-for="pl in plans" :key="pl.title" class="scf-card scf-reveal">
              <span class="scf-ci" v-html="iconFor(pl.icon)"></span>
              <h3>{{ pl.title }}</h3>
              <p>{{ pl.text }}</p>
            </div>
          </div>
          <p class="scf-note">
            Community: Sunrise supports local educational initiatives and cultural exchange, and
            shares free study abroad guidance with students and parents on our
            <a href="https://www.youtube.com/@SunriseEducationConsultants" target="_blank" rel="noopener">YouTube channel</a>
            and
            <a href="https://www.facebook.com/SunriseEC" target="_blank" rel="noopener">Facebook page</a>.
          </p>
        </div>
      </section>

      <!-- ================= FAQ ================= -->
      <section class="scf-section scf-faq" aria-labelledby="scf-faq-h">
        <div class="scf-container">
          <div class="scf-center">
            <span class="scf-eyebrow"><i></i>FAQ</span>
            <h2 id="scf-faq-h" class="scf-h2">Company Profile: <span>Common Questions</span></h2>
          </div>
          <div class="scf-faq-list">
            <details v-for="(f, i) in faqs" :key="f.id" :open="i === 0">
              <summary>{{ f.q }}</summary>
              <div class="scf-faq-a" @click="onProseClick" v-html="f.a"></div>
            </details>
          </div>
        </div>
      </section>

      <!-- ================= CTA ================= -->
      <section class="scf-cta" aria-labelledby="scf-cta-h">
        <div class="scf-container">
          <h2 id="scf-cta-h">Work With {{ companyName }}</h2>
          <p>
            Students can start with a free profile assessment. Universities and partners can reach
            our management team at {{ EMAIL }}.
          </p>
          <div class="scf-cta-row" style="justify-content: center; margin: 0">
            <NuxtLink class="scf-btn scf-btn-primary" to="/apply-now"
              >Get Free Assessment <span aria-hidden="true">&rarr;</span></NuxtLink
            >
            <a class="scf-btn scf-btn-ghost" :href="`tel:${PHONE.href}`">Call 01911 878 274</a>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.scf a { color: inherit; }
.scf-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
.scf-section { padding: 80px 0; }
.scf-state { padding: 80px 24px; text-align: center; color: var(--sec-slate); }
.scf-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--sec-green-dk); border: 1px solid rgba(47,168,79,.28); background: rgba(47,168,79,.06); padding: 8px 16px; border-radius: 999px; margin-bottom: 18px; }
.scf-eyebrow i { width: 7px; height: 7px; border-radius: 50%; background: var(--sec-orange); }
.scf-h2 { font-size: clamp(26px,3.2vw,38px); line-height: 1.2; font-weight: 800; margin: 0 0 14px; letter-spacing: -.01em; }
.scf-h2 span { color: var(--sec-green); }
.scf-lead { font-size: 17px; line-height: 1.75; color: var(--sec-slate); margin: 0 0 36px; max-width: 780px; }
.scf-lead a { color: var(--sec-green-dk); font-weight: 700; }
.scf-center { text-align: center; }
.scf-center .scf-lead { margin-left: auto; margin-right: auto; }
.scf-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 15px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; font-family: inherit; border: 0; cursor: pointer; transition: transform .18s ease, box-shadow .18s ease, background .18s ease; }
.scf-btn-primary { background: var(--sec-green); color: #fff !important; box-shadow: 0 10px 24px rgba(47,168,79,.22); }
.scf-btn-primary:hover { background: var(--sec-green-dk); transform: translateY(-2px); box-shadow: 0 14px 28px rgba(47,168,79,.28); }
.scf-btn-ghost { border: 1.5px solid var(--sec-line); color: var(--sec-navy); background: #fff; }
.scf-btn-ghost:hover { border-color: var(--sec-green); color: var(--sec-green-dk); transform: translateY(-2px); }
.scf-reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
.scf-reveal.is-in { opacity: 1; transform: none; }

/* ---------- HERO ---------- */
.scf-hero { position: relative; overflow: hidden; background: linear-gradient(180deg,var(--sec-gold-bg) 0%,#fff 100%); padding: 40px 0 70px; }
.scf-hero-rays { position: absolute; right: -220px; top: -260px; width: 760px; height: 760px; border-radius: 50%; pointer-events: none; background: repeating-conic-gradient(rgba(245,166,35,.13) 0 6deg,transparent 6deg 18deg); animation: scf-rotate 60s linear infinite; }
.scf-crumb { position: relative; display: flex; gap: 8px; font-size: 13.5px; color: var(--sec-slate); margin-bottom: 34px; }
.scf-crumb a { text-decoration: none; font-weight: 600; }
.scf-crumb a:hover { color: var(--sec-green-dk); }
.scf-hero-grid { position: relative; display: grid; grid-template-columns: 1.2fr .95fr; gap: 48px; align-items: center; }
.scf-h1 { font-size: clamp(32px,4.6vw,54px); line-height: 1.1; font-weight: 800; margin: 0 0 18px; letter-spacing: -.02em; }
.scf-h1 span { display: block; color: var(--sec-green); }
.scf-hero p.scf-sub { font-size: 17.5px; line-height: 1.75; color: var(--sec-slate); margin: 0 0 28px; max-width: 640px; }
.scf-hero p.scf-sub a { color: var(--sec-navy); font-weight: 700; text-decoration-color: var(--sec-green); text-underline-offset: 3px; }
.scf-cta-row { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 26px; }
.scf-byline { display: flex; align-items: center; gap: 12px; font-size: 13.5px; color: var(--sec-slate); }
.scf-byline b { color: var(--sec-navy); }
.scf-av { position: relative; width: 42px; height: 42px; border-radius: 50%; background: var(--sec-green); color: #fff; display: grid; place-items: center; font-weight: 800; flex: none; overflow: hidden; }
.scf-av img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.scf-facts { background: #fff; border: 1px solid var(--sec-line); border-radius: 16px; padding: 26px; box-shadow: 0 18px 36px rgba(22,33,58,.08); position: relative; }
.scf-facts::before { content: ""; position: absolute; left: 0; top: 22px; bottom: 22px; width: 4px; border-radius: 0 4px 4px 0; background: var(--sec-green); }
.scf-facts h2 { font-size: 17px; margin: 0 0 14px; font-weight: 800; }
.scf-facts dl { margin: 0; display: grid; gap: 8px; }
.scf-facts dl div { display: grid; grid-template-columns: 130px 1fr; gap: 12px; padding: 10px 12px; border-radius: 10px; background: var(--sec-offwhite); font-size: 14px; }
.scf-facts dt { color: var(--sec-slate); font-weight: 600; }
.scf-facts dd { margin: 0; font-weight: 800; }
.scf-facts dd a { text-decoration: none; color: var(--sec-green-dk); }
.scf-stats { position: relative; display: grid; grid-template-columns: repeat(4,1fr); margin-top: 46px; border-top: 1px solid var(--sec-line); padding-top: 26px; }
.scf-stat { padding: 0 20px; border-left: 1px solid var(--sec-line); }
.scf-stat:first-child { border-left: 0; padding-left: 0; }
.scf-stat b { display: block; font-size: 34px; font-weight: 800; line-height: 1; }
.scf-stat b span { color: var(--sec-orange); }
.scf-stat small { font-size: 13px; color: var(--sec-slate); line-height: 1.4; display: block; margin-top: 4px; }

/* ---------- OVERVIEW ---------- */
.scf-overview { display: grid; grid-template-columns: 1.15fr .85fr; gap: 44px; align-items: start; }
.scf-prose p, .scf-intro :deep(p) { font-size: 16px; line-height: 1.85; color: #475467; margin: 0 0 16px; }
.scf-prose a, .scf-intro :deep(a) { color: var(--sec-green-dk); font-weight: 700; }
.scf-intro :deep(h2), .scf-intro :deep(h3) { margin: 24px 0 10px; font-size: 21px; font-weight: 800; color: var(--sec-navy); }
.scf-intro :deep(ul) { margin: 0 0 16px; padding-left: 22px; color: #475467; line-height: 1.8; }
.scf-side { display: grid; gap: 22px; }
.scf-fig { margin: 0; border-radius: 16px; overflow: hidden; background: var(--sec-gold-bg); box-shadow: 0 14px 30px rgba(22,33,58,.08); }
.scf-fig img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.scf-table-wrap { overflow-x: auto; border-radius: 14px; border: 1px solid var(--sec-line); background: #fff; box-shadow: 0 14px 30px rgba(22,33,58,.05); }
.scf-table { width: 100%; border-collapse: collapse; font-size: 14.5px; }
.scf-table th { background: var(--sec-navy); color: #fff; text-align: left; padding: 14px 18px; font-size: 12.5px; letter-spacing: .06em; text-transform: uppercase; }
.scf-table td { padding: 14px 18px; border-top: 1px solid var(--sec-line); vertical-align: top; line-height: 1.6; color: #475467; }
.scf-table td:first-child { font-weight: 800; color: var(--sec-navy); width: 34%; }
.scf-table tr:nth-child(even) td { background: var(--sec-offwhite); }
.scf-table a { color: var(--sec-green-dk); font-weight: 700; }
.scf-table-lead { min-width: 640px; }

/* ---------- BUSINESS LINES ---------- */
.scf-soft { background: var(--sec-offwhite); }
.scf-pillars { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
.scf-pillar { background: #fff; border: 1px solid var(--sec-line); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 14px 30px rgba(22,33,58,.06); transition: transform .3s, box-shadow .3s; }
.scf-pillar:hover { transform: translateY(-5px); box-shadow: 0 22px 44px rgba(22,33,58,.11); }
.scf-pillar-top { position: relative; overflow: hidden; padding: 26px 28px; color: #fff; }
.scf-pillar-top::after { content: ""; position: absolute; right: -70px; top: -70px; width: 220px; height: 220px; border-radius: 50%; background: repeating-conic-gradient(rgba(255,255,255,.12) 0 8deg,transparent 8deg 22deg); transition: transform .8s; }
.scf-pillar:hover .scf-pillar-top::after { transform: rotate(60deg); }
.g-blue { background: linear-gradient(135deg,#2D6CB4,#16213A); }
.g-green { background: linear-gradient(135deg,#2FA84F,#1E6E39); }
.scf-pillar-top span { position: relative; z-index: 1; font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; background: rgba(255,255,255,.18); padding: 5px 10px; border-radius: 999px; }
.scf-pillar-top h3 { position: relative; z-index: 1; margin: 14px 0 0; font-size: 23px; }
.scf-pillar-body { padding: 24px 28px; display: flex; flex-direction: column; flex: 1; }
.scf-pillar-body p { margin: 0 0 14px; font-size: 15px; line-height: 1.8; color: #475467; }
.scf-link { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 16px; border-radius: 10px; border: 1.5px solid var(--sec-line); font-weight: 800; font-size: 14px; text-decoration: none; transition: all .2s; }
.scf-link svg { width: 16px; height: 16px; flex: none; transition: transform .2s; }
.scf-link:hover { background: var(--sec-green); border-color: var(--sec-green); color: #fff; }
.scf-link:hover svg { transform: translateX(4px); }
.scf-svc { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 28px; }
.scf-svc a { display: flex; flex-direction: column; text-decoration: none; background: #fff; border: 1px solid var(--sec-line); border-radius: 14px; padding: 22px; transition: transform .3s, box-shadow .3s, border-color .3s; }
.scf-svc a:hover { transform: translateY(-4px); box-shadow: 0 18px 36px rgba(22,33,58,.09); border-color: rgba(47,168,79,.4); }
.scf-svc h3 { margin: 0 0 8px; font-size: 16.5px; }
.scf-svc p { margin: 0 0 12px; font-size: 14px; line-height: 1.7; color: #475467; }
.scf-svc span { margin-top: auto; font-size: 13.5px; font-weight: 800; color: var(--sec-green-dk); }

/* ---------- DESTINATIONS ---------- */
.scf-regions { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
.scf-region { background: #fff; border: 1px solid var(--sec-line); border-radius: 16px; padding: 24px; box-shadow: 0 14px 30px rgba(22,33,58,.05); }
.scf-region h3 { margin: 0 0 6px; font-size: 18px; }
.scf-region p { margin: 0 0 14px; font-size: 14px; line-height: 1.7; color: #475467; }
.scf-region ul { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
.scf-region li a { display: inline-block; font-size: 13.5px; font-weight: 700; text-decoration: none; padding: 7px 13px; border-radius: 999px; background: var(--sec-offwhite); border: 1px solid var(--sec-line); transition: all .2s; }
.scf-region li a:hover { background: var(--sec-green); border-color: var(--sec-green); color: #fff; }

/* ---------- CARDS (clients, plans) ---------- */
.scf-segs { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
.scf-segs-gap { margin-top: 28px; }
.scf-card { background: #fff; border: 1px solid var(--sec-line); border-radius: 16px; padding: 26px; display: flex; flex-direction: column; box-shadow: 0 14px 30px rgba(22,33,58,.05); transition: transform .3s, box-shadow .3s, border-color .3s; }
.scf-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(22,33,58,.1); border-color: rgba(47,168,79,.4); }
.scf-ci { width: 50px; height: 50px; border-radius: 14px; display: grid; place-items: center; background: rgba(47,168,79,.1); color: var(--sec-green-dk); margin-bottom: 16px; }
.scf-ci :deep(svg) { width: 24px; height: 24px; }
.scf-card h3 { margin: 0 0 10px; font-size: 19px; }
.scf-card p { margin: 0 0 12px; font-size: 14.5px; line-height: 1.75; color: #475467; }

/* ---------- OFFICES ---------- */
.scf-offices { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.scf-office { background: #fff; border: 1px solid var(--sec-line); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 14px 30px rgba(22,33,58,.06); }
.scf-office-top { padding: 22px 26px; color: #fff; position: relative; overflow: hidden; }
.scf-office-top span { font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; background: rgba(255,255,255,.18); padding: 5px 10px; border-radius: 999px; }
.scf-office-top h3 { margin: 12px 0 0; font-size: 21px; }
.scf-office dl { margin: 0; padding: 20px 26px 24px; display: grid; gap: 10px; }
.scf-office dl div { display: grid; grid-template-columns: 110px 1fr; gap: 12px; font-size: 14.5px; line-height: 1.6; }
.scf-office dt { color: var(--sec-slate); font-weight: 600; }
.scf-office dd { margin: 0; font-weight: 700; }
.scf-office dd a { color: var(--sec-green-dk); }
.scf-office .scf-link { margin: auto 26px 26px; }

/* ---------- STANDARDS ---------- */
.scf-values-sec { background: var(--sec-navy); color: #fff; position: relative; overflow: hidden; }
.scf-values-sec::before { content: ""; position: absolute; left: -200px; bottom: -300px; width: 640px; height: 640px; border-radius: 50%; background: radial-gradient(circle,rgba(47,168,79,.18),transparent 65%); }
.scf-values-sec .scf-lead { color: #AEB8CC; }
.scf-values-sec .scf-eyebrow { color: #9FE0B0; border-color: rgba(159,224,176,.3); background: rgba(47,168,79,.1); }
.scf-values { position: relative; display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; counter-reset: v; }
.scf-value { border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04); border-radius: 16px; padding: 24px; transition: background .3s, border-color .3s; }
.scf-value:hover { background: rgba(47,168,79,.1); border-color: rgba(47,168,79,.5); }
.scf-value::before { counter-increment: v; content: "0" counter(v); display: block; font-size: 30px; font-weight: 800; color: var(--sec-orange); margin-bottom: 8px; }
.scf-value h3 { margin: 0 0 8px; font-size: 17px; }
.scf-value p { margin: 0; font-size: 14.5px; line-height: 1.7; color: #C9D1E0; }

/* ---------- MISSION ---------- */
.scf-mv { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.scf-mv blockquote { margin: 0; background: #fff; border: 1px solid var(--sec-line); border-left: 4px solid var(--sec-green); border-radius: 14px; padding: 24px 26px; }
.scf-mv blockquote b { display: block; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: #B87400; margin-bottom: 8px; }
.scf-mv blockquote p { margin: 0; font-size: 16px; line-height: 1.8; color: var(--sec-navy); font-weight: 600; }
.scf-note { font-size: 13.5px; color: var(--sec-slate); line-height: 1.7; margin: 18px 0 0; }
.scf-note a { color: var(--sec-green-dk); font-weight: 700; }

/* ---------- FAQ ---------- */
.scf-faq { background: var(--sec-gold-bg); }
.scf-faq-list { max-width: 900px; margin: 0 auto; display: grid; gap: 12px; }
.scf-faq details { background: #fff; border: 1px solid var(--sec-line); border-radius: 14px; overflow: hidden; transition: box-shadow .3s; }
.scf-faq details[open] { box-shadow: 0 14px 30px rgba(22,33,58,.08); }
.scf-faq summary { list-style: none; cursor: pointer; padding: 20px 24px; font-weight: 800; font-size: 16px; display: flex; justify-content: space-between; gap: 16px; align-items: center; }
.scf-faq summary::-webkit-details-marker { display: none; }
.scf-faq summary::after { content: "+"; flex: none; width: 28px; height: 28px; border-radius: 50%; background: rgba(47,168,79,.1); color: var(--sec-green-dk); display: grid; place-items: center; font-size: 18px; transition: transform .3s; }
.scf-faq details[open] summary::after { transform: rotate(45deg); }
.scf-faq-a { padding: 0 24px 22px; font-size: 15px; line-height: 1.75; color: var(--sec-slate); }
.scf-faq-a :deep(p) { margin: 0 0 10px; }
.scf-faq-a :deep(p:last-child) { margin-bottom: 0; }
.scf-faq-a :deep(a) { color: var(--sec-green-dk); font-weight: 700; }

/* ---------- CTA ---------- */
.scf-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,var(--sec-green) 0%,#1E6E39 100%); padding: 70px 0; color: #fff; text-align: center; }
.scf-cta::before { content: ""; position: absolute; left: 50%; top: 50%; width: 900px; height: 900px; margin: -450px 0 0 -450px; border-radius: 50%; background: repeating-conic-gradient(rgba(255,255,255,.07) 0 6deg,transparent 6deg 18deg); animation: scf-rotate 80s linear infinite; }
.scf-cta * { position: relative; }
.scf-cta h2 { font-size: clamp(26px,3.4vw,40px); margin: 0 0 12px; font-weight: 800; }
.scf-cta p { margin: 0 auto 28px; max-width: 620px; font-size: 17px; color: #DDF2E2; line-height: 1.7; }
.scf-cta .scf-btn-primary { background: #fff; color: var(--sec-green-dk) !important; }
.scf-cta .scf-btn-ghost { background: transparent; color: #fff; border-color: rgba(255,255,255,.6); }

@keyframes scf-rotate { to { transform: rotate(360deg); } }

@media (max-width: 1100px) {
  .scf-values { grid-template-columns: repeat(2,1fr); }
  .scf-regions { grid-template-columns: repeat(2,1fr); }
  .scf-svc, .scf-segs { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 900px) {
  .scf-hero-grid, .scf-pillars, .scf-overview, .scf-offices, .scf-mv { grid-template-columns: 1fr; }
  .scf-stats { grid-template-columns: repeat(2,1fr); gap: 18px 0; }
  .scf-stat:nth-child(3) { border-left: 0; padding-left: 0; }
}
@media (max-width: 640px) {
  .scf-section { padding: 56px 0; }
  .scf-container { padding: 0 16px; }
  .scf-hero { padding: 28px 0 50px; }
  .scf-values, .scf-regions, .scf-svc, .scf-segs { grid-template-columns: 1fr; }
  .scf-cta-row .scf-btn { flex: 1; justify-content: center; }
  .scf-facts dl div { grid-template-columns: 1fr; gap: 2px; }
  .scf-pillar-body, .scf-pillar-top { padding-left: 22px; padding-right: 22px; }
  .scf-office dl div { grid-template-columns: 1fr; gap: 0; }
  .scf-table td:first-child { width: auto; }
  .scf-table td, .scf-table th { padding: 12px 14px; }
}
@media (max-width: 420px) {
  .scf-cta-row { flex-direction: column; }
  .scf-cta-row .scf-btn { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .scf * { animation: none !important; transition: none !important; }
  .scf-reveal { opacity: 1; transform: none; }
}
</style>