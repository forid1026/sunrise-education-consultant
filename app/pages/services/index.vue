<template>
  <div class="svp">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="svp-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Services</span>
        </nav>
        <div class="svp-hero-grid">
          <div>
            <span class="svp-eyebrow"><i></i>Five services, one team</span>
            <h1 id="svp-h1" class="svp-h1">
              Study Abroad Services <span>for Bangladeshi Students</span>
            </h1>
            <p class="svp-sub">
              From your first free assessment to your first job abroad,
              <NuxtLink to="/">Sunrise Education Consultants</NuxtLink> supports
              Bangladeshi students at every step: counselling and student visa
              processing, university admission, accommodation, pre-departure
              preparation and post-study career planning. One team in Dhaka and
              Sylhet, working to official embassy and university rules since
              2014.
            </p>
            <div class="svp-cta-row">
              <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a class="svp-btn svp-btn-ghost" href="#svp-services"
                >See All Services</a
              >
            </div>
            <div class="svp-byline">
              <span class="svp-avatar" aria-hidden="true">AK</span>
              <div>
                Reviewed by
                <b
                  ><NuxtLink to="/staff/anisuzzaman-kiron"
                    >Anisuzzaman Kiron</NuxtLink
                  ></b
                >, Founder &amp; CEO<br />
                Last updated:
                <time :datetime="updatedISO">{{ updatedLabel }}</time>
              </div>
            </div>
          </div>
          <aside class="svp-answer" aria-labelledby="svp-quick">
            <h2 id="svp-quick">
              Quick answer: what does a study abroad consultant do?
            </h2>
            <p>
              A study abroad consultant helps you choose a country and
              university, apply, get your student visa, find housing and prepare
              to travel. At Sunrise, that support is organised into
              {{ services.length || 'five' }} services:
            </p>
            <ul class="svp-picks">
              <li v-for="s in services" :key="s.id">
                <a :href="`#${s.id}`"
                  >{{ s.quick }} <small v-if="s.quickTag">{{ s.quickTag }}</small></a
                >
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

    <!-- ================= SERVICES ================= -->
    <section
      id="svp-services"
      class="svp-section svp-services"
      aria-labelledby="svp-svc-h"
    >
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>What we do</span>
        <h2 id="svp-svc-h" class="svp-h2">
          Our Study Abroad Services, <span>Step by Step</span>
        </h2>
        <p class="svp-lead">
          Most education consultancy services in Bangladesh stop at the visa.
          Ours cover the full journey, so you deal with one team from your first
          question to your first job abroad. Each service below explains what we
          do, when you need it and what you walk away with, followed by a link
          to the full service page.
        </p>

        <p v-if="!services.length" class="svp-lead">
          Services will be listed here soon.
        </p>

        <div class="svp-svc-list">
          <article
            v-for="(s, idx) in services"
            :id="s.id"
            :key="s.id"
            class="svp-svc svp-reveal"
          >
            <div class="svp-svc-side" :class="s.cls">
              <div class="svp-svc-top">
                <span
                  class="svp-svc-ico"
                  aria-hidden="true"
                  v-html="s.icon"
                ></span>
                <span class="svp-svc-num" aria-hidden="true"
                  >0{{ idx + 1 }}</span
                >
              </div>
              <h3>{{ s.title }}</h3>
              <p v-if="s.tag" class="svp-svc-tag">{{ s.tag }}</p>
              <dl class="svp-svc-meta">
                <div v-for="m in s.meta" :key="m[0]">
                  <dt>{{ m[0] }}</dt>
                  <dd>{{ m[1] }}</dd>
                </div>
              </dl>
            </div>
            <div class="svp-svc-body">
              <div
                v-if="s.body"
                class="svp-prose"
                @click="onProseClick"
                v-html="s.body"
              ></div>
              <p v-else-if="s.summary">{{ s.summary }}</p>

              <div v-if="s.incl.length" class="svp-incl">
                <h4>What's included</h4>
                <ul>
                  <li v-for="i in s.incl" :key="i">{{ i }}</li>
                </ul>
              </div>
              <NuxtLink class="svp-svc-link" :to="s.to">
                {{ s.link }}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= JOURNEY ================= -->
    <section class="svp-section" aria-labelledby="svp-journey-h">
      <div class="svp-container">
        <div class="svp-center">
          <span class="svp-eyebrow"><i></i>Your timeline</span>
          <h2 id="svp-journey-h" class="svp-h2">
            Your Study Abroad Journey, <span>Stage by Stage</span>
          </h2>
          <p class="svp-lead">
            This is how our services fit together for a typical September
            intake. Count back from your intake date to see when each stage
            should start.
          </p>
        </div>
        <ol class="svp-journey">
          <li v-for="st in stages" :key="st.h" class="svp-stage svp-reveal">
            <span class="svp-when">{{ st.when }}</span>
            <h3>{{ st.h }}</h3>
            <p>{{ st.p }}</p>
            <a :href="`#${st.to}`">{{ st.link }}</a>
          </li>
        </ol>
        <p class="svp-note">
          Timelines are typical, not fixed. Some government scholarships close 9
          to 12 months before the intake, and embassy appointment waiting times
          change during the year, so starting early always gives you more
          choices.
        </p>
      </div>
    </section>

    <!-- ================= COMPARISON TABLE ================= -->
    <section
      id="svp-compare"
      class="svp-section svp-docs-sec"
      aria-labelledby="svp-compare-h"
    >
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>Side by side</span>
        <h2 id="svp-compare-h" class="svp-h2">
          Compare Our Study Abroad <span>Support Services</span>
        </h2>
        <p class="svp-lead">
          Use this table to see which service you need now, what you should
          bring and which official bodies are involved at each stage.
        </p>
        <div
          class="svp-table-wrap"
          role="region"
          aria-label="Study abroad services comparison table"
          tabindex="0"
        >
          <table class="svp-table">
            <thead>
              <tr>
                <th v-for="h in tableHeads" :key="h" scope="col">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in tableRows" :key="r.id">
                <td>
                  <a :href="`#${r.id}`">{{ r.name }}</a>
                </td>
                <td>{{ r.when }}</td>
                <td>{{ r.result }}</td>
                <td>{{ r.bring }}</td>
                <td>{{ r.bodies }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ================= DOCUMENTS ================= -->
    <section class="svp-section" aria-labelledby="svp-docs-h">
      <div class="svp-container">
        <div class="svp-center">
          <span class="svp-eyebrow"><i></i>Get ready</span>
          <h2 id="svp-docs-h" class="svp-h2">
            Documents Bangladeshi Students <span>Usually Need</span>
          </h2>
          <p class="svp-lead">
            Start collecting these early. Exact lists differ by country and
            embassy, so your counsellor gives you a written checklist for your
            destination.
          </p>
        </div>
        <div class="svp-docs">
          <div v-for="d in docs" :key="d.title" class="svp-doc svp-reveal">
            <div class="svp-doc-ico" aria-hidden="true" v-html="d.icon"></div>
            <h3>{{ d.title }}</h3>
            <ul>
              <li v-for="i in d.items" :key="i">{{ i }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PROMISE ================= -->
    <section class="svp-section svp-promise" aria-labelledby="svp-promise-h">
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>How we work</span>
        <h2 id="svp-promise-h" class="svp-h2">
          What We Promise, <span>and What We Won't Do</span>
        </h2>
        <p class="svp-lead">
          Choosing a study abroad agency is a big decision for any Bangladeshi
          family. These are the rules our counsellors work by.
        </p>
        <div class="svp-pgrid">
          <div class="svp-pcol svp-yes svp-reveal">
            <h3><i aria-hidden="true">&#10003;</i>We will</h3>
            <ul>
              <li v-for="p in promiseYes" :key="p.h">
                <b>{{ p.h }}</b
                >{{ p.p }}
              </li>
            </ul>
          </div>
          <div class="svp-pcol svp-no svp-reveal">
            <h3><i aria-hidden="true">&#10005;</i>We won't</h3>
            <ul>
              <li v-for="p in promiseNo" :key="p.h">
                <b>{{ p.h }}</b
                >{{ p.p }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= E-E-A-T ================= -->
    <section class="svp-section" aria-labelledby="svp-trust-h">
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>About this page</span>
        <h2 id="svp-trust-h" class="svp-h2">
          Who Stands <span>Behind These Services</span>
        </h2>
        <div class="svp-trust">
          <div class="svp-author svp-reveal">
            <div class="svp-author-top">
              <span class="svp-avatar" aria-hidden="true">AK</span>
              <div>
                <h3>Anisuzzaman Kiron</h3>
                <small>Founder &amp; CEO, Sunrise Education Consultants</small>
              </div>
            </div>
            <p>
              This page is written by the Sunrise counselling team and reviewed
              by Anisuzzaman Kiron, who founded Sunrise Education Consultants in
              2014. Our counsellors prepare admission and visa files for
              Bangladeshi students every week from our offices in Banani, Dhaka,
              and Sylhet.
            </p>
            <p>
              We describe only the work we actually do, and we point you to
              official sources for rules that change.
              <NuxtLink class="svp-link" to="/staff"
                >Meet our counsellors &rarr;</NuxtLink
              >
            </p>
            <div class="svp-offices">
              <div class="svp-office">
                <b>Banani, Dhaka (Head Office)</b>House 61 (1st Floor), Block F,
                Road 08, Banani, Dhaka-1213
              </div>
              <div class="svp-office">
                <b>Sylhet Office</b>Ananda Tower (3rd Floor), Jail Road,
                Sylhet-3100
              </div>
            </div>
            <div class="svp-meta">
              <span>Last updated: {{ updatedLabel }}</span
              ><span>Next review: Jan 2027</span>
            </div>
          </div>
          <div class="svp-sources svp-reveal">
            <h3>Official sources we follow</h3>
            <p>
              Rules for attestation, money transfer and visas come from these
              bodies. Always confirm the current rule before you apply.
            </p>
            <ul>
              <li v-for="s in sources" :key="s.u">
                <a :href="s.u" target="_blank" rel="noopener">{{ s.t }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= NEXT STEPS ================= -->
    <section class="svp-section svp-docs-sec" aria-labelledby="svp-next-h">
      <div class="svp-container">
        <div class="svp-center">
          <span class="svp-eyebrow"><i></i>Keep planning</span>
          <h2 id="svp-next-h" class="svp-h2">
            Plan the Rest of <span>Your Journey</span>
          </h2>
        </div>
        <div class="svp-next">
          <NuxtLink
            v-for="n in nextSteps"
            :key="n.to"
            class="svp-reveal"
            :to="n.to"
          >
            <h3>{{ n.h }}</h3>
            <p>{{ n.p }}</p>
            <span>{{ n.link }} &rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="svp-section svp-faq" aria-labelledby="svp-faq-h">
      <div class="svp-container">
        <div class="svp-center">
          <span class="svp-eyebrow"><i></i>FAQ</span>
          <h2 id="svp-faq-h" class="svp-h2">
            Study Abroad Services: <span>Common Questions</span>
          </h2>
          <p class="svp-lead">
            Short answers to what Bangladeshi students and parents ask before
            they start.
          </p>
        </div>
        <div class="svp-faq-list">
          <details v-for="(f, i) in faqs" :key="f.q" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <p>
              <template v-if="!f.parts">{{ f.a }}</template>
              <template v-else>
                <template v-for="(seg, j) in f.parts" :key="j">
                  <template v-if="typeof seg === 'string'">{{ seg }}</template>
                  <NuxtLink v-else :to="seg.to">{{ seg.label }}</NuxtLink>
                </template>
              </template>
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="svp-cta-h">
      <div class="svp-container">
        <h2 id="svp-cta-h">Not Sure Which Service You Need First?</h2>
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
import {
  heroStats,
  stages,
  tableHeads,
  docs,
  promiseYes,
  promiseNo,
  sources,
  nextSteps,
  faqs,
} from '~/data/servicesPage'

const router = useRouter()

const siteUrl = 'https://sunrise-bd.net/'
const pageUrl = siteUrl + 'services'
const orgId = siteUrl + '#organization'

/* ---------- Load services from the API ---------- */
const { data } = await useApi('/services', {
  key: 'services-list',
  transform: (res) => res.data,
})

// Same shape the template uses.
const toService = (s) => ({
  id: `svc-${s.slug}`,
  slug: s.slug,
  to: `/service-details/${s.slug}`,
  cls: `g-${s.color || 'navy'}`,
  icon: serviceIcons[s.icon] || serviceIcons.document,
  title: s.name,
  tag: s.tagline,
  quick: s.name,
  quickTag: s.badge,
  meta: [
    ['Best for', s.facts?.best_for],
    ['When', s.facts?.timing],
    ['You leave with', s.facts?.outcome],
  ].filter((m) => m[1]),
  body: s.overview,
  summary: s.summary,
  incl: s.includes || [],
  link: s.link_text || `Learn more about ${s.name}`,
  ld: {
    name: s.name,
    desc: s.summary || s.seo?.meta_description || s.tagline || '',
  },
})

const services = computed(() => (data.value || []).map(toService))

// The comparison table is built from the same service data.
const tableRows = computed(() =>
  (data.value || []).map((s) => ({
    id: `svc-${s.slug}`,
    name: s.name,
    when: s.facts?.timing || '-',
    result: s.facts?.outcome || '-',
    bring: s.facts?.bring || '-',
    bodies: s.facts?.official_bodies || '-',
  })),
)

/* ---------- "Last updated" comes from the newest edit ---------- */
const updatedISO = computed(() => {
  const dates = (data.value || [])
    .map((s) => s.updated_at)
    .filter(Boolean)
    .sort()
  return (dates.at(-1) || '2026-09-29').slice(0, 10)
})
const updatedLabel = computed(() =>
  new Date(updatedISO.value + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }),
)

/* ---------- Internal links inside rich text should not reload the page ---------- */
const onProseClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey) return
  const a = e.target.closest('a')
  const href = a?.getAttribute('href')
  if (href && href.startsWith('/') && !href.startsWith('//') && !a.target) {
    e.preventDefault()
    router.push(href)
  }
}

/* ---------- SEO ---------- */
useSeoMeta({
  title: 'Study Abroad Services for Bangladeshi Students | Sunrise',
  description:
    'Study abroad services for Bangladeshi students: free counselling, student visa processing, university admission, housing, pre-departure and post-study support.',
  robots: 'index, follow, max-image-preview:large',
  ogType: 'website',
  ogTitle: 'Study Abroad Services for Bangladeshi Students',
  ogDescription:
    'Counselling, student visa processing, university admission, accommodation, pre-departure and post-study support from Sunrise Education Consultants, Dhaka and Sylhet.',
  ogUrl: pageUrl,
  ogSiteName: 'Sunrise Education Consultants',
  twitterCard: 'summary_large_image',
})

const serviceId = (slug) => `${siteUrl}service-details/${slug}#service`
const country = { '@type': 'Country', name: 'Bangladesh' }
const reviewer = {
  '@type': 'Person',
  name: 'Anisuzzaman Kiron',
  jobTitle: 'Founder & CEO',
  url: siteUrl + 'staff/anisuzzaman-kiron',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Services', item: pageUrl },
      ],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': orgId,
      name: 'Sunrise Education Consultants',
      url: siteUrl,
      logo: siteUrl + 'upload/logo/sunrise-logo.png',
      foundingDate: '2014',
      founder: reviewer,
      email: 'info@sunrise-bd.net',
      telephone: '+8801911878274',
      areaServed: country,
      location: [
        {
          '@type': 'Place',
          name: 'Sunrise Education Consultants, Banani (Head Office)',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'House 61 (1st Floor), Block F, Road 08, Banani',
            addressLocality: 'Dhaka',
            postalCode: '1213',
            addressCountry: 'BD',
          },
        },
        {
          '@type': 'Place',
          name: 'Sunrise Education Consultants, Sylhet',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Ananda Tower (3rd Floor), Jail Road',
            addressLocality: 'Sylhet',
            postalCode: '3100',
            addressCountry: 'BD',
          },
        },
      ],
      sameAs: [
        'https://www.facebook.com/SunriseEC',
        'https://www.youtube.com/@SunriseEducationConsultants',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Study abroad services for Bangladeshi students',
        itemListElement: services.value.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@id': serviceId(s.slug) },
        })),
      },
    },
    {
      '@type': 'CollectionPage',
      '@id': pageUrl + '#page',
      url: pageUrl,
      name: 'Study Abroad Services for Bangladeshi Students',
      description:
        'The study abroad services Sunrise Education Consultants offers Bangladeshi students: counselling and student visa processing, university admission support, accommodation and housing, pre-departure preparation and post-study opportunities.',
      inLanguage: 'en',
      dateModified: updatedISO.value,
      isPartOf: {
        '@type': 'WebSite',
        '@id': siteUrl + '#website',
        url: siteUrl,
        name: 'Sunrise Education Consultants',
      },
      about: [
        { '@type': 'Thing', name: 'Education consultancy' },
        { '@type': 'Thing', name: 'Student visa' },
        { '@type': 'Thing', name: 'International student admission' },
      ],
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        geographicArea: country,
      },
      publisher: { '@id': orgId },
      reviewedBy: reviewer,
      mainEntity: {
        '@type': 'ItemList',
        name: 'Study abroad services for Bangladeshi students',
        numberOfItems: services.value.length,
        itemListElement: services.value.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Service',
            '@id': serviceId(s.slug),
            name: s.ld.name,
            serviceType: s.ld.name,
            url: siteUrl + 'service-details/' + s.slug,
            description: s.ld.desc,
            provider: { '@id': orgId },
            areaServed: country,
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
})

/* ---------- Reveal on scroll (with grid stagger) ---------- */
let io = null
onMounted(() => {
  const root = document.querySelector('.svp')
  if (!root) return
  root
    .querySelectorAll('.svp-journey,.svp-docs,.svp-next,.svp-pgrid')
    .forEach((g) => {
      g.querySelectorAll('.svp-reveal').forEach((el, i) => {
        el.style.transitionDelay = i * 80 + 'ms'
      })
    })
  const els = root.querySelectorAll('.svp-reveal')
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io?.unobserve(e.target)
          }
        }),
      { threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
  } else {
    els.forEach((el) => el.classList.add('is-in'))
  }
})
onBeforeUnmount(() => io?.disconnect())
</script>