<template>
  <div v-if="page" class="svp cpg">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="cpg-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <span aria-current="page">{{ page.title }}</span>
        </nav>

        <div class="cpg-head">
          <span class="svp-eyebrow"><i></i>{{ brand }}</span>
          <h1 id="cpg-h1" class="svp-h1 cpg-title">{{ page.title }}</h1>
          <div class="svp-cta-row">
            <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
              >Get Free Assessment <span aria-hidden="true">&rarr;</span></NuxtLink
            >
            <a class="svp-btn svp-btn-ghost" href="tel:+8801911878274">Call 01911 878 274</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= BODY ================= -->
    <section class="svp-section cpg-body">
      <div class="svp-container">
        <figure v-if="page.image && !coverFailed" class="cpg-cover">
          <img
            ref="cover"
            :src="page.image"
            :alt="page.image_alt || page.title"
            width="1200"
            height="630"
            fetchpriority="high"
            decoding="async"
            @error="coverFailed = true"
          />
        </figure>

        <div class="cpg-layout">
          <article class="cpg-art">
            <div
              v-if="prepared.html"
              class="cpg-prose"
              @click="onProseClick"
              v-html="prepared.html"
            ></div>
            <p v-else class="svp-lead">This page is being updated. Please check back soon.</p>

            <!-- Video (only when the admin added a YouTube link) -->
            <div v-if="video" class="cpg-video-wrap">
              <button
                class="cpg-video"
                type="button"
                :aria-label="`Play video: ${page.title}`"
                :style="{ backgroundImage: `url('${video.thumb}')` }"
                @click="playing = true"
              >
                <span class="cpg-play" aria-hidden="true"
                  ><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg
                ></span>
                <iframe
                  v-if="playing"
                  :src="`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`"
                  :title="page.title"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </button>
            </div>
          </article>

          <aside class="cpg-side">
            <nav v-if="prepared.toc.length > 1" class="cpg-box cpg-toc" aria-label="On this page">
              <h3>On this page</h3>
              <ul>
                <li v-for="t in prepared.toc" :key="t.id">
                  <a :href="`#${t.id}`" :class="{ on: active === t.id }">{{ t.text }}</a>
                </li>
              </ul>
            </nav>

            <div class="cpg-box cpg-cta">
              <h3>Need help with your file?</h3>
              <p>
                Free assessment. A Sunrise counsellor will check your results, English and budget
                and tell you honestly what to do next.
              </p>
              <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
                >Get Free Assessment <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <NuxtLink class="svp-btn svp-btn-ghost" to="/contact-us">Contact Us</NuxtLink>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="cpg-cta-h">
      <div class="svp-container">
        <h2 id="cpg-cta-h">Ready to Start Your Study Abroad Journey?</h2>
        <p>
          Book a free assessment. A Sunrise counsellor will review your profile and build an
          honest plan for admission, scholarship and visa.
        </p>
        <div class="svp-cta-row" style="justify-content: center; margin: 0">
          <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
            >Get Free Assessment <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <a class="svp-btn svp-btn-ghost" href="tel:+8801911878274">Call 01911 878 274</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl || 'https://sunrise-bd.net').replace(/\/+$/, '') + '/'
const brand = 'Sunrise Education Consultants'

// Laravel route for one custom page. Your catch-all route is /v1/{slug}.
// If you use /custom-pages/{slug} instead, change this one line.
const pageApi = (slug) => `/${slug}`

definePageMeta({ key: (r) => r.fullPath })

const route = useRoute()
const router = useRouter()
const slug = String(route.params.slug || '')
const pageUrl = `${siteUrl}${slug}`

/* ---------- Data: slug found -> page, otherwise the 404 page ---------- */
const { data } = await useApi(pageApi(slug), {
  key: `custom-page-${slug}`,
  transform: (res) => res.data,
})

if (!data.value || !data.value.title) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
const page = computed(() => data.value)

/* ---------- Helpers ---------- */
const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&rsquo;|&lsquo;/g, '’')
    .replace(/&[a-z]+;/gi, ' ')

