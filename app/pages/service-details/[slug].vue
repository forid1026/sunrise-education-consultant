<template>
  <main v-if="service" ref="root" class="sdp" :style="{ '--c': accent }">
    <!-- ================= HERO ================= -->
    <section class="sdp-hero">
      <div class="sdp-mesh" aria-hidden="true"></div>
      <div class="sdp-wrap">
        <nav class="sdp-crumbs" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <NuxtLink to="/services">Services</NuxtLink><span>/</span>
          <b>{{ service.name }}</b>
        </nav>

        <div class="sdp-hero-grid">
          <div class="sdp-hero-text">
            <span v-if="service.badge" class="sdp-badge"
              ><i></i>{{ service.badge }}</span
            >
            <h1 class="sdp-h1">{{ service.name }}</h1>
            <p v-if="service.tagline" class="sdp-tagline">
              {{ service.tagline }}
            </p>
            <p v-if="service.summary" class="sdp-summary">
              {{ service.summary }}
            </p>

            <div class="sdp-actions">
              <NuxtLink to="/apply-now" class="sdp-btn sdp-btn-white">
                Get Free Assessment <span aria-hidden="true">&rarr;</span>
              </NuxtLink>
              <a href="tel:+8801911878274" class="sdp-btn sdp-btn-glass">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"
                  />
                </svg>
                01911 878 274
              </a>
            </div>

            <ul class="sdp-trust">
              <li><i>&#10003;</i>Free first assessment</li>
              <li><i>&#10003;</i>Dhaka &amp; Sylhet offices</li>
              <li><i>&#10003;</i>Since 2014</li>
            </ul>
          </div>

          <div class="sdp-hero-art">
            <div class="sdp-glass">
              <img
                v-if="service.image"
                :src="service.image"
                :alt="service.image_alt || service.name"
              />
              <span
                v-else
                class="sdp-hero-ico"
                aria-hidden="true"
                v-html="icon"
              ></span>
            </div>
            <span class="sdp-chip sdp-chip-a"><b>Free</b> profile check</span>
            <span v-if="service.facts?.timing" class="sdp-chip sdp-chip-b">{{
              service.facts.timing
            }}</span>
          </div>
        </div>
      </div>
      <svg
        class="sdp-wave"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 60V30C240 0 480 0 720 20s480 30 720 5v35Z" fill="#fff" />
      </svg>
    </section>

    <!-- ================= QUICK FACTS ================= -->
    <section v-if="facts.length" class="sdp-facts-sec">
      <div class="sdp-wrap">
        <dl class="sdp-facts">
          <div v-for="f in facts" :key="f.label" class="sdp-fact sdp-reveal">
            <span
              class="sdp-fact-ico"
              aria-hidden="true"
              v-html="f.icon"
            ></span>
            <div>
              <dt>{{ f.label }}</dt>
              <dd>{{ f.value }}</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>

    <!-- ================= CONTENT ================= -->
    <section class="sdp-body">
      <div class="sdp-wrap sdp-body-grid">
        <div class="sdp-main">
          <article class="sdp-card sdp-article sdp-reveal">
            <span class="sdp-eyebrow"><i></i>About this service</span>
            <h2 class="sdp-h2">How {{ service.name }} works</h2>

            <div
              v-if="contentHtml"
              class="sdp-prose"
              @click="onProseClick"
              v-html="contentHtml"
            ></div>
            <p v-else class="sdp-muted">Details will be added soon.</p>
          </article>

          <!-- Included -->
          <article v-if="service.includes?.length" class="sdp-card sdp-reveal">
            <span class="sdp-eyebrow"><i></i>Included</span>
            <h2 class="sdp-h2">What's included</h2>
            <ul class="sdp-incl">
              <li v-for="(item, i) in service.includes" :key="item">
                <span class="sdp-incl-n">{{
                  String(i + 1).padStart(2, "0")
                }}</span>
                <span class="sdp-incl-t">{{ item }}</span>
                <i class="sdp-incl-ok" aria-hidden="true">&#10003;</i>
              </li>
            </ul>
          </article>

          <!-- Steps -->
          <article class="sdp-card sdp-reveal">
            <span class="sdp-eyebrow"><i></i>Process</span>
            <h2 class="sdp-h2">How we work with you</h2>
            <ol class="sdp-steps">
              <li v-for="(st, i) in steps" :key="st.h">
                <span class="sdp-step-n">{{ i + 1 }}</span>
                <div>
                  <h3>{{ st.h }}</h3>
                  <p>{{ st.p }}</p>
                </div>
              </li>
            </ol>
          </article>

          <!-- FAQ -->
          <article class="sdp-card sdp-reveal" v-if="faqs.length">
            <span class="sdp-eyebrow"><i></i>FAQ</span>
            <h2 class="sdp-h2">Common questions</h2>
            <div class="sdp-faq">
              <details v-for="(f, i) in faqs" :key="f.q" :open="i === 0">
                <summary>{{ f.q }}</summary>
                <p>{{ f.a }}</p>
              </details>
            </div>
          </article>
        </div>

        <aside class="sdp-side">
          <div class="sdp-card sdp-cta-card">
            <div class="sdp-cta-top">
              <span class="sdp-cta-ico" aria-hidden="true" v-html="icon"></span>
              <h3>Start with a free assessment</h3>
              <p>
                A counsellor reviews your results, budget and goals and tells
                you honestly what to do next.
              </p>
            </div>
            <div class="sdp-cta-body">
              <NuxtLink
                to="/apply-now"
                class="sdp-btn sdp-btn-primary sdp-btn-block"
              >
                Get Free Assessment <span aria-hidden="true">&rarr;</span>
              </NuxtLink>
              <a
                href="tel:+8801911878274"
                class="sdp-btn sdp-btn-line sdp-btn-block"
                >Call 01911 878 274</a
              >
              <ul class="sdp-mini-list">
                <li><i>&#10003;</i>No obligation</li>
                <li>
                  <i>&#10003;</i>Banani, Dhaka &middot; Sylhet &middot; Online
                </li>
                <li><i>&#10003;</i>Written checklist for your country</li>
              </ul>
            </div>
          </div>

          <div v-if="others.length" class="sdp-card sdp-more-card">
            <h3>Other services</h3>
            <ul>
              <li v-for="o in others" :key="o.slug">
                <NuxtLink
                  :to="`/service-details/${o.slug}`"
                  :style="{ '--c': colors[o.color] || colors.navy }"
                >
                  <span class="sdp-dot"></span>{{ o.name }}<em>&rarr;</em>
                </NuxtLink>
              </li>
            </ul>
            <NuxtLink to="/services" class="sdp-link"
              >See all services &rarr;</NuxtLink
            >
          </div>
        </aside>
      </div>
    </section>

    <!-- ================= OTHER SERVICES ================= -->
    <section v-if="others.length" class="sdp-others">
      <div class="sdp-wrap">
        <div class="sdp-others-head">
          <div>
            <span class="sdp-eyebrow"><i></i>Keep exploring</span>
            <h2 class="sdp-h2">More ways we can help</h2>
          </div>
          <NuxtLink to="/services" class="sdp-link">View all &rarr;</NuxtLink>
        </div>
        <div class="sdp-others-grid">
          <NuxtLink
            v-for="o in others.slice(0, 3)"
            :key="o.slug"
            :to="`/service-details/${o.slug}`"
            class="sdp-mini sdp-reveal"
            :style="{ '--c': colors[o.color] || colors.navy }"
          >
            <span
              class="sdp-mini-ico"
              v-html="serviceIcons[o.icon] || serviceIcons.document"
            ></span>
            <h3>{{ o.name }}</h3>
            <p>{{ o.tagline || o.summary }}</p>
            <span class="sdp-mini-link">Learn more <i>&rarr;</i></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="sdp-cta">
      <div class="sdp-wrap sdp-cta-inner">
        <h2>Ready to Start Your Study Abroad Journey?</h2>
        <p>
          Free consultation, no obligation. Sunrise Education Consultants is
          ready to help.
        </p>
        <div class="sdp-actions sdp-center">
          <NuxtLink to="/apply-now" class="sdp-btn sdp-btn-white">
            Book a Free Consultation <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
          <a href="tel:+8801911878274" class="sdp-btn sdp-btn-glass"
            >Call 01911 878 274</a
          >
        </div>
      </div>
    </section>

    <!-- Mobile sticky bar -->
    <div class="sdp-sticky">
      <a href="tel:+8801911878274" class="sdp-btn sdp-btn-line">Call</a>
      <NuxtLink to="/apply-now" class="sdp-btn sdp-btn-primary"
        >Free Assessment &rarr;</NuxtLink
      >
    </div>
  </main>
