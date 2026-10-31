<template>
  <div v-if="post" class="svp blg">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="blg-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <NuxtLink to="/blog">Blog</NuxtLink><span>/</span>
          <template v-if="post.category">
            <NuxtLink
              :to="{ path: '/blog', query: { category: post.category.slug } }"
              >{{ post.category.name }}</NuxtLink
            ><span>/</span>
          </template>
          <span aria-current="page">Article</span>
        </nav>

        <div class="blg-head">
          <NuxtLink
            v-if="post.category"
            class="svp-eyebrow blg-cat"
            :to="{ path: '/blog', query: { category: post.category.slug } }"
            ><i></i>{{ post.category.name }}</NuxtLink
          >
          <span v-else class="svp-eyebrow"><i></i>Sunrise Blog</span>

          <h1 id="blg-h1" class="svp-h1 blg-title">{{ post.title }}</h1>
          <p v-if="excerpt" class="svp-sub">{{ excerpt }}</p>

          <p class="blg-meta">
            <span>By {{ brand }}</span>
            <span v-if="post.published_at"
              ><time :datetime="post.published_at">{{
                blogDate(post.published_at)
              }}</time></span
            >
            <span>{{ readMinutes }} min read</span>
          </p>
        </div>
      </div>
    </section>

    <!-- ================= ARTICLE ================= -->
    <section class="svp-section blg-body">
      <div class="svp-container">
        <figure v-if="post.image && !coverFailed" class="blg-cover">
          <img
            ref="cover"
            :src="post.image"
            :alt="post.image_alt || post.title"
            width="1200"
            height="630"
            fetchpriority="high"
            decoding="async"
            @error="coverFailed = true"
          />
        </figure>

        <div class="blg-layout">
          <article class="blg-art">
            <div
              v-if="prepared.html"
              class="blg-prose"
              @click="onProseClick"
              v-html="prepared.html"
            ></div>
            <p v-else class="svp-lead">
              This article is being updated. Please check back soon.
            </p>

            <!-- Share -->
            <div class="blg-share">
              <b>Share this article</b>
              <div>
                <a
                  v-for="s in shareLinks"
                  :key="s.name"
                  :href="s.href"
                  target="_blank"
                  rel="noopener"
                  >{{ s.name }}</a
                >
                <button type="button" @click="copyLink">
                  {{ copied ? "Link copied" : "Copy link" }}
                </button>
              </div>
            </div>

            <!-- Author / CTA box -->
            <div class="blg-author">
              <span class="blg-badge" aria-hidden="true">S</span>
              <div>
                <h3>Written by the {{ brand }} team</h3>
                <p>
                  Our counsellors have guided Bangladeshi students to
                  universities abroad since 2014. Rules and fees change often,
                  so always confirm the latest requirement with the official
                  embassy or university.
                </p>
                <NuxtLink class="blg-link" to="/staff"
                  >Meet our counsellors &rarr;</NuxtLink
                >
              </div>
            </div>
          </article>

          <aside class="blg-side">
            <nav
              v-if="prepared.toc.length"
              class="blg-box blg-toc"
              aria-label="On this page"
            >
              <h3>On this page</h3>
              <ul>
                <li v-for="t in prepared.toc" :key="t.id">
                  <a
                    :href="`#${t.id}`"
                    :class="{ on: active === t.id, sub: t.level === 3 }"
                    >{{ t.text }}</a
                  >
                </li>
              </ul>
            </nav>

            <div class="blg-box blg-cta">
              <h3>Talk to a counsellor</h3>
              <p>
                Free assessment. We check your results, English and budget and
                tell you honestly what to do next.
              </p>
              <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a class="svp-btn svp-btn-ghost" href="tel:+8801911878274"
                >Call 01911 878 274</a
              >
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ================= RELATED ================= -->
    <section
      v-if="related.length"
      class="svp-section svp-services"
      aria-labelledby="blg-rel-h"
    >
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>Keep reading</span>
        <h2 id="blg-rel-h" class="svp-h2">
          {{
            post.category ? `More in ${post.category.name}` : "More Articles"
          }}
        </h2>
        <div class="blg-grid">
          <BlogCard v-for="p in related" :key="p.id" :post="p" />
        </div>
        <div class="blg-all">
          <NuxtLink class="svp-btn svp-btn-ghost" to="/blog"
            >View all articles <span aria-hidden="true">&rarr;</span></NuxtLink
          >
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="blg-cta-h">
      <div class="svp-container">
        <h2 id="blg-cta-h">Ready to Start Your Study Abroad Journey?</h2>
        <p>
          Book a free assessment. A Sunrise counsellor will review your profile
          and build an honest plan for admission, scholarship and visa.
        </p>
        <div class="svp-cta-row" style="justify-content: center; margin: 0">
          <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
            >Get Free Assessment
            <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <NuxtLink class="svp-btn svp-btn-ghost" to="/contact-us"
            >Contact Us</NuxtLink
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

