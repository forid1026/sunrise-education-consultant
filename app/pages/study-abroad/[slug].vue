<script setup>
const SITE = "Sunrise Education Consultants";
const SITE_URL = (
  useRuntimeConfig().public.siteUrl || useRequestURL().origin
).replace(/\/$/, "");
const PHONE_LABEL = "Call 01911 878 274";
const PHONE_URL = "tel:+8801911878274";

definePageMeta({ key: (r) => r.fullPath });

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const NuxtLink = resolveComponent("NuxtLink");

const { data: abroad } = await useApi(`/study-abroad/${slug}`, {
  key: `abroad-${slug}`,
  transform: (res) => res.data,
});

if (!abroad.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const d = computed(() => abroad.value);

/* ---------- helpers ---------- */
const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

// Turns [label](url) into a link. Own-site links become internal paths,
// which the click handler in onMounted opens with the router (no page reload).
const rich = (t) =>
  esc(t).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, url) => {
    url = url.replace(/&amp;/g, "&").replace(/^\/(https?:\/\/)/, "$1");
    url = url.replace(/^https?:\/\/(?:www\.)?sunrise-bd\.net(?=\/|$)/i, "");
    if (url.startsWith(SITE_URL)) url = url.slice(SITE_URL.length);
    if (url === "") url = "/";
    if (!/^(\/|#|https?:\/\/)/.test(url)) return label;
    const ext = /^https?:/.test(url);
    return `<a class="sdp-rl" href="${esc(url)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${label.trim()}</a>`;
  });

const paras = (t) =>
  String(t || "")
    .split(/\r?\n\s*\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
const plain = (t) =>
  String(t || "")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
const bodyHtml = (t) =>
  /<[a-z][\s\S]*>/i.test(t || "")
    ? t
    : paras(t)
        .map((p) => `<p>${rich(p)}</p>`)
        .join("");
const initials = (n) =>
  String(n || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
const isWhite = (c) => ["#fff", "#ffffff"].includes(String(c).toLowerCase());
const accent = (a) => (/^[.,]/.test(a) ? a : ` ${a}`);

const fmt = (v, short = false) => {
  const m = String(v || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  const name = MONTHS[+m[2] - 1];
  return `${+m[3]} ${short ? name.slice(0, 3) : name} ${m[1]}`;
};

const lt = (u) => (String(u || "").startsWith("/") ? NuxtLink : "a");
const la = (u) =>
  String(u || "").startsWith("/")
    ? { to: u }
    : {
        href: u,
        ...(/^https?:/.test(u) ? { target: "_blank", rel: "noopener" } : {}),
      };

const alertHtml = (a) => {
  let html = rich(a.text);
  if (a.link_url && a.link_label) {
    const link = `<a href="${esc(a.link_url)}" target="_blank" rel="noopener">${esc(a.link_label)}</a>`;
    const lab = esc(a.link_label);
    html = html.includes(lab) ? html.replace(lab, link) : `${html} ${link}`;
  }
  return html;
};

const ICONS = {
  cost: '<circle cx="12" cy="12" r="9"/><path d="M15 9a3 3 0 0 0-3-2c-2 0-3 1-3 2.5S10 12 12 12s3 1 3 2.5S14 17 12 17a3 3 0 0 1-3-2M12 5v2M12 17v2"/>',
  award:
    '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
  language: '<path d="M4 5h16v11H8l-4 4z"/><path d="M9 9h6M9 12h4"/>',
  university:
    '<path d="m12 3 10 5-10 5L2 8l10-5Z"/><path d="M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  briefcase:
    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
};
const icon = (k) => ICONS[k] || ICONS.globe;

/* ---------- data with defaults ---------- */
const s = computed(() => d.value.short_name || d.value.name);
const hero = computed(() => d.value.hero || {});
const trust = computed(() => d.value.trust || {});
const rv = computed(() => trust.value.reviewer);
const updated = computed(() => fmt(trust.value.last_reviewed_at));
const leads = computed(() => d.value.section_leads || {});
const flags = computed(() => (hero.value.flag_colors || []).slice(0, 3));
const stats = computed(() => hero.value.stats || []);
const quick = computed(() => hero.value.quick || {});
const intro = computed(() => hero.value.intro || d.value.description);
const cta1 = computed(() => ({
  label: hero.value.cta_primary?.label || `Check My ${s.value} Eligibility`,
  url: hero.value.cta_primary?.url || "/apply-now",
}));
const cta2 = computed(() => ({
  label: hero.value.cta_secondary?.label || "Visa Requirements",
  url: hero.value.cta_secondary?.url || "#visa",
}));
const bcta1 = computed(() => ({
  label: d.value.cta?.primary?.label || "Get Free Assessment",
  url: d.value.cta?.primary?.url || "/apply-now",
}));
const bcta2 = computed(() => ({
  label: d.value.cta?.secondary?.label || PHONE_LABEL,
  url: d.value.cta?.secondary?.url || PHONE_URL,
}));

const L = computed(() => ({
  tuition_title: "Tuition fees per year",
  tuition_col1: "University type",
  tuition_col2: "Typical yearly fee",
  living_title: "Living costs per month",
  living_col1: "City",
  living_col2: "Typical monthly budget",
  timeline_col1: "When",
  timeline_col2: "What to do",
  timeline_col3: "Sunrise help",
  visa_docs_title: "Documents you usually need",
  sources_title: "Official sources",
  uni_link_label: "Official website",
  ...Object.fromEntries(
    Object.entries(d.value.labels || {}).filter(([, v]) => v),
  ),
}));

const T = computed(() => {
  const o = d.value.section_titles || {};
  const x = s.value;
  const f = {
    why: [`Why ${x}`, "Why Bangladeshi Students", `Choose ${x}`],
    universities: [
      "Where to study",
      `Top Universities in ${x}`,
      "for Bangladeshi Students",
    ],
    cost: ["Cost", `Cost of Studying in ${x}`, "from Bangladesh"],
    scholarships: [
      "Funding",
      `Scholarships in ${x}`,
      "for Bangladeshi Students",
    ],
    requirements: ["Eligibility", "Entry Requirements", "at a Glance"],
    process: [
      "Step by step",
      `How to Apply to ${x} Universities`,
      "from Bangladesh",
    ],
    visa: ["Student visa", `${x} Student Visa`, "from Bangladesh"],
    timeline: ["Plan ahead", "Timeline for the", "Upcoming Intake"],
    work: ["Careers", `Working in ${x}`, "During and After Study"],
    help: ["How we help", `Your ${x} Application,`, "Handled End to End"],
    trust: ["About this guide", "Who Prepared", "This Guide"],
    faq: ["FAQ", `Study in ${x} from Bangladesh:`, "Common Questions"],
  };
  return Object.fromEntries(
    Object.entries(f).map(([k, v]) => [
      k,
      {
        eyebrow: o[k]?.eyebrow || v[0],
        title: o[k]?.title || v[1],
        highlight: o[k]?.highlight || v[2],
      },
    ]),
  );
});

const whyCards = computed(() => d.value.why_cards || []);
const unis = computed(() => d.value.universities?.items || []);
const uniNote = computed(() => d.value.universities?.note);
const fields = computed(() => d.value.universities?.popular_fields || []);
const tuition = computed(() => d.value.cost?.tuition_rows || []);
const living = computed(() => d.value.cost?.living_rows || []);
const costNote = computed(() => d.value.cost?.note);
const schol = computed(() => d.value.scholarships || []);
const reqs = computed(() => d.value.requirements?.groups || []);
const reqLinks = computed(() => d.value.requirements?.links || []);
const steps = computed(() => d.value.process_steps || []);
const visa = computed(() => d.value.visa || {});
const funds = computed(() =>
  visa.value.funds && Object.keys(visa.value.funds).length
    ? visa.value.funds
    : null,
);
const tl = computed(() => d.value.timeline?.rows || []);
const tlHelp = computed(() => tl.value.some((r) => r.help));
const work = computed(() => d.value.work_cards || []);
const help = computed(() => d.value.help_cards || []);
const faqs = computed(() => d.value.faqs || []);
const sources = computed(() => trust.value.official_sources || []);

const show = computed(() => ({
  why: whyCards.value.length > 0,
  universities: unis.value.length > 0,
  cost: tuition.value.length > 0 || living.value.length > 0,
  scholarships: schol.value.length > 0,
  requirements: reqs.value.length > 0,
  process: steps.value.length > 0,
  visa: !!(visa.value.alert || visa.value.documents?.length || funds.value),
  timeline: tl.value.length > 0,
  work: work.value.length > 0,
  faq: faqs.value.length > 0,
}));

const toc = computed(() =>
  [
    ["why", `Why ${s.value}`],
    ["universities", "Universities"],
    ["cost", "Cost"],
    ["scholarships", "Scholarships"],
    ["requirements", "Requirements"],
    ["process", "Application"],
    ["visa", "Visa"],
    ["timeline", "Timeline"],
    ["work", "Work & after study"],
    ["faq", "FAQ"],
  ]
    .filter(([id]) => show.value[id])
    .map(([id, label]) => ({ id, label })),
);

const uniSub = (u) =>
  [u.founded && `Founded ${u.founded}`, u.tagline].filter(Boolean).join(" · ");

/* ---------- SEO ---------- */
const canonical = `${SITE_URL}/study-abroad/${slug}`;
const seo = d.value.seo || {};
const title = seo.meta_title || seo.page_title || d.value.name;
const description = seo.meta_description || plain(d.value.description);
const ogImage = d.value.details_image || d.value.image;

const graph = [
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Study Abroad",
        item: `${SITE_URL}/study-abroad`,
      },
      { "@type": "ListItem", position: 3, name: s.value, item: canonical },
    ],
  },
  {
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: title,
    description,
    url: canonical,
    inLanguage: "en",
    ...(trust.value.last_reviewed_at
      ? { dateModified: trust.value.last_reviewed_at }
      : {}),
    author: {
      "@type": "Organization",
      name: SITE,
      "@id": `${SITE_URL}/#organization`,
      url: `${SITE_URL}/`,
    },
    ...(rv.value
      ? {
          reviewedBy: {
            "@type": "Person",
            name: rv.value.name,
            ...(rv.value.title ? { jobTitle: rv.value.title } : {}),
            ...(rv.value.slug
              ? { url: `${SITE_URL}/staff/${rv.value.slug}` }
              : {}),
          },
        }
      : {}),
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: [{ "@type": "Country", name: s.value }],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      geographicArea: { "@type": "Country", name: "Bangladesh" },
    },
    ...(sources.value.length
      ? { citation: sources.value.map((x) => x.url) }
      : {}),
  },
];

