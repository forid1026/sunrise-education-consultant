<template>
  <main class="stm">
    <!-- ================= HERO ================= -->
    <section class="stm-hero" aria-labelledby="stm-h1">
      <div class="stm-hero-rays" aria-hidden="true"></div>
      <div class="stm-container">
        <nav class="stm-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <NuxtLink to="/about-us">About Us</NuxtLink><span>/</span>
          <span aria-current="page">Our Team</span>
        </nav>
        <div class="stm-hero-grid">
          <div>
            <span class="stm-eyebrow"
              ><i></i>Meet our study abroad experts</span
            >
            <h1 class="stm-h1" id="stm-h1">
              The People Behind <span>Every Student Visa</span>
            </h1>
            <p class="stm-sub">
              Meet the study abroad counsellors in Dhaka and Sylhet who guide
              every Sunrise student, from the first free assessment to the day
              they fly.
              <NuxtLink to="/">Sunrise Education Consultants</NuxtLink> is a
              team of more than {{ total >= 50 ? 50 : total }} people:
              counsellors, admission officers, a destination manager, marketing
              and student support staff, led by founder Anisuzzaman Kiron since
              2014.
            </p>
            <div class="stm-cta-row">
              <NuxtLink class="stm-btn stm-btn-primary" to="/apply-now"
                >Talk to a Counsellor
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a class="stm-btn stm-btn-ghost" href="#stm-dir-h"
                >Browse the Team</a
              >
            </div>
          </div>
          <div style="position: relative">
            <div class="stm-mosaic" aria-hidden="true">
              <span v-for="m in mosaic" :key="m.id" class="stm-tile">
                {{ initials(m.name) }}
                <img
                  v-if="m.photo"
                  :src="m.photo"
                  alt=""
                  loading="eager"
                  decoding="async"
                  @error="hideImg"
                />
              </span>
            </div>
            <div class="stm-badge b1">
              <i>{{ total }}</i>
              <div><b>Team members</b>Dhaka and Sylhet</div>
            </div>
            <div class="stm-badge b2">
              <i>12+</i>
              <div><b>Years</b>Guiding students</div>
            </div>
          </div>
        </div>
        <div class="stm-stats">
          <div class="stm-stat">
            <b>{{ total }}</b
            ><small>People on the Sunrise team</small>
          </div>
          <div class="stm-stat">
            <b>{{ counts.counsel }}</b
            ><small>Counsellors and admission officers</small>
          </div>
          <div class="stm-stat">
            <b>2</b><small>Offices: Banani, Dhaka and Jail Road, Sylhet</small>
          </div>
          <div class="stm-stat">
            <b>2,500<span>+</span></b
            ><small>Students and applicants supported</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= LOADING / ERROR ================= -->
    <section v-if="pending" class="stm-section">
      <div class="stm-container">
        <p class="stm-state">Loading our team...</p>
      </div>
    </section>
    <section v-else-if="error || !total" class="stm-section">
      <div class="stm-container">
        <p class="stm-state">
          We could not load the team right now. Please try again shortly or
          <NuxtLink to="/contact-us">contact us</NuxtLink>.
        </p>
      </div>
    </section>

    <template v-else>
      <!-- ================= LEADERSHIP ================= -->
      <section class="stm-section" aria-labelledby="stm-lead-h">
        <div class="stm-container">
          <span class="stm-eyebrow"><i></i>Leadership</span>
          <h2 class="stm-h2" id="stm-lead-h">
            The Leaders <span>Behind Sunrise</span>
          </h2>
          <p class="stm-lead">
            Our leadership team sets the standards every counsellor follows:
            honest assessment, genuine documents and advice based on official
            sources.
          </p>

          <article v-if="founder" class="stm-spot stm-reveal">
            <div class="stm-spot-pic">
              {{ initials(founder.name) }}
              <img
                v-if="founder.photo"
                :src="founder.photo"
                :alt="`${founder.name}, ${founder.designation} of Sunrise Education Consultants`"
                width="600"
                height="700"
                loading="lazy"
                decoding="async"
                @error="hideImg"
              />
            </div>
            <div class="stm-spot-body">
              <small>{{ founder.designation }}</small>
              <h3>{{ founder.name }}</h3>
              <p v-if="founder.experience" class="r">
                {{ founder.experience }} in international education
              </p>
              <p>{{ truncate(plain(founder.about), 340) }}</p>
              <blockquote>
                "We prioritise quality over quantity, ensuring that we never
                take on more assignments than we can handle."
              </blockquote>
              <div class="stm-spot-links">
                <NuxtLink :to="`/staff/${founder.slug}`"
                  >View full profile &rarr;</NuxtLink
                >
                <NuxtLink to="/message-from-ceo">Read his message</NuxtLink>
              </div>
            </div>
          </article>

          <div class="stm-ldrs">
            <NuxtLink
              v-for="m in otherLeaders"
              :key="m.id"
              class="stm-ldr stm-reveal"
              :to="`/staff/${m.slug}`"
            >
              <span class="stm-pic">
                <i aria-hidden="true">{{ initials(m.name) }}</i>
                <img
                  v-if="m.photo"
                  :src="m.photo"
                  :alt="`${m.name}, ${m.designation} at Sunrise Education Consultants`"
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  @error="hideImg"
                />
                <span class="stm-view">View profile &rarr;</span>
              </span>
              <span class="stm-pinfo">
                <b>{{ m.name }}</b>
                <small>{{ m.designation }}</small>
                <p v-if="plain(m.about)">{{ truncate(plain(m.about), 95) }}</p>
              </span>
            </NuxtLink>
            <NuxtLink class="stm-ldr stm-reveal stm-ldr-join" to="/career">
              <span>
                <b class="stm-join-t">Join our team</b>
                <span class="stm-join-s"
                  >We are hiring counsellors and admission officers in Dhaka and
                  Sylhet.</span
                >
                <span class="stm-join-l">See careers &rarr;</span>
              </span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ================= HOW THE TEAM WORKS ================= -->
      <section class="stm-section stm-soft" aria-labelledby="stm-flow-h">
        <div class="stm-container">
          <div class="stm-center">
            <span class="stm-eyebrow"><i></i>How we work together</span>
            <h2 class="stm-h2" id="stm-flow-h">
              Who Handles Your File, <span>Step by Step</span>
            </h2>
            <p class="stm-lead">
              Every application passes through specialists, so you get expert
              attention at each stage and always know who to call.
            </p>
          </div>
          <div class="stm-flow">
            <div v-for="s in flow" :key="s.h" class="stm-step stm-reveal">
              <b>{{ s.role }}</b>
              <h3>{{ s.h }}</h3>
              <p>{{ s.p }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= DIRECTORY ================= -->
      <section class="stm-section" aria-labelledby="stm-dir-h">
        <div class="stm-container">
          <span class="stm-eyebrow"><i></i>Team directory</span>
          <h2 class="stm-h2" id="stm-dir-h">
            Meet the Whole <span>Sunrise Team</span>
          </h2>
          <p class="stm-lead">
            Filter by department or search by name. Select anyone to see their
            profile, role and experience. Our counsellors work with the full
            range of
            <NuxtLink to="/services"
              >study abroad services for Bangladeshi students</NuxtLink
            >.
          </p>
          <div class="stm-tools">
            <div
              class="stm-tabs"
              role="group"
              aria-label="Filter team by department"
            >
              <button
                v-for="g in groups"
                :key="g.key"
                type="button"
                :aria-pressed="active === g.key ? 'true' : 'false'"
                @click="setFilter(g.key, $event)"
              >
                {{ g.label
                }}<span>{{ g.key === "all" ? total : counts[g.key] }}</span>
              </button>
            </div>
            <label class="stm-search">
              <span class="stm-live">Search team by name</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                v-model="term"
                type="search"
                placeholder="Search by name"
                autocomplete="off"
              />
            </label>
          </div>

          <div class="stm-grid">
            <NuxtLink
              v-for="m in filtered"
              :key="m.id"
              class="stm-person is-pop"
              :to="`/staff/${m.slug}`"
            >
              <span class="stm-pic">
                <i aria-hidden="true">{{ initials(m.name) }}</i>
                <img
                  v-if="m.photo"
                  :src="m.photo"
                  :alt="`${m.name}, ${m.designation} at Sunrise Education Consultants`"
                  width="400"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  @error="hideImg"
                />
                <em :class="`d-${m._g}`">{{ groupLabel(m._g) }}</em>
                <span class="stm-view">View profile &rarr;</span>
              </span>
              <span class="stm-pinfo"
                ><b>{{ m.name }}</b
                ><small>{{ m.designation }}</small></span
              >
            </NuxtLink>
          </div>
          <p v-if="!filtered.length" class="stm-empty">
            No team member matches that search.
          </p>
          <p class="stm-live" aria-live="polite">
            {{ filtered.length }} team members shown
          </p>
        </div>
      </section>
    </template>

    <!-- ================= JOIN ================= -->
    <section
      class="stm-section"
      style="padding-top: 0"
      aria-labelledby="stm-join-h"
    >
      <div class="stm-container">
        <div class="stm-join stm-reveal">
          <div>
            <span class="stm-eyebrow"><i></i>Careers</span>
            <h2 class="stm-h2" id="stm-join-h">
              Want to Join <span>the Sunrise Team?</span>
            </h2>
            <p>
              We are always looking for counsellors, admission officers, student
              support staff and marketers who care about students. Learn about
              our values on the
              <NuxtLink to="/mission-vision" class="stm-inl"
                >Sunrise mission and vision</NuxtLink
              >
              page.
            </p>
          </div>
          <div class="stm-cta-row">
            <NuxtLink class="stm-btn stm-btn-primary" to="/career"
              >See Open Positions
              <span aria-hidden="true">&rarr;</span></NuxtLink
            >
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section
      v-if="faqs.length"
      class="stm-section stm-faq"
      aria-labelledby="stm-faq-h"
    >
      <div class="stm-container">
        <div class="stm-center">
          <span class="stm-eyebrow"><i></i>FAQ</span>
          <h2 class="stm-h2" id="stm-faq-h">
            Our Team: <span>Common Questions</span>
          </h2>
        </div>
        <div class="stm-faq-list">
          <details v-for="(f, i) in faqs" :key="f.q + i" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <div class="stm-faq-a" v-html="f.a"></div>
          </details>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="stm-cta" aria-labelledby="stm-cta-h">
      <div class="stm-container">
        <h2 id="stm-cta-h">Talk to a Sunrise Counsellor Today</h2>
        <p>
          Book a free assessment and a counsellor from our team will review your
          profile and build an honest plan for your study abroad journey.
        </p>
        <div class="stm-cta-row" style="justify-content: center; margin: 0">
          <NuxtLink class="stm-btn stm-btn-primary" to="/apply-now"
            >Get Free Assessment
            <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <a class="stm-btn stm-btn-ghost" href="tel:+8801911878274"
            >Call 01911 878 274</a
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
// ---------------------------------------------------------------
// Data: GET {apiBase}/staff  ->  { data: [ { id, name, slug, label,
// designation, experience, about, photo, contact, seo } ] }
// Set NUXT_PUBLIC_API_BASE (or runtimeConfig.public.apiBase) to your API root.
// ---------------------------------------------------------------
const config = useRuntimeConfig();
const apiBase = config.public.apiBase || "http://localhost:8000/api";
const siteUrl = (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";

const {
  data: res,
  pending,
  error,
} = await useAsyncData("staff-list", () => $fetch(`${apiBase}/staff`));

// ---------- helpers ----------
const GROUPS = [
  { key: "all", label: "All Team" },
  { key: "lead", label: "Leadership" },
  { key: "counsel", label: "Counselling & Admission" },
  { key: "market", label: "Marketing & Design" },
  { key: "support", label: "Student Support" },
  { key: "ops", label: "Operations" },
];
const groups = GROUPS;

function classify(m) {
  const label = (m.label || "").toLowerCase();
  const role = (m.designation || "").toLowerCase();
  const test = (s) => {
    if (
      /lead|manage|chief|founder|ceo|coo|adviser|advisor|head counsel|branch|director/.test(
        s,
      )
    )
      return "lead";
    if (/counsel|admission/.test(s)) return "counsel";
    if (/market|design|seo|sales|graphic/.test(s)) return "market";
    if (/support|reception|customer/.test(s)) return "support";
    return "";
  };
  // label wins when it is a known department; otherwise fall back to the job title
  const byLabel = test(label);
  if (label.includes("lead")) return "lead";
  if (byLabel) return byLabel;
  const byRole = test(role);
  if (byRole === "lead" && /accounts/.test(role)) return "ops";
  return byRole || "ops";
}
const groupLabel = (k) => (GROUPS.find((g) => g.key === k) || {}).label || "";

function plain(html) {
  return (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
function truncate(s, n) {
  if (!s || s.length <= n) return s;
  return s.slice(0, n).replace(/\s+\S*$/, "") + "…";
}
function initials(name) {
  const p = (name || "")
    .replace(/\./g, "")
    .split(/\s+/)
    .filter((w) => w && !/^(md|mr|mrs|ms)$/i.test(w));
  if (!p.length) return "";
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
}
function hideImg(e) {
  e.target.style.display = "none";
}

// ---------- state ----------
const staff = computed(() =>
  (res.value?.data || []).map((m) => ({ ...m, _g: classify(m) })),
);
const total = computed(() => staff.value.length);
const counts = computed(() => {
  const c = { lead: 0, counsel: 0, market: 0, support: 0, ops: 0 };
  staff.value.forEach((m) => c[m._g]++);
  return c;
});
const mosaic = computed(() => staff.value.filter((m) => m.photo).slice(0, 9));
const leaders = computed(() => staff.value.filter((m) => m._g === "lead"));
const founder = computed(
  () =>
    leaders.value.find((m) => /ceo|founder/i.test(m.designation || "")) ||
    leaders.value[0],
);
const otherLeaders = computed(() =>
  leaders.value.filter((m) => m.id !== founder.value?.id),
);

const active = ref("all");
const term = ref("");
const filtered = computed(() => {
  const t = term.value.trim().toLowerCase();
  return staff.value.filter(
    (m) =>
      (active.value === "all" || m._g === active.value) &&
      (!t || (m.name || "").toLowerCase().includes(t)),
  );
});
function setFilter(key, e) {
  active.value = key;
  if (import.meta.client && window.innerWidth < 640) {
    const b = e.currentTarget;
    b.parentNode.scrollTo({ left: b.offsetLeft - 16, behavior: "smooth" });
  }
}

// ---------- static copy ----------
const flow = [
  {
    role: "Student counsellor",
    h: "Free assessment",
    p: "Reviews your results, English score and budget, and builds a realistic country and university plan.",
  },
  {
    role: "Destination manager",
    h: "Country expertise",
    p: "Keeps our country knowledge current and checks programmes, fees and deadlines on official sources.",
  },
  {
    role: "Admission officer",
    h: "Applications",
    p: "Prepares your university applications, documents and statements, and follows up on offer letters.",
  },
  {
    role: "Counselling team",
    h: "Visa file",
    p: "Prepares your student visa file and interview practice, with genuine documents only.",
  },
  {
    role: "Student support",
    h: "Until you fly",
    p: "Answers your questions, books appointments and keeps you updated through every step.",
  },
];
/* ---------- FAQs from API (/faqs?group=team) ---------- */
const { data: faqData } = await useApi("/faqs", {
  key: "faqs-staff",
  query: { group: "team" },
});

// Accepts [ {...} ] or { data: [ {...} ] }; question/answer or q/a keys.
const faqs = computed(() => {
  const raw = Array.isArray(faqData.value)
    ? faqData.value
    : faqData.value?.data || [];
  return raw
    .map((f) => ({
      q: f.question ?? f.q ?? f.title ?? "",
      a: f.answer ?? f.a ?? f.description ?? "",
    }))
    .filter((f) => f.q && f.a);
});

// ---------- SEO ----------
const title = "Study Abroad Counsellors in Dhaka: Our Team | Sunrise";
const desc = computed(
  () =>
    `Meet the ${total.value || 50} people behind Sunrise Education Consultants: leadership, study abroad counsellors, admission officers and support staff in Dhaka and Sylhet.`,
);
const ogImage = computed(
  () => founder.value?.photo || mosaic.value[0]?.photo || "",
);

const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: `${siteUrl}/about-us`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Our Team",
          item: `${siteUrl}/staff`,
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/staff#page`,
      url: `${siteUrl}/staff`,
      name: "Study Abroad Counsellors in Dhaka: Meet the Sunrise Team",
      description: desc.value,
      inLanguage: "en",
      about: { "@id": `${siteUrl}/#organization` },
      mainEntity: { "@id": `${siteUrl}/staff#team` },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/staff#team`,
      name: "Sunrise Education Consultants team",
      numberOfItems: total.value,
      itemListElement: staff.value.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Person",
          name: m.name,
          jobTitle: m.designation,
          url: `${siteUrl}/staff/${m.slug}`,
          ...(m.photo ? { image: m.photo } : {}),
          worksFor: { "@id": `${siteUrl}/#organization` },
        },
      })),
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "Sunrise Education Consultants",
      url: `${siteUrl}/`,
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: total.value,
      },
    },
    ...(faqs.value.length
      ? [
          {
            "@type": "FAQPage",
            mainEntity: faqs.value.map((f) => ({
              "@type": "Question",
              name: plain(f.q),
              acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
            })),
          },
        ]
      : []),
  ],
}));

