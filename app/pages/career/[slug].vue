<template>
  <div class="svp">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="cd-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <NuxtLink to="/about-us">About Us</NuxtLink><span>/</span>
          <NuxtLink to="/career">Careers</NuxtLink><span>/</span>
          <span aria-current="page">{{ job?.position || "Job details" }}</span>
        </nav>

        <p v-if="pending" class="svp-lead">Loading job…</p>

        <div v-else-if="error || !job" class="cd-msg">
          <p>Could not load this job right now.</p>
          <button type="button" class="svp-btn svp-btn-primary" @click="refresh()">Try again</button>
        </div>

        <div v-else class="svp-hero-grid">
          <div>
            <span class="svp-eyebrow"
              ><i></i>{{ job.department_label || "Careers at Sunrise" }}</span
            >
            <h1 id="cd-h1" class="svp-h1">
              {{ job.position }}
              <span>{{ job.location || "Sunrise Education Consultants" }}</span>
            </h1>
            <p v-if="job.summary" class="svp-sub">{{ job.summary }}</p>

            <ul class="cd-chips">
              <li v-if="job.job_type"><span v-html="ic.briefcase"></span>{{ job.job_type }}</li>
              <li v-if="job.experience"><span v-html="ic.award"></span>{{ job.experience }}</li>
              <li v-if="job.vacancies"><span v-html="ic.home"></span>{{ vacLabel }}</li>
            </ul>

            <div class="svp-cta-row">
              <NuxtLink
                v-if="job.is_open"
                class="svp-btn svp-btn-primary"
                :to="`/job-apply/${job.slug}`"
                >Apply Now <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <span v-else class="svp-btn cd-btn-off" aria-disabled="true">Applications closed</span>
              <NuxtLink class="svp-btn svp-btn-ghost" to="/career">See All Jobs</NuxtLink>
            </div>
          </div>

          <aside class="svp-answer" aria-labelledby="cd-facts-h">
            <h2 id="cd-facts-h">Job at a glance</h2>
            <dl class="cd-facts">
              <div v-for="f in factRows" :key="f.label">
                <dt>{{ f.label }}</dt>
                <dd>
                  {{ f.value }}<em v-if="f.note" :class="{ soon: f.soon }">{{ f.note }}</em>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>

    <!-- ================= DETAILS ================= -->
    <section v-if="job" class="svp-section svp-services" aria-labelledby="cd-body-h">
      <div class="svp-container">
        <h2 id="cd-body-h" class="cd-sr">Job description</h2>
        <div class="cd-grid">
          <article class="cd-main">
            <div v-if="job.description" class="cd-prose" v-html="job.description"></div>
            <p v-else-if="job.summary" class="cd-prose">{{ job.summary }}</p>
          </article>

          <aside class="cd-side">
            <div class="cd-apply" :class="{ 'is-closed': !job.is_open }">
              <span class="cd-badge" :class="{ soon: statusOf === 'soon', closed: statusOf === 'closed' }">{{
                statusText
              }}</span>
              <h3>{{ job.is_open ? "Apply for this role" : "This role is closed" }}</h3>

              <p v-if="job.deadline" class="cd-deadline">
                {{ job.is_open ? "Apply before" : "Deadline was" }}
                <b>{{ fmt(job.deadline) }}</b>
                <em v-if="deadlineNote">{{ deadlineNote }}</em>
              </p>
              <p v-else class="cd-deadline">No fixed deadline.</p>

              <NuxtLink
                v-if="job.is_open"
                class="svp-btn svp-btn-primary"
                :to="`/job-apply/${job.slug}`"
                >Apply Now <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <NuxtLink v-else class="svp-btn svp-btn-primary" to="/career"
                >See Open Jobs <span aria-hidden="true">&rarr;</span></NuxtLink
              >

              <p class="cd-note">
                Submit the online form with your CV. Shortlisted candidates are
                contacted for an interview.
              </p>
              <a class="cd-call" href="tel:+8801911878274">Questions? Call 01911 878 274</a>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ================= OTHER JOBS ================= -->
    <section v-if="others.length" class="svp-section" aria-labelledby="cd-more-h">
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>More openings</span>
        <h2 id="cd-more-h" class="svp-h2">
          Other Open Roles <span>at Sunrise</span>
        </h2>
        <div class="svp-next">
          <NuxtLink v-for="o in others" :key="o.slug" :to="`/career/${o.slug}`">
            <h3>{{ o.position }}</h3>
            <p>{{ [o.department_label, o.location].filter(Boolean).join(" · ") }}</p>
            <span>View details &rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="cd-cta-h">
      <div class="svp-container">
        <h2 id="cd-cta-h">Ready to Help Students Go Global?</h2>
        <p>
          Find the role that fits you and apply today. We look forward to
          meeting you.
        </p>
        <div class="svp-cta-row" style="justify-content: center; margin: 0">
          <NuxtLink
            v-if="job?.is_open"
            class="svp-btn svp-btn-primary"
            :to="`/job-apply/${job.slug}`"
            >Apply for This Role <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <NuxtLink v-else class="svp-btn svp-btn-primary" to="/career"
            >See Open Jobs <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <NuxtLink class="svp-btn svp-btn-ghost" to="/about-us">About Sunrise</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