if (unis.value.length) {
  graph.push({
    "@type": "ItemList",
    name: `Popular universities in ${s.value} for Bangladeshi students`,
    itemListElement: unis.value.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CollegeOrUniversity",
        name: u.name,
        ...(u.website ? { url: u.website } : {}),
        address: {
          "@type": "PostalAddress",
          ...(u.city ? { addressLocality: u.city } : {}),
          ...(d.value.code ? { addressCountry: d.value.code } : {}),
        },
      },
    })),
  });
}

if (faqs.value.length) {
  graph.push({
    "@type": "FAQPage",
    mainEntity: faqs.value.map((f) => ({
      "@type": "Question",
      name: plain(f.q),
      acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
    })),
  });
}

useSeoMeta({
  title,
  description,
  robots: "index, follow, max-image-preview:large",
  ogType: "article",
  ogTitle: seo.og_title || title,
  ogDescription: seo.og_description || description,
  ogUrl: canonical,
  ogSiteName: SITE,
  ogImage,
  twitterCard: "summary_large_image",
});

useHead({
  link: [{ rel: "canonical", href: canonical }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": graph,
      }).replace(/</g, "\\u003c"),
    },
  ],
});

/* ---------- client behaviour ---------- */
let cleanup = [];

onMounted(() => {
  const root = document.querySelector(".sdp");
  if (!root) return;

  const hdr =
    document.querySelector(".sh-wrap") || document.querySelector("header");
  const tocEl = root.querySelector(".sdp-toc-wrap");
  const place = () => {
    if (!hdr || !tocEl) return;
    const pos = getComputedStyle(hdr).position;
    const b =
      pos === "sticky" || pos === "fixed"
        ? Math.max(0, hdr.getBoundingClientRect().bottom)
        : 0;
    tocEl.style.setProperty("--sdp-top", `${b}px`);
  };
  let pt;
  const onScroll = () => {
    place();
    clearTimeout(pt);
    pt = setTimeout(place, 450);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", place);
  hdr?.addEventListener("transitionend", place);
  place();

  // One click handler for the whole page:
  //  - #anchor links scroll smoothly
  //  - internal links inside v-html content (author note, FAQ, text) use the
  //    router, so they do not reload the page
  const onClick = (e) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
    const href = a.getAttribute("href") || "";

    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href);
      return;
    }

    if (href.startsWith("/") && !href.startsWith("//")) {
      e.preventDefault();
      router.push(href);
    }
  };
  root.addEventListener("click", onClick);

  const links = [...root.querySelectorAll(".sdp-toc a")];
  const map = {};
  links.forEach((a) => {
    map[a.getAttribute("href").slice(1)] = a;
  });
  const observers = [];

  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => l.classList.remove("is-on"));
          const a = map[e.target.id];
          if (!a) return;
          a.classList.add("is-on");
          const bar = a.parentNode;
          bar.scrollTo({
            left: a.offsetLeft - bar.clientWidth / 2 + a.clientWidth / 2,
            behavior: "smooth",
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    Object.keys(map).forEach((id) => {
      const el = document.getElementById(id);
      if (el) so.observe(el);
    });

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    root.querySelectorAll(".sdp-reveal").forEach((el) => io.observe(el));
    observers.push(so, io);
  } else {
    root
      .querySelectorAll(".sdp-reveal")
      .forEach((el) => el.classList.add("is-in"));
  }

  cleanup = [
    () => window.removeEventListener("scroll", onScroll),
    () => window.removeEventListener("resize", place),
    () => hdr?.removeEventListener("transitionend", place),
    () => root.removeEventListener("click", onClick),
    () => clearTimeout(pt),
    () => observers.forEach((o) => o.disconnect()),
  ];
});