useHead(() => ({
  title,
  link: [{ rel: "canonical", href: `${siteUrl}/staff` }],
  meta: [
    { name: "description", content: desc.value },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content: "Meet the Sunrise Team: Study Abroad Counsellors in Dhaka",
    },
    { property: "og:description", content: desc.value },
    { property: "og:url", content: `${siteUrl}/staff` },
    { property: "og:site_name", content: "Sunrise Education Consultants" },
    ...(ogImage.value
      ? [{ property: "og:image", content: ogImage.value }]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
  ],
  script: [
    { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd.value) },
  ],
}));

// ---------- scroll reveal ----------
let io = null;
function observe() {
  if (!import.meta.client) return;
  const els = document.querySelectorAll(".stm-reveal:not(.is-in)");
  if (!("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("is-in"));
    return;
  }
  io =
    io ||
    new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
  els.forEach((e) => io.observe(e));
}
onMounted(() => nextTick(observe));
watch(staff, () => nextTick(observe));
onBeforeUnmount(() => io && io.disconnect());
</script>

<style>
/* Only team-page (.stm-*) styles. Header/footer/tokens already live in style.css */
.stm a {
  color: inherit;
}
.stm-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}
.stm-section {
  padding: 80px 0;
}
.stm-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sec-green-dk);
  border: 1px solid rgba(47, 168, 79, 0.28);
  background: rgba(47, 168, 79, 0.06);
  padding: 8px 16px;
  border-radius: 999px;
  margin-bottom: 18px;
}
.stm-eyebrow i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--sec-orange);
}
.stm-h2 {
  font-size: clamp(26px, 3.2vw, 38px);
  line-height: 1.2;
  font-weight: 800;
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}
.stm-h2 span {
  color: var(--sec-green);
}
.stm-lead {
  font-size: 17px;
  line-height: 1.75;
  color: var(--sec-slate);
  margin: 0 0 36px;
  max-width: 780px;
}
.stm-lead a {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.stm-center {
  text-align: center;
}
.stm-center .stm-lead {
  margin-left: auto;
  margin-right: auto;
}
.stm-state {
  text-align: center;
  color: var(--sec-slate);
  font-size: 16px;
  padding: 30px 0;
}
.stm-state a {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.stm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 28px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  font-family: inherit;
  border: 0;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}
.stm-btn-primary {
  background: var(--sec-green);
  color: #fff !important;
  box-shadow: 0 10px 24px rgba(47, 168, 79, 0.22);
}
.stm-btn-primary:hover {
  background: var(--sec-green-dk);
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(47, 168, 79, 0.28);
}
.stm-btn-ghost {
  border: 1.5px solid var(--sec-line);
  color: var(--sec-navy);
  background: #fff;
}
.stm-btn-ghost:hover {
  border-color: var(--sec-green);
  color: var(--sec-green-dk);
  transform: translateY(-2px);
}
.stm-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.stm-reveal.is-in {
  opacity: 1;
  transform: none;
}
.stm-soft {
  background: var(--sec-offwhite);
}

/* hero */
.stm-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--sec-gold-bg) 0%, #fff 100%);
  padding: 40px 0 70px;
}
.stm-hero-rays {
  position: absolute;
  right: -220px;
  top: -260px;
  width: 760px;
  height: 760px;
  border-radius: 50%;
  pointer-events: none;
  background: repeating-conic-gradient(
    rgba(245, 166, 35, 0.13) 0 6deg,
    transparent 6deg 18deg
  );
  animation: stm-rotate 60s linear infinite;
}
.stm-crumb {
  position: relative;
  display: flex;
  gap: 8px;
  font-size: 13.5px;
  color: var(--sec-slate);
  margin-bottom: 34px;
}
.stm-crumb a {
  text-decoration: none;
  font-weight: 600;
}
.stm-crumb a:hover {
  color: var(--sec-green-dk);
}
.stm-hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.95fr;
  gap: 48px;
  align-items: center;
}
.stm-h1 {
  font-size: clamp(32px, 4.6vw, 54px);
  line-height: 1.1;
  font-weight: 800;
  margin: 0 0 18px;
  letter-spacing: -0.02em;
}
.stm-h1 span {
  display: block;
  color: var(--sec-green);
}
.stm-hero p.stm-sub {
  font-size: 17.5px;
  line-height: 1.75;
  color: var(--sec-slate);
  margin: 0 0 28px;
  max-width: 640px;
}
.stm-hero p.stm-sub a {
  color: var(--sec-navy);
  font-weight: 700;
  text-decoration-color: var(--sec-green);
  text-underline-offset: 3px;
}
.stm-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 26px;
}
.stm-stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 46px;
  border-top: 1px solid var(--sec-line);
  padding-top: 26px;
}
.stm-stat {
  padding: 0 20px;
  border-left: 1px solid var(--sec-line);
}
.stm-stat:first-child {
  border-left: 0;
  padding-left: 0;
}
.stm-stat b {
  display: block;
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
}
.stm-stat b span {
  color: var(--sec-orange);
}
.stm-stat small {
  font-size: 13px;
  color: var(--sec-slate);
  line-height: 1.4;
  display: block;
  margin-top: 4px;
}

