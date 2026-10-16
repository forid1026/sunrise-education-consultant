<template>
  <div class="svp">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="cp-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Company Profile</span>
        </nav>

        <div class="svp-hero-grid">
          <div>
            <span class="svp-eyebrow"><i></i>Who we are</span>
            <h1 id="cp-h1" class="svp-h1">
              {{ page?.title || "Company Profile" }}
              <span>{{ page?.company_name || brand }}</span>
            </h1>
            <p class="svp-sub">
              {{
                page?.tagline ||
                "Licensed study abroad consultants helping Bangladeshi students from first assessment to admission and visa approval."
              }}
            </p>
            <div class="svp-cta-row">
              <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <NuxtLink class="svp-btn svp-btn-ghost" to="/contact"
                >Contact Us</NuxtLink
              >
            </div>
          </div>

          <aside
            v-if="facts.length"
            class="svp-answer"
            aria-labelledby="cp-facts-h"
          >
            <h2 id="cp-facts-h">Company at a glance</h2>
            <dl class="cp-facts">
              <div v-for="f in facts" :key="f.label">
                <dt>{{ f.label }}</dt>
                <dd>
                  {{ f.value }}<small v-if="f.note">{{ f.note }}</small>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>

    <!-- ================= OVERVIEW ================= -->
    <section class="svp-section svp-services" aria-labelledby="cp-over-h">
      <div class="svp-container">
        <p v-if="pending" class="svp-lead">Loading company profile…</p>

        <div v-else-if="error" class="cp-msg">
          <p>Could not load the company profile right now.</p>
          <button
            type="button"
            class="svp-btn svp-btn-primary"
            @click="refresh()"
          >
            Try again
          </button>
        </div>

        <p v-else-if="!hasContent" class="svp-lead">
          Our company profile will be published here soon.
        </p>

        <div v-else class="cp-grid" :class="{ 'no-img': !page.image }">
          <figure v-if="page.image" class="cp-media">
            <img
              :src="page.image"
              :alt="page.image_alt || page.company_name || brand"
              loading="lazy"
            />
            <figcaption v-if="page.company_name">
              {{ page.company_name }}
            </figcaption>
          </figure>

          <div class="cp-text">
            <span class="svp-eyebrow"><i></i>Company overview</span>
            <h2 id="cp-over-h" class="svp-h2">
              About <span>{{ page.company_name || brand }}</span>
            </h2>
            <div
              v-if="page.overview"
              class="cp-prose"
              v-html="page.overview"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= EXPLORE MORE ================= -->
    <section class="svp-section" aria-labelledby="cp-next-h">
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>Know us better</span>
        <h2 id="cp-next-h" class="svp-h2">
          Keep Exploring <span>Sunrise</span>
        </h2>
        <div class="svp-next">
          <NuxtLink to="/message-from-ceo">
            <h3>Message from the CEO</h3>
            <p>
              Read what drives our team and the promise we make to every
              student.
            </p>
            <span>Read the message &rarr;</span>
          </NuxtLink>
          <NuxtLink to="/mission-vission">
            <h3>Mission &amp; Vision</h3>
            <p>
              See what we are here to do and where we want to take students
              next.
            </p>
            <span>Our mission &rarr;</span>
          </NuxtLink>
          <NuxtLink to="/team">
            <h3>Meet the Team</h3>
            <p>
              A named, experienced team leads every application, not a call
              center.
            </p>
            <span>Meet the team &rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="cp-cta-h">
      <div class="svp-container">
        <h2 id="cp-cta-h">Ready to Start Your Study Abroad Journey?</h2>
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
const slug = "company-profile";
const pageUrl = siteUrl + slug;

/* ---------- Data ---------- */
const { data, pending, error, refresh } = await useApi(`/${slug}`, {
  key: "company-profile",
  transform: (res) => res.data,
});
const page = computed(() => data.value || null);

const hasContent = computed(
  () =>
    !!(
      page.value &&
      (page.value.overview || page.value.company_name || page.value.image)
    ),
);

/* ---------- Facts (only the ones that exist) ---------- */
const facts = computed(() => {
  const p = page.value;
  if (!p) return [];
  const list = [];
  if (p.company_name) list.push({ label: "Company", value: p.company_name });
  if (p.established_year) {
    const yrs = new Date().getFullYear() - Number(p.established_year);
    list.push({
      label: "Established",
      value: String(p.established_year),
      note: yrs > 0 ? `${yrs}+ years` : "",
    });
  }
  if (p.license_no) list.push({ label: "License no.", value: p.license_no });
  if (p.total_staff)
    list.push({
      label: "Team size",
      value: String(p.total_staff),
      note: "staff",
    });
  return list;
});