// Always end with exactly one "/" so siteUrl + "career" never glues into "...netcareer"
const siteUrl = (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";
const brand = "Sunrise Education Consultants";
const route = useRoute();
const slug = String(route.params.slug);
const pageUrl = `${siteUrl}career/${slug}`;

/* ---------- Data ---------- */
const { data, pending, error, refresh } = await useApi(`/career/${slug}`, {
  key: `career-${slug}`,
  transform: (res) => res.data,
});

// Real 404 for a slug that does not exist
if (!data.value && error.value && (error.value.statusCode === 404 || error.value.status === 404)) {
  throw createError({ statusCode: 404, statusMessage: "Job not found", fatal: true });
}

const job = computed(() => data.value || null);

// Same key + query as the careers list page, so Nuxt reuses the cached payload
const { data: allData } = await useApi("/careers", {
  key: "careers-all",
  query: { status: "all" },
  transform: (res) => res.data,
});
const others = computed(() => {
  const time = (j) => (j.deadline ? new Date(j.deadline + "T00:00:00Z").getTime() : Infinity);
  return (allData.value || [])
    .filter((j) => j.is_open && j.slug !== slug)
    .sort((a, b) => time(a) - time(b))
    .slice(0, 3);
});

/* ---------- Today (set after mount, so server and browser HTML match) ---------- */
const today = ref(null);
onMounted(() => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  today.value = d;
});

const daysLeft = computed(() => {
  if (!job.value?.deadline || !today.value) return null;
  return Math.round((new Date(job.value.deadline + "T00:00:00") - today.value) / 864e5);
});
const statusOf = computed(() => {
  if (!job.value?.is_open) return "closed";
  const n = daysLeft.value;
  return n !== null && n <= 7 ? "soon" : "open";
});
const statusText = computed(
  () => ({ closed: "Closed", soon: "Closing soon", open: "Open" })[statusOf.value],
);
const deadlineNote = computed(() => {
  if (!job.value?.is_open) return "";
  const n = daysLeft.value;
  if (n === null) return "";
  if (n === 0) return "Last day today";
  return `${n} day${n === 1 ? "" : "s"} left`;
});

const fmt = (iso) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
const vacLabel = computed(() =>
  job.value?.vacancies ? `${String(job.value.vacancies).padStart(2, "0")} vacancies` : "",
);

