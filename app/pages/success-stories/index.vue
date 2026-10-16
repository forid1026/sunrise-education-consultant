<template>
  <div class="svp">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="sst-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Success Stories</span>
        </nav>

        <div class="svp-hero-grid">
          <div>
            <span class="svp-eyebrow"><i></i>Real students, real results</span>
            <h1 id="sst-h1" class="svp-h1">
              Student Success Stories <span>from Bangladesh</span>
            </h1>
            <p class="svp-sub">
              See how Bangladeshi students went from their first free assessment
              to admission and visa approval with
              <NuxtLink to="/">Sunrise Education Consultants</NuxtLink>. Every
              story is shared with the student's permission.
            </p>
            <div class="svp-cta-row">
              <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a class="svp-btn svp-btn-ghost" href="#sst-list"
                >Read the Stories</a
              >
            </div>
          </div>

          <aside
            v-if="countryCounts.length"
            class="svp-answer"
            aria-labelledby="sst-browse"
          >
            <h2 id="sst-browse">Browse stories by country</h2>
            <p>Pick a destination to see the students who studied there.</p>
            <ul class="svp-picks">
              <li v-for="c in countryCounts" :key="c.name">
                <a href="#sst-list" @click="active = c.name">
                  {{ c.name }}
                  <small
                    >{{ c.count }}
                    {{ c.count === 1 ? "story" : "stories" }}</small
                  >
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div class="svp-stats">
          <div v-for="s in heroStats" :key="s.small" class="svp-stat">
            <b>{{ s.big }}</b
            ><small>{{ s.small }}</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= STORIES ================= -->
    <section
      id="sst-list"
      class="svp-section svp-services"
      aria-labelledby="sst-list-h"
    >
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>Their words</span>
        <h2 id="sst-list-h" class="svp-h2">
          Our Successful Students, <span>In Their Own Words</span>
        </h2>
        <p class="svp-lead">
          From Italy to Canada, these are the students Sunrise has guided
          through admission, scholarships and student visas.
        </p>

        <p v-if="pending" class="svp-lead">Loading stories…</p>

        <div v-else-if="error" class="sst-msg">
          <p>Could not load stories right now.</p>
          <button
            type="button"
            class="svp-btn svp-btn-primary"
            @click="refresh()"
          >
            Try again
          </button>
        </div>

        <p v-else-if="!stories.length" class="svp-lead">
          Success stories will be listed here soon.
        </p>

        <template v-else>
          <div
            v-if="countryCounts.length > 1"
            class="sst-chips"
            role="tablist"
            aria-label="Filter by country"
          >
            <button
              v-for="c in chips"
              :key="c"
              type="button"
              role="tab"
              :aria-selected="active === c"
              :class="{ on: active === c }"
              @click="active = c"
            >
              {{ c }}
            </button>
          </div>

          <div class="sst-grid">
            <article v-for="s in shown" :key="s.id" class="sst-card">
              <div class="sst-photo">
                <img
                  v-if="s.image"
                  :src="s.image"
                  :alt="s.image_alt || s.name"
                  loading="lazy"
                />
                <div v-else class="sst-ph">{{ initial(s.name) }}</div>

                <button
                  v-if="s.video"
                  type="button"
                  class="sst-play"
                  :aria-label="`Watch ${s.name}'s video story`"
                  @click="openVideo(s)"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch story
                </button>
              </div>

              <div class="sst-body">
                <div class="sst-meta">
                  <span v-if="s.country" class="sst-country">{{
                    s.country
                  }}</span>
                  <span v-if="s.intake" class="sst-intake">{{ s.intake }}</span>
                </div>
                <span class="sst-q" aria-hidden="true">&ldquo;</span>

                <div
                  v-if="s.quotation"
                  class="sst-quote"
                  :class="{ 'is-clamp': !expanded.has(s.id) }"
                  v-html="s.quotation"
                ></div>
                <button
                  v-if="s.quotation && isLong(s.quotation)"
                  type="button"
                  class="sst-more"
                  :aria-expanded="expanded.has(s.id)"
                  @click="toggle(s.id)"
                >
                  {{ expanded.has(s.id) ? "Show less" : "Read more" }}
                </button>

                <div class="sst-foot">
                  <span class="svp-avatar" aria-hidden="true">{{
                    initial(s.name)
                  }}</span>
                  <div>
                    <b>{{ s.name }}</b>
                    <small v-if="s.university">{{ s.university }}</small>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </template>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="sst-cta-h">
      <div class="svp-container">
        <h2 id="sst-cta-h">Ready to Write Your Own Success Story?</h2>
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

    <!-- ================= VIDEO MODAL ================= -->
    <div
      v-if="video"
      class="sst-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="`${video.name} video story`"
      @click.self="closeVideo"
    >
      <div class="sst-modal-box">
        <button
          type="button"
          class="sst-close"
          aria-label="Close video"
          @click="closeVideo"
        >
          &times;
        </button>
        <div class="sst-frame">
          <iframe
            :src="`${video.video.embed_url}?autoplay=1&rel=0`"
            :title="`${video.name} video story`"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <p class="sst-modal-cap">
          <b>{{ video.name }}</b
          ><span v-if="video.country"> &middot; {{ video.country }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const siteUrl = "https://sunrise-bd.net/";
const brand = "Sunrise Education Consultants";
const pageUrl = siteUrl + "success-story";

/* ---------- Data ---------- */
const { data, pending, error, refresh } = await useApi("/success-stories", {
  key: "stories-list",
  transform: (res) => res.data,
});
const stories = computed(() => data.value || []);

/* ---------- Country filter ---------- */
const active = ref("All");

const countryCounts = computed(() => {
  const map = new Map();
  stories.value.forEach((s) => {
    if (s.country) map.set(s.country, (map.get(s.country) || 0) + 1);
  });
  return [...map].map(([name, count]) => ({ name, count }));
});
const chips = computed(() => [
  "All",
  ...countryCounts.value.map((c) => c.name),
]);
const shown = computed(() =>
  active.value === "All"
    ? stories.value
    : stories.value.filter((s) => s.country === active.value),
);

/* ---------- Hero stats (built from the data) ---------- */
const heroStats = computed(() => [
  { big: String(stories.value.length), small: "Student stories shared" },
  { big: String(countryCounts.value.length), small: "Study destinations" },
  {
    big: String(stories.value.filter((s) => s.video).length),
    small: "Video testimonials",
  },
  { big: "2014", small: "Guiding students since" },
]);

/* ---------- Read more ---------- */
const expanded = ref(new Set());
const toggle = (id) => {
  const next = new Set(expanded.value);
  next.has(id) ? next.delete(id) : next.add(id);
  expanded.value = next;
};
const isLong = (html) => html.replace(/<[^>]+>/g, "").length > 190;

/* ---------- Video modal ---------- */
const video = ref(null);
const openVideo = (s) => (video.value = s);
const closeVideo = () => (video.value = null);
const onKey = (e) => {
  if (e.key === "Escape") closeVideo();
};
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  if (import.meta.client) document.body.style.overflow = "";
});
watch(video, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? "hidden" : "";
});