.stm-mosaic {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  transform: rotate(-4deg);
  padding: 10px;
}
.stm-mosaic .stm-tile {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, #2d6cb4, #16213a);
  box-shadow: 0 16px 34px rgba(22, 33, 58, 0.16);
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 800;
  font-size: 26px;
  animation: stm-float 7s ease-in-out infinite;
}
.stm-mosaic .stm-tile:nth-child(3n + 2) {
  transform: translateY(-26px);
  background: linear-gradient(135deg, #2fa84f, #1e6e39);
}
.stm-mosaic .stm-tile:nth-child(4n) {
  background: linear-gradient(135deg, #f5a623, #b87400);
}
.stm-mosaic .stm-tile:nth-child(2n) {
  animation-delay: -3s;
}
.stm-mosaic img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.stm-badge {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border-radius: 14px;
  padding: 12px 16px;
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.18);
  font-size: 13px;
  color: var(--sec-slate);
  transform: rotate(4deg);
}
.stm-badge b {
  display: block;
  font-size: 20px;
  color: var(--sec-navy);
  line-height: 1;
}
.stm-badge i {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(47, 168, 79, 0.12);
  color: var(--sec-green-dk);
  font-style: normal;
  font-weight: 800;
}
.stm-badge.b1 {
  left: -18px;
  bottom: 28px;
}
.stm-badge.b2 {
  right: -10px;
  top: -6px;
}
.stm-badge.b2 i {
  background: rgba(245, 166, 35, 0.16);
  color: #b87400;
}

/* spotlight */
.stm-spot {
  display: grid;
  grid-template-columns: 380px 1fr;
  border-radius: 24px;
  overflow: hidden;
  background: var(--sec-navy);
  color: #fff;
  box-shadow: 0 30px 60px rgba(22, 33, 58, 0.2);
  margin-bottom: 30px;
}
.stm-spot-pic {
  position: relative;
  min-height: 420px;
  background: linear-gradient(135deg, var(--sec-green), #1e6e39);
  display: grid;
  place-items: center;
  font-size: 90px;
  font-weight: 800;
}
.stm-spot-pic img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.stm-spot-body {
  position: relative;
  padding: 44px 46px;
  overflow: hidden;
}
.stm-spot-body::before {
  content: "";
  position: absolute;
  right: -180px;
  top: -180px;
  width: 460px;
  height: 460px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.05) 0 6deg,
    transparent 6deg 18deg
  );
  animation: stm-rotate 70s linear infinite;
}
.stm-spot-body * {
  position: relative;
}
.stm-spot-body small {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sec-orange);
}
.stm-spot-body h3 {
  margin: 8px 0 4px;
  font-size: 34px;
  letter-spacing: -0.01em;
}
.stm-spot-body .r {
  margin: 0 0 18px;
  color: #9fe0b0;
  font-weight: 700;
}
.stm-spot-body p {
  margin: 0 0 16px;
  font-size: 15.5px;
  line-height: 1.85;
  color: #c9d1e0;
  max-width: 640px;
}
.stm-spot-body blockquote {
  margin: 22px 0;
  padding: 16px 20px;
  border-left: 3px solid var(--sec-orange);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0 12px 12px 0;
  font-style: italic;
  color: #e6ecf5;
  line-height: 1.7;
}
.stm-spot-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.stm-spot-links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 14px;
  text-decoration: none;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  transition: all 0.2s;
}
.stm-spot-links a:first-child {
  background: var(--sec-green);
  border-color: var(--sec-green);
}
.stm-spot-links a:hover {
  transform: translateY(-2px);
  border-color: #fff;
}

