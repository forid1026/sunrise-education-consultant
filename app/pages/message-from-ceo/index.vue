<template>
  <main class="sce">
    <div ref="root" class="svp mc" :class="{ 'mc-js': js }">
      <!-- ================= HERO ================= -->
      <section class="svp-hero" aria-labelledby="mc-h1">
        <div class="svp-hero-rays" aria-hidden="true"></div>
        <div class="svp-container">
          <nav class="svp-crumb" aria-label="Breadcrumb">
            <NuxtLink to="/">Home</NuxtLink><span>/</span
            ><NuxtLink to="/about-us">About Us</NuxtLink><span>/</span
            ><span aria-current="page">Message from the CEO</span>
          </nav>

          <div class="mc-hero-grid">
            <div>
              <span class="svp-eyebrow"><i></i>Message from the CEO</span>
              <h1 id="mc-h1" class="svp-h1">
                A Message From Our CEO, <span>{{ name }}</span>
              </h1>
              <p class="svp-sub mc-sub">
                {{ name }} founded
                <NuxtLink to="/">{{ brand }}</NuxtLink> in Dhaka in 2014 and has
                spent more than 12 years guiding Bangladeshi students to
                universities abroad. In this message he explains why Sunrise
                exists, what he expects from his team, and the advice he gives
                every student who wants to study abroad.
              </p>

              <div class="mc-actions">
                <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now">
                  Get Free Assessment <span aria-hidden="true">&rarr;</span>
                </NuxtLink>
                <a class="svp-btn svp-btn-ghost" href="#mc-adv-h"
                  >Read His Advice</a
                >
              </div>

              <div class="mc-stats">
                <div v-for="s in stats" :key="s.label" class="mc-stat">
                  <b
                    >{{ s.value }}<span v-if="s.plus">+</span></b
                  >
                  <small>{{ s.label }}</small>
                </div>
              </div>
            </div>

            <aside class="mc-portrait" :aria-label="`About ${name}`">
              <figure class="mc-ph">
                <span class="mc-ini" aria-hidden="true">{{ initials(name) }}</span>
                <img
                  v-if="photo && !broken.hero"
                  :src="photo"
                  :alt="photoAlt"
                  width="800"
                  height="1000"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  @error="broken.hero = true"
                />
                <figcaption>
                  <b>{{ name }}</b>
                  <small>{{ designation }}, {{ brand }}</small>
                </figcaption>
              </figure>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>{{ designation }}</dd>
                </div>
                <div>
                  <dt>Since</dt>
                  <dd>2014, Dhaka</dd>
                </div>
                <div>
                  <dt>Expertise</dt>
                  <dd>Admissions, scholarships, student visas</dd>
                </div>
                <div v-if="PROFILE_PATH">
                  <dt>Profile</dt>
                  <dd><NuxtLink :to="PROFILE_PATH">View full profile</NuxtLink></dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <!-- ================= LETTER (API) ================= -->
      <section class="svp-section" aria-labelledby="mc-msg-h">
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Personal message</span>
          <h2 id="mc-msg-h" class="svp-h2">
            Welcome to <span>Sunrise Education Consultants</span>
          </h2>
          <p class="svp-lead">
            A personal note from our founder to every student, parent and
            professional who is thinking about a future abroad.
          </p>

          <p v-if="pending" class="svp-lead">Loading message…</p>

          <div v-else-if="error" class="mc-state">
            <p>Could not load the message right now.</p>
            <button
              type="button"
              class="svp-btn svp-btn-primary"
              @click="refresh()"
            >
              Try again
            </button>
          </div>

          <p v-else-if="!hasContent" class="svp-lead">
            The message from our CEO will be published here soon.
          </p>

          <div v-else class="mc-letter-grid">
            <aside class="mc-side">
              <div class="mc-side-card">
                <span class="mc-side-av" aria-hidden="true"
                  >{{ initials(name) }}
                  <img
                    v-if="photo && !broken.side"
                    :src="photo"
                    alt=""
                    loading="lazy"
                    @error="broken.side = true"
                /></span>
                <b>{{ name }}</b>
                <small>{{ designation }}, {{ brand }}</small>
                <blockquote>{{ pullQuote }}</blockquote>
                <ul>
                  <li v-for="f in sideFacts" :key="f.label">
                    <strong>{{ f.value }}</strong
                    ><span>{{ f.label }}</span>
                  </li>
                </ul>
              </div>
            </aside>

            <article class="mc-body">
              <div v-if="ceo.message" class="mc-prose" v-html="ceo.message"></div>

              <div class="mc-sign">
                <span class="mc-sign-av" aria-hidden="true"
                  >{{ initials(name) }}
                  <img
                    v-if="photo && !broken.sign"
                    :src="photo"
                    alt=""
                    loading="lazy"
                    @error="broken.sign = true"
                /></span>
                <div>
                  <i>Warm regards,</i>
                  <b>{{ name }}</b>
                  <small>{{ designation }}, {{ brand }}</small>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ================= WHY I STARTED ================= -->
      <section class="svp-section svp-services" aria-labelledby="mc-why-h">
        <div class="svp-container mc-split">
          <div class="mc-story">
            <span class="svp-eyebrow"><i></i>Why Sunrise</span>
            <h2 id="mc-why-h" class="svp-h2">
              Why I Started <span>Sunrise in 2014</span>
            </h2>
            <p v-for="(p, i) in story" :key="i">{{ p }}</p>
          </div>

          <div class="mc-gal">
            <figure
              v-for="(g, i) in gallery"
              :key="g.key"
              class="mc-fig"
              :class="[g.tone, { wide: i === 0 }]"
            >
              <img
                v-if="!broken[g.key]"
                :src="g.src"
                :alt="g.alt"
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                @error="broken[g.key] = true"
              />
              <figcaption>
                <b>{{ g.title }}</b>
                <small>{{ g.sub }}</small>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- ================= ADVICE ================= -->
      <section class="svp-section" aria-labelledby="mc-adv-h">
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Study abroad guidance</span>
          <h2 id="mc-adv-h" class="svp-h2">
            My Advice for Students <span>Planning to Study Abroad</span>
          </h2>
          <p class="svp-lead">
            These are the eight points I share with every student and parent who
            comes to Sunrise. Follow them and you will avoid the most common, and
            most expensive, mistakes Bangladeshi students make.
          </p>

          <div class="mc-advice">
            <article v-for="t in advice" :key="t.title" class="mc-tip mc-reveal">
              <h3>{{ t.title }}</h3>
              <p>
                {{ t.text
                }}<NuxtLink v-if="t.link" :to="t.link.to">{{
                  t.link.label
                }}</NuxtLink
                >{{ t.after }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- ================= EXPERIENCE ================= -->
      <section class="svp-section svp-services" aria-labelledby="mc-exp-h">
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Experience</span>
          <h2 id="mc-exp-h" class="svp-h2">
            Experience in <span>International Education</span>
          </h2>
          <p class="svp-lead">
            {{ name }} has worked in international education for more than 12
            years. He reviews the study abroad guides on this website and
            explains the process to students and parents on the
            <a :href="YOUTUBE_URL" target="_blank" rel="noopener"
              >Sunrise YouTube channel</a
            >.
          </p>

          <div class="mc-exp">
            <div v-for="c in experience" :key="c.title" class="mc-card mc-reveal">
              <span class="mc-ci">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-for="d in c.paths" :key="d" :d="d" />
                </svg>
              </span>
              <h3>{{ c.title }}</h3>
              <p>{{ c.text }}</p>
              <NuxtLink class="mc-link" :to="c.to"
                >{{ c.link }} <span aria-hidden="true">&rarr;</span></NuxtLink
              >
            </div>
          </div>

          <div
            v-if="destinations.length"
            class="mc-chips"
            aria-label="Destinations Sunrise advises on"
          >
            <NuxtLink
              v-for="d in destinations"
              :key="d.slug"
              :to="`/study-abroad/${d.slug}`"
              >{{ d.name }}</NuxtLink
            >
          </div>
        </div>
      </section>

      <!-- ================= AWARDS (shows only when awards[] has items) ================= -->
      <section
        v-if="awards.length"
        class="svp-section"
        aria-labelledby="mc-aw-h"
      >
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Recognition</span>
          <h2 id="mc-aw-h" class="svp-h2">
            Awards and <span>Recognition</span>
          </h2>
          <p class="svp-lead">
            Recognition received by {{ name }} for his work in international
            education and for guiding Bangladeshi students abroad.
          </p>
          <div class="mc-awards">
            <article
              v-for="(a, i) in awards"
              :key="a.name"
              class="mc-award mc-reveal"
            >
              <figure class="mc-fig mc-award-fig" :class="a.tone || 'g3'">
                <img
                  v-if="a.image && !broken[`aw${i}`]"
                  :src="a.image"
                  :alt="a.alt || `${name} receiving ${a.name}`"
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  @error="broken[`aw${i}`] = true"
                />
              </figure>
              <div class="mc-award-body">
                <span class="mc-award-year">{{ a.year }}</span>
                <h3>{{ a.name }}</h3>
                <p class="mc-award-by">{{ a.by }}</p>
                <p>{{ a.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ================= COMMITMENT ================= -->
      <section class="svp-section mc-dark" aria-labelledby="mc-com-h">
        <div class="svp-container mc-dark-in">
          <span class="svp-eyebrow"><i></i>My commitment</span>
          <h2 id="mc-com-h" class="svp-h2">
            My Commitment to <span>Students and Parents</span>
          </h2>
          <p class="svp-lead">
            As CEO, I hold every Sunrise counsellor to these promises. If you ever
            feel we have not kept them, write to me directly at
            <a :href="`mailto:${CEO_EMAIL}`">{{ CEO_EMAIL }}</a
            >.
          </p>
          <ul class="mc-promise">
            <li v-for="p in promises" :key="p.b">
              <b>{{ p.b }}</b> {{ p.t }}
            </li>
          </ul>
        </div>
      </section>

      <!-- ================= FAQ ================= -->
      <section
        v-if="faqs.length"
        class="svp-section mc-faq"
        aria-labelledby="mc-faq-h"
      >
        <div class="svp-container">
          <div class="mc-center">
            <span class="svp-eyebrow"><i></i>FAQ</span>
            <h2 id="mc-faq-h" class="svp-h2">
              About Our CEO: <span>Common Questions</span>
            </h2>
          </div>
          <div class="mc-faq-list">
            <details v-for="(f, i) in faqs" :key="f.q" :open="i === 0">
              <summary>{{ f.q }}</summary>
              <div class="mc-faq-a" v-html="f.a"></div>
            </details>
          </div>
          <p class="mc-note">
            Learn more about the company on our
            <NuxtLink to="/about-us">About {{ brand }}</NuxtLink> page, or read
            our <NuxtLink to="/mission-vision">mission and vision</NuxtLink>.
          </p>
        </div>
      </section>

      <!-- ================= CTA ================= -->
      <section class="svp-cta" aria-labelledby="mc-cta-h">
        <div class="svp-container">
          <h2 id="mc-cta-h">Start Your Study Abroad Journey With Sunrise</h2>
          <p>
            Book a free assessment. Our counsellors will review your profile and
            build an honest plan, the way {{ name }} has asked every Sunrise
            counsellor to work since 2014.
          </p>
          <div class="svp-cta-row" style="justify-content: center; margin: 0">
            <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
              >Get Free Assessment
              <span aria-hidden="true">&rarr;</span></NuxtLink
            >
            <a class="svp-btn svp-btn-ghost" href="tel:+8801911878274"
              >Call 01911 878 274</a
            >
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
const config = useRuntimeConfig();
const siteUrl =
  (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";
const brand = "Sunrise Education Consultants";
const pageUrl = siteUrl + "message-from-ceo";

/* ---------- Constants (edit here) ---------- */
const FALLBACK_NAME = "Anisuzzaman Kiron";
const FALLBACK_ROLE = "Founder & CEO";
const CEO_EMAIL = "ceo@sunrise-bd.net";
const YOUTUBE_URL = "https://www.youtube.com/@SunriseEducationConsultants";
// Hero "View full profile" link. Set to "" to hide it (route must exist).
const PROFILE_PATH = "/staff/anisuzzaman-kiron";
const DATE_MODIFIED = "2026-10-17";
const uploadUrl = (p) => siteUrl + "upload/ceo/" + p;

/* ---------- Data ---------- */
const { data, pending, error, refresh } = await useApi("/message-from-ceo", {
  key: "ceo-message",
  transform: (res) => res.data,
});
const ceo = computed(() => data.value || null);
const hasContent = computed(
  () => !!(ceo.value && (ceo.value.message || ceo.value.name)),
);

const name = computed(() => ceo.value?.name || FALLBACK_NAME);
const designation = computed(() => ceo.value?.designation || FALLBACK_ROLE);
const photo = computed(() => ceo.value?.photo || "");
const photoAlt = computed(
  () =>
    ceo.value?.photo_alt || `${name.value}, ${designation.value} of ${brand}`,
);

const initials = (n) =>
  (n || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("") || "?";
const stripHtml = (h) =>
  (h || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* image fallback state (SSR-safe, no DOM removal) */
const broken = reactive({});

/* ---------- Static content ---------- */
const stats = computed(() => [
  { value: "12", plus: true, label: "Years in international education" },
  { value: "2,500", plus: true, label: "Students and applicants supported" },
  {
    value: String(destinations.value.length || 15),
    plus: false,
    label: "Study destinations",
  },
]);

const pullQuote =
  "\u201CWe prioritise quality over quantity, ensuring that we never take on more assignments than we can handle.\u201D";
const sideFacts = [
  { value: "2014", label: "Founded Sunrise in Dhaka" },
  { value: "50+", label: "People in our team" },
  { value: "2", label: "Offices: Banani and Sylhet" },
];

const story = [
  "\u201CI started Sunrise Education Consultants in Dhaka in 2014 with a simple idea: Bangladeshi students deserve honest, personal advice about studying abroad. Choosing a country, a university and a visa route is one of the biggest financial decisions a family will make, and it should be based on what is realistic for each student.\u201D",
  "\u201CFrom the beginning, we limited how many students each counsellor handles, so every file gets real attention. That is still the rule today, even with two offices and a team of more than 50 people. I would rather tell a student \u2018not this country\u2019 or \u2018not this year\u2019 than take a fee for an application that will fail.\u201D",
  "\u201COver the years I have helped students reach universities in the United Kingdom, Norway, Canada, the United States, Italy, Finland, Australia and many other countries. Every one of those journeys taught me that good preparation and genuine documents matter more than any shortcut.\u201D",
];

const gallery = computed(() => [
  {
    key: "g1",
    tone: "",
    src: uploadUrl("ceo-counselling-students.webp"),
    alt: `${name.value} counselling Bangladeshi students at ${brand}`,
    title: "Counselling students",
    sub: "Banani head office",
  },
  {
    key: "g2",
    tone: "g2",
    src: uploadUrl("ceo-with-team.webp"),
    alt: `${name.value} with the ${brand} team`,
    title: "With the Sunrise team",
    sub: "Dhaka",
  },
  {
    key: "g3",
    tone: "g3",
    src: uploadUrl("ceo-seminar.webp"),
    alt: `${name.value} speaking at a study abroad seminar in Bangladesh`,
    title: "Study abroad seminar",
    sub: "Free guidance for students and parents",
  },
]);

const advice = [
  {
    title: "Choose the country by your budget, not by trends",
    text: "Start with what your family can afford for tuition, living costs and the bank balance the embassy requires. A country you can fund properly is better than a famous one you cannot. Our ",
    link: { to: "/study-abroad", label: "study abroad destinations guide" },
    after: " compares 15 countries side by side.",
  },
  {
    title: "Start 10 to 12 months before your intake",
    text: "Scholarships such as Stipendium Hungaricum, the Chinese Government Scholarship and T\u00FCrkiye Burslari close almost a year before classes start, and Norway closes non-EU applications in November. Students who start early have more choices and less stress. See the dates in our ",
    link: { to: "/scholarships", label: "scholarship guide for Bangladeshi students" },
    after: ".",
  },
  {
    title: "Get your English test done early",
    text: "Many universities accept alternatives to IELTS, but a strong IELTS, PTE or TOEFL score still opens more programmes and scholarships, and some countries, such as Finland for applied sciences, do not accept a medium-of-instruction letter from Bangladesh. Take the test early so you can retake it if needed.",
  },
  {
    title: "Never use fake documents",
    text: "A fake bank statement, certificate or booking can lead to a refusal and a ban that follows you for years. Every embassy checks documents, and I have seen honest students lose their chance because someone promised a shortcut. At Sunrise we work only with genuine documents.",
  },
  {
    title: "Be careful of anyone who guarantees a visa",
    text: "Only embassies decide visas. Anyone who promises a guaranteed visa, a \u201C100% scholarship\u201D for a fee, or easy work abroad is not telling you the truth. Ask for advice and service terms in writing before you pay anyone.",
  },
  {
    title: "Check every rule on official websites",
    text: "Fees, funds requirements and work rules change every year. Before you decide, check the university, embassy and immigration websites, or ask a counsellor to show you the official source. Our destination guides, such as ",
    link: {
      to: "/study-abroad/study-in-italy-from-bangladesh",
      label: "study in Italy from Bangladesh",
    },
    after: ", list their sources.",
  },
  {
    title: "Plan for life after you arrive",
    text: "Housing, health insurance, part-time work rules and the residence permit matter as much as admission. Understand the work limits in your chosen country before you go, and never plan to pay your first-year costs from part-time work. Our ",
    link: {
      to: "/service-details/pre-departure-preparation",
      label: "pre-departure briefing",
    },
    after: " covers all of this.",
  },
  {
    title: "Involve your parents from the start",
    text: "Studying abroad is a family decision and usually a family investment. Bring your parents or sponsors to counselling, so everyone understands the costs, the timeline and the risks before any money is paid.",
  },
];

const experience = [
  {
    title: "University admissions",
    text: "Choosing realistic countries, universities and programmes for each profile, and building applications that admissions teams take seriously.",
    to: "/service-details/university-admission-process",
    link: "University admission support",
    paths: ["m12 3 10 5-10 5L2 8l10-5Z", "M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"],
  },
  {
    title: "Scholarship guidance",
    text: "Matching students with government and university scholarships, and preparing the statements and interviews that win them.",
    to: "/scholarships",
    link: "Scholarships for Bangladeshi students",
    paths: ["M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z", "m8.5 14-1.5 7 5-3 5 3-1.5-7"],
  },
  {
    title: "Student visa documentation",
    text: "Preparing complete, genuine visa files and interview practice, based on each embassy's current checklist.",
    to: "/service-details/counselling-and-visa-processing",
    link: "Student visa processing",
    paths: ["M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z", "m9 12 2 2 4-4"],
  },
];

/* ---------- Destinations from the API ---------- */
const { data: abroadData } = await useApi("/study-abroad", {
  key: "study-abroad-list",
  transform: (res) => res.data,
});
const destinations = computed(() =>
  (Array.isArray(abroadData.value) ? abroadData.value : [])
    .filter((d) => d?.slug)
    .map((d) => ({ name: d.short_name || d.name, slug: d.slug })),
);

/* Fill with real data to show the Awards section. Example item:
   { name: "Award name", by: "Awarding body", year: "2024",
     text: "One or two sentences.", image: uploadUrl("award-1.webp"), tone: "g3" }
   Also add each one to Person "award" in the JSON-LD below. */
const awards = [];

const promises = [
  { b: "An honest assessment first.", t: "You will hear what is realistic for your results and budget before you pay any service fee." },
  { b: "Advice and fees in writing.", t: "Our recommendations and service terms are always written down." },
  { b: "Genuine documents only.", t: "We never prepare or accept fake documents of any kind." },
  { b: "No false promises.", t: "We never guarantee visas, because only embassies decide them." },
  { b: "Official sources.", t: "Fees and rules are checked on official websites before every intake." },
  { b: "Support until you arrive.", t: "Housing, travel and pre-departure guidance are part of the journey." },
];

/* ---------- FAQs from the API (visible FAQ and FAQPage JSON-LD share this) ---------- */
const { data: faqData } = await useApi("/faqs", {
  key: "faqs-ceo",
  query: { group: "ceo" },
  transform: (res) => res.data,
});
const faqs = computed(() =>
  (Array.isArray(faqData.value) ? faqData.value : [])
    .map((f) => ({
      q: String(f.question ?? f.q ?? "").trim(),
      a: String(f.answer ?? f.a ?? "").trim(), // may contain HTML
    }))
    .filter((f) => f.q && f.a),
);

/* ---------- SEO (API values first, sensible fallbacks) ---------- */
const seoTitle = computed(
  () =>
    ceo.value?.seo?.meta_title ||
    `Message from the CEO, ${name.value} | Sunrise`,
);
const seoDesc = computed(
  () =>
    ceo.value?.seo?.meta_description ||
    `A message from ${name.value}, Founder and CEO of ${brand}, with his advice for Bangladeshi students who want to study abroad.`,
);

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  keywords: () => ceo.value?.seo?.meta_keywords || undefined,
  robots: "index, follow, max-image-preview:large",
  ogType: "profile",
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogImage: () => photo.value || undefined,
  ogUrl: pageUrl,
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

const orgId = siteUrl + "#organization";
const personId = pageUrl + "#person";

const jsonLd = computed(() => {
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "About Us", item: siteUrl + "about-us" },
        { "@type": "ListItem", position: 3, name: "Message from the CEO", item: pageUrl },
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": pageUrl + "#page",
      url: pageUrl,
      name: seoTitle.value,
      description: seoDesc.value,
      inLanguage: "en",
      dateModified: DATE_MODIFIED,
      mainEntity: { "@id": personId },
      isPartOf: {
        "@type": "WebSite",
        "@id": siteUrl + "#website",
        url: siteUrl,
        name: brand,
      },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: name.value,
      jobTitle: designation.value,
      image: photo.value || undefined,
      email: CEO_EMAIL,
      worksFor: { "@id": orgId },
      description: `${name.value} is the Founder and CEO of ${brand}, a study abroad and immigration consultancy he founded in Dhaka, Bangladesh in 2014. He has more than 12 years of experience in international education.`,
      knowsAbout: [
        "International education",
        "Study abroad from Bangladesh",
        "University admissions",
        "Scholarship guidance",
        "Student visa documentation",
        "Pre-departure planning",
        "Study in Italy",
        "Study in Norway",
        "Study in Finland",
      ],
      workLocation: { "@type": "Place", name: "Banani, Dhaka, Bangladesh" },
      award: awards.length
        ? awards.map((a) => `${a.name}, ${a.by}, ${a.year}`)
        : undefined,
    },
    {
      "@type": "Article",
      "@id": pageUrl + "#message",
      headline: `Message from the CEO of ${brand}`,
      description: stripHtml(ceo.value?.message).slice(0, 200) || undefined,
      author: { "@id": personId },
      publisher: { "@id": orgId },
      datePublished: "2014",
      dateModified: DATE_MODIFIED,
      image: photo.value || undefined,
      mainEntityOfPage: { "@id": pageUrl + "#page" },
      inLanguage: "en",
      about: [
        "Study abroad guidance for Bangladeshi students",
        brand,
      ],
    },
    {
      "@type": "EducationalOrganization",
      "@id": orgId,
      name: brand,
      url: siteUrl,
      foundingDate: "2014",
      founder: { "@id": personId },
    },
  ];
  if (faqs.value.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.value.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: stripHtml(f.a) },
      })),
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );
});

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{ type: "application/ld+json", innerHTML: () => jsonLd.value }],
});