definePageMeta({ key: (r) => r.fullPath });

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const pageUrl = `${siteUrl}blog/${slug}`;

/* ---------- Data ---------- */
const { data } = await useApi(`/blogs/${slug}`, {
  key: `blog-${slug}`,
  transform: (res) => res.data,
});

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Article not found",
    fatal: true,
  });
}
const post = computed(() => data.value);

// Related posts: same category when the API supports ?category=, otherwise the latest posts
const { data: relatedData } = await useApi("/blogs", {
  key: `blog-related-${slug}`,
  query: {
    per_page: 4,
    ...(post.value.category?.slug
      ? { category: post.value.category.slug }
      : {}),
  },
  transform: (res) => res.data,
});
const related = computed(() =>
  (Array.isArray(relatedData.value) ? relatedData.value : [])
    .filter((p) => p.slug !== slug)
    .slice(0, 3),
);

/* ---------- Helpers ---------- */
const decode = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&rsquo;|&lsquo;/g, "’")
    .replace(/&[a-z]+;/gi, " ");

const stripHtml = (html) =>
  decode(String(html || "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

// Own-site links become internal links, other links open in a new tab
const fixLinks = (html) =>
  (html || "")
    .replace(/href="https?:\/\/(?:www\.)?sunrise-bd\.net\/?/gi, 'href="/')
    .replace(
      /<a\s+([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi,
      (m, a, href, b) =>
        /target=/i.test(a + b)
          ? m
          : `<a ${a}href="${href}"${b} target="_blank" rel="noopener">`,
    );

/* ---------- Article content: ids for headings, contents list, lazy images, scrollable tables ---------- */
const prepared = computed(() => {
  const toc = [];
  const seen = {};

  let html = fixLinks(post.value.content)
    .replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
    .replace(
      /<img(?![^>]*\sloading=)/gi,
      '<img loading="lazy" decoding="async"',
    )
    .replace(/<table/gi, '<div class="blg-tbl"><table')
    .replace(/<\/table>/gi, "</table></div>");

  html = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (m, lvl, attrs, inner) => {
      const text = stripHtml(inner);
      if (!text) return m;
      let id = "h-" + slugify(text);
      seen[id] = (seen[id] || 0) + 1;
      if (seen[id] > 1) id += "-" + seen[id];
      toc.push({ id, text, level: Number(lvl) });
      return `<h${lvl}${attrs.replace(/\sid="[^"]*"/i, "")} id="${id}">${inner}</h${lvl}>`;
    },
  );

  return { html, toc };
});

const excerpt = computed(() => stripHtml(post.value.excerpt));
const words = computed(
  () => stripHtml(post.value.content).split(/\s+/).filter(Boolean).length,
);
const readMinutes = computed(() => Math.max(1, Math.round(words.value / 200)));

/* ---------- Share ---------- */
const shareLinks = computed(() => {
  const u = encodeURIComponent(pageUrl);
  const t = encodeURIComponent(post.value.title);
  return [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
  ];
});
const copied = ref(false);
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(pageUrl);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    /* clipboard blocked: ignore */
  }
};

/* ---------- Internal links inside the article should not reload the page ---------- */
const onProseClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const a = e.target.closest("a");
  const href = a?.getAttribute("href");
  if (href && href.startsWith("/") && !href.startsWith("//") && !a.target) {
    e.preventDefault();
    router.push(href);
  }
};

/* ---------- Cover image + active heading (browser only) ---------- */
const coverFailed = ref(false);
const cover = ref(null);
const active = ref("");
let io = null;

onMounted(() => {
  if (cover.value && cover.value.complete && cover.value.naturalWidth === 0) {
    coverFailed.value = true;
  }
  if (!("IntersectionObserver" in window)) return;
  io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = e.target.id;
      }),
    { rootMargin: "-20% 0px -70% 0px" },
  );
  document
    .querySelectorAll('.blg-prose [id^="h-"]')
    .forEach((el) => io.observe(el));
});
onBeforeUnmount(() => io?.disconnect());