/* leaders */
.stm-ldrs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}
.stm-ldr {
  position: relative;
  display: block;
  text-decoration: none;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--sec-line);
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
  transition:
    transform 0.35s,
    box-shadow 0.35s,
    opacity 0.7s;
}
.stm-ldr:hover {
  transform: translateY(-8px);
  box-shadow: 0 26px 50px rgba(22, 33, 58, 0.14);
}
.stm-ldr .stm-pic {
  aspect-ratio: 1/1;
}
.stm-ldr .stm-pinfo {
  padding: 18px 20px 20px;
}
.stm-ldr .stm-pinfo p {
  margin: 8px 0 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: #475467;
}
.stm-ldr-join {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--sec-green), #1e6e39);
  color: #fff;
  text-align: center;
  padding: 24px;
}
.stm-join-t {
  display: block;
  font-size: 22px;
  margin-bottom: 8px;
}
.stm-join-s {
  font-size: 14px;
  line-height: 1.6;
  color: #ddf2e2;
}
.stm-join-l {
  display: block;
  margin-top: 14px;
  font-weight: 800;
}

/* pics + cards */
.stm-pic {
  position: relative;
  display: block;
  aspect-ratio: 4/5;
  overflow: hidden;
  background: linear-gradient(135deg, #2d6cb4, #16213a);
}
.stm-pic > i {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-style: normal;
  font-size: 40px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.85);
}
.stm-pic img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.6s ease;
}
.stm-pic::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(22, 33, 58, 0.55));
  opacity: 0;
  transition: opacity 0.35s;
}
.stm-pic em {
  position: absolute;
  z-index: 2;
  left: 12px;
  top: 12px;
  font-style: normal;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--sec-navy);
}
.stm-pic em.d-lead {
  background: var(--sec-orange);
  color: #fff;
}
.stm-pic em.d-counsel {
  background: var(--sec-green);
  color: #fff;
}
.stm-pic em.d-market {
  background: var(--sec-blue);
  color: #fff;
}
.stm-view {
  position: absolute;
  z-index: 2;
  left: 12px;
  right: 12px;
  bottom: 12px;
  padding: 10px;
  border-radius: 10px;
  background: #fff;
  color: var(--sec-navy);
  font-size: 13px;
  font-weight: 800;
  text-align: center;
  transform: translateY(140%);
  transition: transform 0.35s ease;
}
a:hover .stm-pic img,
a:focus-visible .stm-pic img {
  transform: scale(1.07);
}
a:hover .stm-pic::after,
a:focus-visible .stm-pic::after {
  opacity: 1;
}
a:hover .stm-view,
a:focus-visible .stm-view {
  transform: none;
}
.stm-pinfo {
  display: block;
  padding: 14px 16px 16px;
}
.stm-pinfo b {
  display: block;
  font-size: 15.5px;
  line-height: 1.3;
}
.stm-pinfo small {
  display: block;
  margin-top: 3px;
  font-size: 13px;
  color: var(--sec-green-dk);
  font-weight: 700;
  line-height: 1.4;
}