onBeforeUnmount(() => cleanup.forEach((fn) => fn()));
</script>

<template>
  <main class="sdp">
    <!-- HERO -->
    <section class="sdp-hero" aria-labelledby="sdp-h1">
      <div class="sdp-hero-rays" aria-hidden="true"></div>
      <div class="sdp-container">
        <nav class="sdp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><NuxtLink to="/study-abroad">Study Abroad</NuxtLink><span>/</span
          ><span aria-current="page">{{ s }}</span>
        </nav>

        <div class="sdp-hero-grid">
          <div>
            <template v-if="flags.length">
              <span class="sdp-flag" aria-hidden="true"
                ><i
                  v-for="(c, i) in flags"
                  :key="i"
                  :class="{ w: isWhite(c) }"
                  :style="{ background: c }"
                ></i></span
              ><br />
            </template>
            <span v-if="hero.eyebrow" class="sdp-eyebrow"
              ><i></i>{{ hero.eyebrow }}</span
            >
            <h1 id="sdp-h1" class="sdp-h1">
              {{ hero.title || d.name }}
              <span v-if="hero.highlight">{{ hero.highlight }}</span>
            </h1>
            <p v-if="intro" class="sdp-sub" v-html="rich(intro)"></p>

            <div class="sdp-cta-row">
              <component
                :is="lt(cta1.url)"
                v-bind="la(cta1.url)"
                class="sdp-btn sdp-btn-primary"
                >{{ cta1.label }}
                <span aria-hidden="true">&rarr;</span></component
              >
              <component
                :is="lt(cta2.url)"
                v-bind="la(cta2.url)"
                class="sdp-btn sdp-btn-ghost"
                >{{ cta2.label }}</component
              >
            </div>

            <div v-if="rv || updated" class="sdp-byline">
              <span v-if="rv" class="sdp-av" aria-hidden="true"
                >{{ initials(rv.name)
                }}<img v-if="rv.photo" :src="rv.photo" alt="" loading="lazy"
              /></span>
              <div>
                <template v-if="rv">
                  Reviewed by
                  <b
                    ><NuxtLink v-if="rv.slug" :to="`/staff/${rv.slug}`">{{
                      rv.name
                    }}</NuxtLink
                    ><template v-else>{{ rv.name }}</template></b
                  ><template v-if="rv.title">, {{ rv.title }}</template
                  ><br />
                </template>
                <template v-if="updated"
                  >Last updated:
                  <time :datetime="trust.last_reviewed_at">{{ updated }}</time>
                  &middot;
                  {{
                    hero.byline_note || "Checked against official sources"
                  }}</template
                >
              </div>
            </div>
          </div>

          <aside
            v-if="quick.title || quick.text || quick.facts?.length"
            class="sdp-answer"
            aria-labelledby="sdp-quick"
          >
            <h2 v-if="quick.title" id="sdp-quick">{{ quick.title }}</h2>
            <p v-if="quick.text" v-html="rich(quick.text)"></p>
            <ul v-if="quick.facts?.length" class="sdp-kv">
              <li v-for="(f, i) in quick.facts" :key="i">
                {{ f.label }} <b>{{ f.value }}</b>
              </li>
            </ul>
          </aside>
        </div>

        <div
          v-if="stats.length"
          class="sdp-stats"
          :style="{ '--n': stats.length }"
        >
          <div v-for="(st, i) in stats" :key="i" class="sdp-stat">
            <b
              >{{ st.big
              }}<span v-if="st.accent">{{ accent(st.accent) }}</span></b
            ><small>{{ st.small }}</small>
          </div>
        </div>
      </div>
    </section>

    <!-- TOC -->
    <div v-if="toc.length" class="sdp-toc-wrap">
      <div class="sdp-container">
        <nav class="sdp-toc" aria-label="On this page">
          <a v-for="t in toc" :key="t.id" :href="`#${t.id}`">{{ t.label }}</a>
        </nav>
      </div>
    </div>

    <!-- WHY -->
    <section
      v-if="show.why"
      id="why"
      class="sdp-section"
      aria-labelledby="why-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.why.eyebrow }}</span>
        <h2 id="why-h" class="sdp-h2">
          {{ T.why.title }} <span>{{ T.why.highlight }}</span>
        </h2>
        <p v-if="leads.why" class="sdp-lead" v-html="rich(leads.why)"></p>
        <div class="sdp-why">
          <div
            v-for="(c, i) in whyCards"
            :key="i"
            class="sdp-why-card sdp-reveal"
          >
            <span class="sdp-ic"
              ><svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                v-html="icon(c.icon)"
              ></svg
            ></span>
            <h3>{{ c.title }}</h3>
            <p v-html="rich(c.text)"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- UNIVERSITIES -->
    <section
      v-if="show.universities"
      id="universities"
      class="sdp-section sdp-soft"
      aria-labelledby="uni-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.universities.eyebrow }}</span>
        <h2 id="uni-h" class="sdp-h2">
          {{ T.universities.title }} <span>{{ T.universities.highlight }}</span>
        </h2>
        <p
          v-if="leads.universities"
          class="sdp-lead"
          v-html="rich(leads.universities)"
        ></p>
        <div class="sdp-unis">
          <article v-for="u in unis" :key="u.id" class="sdp-uni sdp-reveal">
            <div class="sdp-uni-top">
              <span>{{ [u.city, u.type].filter(Boolean).join(" · ") }}</span>
              <h3>{{ u.name }}</h3>
              <small>{{ uniSub(u) }}</small>
            </div>
            <div class="sdp-uni-body">
              <ul v-if="u.facts?.length" class="sdp-facts">
                <li v-for="(f, i) in u.facts" :key="i">
                  {{ f.label }}<b>{{ f.value }}</b>
                </li>
              </ul>
              <div v-html="bodyHtml(u.description)"></div>
              <a
                v-if="u.website"
                class="sdp-ext"
                :href="u.website"
                target="_blank"
                rel="noopener"
                >{{ L.uni_link_label }} &rarr;</a
              >
            </div>
          </article>
        </div>
        <p v-if="uniNote" class="sdp-note" v-html="rich(uniNote)"></p>
        <div v-if="fields.length" class="sdp-chips" aria-label="Popular fields">
          <span v-for="(f, i) in fields" :key="i">{{ f }}</span>
        </div>
      </div>
    </section>

    <!-- COST -->
    <section
      v-if="show.cost"
      id="cost"
      class="sdp-section"
      aria-labelledby="cost-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.cost.eyebrow }}</span>
        <h2 id="cost-h" class="sdp-h2">
          {{ T.cost.title }} <span>{{ T.cost.highlight }}</span>
        </h2>
        <p v-if="leads.cost" class="sdp-lead" v-html="rich(leads.cost)"></p>
        <div
          class="sdp-cost"
          :class="{ one: !(tuition.length && living.length) }"
        >
          <div v-if="tuition.length" class="sdp-reveal">
            <h3>{{ L.tuition_title }}</h3>
            <div class="sdp-table-wrap">
              <table class="sdp-table" style="min-width: 0">
                <thead>
                  <tr>
                    <th scope="col">{{ L.tuition_col1 }}</th>
                    <th scope="col">{{ L.tuition_col2 }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, i) in tuition" :key="i">
                    <td>{{ r.label }}</td>
                    <td>{{ r.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="living.length" class="sdp-reveal">
            <h3>{{ L.living_title }}</h3>
            <div class="sdp-table-wrap">
              <table class="sdp-table" style="min-width: 0">
                <thead>
                  <tr>
                    <th scope="col">{{ L.living_col1 }}</th>
                    <th scope="col">{{ L.living_col2 }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, i) in living" :key="i">
                    <td>{{ r.label }}</td>
                    <td>{{ r.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p v-if="costNote" class="sdp-note" v-html="rich(costNote)"></p>
      </div>
    </section>

    <!-- SCHOLARSHIPS -->
    <section
      v-if="show.scholarships"
      id="scholarships"
      class="sdp-section sdp-soft"
      aria-labelledby="sch-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.scholarships.eyebrow }}</span>
        <h2 id="sch-h" class="sdp-h2">
          {{ T.scholarships.title }} <span>{{ T.scholarships.highlight }}</span>
        </h2>
        <p
          v-if="leads.scholarships"
          class="sdp-lead"
          v-html="rich(leads.scholarships)"
        ></p>
        <div class="sdp-sch">
          <article
            v-for="(c, i) in schol"
            :key="i"
            class="sdp-sch-card sdp-reveal"
          >
            <span
              v-if="c.tag"
              class="sdp-tag"
              :class="{ o: c.color === 'orange' }"
              >{{ c.tag }}</span
            >
            <h3>{{ c.title }}</h3>
            <p v-for="(p, j) in paras(c.text)" :key="j" v-html="rich(p)"></p>
          </article>
        </div>
      </div>
    </section>

    <!-- REQUIREMENTS -->
    <section
      v-if="show.requirements"
      id="requirements"
      class="sdp-section"
      aria-labelledby="req-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.requirements.eyebrow }}</span>
        <h2 id="req-h" class="sdp-h2">
          {{ T.requirements.title }} <span>{{ T.requirements.highlight }}</span>
        </h2>
        <p
          v-if="leads.requirements"
          class="sdp-lead"
          v-html="rich(leads.requirements)"
        ></p>
        <div class="sdp-req" :style="{ '--n': Math.min(reqs.length, 3) }">
          <div v-for="(g, i) in reqs" :key="i" class="sdp-req-card sdp-reveal">
            <h3><i></i>{{ g.title }}</h3>
            <ul class="sdp-list">
              <li v-for="(it, j) in g.items" :key="j">{{ it }}</li>
            </ul>
          </div>
        </div>
        <div v-if="reqLinks.length" class="sdp-links">
          <component
            :is="lt(l.url)"
            v-for="(l, i) in reqLinks"
            :key="i"
            v-bind="la(l.url)"
            >{{ l.label }} &rarr;</component
          >
        </div>
      </div>
    </section>

    <!-- PROCESS -->
    <section
      v-if="show.process"
      id="process"
      class="sdp-section sdp-steps-sec"
      aria-labelledby="proc-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.process.eyebrow }}</span>
        <h2 id="proc-h" class="sdp-h2">
          {{ T.process.title }} <span>{{ T.process.highlight }}</span>
        </h2>
        <p
          v-if="leads.process"
          class="sdp-lead"
          v-html="rich(leads.process)"
        ></p>
        <ol class="sdp-steps">
          <li v-for="(st, i) in steps" :key="i" class="sdp-step sdp-reveal">
            <h3>{{ st.title }}</h3>
            <p v-html="rich(st.text)"></p>
            <small v-if="st.timing">{{ st.timing }}</small>
          </li>
        </ol>
      </div>
    </section>

    <!-- VISA -->
    <section
      v-if="show.visa"
      id="visa"
      class="sdp-section"
      aria-labelledby="visa-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.visa.eyebrow }}</span>
        <h2 id="visa-h" class="sdp-h2">
          {{ T.visa.title }} <span>{{ T.visa.highlight }}</span>
        </h2>
        <p v-if="leads.visa" class="sdp-lead" v-html="rich(leads.visa)"></p>

        <div v-if="visa.alert" class="sdp-alert sdp-reveal">
          <i>!</i>
          <div>
            <b v-if="visa.alert.title">{{ visa.alert.title }}</b>
            <p v-html="alertHtml(visa.alert)"></p>
          </div>
        </div>

        <div
          class="sdp-visa"
          :class="{ one: !(visa.documents?.length && funds) }"
        >
          <div v-if="visa.documents?.length" class="sdp-box sdp-reveal">
            <h3>{{ L.visa_docs_title }}</h3>
            <ul class="sdp-list">
              <li v-for="(x, i) in visa.documents" :key="i">{{ x }}</li>
            </ul>
            <p
              v-if="visa.docs_note"
              class="sdp-boxnote"
              v-html="rich(visa.docs_note)"
            ></p>
          </div>
          <div v-if="funds" class="sdp-funds sdp-reveal">
            <small v-if="funds.label">{{ funds.label }}</small>
            <span v-if="funds.amount" class="big">{{ funds.amount }}</span>
            <p v-if="funds.text" v-html="rich(funds.text)"></p>
            <p v-if="funds.list_intro">{{ funds.list_intro }}</p>
            <ul v-if="funds.list?.length">
              <li v-for="(x, i) in funds.list" :key="i">{{ x }}</li>
            </ul>
            <p v-if="funds.footer" v-html="rich(funds.footer)"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- TIMELINE -->
    <section
      v-if="show.timeline"
      id="timeline"
      class="sdp-section sdp-soft"
      aria-labelledby="tl-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.timeline.eyebrow }}</span>
        <h2 id="tl-h" class="sdp-h2">
          {{ T.timeline.title }} <span>{{ T.timeline.highlight }}</span>
        </h2>
        <p
          v-if="leads.timeline"
          class="sdp-lead"
          v-html="rich(leads.timeline)"
        ></p>
        <div class="sdp-table-wrap sdp-reveal">
          <table class="sdp-table">
            <thead>
              <tr>
                <th scope="col">{{ L.timeline_col1 }}</th>
                <th scope="col">{{ L.timeline_col2 }}</th>
                <th v-if="tlHelp" scope="col">{{ L.timeline_col3 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in tl" :key="i">
                <td>{{ r.when }}</td>
                <td>{{ r.what }}</td>
                <td v-if="tlHelp">{{ r.help }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p
          v-if="d.timeline?.note"
          class="sdp-note"
          v-html="rich(d.timeline.note)"
        ></p>
      </div>
    </section>

    <!-- WORK -->
    <section
      v-if="show.work"
      id="work"
      class="sdp-section"
      aria-labelledby="work-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.work.eyebrow }}</span>
        <h2 id="work-h" class="sdp-h2">
          {{ T.work.title }} <span>{{ T.work.highlight }}</span>
        </h2>
        <p v-if="leads.work" class="sdp-lead" v-html="rich(leads.work)"></p>
        <div class="sdp-two" :style="{ '--n': Math.min(work.length, 2) }">
          <div v-for="(c, i) in work" :key="i" class="sdp-stat-card sdp-reveal">
            <b v-if="c.big">{{ c.big }}</b>
            <h3>{{ c.title }}</h3>
            <p v-for="(p, j) in paras(c.text)" :key="j" v-html="rich(p)"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- HELP -->
    <section
      v-if="help.length"
      class="sdp-section sdp-soft"
      aria-labelledby="help-h"
    >
      <div class="sdp-container">
        <div class="sdp-center">
          <span class="sdp-eyebrow"><i></i>{{ T.help.eyebrow }}</span>
          <h2 id="help-h" class="sdp-h2">
            {{ T.help.title }} <span>{{ T.help.highlight }}</span>
          </h2>
          <p v-if="leads.help" class="sdp-lead" v-html="rich(leads.help)"></p>
        </div>
        <div class="sdp-help" :style="{ '--n': Math.min(help.length, 3) }">
          <component
            :is="lt(c.url)"
            v-for="(c, i) in help"
            :key="i"
            v-bind="la(c.url)"
            class="sdp-reveal"
          >
            <h3>{{ c.title }}</h3>
            <p v-if="c.text">{{ c.text }}</p>
            <span v-if="c.link_label">{{ c.link_label }} &rarr;</span>
          </component>
        </div>
      </div>
    </section>

    <!-- TRUST -->
    <section
      v-if="rv || trust.author_note || sources.length"
      class="sdp-section"
      aria-labelledby="trust-h"
    >
      <div class="sdp-container">
        <span class="sdp-eyebrow"><i></i>{{ T.trust.eyebrow }}</span>
        <h2 id="trust-h" class="sdp-h2">
          {{ T.trust.title }} <span>{{ T.trust.highlight }}</span>
        </h2>
        <div class="sdp-trust" :class="{ one: !sources.length }">
          <div class="sdp-author sdp-reveal">
            <div v-if="rv" class="sdp-author-top">
              <span class="sdp-av" aria-hidden="true"
                >{{ initials(rv.name)
                }}<img v-if="rv.photo" :src="rv.photo" alt="" loading="lazy"
              /></span>
              <div>
                <h3>{{ rv.name }}</h3>
                <small>{{ [rv.title, SITE].filter(Boolean).join(", ") }}</small>
              </div>
            </div>
            <p
              v-for="(p, i) in paras(trust.author_note)"
              :key="i"
              v-html="rich(p)"
            ></p>
            <div class="sdp-meta">
              <span v-if="updated"
                >Last updated: {{ fmt(trust.last_reviewed_at, true) }}</span
              >
              <span v-if="trust.next_review_label"
                >Next review: {{ trust.next_review_label }}</span
              >
            </div>
          </div>
          <div v-if="sources.length" class="sdp-sources sdp-reveal">
            <h3>{{ L.sources_title }}</h3>
            <ul>
              <li v-for="(x, i) in sources" :key="i">
                <a :href="x.url" target="_blank" rel="noopener">{{
                  x.title
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section
      v-if="show.faq"
      id="faq"
      class="sdp-section sdp-faq"
      aria-labelledby="faq-h"
    >
      <div class="sdp-container">
        <div class="sdp-center">
          <span class="sdp-eyebrow"><i></i>{{ T.faq.eyebrow }}</span>
          <h2 id="faq-h" class="sdp-h2">
            {{ T.faq.title }} <span>{{ T.faq.highlight }}</span>
          </h2>
          <p v-if="leads.faq" class="sdp-lead" v-html="rich(leads.faq)"></p>
        </div>
        <div class="sdp-faq-list">
          <details v-for="(f, i) in faqs" :key="i" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <p v-html="rich(f.a)"></p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="sdp-cta" aria-labelledby="cta-h">
      <div class="sdp-container">
        <h2 id="cta-h">{{ d.cta?.title || `Planning to Study in ${s}?` }}</h2>
        <p>
          {{
            d.cta?.text ||
            "Book a free assessment. We will check your results, English and budget, and plan your application and visa timeline."
          }}
        </p>
        <div class="sdp-cta-row" style="justify-content: center; margin: 0">
          <component
            :is="lt(bcta1.url)"
            v-bind="la(bcta1.url)"
            class="sdp-btn sdp-btn-primary"
            >{{ bcta1.label }} <span aria-hidden="true">&rarr;</span></component
          >
          <component
            :is="lt(bcta2.url)"
            v-bind="la(bcta2.url)"
            class="sdp-btn sdp-btn-ghost"
            >{{ bcta2.label }}</component
          >
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.sdp a {
  color: inherit;
}
a.sdp-rl {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.sdp-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}
.sdp-section {
  padding: 80px 0;
  scroll-margin-top: 130px;
}
.sdp-eyebrow {
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
.sdp-eyebrow i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--sec-orange);
}
.sdp-h2 {
  font-size: clamp(26px, 3.2vw, 38px);
  line-height: 1.2;
  font-weight: 800;
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}
.sdp-h2 span {
  color: var(--sec-green);
}
.sdp-lead {
  font-size: 17px;
  line-height: 1.75;
  color: var(--sec-slate);
  margin: 0 0 34px;
  max-width: 800px;
}
.sdp-lead a {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.sdp-center {
  text-align: center;
}
.sdp-center .sdp-lead {
  margin-left: auto;
  margin-right: auto;
}
.sdp-btn {
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
.sdp-btn-primary {
  background: var(--sec-green);
  color: #fff !important;
  box-shadow: 0 10px 24px rgba(47, 168, 79, 0.22);
}
.sdp-btn-primary:hover {
  background: var(--sec-green-dk);
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(47, 168, 79, 0.28);
}
.sdp-btn-ghost {
  border: 1.5px solid var(--sec-line);
  color: var(--sec-navy);
  background: #fff;
}
.sdp-btn-ghost:hover {
  border-color: var(--sec-green);
  color: var(--sec-green-dk);
  transform: translateY(-2px);
}
.sdp-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.sdp-reveal.is-in {
  opacity: 1;
  transform: none;
}
.sdp-soft {
  background: var(--sec-offwhite);
}
.sdp-note {
  font-size: 13px;
  color: var(--sec-slate);
  margin-top: 18px;
  line-height: 1.65;
}
.sdp-note a {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.sdp-alert {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--sec-gold-bg);
  border: 1px solid rgba(245, 166, 35, 0.35);
  border-radius: 14px;
  padding: 18px 20px;
  margin: 0 0 30px;
}
.sdp-alert b {
  display: block;
  font-size: 15px;
  margin-bottom: 2px;
}
.sdp-alert p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.7;
  color: #5b4a2a;
}
.sdp-alert i {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--sec-orange);
  color: #fff;
  display: grid;
  place-items: center;
  font-style: normal;
  font-weight: 800;
}
.sdp-alert a {
  color: #8a5a00;
  font-weight: 800;
}

.sdp-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--sec-gold-bg) 0%, #fff 100%);
  padding: 40px 0 60px;
}
.sdp-hero-rays {
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
  animation: sdp-rotate 60s linear infinite;
}
.sdp-crumb {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13.5px;
  color: var(--sec-slate);
  margin-bottom: 34px;
}
.sdp-crumb a {
  text-decoration: none;
  font-weight: 600;
}
.sdp-crumb a:hover {
  color: var(--sec-green-dk);
}
.sdp-hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.95fr;
  gap: 48px;
  align-items: center;
}
.sdp-flag {
  display: inline-flex;
  height: 6px;
  width: 64px;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 16px;
}
.sdp-flag i {
  flex: 1;
}
.sdp-flag i.w {
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.sdp-h1 {
  font-size: clamp(32px, 4.6vw, 54px);
  line-height: 1.1;
  font-weight: 800;
  margin: 0 0 18px;
  letter-spacing: -0.02em;
}
.sdp-h1 span {
  display: block;
  color: var(--sec-green);
}
.sdp-hero p.sdp-sub {
  font-size: 17.5px;
  line-height: 1.75;
  color: var(--sec-slate);
  margin: 0 0 28px;
  max-width: 640px;
}
.sdp-hero p.sdp-sub a {
  color: var(--sec-navy);
  font-weight: 700;
  text-decoration-color: var(--sec-green);
  text-underline-offset: 3px;
}
.sdp-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 26px;
}
.sdp-byline {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13.5px;
  color: var(--sec-slate);
}
.sdp-byline b {
  color: var(--sec-navy);
}
.sdp-av {
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--sec-green);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 800;
  flex: none;
  overflow: hidden;
}
.sdp-av img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sdp-answer {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.08);
  position: relative;
}
.sdp-answer::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22px;
  bottom: 22px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--sec-green);
}
.sdp-answer h2 {
  font-size: 17px;
  margin: 0 0 10px;
  font-weight: 800;
}
.sdp-answer p {
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 1.7;
  color: var(--sec-slate);
}
.sdp-kv {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
}
.sdp-kv li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 12px;
  border-radius: 10px;
  background: var(--sec-offwhite);
}
.sdp-kv b {
  color: var(--sec-green-dk);
  font-weight: 800;
  text-align: right;
}
.sdp-stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--n, 4), 1fr);
  margin-top: 46px;
  border-top: 1px solid var(--sec-line);
  padding-top: 26px;
}
.sdp-stat {
  padding: 0 20px;
  border-left: 1px solid var(--sec-line);
}
.sdp-stat:first-child {
  border-left: 0;
  padding-left: 0;
}
.sdp-stat b {
  display: block;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.1;
}
.sdp-stat b span {
  color: var(--sec-orange);
}
.sdp-stat small {
  font-size: 13px;
  color: var(--sec-slate);
  line-height: 1.4;
  display: block;
  margin-top: 4px;
}