/* ---------- SEO ---------- */
const seoTitle = computed(
  () => post.value.seo?.meta_title || `${post.value.title} | ${brand}`,
);
const seoDesc = computed(() => {
  const d =
    post.value.seo?.meta_description ||
    excerpt.value ||
    stripHtml(post.value.content);
  return d.length > 158 ? d.slice(0, 158).replace(/\s+\S*$/, "") + "…" : d;
});

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  keywords: () => post.value.seo?.meta_keywords || undefined,
  robots: "index, follow, max-image-preview:large",
  ogType: "article",
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogUrl: pageUrl,
  ogImage: () => post.value.image || undefined,
  ogSiteName: brand,
  articlePublishedTime: () => post.value.published_at || undefined,
  articleSection: () => post.value.category?.name || undefined,
  twitterCard: "summary_large_image",
});

useHead(() => ({
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
                name: "Blog",
                item: siteUrl + "blog",
              },
              ...(post.value.category
                ? [
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: post.value.category.name,
                      item: `${siteUrl}blog?category=${post.value.category.slug}`,
                    },
                  ]
                : []),
              {
                "@type": "ListItem",
                position: post.value.category ? 4 : 3,
                name: post.value.title,
                item: pageUrl,
              },
            ],
          },
          {
            "@type": "BlogPosting",
            "@id": pageUrl + "#post",
            mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
            headline: post.value.title,
            description: seoDesc.value,
            inLanguage: "en",
            url: pageUrl,
            ...(post.value.image ? { image: [post.value.image] } : {}),
            ...(post.value.published_at
              ? {
                  datePublished: post.value.published_at,
                  dateModified:
                    post.value.updated_at || post.value.published_at,
                }
              : {}),
            ...(post.value.category
              ? { articleSection: post.value.category.name }
              : {}),
            wordCount: words.value,
            author: { "@type": "Organization", name: brand, url: siteUrl },
            publisher: { "@type": "Organization", name: brand, url: siteUrl },
          },
        ],
      }).replace(/</g, "\\u003c"),
    },
  ],
}));
</script>

<style scoped>
/* ---------- Header ---------- */
.blg-head {
  position: relative;
  max-width: 860px;
}
.blg-cat {
  text-decoration: none;
}
.blg-title {
  font-size: clamp(28px, 3.8vw, 44px);
  line-height: 1.18;
}
.blg-head .svp-sub {
  max-width: 740px;
  margin-bottom: 20px;
}
.blg-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin: 0;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--sec-slate);
}
.blg-meta span:not(:last-child)::after {
  content: "·";
  margin-left: 18px;
  color: var(--sec-line);
}

/* ---------- Body ---------- */
.blg-body {
  padding-top: 36px;
}
.blg-cover {
  margin: 0 0 36px;
  aspect-ratio: 16 / 7.5;
  border-radius: 20px;
  overflow: hidden;
  background: var(--sec-gold-bg);
  box-shadow: 0 18px 40px rgba(22, 33, 58, 0.12);
}
.blg-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.blg-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 36px;
  align-items: start;
}
.blg-art {
  min-width: 0;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
}

/* Rich text from the admin editor */
.blg-prose {
  font-size: 17px;
  line-height: 1.9;
  color: #475467;
  overflow-wrap: anywhere;
}
.blg-prose :deep(h2),
.blg-prose :deep(h3),
.blg-prose :deep(h4) {
  color: var(--sec-navy);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.01em;
  scroll-margin-top: 110px;
}
.blg-prose :deep(h2) {
  font-size: clamp(24px, 2.6vw, 30px);
  margin: 42px 0 14px;
}
.blg-prose :deep(h3) {
  font-size: 22px;
  margin: 32px 0 12px;
}
.blg-prose :deep(h4) {
  font-size: 18px;
  margin: 26px 0 10px;
}
.blg-prose :deep(h2:first-child),
.blg-prose :deep(h3:first-child) {
  margin-top: 0;
}
.blg-prose :deep(p) {
  margin: 0 0 18px;
}
.blg-prose :deep(ul),
.blg-prose :deep(ol) {
  margin: 0 0 18px;
  padding-left: 24px;
}
.blg-prose :deep(li) {
  margin-bottom: 8px;
}
.blg-prose :deep(li::marker) {
  color: var(--sec-green);
  font-weight: 800;
}
.blg-prose :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
  text-underline-offset: 3px;
}
.blg-prose :deep(strong) {
  color: var(--sec-navy);
}
.blg-prose :deep(blockquote) {
  margin: 24px 0;
  padding: 18px 22px;
  border-left: 4px solid var(--sec-green);
  border-radius: 0 12px 12px 0;
  background: var(--sec-gold-bg);
  font-weight: 600;
  color: var(--sec-navy);
}
.blg-prose :deep(blockquote p:last-child) {
  margin-bottom: 0;
}
.blg-prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 14px;
  margin: 8px 0;
}
.blg-prose :deep(iframe) {
  max-width: 100%;
  border: 0;
  border-radius: 14px;
}
.blg-prose :deep(.blg-tbl) {
  overflow-x: auto;
  margin: 0 0 20px;
  border: 1px solid var(--sec-line);
  border-radius: 12px;
}
.blg-prose :deep(table) {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  font-size: 15px;
}
.blg-prose :deep(th),
.blg-prose :deep(td) {
  padding: 11px 14px;
  border: 1px solid var(--sec-line);
  text-align: left;
  vertical-align: top;
}
.blg-prose :deep(th) {
  background: var(--sec-navy);
  color: #fff;
  font-size: 13px;
  letter-spacing: 0.03em;
}
.blg-prose :deep(tr:nth-child(even) td) {
  background: var(--sec-offwhite);
}
/* Inline colours and fonts pasted into the editor should not break the design */
.blg-prose :deep([style]) {
  font-family: inherit !important;
}
.blg-prose :deep(span[style]) {
  color: inherit !important;
}