/* directory */
.stm-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.stm-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.stm-tabs button {
  font-family: inherit;
  cursor: pointer;
  border: 1.5px solid var(--sec-line);
  background: #fff;
  color: var(--sec-navy);
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.2s;
}
.stm-tabs button span {
  display: inline-block;
  margin-left: 6px;
  min-width: 22px;
  padding: 1px 7px;
  border-radius: 999px;
  background: var(--sec-offwhite);
  font-size: 12px;
  color: var(--sec-slate);
}
.stm-tabs button:hover {
  border-color: var(--sec-green);
}
.stm-tabs button[aria-pressed="true"] {
  background: var(--sec-navy);
  border-color: var(--sec-navy);
  color: #fff;
}
.stm-tabs button[aria-pressed="true"] span {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.stm-search {
  position: relative;
  flex: 0 1 280px;
}
.stm-search input {
  width: 100%;
  font-family: inherit;
  font-size: 14.5px;
  padding: 12px 16px 12px 42px;
  border-radius: 999px;
  border: 1.5px solid var(--sec-line);
  background: #fff;
  color: var(--sec-navy);
  outline: none;
  transition: border-color 0.2s;
}
.stm-search input:focus {
  border-color: var(--sec-green);
}
.stm-search svg {
  position: absolute;
  left: 15px;
  top: 50%;
  width: 17px;
  height: 17px;
  margin-top: -8.5px;
  color: var(--sec-slate);
}
.stm-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.stm-person {
  display: block;
  text-decoration: none;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 18px;
  overflow: hidden;
  transition:
    transform 0.35s,
    box-shadow 0.35s,
    border-color 0.35s;
}
.stm-person:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 44px rgba(22, 33, 58, 0.12);
  border-color: rgba(47, 168, 79, 0.45);
}
.stm-person.is-pop {
  animation: stm-pop 0.45s ease both;
}
.stm-empty {
  text-align: center;
  padding: 40px;
  color: var(--sec-slate);
}
.stm-live {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

/* flow */
.stm-flow {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
  counter-reset: f;
}
.stm-flow::before {
  content: "";
  position: absolute;
  left: 8%;
  right: 8%;
  top: 34px;
  height: 2px;
  background: linear-gradient(90deg, var(--sec-green), var(--sec-orange));
}
.stm-step {
  position: relative;
  text-align: center;
  padding: 0 6px;
}
.stm-step::before {
  counter-increment: f;
  content: counter(f);
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--sec-green);
  font-size: 24px;
  font-weight: 800;
  color: var(--sec-navy);
  box-shadow: 0 10px 22px rgba(47, 168, 79, 0.18);
}
.stm-step h3 {
  margin: 0 0 4px;
  font-size: 16.5px;
}
.stm-step b {
  display: block;
  font-size: 12.5px;
  color: #b87400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.stm-step p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: #475467;
}