/* ---------- Scroll reveal (content stays visible if JS is off) ---------- */
const root = ref(null);
const js = ref(false);
let io = null;
onMounted(() => {
  if (!root.value || !("IntersectionObserver" in window)) return;
  js.value = true;
  nextTick(() => {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    root.value.querySelectorAll(".mc-reveal").forEach((el) => io.observe(el));
  });
});
onBeforeUnmount(() => io && io.disconnect());
</script>

<style scoped>
.mc-center {
  text-align: center;
}
.mc-state {
  text-align: center;
  padding: 40px 0;
  color: var(--sec-slate);
}

/* ---------- Reveal ---------- */
.mc-js .mc-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.mc-js .mc-reveal.is-in {
  opacity: 1;
  transform: none;
}

/* ---------- Hero ---------- */
.mc-hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 48px;
  align-items: start;
}
.mc-hero-grid > * {
  min-width: 0;
}
.mc-sub a {
  color: var(--sec-navy);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: var(--sec-green);
  text-underline-offset: 3px;
}
.mc-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 26px;
}
.mc-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 30px;
  padding-top: 26px;
  border-top: 1px solid var(--sec-line);
}
.mc-stat {
  padding: 0 20px;
  border-left: 1px solid var(--sec-line);
}
.mc-stat:first-child {
  border-left: 0;
  padding-left: 0;
}
.mc-stat b {
  display: block;
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
  color: var(--sec-navy);
}
.mc-stat b span {
  color: var(--sec-orange);
}
.mc-stat small {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--sec-slate);
}

