<template>
  <div class="svp blg">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="blg-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <span aria-current="page">Blog</span>
        </nav>

        <div class="blg-head">
          <span class="svp-eyebrow"><i></i>Sunrise Blog</span>
          <h1 id="blg-h1" class="svp-h1">
            Study Abroad Guides <span>for Bangladeshi Students</span>
          </h1>
          <p class="svp-sub">
            Practical, up-to-date guides on admissions, scholarships, visas and
            student life abroad, written by the Sunrise counselling team for
            students and parents.
          </p>

          <form class="blg-search" role="search" @submit.prevent="submitSearch">
            <label class="blg-sr" for="blg-q">Search articles</label>
            <input
              id="blg-q"
              v-model="term"
              type="search"
              placeholder="Search articles, e.g. Italy visa"
              autocomplete="off"
            />
            <button type="submit" class="svp-btn svp-btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- ================= LIST ================= -->
    <section
      id="blg-list"
      class="svp-section blg-list"
      aria-labelledby="blg-list-h"
    >
      <div class="svp-container">
        <nav
          v-if="categories.length"
          class="blg-chips"
          aria-label="Filter by category"
        >
          <NuxtLink :to="{ path: '/blog' }" :class="{ on: !category }"
            >All posts</NuxtLink
          >
          <NuxtLink
            v-for="c in categories"
            :key="c.slug"
            :to="{ path: '/blog', query: { category: c.slug } }"
            :class="{ on: category === c.slug }"
            >{{ c.name }}</NuxtLink
          >
        </nav>

        <h2 id="blg-list-h" class="svp-h2">
          {{ listTitle }}
        </h2>
        <p v-if="q || category" class="blg-filter-note">
          <span v-if="meta?.total != null"
            >{{ meta.total }} article{{
              meta.total === 1 ? "" : "s"
            }}
            found.</span
          >
          <NuxtLink to="/blog">Clear filters</NuxtLink>
        </p>

        <p v-if="pending && !posts.length" class="blg-state">
          Loading articles…
        </p>

        <div v-else-if="error" class="blg-state">
          <p>Could not load articles right now.</p>
          <button
            type="button"
            class="svp-btn svp-btn-primary"
            @click="refresh()"
          >
            Try again
          </button>
        </div>

        <div v-else-if="!posts.length" class="blg-state">
          <p>No articles found. Try a different search or category.</p>
          <NuxtLink class="svp-btn svp-btn-ghost" to="/blog"
            >View all posts</NuxtLink
          >
        </div>

        <template v-else>
            <div class="blg-grid">
            <BlogCard v-for="p in posts" :key="p.id" :post="p" />
          </div>

          <div class="blg-grid">
            <BlogCard v-for="p in gridPosts" :key="p.id" :post="p" />
          </div>

          <nav v-if="lastPage > 1" class="blg-pager" aria-label="Pagination">
            <NuxtLink
              v-if="page > 1"
              class="blg-pg"
              :to="pageTo(page - 1)"
              rel="prev"
              >&larr; Previous</NuxtLink
            >
            <template v-for="(n, i) in pages" :key="`${n}-${i}`">
              <span v-if="n === '…'" class="blg-gap">…</span>
              <NuxtLink
                v-else
                class="blg-pg num"
                :class="{ on: n === page }"
                :to="pageTo(n)"
                :aria-current="n === page ? 'page' : undefined"
                >{{ n }}</NuxtLink
              >
            </template>
            <NuxtLink
              v-if="page < lastPage"
              class="blg-pg"
              :to="pageTo(page + 1)"
              rel="next"
              >Next &rarr;</NuxtLink
            >
          </nav>
        </template>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="blg-cta-h">
      <div class="svp-container">
        <h2 id="blg-cta-h">Not Sure Which Country Fits You?</h2>
        <p>
          Book a free assessment. A Sunrise counsellor will review your results,
          English and budget and give you an honest plan.
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
const config = useRuntimeConfig();
const siteUrl =
  (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";
const brand = "Sunrise Education Consultants";
const PER_PAGE = 9;

const route = useRoute();
const router = useRouter();

/* ---------- Filters live in the URL, so every view can be shared and indexed ---------- */
const page = computed(() => Math.max(1, parseInt(route.query.page, 10) || 1));
const category = computed(() => String(route.query.category || ""));
const q = computed(() => String(route.query.q || "").trim());

const apiQuery = computed(() => ({
  per_page: PER_PAGE,
  page: page.value,
  ...(category.value ? { category: category.value } : {}),
  ...(q.value ? { search: q.value } : {}),
}));

/* ---------- Data ---------- */
const { data: catData } = await useApi("/blog-categories", {
  key: "blog-categories",
  transform: (res) => res.data,
});
const categories = computed(() =>
  Array.isArray(catData.value) ? catData.value : [],
);

// No transform here: the pager needs "meta" from the paginated response
const { data, pending, error, refresh } = await useApi("/blogs", {
  key: "blogs-list",
  query: apiQuery,
});

const posts = computed(() =>
  Array.isArray(data.value?.data) ? data.value.data : [],
);
const meta = computed(() => data.value?.meta || null);
const lastPage = computed(() => meta.value?.last_page || 1);

const activeCat = computed(() =>
  categories.value.find((c) => c.slug === category.value),
);


const listTitle = computed(() => {
  if (q.value) return `Results for “${q.value}”`;
  if (activeCat.value) return activeCat.value.name;
  return "Latest Articles";
});

/* ---------- Search ---------- */
const term = ref(q.value);
watch(q, (v) => (term.value = v));

const baseQuery = computed(() => ({
  ...(category.value ? { category: category.value } : {}),
  ...(q.value ? { q: q.value } : {}),
}));

const submitSearch = () => {
  const t = term.value.trim();
  router.push({
    path: "/blog",
    query: {
      ...(category.value ? { category: category.value } : {}),
      ...(t ? { q: t } : {}),
    },
  });
};

/* ---------- Pagination ---------- */
const pageTo = (n) => ({
  path: "/blog",
  query: { ...baseQuery.value, ...(n > 1 ? { page: n } : {}) },
});

const pages = computed(() => {
  const last = lastPage.value;
  const cur = page.value;
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  const nums = [...new Set([1, last, cur - 1, cur, cur + 1])]
    .filter((n) => n >= 1 && n <= last)
    .sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
});

// Scroll to the list when the filter or page changes
watch(
  () => route.fullPath,
  () => {
    if (!import.meta.client || route.path !== "/blog") return;
    nextTick(() =>
      document
        .getElementById("blg-list")
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  },
);

/* ---------- SEO ---------- */
const seoTitle = computed(() => {
  const base = activeCat.value
    ? `${activeCat.value.name} Articles`
    : "Study Abroad Blog";
  const pg = page.value > 1 ? ` (Page ${page.value})` : "";
  return `${base}${pg} | ${brand}`;
});
const seoDesc =
  "Guides on study abroad admissions, scholarships, student visas and student life for Bangladeshi students, from the Sunrise Education Consultants counselling team.";

const canonical = computed(() => {
  const params = new URLSearchParams();
  if (category.value) params.set("category", category.value);
  if (page.value > 1 && !q.value) params.set("page", String(page.value));
  const s = params.toString();
  return siteUrl + "blog" + (s && !q.value ? `?${s}` : "");
});

useSeoMeta({
  title: () => seoTitle.value,
  description: seoDesc,
  // Search result pages should not be indexed
  robots: () =>
    q.value ? "noindex, follow" : "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: () => seoTitle.value,
  ogDescription: seoDesc,
  ogUrl: () => canonical.value,
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

useHead(() => ({
  link: [{ rel: "canonical", href: canonical.value }],
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
                name: "Blog",
                item: siteUrl + "blog",
              },
            ],
          },
          {
            "@type": "Blog",
            "@id": siteUrl + "blog#blog",
            url: siteUrl + "blog",
            name: `${brand} Blog`,
            description: seoDesc,
            inLanguage: "en",
            publisher: { "@type": "Organization", name: brand, url: siteUrl },
            blogPost: posts.value.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `${siteUrl}blog/${p.slug}`,
              ...(p.published_at ? { datePublished: p.published_at } : {}),
              ...(p.image ? { image: p.image } : {}),
            })),
          },
        ],
      }).replace(/</g, "\\u003c"),
    },
  ],
}));
</script>