.sdp-toc-wrap {
  position: sticky;
  top: var(--sdp-top, 0px);
  transition: top 0.2s;
  z-index: 50;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--sec-line);
}
.sdp-toc {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 12px 0;
  scrollbar-width: none;
}
.sdp-toc::-webkit-scrollbar {
  display: none;
}
.sdp-toc a {
  flex: none;
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 999px;
  color: var(--sec-slate);
  transition:
    background 0.2s,
    color 0.2s;
}
.sdp-toc a:hover {
  color: var(--sec-green-dk);
  background: var(--sec-offwhite);
}
.sdp-toc a.is-on {
  background: var(--sec-navy);
  color: #fff;
}

.sdp-why {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.sdp-why-card {
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
  background: #fff;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.sdp-why-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.08);
  border-color: rgba(47, 168, 79, 0.4);
}
.sdp-ic {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(47, 168, 79, 0.1);
  color: var(--sec-green-dk);
  display: grid;
  place-items: center;
  margin-bottom: 16px;
}
.sdp-ic svg {
  width: 24px;
  height: 24px;
}
.sdp-why-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
}
.sdp-why-card p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--sec-slate);
}

.sdp-unis {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.sdp-uni {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}
.sdp-uni:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 44px rgba(22, 33, 58, 0.12);
}
.sdp-uni-top {
  position: relative;
  overflow: hidden;
  padding: 20px 22px;
  color: #fff;
  background: linear-gradient(135deg, #2d6cb4, #16213a);
}
.sdp-uni:nth-child(4n + 2) .sdp-uni-top,
.sdp-uni:nth-child(4n + 3) .sdp-uni-top {
  background: linear-gradient(135deg, #2fa84f, #1e6e39);
}
.sdp-uni-top::after {
  content: "";
  position: absolute;
  right: -60px;
  top: -60px;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.12) 0 8deg,
    transparent 8deg 22deg
  );
  transition: transform 0.8s;
}
.sdp-uni:hover .sdp-uni-top::after {
  transform: rotate(60deg);
}
.sdp-uni-top span {
  position: relative;
  z-index: 1;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.18);
  padding: 5px 10px;
  border-radius: 999px;
}
.sdp-uni-top h3 {
  position: relative;
  z-index: 1;
  margin: 12px 0 2px;
  font-size: 21px;
}
.sdp-uni-top small {
  position: relative;
  z-index: 1;
  font-size: 13px;
  opacity: 0.9;
}
.sdp-uni-body {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.sdp-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
}
.sdp-facts li {
  background: var(--sec-offwhite);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12px;
  color: var(--sec-slate);
  line-height: 1.35;
}
.sdp-facts b {
  display: block;
  font-size: 13.5px;
  color: var(--sec-navy);
  margin-top: 2px;
}
.sdp-uni-body p {
  margin: 0 0 12px;
  font-size: 14.5px;
  line-height: 1.75;
  color: #475467;
}
.sdp-uni-body a.sdp-ext {
  margin-top: auto;
  font-size: 13.5px;
  font-weight: 800;
  color: var(--sec-green-dk);
  text-decoration: none;
}
.sdp-uni-body a.sdp-ext:hover {
  text-decoration: underline;
}
.sdp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}
.sdp-chips span {
  font-size: 14px;
  font-weight: 700;
  padding: 9px 16px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--sec-line);
}