/* portrait */
.mc-portrait {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.1);
}
.mc-ph {
  position: relative;
  margin: 0;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: linear-gradient(135deg, #2fa84f, #16213a);
}
.mc-ph img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mc-ini {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 84px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
}
.mc-ph figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 44px 18px 16px;
  color: #fff;
  background: linear-gradient(180deg, transparent, rgba(22, 33, 58, 0.82));
}
.mc-ph figcaption b {
  display: block;
  font-size: 15px;
}
.mc-ph figcaption small {
  display: block;
  margin-top: 2px;
  font-size: 12.5px;
  color: #dce3ee;
}
.mc-portrait dl {
  margin: 0;
  padding: 18px 20px 22px;
  display: grid;
  gap: 8px;
}
.mc-portrait dl div {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  background: var(--sec-offwhite);
  font-size: 13.5px;
}
.mc-portrait dt {
  color: var(--sec-slate);
  font-weight: 600;
}
.mc-portrait dd {
  margin: 0;
  font-weight: 800;
  color: var(--sec-navy);
}
.mc-portrait dd a {
  color: var(--sec-green-dk);
  text-decoration: none;
}

/* ---------- Letter ---------- */
.mc-letter-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 48px;
  align-items: start;
}
.mc-letter-grid > * {
  min-width: 0;
}
.mc-side {
  position: sticky;
  top: 110px;
}
.mc-side-card {
  position: relative;
  overflow: hidden;
  background: var(--sec-navy);
  color: #fff;
  border-radius: 20px;
  padding: 30px 26px;
  text-align: center;
}
.mc-side-card::before {
  content: "";
  position: absolute;
  right: -120px;
  top: -120px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.06) 0 6deg,
    transparent 6deg 18deg
  );
}
.mc-side-card > * {
  position: relative;
}
.mc-side-av {
  position: relative;
  display: grid;
  place-items: center;
  width: 110px;
  height: 110px;
  margin: 0 auto 14px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--sec-green), #1e6e39);
  border: 4px solid rgba(255, 255, 255, 0.15);
}
.mc-side-av img,
.mc-sign-av img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mc-side-card > b {
  display: block;
  font-size: 20px;
}
.mc-side-card > small {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  font-weight: 700;
  color: #9fe0b0;
}
.mc-side-card blockquote {
  margin: 20px 0;
  padding: 18px 18px 18px 20px;
  border-radius: 12px;
  border-left: 3px solid var(--sec-orange);
  background: rgba(255, 255, 255, 0.06);
  text-align: left;
  font-size: 15px;
  line-height: 1.7;
  font-style: italic;
  color: #e6ecf5;
}
.mc-side-card ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.mc-side-card li {
  padding: 10px 6px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.mc-side-card li strong {
  display: block;
  font-size: 19px;
  color: var(--sec-orange);
}
.mc-side-card li span {
  display: block;
  margin-top: 2px;
  font-size: 11.5px;
  line-height: 1.35;
  color: #c9d1e0;
}

/* message html from admin editor */
.mc-prose {
  font-size: 16.5px;
  line-height: 1.9;
  color: #475467;
}
.mc-prose :deep(p) {
  margin: 0 0 18px;
}
.mc-prose :deep(p:first-child) {
  font-size: 18.5px;
  line-height: 1.75;
  font-weight: 600;
  color: var(--sec-navy);
}
.mc-prose :deep(h2),
.mc-prose :deep(h3) {
  margin: 28px 0 12px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 800;
  color: var(--sec-navy);
}
.mc-prose :deep(ul),
.mc-prose :deep(ol) {
  margin: 0 0 18px;
  padding-left: 22px;
}
.mc-prose :deep(li) {
  margin-bottom: 8px;
}
.mc-prose :deep(blockquote) {
  margin: 24px 0;
  padding: 16px 20px;
  border-left: 4px solid var(--sec-orange);
  background: var(--sec-gold-bg);
  border-radius: 0 12px 12px 0;
  color: var(--sec-navy);
  font-weight: 600;
}
.mc-prose :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.mc-prose :deep(strong) {
  color: var(--sec-navy);
}
.mc-prose :deep([style]) {
  color: inherit !important;
  font-family: inherit !important;
}
.mc-prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}