</template>

<script setup>
/* ---------- Load FAQs from the API ---------- */
// import { faqs as allFaqs } from "~/data/servicesPage";
const { data: faqs } = await useApi("/faqs", {
  key: "faqs-services",
  query: { group: "services" },
  transform: (res) => res.data,
})

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const root = ref(null);

const siteUrl = "https://sunrise-bd.net/";
const brand = "Sunrise Education Consultants";

/* ---------- Data ---------- */
const { data: service } = await useApi(`/service-details/${slug}`, {
  key: `service-${slug}`,
  transform: (res) => res.data,
});

if (!service.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Service not found",
    fatal: true,
  });
}

// Same key as the services page, so the list is cached.
const { data: all } = await useApi("/services", {
  key: "services-list",
  transform: (res) => res.data,
});

const others = computed(() => (all.value || []).filter((s) => s.slug !== slug));

/* ---------- Appearance ---------- */
const colors = {
  navy: "#1f3a5f",
  blue: "#2563eb",
  green: "#16803c",
  orange: "#ea7a1a",
};
const accent = computed(() => colors[service.value.color] || colors.navy);
const icon = computed(
  () => serviceIcons[service.value.icon] || serviceIcons.document,
);

/* ---------- Quick facts (with icons) ---------- */
const svg = (inner) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