.sdp-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
  -webkit-overflow-scrolling: touch;
  background: #fff;
}
.sdp-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
  font-size: 14.5px;
}
.sdp-table th {
  background: var(--sec-navy);
  color: #fff;
  text-align: left;
  padding: 14px 16px;
  font-size: 12.5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}
.sdp-table td {
  padding: 13px 16px;
  border-top: 1px solid var(--sec-line);
  vertical-align: top;
  line-height: 1.55;
}
.sdp-table tbody tr:nth-child(even) {
  background: var(--sec-offwhite);
}
.sdp-table tbody tr:hover {
  background: var(--sec-gold-bg);
}
.sdp-table td:first-child {
  font-weight: 800;
}
.sdp-cost {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  align-items: start;
}
.sdp-cost.one {
  grid-template-columns: 1fr;
}
.sdp-cost h3 {
  margin: 0 0 14px;
  font-size: 19px;
}
.sdp-cost > div {
  min-width: 0;
}
.sdp-cost .sdp-table th {
  white-space: normal;
}

.sdp-sch {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}
.sdp-sch-card {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.sdp-sch-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.08);
  border-color: rgba(47, 168, 79, 0.4);
}
.sdp-tag {
  align-self: flex-start;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(47, 168, 79, 0.12);
  color: var(--sec-green-dk);
  margin-bottom: 12px;
}
.sdp-tag.o {
  background: var(--sec-gold-bg);
  color: #b87400;
}
.sdp-sch-card h3 {
  margin: 0 0 10px;
  font-size: 19px;
}
.sdp-sch-card p {
  margin: 0 0 12px;
  font-size: 14.5px;
  line-height: 1.75;
  color: #475467;
}
.sdp-sch-card a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

