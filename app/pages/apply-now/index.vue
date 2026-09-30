<template>
  <div class="sap">
    <!-- ================= SECTION 1: HERO ================= -->
    <section class="sap-hero" aria-labelledby="sap-h1">
      <div class="sap-hero-rays" aria-hidden="true"></div>
      <div class="sap-container">
        <nav class="sap-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Free Assessment</span>
        </nav>
        <span class="sap-eyebrow"><i></i>Free for every student</span>
        <h1 class="sap-h1" id="sap-h1">
          Free Study Abroad Assessment <span>for Bangladeshi Students</span>
        </h1>
        <p class="sap-sub">
          Tell us about your results, budget and plans. A
          <NuxtLink to="/about-us">Sunrise Education Consultants</NuxtLink>
          counsellor will review your profile and give you an honest shortlist
          of countries, universities and scholarships that fit you.
        </p>
        <ul class="sap-pills">
          <li>Country and university match</li>
          <li>Scholarship eligibility</li>
          <li>Visa chance check</li>
        </ul>
      </div>
    </section>

    <!-- ================= SECTION 2: FORM + SIDEBAR ================= -->
    <section class="sap-section" id="apply-form" aria-labelledby="sap-form-h">
      <div class="sap-container sap-layout">
        <!-- FORM / SUCCESS -->
        <div>
          <div
            v-if="status === 'success'"
            class="sap-panel sap-done"
            role="status"
            aria-live="polite"
          >
            <span class="sap-done-ico" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.6"
              >
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <h2 class="sap-h2">
              Thank you, <span>{{ firstName }}</span>
            </h2>
            <p class="sap-lead">
              We received your details. A Sunrise counsellor will contact you on
              <b>{{ form.phone }}</b> by {{ form.contactVia.toLowerCase() }}.
              Keep your latest result sheet and English score (if you have one)
              nearby.
            </p>
            <div class="sap-cta-row">
              <NuxtLink class="sap-btn sap-btn-primary" to="/scholarships"
                >Browse Scholarships
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <NuxtLink class="sap-btn sap-btn-ghost" to="/resources"
                >Try Free Tools</NuxtLink
              >
              <button
                class="sap-btn sap-btn-ghost"
                type="button"
                @click="resetForm"
              >
                Send another
              </button>
            </div>
          </div>

          <form
            v-else
            class="sap-panel"
            novalidate
            aria-labelledby="sap-form-h"
            @submit.prevent="submit"
          >
            <span class="sap-eyebrow"><i></i>Takes a few minutes</span>
            <h2 class="sap-h2" id="sap-form-h">
              Book Your Free <span>Profile Assessment</span>
            </h2>
            <p class="sap-lead">
              Fields marked <b class="sap-req">*</b> are required. Everything
              else helps your counsellor prepare a better shortlist.
            </p>

            <!-- About you -->
            <fieldset class="sap-group">
              <legend>About you</legend>
              <div class="sap-row2">
                <div class="sap-field">
                  <label for="f-fullName"
                    >Full name <b class="sap-req">*</b></label
                  >
                  <input
                    id="f-fullName"
                    v-model.trim="form.fullName"
                    type="text"
                    autocomplete="name"
                    :aria-invalid="!!errors.fullName"
                    :aria-describedby="
                      errors.fullName ? 'e-fullName' : undefined
                    "
                    placeholder="As on your passport"
                  />
                  <small
                    v-if="errors.fullName"
                    id="e-fullName"
                    class="sap-err"
                    role="alert"
                    >{{ errors.fullName }}</small
                  >
                </div>
                <div class="sap-field">
                  <label for="f-phone"
                    >Mobile number <b class="sap-req">*</b></label
                  >
                  <input
                    id="f-phone"
                    v-model.trim="form.phone"
                    type="tel"
                    inputmode="tel"
                    autocomplete="tel"
                    :aria-invalid="!!errors.phone"
                    :aria-describedby="errors.phone ? 'e-phone' : undefined"
                    placeholder="01XXXXXXXXX"
                  />
                  <small
                    v-if="errors.phone"
                    id="e-phone"
                    class="sap-err"
                    role="alert"
                    >{{ errors.phone }}</small
                  >
                </div>
              </div>
              <div class="sap-field">
                <label for="f-email"
                  >Email <span class="sap-opt">(optional)</span></label
                >
                <input
                  id="f-email"
                  v-model.trim="form.email"
                  type="email"
                  autocomplete="email"
                  :aria-invalid="!!errors.email"
                  :aria-describedby="errors.email ? 'e-email' : undefined"
                  placeholder="you@example.com"
                />
                <small
                  v-if="errors.email"
                  id="e-email"
                  class="sap-err"
                  role="alert"
                  >{{ errors.email }}</small
                >
              </div>
            </fieldset>

            <!-- Your profile -->
            <fieldset class="sap-group">
              <legend>Your profile</legend>
              <div class="sap-row2">
                <div class="sap-field">
                  <label for="f-level"
                    >Where are you now? <b class="sap-req">*</b></label
                  >
                  <select
                    id="f-level"
                    v-model="form.level"
                    :aria-invalid="!!errors.level"
                    :aria-describedby="errors.level ? 'e-level' : undefined"
                  >
                    <option value="" disabled>Select your level</option>
                    <option v-for="o in levels" :key="o" :value="o">
                      {{ o }}
                    </option>
                  </select>
                  <small
                    v-if="errors.level"
                    id="e-level"
                    class="sap-err"
                    role="alert"
                    >{{ errors.level }}</small
                  >
                </div>
                <div class="sap-field">
                  <label for="f-result"
                    >Latest result
                    <span class="sap-opt">(optional)</span></label
                  >
                  <input
                    id="f-result"
                    v-model.trim="form.result"
                    type="text"
                    placeholder="e.g. HSC GPA 4.50 or CGPA 3.20"
                  />
                </div>
              </div>
              <div class="sap-field">
                <label for="f-english">English test</label>
                <select id="f-english" v-model="form.english">
                  <option value="" disabled>Select one</option>
                  <option v-for="o in englishOptions" :key="o" :value="o">
                    {{ o }}
                  </option>
                </select>
                <small
                  >No score yet? That is fine. Some universities accept an MOI
                  certificate, and your counsellor will tell you which.</small
                >
              </div>
            </fieldset>

            <!-- Study plan -->
            <fieldset class="sap-group">
              <legend>Your study plan</legend>
              <div class="sap-field" :class="{ 'has-err': errors.countries }">
                <span class="sap-label" id="l-countries"
                  >Countries you are considering <b class="sap-req">*</b></span
                >
                <div
                  class="sap-chips"
                  role="group"
                  aria-labelledby="l-countries"
                  :aria-describedby="
                    errors.countries ? 'e-countries' : undefined
                  "
                >
                  <label v-for="c in countries" :key="c" class="sap-chip">
                    <input
                      v-model="form.countries"
                      type="checkbox"
                      :value="c"
                    /><span>{{ c }}</span>
                  </label>
                </div>
                <small
                  v-if="errors.countries"
                  id="e-countries"
                  class="sap-err"
                  role="alert"
                  >{{ errors.countries }}</small
                >
              </div>
              <div class="sap-row2">
                <div class="sap-field">
                  <label for="f-intake">Preferred intake</label>
                  <select id="f-intake" v-model="form.intake">
                    <option value="" disabled>Select intake</option>
                    <option v-for="o in intakes" :key="o" :value="o">
                      {{ o }}
                    </option>
                  </select>
                </div>
                <div class="sap-field">
                  <label for="f-budget"
                    >First-year budget (tuition + living)</label
                  >
                  <select id="f-budget" v-model="form.budget">
                    <option value="" disabled>Select budget</option>
                    <option v-for="o in budgets" :key="o" :value="o">
                      {{ o }}
                    </option>
                  </select>
                </div>
              </div>
            </fieldset>

            <!-- Contact preference -->
            <fieldset class="sap-group">
              <legend>How should we reach you?</legend>
              <div class="sap-row2">
                <div class="sap-field">
                  <span class="sap-label" id="l-via">Contact by</span>
                  <div
                    class="sap-chips"
                    role="radiogroup"
                    aria-labelledby="l-via"
                  >
                    <label v-for="o in contactVia" :key="o" class="sap-chip">
                      <input
                        v-model="form.contactVia"
                        type="radio"
                        name="contactVia"
                        :value="o"
                      /><span>{{ o }}</span>
                    </label>
                  </div>
                </div>
                <div class="sap-field">
                  <span class="sap-label" id="l-office"
                    >Meeting preference</span
                  >
                  <div
                    class="sap-chips"
                    role="radiogroup"
                    aria-labelledby="l-office"
                  >
                    <label v-for="o in offices" :key="o" class="sap-chip">
                      <input
                        v-model="form.office"
                        type="radio"
                        name="office"
                        :value="o"
                      /><span>{{ o }}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="sap-field">
                <label for="f-message"
                  >Anything else we should know?
                  <span class="sap-opt">(optional)</span></label
                >
                <textarea
                  id="f-message"
                  v-model.trim="form.message"
                  rows="4"
                  maxlength="1000"
                  placeholder="Study gap, previous visa refusal, subject you want to study, scholarship you have in mind..."
                ></textarea>
              </div>
            </fieldset>

            <!-- honeypot: real people never see or fill this -->
            <div class="sap-hp" aria-hidden="true">
              <label for="f-website">Website</label>
              <input
                id="f-website"
                v-model="form.website"
                type="text"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <div
              class="sap-field sap-consent"
              :class="{ 'has-err': errors.consent }"
            >
              <label class="sap-check">
                <input
                  id="f-consent"
                  v-model="form.consent"
                  type="checkbox"
                  :aria-invalid="!!errors.consent"
                  :aria-describedby="errors.consent ? 'e-consent' : undefined"
                />
                <span
                  >I agree that Sunrise Education Consultants may contact me
                  about my assessment, as described in the
                  <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>.
                  <b class="sap-req">*</b></span
                >
              </label>
              <small
                v-if="errors.consent"
                id="e-consent"
                class="sap-err"
                role="alert"
                >{{ errors.consent }}</small
              >
            </div>

            <div v-if="status === 'error'" class="sap-alert" role="alert">
              <b>We could not send your form.</b> Please check your connection
              and try again, or send the same details on
              <a :href="waLink" target="_blank" rel="noopener">WhatsApp</a> or
              call <a href="tel:+8801911878274">+88 01911 878 274</a>.
            </div>

            <div class="sap-submit">
              <button
                class="sap-btn sap-btn-primary"
                type="submit"
                :disabled="status === 'sending'"
              >
                <span v-if="status === 'sending'">Sending...</span>
                <span v-else
                  >Get My Free Assessment
                  <span aria-hidden="true">&rarr;</span></span
                >
              </button>
              <a
                class="sap-btn sap-btn-ghost"
                :href="waLink"
                target="_blank"
                rel="noopener"
                >Send on WhatsApp instead</a
              >
            </div>
            <p class="sap-fine">
              The assessment is free. We cannot guarantee admission, a
              scholarship or a visa, but we will tell you honestly what is
              realistic for your profile.
            </p>
          </form>
        </div>

        <!-- SIDEBAR -->
        <aside
          class="sap-aside"
          aria-label="What happens next and contact details"
        >
          <div class="sap-card">
            <h2>What happens next</h2>
            <ol class="sap-steps">
              <li>
                <i aria-hidden="true">1</i>
                <div>
                  <b>You send the form</b
                  ><span
                    >Basic details about your results, budget and plans.</span
                  >
                </div>
              </li>
              <li>
                <i aria-hidden="true">2</i>
                <div>
                  <b>We review your profile</b
                  ><span
                    >A counsellor checks your results, English score, budget and
                    study plan.</span
                  >
                </div>
              </li>
              <li>
                <i aria-hidden="true">3</i>
                <div>
                  <b>You get your shortlist</b
                  ><span
                    >Countries, universities and scholarships that fit, with a
                    clear next step.</span
                  >
                </div>
              </li>
            </ol>
          </div>

          <div class="sap-card">
            <h2>Prefer to talk now?</h2>
            <ul class="sap-contact">
              <li>
                <a href="tel:+8801911878274"
                  ><span
                    ><svg viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.23Z"
                      /></svg></span
                  >+88 01911 878 274</a
                >
              </li>
              <li>
                <a
                  href="https://wa.me/8801811156665"
                  target="_blank"
                  rel="noopener"
                  ><span
                    ><svg viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a17 17 0 0 1-1.7-.6 13.4 13.4 0 0 1-5.1-4.5 5.8 5.8 0 0 1-1.2-3.1 3.3 3.3 0 0 1 1-2.5 1.1 1.1 0 0 1 .8-.4h.6c.2 0 .4 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.5.7-.4.4c-.1.2-.3.3-.1.6a9 9 0 0 0 1.6 2 7.9 7.9 0 0 0 2.4 1.4c.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2.2 1c.3.2.5.2.6.4 0 .1 0 .7-.2 1.4Z"
                      /></svg></span
                  >WhatsApp chat</a
                >
              </li>
              <li>
                <a href="mailto:info@sunrise-bd.net"
                  ><span
                    ><svg viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
                      /></svg></span
                  >info@sunrise-bd.net</a
                >
              </li>
            </ul>
            <div class="sap-office">
              <b>Banani, Dhaka (Head Office)</b>
              <p>House 61 (1st Floor), Block F, Road 08, Banani, Dhaka-1213</p>
            </div>
            <div class="sap-office">
              <b>Sylhet Branch</b>
              <p>Ananda Tower (3rd Floor), Jail Road, Sylhet-3100</p>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- ================= SECTION 3: FAQ ================= -->
    <section class="sap-section sap-faq" aria-labelledby="sap-faq-h">
      <div class="sap-container">
        <div class="sap-center">
          <span class="sap-eyebrow"><i></i>FAQ</span>
          <h2 class="sap-h2" id="sap-faq-h">
            Free Assessment: <span>Common Questions</span>
          </h2>
        </div>
        <div class="sap-faq-list">
          <details v-for="(f, i) in faqs" :key="f.q" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <p>{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Free Assessment page (/apply-now): validated lead form, posts to /api/assessment (see server/api/assessment.post.ts).
 * Layout already provides <main id="main">, so this page root is a <div>.
 */
const route = useRoute();

/* ---------- options ---------- */
const levels = [
  "Studying in HSC / A-Level",
  "HSC / A-Level completed (bachelor's)",
  "Diploma completed",
  "Bachelor's completed (master's)",
  "Master's completed (PhD)",
  "Other",
];
const englishOptions = [
  "IELTS / PTE / TOEFL / Duolingo score ready",
  "Have an MOI certificate",
  "Test booked or planning to take one",
  "Not sure yet",
];
const countries = [
  "Italy",
  "Malta",
  "Hungary",
  "Finland",
  "Cyprus",
  "Norway",
  "Greece",
  "Malaysia",
  "China",
  "Turkey",
  "Canada",
  "USA",
  "UK",
  "Australia",
  "New Zealand",
  "Not sure",
];
const budgets = [
  "Under BDT 10 lakh",
  "BDT 10 to 20 lakh",
  "BDT 20 to 35 lakh",
  "Above BDT 35 lakh",
  "Not sure yet",
];
const contactVia = ["Phone call", "WhatsApp"];
const offices = ["Banani, Dhaka", "Sylhet", "Online"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const intakes = (() => {
  const now = new Date();
  const out: string[] = [];
  for (let y = now.getFullYear(); y <= now.getFullYear() + 2; y++) {
    for (const m of [0, 8])
      if (new Date(y, m, 1) > now) out.push(`${MONTHS[m]} ${y}`);
  }
  return [...out.slice(0, 5), "Not decided yet"];
})();

/* ---------- FAQ (also feeds the FAQPage schema, so text always matches) ---------- */
const faqs = [
  {
    q: "Is the free assessment really free?",
    a: "Yes. The first profile and scholarship eligibility assessment at Sunrise is free, in Banani, Dhaka, in Sylhet or online. If you later want full application support, ask your counsellor to explain any service charge before you start.",
  },
  {
    q: "What do I need to fill in the form?",
    a: "Only basic details: your name, mobile number, current study level and the countries you are considering. Your latest result, English test status and budget help your counsellor give a more accurate shortlist, but you can leave them blank if you are unsure.",
  },
  {
    q: "Do I need IELTS before I book an assessment?",
    a: "No. Many students book before taking any English test. Your counsellor will explain which countries and universities accept an MOI certificate and which need an IELTS, PTE, TOEFL or Duolingo score.",
  },
  {
    q: "Can Sunrise guarantee admission, a scholarship or a visa?",
    a: "No. Universities, scholarship committees and embassies make their own decisions. Sunrise improves your chances by matching you with realistic options, strengthening your documents and preparing you for interviews.",
  },
  {
    q: "Can I meet a counsellor in person?",
    a: "Yes. You can meet us at our head office in Banani, Dhaka, at our Sylhet branch, or talk online. Choose your preference in the form.",
  },
  {
    q: "How is my information used?",
    a: "Sunrise uses the details you send to prepare your assessment and to contact you about it. Read our Privacy Policy for full details.",
  },
];

/* ---------- SEO ---------- */
const canonical = "https://sunrise-bd.net/apply-now";
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://sunrise-bd.net/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Free Assessment",
          item: canonical,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#page`,
      url: canonical,
      name: "Free Study Abroad Assessment for Bangladeshi Students",
      inLanguage: "en",
      publisher: {
        "@type": "EducationalOrganization",
        "@id": "https://sunrise-bd.net/#organization",
        name: "Sunrise Education Consultants",
        url: "https://sunrise-bd.net/",
      },
    },
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Free study abroad profile assessment",
      serviceType: "Study abroad consultancy",
      description:
        "A free profile review covering country and university match, scholarship eligibility and a visa chance check for Bangladeshi students.",
      provider: { "@id": "https://sunrise-bd.net/#organization" },
      areaServed: { "@type": "Country", name: "Bangladesh" },
      offers: { "@type": "Offer", price: "0", priceCurrency: "BDT" },
      url: canonical,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

useSeoMeta({
  title: "Free Study Abroad Assessment for Bangladeshi Students | Sunrise",
  description:
    "Book a free profile assessment: country and university match, scholarship eligibility and visa chance check from Sunrise counsellors in Dhaka and Sylhet.",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: "Free Study Abroad Assessment for Bangladeshi Students",
  ogDescription:
    "Tell us your results, budget and plans. A Sunrise counsellor gives you an honest shortlist of countries, universities and scholarships.",
  ogUrl: canonical,
  ogSiteName: "Sunrise Education Consultants",
  twitterCard: "summary_large_image",
});
useHead({
  link: [{ rel: "canonical", href: canonical }],
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(schema) }],
});