const stripHtml = (html) =>
  decode(String(html || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section'

// Own-site links become internal links, other links open in a new tab
const fixLinks = (html) =>
  (html || '')
    .replace(/href="https?:\/\/(?:www\.)?sunrise-bd\.net\/?/gi, 'href="/')
    .replace(/<a\s+([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (m, a, href, b) =>
      /target=/i.test(a + b) ? m : `<a ${a}href="${href}"${b} target="_blank" rel="noopener">`,
    )

/* ---------- Content: clean the editor HTML, add heading ids, build the contents list ---------- */
const prepared = computed(() => {
  let html = String(page.value.description || '')

  // The editor sometimes wraps the whole page in one <ol><li>...</li></ol>. Remove that wrapper.
  const wrap = html.match(/^\s*<ol[^>]*>\s*<li[^>]*>([\s\S]*)<\/li>\s*<\/ol>\s*$/i)
  if (wrap) html = wrap[1]

  html = fixLinks(html)
    // empty list items (only spaces or a divider line), then lists left empty
    .replace(
      /<li[^>]*>\s*(?:<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>\s*)?(?:<div[^>]*>\s*<hr\s*\/?>\s*<\/div>\s*)?<\/li>/gi,
      '',
    )
    .replace(/<(ul|ol)[^>]*>\s*<\/\1>/gi, '')
    .replace(/<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '')
    // the page already has one h1 (the title), so content h1 becomes h2
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>')
    .replace(/<img(?![^>]*\sloading=)/gi, '<img loading="lazy" decoding="async"')
    .replace(/<table/gi, '<div class="cpg-tbl"><table')
    .replace(/<\/table>/gi, '</table></div>')

  const heads = []
  const seen = {}
  html = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (m, lvl, attrs, inner) => {
    // remove emoji and symbols at the start, so the contents list stays clean
    const text = stripHtml(inner).replace(/^[^\p{L}\p{N}]+/u, '')
    if (!text) return m
    let id = 'h-' + slugify(text)
    seen[id] = (seen[id] || 0) + 1
    if (seen[id] > 1) id += '-' + seen[id]
    heads.push({ id, text, level: Number(lvl) })
    return `<h${lvl}${attrs.replace(/\sid="[^"]*"/i, '')} id="${id}">${inner}</h${lvl}>`
  })

  // Pages with many h3 questions list only the h2 sections; otherwise use the h3 headings
  const level = heads.some((h) => h.level === 2) ? 2 : 3
  return { html, toc: heads.filter((h) => h.level === level) }
})

/* ---------- Video (YouTube link or { url, id, embed_url, thumbnail } from the API) ---------- */
const video = computed(() => {
  const v = page.value.video
  if (!v) return null
  let id = typeof v === 'object' ? v.id : ''
  const url = typeof v === 'object' ? v.url || v.embed_url || '' : String(v)
  if (!id) {
    const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/)
    id = m ? m[1] : ''
  }
  if (!id) return null
  return {
    id,
    thumb: (typeof v === 'object' && v.thumbnail) || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  }
})
const playing = ref(false)

/* ---------- Internal links inside the content should not reload the page ---------- */
const onProseClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  const a = e.target.closest('a')
  const href = a?.getAttribute('href')
  if (href && href.startsWith('/') && !href.startsWith('//') && !a.target) {
    e.preventDefault()
    router.push(href)
  }
}

/* ---------- Cover image + active heading (browser only) ---------- */
const coverFailed = ref(false)
const cover = ref(null)
const active = ref('')
let io = null

onMounted(() => {
  if (cover.value && cover.value.complete && cover.value.naturalWidth === 0) {
    coverFailed.value = true
  }
  if (!('IntersectionObserver' in window)) return
  io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = e.target.id
      }),
    { rootMargin: '-20% 0px -70% 0px' },
  )
  document.querySelectorAll('.cpg-prose [id^="h-"]').forEach((el) => io.observe(el))
})
onBeforeUnmount(() => io?.disconnect())