.sdp-req {
  display: grid;
  grid-template-columns: repeat(var(--n, 3), 1fr);
  gap: 22px;
}
.sdp-req-card {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
}
.sdp-req-card h3 {
  margin: 0 0 14px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sdp-req-card h3 i {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: var(--sec-orange);
}
.sdp-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}
.sdp-list li {
  position: relative;
  padding-left: 26px;
  font-size: 14.5px;
  line-height: 1.6;
  color: #475467;
}
.sdp-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 3px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: rgba(47, 168, 79, 0.14);
}
.sdp-list li::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 7px;
  width: 4px;
  height: 7px;
  border: solid var(--sec-green-dk);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.sdp-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}
.sdp-links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 10px;
  border: 1.5px solid var(--sec-line);
  font-weight: 800;
  font-size: 14px;
  text-decoration: none;
  background: #fff;
  transition: all 0.2s;
}
.sdp-links a:hover {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
}

.sdp-steps-sec {
  background: var(--sec-navy);
  color: #fff;
  position: relative;
  overflow: hidden;
}
.sdp-steps-sec::before {
  content: "";
  position: absolute;
  left: -200px;
  bottom: -300px;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(47, 168, 79, 0.18), transparent 65%);
}
.sdp-steps-sec .sdp-lead {
  color: #aeb8cc;
}
.sdp-steps-sec .sdp-eyebrow {
  color: #9fe0b0;
  border-color: rgba(159, 224, 176, 0.3);
  background: rgba(47, 168, 79, 0.1);
}
.sdp-steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  counter-reset: s;
  margin: 0;
  padding: 0;
  list-style: none;
}
.sdp-step {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 22px;
  transition:
    background 0.3s,
    border-color 0.3s;
}
.sdp-step:hover {
  background: rgba(47, 168, 79, 0.1);
  border-color: rgba(47, 168, 79, 0.5);
}
.sdp-step::before {
  counter-increment: s;
  content: "0" counter(s);
  display: block;
  font-size: 28px;
  font-weight: 800;
  color: var(--sec-orange);
  margin-bottom: 6px;
}
.sdp-step:nth-child(n + 10)::before {
  content: counter(s);
}
.sdp-step h3 {
  margin: 0 0 8px;
  font-size: 16.5px;
}
.sdp-step p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: #c9d1e0;
}
.sdp-step small {
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 800;
  color: #9fe0b0;
}

