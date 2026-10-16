<template>
  <div class="svp">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="mv-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Mission &amp; Vision</span>
        </nav>

        <div class="mv-hero">
          <span class="svp-eyebrow"><i></i>Why we do what we do</span>
          <h1 id="mv-h1" class="svp-h1">
            {{ page?.title || "Our Mission & Vision" }}
            <span>at Sunrise Education Consultants</span>
          </h1>
          <p class="svp-sub">
            Every student we guide, every application we file and every visa we
            prepare is shaped by two things: what we are here to do, and where
            we want to take Bangladeshi students next.
          </p>

          <div v-if="blocks.length" class="svp-cta-row">
            <a
              v-for="(b, i) in blocks"
              :key="b.key"
              class="svp-btn"
              :class="i === 0 ? 'svp-btn-primary' : 'svp-btn-ghost'"
              :href="`#mv-${b.key}`"
              >{{ b.label }}</a
            >
          </div>
        </div>
      </div>
    </section>

    <!-- ================= MISSION + VISION ================= -->
    <section class="svp-section svp-services" aria-label="Mission and vision">
      <div class="svp-container">
        <p v-if="pending" class="svp-lead">Loading…</p>

        <div v-else-if="error" class="mv-msg">
          <p>Could not load this page right now.</p>
          <button
            type="button"
            class="svp-btn svp-btn-primary"
            @click="refresh()"
          >
            Try again
          </button>
        </div>

        <p v-else-if="!blocks.length" class="svp-lead">
          Our mission and vision will be published here soon.
        </p>

        <div v-else class="mv-list">
          <article
            v-for="(b, i) in blocks"
            :id="`mv-${b.key}`"
            :key="b.key"
            class="mv-block"
            :class="{ 'is-rev': i % 2 === 1 }"
            :aria-labelledby="`mv-${b.key}-h`"
          >
            <div class="mv-media" :class="b.tone">
              <img
                v-if="b.image"
                :src="b.image"
                :alt="page?.image_alt || b.title"
                loading="lazy"
              />
              <div v-else class="mv-ph" aria-hidden="true">{{ b.label }}</div>
              <span class="mv-tag">{{ b.label }}</span>
            </div>

            <div class="mv-body">
              <span class="svp-eyebrow"><i></i>{{ b.label }}</span>
              <h2 :id="`mv-${b.key}-h`" class="svp-h2">{{ b.title }}</h2>
              <div v-if="b.text" class="mv-prose" v-html="b.text"></div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="mv-cta-h">
      <div class="svp-container">
        <h2 id="mv-cta-h">Ready to Start Your Study Abroad Journey?</h2>
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
          <NuxtLink class="svp-btn svp-btn-ghost" to="/success-story"
            >Read Student Stories</NuxtLink
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const siteUrl = "https://sunrise-bd.net/";
const brand = "Sunrise Education Consultants";
const slug = "mission-vision";
const pageUrl = siteUrl + slug;

/* ---------- Data ---------- */
const { data, pending, error, refresh } = await useApi(`/${slug}`, {
  key: "mission-vision",
  transform: (res) => res.data,
});
const page = computed(() => data.value || null);

const hasContent = (s) => !!(s && (s.title || s.text || s.image));

const blocks = computed(() => {
  const p = page.value;
  if (!p) return [];
  const list = [];
  if (hasContent(p.mission))
    list.push({
      key: "mission",
      label: "Mission",
      tone: "is-green",
      title: p.mission.title || "Our Mission",
      text: p.mission.text,
      image: p.mission.image,
    });
  if (hasContent(p.vision))
    list.push({
      key: "vision",
      label: "Vision",
      tone: "is-blue",
      title: p.vision.title || "Our Vision",
      text: p.vision.text,
      image: p.vision.image,
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
  () => page.value?.seo?.meta_title || `Mission & Vision | ${brand}`,
);
const seoDesc = computed(
  () =>
    page.value?.seo?.meta_description ||
    stripHtml(page.value?.mission?.text).slice(0, 155) ||
    `Learn about the mission and vision of ${brand}, guiding Bangladeshi students from application to visa approval.`,
);
const ogImage = computed(
  () => page.value?.mission?.image || page.value?.vision?.image || undefined,
);

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  keywords: () => page.value?.seo?.meta_keywords || undefined,
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogImage: () => ogImage.value,
  ogUrl: pageUrl,
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

const jsonLd = computed(() =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Mission & Vision",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        url: pageUrl,
        name: seoTitle.value,
        inLanguage: "en",
        publisher: {
          "@type": "EducationalOrganization",
          name: brand,
          url: siteUrl,
        },
      },
    ],
  }),
);

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{ type: "application/ld+json", innerHTML: () => jsonLd.value }],
});
</script>

