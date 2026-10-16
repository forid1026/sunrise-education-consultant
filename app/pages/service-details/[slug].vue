<template>
  <div class="svp">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="sd-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <NuxtLink to="/services">Services</NuxtLink><span>/</span>
          <span aria-current="page">{{ service?.name || "Service" }}</span>
        </nav>

        <p v-if="pending" class="svp-lead">Loading service…</p>

        <div v-else-if="error || !service" class="sd-msg">
          <p>Could not load this service right now.</p>
          <button
            type="button"
            class="svp-btn svp-btn-primary"
            @click="refresh()"
          >
            Try again
          </button>
        </div>

        <div v-else class="svp-hero-grid">
          <div>
            <span class="svp-eyebrow"
              ><i></i>{{ service.badge || "Our service" }}</span
            >
            <h1 id="sd-h1" class="svp-h1">{{ service.name }}</h1>
            <p v-if="service.tagline" class="svp-sub">{{ service.tagline }}</p>
            <div class="svp-cta-row">
              <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a
                v-if="includes.length"
                class="svp-btn svp-btn-ghost"
                href="#sd-included"
                >See What's Included</a
              >
            </div>
          </div>

          <aside
            v-if="factRows.length"
            class="svp-answer"
            aria-labelledby="sd-facts-h"
          >
            <h2 id="sd-facts-h">At a glance</h2>
            <dl class="sd-facts">
              <div v-for="f in factRows" :key="f.label">
                <dt>{{ f.label }}</dt>
                <dd>{{ f.value }}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>

    <!-- ================= DETAILS ================= -->
    <section
      v-if="service"
      class="svp-section svp-services"
      aria-labelledby="sd-over-h"
    >
      <div class="svp-container">
        <div class="sd-grid">
          <article class="sd-main">
            <figure v-if="service.image" class="sd-fig">
              <img
                :src="service.image"
                :alt="service.image_alt || service.name"
                loading="eager"
              />
            </figure>

            <span class="svp-eyebrow"><i></i>How it works</span>
            <h2 id="sd-over-h" class="svp-h2">
              About <span>{{ service.name }}</span>
            </h2>
            <div v-if="body" class="sd-prose" v-html="body"></div>
            <p v-else-if="service.summary" class="sd-prose">
              {{ service.summary }}
            </p>
          </article>

          <aside class="sd-side">
            <div v-if="includes.length" id="sd-included" class="sd-incl">
              <div class="sd-incl-top" :class="colorClass">
                <span class="sd-incl-ico" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      v-for="d in iconPaths(service.icon)"
                      :key="d"
                      :d="d"
                    />
                  </svg>
                </span>
                <h3>What's included</h3>
              </div>
              <ul>
                <li v-for="item in includes" :key="item">{{ item }}</li>
              </ul>
            </div>

            <div class="sd-help">
              <h3>Not sure if this fits you?</h3>
              <p>
                Start with a free profile assessment. A counsellor will tell you
                honestly what your next step should be.
              </p>
              <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a class="sd-call" href="tel:+8801911878274"
                >Or call 01911 878 274</a
              >
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ================= OTHER SERVICES ================= -->
    <section
      v-if="others.length"
      class="svp-section"
      aria-labelledby="sd-more-h"
    >
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>More support</span>
        <h2 id="sd-more-h" class="svp-h2">
          Other Services <span>You May Need</span>
        </h2>
        <div class="svp-next">
          <NuxtLink
            v-for="o in others"
            :key="o.slug"
            :to="`/service-details/${o.slug}`"
          >
            <h3>{{ o.name }}</h3>
            <p v-if="o.tagline">{{ o.tagline }}</p>
            <span>Learn more &rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="sd-cta-h">
      <div class="svp-container">
        <h2 id="sd-cta-h">Ready to Start Your Study Abroad Journey?</h2>
        <p>
          Start with a free profile assessment. A Sunrise counsellor will review
          your results, budget and goals and tell you honestly what your next
          step should be.
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
</template>