/* ---------- Icons ---------- */
const svg = (inner) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${inner}</svg>`;
const ic = {
  briefcase: svg(
    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  ),
  award: svg('<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>'),
  home: svg('<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"/>'),
};

/* ---------- Facts card ---------- */
const factRows = computed(() => {
  const j = job.value;
  if (!j) return [];
  const rows = [];
  if (j.department_label) rows.push({ label: "Team", value: j.department_label });
  if (j.job_type) rows.push({ label: "Job type", value: j.job_type });
  if (j.experience) rows.push({ label: "Experience", value: j.experience });
  if (j.location) rows.push({ label: "Location", value: j.location });
  if (j.vacancies) rows.push({ label: "Vacancies", value: vacLabel.value });
  rows.push({
    label: "Deadline",
    value: j.deadline ? fmt(j.deadline) : "No fixed deadline",
    note: j.is_open ? deadlineNote.value : "Closed",
    soon: statusOf.value === "soon",
  });
  return rows;
});

/* ---------- SEO ---------- */
const stripHtml = (h) =>
  (h || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const seoTitle = computed(() =>
  job.value ? `${job.value.position} | Careers at ${brand}` : `Careers | ${brand}`,
);
const seoDesc = computed(
  () =>
    job.value?.summary ||
    stripHtml(job.value?.description).slice(0, 155) ||
    `Apply for jobs at ${brand} in Dhaka.`,
);

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogUrl: pageUrl,
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

const employmentType = (t) => {
  const s = String(t || "").toLowerCase();
  if (s.includes("part")) return "PART_TIME";
  if (s.includes("contract")) return "CONTRACTOR";
  if (s.includes("intern")) return "INTERN";
  if (s.includes("temp")) return "TEMPORARY";
  return "FULL_TIME";
};

const jsonLd = computed(() => {
  const j = job.value;
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "About Us", item: `${siteUrl}about-us` },
        { "@type": "ListItem", position: 3, name: "Careers", item: `${siteUrl}career` },
        { "@type": "ListItem", position: 4, name: j?.position || "Job", item: pageUrl },
      ],
    },
  ];
  // JobPosting only for open roles
  if (j?.is_open) {
    graph.push({
      "@type": "JobPosting",
      title: j.position,
      description: j.description || j.summary,
      url: pageUrl,
      // datePosted: add once the API returns it (Google requires it for rich results)
      validThrough: j.deadline ? `${j.deadline}T23:59:59+06:00` : undefined,
      employmentType: employmentType(j.job_type),
      totalJobOpenings: j.vacancies || undefined,
      directApply: true,
      industry: "Education consulting",
      hiringOrganization: { "@type": "Organization", name: brand, sameAs: siteUrl },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: j.location || "Dhaka",
          addressCountry: "BD",
        },
      },
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
});

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{ type: "application/ld+json", innerHTML: () => jsonLd.value }],
});
</script>

<style scoped>
.cd-msg {
  text-align: center;
  padding: 40px 0;
  color: var(--sec-slate);
}
.cd-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Hero chips */
.cd-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 26px;
  padding: 0;
  list-style: none;
}
.cd-chips li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--sec-line);
  color: var(--sec-navy);
}
.cd-chips li :deep(svg) {
  width: 15px;
  height: 15px;
  color: var(--sec-green-dk);
}
.cd-btn-off {
  background: #d0d5dd;
  color: #fff;
  cursor: not-allowed;
}

/* Facts (inside .svp-answer) */
.cd-facts {
  margin: 0;
  display: grid;
  gap: 8px;
}
.cd-facts div {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  align-items: baseline;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--sec-offwhite);
  font-size: 14px;
}
.cd-facts dt {
  color: var(--sec-slate);
  font-weight: 600;
}
.cd-facts dd {
  margin: 0;
  font-weight: 800;
  color: var(--sec-navy);
  overflow-wrap: anywhere;
}
.cd-facts em {
  display: block;
  margin-top: 2px;
  font-style: normal;
  font-size: 12.5px;
  font-weight: 800;
  color: var(--sec-green-dk);
}
.cd-facts em.soon {
  color: #b87400;
}

/* Layout */
.cd-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 40px;
  align-items: start;
}
.cd-main {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 38px 42px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}

/* Job description HTML coming from the admin editor */
.cd-prose {
  max-width: 72ch;
  font-size: 16px;
  line-height: 1.85;
  color: #475467;
}
.cd-prose :deep(h1),
.cd-prose :deep(h2),
.cd-prose :deep(h3),
.cd-prose :deep(h4) {
  margin: 0 0 14px;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 800;
  color: var(--sec-navy);
}
.cd-prose :deep(p) {
  margin: 0 0 16px;
}
.cd-prose :deep(p:first-of-type) {
  font-size: 17.5px;
  line-height: 1.8;
  color: var(--sec-navy);
  font-weight: 600;
}
/* section labels like "Key Responsibilities:" that are a lone <strong> in a <p> */
.cd-prose :deep(p > strong:only-child) {
  display: inline-block;
  margin-top: 14px;
  font-size: 18px;
  font-weight: 800;
  color: var(--sec-navy);
}
.cd-prose :deep(ul),
.cd-prose :deep(ol) {
  margin: 0 0 18px;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}
.cd-prose :deep(ul li),
.cd-prose :deep(ol li) {
  position: relative;
  padding: 10px 14px 10px 40px;
  border-radius: 10px;
  background: var(--sec-offwhite);
  line-height: 1.6;
}
.cd-prose :deep(ul li::before) {
  content: "";
  position: absolute;
  left: 14px;
  top: 14px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: rgba(47, 168, 79, 0.14);
}
.cd-prose :deep(ul li::after) {
  content: "";
  position: absolute;
  left: 20px;
  top: 18px;
  width: 4px;
  height: 7px;
  border: solid var(--sec-green-dk);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.cd-prose :deep(ol) {
  counter-reset: cd;
}
.cd-prose :deep(ol li) {
  counter-increment: cd;
}
.cd-prose :deep(ol li::before) {
  content: counter(cd);
  position: absolute;
  left: 11px;
  top: 11px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--sec-green);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  display: grid;
  place-items: center;
}
.cd-prose :deep(strong) {
  color: var(--sec-navy);
}
.cd-prose :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
}
/* the editor pastes inline colors/fonts (e.g. grey Heebo address); keep the site look */
.cd-prose :deep([style]) {
  color: inherit !important;
  font-family: inherit !important;
}

/* Sidebar */
.cd-side {
  position: sticky;
  top: 110px;
}
.cd-apply {
  position: relative;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.08);
}
.cd-apply::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22px;
  bottom: 22px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--sec-green);
}
.cd-apply.is-closed::before {
  background: #98a2b3;
}
.cd-badge {
  display: inline-block;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(47, 168, 79, 0.12);
  color: var(--sec-green-dk);
}
.cd-badge.soon {
  background: rgba(245, 166, 35, 0.16);
  color: #b87400;
}
.cd-badge.closed {
  background: #eef0f3;
  color: var(--sec-slate);
}
.cd-apply h3 {
  margin: 12px 0 8px;
  font-size: 20px;
  font-weight: 800;
  color: var(--sec-navy);
}
.cd-deadline {
  margin: 0 0 18px;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--sec-slate);
}
.cd-deadline b {
  color: var(--sec-navy);
}
.cd-deadline em {
  display: block;
  margin-top: 2px;
  font-style: normal;
  font-weight: 800;
  color: #b87400;
}
.cd-apply .svp-btn {
  width: 100%;
  justify-content: center;
}
.cd-note {
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 1.65;
  color: var(--sec-slate);
}
.cd-call {
  display: block;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--sec-line);
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: var(--sec-green-dk);
  text-decoration: none;
}
.cd-call:hover {
  text-decoration: underline;
}

@media (max-width: 1100px) {
  .cd-grid {
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 28px;
  }
  .cd-main {
    padding: 30px 28px;
  }
}
@media (max-width: 900px) {
  .cd-grid {
    grid-template-columns: 1fr;
  }
  .cd-side {
    position: static;
  }
}
@media (max-width: 640px) {
  .cd-main {
    padding: 24px 18px;
  }
  .cd-prose {
    font-size: 15.5px;
  }
  .cd-prose :deep(h1),
  .cd-prose :deep(h2),
  .cd-prose :deep(h3),
  .cd-prose :deep(h4) {
    font-size: 21px;
  }
  .cd-facts div {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}
</style>