.mc-sign {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid var(--sec-line);
}
.mc-sign-av {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--sec-green);
  color: #fff;
  font-size: 18px;
  font-weight: 800;
}
.mc-sign i {
  display: block;
  margin-bottom: 2px;
  font-size: 14px;
  color: var(--sec-slate);
}
.mc-sign b {
  display: block;
  font-size: 17px;
  color: var(--sec-navy);
}
.mc-sign small {
  font-size: 13.5px;
  color: var(--sec-slate);
}

/* ---------- Why + gallery ---------- */
.mc-split {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 44px;
  align-items: start;
}
.mc-split > * {
  min-width: 0;
}
.mc-story p {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.85;
  color: #475467;
}
.mc-gal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.mc-fig {
  position: relative;
  margin: 0;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #2d6cb4, #16213a);
  box-shadow: 0 16px 34px rgba(22, 33, 58, 0.12);
}
.mc-fig.g2 {
  background: linear-gradient(135deg, #2fa84f, #1e6e39);
}
.mc-fig.g3 {
  background: linear-gradient(135deg, #f5a623, #b87400);
}
.mc-fig.wide {
  grid-column: span 2;
  aspect-ratio: 16 / 9;
}
.mc-fig img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.mc-fig:hover img {
  transform: scale(1.04);
}
.mc-fig figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 44px 18px 16px;
  color: #fff;
  background: linear-gradient(180deg, transparent, rgba(22, 33, 58, 0.82));
}
.mc-fig figcaption b {
  display: block;
  font-size: 15px;
}
.mc-fig figcaption small {
  display: block;
  margin-top: 2px;
  font-size: 12.5px;
  color: #dce3ee;
}

/* ---------- Advice ---------- */
.mc-advice {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  counter-reset: a;
}
.mc-tip {
  position: relative;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 24px 24px 22px 74px;
  box-shadow: 0 12px 26px rgba(22, 33, 58, 0.05);
}
.mc-tip::before {
  counter-increment: a;
  content: counter(a);
  position: absolute;
  left: 22px;
  top: 22px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--sec-navy);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 800;
}
.mc-tip h3 {
  margin: 0 0 8px;
  font-size: 17.5px;
  color: var(--sec-navy);
}
.mc-tip p {
  margin: 0;
  font-size: 14.8px;
  line-height: 1.75;
  color: #475467;
}
.mc-tip a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* ---------- Experience ---------- */
.mc-exp {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.mc-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.mc-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(22, 33, 58, 0.1);
  border-color: rgba(47, 168, 79, 0.4);
}
.mc-ci {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
  border-radius: 14px;
  background: rgba(47, 168, 79, 0.1);
  color: var(--sec-green-dk);
}
.mc-ci svg {
  width: 24px;
  height: 24px;
}
.mc-card h3 {
  margin: 0 0 10px;
  font-size: 19px;
  color: var(--sec-navy);
}
.mc-card p {
  margin: 0 0 12px;
  font-size: 14.5px;
  line-height: 1.75;
  color: #475467;
}
.mc-link {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 16px;
  border-radius: 10px;
  border: 1.5px solid var(--sec-line);
  font-weight: 800;
  font-size: 14px;
  text-decoration: none;
  color: var(--sec-navy);
  transition: all 0.2s;
}
.mc-link:hover {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
}
.mc-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}
.mc-chips a {
  padding: 9px 16px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--sec-line);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  color: var(--sec-navy);
  transition: all 0.2s;
}
.mc-chips a:hover {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
}