.sdp-visa {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: start;
}
.sdp-visa.one {
  grid-template-columns: 1fr;
}
.sdp-box {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
}
.sdp-box h3 {
  margin: 0 0 14px;
  font-size: 19px;
}
.sdp-boxnote {
  font-size: 14px;
  color: var(--sec-slate);
  line-height: 1.7;
  margin: 16px 0 0;
}
.sdp-funds {
  background: var(--sec-navy);
  color: #fff;
  border-radius: 16px;
  padding: 28px;
  position: relative;
  overflow: hidden;
}
.sdp-funds::before {
  content: "";
  position: absolute;
  right: -120px;
  top: -120px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.06) 0 6deg,
    transparent 6deg 18deg
  );
}
.sdp-funds * {
  position: relative;
}
.sdp-funds small {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sec-orange);
}
.sdp-funds .big {
  display: block;
  font-size: 40px;
  font-weight: 800;
  margin: 6px 0 2px;
}
.sdp-funds p {
  margin: 0 0 12px;
  font-size: 14.5px;
  line-height: 1.75;
  color: #c9d1e0;
}
.sdp-funds ul {
  margin: 0 0 14px;
  padding-left: 18px;
  font-size: 14.5px;
  line-height: 1.8;
  color: #c9d1e0;
}
.sdp-funds a {
  color: #9fe0b0;
  font-weight: 700;
}