const factIcons = {
  best: svg(
    '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
  ),
  when: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  leave: svg('<path d="M20 6 9 17l-5-5"/>'),
  bring: svg(
    '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  ),
  bodies: svg('<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/>'),
};

const facts = computed(() => {
  const f = service.value.facts || {};
  return [
    { label: "Best for", value: f.best_for, icon: factIcons.best },
    { label: "When you need it", value: f.timing, icon: factIcons.when },
    { label: "You leave with", value: f.outcome, icon: factIcons.leave },
    { label: "What you bring", value: f.bring, icon: factIcons.bring },
    {
      label: "Official bodies",
      value: f.official_bodies,
      icon: factIcons.bodies,
    },
  ].filter((x) => x.value);
});

/* ---------- Static: process + FAQ ---------- */
const steps = [
  {
    h: "Free profile assessment",
    p: "We review your results, budget and goals and tell you honestly what is realistic.",
  },
  {
    h: "Written plan and checklist",
    p: "You get a clear checklist for your country, embassy and university.",
  },
  {
    h: "We prepare and follow up",
    p: "Your counsellor checks every document and follows each application until a decision.",
  },
  {
    h: "You move forward with confidence",
    p: "Interview practice, pre-departure briefing and support after you arrive.",
  },
];

const faqList = faqs.value.slice(0, 4);

/* ---------- Content: full description first, overview as a fallback ---------- */
const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const toHtml = (text) => {
  const t = (text || "").trim();
  if (!t) return "";
  if (/<\/?[a-z][\s\S]*>/i.test(t)) return t;
  return t
    .split(/\r?\n\s*\r?\n/)
    .map((p) => `<p>${escapeHtml(p).replace(/\r?\n/g, "<br>")}</p>`)
    .join("");
};

const contentHtml = computed(
  () =>
    toHtml(service.value.description) ||
    toHtml(service.value.overview) ||
    toHtml(service.value.summary),
);

/* ---------- Internal links inside rich text should not reload the page ---------- */
const onProseClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  const a = e.target.closest("a");
  const href = a?.getAttribute("href");
  if (href && href.startsWith("/") && !href.startsWith("//") && !a.target) {
    e.preventDefault();
    router.push(href);
  }
};

/* ---------- SEO ---------- */
const pageUrl = `${siteUrl}service-details/${slug}`;
const seoTitle = computed(
  () =>
    service.value.seo?.meta_title ||
    `${service.value.name} for Bangladeshi Students | ${brand}`,
);
const seoDesc = computed(
  () =>
    service.value.seo?.meta_description ||
    service.value.summary ||
    service.value.tagline ||
    `${service.value.name} by ${brand}, Dhaka and Sylhet.`,
);