<script setup>
const siteUrl = "https://sunrise-bd.net/";
const brand = "Sunrise Education Consultants";
const route = useRoute();
const slug = String(route.params.slug);
const pageUrl = `${siteUrl}service-details/${slug}`;

/* ---------- Data ---------- */
const { data, pending, error, refresh } = await useApi(`/service-details/${slug}`, {
  key: `service-${slug}`,
  transform: (res) => res.data,
});

// Real 404 for a slug that does not exist
if (
  !data.value &&
  error.value &&
  (error.value.statusCode === 404 || error.value.status === 404)
) {
  throw createError({
    statusCode: 404,
    statusMessage: "Service not found",
    fatal: true,
  });
}

const service = computed(() => data.value || null);

// Same key as the header, so Nuxt reuses the cached list
const { data: allData } = await useApi("/services", {
  key: "services-list",
  transform: (res) => res.data,
});
const others = computed(() =>
  (allData.value || [])
    .filter((s) => s.slug !== slug)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .slice(0, 3),
);

/* ---------- View helpers ---------- */
const body = computed(
  () => service.value?.description || service.value?.overview || "",
);
const includes = computed(() =>
  (service.value?.includes || []).filter(Boolean),
);

const FACT_LABELS = [
  ["best_for", "Best for"],
  ["timing", "When to start"],
  ["outcome", "You get"],
  ["bring", "Bring"],
  ["official_bodies", "Official bodies"],
];
const factRows = computed(() => {
  const f = service.value?.facts || {};
  return FACT_LABELS.filter(([k]) => f[k]).map(([k, label]) => ({
    label,
    value: f[k],
  }));
});

const COLORS = ["navy", "blue", "green", "orange"];
const colorClass = computed(() => {
  const c = String(service.value?.color || "").toLowerCase();
  return `g-${COLORS.includes(c) ? c : "blue"}`;
});

