<template>
  <div class="svp">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="mc-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Message from the CEO</span>
        </nav>

        <div class="mc-hero">
          <span class="svp-eyebrow"
            ><i></i>A note to every student and parent</span
          >
          <h1 id="mc-h1" class="svp-h1">
            {{ ceo?.title || "Message from the CEO" }}
            <span>Sunrise Education Consultants</span>
          </h1>
          <p class="svp-sub">
            Read what drives our team, how we work with students and families,
            and the promise we make before you start your study abroad journey.
          </p>

          <div v-if="ceo?.name" class="svp-byline">
            <span class="svp-avatar" aria-hidden="true">{{
              initial(ceo.name)
            }}</span>
            <span>
              <b>{{ ceo.name }}</b
              ><template v-if="ceo.designation">
                &middot; {{ ceo.designation }}</template
              >
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= MESSAGE ================= -->
    <section class="svp-section svp-services" aria-labelledby="mc-body-h">
      <div class="svp-container">
        <h2 id="mc-body-h" class="mc-sr">The message</h2>

        <p v-if="pending" class="svp-lead">Loading message…</p>

        <div v-else-if="error" class="mc-msg">
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

        <div v-else class="mc-grid">
          <!-- profile card -->
          <aside class="mc-card" aria-label="About the author">
            <div class="mc-photo">
              <img
                v-if="ceo.photo"
                :src="ceo.photo"
                :alt="
                  ceo.photo_alt ||
                  `${ceo.name || 'CEO'}, ${ceo.designation || 'CEO'} of Sunrise Education Consultants`
                "
                loading="eager"
              />
              <div v-else class="mc-ph">{{ initial(ceo.name) }}</div>
            </div>
            <div class="mc-id">
              <b v-if="ceo.name">{{ ceo.name }}</b>
              <span v-if="ceo.designation">{{ ceo.designation }}</span>
              <small>Sunrise Education Consultants</small>
            </div>
            <NuxtLink class="svp-btn svp-btn-primary mc-btn" to="/apply-now">
              Get Free Assessment <span aria-hidden="true">&rarr;</span>
            </NuxtLink>
          </aside>

          <!-- message -->
          <article class="mc-article">
            <span class="mc-q" aria-hidden="true">&ldquo;</span>
            <div v-if="ceo.message" class="mc-prose" v-html="ceo.message"></div>

            <div v-if="ceo.name" class="mc-sign">
              <span class="mc-sign-line" aria-hidden="true"></span>
              <b>{{ ceo.name }}</b>
              <small v-if="ceo.designation"
                >{{ ceo.designation }}, Sunrise Education Consultants</small
              >
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="mc-cta-h">
      <div class="svp-container">
        <h2 id="mc-cta-h">Let's Plan Your Study Abroad Journey</h2>
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
const pageUrl = siteUrl + "message-from-ceo";

/* ---------- Data ---------- */
const { data, pending, error, refresh } = await useApi("/message-from-ceo", {
  key: "ceo-message",
  transform: (res) => res.data,
});
const ceo = computed(() => data.value || null);
const hasContent = computed(
  () => !!(ceo.value && (ceo.value.message || ceo.value.name)),
);