/* ---------- SEO ---------- */
const seoTitle = computed(() => page.value.seo?.meta_title || `${page.value.title} | ${brand}`)
const seoDesc = computed(() => {
  if (page.value.seo?.meta_description) return page.value.seo.meta_description
  const first = (page.value.description || '')
    .split(/<\/p>|<\/h[1-6]>|<\/li>/i)
    .map(stripHtml)
    .find((p) => p.length > 60)
  const d = first || `${page.value.title}. Read the full guide from ${brand}.`
  return d.length > 158 ? d.slice(0, 158).replace(/\s+\S*$/, '') + '…' : d
})

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  keywords: () => page.value.seo?.meta_keywords || undefined,
  robots: 'index, follow, max-image-preview:large',
  ogType: 'website',
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogUrl: pageUrl,
  ogImage: () => page.value.image || undefined,
  ogSiteName: brand,
  twitterCard: 'summary_large_image',
})

useHead(() => ({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: page.value.title, item: pageUrl },
            ],
          },
          {
            '@type': 'WebPage',
            '@id': pageUrl + '#page',
            url: pageUrl,
            name: page.value.title,
            description: seoDesc.value,
            inLanguage: 'en',
            ...(page.value.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: page.value.image } } : {}),
            isPartOf: { '@type': 'WebSite', '@id': siteUrl + '#website', url: siteUrl, name: brand },
            publisher: { '@type': 'Organization', name: brand, url: siteUrl },
          },
        ],
      }).replace(/</g, '\\u003c'),
    },
  ],
}))
</script>

<style scoped>
/* ---------- Header ---------- */
.cpg-head {
  position: relative;
  max-width: 860px;
}
.cpg-title {
  font-size: clamp(28px, 3.8vw, 46px);
  line-height: 1.15;
}

/* ---------- Layout ---------- */
.cpg-body {
  padding-top: 36px;
}
.cpg-cover {
  margin: 0 0 36px;
  aspect-ratio: 16 / 7.5;
  border-radius: 20px;
  overflow: hidden;
  background: var(--sec-gold-bg);
  box-shadow: 0 18px 40px rgba(22, 33, 58, 0.12);
}
.cpg-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cpg-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 36px;
  align-items: start;
}
.cpg-art {
  min-width: 0;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
}

/* ---------- Rich text from the admin editor ---------- */
.cpg-prose {
  font-size: 16.5px;
  line-height: 1.85;
  color: #475467;
  overflow-wrap: anywhere;
}
.cpg-prose :deep(h2),
.cpg-prose :deep(h3),
.cpg-prose :deep(h4) {
  color: var(--sec-navy);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.01em;
  scroll-margin-top: 110px;
}
.cpg-prose :deep(h2) {
  font-size: clamp(22px, 2.4vw, 28px);
  margin: 44px 0 16px;
  padding: 14px 18px;
  border-radius: 12px;
  background: var(--sec-gold-bg);
  border-left: 5px solid var(--sec-green);
}
.cpg-prose :deep(h2:first-child) {
  margin-top: 0;
}
.cpg-prose :deep(h3) {
  font-size: 18.5px;
  margin: 28px 0 10px;
}
.cpg-prose :deep(h4) {
  font-size: 16.5px;
  margin: 22px 0 8px;
}
.cpg-prose :deep(p) {
  margin: 0 0 14px;
}
.cpg-prose :deep(ul),
.cpg-prose :deep(ol) {
  margin: 0 0 16px;
  padding-left: 24px;
}
.cpg-prose :deep(li) {
  margin-bottom: 6px;
}
.cpg-prose :deep(li::marker) {
  color: var(--sec-green);
  font-weight: 800;
}
.cpg-prose :deep(li > p) {
  margin-bottom: 6px;
}
.cpg-prose :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
  text-underline-offset: 3px;
}
.cpg-prose :deep(strong) {
  color: var(--sec-navy);
}
.cpg-prose :deep(hr) {
  border: 0;
  border-top: 1px solid var(--sec-line);
  margin: 26px 0;
}
.cpg-prose :deep(blockquote) {
  margin: 22px 0;
  padding: 16px 20px;
  border-left: 4px solid var(--sec-green);
  border-radius: 0 12px 12px 0;
  background: var(--sec-gold-bg);
  font-weight: 600;
  color: var(--sec-navy);
}
.cpg-prose :deep(blockquote p:last-child) {
  margin-bottom: 0;
}
.cpg-prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 14px;
  margin: 8px 0;
}
.cpg-prose :deep(iframe) {
  max-width: 100%;
  border: 0;
  border-radius: 14px;
}
.cpg-prose :deep(.cpg-tbl) {
  overflow-x: auto;
  margin: 0 0 20px;
  border: 1px solid var(--sec-line);
  border-radius: 12px;
}
.cpg-prose :deep(table) {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  font-size: 15px;
}
.cpg-prose :deep(th),
.cpg-prose :deep(td) {
  padding: 11px 14px;
  border: 1px solid var(--sec-line);
  text-align: left;
  vertical-align: top;
}
.cpg-prose :deep(th) {
  background: var(--sec-navy);
  color: #fff;
  font-size: 13px;
}
.cpg-prose :deep(tr:nth-child(even) td) {
  background: var(--sec-offwhite);
}
/* Inline colours and fonts pasted into the editor should not break the design */
.cpg-prose :deep([style]) {
  font-family: inherit !important;
}
.cpg-prose :deep(span[style]) {
  color: inherit !important;
}