/* ---------- Awards ---------- */
.mc-awards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.mc-award {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}
.mc-award-fig {
  border-radius: 0;
  box-shadow: none;
}
.mc-award-body {
  position: relative;
  padding: 22px 24px 24px;
}
.mc-award-year {
  position: absolute;
  right: 20px;
  top: -16px;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--sec-orange);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
}
.mc-award-body h3 {
  margin: 4px 0 4px;
  padding-right: 60px;
  font-size: 18px;
  color: var(--sec-navy);
}
.mc-award-body p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.7;
  color: #475467;
}
.mc-award-body .mc-award-by {
  margin-bottom: 10px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--sec-green-dk);
}

/* ---------- Commitment (dark) ---------- */
.mc-dark {
  position: relative;
  overflow: hidden;
  background: var(--sec-navy);
  color: #fff;
}
.mc-dark::before {
  content: "";
  position: absolute;
  left: -200px;
  bottom: -300px;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(47, 168, 79, 0.18), transparent 65%);
}
.mc-dark-in {
  position: relative;
}
.mc-dark-in :deep(.svp-h2),
.mc-dark-in :deep(h2) {
  color: #fff;
}
.mc-dark-in :deep(.svp-lead) {
  color: #aeb8cc;
}
.mc-dark-in :deep(.svp-lead a) {
  color: #9fe0b0;
  font-weight: 700;
}
.mc-dark-in :deep(.svp-eyebrow) {
  color: #9fe0b0;
  border-color: rgba(159, 224, 176, 0.3);
  background: rgba(47, 168, 79, 0.1);
}
.mc-promise {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.mc-promise li {
  position: relative;
  padding: 16px 18px 16px 52px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 15px;
  line-height: 1.6;
  color: #dce3ee;
}
.mc-promise li::before {
  content: "";
  position: absolute;
  left: 18px;
  top: 17px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--sec-green);
}
.mc-promise li::after {
  content: "";
  position: absolute;
  left: 25px;
  top: 21px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.mc-promise b {
  color: #fff;
}

/* ---------- FAQ ---------- */
.mc-faq {
  background: var(--sec-gold-bg);
}
.mc-faq-list {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 12px;
}
.mc-faq details {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 14px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}
.mc-faq details[open] {
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.08);
}
.mc-faq summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  font-size: 16px;
  font-weight: 800;
  color: var(--sec-navy);
}
.mc-faq summary::-webkit-details-marker {
  display: none;
}
.mc-faq summary::after {
  content: "+";
  flex: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(47, 168, 79, 0.1);
  color: var(--sec-green-dk);
  font-size: 18px;
  transition: transform 0.3s;
}
.mc-faq details[open] summary::after {
  transform: rotate(45deg);
}
.mc-faq-a {
  padding: 0 24px 22px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--sec-slate);
}
.mc-faq-a :deep(p) {
  margin: 0 0 10px;
}
.mc-faq-a :deep(p:last-child) {
  margin-bottom: 0;
}
.mc-faq-a :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.mc-faq-a :deep([style]) {
  color: inherit !important;
  font-family: inherit !important;
}
.mc-note {
  margin: 18px 0 0;
  text-align: center;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--sec-slate);
}
.mc-note a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .mc-exp,
  .mc-awards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .mc-hero-grid,
  .mc-letter-grid,
  .mc-split,
  .mc-advice,
  .mc-promise {
    grid-template-columns: 1fr;
  }
  .mc-hero-grid,
  .mc-letter-grid {
    gap: 30px;
  }
  .mc-portrait,
  .mc-side {
    max-width: 440px;
  }
  .mc-side {
    position: static;
  }
}
@media (max-width: 640px) {
  .mc-exp,
  .mc-awards,
  .mc-gal {
    grid-template-columns: 1fr;
  }
  .mc-fig.wide {
    grid-column: auto;
    aspect-ratio: 4 / 3;
  }
  .mc-tip {
    padding: 22px 18px 20px 66px;
  }
  .mc-tip::before {
    left: 16px;
  }
  .mc-portrait dl div {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .mc-prose {
    font-size: 16px;
  }
  .mc-prose :deep(p:first-child) {
    font-size: 17.5px;
  }
  .mc-actions :deep(.svp-btn) {
    flex: 1;
    justify-content: center;
  }
}
@media (max-width: 420px) {
  .mc-actions {
    flex-direction: column;
  }
  .mc-stats {
    grid-template-columns: 1fr 1fr;
    gap: 18px 0;
  }
  .mc-stat:nth-child(3) {
    border-left: 0;
    padding-left: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .mc-js .mc-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>