/* join */
.stm-join {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 30px;
  align-items: center;
  background: linear-gradient(135deg, var(--sec-gold-bg), #fff);
  border: 1px solid #f3ddb3;
  border-radius: 22px;
  padding: 36px 40px;
}
.stm-join h2 {
  margin: 0 0 10px;
}
.stm-join p {
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: #475467;
}
.stm-join .stm-cta-row {
  justify-content: flex-end;
  margin: 0;
}
.stm-inl {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* faq */
.stm-faq {
  background: var(--sec-gold-bg);
}
.stm-faq-list {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 12px;
}
.stm-faq details {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 14px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}
.stm-faq details[open] {
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.08);
}
.stm-faq summary {
  list-style: none;
  cursor: pointer;
  padding: 20px 24px;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}
.stm-faq summary::-webkit-details-marker {
  display: none;
}
.stm-faq summary::after {
  content: "+";
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(47, 168, 79, 0.1);
  color: var(--sec-green-dk);
  display: grid;
  place-items: center;
  font-size: 18px;
  transition: transform 0.3s;
}
.stm-faq details[open] summary::after {
  transform: rotate(45deg);
}
.stm-faq-a {
  padding: 0 24px 22px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--sec-slate);
}
.stm-faq-a p {
  margin: 0 0 10px;
}
.stm-faq-a p:last-child {
  margin: 0;
}
.stm-faq-a a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* cta */
.stm-cta {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--sec-green) 0%, #1e6e39 100%);
  padding: 70px 0;
  color: #fff;
  text-align: center;
}
.stm-cta::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 900px;
  height: 900px;
  margin: -450px 0 0 -450px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.07) 0 6deg,
    transparent 6deg 18deg
  );
  animation: stm-rotate 80s linear infinite;
}
.stm-cta * {
  position: relative;
}
.stm-cta h2 {
  font-size: clamp(26px, 3.4vw, 40px);
  margin: 0 0 12px;
  font-weight: 800;
}
.stm-cta p {
  margin: 0 auto 28px;
  max-width: 620px;
  font-size: 17px;
  color: #ddf2e2;
  line-height: 1.7;
}
.stm-cta .stm-btn-primary {
  background: #fff;
  color: var(--sec-green-dk) !important;
}
.stm-cta .stm-btn-ghost {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.6);
}