const stripHtml = (h) =>
  (h || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* ---------- SEO ---------- */
const seoTitle = computed(
  () =>
    page.value?.seo?.meta_title ||
    `Company Profile | ${page.value?.company_name || brand}`,
);
const seoDesc = computed(
  () =>
    page.value?.seo?.meta_description ||
    page.value?.tagline ||
    stripHtml(page.value?.overview).slice(0, 155) ||
    `Company profile of ${brand}: licensed study abroad consultants guiding Bangladeshi students.`,
);

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  keywords: () => page.value?.seo?.meta_keywords || undefined,
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogImage: () => page.value?.image || undefined,
  ogUrl: pageUrl,
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

const jsonLd = computed(() => {
  const p = page.value || {};
  const org = {
    "@type": "EducationalOrganization",
    name: p.company_name || brand,
    url: siteUrl,
    slogan: p.tagline || undefined,
    image: p.image || undefined,
    foundingDate: p.established_year ? String(p.established_year) : undefined,
    identifier: p.license_no || undefined,
    numberOfEmployees: p.total_staff
      ? {
          "@type": "QuantitativeValue",
          value: Number(p.total_staff) || String(p.total_staff),
        }
      : undefined,
  };
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Company Profile",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "AboutPage",
        url: pageUrl,
        name: seoTitle.value,
        inLanguage: "en",
      },
      org,
    ],
  });
});

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{ type: "application/ld+json", innerHTML: () => jsonLd.value }],
});
</script>

<style scoped>
.cp-msg {
  text-align: center;
  padding: 40px 0;
  color: var(--sec-slate);
}

/* Facts card (inside .svp-answer) */
.cp-facts {
  margin: 0;
  display: grid;
  gap: 8px;
}
.cp-facts div {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  align-items: baseline;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--sec-offwhite);
  font-size: 14px;
}
.cp-facts dt {
  color: var(--sec-slate);
  font-weight: 600;
}
.cp-facts dd {
  margin: 0;
  font-weight: 800;
  color: var(--sec-navy);
  overflow-wrap: anywhere;
}
.cp-facts small {
  margin-left: 8px;
  font-size: 12.5px;
  font-weight: 800;
  color: var(--sec-green-dk);
}

/* Overview */
.cp-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.25fr;
  gap: 48px;
  align-items: start;
}
.cp-grid.no-img {
  grid-template-columns: minmax(0, 860px);
}
.cp-media {
  position: sticky;
  top: 110px;
  margin: 0;
  border-radius: 16px;
  overflow: hidden;
  background: var(--sec-gold-bg);
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.1);
}
.cp-media img {
  width: 100%;
  display: block;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}
.cp-media figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 18px;
  background: rgba(22, 33, 58, 0.72);
  color: #fff;
  font-size: 13.5px;
  font-weight: 700;
}

.cp-prose {
  max-width: 68ch;
  font-size: 16.5px;
  line-height: 1.9;
  color: #475467;
}
.cp-prose :deep(p) {
  margin: 0 0 18px;
}
.cp-prose :deep(p:first-child) {
  font-size: 18.5px;
  line-height: 1.8;
  font-weight: 600;
  color: var(--sec-navy);
}
.cp-prose :deep(h2),
.cp-prose :deep(h3) {
  margin: 28px 0 10px;
  font-size: 21px;
  line-height: 1.3;
  font-weight: 800;
  color: var(--sec-navy);
}
.cp-prose :deep(ul),
.cp-prose :deep(ol) {
  margin: 0 0 18px;
  padding-left: 22px;
}
.cp-prose :deep(li) {
  margin-bottom: 8px;
}
.cp-prose :deep(strong) {
  color: var(--sec-navy);
}
.cp-prose :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
}

@media (max-width: 900px) {
  .cp-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .cp-media {
    position: relative;
    top: 0;
    max-width: 520px;
  }
  .cp-media img {
    aspect-ratio: 16 / 11;
  }
}
@media (max-width: 640px) {
  .cp-facts div {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  .cp-prose {
    font-size: 15.5px;
  }
  .cp-prose :deep(p:first-child) {
    font-size: 17px;
  }
}
</style>