useSeoMeta({
  title: seoTitle,
  description: seoDesc,
  keywords: () => service.value.seo?.meta_keywords || "",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: seoTitle,
  ogDescription: seoDesc,
  ogUrl: pageUrl,
  ogImage: () => service.value.image || "",
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
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
                name: service.value.name,
                item: pageUrl,
              },
            ],
          },
          {
            "@type": "Service",
            "@id": `${pageUrl}#service`,
            name: service.value.name,
            serviceType: service.value.name,
            url: pageUrl,
            description: seoDesc.value,
            image: service.value.image || undefined,
            provider: {
              "@type": "EducationalOrganization",
              name: brand,
              url: siteUrl,
            },
            areaServed: { "@type": "Country", name: "Bangladesh" },
          },
          {
            "@type": "FAQPage",
            mainEntity: faqList.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ],
      }),
    },
  ],
});

/* ---------- Reveal on scroll ---------- */
let io = null;
onMounted(() => {
  const el = root.value;
  if (!el) return;
  if (!("IntersectionObserver" in window)) return;
  el.classList.add("sdp-js");
  io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.08 },
  );
  el.querySelectorAll(".sdp-reveal").forEach((n, i) => {
    n.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(n);
  });
});
onBeforeUnmount(() => io?.disconnect());
</script>

<style scoped>
.sdp {
  --c: #1f3a5f;
  --ink: #14231a;
  --mute: #5d6b62;
  --line: #e8e1d0;
  --cream: #fdf5e6;
  font-family: "Manrope", system-ui, sans-serif;
  color: var(--ink);
  overflow-x: clip;
}
.sdp-wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}
.sdp-center {
  justify-content: center;
}

/* ---------- Hero ---------- */
.sdp-hero {
  position: relative;
  overflow: hidden;
  color: #fff;
  padding: 28px 0 110px;
  background: linear-gradient(
    125deg,
    var(--c),
    color-mix(in srgb, var(--c) 60%, #000)
  );
}
.sdp-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(
      520px 320px at 88% 8%,
      rgba(255, 255, 255, 0.16),
      transparent 70%
    ),
    radial-gradient(
      420px 300px at 6% 96%,
      rgba(255, 255, 255, 0.1),
      transparent 70%
    ),
    repeating-linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.035) 0 2px,
      transparent 2px 22px
    );
}
.sdp-hero .sdp-wrap {
  position: relative;
  z-index: 1;
}
.sdp-wave {
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 60px;
  display: block;
}

.sdp-crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 38px;
}
.sdp-crumbs a {
  color: #fff;
  text-decoration: none;
  opacity: 0.8;
}
.sdp-crumbs a:hover {
  opacity: 1;
  text-decoration: underline;
}
.sdp-crumbs span {
  opacity: 0.5;
}
.sdp-crumbs b {
  font-weight: 700;
}

.sdp-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 56px;
  align-items: center;
}
.sdp-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 12.5px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
}
.sdp-badge i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.25);
}
.sdp-h1 {
  margin: 18px 0 12px;
  font-size: clamp(32px, 4.6vw, 54px);
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 800;
}
.sdp-tagline {
  margin: 0 0 14px;
  font-size: 20px;
  font-weight: 600;
  opacity: 0.95;
}
.sdp-summary {
  margin: 0 0 30px;
  font-size: 16px;
  line-height: 1.75;
  opacity: 0.88;
  max-width: 60ch;
}
.sdp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.sdp-trust {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  font-size: 13.5px;
  font-weight: 600;
  opacity: 0.92;
}
.sdp-trust li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sdp-trust i {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-style: normal;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.2);
}

.sdp-hero-art {
  position: relative;
}
.sdp-glass {
  aspect-ratio: 1 / 1;
  border-radius: 32px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0.06)
  );
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  box-shadow: 0 40px 60px -30px rgba(0, 0, 0, 0.5);
  transform: rotate(2deg);
}
.sdp-glass img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.sdp-hero-ico {
  width: 40%;
  display: block;
  color: #fff;
}
.sdp-hero-ico :deep(svg) {
  width: 100%;
  height: auto;
  stroke-width: 1.5;
}
.sdp-chip {
  position: absolute;
  background: #fff;
  color: var(--ink);
  padding: 10px 16px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 18px 30px -14px rgba(0, 0, 0, 0.4);
  animation: sdpFloat 5s ease-in-out infinite;
}
.sdp-chip b {
  color: var(--c);
}
.sdp-chip-a {
  left: -22px;
  top: 36px;
}
.sdp-chip-b {
  right: -10px;
  bottom: 34px;
  animation-delay: -2.5s;
  max-width: 220px;
}
@keyframes sdpFloat {
  50% {
    transform: translateY(-8px);
  }
}