const initial = (n) => n?.trim().charAt(0).toUpperCase() || "?";

/* ---------- SEO ---------- */
useSeoMeta({
  title: `Student Success Stories | ${brand}`,
  description:
    "Read and watch how Bangladeshi students reached universities abroad with Sunrise Education Consultants, from application to visa approval.",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: `Student Success Stories | ${brand}`,
  ogUrl: pageUrl,
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
                name: "Success stories",
                item: pageUrl,
              },
            ],
          },
          {
            "@type": "CollectionPage",
            url: pageUrl,
            name: "Student Success Stories",
            inLanguage: "en",
            publisher: {
              "@type": "EducationalOrganization",
              name: brand,
              url: siteUrl,
            },
          },
        ],
      }),
    },
  ],
});
</script>

<style scoped>
.sst-msg {
  text-align: center;
  padding: 40px 0;
  color: var(--sec-slate);
}

/* Filter chips */
.sst-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 34px;
}
.sst-chips button {
  border: 1.5px solid var(--sec-line);
  background: #fff;
  color: var(--sec-navy);
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}
.sst-chips button:hover {
  border-color: var(--sec-green);
  color: var(--sec-green-dk);
}
.sst-chips button.on {
  background: var(--sec-navy);
  border-color: var(--sec-navy);
  color: #fff;
}