@keyframes stm-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes stm-float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -8px;
  }
}
@keyframes stm-pop {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 1200px) {
  .stm-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 1000px) {
  .stm-ldrs {
    grid-template-columns: repeat(2, 1fr);
  }
  .stm-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .stm-flow {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .stm-flow::before {
    left: 33px;
    right: auto;
    top: 10px;
    bottom: 10px;
    width: 2px;
    height: auto;
    background: linear-gradient(var(--sec-green), var(--sec-orange));
  }
  .stm-step {
    display: grid;
    grid-template-columns: 68px 1fr;
    gap: 0 18px;
    text-align: left;
    align-items: start;
  }
  .stm-step::before {
    margin: 0;
    grid-row: span 3;
  }
}
@media (max-width: 900px) {
  .stm-hero-grid,
  .stm-spot,
  .stm-join {
    grid-template-columns: 1fr;
  }
  .stm-hero-grid > * {
    min-width: 0;
  }
  .stm-spot-pic {
    min-height: 0;
    aspect-ratio: 4/3;
  }
  .stm-join .stm-cta-row {
    justify-content: flex-start;
  }
  .stm-mosaic {
    max-width: 460px;
    margin: 30px auto 0;
  }
  .stm-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px 0;
  }
  .stm-stat:nth-child(3) {
    border-left: 0;
    padding-left: 0;
  }
}
@media (max-width: 640px) {
  .stm-section {
    padding: 56px 0;
  }
  .stm-container {
    padding: 0 16px;
  }
  .stm-hero {
    padding: 28px 0 50px;
  }
  .stm-cta-row .stm-btn {
    flex: 1;
    justify-content: center;
  }
  .stm-mosaic {
    max-width: 300px;
    gap: 10px;
  }
  .stm-mosaic .stm-tile {
    border-radius: 14px;
    font-size: 20px;
  }
  .stm-badge {
    padding: 9px 12px;
  }
  .stm-badge b {
    font-size: 16px;
  }
  .stm-badge.b1 {
    left: 0;
  }
  .stm-badge.b2 {
    right: 0;
    top: 10px;
  }
  .stm-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .stm-ldrs {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .stm-spot-body {
    padding: 28px 22px;
  }
  .stm-spot-body h3 {
    font-size: 27px;
  }
  .stm-pinfo {
    padding: 12px;
  }
  .stm-pinfo b {
    font-size: 14px;
  }
  .stm-pinfo small {
    font-size: 12px;
  }
  .stm-ldr .stm-pinfo p {
    display: none;
  }
  .stm-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
    margin: 0 -16px;
    padding-left: 16px;
    padding-right: 16px;
    scrollbar-width: none;
  }
  .stm-tabs::-webkit-scrollbar {
    display: none;
  }
  .stm-tabs button {
    white-space: nowrap;
  }
  .stm-search {
    flex: 1 1 100%;
  }
  .stm-join {
    padding: 26px 22px;
  }
  .stm-view {
    display: none;
  }
}
@media (max-width: 420px) {
  .stm-cta-row {
    flex-direction: column;
  }
  .stm-cta-row .stm-btn {
    width: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .stm * {
    animation: none !important;
    transition: none !important;
  }
  .stm-reveal {
    opacity: 1;
    transform: none;
  }
}
</style>