const ICONS = {
  document: [
    "M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    "M8 8h8M8 12h8M8 16h5",
  ],
  graduation: ["m12 3 10 5-10 5L2 8l10-5Z", "M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"],
  home: ["M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"],
  plane: ["M2 16h20M6 16l3-9 3 5 3-3 3 7"],
  briefcase: [
    "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
    "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  ],
};
const ICON_ALIAS = {
  accommodation: "home",
  housing: "home",
  travel: "plane",
  departure: "plane",
  flight: "plane",
  work: "briefcase",
  career: "briefcase",
  job: "briefcase",
  university: "graduation",
  admission: "graduation",
  visa: "document",
};
const iconPaths = (name) => {
  const key = String(name || "").toLowerCase();
  return ICONS[key] || ICONS[ICON_ALIAS[key]] || ICONS.document;
};

const stripHtml = (h) =>
  (h || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* ---------- SEO ---------- */
const seoTitle = computed(
  () =>
    service.value?.seo?.meta_title ||
    service.value?.seo?.page_title ||
    (service.value
      ? `${service.value.name} | ${brand}`
      : `Services | ${brand}`),
);
const seoDesc = computed(
  () =>
    service.value?.seo?.meta_description ||
    service.value?.tagline ||
    stripHtml(service.value?.summary || body.value).slice(0, 155) ||
    `Study abroad services from ${brand} for Bangladeshi students.`,
);

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  keywords: () => service.value?.seo?.meta_keywords || undefined,
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogImage: () => service.value?.image || undefined,
  ogUrl: pageUrl,
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

const jsonLd = computed(() => {
  const s = service.value;
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${siteUrl}services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: s?.name || "Service",
          item: pageUrl,
        },
      ],
    },
  ];
  if (s) {
    graph.push({
      "@type": "Service",
      name: s.name,
      description: seoDesc.value,
      url: pageUrl,
      image: s.image || undefined,
      serviceType: s.badge || undefined,
      areaServed: { "@type": "Country", name: "Bangladesh" },
      provider: {
        "@type": "EducationalOrganization",
        name: brand,
        url: siteUrl,
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
.sd-msg {
  text-align: center;
  padding: 40px 0;
  color: var(--sec-slate);
}

/* At a glance (inside .svp-answer) */
.sd-facts {
  margin: 0;
  display: grid;
  gap: 8px;
}
.sd-facts div {
  display: grid;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--sec-offwhite);
}
.sd-facts dt {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sec-slate);
}
.sd-facts dd {
  margin: 0;
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.5;
  color: var(--sec-navy);
}

/* Layout */
.sd-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 40px;
  align-items: start;
}
.sd-main {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 36px 40px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}
.sd-fig {
  margin: 0 0 30px;
  border-radius: 14px;
  overflow: hidden;
  background: var(--sec-gold-bg);
}
.sd-fig img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.sd-prose {
  max-width: 70ch;
  font-size: 16.5px;
  line-height: 1.9;
  color: #475467;
}
.sd-prose :deep(p) {
  margin: 0 0 18px;
}
.sd-prose :deep(p:first-child) {
  font-size: 18.5px;
  line-height: 1.8;
  font-weight: 600;
  color: var(--sec-navy);
}
.sd-prose :deep(h2),
.sd-prose :deep(h3) {
  margin: 28px 0 10px;
  font-size: 21px;
  line-height: 1.3;
  font-weight: 800;
  color: var(--sec-navy);
}
.sd-prose :deep(ul),
.sd-prose :deep(ol) {
  margin: 0 0 18px;
  padding-left: 22px;
}
.sd-prose :deep(li) {
  margin-bottom: 8px;
}
.sd-prose :deep(strong) {
  color: var(--sec-navy);
}
.sd-prose :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* Sidebar */
.sd-side {
  position: sticky;
  top: 110px;
  display: grid;
  gap: 20px;
}
.sd-incl {
  scroll-margin-top: 110px;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}
.sd-incl-top {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  color: #fff;
}
.sd-incl-top::after {
  content: "";
  position: absolute;
  right: -60px;
  top: -60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.12) 0 8deg,
    transparent 8deg 22deg
  );
}
.sd-incl-ico {
  position: relative;
  z-index: 1;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.16);
  display: grid;
  place-items: center;
  flex: none;
}
.sd-incl-ico svg {
  width: 22px;
  height: 22px;
}
.sd-incl-top h3 {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 19px;
  font-weight: 800;
}
.sd-incl ul {
  margin: 0;
  padding: 18px 22px 22px;
  list-style: none;
  display: grid;
  gap: 4px;
}
.sd-incl li {
  position: relative;
  padding: 9px 4px 9px 30px;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sec-navy);
  border-bottom: 1px solid var(--sec-line);
}
.sd-incl li:last-child {
  border-bottom: 0;
}
.sd-incl li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 11px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(47, 168, 79, 0.14);
}
.sd-incl li::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 15px;
  width: 4px;
  height: 8px;
  border: solid var(--sec-green-dk);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.sd-help {
  background: var(--sec-gold-bg);
  border: 1px solid #eadfbb;
  border-radius: 16px;
  padding: 24px;
}
.sd-help h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 800;
  color: var(--sec-navy);
}
.sd-help p {
  margin: 0 0 16px;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--sec-slate);
}
.sd-help .svp-btn {
  width: 100%;
  justify-content: center;
}
.sd-call {
  display: block;
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: var(--sec-green-dk);
  text-decoration: none;
}
.sd-call:hover {
  text-decoration: underline;
}

@media (max-width: 1100px) {
  .sd-grid {
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 28px;
  }
  .sd-main {
    padding: 30px 28px;
  }
}
@media (max-width: 900px) {
  .sd-grid {
    grid-template-columns: 1fr;
  }
  .sd-side {
    position: static;
  }
}
@media (max-width: 640px) {
  .sd-main {
    padding: 24px 18px;
  }
  .sd-prose {
    font-size: 15.5px;
  }
  .sd-prose :deep(p:first-child) {
    font-size: 17px;
  }
}
</style>