/* ---------- Buttons ---------- */
.sdp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 50px;
  padding: 0 26px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition:
    transform 0.15s,
    background 0.15s,
    box-shadow 0.15s;
}
.sdp-btn svg {
  width: 17px;
  height: 17px;
}
.sdp-btn:hover {
  transform: translateY(-2px);
}
.sdp-btn-white {
  background: #fff;
  color: var(--c);
  box-shadow: 0 14px 26px -14px rgba(0, 0, 0, 0.5);
}
.sdp-btn-glass {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(6px);
}
.sdp-btn-glass:hover {
  background: rgba(255, 255, 255, 0.24);
}
.sdp-btn-primary {
  background: var(--c);
  color: #fff;
  box-shadow: 0 14px 24px -12px var(--c);
}
.sdp-btn-line {
  background: #fff;
  color: var(--ink);
  border-color: var(--line);
}
.sdp-btn-line:hover {
  border-color: var(--c);
  color: var(--c);
}
.sdp-btn-block {
  width: 100%;
}

/* ---------- Facts ---------- */
.sdp-facts-sec {
  margin-top: -62px;
  position: relative;
  z-index: 2;
}
.sdp-facts {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
}
.sdp-fact {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px 18px;
  box-shadow: 0 22px 36px -28px rgba(20, 35, 26, 0.5);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.sdp-fact:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 40px -26px var(--c);
}
.sdp-fact-ico {
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--c) 13%, transparent);
  color: var(--c);
}
.sdp-fact-ico :deep(svg) {
  width: 20px;
  height: 20px;
}
.sdp-fact dt {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--c);
  margin-bottom: 4px;
}
.sdp-fact dd {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.5;
  font-weight: 600;
}

/* ---------- Body ---------- */
.sdp-body {
  padding: 56px 0 72px;
  background: #fff;
}
.sdp-body-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 350px;
  gap: 32px;
  align-items: start;
}
.sdp-main {
  display: grid;
  gap: 24px;
}
.sdp-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 34px;
  box-shadow: 0 20px 40px -32px rgba(20, 35, 26, 0.45);
}
.sdp-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 99px;
  background: var(--cream);
  border: 1px solid var(--line);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--c);
}
.sdp-eyebrow i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c);
}
.sdp-h2 {
  margin: 14px 0 20px;
  font-size: 28px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 800;
}
.sdp-muted {
  color: var(--mute);
  margin: 0;
  line-height: 1.6;
}

.sdp-prose {
  font-size: 16.5px;
  line-height: 1.85;
  color: #2c3a31;
}
.sdp-prose :deep(p) {
  margin: 0 0 18px;
}
.sdp-prose :deep(h2),
.sdp-prose :deep(h3) {
  margin: 30px 0 12px;
  letter-spacing: -0.01em;
  color: var(--ink);
  line-height: 1.3;
  padding-left: 14px;
  border-left: 4px solid var(--c);
}
.sdp-prose :deep(ul),
.sdp-prose :deep(ol) {
  padding-left: 22px;
  margin: 0 0 18px;
}
.sdp-prose :deep(li) {
  margin-bottom: 8px;
}
.sdp-prose :deep(li::marker) {
  color: var(--c);
  font-weight: 800;
}
.sdp-prose :deep(a) {
  color: var(--c);
  font-weight: 700;
  text-underline-offset: 3px;
}
.sdp-prose :deep(blockquote) {
  margin: 0 0 18px;
  padding: 16px 20px;
  border-radius: 14px;
  background: var(--cream);
  border-left: 4px solid var(--c);
}
.sdp-prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 16px;
}
.sdp-prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 18px;
  font-size: 15px;
}
.sdp-prose :deep(th),
.sdp-prose :deep(td) {
  border: 1px solid var(--line);
  padding: 10px 12px;
  text-align: left;
}
.sdp-prose :deep(th) {
  background: var(--cream);
}