.sdp-two {
  display: grid;
  grid-template-columns: repeat(var(--n, 2), 1fr);
  gap: 26px;
  align-items: start;
}
.sdp-stat-card {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
}
.sdp-stat-card b {
  display: block;
  font-size: 34px;
  font-weight: 800;
  color: var(--sec-green-dk);
  line-height: 1;
}
.sdp-stat-card h3 {
  margin: 10px 0 8px;
  font-size: 18px;
}
.sdp-stat-card p {
  margin: 0 0 10px;
  font-size: 14.5px;
  line-height: 1.75;
  color: #475467;
}

.sdp-help {
  display: grid;
  grid-template-columns: repeat(var(--n, 3), 1fr);
  gap: 20px;
}
.sdp-help a {
  display: block;
  text-decoration: none;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 24px;
  background: #fff;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.sdp-help a:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.08);
  border-color: rgba(47, 168, 79, 0.4);
}
.sdp-help h3 {
  margin: 0 0 8px;
  font-size: 17px;
}
.sdp-help p {
  margin: 0 0 12px;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--sec-slate);
}
.sdp-help span {
  font-size: 14px;
  font-weight: 800;
  color: var(--sec-green-dk);
}

.sdp-trust {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}
.sdp-trust.one {
  grid-template-columns: 1fr;
}
.sdp-author {
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 28px;
  background: #fff;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}
.sdp-author-top {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}
.sdp-author-top .sdp-av {
  width: 60px;
  height: 60px;
  font-size: 20px;
}
.sdp-author h3 {
  margin: 0;
  font-size: 18px;
}
.sdp-author small {
  color: var(--sec-slate);
}
.sdp-author p {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--sec-slate);
  margin: 0 0 12px;
}
.sdp-author a {
  font-weight: 800;
  color: var(--sec-green-dk);
  text-decoration: none;
}
.sdp-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}
.sdp-meta span {
  font-size: 12.5px;
  font-weight: 700;
  background: #fff;
  border: 1px solid var(--sec-line);
  padding: 6px 12px;
  border-radius: 999px;
}
.sdp-sources {
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 28px;
  background: var(--sec-offwhite);
}
.sdp-sources h3 {
  margin: 0 0 12px;
  font-size: 18px;
}
.sdp-sources ul {
  margin: 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.9;
  color: var(--sec-slate);
}
.sdp-sources a {
  color: var(--sec-blue);
  font-weight: 600;
}

.sdp-faq {
  background: var(--sec-gold-bg);
}
.sdp-faq-list {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 12px;
}
.sdp-faq details {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 14px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}
.sdp-faq details[open] {
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.08);
}
.sdp-faq summary {
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
.sdp-faq summary::-webkit-details-marker {
  display: none;
}
.sdp-faq summary::after {
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
.sdp-faq details[open] summary::after {
  transform: rotate(45deg);
}
.sdp-faq details p {
  margin: 0;
  padding: 0 24px 22px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--sec-slate);
}
.sdp-faq details p a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

.sdp-cta {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--sec-green) 0%, #1e6e39 100%);
  padding: 70px 0;
  color: #fff;
  text-align: center;
}
.sdp-cta::before {
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
  animation: sdp-rotate 80s linear infinite;
}
.sdp-cta * {
  position: relative;
}
.sdp-cta h2 {
  font-size: clamp(26px, 3.4vw, 40px);
  margin: 0 0 12px;
  font-weight: 800;
}
.sdp-cta p {
  margin: 0 auto 28px;
  max-width: 640px;
  font-size: 17px;
  color: #ddf2e2;
  line-height: 1.7;
}
.sdp-cta .sdp-btn-primary {
  background: #fff;
  color: var(--sec-green-dk) !important;
}
.sdp-cta .sdp-btn-ghost {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.6);
}

@keyframes sdp-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1100px) {
  .sdp-steps {
    grid-template-columns: repeat(2, 1fr);
  }
  .sdp-why,
  .sdp-req,
  .sdp-help {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .sdp-hero-grid,
  .sdp-cost,
  .sdp-visa,
  .sdp-two,
  .sdp-trust,
  .sdp-unis,
  .sdp-sch {
    grid-template-columns: 1fr;
  }
  .sdp-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px 0;
  }
  .sdp-stat:nth-child(3) {
    border-left: 0;
    padding-left: 0;
  }
}
@media (max-width: 640px) {
  .sdp-section {
    padding: 56px 0;
  }
  .sdp-container {
    padding: 0 16px;
  }
  .sdp-hero {
    padding: 28px 0 46px;
  }
  .sdp-why,
  .sdp-req,
  .sdp-help,
  .sdp-steps {
    grid-template-columns: 1fr;
  }
  .sdp-cta-row .sdp-btn {
    flex: 1;
    justify-content: center;
  }
  .sdp-box,
  .sdp-funds,
  .sdp-author,
  .sdp-sources {
    padding: 22px;
  }
  .sdp-funds .big {
    font-size: 32px;
  }
}
@media (max-width: 420px) {
  .sdp-cta-row {
    flex-direction: column;
  }
  .sdp-cta-row .sdp-btn {
    width: 100%;
  }
  .sdp-facts {
    grid-template-columns: 1fr;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sdp * {
    animation: none !important;
    transition: none !important;
  }
  .sdp-reveal {
    opacity: 1;
    transform: none;
  }
}
</style>