const initial = (n) => n?.trim().charAt(0).toUpperCase() || "?";
const stripHtml = (h) =>
  (h || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* ---------- SEO (API values first, sensible fallbacks) ---------- */
const seoTitle = computed(
  () => ceo.value?.seo?.meta_title || `Message from the CEO | ${brand}`,
);
const seoDesc = computed(
  () =>
    ceo.value?.seo?.meta_description ||
    stripHtml(ceo.value?.message).slice(0, 155) ||
    `Read the message from the CEO of ${brand} to students and parents planning to study abroad.`,
);

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  keywords: () => ceo.value?.seo?.meta_keywords || undefined,
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogImage: () => ceo.value?.photo || undefined,
  ogUrl: pageUrl,
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

const jsonLd = computed(() => {
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Message from the CEO",
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
  ];
  if (ceo.value?.name) {
    graph.push({
      "@type": "Person",
      name: ceo.value.name,
      jobTitle: ceo.value.designation || undefined,
      image: ceo.value.photo || undefined,
      worksFor: {
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
.mc-hero {
  position: relative;
  max-width: 820px;
}
.mc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.mc-msg {
  text-align: center;
  padding: 40px 0;
  color: var(--sec-slate);
}

/* Layout */
.mc-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 48px;
  align-items: start;
}

/* Profile card */
.mc-card {
  position: sticky;
  top: 110px;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}
.mc-photo {
  position: relative;
  aspect-ratio: 4 / 5;
  background: var(--sec-gold-bg);
}
.mc-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.mc-ph {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 96px;
  font-weight: 800;
  color: var(--sec-green);
}
.mc-id {
  padding: 22px 24px 6px;
  border-top: 4px solid var(--sec-orange);
}
.mc-id b {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: var(--sec-navy);
}
.mc-id span {
  display: block;
  margin-top: 2px;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--sec-green-dk);
}
.mc-id small {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: var(--sec-slate);
}
.mc-btn {
  margin: 18px 24px 24px;
  width: calc(100% - 48px);
  justify-content: center;
}

/* Message */
.mc-article {
  position: relative;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 48px 52px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}
.mc-article::before {
  content: "";
  position: absolute;
  left: 0;
  top: 32px;
  bottom: 32px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--sec-green);
}
.mc-q {
  position: absolute;
  right: 36px;
  top: 14px;
  font-family: Georgia, serif;
  font-size: 140px;
  line-height: 1;
  color: rgba(245, 166, 35, 0.2);
  pointer-events: none;
}
.mc-prose {
  position: relative;
  max-width: 68ch;
  font-size: 17px;
  line-height: 1.9;
  color: #475467;
}
.mc-prose :deep(p) {
  margin: 0 0 20px;
}
.mc-prose :deep(p:first-child) {
  font-size: 19.5px;
  line-height: 1.8;
  font-weight: 600;
  color: var(--sec-navy);
}
.mc-prose :deep(h2),
.mc-prose :deep(h3) {
  margin: 30px 0 12px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 800;
  color: var(--sec-navy);
}
.mc-prose :deep(ul),
.mc-prose :deep(ol) {
  margin: 0 0 20px;
  padding-left: 22px;
}
.mc-prose :deep(li) {
  margin-bottom: 8px;
}
.mc-prose :deep(blockquote) {
  margin: 26px 0;
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

.mc-sign {
  margin-top: 34px;
  padding-top: 24px;
  border-top: 1px solid var(--sec-line);
}
.mc-sign-line {
  display: block;
  width: 46px;
  height: 3px;
  border-radius: 3px;
  background: var(--sec-orange);
  margin-bottom: 14px;
}
.mc-sign b {
  display: block;
  font-size: 18px;
  font-weight: 800;
  color: var(--sec-navy);
}
.mc-sign small {
  display: block;
  margin-top: 2px;
  font-size: 14px;
  color: var(--sec-slate);
}

@media (max-width: 1100px) {
  .mc-grid {
    grid-template-columns: 280px 1fr;
    gap: 32px;
  }
  .mc-article {
    padding: 38px 34px;
  }
}
@media (max-width: 900px) {
  .mc-grid {
    grid-template-columns: 1fr;
  }
  .mc-card {
    position: static;
    max-width: 380px;
  }
}
@media (max-width: 640px) {
  .mc-article {
    padding: 28px 22px;
  }
  .mc-q {
    font-size: 96px;
    right: 18px;
  }
  .mc-prose {
    font-size: 16px;
  }
  .mc-prose :deep(p:first-child) {
    font-size: 17.5px;
  }
  .mc-card {
    max-width: none;
  }
}
</style>