/* Included */
.sdp-incl {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.sdp-incl li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 16px;
  background: var(--cream);
  border: 1px solid var(--line);
  transition:
    transform 0.15s,
    border-color 0.15s;
}
.sdp-incl li:hover {
  transform: translateY(-2px);
  border-color: var(--c);
}
.sdp-incl-n {
  flex: none;
  font-size: 13px;
  font-weight: 800;
  color: var(--c);
  opacity: 0.85;
}
.sdp-incl-t {
  flex: 1;
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.45;
}
.sdp-incl-ok {
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-style: normal;
  font-size: 12px;
  font-weight: 800;
  background: var(--c);
  color: #fff;
}

/* Steps */
.sdp-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
  position: relative;
}
.sdp-steps li {
  display: flex;
  gap: 18px;
  padding-bottom: 26px;
  position: relative;
}
.sdp-steps li:last-child {
  padding-bottom: 0;
}
.sdp-steps li:not(:last-child)::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 44px;
  bottom: 4px;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    var(--line) 0 6px,
    transparent 6px 12px
  );
}
.sdp-step-n {
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #fff;
  background: var(--c);
  box-shadow: 0 10px 18px -8px var(--c);
  position: relative;
  z-index: 1;
}
.sdp-steps h3 {
  margin: 6px 0 4px;
  font-size: 17px;
  font-weight: 800;
}
.sdp-steps p {
  margin: 0;
  color: var(--mute);
  font-size: 15px;
  line-height: 1.65;
}

/* FAQ */
.sdp-faq {
  display: grid;
  gap: 10px;
}
.sdp-faq details {
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.sdp-faq details[open] {
  border-color: var(--c);
  box-shadow: 0 14px 26px -22px var(--c);
}
.sdp-faq summary {
  cursor: pointer;
  list-style: none;
  padding: 16px 52px 16px 20px;
  font-weight: 700;
  font-size: 15.5px;
  position: relative;
}
.sdp-faq summary::-webkit-details-marker {
  display: none;
}
.sdp-faq summary::after {
  content: "+";
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 18px;
  color: var(--c);
  background: color-mix(in srgb, var(--c) 12%, transparent);
}
.sdp-faq details[open] summary::after {
  content: "\2212";
}
.sdp-faq p {
  margin: 0;
  padding: 0 20px 18px;
  color: var(--mute);
  line-height: 1.7;
  font-size: 15px;
}

/* ---------- Sidebar ---------- */
.sdp-side {
  position: sticky;
  top: 90px;
  display: grid;
  gap: 20px;
}
.sdp-cta-card {
  padding: 0;
  overflow: hidden;
}
.sdp-cta-top {
  padding: 26px 26px 22px;
  color: #fff;
  background: linear-gradient(
    135deg,
    var(--c),
    color-mix(in srgb, var(--c) 60%, #000)
  );
}
.sdp-cta-ico {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  background: rgba(255, 255, 255, 0.18);
}
.sdp-cta-ico :deep(svg) {
  width: 23px;
  height: 23px;
}
.sdp-cta-top h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.25;
}
.sdp-cta-top p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.9;
}
.sdp-cta-body {
  padding: 22px 26px 26px;
  display: grid;
  gap: 12px;
}
.sdp-mini-list {
  list-style: none;
  margin: 6px 0 0;
  padding: 0;
  display: grid;
  gap: 10px;
  font-size: 13.5px;
  color: var(--mute);
}
.sdp-mini-list li {
  display: flex;
  gap: 10px;
  align-items: center;
}
.sdp-mini-list i {
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-style: normal;
  font-size: 10px;
  font-weight: 800;
  background: color-mix(in srgb, var(--c) 14%, transparent);
  color: var(--c);
}

.sdp-more-card {
  padding: 24px;
}
.sdp-more-card h3 {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 800;
}
.sdp-more-card ul {
  list-style: none;
  margin: 0 0 12px;
  padding: 0;
  display: grid;
  gap: 4px;
}
.sdp-more-card li a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  border-radius: 12px;
  color: var(--ink);
  font-weight: 600;
  font-size: 14.5px;
  text-decoration: none;
  transition: background 0.15s;
}
.sdp-more-card li a:hover {
  background: var(--cream);
}
.sdp-more-card li a em {
  margin-left: auto;
  font-style: normal;
  color: var(--c);
  opacity: 0;
  transition:
    opacity 0.15s,
    transform 0.15s;
}
.sdp-more-card li a:hover em {
  opacity: 1;
  transform: translateX(3px);
}
.sdp-dot {
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c);
}
.sdp-link {
  color: var(--c);
  font-weight: 700;
  text-decoration: none;
}
.sdp-link:hover {
  text-decoration: underline;
}