<style scoped>
.mv-hero {
  position: relative;
  max-width: 820px;
}
.mv-msg {
  text-align: center;
  padding: 40px 0;
  color: var(--sec-slate);
}

/* Blocks */
.mv-list {
  display: grid;
  gap: 40px;
}
.mv-block {
  scroll-margin-top: 110px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 0;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}
.mv-block.is-rev {
  grid-template-columns: 1.1fr 1fr;
}
.mv-block.is-rev .mv-media {
  order: 2;
}

/* Media side */
.mv-media {
  position: relative;
  overflow: hidden;
  min-height: 360px;
  color: #fff;
}
.mv-media.is-green {
  background: linear-gradient(145deg, #2fa84f, #1e6e39);
}
.mv-media.is-blue {
  background: linear-gradient(145deg, #2d6cb4, #16213a);
}
.mv-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.mv-ph {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 800;
  letter-spacing: -0.03em;
  opacity: 0.25;
}
.mv-ph::after {
  content: "";
  position: absolute;
  right: -90px;
  bottom: -90px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.5) 0 8deg,
    transparent 8deg 22deg
  );
}
.mv-tag {
  position: absolute;
  left: 18px;
  top: 18px;
  z-index: 1;
  font-size: 12px;
  font-weight: 800;
  padding: 7px 14px;
  border-radius: 999px;
  background: #fff;
  color: var(--sec-green-dk);
  box-shadow: 0 6px 16px rgba(22, 33, 58, 0.18);
}

/* Text side */
.mv-body {
  position: relative;
  padding: 48px 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.mv-body::before {
  content: "";
  position: absolute;
  left: 0;
  top: 40px;
  bottom: 40px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--sec-orange);
}
.mv-block.is-rev .mv-body::before {
  left: auto;
  right: 0;
  border-radius: 4px 0 0 4px;
}
.mv-body .svp-h2 {
  margin-bottom: 18px;
}

.mv-prose {
  max-width: 62ch;
  font-size: 16.5px;
  line-height: 1.85;
  color: #475467;
}
.mv-prose :deep(p) {
  margin: 0 0 16px;
}
.mv-prose :deep(p:last-child) {
  margin-bottom: 0;
}
.mv-prose :deep(ul),
.mv-prose :deep(ol) {
  margin: 0 0 16px;
  padding-left: 22px;
}
.mv-prose :deep(li) {
  margin-bottom: 8px;
}
.mv-prose :deep(strong) {
  color: var(--sec-navy);
}
.mv-prose :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
}

@media (max-width: 1100px) {
  .mv-body {
    padding: 36px 34px;
  }
}
@media (max-width: 900px) {
  .mv-block,
  .mv-block.is-rev {
    grid-template-columns: 1fr;
  }
  .mv-block.is-rev .mv-media {
    order: 0;
  }
  .mv-media {
    min-height: 0;
    aspect-ratio: 16 / 10;
  }
  .mv-block.is-rev .mv-body::before {
    left: 0;
    right: auto;
    border-radius: 0 4px 4px 0;
  }
}
@media (max-width: 640px) {
  .mv-list {
    gap: 28px;
  }
  .mv-body {
    padding: 28px 22px;
  }
  .mv-prose {
    font-size: 15.5px;
  }
}
</style>