<style scoped>
.blg-head {
  position: relative;
  max-width: 820px;
}
.blg-head .svp-sub {
  max-width: 680px;
}
.blg-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

/* Search */
.blg-search {
  display: flex;
  gap: 10px;
  max-width: 560px;
}
.blg-search input {
  flex: 1;
  min-width: 0;
  font-family: inherit;
  font-size: 15px;
  padding: 14px 18px;
  border-radius: 8px;
  border: 1.5px solid var(--sec-line);
  background: #fff;
  color: var(--sec-navy);
  outline: none;
  transition: border-color 0.2s;
}
.blg-search input:focus {
  border-color: var(--sec-green);
}

/* Category chips */
.blg-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 34px;
}
.blg-chips a {
  padding: 10px 18px;
  border-radius: 999px;
  border: 1.5px solid var(--sec-line);
  background: #fff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  color: var(--sec-navy);
  transition: all 0.2s;
}
.blg-chips a:hover {
  border-color: var(--sec-green);
  color: var(--sec-green-dk);
}
.blg-chips a.on {
  background: var(--sec-navy);
  border-color: var(--sec-navy);
  color: #fff;
}

.blg-list {
  scroll-margin-top: 100px;
}
.blg-filter-note {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: -4px 0 26px;
  font-size: 14px;
  color: var(--sec-slate);
}
.blg-filter-note a {
  color: var(--sec-green-dk);
  font-weight: 800;
}

/* Layout */
.blg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* States */
.blg-state {
  display: grid;
  justify-items: center;
  gap: 14px;
  padding: 40px 20px;
  text-align: center;
  border: 1.5px dashed var(--sec-line);
  border-radius: 16px;
  color: var(--sec-slate);
}
.blg-state p {
  margin: 0;
}

/* Pagination */
.blg-pager {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
}
.blg-pg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 42px;
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1.5px solid var(--sec-line);
  background: #fff;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  color: var(--sec-navy);
  transition: all 0.2s;
}
.blg-pg:hover {
  border-color: var(--sec-green);
  color: var(--sec-green-dk);
}
.blg-pg.on {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
}
.blg-gap {
  padding: 0 4px;
  color: var(--sec-slate);
}

@media (max-width: 1100px) {
  .blg-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .blg-grid {
    grid-template-columns: 1fr;
  }
  .blg-search {
    flex-direction: column;
  }
  .blg-chips {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-right: -16px;
    padding-bottom: 4px;
    scrollbar-width: none;
  }
  .blg-chips::-webkit-scrollbar {
    display: none;
  }
  .blg-chips a {
    flex: none;
  }
}
</style>