/* ---------- Other services ---------- */
.sdp-others {
  padding: 68px 0;
  background: var(--cream);
  border-top: 1px solid var(--line);
}
.sdp-others-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 28px;
}
.sdp-others-head .sdp-h2 {
  margin: 12px 0 0;
}
.sdp-others-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.sdp-mini {
  position: relative;
  display: block;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 28px 26px;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
}
.sdp-mini::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: var(--c);
}
.sdp-mini:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 38px -26px var(--c);
  border-color: color-mix(in srgb, var(--c) 40%, var(--line));
}
.sdp-mini-ico {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  background: color-mix(in srgb, var(--c) 14%, transparent);
  color: var(--c);
}
.sdp-mini-ico :deep(svg) {
  width: 25px;
  height: 25px;
}
.sdp-mini h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.3;
}
.sdp-mini p {
  margin: 0 0 18px;
  color: var(--mute);
  font-size: 14.5px;
  line-height: 1.6;
}
.sdp-mini-link {
  color: var(--c);
  font-weight: 700;
  font-size: 14px;
}
.sdp-mini-link i {
  font-style: normal;
  display: inline-block;
  transition: transform 0.15s;
}
.sdp-mini:hover .sdp-mini-link i {
  transform: translateX(4px);
}

/* ---------- CTA ---------- */
.sdp-cta {
  position: relative;
  overflow: hidden;
  color: #fff;
  padding: 72px 0;
  text-align: center;
  background: linear-gradient(120deg, #136f33, #1b8f43);
}
.sdp-cta::before {
  content: "";
  position: absolute;
  width: 380px;
  height: 380px;
  right: -100px;
  top: -160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}
.sdp-cta-inner {
  position: relative;
}
.sdp-cta h2 {
  margin: 0 0 12px;
  font-size: clamp(26px, 3.6vw, 40px);
  letter-spacing: -0.02em;
  font-weight: 800;
}
.sdp-cta p {
  margin: 0 0 28px;
  opacity: 0.92;
}
.sdp-cta .sdp-btn-white {
  color: #136f33;
}

/* ---------- Mobile sticky bar ---------- */
.sdp-sticky {
  display: none;
}

/* ---------- Reveal ---------- */
.sdp-js .sdp-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.55s ease,
    transform 0.55s ease;
}
.sdp-js .sdp-reveal.is-in {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .sdp-chip {
    animation: none;
  }
  .sdp-js .sdp-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ---------- Responsive ---------- */
@media (max-width: 980px) {
  .sdp-hero {
    padding-bottom: 100px;
  }
  .sdp-hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sdp-hero-art {
    max-width: 300px;
    margin: 0 auto;
  }
  .sdp-chip-a {
    left: -10px;
  }
  .sdp-chip-b {
    right: -6px;
  }
  .sdp-body-grid {
    grid-template-columns: 1fr;
  }
  .sdp-side {
    position: static;
  }
  .sdp-others-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .sdp-card {
    padding: 22px;
    border-radius: 20px;
  }
  .sdp-h2 {
    font-size: 24px;
  }
  .sdp-incl {
    grid-template-columns: 1fr;
  }
  .sdp-others-grid {
    grid-template-columns: 1fr;
  }
  .sdp-others-head {
    flex-direction: column;
    align-items: flex-start;
  }
  .sdp-actions .sdp-btn {
    flex: 1 1 100%;
  }
  .sdp-main {
    padding-bottom: 0;
  }
  .sdp-sticky {
    display: flex;
    gap: 10px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(10px);
    border-top: 1px solid var(--line);
  }
  .sdp-sticky .sdp-btn {
    height: 46px;
    flex: 1;
    padding: 0 14px;
  }
  .sdp-sticky .sdp-btn-primary {
    flex: 2;
  }
  .sdp-cta {
    padding-bottom: 96px;
  }
}
</style>