/* ---------- Video ---------- */
.cpg-video-wrap {
  margin-top: 32px;
}
.cpg-video {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: #0f1829 center / cover no-repeat;
  cursor: pointer;
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.15);
}
.cpg-video::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(22, 33, 58, 0.1), rgba(22, 33, 58, 0.55));
}
.cpg-play {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 78px;
  height: 78px;
  margin: -39px 0 0 -39px;
  border-radius: 50%;
  background: var(--sec-green);
  box-shadow: 0 0 0 10px rgba(47, 168, 79, 0.25);
  transition: transform 0.2s;
}
.cpg-video:hover .cpg-play {
  transform: scale(1.08);
}
.cpg-play svg {
  width: 28px;
  height: 28px;
  margin-left: 4px;
  fill: #fff;
}
.cpg-video iframe {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  border: 0;
}

/* ---------- Sidebar ---------- */
.cpg-side {
  position: sticky;
  top: 110px;
  display: grid;
  gap: 20px;
}
.cpg-box {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
}
.cpg-toc h3 {
  margin: 0 0 12px;
  font-size: 17px;
  font-weight: 800;
}
.cpg-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2px;
  max-height: calc(100vh - 380px);
  overflow-y: auto;
}
.cpg-toc a {
  display: block;
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 3px solid transparent;
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.4;
  text-decoration: none;
  color: var(--sec-slate);
  transition: background 0.2s, color 0.2s;
}
.cpg-toc a:hover {
  background: var(--sec-offwhite);
  color: var(--sec-green-dk);
}
.cpg-toc a.on {
  background: rgba(47, 168, 79, 0.08);
  border-left-color: var(--sec-green);
  color: var(--sec-green-dk);
}
.cpg-cta {
  display: grid;
  gap: 12px;
  background: var(--sec-navy);
  border: 0;
  color: #fff;
}
.cpg-cta h3 {
  margin: 0;
  font-size: 19px;
}
.cpg-cta p {
  margin: 0 0 4px;
  font-size: 14.5px;
  line-height: 1.7;
  color: #c9d1e0;
}
.cpg-cta .svp-btn {
  justify-content: center;
}

@media (max-width: 980px) {
  .cpg-layout {
    grid-template-columns: 1fr;
  }
  .cpg-side {
    position: static;
  }
  .cpg-toc ul {
    max-height: 260px;
  }
}
@media (max-width: 640px) {
  .cpg-art {
    padding: 22px;
  }
  .cpg-prose {
    font-size: 16px;
  }
  .cpg-prose :deep(h2) {
    padding: 12px 14px;
  }
  .cpg-cover {
    border-radius: 14px;
    aspect-ratio: 16 / 10;
  }
}
</style>