/* Cards */
.sst-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
  align-items: stretch;
}
.sst-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.sst-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 44px rgba(22, 33, 58, 0.12);
}

.sst-photo {
  position: relative;
  aspect-ratio: 4 / 3;
  background: var(--sec-gold-bg);
}
.sst-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.sst-ph {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 64px;
  font-weight: 800;
  color: var(--sec-green);
}
.sst-play {
  position: absolute;
  left: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px 0 10px;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.96);
  color: var(--sec-navy);
  font-family: inherit;
  font-weight: 800;
  font-size: 13px;
  box-shadow: 0 10px 20px rgba(22, 33, 58, 0.25);
  transition: transform 0.2s;
}
.sst-play:hover {
  transform: scale(1.05);
}
.sst-play svg {
  width: 24px;
  height: 24px;
  padding: 5px;
  border-radius: 50%;
  background: var(--sec-green);
  color: #fff;
}

.sst-body {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 22px;
}
.sst-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.sst-country,
.sst-intake {
  font-size: 12px;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 999px;
}
.sst-country {
  background: rgba(47, 168, 79, 0.12);
  color: var(--sec-green-dk);
}
.sst-intake {
  background: var(--sec-gold-bg);
  color: #b87400;
}
.sst-q {
  position: absolute;
  right: 20px;
  top: 6px;
  font-family: Georgia, serif;
  font-size: 70px;
  line-height: 1;
  color: rgba(245, 166, 35, 0.22);
  pointer-events: none;
}
.sst-quote {
  font-size: 14.5px;
  line-height: 1.8;
  color: #475467;
}
.sst-quote :deep(p) {
  margin: 0 0 10px;
}
.sst-quote :deep(p:last-child) {
  margin-bottom: 0;
}
.sst-quote.is-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sst-more {
  align-self: flex-start;
  border: 0;
  background: none;
  padding: 6px 0;
  margin: 4px 0 0;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 800;
  color: var(--sec-green-dk);
  cursor: pointer;
}
.sst-more:hover {
  text-decoration: underline;
}
.sst-foot {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--sec-line);
}
.sst-quote,
.sst-more {
  margin-bottom: 16px;
}
.sst-foot b {
  display: block;
  font-size: 15px;
  color: var(--sec-navy);
}
.sst-foot small {
  display: block;
  font-size: 13px;
  line-height: 1.4;
  color: var(--sec-slate);
}

/* Video modal */
.sst-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(22, 33, 58, 0.8);
  backdrop-filter: blur(4px);
}
.sst-modal-box {
  position: relative;
  width: min(920px, 100%);
}
.sst-close {
  position: absolute;
  right: 0;
  top: -46px;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: var(--sec-navy);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}
.sst-frame {
  position: relative;
  padding-top: 56.25%;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
}
.sst-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.sst-modal-cap {
  margin: 12px 0 0;
  color: #fff;
  text-align: center;
}

@media (max-width: 1100px) {
  .sst-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .sst-grid {
    grid-template-columns: 1fr;
  }
  .sst-chips {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 6px;
  }
  .sst-chips button {
    flex: none;
  }
}
</style>