/* Share */
.blg-share {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid var(--sec-line);
}
.blg-share b {
  font-size: 15px;
}
.blg-share div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.blg-share a,
.blg-share button {
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 800;
  padding: 9px 15px;
  border-radius: 9px;
  border: 1.5px solid var(--sec-line);
  background: #fff;
  color: var(--sec-navy);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}
.blg-share a:hover,
.blg-share button:hover {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
}

/* Author */
.blg-author {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin-top: 28px;
  padding: 24px;
  border-radius: 16px;
  background: var(--sec-offwhite);
  border: 1px solid var(--sec-line);
}
.blg-badge {
  flex: none;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--sec-green);
  color: #fff;
  font-size: 22px;
  font-weight: 800;
}
.blg-author h3 {
  margin: 0 0 6px;
  font-size: 17px;
}
.blg-author p {
  margin: 0 0 10px;
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--sec-slate);
}
.blg-link {
  font-size: 14px;
  font-weight: 800;
  color: var(--sec-green-dk);
  text-decoration: none;
}
.blg-link:hover {
  text-decoration: underline;
}

/* ---------- Sidebar ---------- */
.blg-side {
  position: sticky;
  top: 110px;
  display: grid;
  gap: 20px;
}
.blg-box {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
}
.blg-toc h3 {
  margin: 0 0 12px;
  font-size: 17px;
  font-weight: 800;
}
.blg-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2px;
  max-height: calc(100vh - 380px);
  overflow-y: auto;
}
.blg-toc a {
  display: block;
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 3px solid transparent;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  text-decoration: none;
  color: var(--sec-slate);
  transition:
    background 0.2s,
    color 0.2s;
}
.blg-toc a.sub {
  padding-left: 22px;
  font-weight: 600;
}
.blg-toc a:hover {
  background: var(--sec-offwhite);
  color: var(--sec-green-dk);
}
.blg-toc a.on {
  background: rgba(47, 168, 79, 0.08);
  border-left-color: var(--sec-green);
  color: var(--sec-green-dk);
}
.blg-cta {
  display: grid;
  gap: 12px;
  background: var(--sec-navy);
  border: 0;
  color: #fff;
}
.blg-cta h3 {
  margin: 0;
  font-size: 19px;
}
.blg-cta p {
  margin: 0 0 4px;
  font-size: 14.5px;
  line-height: 1.7;
  color: #c9d1e0;
}
.blg-cta .svp-btn {
  justify-content: center;
}

/* ---------- Related ---------- */
.blg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.blg-all {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

@media (max-width: 980px) {
  .blg-layout {
    grid-template-columns: 1fr;
  }
  .blg-side {
    position: static;
  }
  .blg-toc ul {
    max-height: 260px;
  }
  .blg-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .blg-art {
    padding: 22px;
  }
  .blg-prose {
    font-size: 16px;
  }
  .blg-cover {
    border-radius: 14px;
    aspect-ratio: 16 / 10;
  }
  .blg-grid {
    grid-template-columns: 1fr;
  }
  .blg-author {
    flex-direction: column;
  }
}
</style>