/* ---------- form state ---------- */
const blank = () => ({
  fullName: "",
  phone: "",
  email: "",
  level: "",
  result: "",
  english: "",
  countries: [] as string[],
  intake: "",
  budget: "",
  contactVia: "Phone call",
  office: "Banani, Dhaka",
  message: "",
  consent: false,
  website: "",
});
const form = reactive(blank());
const errors = reactive<Record<string, string>>({});
const status = ref<"idle" | "sending" | "success" | "error">("idle");

const firstName = computed(() => form.fullName.split(" ")[0] || "there");

/* pre-select a country when linked as /apply-now?country=Italy */
onMounted(() => {
  const q = String(route.query.country || "").toLowerCase();
  const match = countries.find((c) => c.toLowerCase() === q);
  if (match && !form.countries.includes(match)) form.countries.push(match);
});

const cleanPhone = () => form.phone.replace(/[\s-]/g, "");

/* WhatsApp fallback carries the same details */
const waLink = computed(() => {
  const lines = [
    "Hello Sunrise, I would like a free assessment.",
    form.fullName && `Name: ${form.fullName}`,
    form.phone && `Phone: ${form.phone}`,
    form.level && `Level: ${form.level}`,
    form.result && `Result: ${form.result}`,
    form.english && `English: ${form.english}`,
    form.countries.length && `Countries: ${form.countries.join(", ")}`,
    form.intake && `Intake: ${form.intake}`,
    form.budget && `Budget: ${form.budget}`,
  ].filter(Boolean);
  return `https://wa.me/8801811156665?text=${encodeURIComponent(lines.join("\n"))}`;
});

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (form.fullName.length < 2)
    errors.fullName = "Please enter your full name.";
  if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(cleanPhone()))
    errors.phone = "Enter a valid Bangladeshi mobile number, e.g. 01911878274.";
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address or leave it blank.";
  if (!form.level) errors.level = "Please select your current level.";
  if (!form.countries.length)
    errors.countries = 'Choose at least one country, or "Not sure".';
  if (!form.consent)
    errors.consent = "Please tick this box so we can contact you.";
  const first = Object.keys(errors)[0];
  if (first) {
    nextTick(() => {
      const id = first === "countries" ? "l-countries" : `f-${first}`;
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      (target as HTMLElement | null)?.focus?.({ preventScroll: true });
    });
  }
  return !first;
}

async function submit() {
  if (status.value === "sending") return;
  if (!validate()) return;
  if (form.website) {
    status.value = "success";
    return;
  } // honeypot filled: pretend success, send nothing
  status.value = "sending";
  try {
    await $fetch("/api/assessment", {
      method: "POST",
      body: { ...form, phone: cleanPhone(), page: route.fullPath },
    });
    status.value = "success";
    nextTick(() =>
      document
        .getElementById("apply-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  } catch {
    status.value = "error";
  }
}

function resetForm() {
  Object.assign(form, blank());
  Object.keys(errors).forEach((k) => delete errors[k]);
  status.value = "idle";
}
</script>
