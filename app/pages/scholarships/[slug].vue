<template>
  <main class="sce">
    <div ref="root" class="scf" :class="{ 'scf-js': js }">
      <template v-if="s">
        <!-- ================= HERO ================= -->
        <section class="scf-hero" aria-labelledby="scf-h1">
          <div class="scf-hero-rays" aria-hidden="true"></div>
          <div class="scf-container">
            <nav class="scf-crumb" aria-label="Breadcrumb">
              <NuxtLink to="/">Home</NuxtLink><span>/</span
              ><NuxtLink to="/scholarships">Scholarships</NuxtLink><span>/</span
              ><span aria-current="page">{{ s.name }}</span>
            </nav>

            <div class="scf-hero-grid">
              <div>
                <span class="scf-eyebrow"
                  ><i></i>Scholarship<template v-if="s.country">
                    · {{ s.country }}</template
                  ></span
                >
                <h1 id="scf-h1" class="scf-h1">
                  {{ titleParts[0] }}
                  <span v-if="titleParts[1]">{{ titleParts[1] }}</span>
                </h1>
                <p v-if="heroText" class="scf-sub">{{ heroText }}</p>

                <div class="scf-cta-row">
                  <NuxtLink class="scf-btn scf-btn-primary" to="/apply-now">
                    Get Free Assessment <span aria-hidden="true">&rarr;</span>
                  </NuxtLink>
                  <a class="scf-btn scf-btn-ghost" href="#contact"
                    >Visit Our Offices</a
                  >
                </div>

                <div class="scf-byline">
                  <span class="scf-av" aria-hidden="true">{{
                    reviewerInitials
                  }}</span>
                  <div>
                    Written by the <b>Sunrise advisory team</b>
                    <template v-if="s.reviewer?.name">
                      &middot; Reviewed by
                      <NuxtLink
                        v-if="s.reviewer.slug"
                        :to="`/staff/${s.reviewer.slug}`"
                        ><b>{{ s.reviewer.name }}</b></NuxtLink
                      ><b v-else>{{ s.reviewer.name }}</b
                      ><template v-if="s.reviewer.title"
                        >, {{ s.reviewer.title }}</template
                      >
                    </template>
                    <br />Facts last verified:
                    <time :datetime="verifiedIso">{{ verifiedLabel }}</time>
                  </div>
                </div>
              </div>

              <aside
                v-if="glance.length"
                class="scf-facts"
                aria-labelledby="scf-facts-h"
              >
                <h2 id="scf-facts-h">At a glance</h2>
                <dl>
                  <div v-for="g in glance" :key="g.label">
                    <dt>{{ g.label }}</dt>
                    <dd>{{ g.value }}</dd>
                  </div>
                </dl>
              </aside>
            </div>

            <div
              v-if="stats.length"
              class="scf-stats"
              :style="{ '--n': stats.length }"
            >
              <div v-for="(st, i) in stats" :key="i" class="scf-stat">
                <b>{{ st.big }}</b>
                <small>{{ st.small }}</small>
              </div>
            </div>
          </div>
        </section>

        <!-- ================= OVERVIEW ================= -->
        <section id="what" class="scf-section" aria-labelledby="h-what">
          <div class="scf-container scf-overview">
            <div class="scf-prose">
              <span class="scf-eyebrow"><i></i>Overview</span>
              <h2 id="h-what" class="scf-h2">
                {{ overviewHead[0] }} <span>{{ overviewHead[1] }}</span>
              </h2>
              <div
                v-if="s.overview?.html"
                class="scf-rich"
                v-html="rich(s.overview.html)"
              ></div>
              <p v-else-if="s.description">{{ s.description }}</p>
              <div
                v-if="s.overview?.note"
                class="note"
                v-html="rich(s.overview.note)"
              ></div>
            </div>

            <aside class="scf-aside">
              <div v-if="included.length" class="scf-incl scf-reveal">
                <div class="scf-incl-top">What&rsquo;s included</div>
                <ul>
                  <li v-for="(t, i) in included" :key="i">{{ t }}</li>
                </ul>
              </div>
              <div class="scf-fit scf-reveal">
                <h3>Not sure if this fits you?</h3>
                <p>
                  Start with a free assessment. A counsellor will review your
                  situation and tell you honestly what is realistic.
                </p>
                <NuxtLink class="scf-btn scf-btn-primary" to="/apply-now">
                  Get Free Assessment <span aria-hidden="true">&rarr;</span>
                </NuxtLink>
                <small
                  >Or call
                  <a :href="`tel:${PHONE_TEL}`">{{ PHONE_LABEL }}</a></small
                >
              </div>
            </aside>
          </div>
        </section>

        <!-- ================= COVERAGE ================= -->
        <section
          v-if="coverageRows.length"
          id="coverage"
          class="scf-section scf-soft"
          aria-labelledby="h-coverage"
        >
          <div class="scf-container scf-sec">
            <span class="scf-eyebrow"><i></i>What you get</span>
            <h2 id="h-coverage" class="scf-h2">
              What the {{ short }} <span>covers</span>
            </h2>
            <p v-if="s.coverage?.intro">{{ s.coverage.intro }}</p>
            <div class="scf-table-wrap scf-reveal">
              <table class="scf-table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">What to know</th>
                    <th scope="col">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, i) in coverageRows" :key="i">
                    <td>{{ r.item }}</td>
                    <td>{{ r.info }}</td>
                    <td>{{ r.confidence }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              v-if="s.coverage?.note"
              class="warn"
              v-html="rich(s.coverage.note)"
            ></div>
          </div>
        </section>

        <!-- ================= ELIGIBILITY ================= -->
        <section
          v-if="eligibility.length || checklist.length"
          id="eligibility"
          class="scf-section"
          aria-labelledby="h-eligibility"
        >
          <div class="scf-container scf-sec">
            <span class="scf-eyebrow"><i></i>Eligibility</span>
            <h2 id="h-eligibility" class="scf-h2">
              Who can apply: {{ short }} <span>eligibility</span>
            </h2>
            <p v-if="s.eligibility?.intro">{{ s.eligibility.intro }}</p>
            <ul v-if="eligibility.length" class="tick">
              <li v-for="(t, i) in eligibility" :key="i">{{ t }}</li>
            </ul>

            <div v-if="checklist.length" class="tool">
              <p>
                <b>Basic eligibility checklist.</b> Tick what is true for you.
                Indicative only; read the official criteria.
              </p>
              <label v-for="(c, i) in checklist" :key="i">
                <input v-model="checks[i]" type="checkbox" /> {{ c.label }}
              </label>
              <div class="out" aria-live="polite">
                <template v-if="checkedCount === checklist.length">
                  <b
                    >You meet every published basic requirement on this
                    checklist.</b
                  >
                  That does not mean you will be selected: the awarding body
                  decides, and each programme has competitive criteria beyond
                  these basics.
                </template>
                <template v-else>
                  <b
                    >{{ checkedCount }} of {{ checklist.length }} basics met.</b
                  >
                  Still to resolve:
                  <ul class="scf-miss">
                    <li v-for="m in missing" :key="m">{{ m }}</li>
                  </ul>
                </template>
              </div>
            </div>
          </div>
        </section>

        <!-- ================= STEPS ================= -->
        <section
          v-if="steps.length"
          id="process"
          class="scf-section scf-soft"
          aria-labelledby="h-process"
        >
          <div class="scf-container scf-sec">
            <span class="scf-eyebrow"><i></i>How it works</span>
            <h2 id="h-process" class="scf-h2">
              How to apply for the {{ short }} <span>from Bangladesh</span>
            </h2>
            <div class="scf-steps-wrap">
              <ul class="scf-miles">
                <li v-for="(st, i) in steps" :key="i">
                  <b>Step {{ i + 1 }}</b>
                  <h3>{{ st.title }}</h3>
                  <p v-if="st.text">{{ st.text }}</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ================= TIMELINE ================= -->
        <section
          v-if="timeline.length"
          id="timeline"
          class="scf-section"
          aria-labelledby="h-timeline"
        >
          <div class="scf-container scf-sec">
            <span class="scf-eyebrow"><i></i>Dates</span>
            <h2 id="h-timeline" class="scf-h2">
              {{ short }} dates <span>and deadlines</span>
            </h2>
            <p v-if="s.timeline?.intro">{{ s.timeline.intro }}</p>
            <div class="scf-table-wrap scf-reveal">
              <table class="scf-table">
                <thead>
                  <tr>
                    <th scope="col">Stage</th>
                    <th scope="col">Date</th>
                    <th scope="col">
                      Status<template v-if="verifiedShort">
                        on {{ verifiedShort }}</template
                      >
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, i) in timeline" :key="i">
                    <td>{{ r.stage }}</td>
                    <td>{{ r.date }}</td>
                    <td>
                      <span class="st" :class="`st-${r.cls}`">{{
                        r.label
                      }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-if="s.timeline?.note" class="scf-note">
              {{ s.timeline.note }}
            </p>
          </div>
        </section>

        <!-- ================= SELECTION ================= -->
        <section
          v-if="s.selection"
          id="selection"
          class="scf-section scf-soft"
          aria-labelledby="h-selection"
        >
          <div class="scf-container scf-sec">
            <span class="scf-eyebrow"><i></i>Selection</span>
            <h2 id="h-selection" class="scf-h2">
              How the {{ short }} <span>is decided</span>
            </h2>
            <div class="scf-rich" v-html="rich(s.selection)"></div>
          </div>
        </section>

        <!-- ================= MISTAKES ================= -->
        <section
          v-if="mistakes.length"
          id="mistakes"
          class="scf-section scf-values-sec"
          aria-labelledby="h-mistakes"
        >
          <div class="scf-container">
            <span class="scf-eyebrow"><i></i>Avoid these</span>
            <h2 id="h-mistakes" class="scf-h2">
              Mistakes to avoid with the <span>{{ short }}</span>
            </h2>
            <div class="scf-values">
              <div
                v-for="(m, i) in mistakes"
                :key="i"
                class="scf-value scf-reveal"
              >
                <h3>{{ m.title }}</h3>
                <p v-if="m.text">{{ m.text }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ================= SAFETY ================= -->
        <section id="safety" class="scf-section" aria-labelledby="h-safety">
          <div class="scf-container scf-sec">
            <span class="scf-eyebrow"><i></i>Stay safe</span>
            <h2 id="h-safety" class="scf-h2">
              Scholarship scams: how to <span>stay safe</span>
            </h2>
            <div v-if="s.safety" class="warn" v-html="rich(s.safety)"></div>
            <div v-else class="warn">
              <b>Genuine government scholarships do not sell places.</b> Nobody
              can guarantee you an award. Only apply through the official
              channels listed in the sources below, and be careful of anyone who
              asks for a processing fee to &ldquo;secure&rdquo; a place.
            </div>
          </div>
        </section>

        <!-- ================= SUPPORT ================= -->
        <section
          id="support"
          class="scf-section scf-soft"
          aria-labelledby="h-support"
        >
          <div class="scf-container scf-sec">
            <span class="scf-eyebrow"><i></i>How we help</span>
            <h2 id="h-support" class="scf-h2">
              How Sunrise supports {{ short }} <span>applicants</span>
            </h2>
            <div class="scf-pillars">
              <article class="scf-pillar scf-reveal">
                <div class="scf-pillar-top g-green">
                  <span>Included</span>
                  <h3>What Sunrise does</h3>
                </div>
                <div class="scf-pillar-body">
                  <ul class="scf-ticks one">
                    <li v-for="(t, i) in included" :key="i">{{ t }}</li>
                  </ul>
                </div>
              </article>
              <article class="scf-pillar scf-reveal">
                <div class="scf-pillar-top g-blue">
                  <span>Not included</span>
                  <h3>What Sunrise does not do</h3>
                </div>
                <div class="scf-pillar-body">
                  <ul class="scf-ticks one x">
                    <li v-for="(t, i) in notIncluded" :key="i">{{ t }}</li>
                  </ul>
                </div>
              </article>
            </div>

            <div
              v-if="s.support?.fee_note"
              class="note scf-fee"
              v-html="rich(s.support.fee_note)"
            ></div>
            <div
              v-if="s.support?.results"
              class="scf-results scf-rich"
              v-html="rich(s.support.results)"
            ></div>

            <NuxtLink
              v-if="counsellor"
              class="scf-counsellor"
              :to="`/staff/${counsellor.slug}`"
            >
              <span class="scf-av" aria-hidden="true"
                >{{ initials(counsellor.name)
                }}<img
                  v-if="counsellor.photo && !broken[counsellor.slug]"
                  :src="counsellor.photo"
                  alt=""
                  loading="lazy"
                  @error="broken[counsellor.slug] = true"
              /></span>
              <span>
                <small>Counsellor responsible</small>
                <b>{{ counsellor.name }}</b>
                <em v-if="counsellor.designation">{{
                  counsellor.designation
                }}</em>
              </span>
            </NuxtLink>
          </div>
        </section>

        <!-- ================= RELATED ================= -->
        <section
          v-if="related.length"
          id="compare"
          class="scf-section"
          aria-labelledby="h-compare"
        >
          <div class="scf-container scf-sec">
            <span class="scf-eyebrow"><i></i>Compare</span>
            <h2 id="h-compare" class="scf-h2">
              Other scholarships <span>to consider</span>
            </h2>
            <p>Apply to every award you genuinely fit. Related guides:</p>
            <div class="links">
              <NuxtLink v-for="r in related" :key="r.to" :to="r.to">{{
                r.label
              }}</NuxtLink>
            </div>
          </div>
        </section>

        <!-- ================= TEAM ================= -->
        <section
          id="team"
          class="scf-section scf-soft"
          aria-labelledby="h-team"
        >
          <div class="scf-container">
            <span class="scf-eyebrow"><i></i>Management</span>
            <h2 id="h-team" class="scf-h2">Leadership <span>Team</span></h2>
            <p class="scf-lead">
              Every Sunrise file is handled by named staff, not an anonymous
              desk. Click a profile to read their background. Sunrise was
              founded in Dhaka in 2014 by Anisuzzaman Kiron, with Yeasmin Akther
              as co-founder.
            </p>
            <div class="scf-team">
              <NuxtLink
                v-for="m in team"
                :key="m.slug"
                class="scf-member scf-reveal"
                :to="`/staff/${m.slug}`"
              >
                <span class="scf-av" aria-hidden="true"
                  >{{ initials(m.name)
                  }}<img
                    v-if="m.photo && !broken[m.slug]"
                    :src="m.photo"
                    alt=""
                    loading="lazy"
                    @error="broken[m.slug] = true"
                /></span>
                <h3>{{ m.name }}</h3>
                <p>{{ m.designation }}</p>
              </NuxtLink>
            </div>
            <div class="scf-team-cta">
              <NuxtLink class="scf-btn scf-btn-ghost" to="/staff">
                Meet every counsellor
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
          </div>
        </section>

        <!-- ================= FAQ ================= -->
        <section
          v-if="faqs.length"
          id="faq"
          class="scf-section scf-faq"
          aria-labelledby="h-faq"
        >
          <div class="scf-container">
            <div class="scf-center">
              <span class="scf-eyebrow"><i></i>FAQ</span>
              <h2 id="h-faq" class="scf-h2">
                {{ s.name }}: <span>Common Questions</span>
              </h2>
            </div>
            <div class="scf-faq-list">
              <details v-for="(f, i) in faqs" :key="f.q" :open="i === 0">
                <summary>{{ f.q }}</summary>
                <div class="scf-faq-a" v-html="f.a"></div>
              </details>
            </div>
          </div>
        </section>

        <!-- ================= SOURCES ================= -->
        <section
          v-if="sources.length"
          id="sources"
          class="scf-section scf-soft"
          aria-labelledby="h-src"
        >
          <div class="scf-container">
            <span class="scf-eyebrow"><i></i>Sources</span>
            <h2 id="h-src" class="scf-h2">
              Sources and <span>Last Verification</span>
            </h2>
            <p class="scf-lead">
              Government and official-programme sources used on this page. Rules
              change, so always confirm on the official site before you pay any
              fee or submit anything. Facts on this page were last checked on
              <b>{{ verifiedLabel }}</b
              >.
            </p>
            <ul class="scf-src">
              <li v-for="x in sources" :key="x.url">
                <a :href="x.url" target="_blank" rel="noopener nofollow">{{
                  x.name
                }}</a>
              </li>
            </ul>
            <p v-if="s.sources?.note" class="scf-note">{{ s.sources.note }}</p>
          </div>
        </section>

        <!-- ================= CONTACT ================= -->
        <section id="contact" class="scf-section" aria-labelledby="h-contact">
          <div class="scf-container">
            <span class="scf-eyebrow"><i></i>Locations</span>
            <h2 id="h-contact" class="scf-h2">
              Talk to a <span>Sunrise Counsellor</span>
            </h2>
            <p class="scf-lead">
              Walk-in counselling is available at both offices. Please call
              before visiting so the right counsellor is available for you.
            </p>
            <div class="scf-offices">
              <div
                v-for="o in OFFICES"
                :key="o.name"
                class="scf-office scf-reveal"
              >
                <div class="scf-office-top" :class="o.cls">
                  <span>{{ o.kind }}</span>
                  <h3>{{ o.name }}</h3>
                </div>
                <dl>
                  <div>
                    <dt>Address</dt>
                    <dd>{{ o.address }}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      <a :href="`tel:${o.tel}`">{{ o.phone }}</a>
                    </dd>
                  </div>
                  <div v-if="o.email">
                    <dt>Email</dt>
                    <dd>
                      <a :href="`mailto:${o.email}`">{{ o.email }}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Hours</dt>
                    <dd>Saturday to Thursday, 10 am to 6 pm</dd>
                  </div>
                </dl>
                <a class="scf-link" :href="o.map" target="_blank" rel="noopener"
                  >Get directions to {{ o.short }}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.4"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
            <p class="scf-note">Related guides:</p>
            <div class="links">
              <NuxtLink to="/scholarships">Scholarship Guidance</NuxtLink>
              <NuxtLink to="/service-details/university-admission-process"
                >University Admission</NuxtLink
              >
              <NuxtLink to="/service-details/counselling-and-visa-processing"
                >Counselling &amp; Visa Processing</NuxtLink
              >
            </div>
          </div>
        </section>

        <!-- ================= CTA ================= -->
        <section class="scf-cta" aria-labelledby="scf-cta-h">
          <div class="scf-container">
            <h2 id="scf-cta-h">Ready to Start Your Study Abroad Journey?</h2>
            <p>
              Start with a free assessment. A Sunrise counsellor will review
              your results, budget and goals, and tell you honestly what is
              realistic.
            </p>
            <div class="scf-cta-row scf-cta-center">
              <NuxtLink class="scf-btn scf-btn-primary" to="/apply-now">
                Get Free Assessment <span aria-hidden="true">&rarr;</span>
              </NuxtLink>
              <a class="scf-btn scf-btn-ghost" :href="`tel:${PHONE_TEL}`"
                >Call {{ PHONE_LABEL }}</a
              >
            </div>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const siteUrl =
  (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";
const brand = "Sunrise Education Consultants";
const slug = String(route.params.slug || "");
const pageUrl = siteUrl + "scholarships/" + slug;

/* ---------- Constants (edit here) ---------- */
const PHONE_LABEL = "01911 878 274";
const PHONE_TEL = "+8801911878274";
const OFFICES = [
  {
    kind: "Head office",
    name: "Banani, Dhaka",
    short: "Banani",
    cls: "g-green",
    address: "House 61 (1st Floor), Block F, Road 08, Banani, Dhaka-1213",
    phone: "+88 01911 878 274",
    tel: "+8801911878274",
    email: "info@sunrise-bd.net",
    map: "https://www.google.com/maps/search/?api=1&query=Sunrise+Education+Consultants+Banani+Dhaka",
  },
  {
    kind: "Branch office",
    name: "Jail Road, Sylhet",
    short: "Sylhet",
    cls: "g-blue",
    address: "Ananda Tower (3rd Floor), Jail Road, Sylhet-3100",
    phone: "+88 01611 878 274",
    tel: "+8801611878274",
    email: "",
    map: "https://www.google.com/maps/search/?api=1&query=Sunrise+Education+Consultants+Jail+Road+Sylhet",
  },
];
// Used only when the admin has set none (generic Sunrise service text)
const INCLUDED_FALLBACK = [
  "Eligibility check against the official criteria",
  "Timeline built backwards from the official dates",
  "Review of your CV, statement and study plan",
  "Document checklist and certified-copy planning",
  "Interview or selection-stage practice based on your own file",
];
const NOT_INCLUDED_FALLBACK = [
  "Guarantee selection or shortlisting",
  "Contact the awarding body to influence the result",
  "Write invented achievements or fake references",
  "Charge you for an application that is free to submit",
  "Sell you a place in a government programme",
];
const TEAM_FALLBACK = [
  {
    name: "Anisuzzaman Kiron",
    slug: "anisuzzaman-kiron",
    designation: "Founder & CEO",
  },
  {
    name: "Yeasmin Akther",
    slug: "yeasmin-akther",
    designation: "Co-Founder & COO",
  },
  { name: "Md Kamrul Hasan", slug: "kamrul", designation: "General Manager" },
  {
    name: "Md Samsuzzaman",
    slug: "md-samsuzzaman",
    designation: "Chief Adviser",
  },
  {
    name: "Afroza Khanam Ruma",
    slug: "afroza-khanam-ruma",
    designation: "Head Counselor",
  },
  {
    name: "Kauser Hossain",
    slug: "kauser-hossain",
    designation: "Destination Manager",
  },
  {
    name: "Arif Rahman",
    slug: "arif-rahman",
    designation: "Operations Manager",
  },
  {
    name: "Zahid Hasan Pabel",
    slug: "zahid-hasan-pabel",
    designation: "Branch Manager, Sylhet",
  },
];

/* ---------- Helpers ---------- */
const list = (v) => (Array.isArray(v) ? v : []);
const clean = (v) => String(v ?? "").trim();
const initials = (n) =>
  (n || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("") || "SE";
const stripHtml = (h) =>
  String(h || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const escapeHtml = (t) =>
  String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/* Admin text may be plain or simple HTML: plain text keeps its paragraphs */
const rich = (t) => {
  const v = clean(t);
  if (!v) return "";
  if (/<[a-z][\s\S]*>/i.test(v)) return v;
  return v
    .split(/\n{2,}/)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
};
/* Own-site absolute links become router paths */
const toPath = (u) => {
  const v = clean(u);
  if (!v) return "";
  if (v.startsWith(siteUrl))
    return "/" + v.slice(siteUrl.length).replace(/^\/+/, "");
  return v;
};
/* "Long heading text" -> ["Long heading", "text"] (last words get the green accent) */
const splitHead = (t) => {
  const w = clean(t).split(/\s+/).filter(Boolean);
  if (w.length < 3) return [clean(t), ""];
  const n = w.length > 5 ? 2 : 1;
  return [w.slice(0, -n).join(" "), w.slice(-n).join(" ")];
};

/* ---------- Data ---------- */
const { data } = await useApi(`/scholarships/${slug}`, {
  key: `scholarship-${slug}`,
  transform: (res) => res.data,
});
const s = computed(() => data.value || null);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Scholarship not found",
    fatal: true,
  });
}

const short = computed(
  () => s.value?.short_name || s.value?.name || "scholarship",
);

/* Team and counsellor (staff API) */
const { data: staffData } = await useApi("/staff", {
  key: "scholarship-staff",
});
const staff = computed(() => {
  const raw = staffData.value;
  const arr = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
      ? raw.data
      : [];
  return arr.filter((m) => m && m.slug && m.name);
});
const team = computed(() =>
  staff.value.length
    ? staff.value
        .slice(0, 8)
        .map((m) => ({
          name: m.name,
          slug: m.slug,
          designation: m.designation || "",
          photo: m.photo || "",
        }))
    : TEAM_FALLBACK,
);
const counsellor = computed(() => {
  const cs = s.value?.support?.counsellor_slug;
  return cs ? staff.value.find((m) => m.slug === cs) || null : null;
});

/* FAQs: this scholarship's own group first, then the shared "scholarships" group */
const { data: faqData } = await useApi("/faqs", {
  key: `faqs-scholarship-${slug}`,
  query: { group: `scholarship-${slug},scholarships` },
});
const faqs = computed(() => {
  const raw = faqData.value;
  const arr = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
      ? raw.data
      : [];
  const mapped = arr
    .map((f) => ({
      q: clean(f.question ?? f.q),
      a: clean(f.answer ?? f.a),
      text: clean(f.answer_text) || stripHtml(f.answer ?? f.a),
      own: f.group === `scholarship-${slug}`,
    }))
    .filter((f) => f.q && f.a);
  const own = mapped.filter((f) => f.own);
  return own.length ? own : mapped;
});

/* ---------- Page content ---------- */
const titleParts = computed(() => {
  const n = clean(s.value?.name);
  const i = n.lastIndexOf(" for ");
  if (i > 0) return [n.slice(0, i), n.slice(i + 1)];
  return splitHead(n);
});
const heroText = computed(
  () => clean(s.value?.intro) || clean(s.value?.description),
);
const overviewHead = computed(() =>
  splitHead(clean(s.value?.overview?.title) || `What is the ${short.value}?`),
);

const glance = computed(() => {
  const rows = list(s.value?.glance)
    .map((g) => ({ label: clean(g.label), value: clean(g.value) }))
    .filter((g) => g.label && g.value);
  if (rows.length) return rows;
  const x = s.value || {};
  return [
    ["Level", x.levels_text],
    ["Destination", x.country],
    ["Funder", x.funding_label],
    ["Status", x.status_label],
    ["Apply at", x.apply_through],
  ]
    .map(([label, value]) => ({ label, value: clean(value) }))
    .filter((g) => g.value);
});
const stats = computed(() =>
  list(s.value?.stats)
    .map((x) => ({ big: clean(x.big), small: clean(x.small) }))
    .filter((x) => x.big),
);
const included = computed(() => {
  const l = list(s.value?.included).map(clean).filter(Boolean);
  return l.length ? l : INCLUDED_FALLBACK;
});
const notIncluded = computed(() => {
  const l = list(s.value?.not_included).map(clean).filter(Boolean);
  return l.length ? l : NOT_INCLUDED_FALLBACK;
});
const coverageRows = computed(() =>
  list(s.value?.coverage?.rows).filter((r) => clean(r.item)),
);
const eligibility = computed(() =>
  list(s.value?.eligibility?.items).map(clean).filter(Boolean),
);
const checklist = computed(() =>
  list(s.value?.eligibility?.checklist)
    .map((c) => ({
      label: clean(c.label),
      miss: clean(c.miss) || clean(c.label),
    }))
    .filter((c) => c.label),
);
const steps = computed(() =>
  list(s.value?.steps).filter((x) => clean(x.title)),
);
const STATUS_CLS = { open: "open", closed: "closed", soon: "soon" };
const timeline = computed(() =>
  list(s.value?.timeline?.rows)
    .filter((r) => r && clean(r.stage))
    .map((r) => ({
      stage: clean(r.stage),
      date: clean(r.date),
      cls: STATUS_CLS[r.status] || "soon",
      label:
        clean(r.status_label) ||
        { open: "Open", closed: "Closed", soon: "Not yet open" }[
          STATUS_CLS[r.status] || "soon"
        ],
    })),
);
const mistakes = computed(() =>
  list(s.value?.mistakes).filter((x) => clean(x.title)),
);
const related = computed(() =>
  list(s.value?.related)
    .map((r) => ({ label: clean(r.label), to: toPath(r.url) }))
    .filter((r) => r.label && r.to),
);
const sources = computed(() =>
  list(s.value?.sources?.items)
    .map((x) => ({ name: clean(x.name), url: clean(x.url) }))
    .filter((x) => x.name && x.url),
);

/* Checklist tool */
const checks = reactive({});
const checkedCount = computed(
  () => checklist.value.filter((_, i) => checks[i]).length,
);
const missing = computed(() =>
  checklist.value.filter((_, i) => !checks[i]).map((c) => c.miss),
);

/* Dates (Dhaka time, so server and browser agree) */
const dateObj = computed(() => {
  const v = s.value?.last_verified_at;
  const d = v
    ? new Date(`${v}T00:00:00+06:00`)
    : s.value?.updated_at
      ? new Date(s.value.updated_at)
      : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
});
const fmt = (opts) =>
  dateObj.value
    ? dateObj.value.toLocaleDateString("en-GB", {
        timeZone: "Asia/Dhaka",
        ...opts,
      })
    : "";
const verifiedIso = computed(() =>
  dateObj.value
    ? dateObj.value.toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" })
    : "",
);
const verifiedLabel = computed(() =>
  fmt({ day: "numeric", month: "long", year: "numeric" }),
);
const verifiedShort = computed(() =>
  fmt({ day: "numeric", month: "short", year: "numeric" }),
);
const reviewerInitials = computed(() =>
  initials(s.value?.reviewer?.name || "Sunrise Education"),
);

/* Image fallback */
const broken = reactive({});

/* ---------- SEO ---------- */
const seoTitle = computed(
  () =>
    clean(s.value?.seo?.meta_title) ||
    `${s.value?.name}: Eligibility & How to Apply | Sunrise`,
);
const seoDesc = computed(
  () =>
    clean(s.value?.seo?.meta_description) ||
    stripHtml(heroText.value).slice(0, 200),
);
useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDesc.value,
  keywords: () => clean(s.value?.seo?.meta_keywords) || undefined,
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDesc.value,
  ogType: "article",
  ogUrl: pageUrl,
  twitterCard: "summary_large_image",
  twitterTitle: () => seoTitle.value,
  twitterDescription: () => seoDesc.value,
});

const jsonLd = computed(() => {
  const orgId = siteUrl + "#organization";
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Scholarships",
          item: siteUrl + "scholarships",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: s.value?.name,
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": pageUrl + "#page",
      url: pageUrl,
      name: seoTitle.value,
      description: seoDesc.value,
      inLanguage: "en",
      dateModified: verifiedIso.value || undefined,
      isPartOf: {
        "@type": "WebSite",
        "@id": siteUrl + "#website",
        url: siteUrl,
        name: brand,
      },
    },
    {
      "@type": "Article",
      headline: s.value?.name,
      description: seoDesc.value,
      mainEntityOfPage: pageUrl,
      dateModified: verifiedIso.value || undefined,
      author: {
        "@type": "Organization",
        "@id": orgId,
        name: brand,
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        "@id": orgId,
        name: brand,
        url: siteUrl,
      },
    },
  ];
  if (steps.value.length) {
    graph.push({
      "@type": "HowTo",
      name: `How to apply for the ${short.value} from Bangladesh`,
      step: steps.value.map((st, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: st.title,
        text: clean(st.text) || st.title,
      })),
    });
  }
  if (faqs.value.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.value.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.text },
      })),
    });
  }
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
});
useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{ type: "application/ld+json", innerHTML: () => jsonLd.value }],
});

/* ---------- Scroll reveal (content stays visible if JS is off) ---------- */
const root = ref(null);
const js = ref(false);
let io = null;
onMounted(() => {
  if (!root.value || !("IntersectionObserver" in window)) return;
  js.value = true;
  nextTick(() => {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    root.value.querySelectorAll(".scf-reveal").forEach((el) => io.observe(el));
  });
});
onBeforeUnmount(() => io && io.disconnect());
</script>

<style scoped>
.scf {
  --sec-white: #fff;
  --sec-offwhite: #fbfaf7;
  --sec-gold-bg: #fdf6e9;
  --sec-navy: #16213a;
  --sec-green: #2fa84f;
  --sec-green-dk: #238040;
  --sec-orange: #f5a623;
  --sec-blue: #2d6cb4;
  --sec-slate: #667085;
  --sec-line: #e7e9ec;
  font-family: "Manrope", sans-serif;
  color: var(--sec-navy);
  background: #fff;
}
.scf *,
.scf *::before,
.scf *::after {
  box-sizing: border-box;
}
.scf a {
  color: inherit;
}
.scf-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}
.scf-section {
  padding: 80px 0;
}
.scf-eyebrow {
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
.scf-eyebrow i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--sec-orange);
}
.scf-h2 {
  font-size: clamp(26px, 3.2vw, 38px);
  line-height: 1.2;
  font-weight: 800;
  margin: 0 0 22px;
  letter-spacing: -0.01em;
}
.scf-h2 span {
  color: var(--sec-green);
}
.scf-lead {
  font-size: 17px;
  line-height: 1.75;
  color: var(--sec-slate);
  margin: 0 0 36px;
  max-width: 780px;
}
.scf-center {
  text-align: center;
}
.scf-btn {
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
.scf-btn-primary {
  background: var(--sec-green);
  color: #fff !important;
  box-shadow: 0 10px 24px rgba(47, 168, 79, 0.22);
}
.scf-btn-primary:hover {
  background: var(--sec-green-dk);
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(47, 168, 79, 0.28);
}
.scf-btn-ghost {
  border: 1.5px solid var(--sec-line);
  color: var(--sec-navy);
  background: #fff;
}
.scf-btn-ghost:hover {
  border-color: var(--sec-green);
  color: var(--sec-green-dk);
  transform: translateY(-2px);
}
.scf-reveal {
  opacity: 1;
  transform: none;
}
.scf-js .scf-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.scf-js .scf-reveal.is-in {
  opacity: 1;
  transform: none;
}

/* ---------- HERO ---------- */
.scf-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--sec-gold-bg) 0%, #fff 100%);
  padding: 40px 0 70px;
}
.scf-hero-rays {
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
  animation: scf-rotate 60s linear infinite;
}
.scf-crumb {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13.5px;
  color: var(--sec-slate);
  margin-bottom: 34px;
}
.scf-crumb a {
  text-decoration: none;
  font-weight: 600;
}
.scf-crumb a:hover {
  color: var(--sec-green-dk);
}
.scf-hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.95fr;
  gap: 48px;
  align-items: center;
}
.scf-hero-grid > div:only-child {
  grid-column: 1 / -1;
}
.scf-h1 {
  font-size: clamp(32px, 4.6vw, 54px);
  line-height: 1.1;
  font-weight: 800;
  margin: 0 0 18px;
  letter-spacing: -0.02em;
}
.scf-h1 span {
  display: block;
  color: var(--sec-green);
}
.scf-sub {
  font-size: 17.5px;
  line-height: 1.75;
  color: var(--sec-slate);
  margin: 0 0 28px;
  max-width: 640px;
}
.scf-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 26px;
}
.scf-cta-center {
  justify-content: center;
  margin: 0;
}
.scf-byline {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13.5px;
  color: var(--sec-slate);
  line-height: 1.6;
}
.scf-byline b {
  color: var(--sec-navy);
}
.scf-byline a {
  text-decoration: none;
}
.scf-av {
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
.scf-av img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.scf-facts {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.08);
  position: relative;
}
.scf-facts::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22px;
  bottom: 22px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--sec-green);
}
.scf-facts h2 {
  font-size: 17px;
  margin: 0 0 14px;
  font-weight: 800;
}
.scf-facts dl {
  margin: 0;
  display: grid;
  gap: 8px;
}
.scf-facts dl div {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--sec-offwhite);
  font-size: 14px;
}
.scf-facts dt {
  color: var(--sec-slate);
  font-weight: 600;
}
.scf-facts dd {
  margin: 0;
  font-weight: 800;
}
.scf-stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--n, 4), 1fr);
  margin-top: 46px;
  border-top: 1px solid var(--sec-line);
  padding-top: 26px;
}
.scf-stat {
  padding: 0 20px;
  border-left: 1px solid var(--sec-line);
}
.scf-stat:first-child {
  border-left: 0;
  padding-left: 0;
}
.scf-stat b {
  display: block;
  font-size: clamp(22px, 2.6vw, 34px);
  font-weight: 800;
  line-height: 1.1;
}
.scf-stat small {
  font-size: 13px;
  color: var(--sec-slate);
  line-height: 1.4;
  display: block;
  margin-top: 4px;
}

/* ---------- Prose / rich text ---------- */
.scf-prose :deep(p),
.scf-rich :deep(p),
.scf-sec p {
  font-size: 16px;
  line-height: 1.85;
  color: #475467;
  margin: 0 0 16px;
}
.scf-sec > p,
.scf-rich {
  max-width: 860px;
}
.scf-rich :deep(ul),
.scf-prose :deep(ul) {
  margin: 0 0 16px;
  padding-left: 22px;
  color: #475467;
  line-height: 1.8;
}
.scf-prose :deep(a),
.scf-rich :deep(a),
.scf-sec p a {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.scf-rich :deep([style]),
.scf-prose :deep([style]),
.note :deep([style]),
.warn :deep([style]),
.scf-faq-a :deep([style]) {
  color: inherit !important;
  font-family: inherit !important;
}
.scf-overview {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 44px;
  align-items: start;
}
.note,
.warn {
  border-radius: 12px;
  padding: 16px 20px;
  margin: 18px 0;
  font-size: 15px;
  line-height: 1.75;
  max-width: 980px;
}
.note :deep(p),
.warn :deep(p) {
  margin: 0;
  font-size: 15px;
  color: inherit;
}
.note :deep(p + p),
.warn :deep(p + p) {
  margin-top: 8px;
}
.note {
  background: #eef5ff;
  border: 1px solid #cfe2f8;
  border-left: 4px solid var(--sec-blue);
  color: #33415c;
}
.warn {
  background: #fdecea;
  border: 1px solid #f4c7c1;
  border-left: 4px solid #c0392b;
  color: #5b2a24;
}
.scf-note {
  font-size: 13.5px !important;
  color: var(--sec-slate) !important;
  line-height: 1.7;
  margin: 18px 0 0 !important;
}

/* ---------- Aside ---------- */
.scf-aside {
  display: grid;
  gap: 18px;
  position: sticky;
  top: 96px;
}
.scf-incl {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}
.scf-incl-top {
  background: linear-gradient(135deg, #2d6cb4, #16213a);
  color: #fff;
  padding: 16px 22px;
  font-weight: 800;
  font-size: 16px;
}
.scf-incl ul {
  list-style: none;
  margin: 0;
  padding: 16px 22px 20px;
  display: grid;
  gap: 10px;
}
.scf-incl li,
.scf-ticks li {
  position: relative;
  padding-left: 26px;
  font-size: 14.5px;
  line-height: 1.55;
}
.scf-incl li::before,
.scf-ticks li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(47, 168, 79, 0.14);
}
.scf-incl li::after,
.scf-ticks li::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 6px;
  width: 4px;
  height: 7px;
  border: solid var(--sec-green-dk);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.scf-fit {
  background: var(--sec-gold-bg);
  border: 1px solid #f2ddb0;
  border-radius: 16px;
  padding: 22px;
}
.scf-fit h3 {
  margin: 0 0 8px;
  font-size: 17px;
}
.scf-fit p {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.65;
  color: #475467;
}
.scf-fit .scf-btn {
  width: 100%;
}
.scf-fit small {
  display: block;
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
}
.scf-fit small a {
  color: var(--sec-green-dk);
  font-weight: 800;
  text-decoration: none;
}
.scf-soft {
  background: var(--sec-offwhite);
}

/* ---------- Tables ---------- */
.scf-table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid var(--sec-line);
  background: #fff;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
}
.scf-table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  font-size: 14.5px;
}
.scf-table th {
  background: var(--sec-navy);
  color: #fff;
  text-align: left;
  padding: 14px 18px;
  font-size: 12.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.scf-table td {
  padding: 14px 18px;
  border-top: 1px solid var(--sec-line);
  vertical-align: top;
  line-height: 1.6;
  color: #475467;
}
.scf-table td:first-child {
  font-weight: 800;
  color: var(--sec-navy);
  width: 34%;
}
.scf-table tr:nth-child(even) td {
  background: var(--sec-offwhite);
}
.st {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 99px;
  font-size: 12.5px;
  font-weight: 800;
  white-space: nowrap;
}
.st-open {
  background: #e6f6ec;
  color: #146c3a;
}
.st-closed {
  background: #eef0f3;
  color: #475467;
}
.st-soon {
  background: #fff4d6;
  color: #8a5a00;
}

/* ---------- Eligibility ---------- */
.tick {
  list-style: none;
  padding: 0;
  margin: 0 0 8px;
  display: grid;
  gap: 9px;
}
.tick li {
  position: relative;
  padding-left: 26px;
  font-size: 15px;
  line-height: 1.7;
  color: #475467;
}
.tick li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(47, 168, 79, 0.14);
}
.tick li::after {
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
.tool {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-top: 4px solid var(--sec-green);
  border-radius: 16px;
  padding: 28px;
  margin-top: 24px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
  max-width: 980px;
}
.tool p {
  margin: 0 0 8px;
  font-size: 15px;
}
.tool label {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin: 8px 0;
  font-size: 15px;
  line-height: 1.5;
  font-weight: 600;
  cursor: pointer;
}
.tool input[type="checkbox"] {
  margin-top: 4px;
  width: 18px;
  height: 18px;
  flex: none;
  accent-color: #2fa84f;
}
.out {
  margin-top: 18px;
  background: var(--sec-offwhite);
  border: 1px solid var(--sec-line);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.7;
  color: #475467;
}
.scf-miss {
  margin: 8px 0 0;
  padding-left: 20px;
}

/* ---------- Steps ---------- */
.scf-steps-wrap {
  max-width: 900px;
}
.scf-miles {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}
.scf-miles li {
  position: relative;
  padding: 0 0 26px 40px;
}
.scf-miles li::before {
  content: "";
  position: absolute;
  left: 8px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--sec-green);
}
.scf-miles li:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 14px;
  top: 24px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(var(--sec-green), var(--sec-orange));
}
.scf-miles b {
  display: block;
  font-size: 12.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #b87400;
  margin-bottom: 2px;
}
.scf-miles h3 {
  margin: 0 0 4px;
  font-size: 18px;
}
.scf-sec .scf-miles p {
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
  color: var(--sec-slate);
}

/* ---------- Mistakes ---------- */
.scf-values-sec {
  background: var(--sec-navy);
  color: #fff;
  position: relative;
  overflow: hidden;
}
.scf-values-sec::before {
  content: "";
  position: absolute;
  left: -200px;
  bottom: -300px;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(47, 168, 79, 0.18), transparent 65%);
}
.scf-values-sec .scf-eyebrow {
  color: #9fe0b0;
  border-color: rgba(159, 224, 176, 0.3);
  background: rgba(47, 168, 79, 0.1);
}
.scf-values-sec .scf-h2 {
  color: #fff;
}
.scf-values {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  counter-reset: v;
}
.scf-value {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 24px;
  transition:
    background 0.3s,
    border-color 0.3s;
}
.scf-value:hover {
  background: rgba(47, 168, 79, 0.1);
  border-color: rgba(47, 168, 79, 0.5);
}
.scf-value::before {
  counter-increment: v;
  content: "0" counter(v);
  display: block;
  font-size: 30px;
  font-weight: 800;
  color: var(--sec-orange);
  margin-bottom: 8px;
}
.scf-value h3 {
  margin: 0 0 8px;
  font-size: 17px;
}
.scf-value p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.7;
  color: #c9d1e0;
}

/* ---------- Support ---------- */
.scf-pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
}
.scf-pillar {
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
.scf-pillar:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 44px rgba(22, 33, 58, 0.11);
}
.scf-pillar-top,
.scf-office-top {
  position: relative;
  overflow: hidden;
  padding: 26px 28px;
  color: #fff;
}
.scf-pillar-top::after {
  content: "";
  position: absolute;
  right: -70px;
  top: -70px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.12) 0 8deg,
    transparent 8deg 22deg
  );
  transition: transform 0.8s;
}
.scf-pillar:hover .scf-pillar-top::after {
  transform: rotate(60deg);
}
.g-blue {
  background: linear-gradient(135deg, #2d6cb4, #16213a);
}
.g-green {
  background: linear-gradient(135deg, #2fa84f, #1e6e39);
}
.scf-pillar-top span,
.scf-office-top span {
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
.scf-pillar-top h3 {
  position: relative;
  z-index: 1;
  margin: 14px 0 0;
  font-size: 23px;
}
.scf-pillar-body {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.scf-ticks {
  margin: 4px 0 8px;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}
.scf-ticks li {
  font-size: 14.5px;
}
.scf-ticks.x li::before {
  background: rgba(192, 57, 43, 0.12);
}
.scf-ticks.x li::after {
  content: "\00d7";
  border: 0;
  transform: none;
  left: 4px;
  top: -1px;
  width: auto;
  height: auto;
  color: #c0392b;
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
}
.scf-fee {
  margin-top: 26px;
}
.scf-results {
  margin-top: 20px;
}
.scf-counsellor {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 22px;
  padding: 14px 20px;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 14px;
  text-decoration: none;
  box-shadow: 0 10px 24px rgba(22, 33, 58, 0.05);
  transition:
    transform 0.25s,
    border-color 0.25s;
}
.scf-counsellor:hover {
  transform: translateY(-3px);
  border-color: rgba(47, 168, 79, 0.4);
}
.scf-counsellor .scf-av {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #2d6cb4, #16213a);
}
.scf-counsellor small {
  display: block;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #b87400;
}
.scf-counsellor b {
  display: block;
  font-size: 16px;
}
.scf-counsellor em {
  font-style: normal;
  font-size: 13.5px;
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* ---------- Links ---------- */
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 6px 0 0;
}
.links a {
  display: inline-block;
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  padding: 7px 13px;
  border-radius: 999px;
  background: var(--sec-offwhite);
  border: 1px solid var(--sec-line);
  transition: all 0.2s;
}
.links a:hover {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
}

/* ---------- Team ---------- */
.scf-team {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.scf-member {
  display: block;
  text-decoration: none;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 22px;
  text-align: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.scf-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.09);
  border-color: rgba(47, 168, 79, 0.4);
}
.scf-member .scf-av {
  width: 84px;
  height: 84px;
  margin: 0 auto 14px;
  font-size: 24px;
  background: linear-gradient(135deg, #2d6cb4, #16213a);
}
.scf-member h3 {
  margin: 0 0 2px;
  font-size: 16px;
}
.scf-member p {
  margin: 0 0 8px;
  font-size: 13.5px;
  color: var(--sec-green-dk);
  font-weight: 700;
}
.scf-team-cta {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.scf-team-cta svg,
.scf-link svg {
  width: 16px;
  height: 16px;
  flex: none;
}

/* ---------- FAQ ---------- */
.scf-faq {
  background: var(--sec-gold-bg);
}
.scf-faq-list {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 12px;
}
.scf-faq details {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 14px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}
.scf-faq details[open] {
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.08);
}
.scf-faq summary {
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
.scf-faq summary::-webkit-details-marker {
  display: none;
}
.scf-faq summary::after {
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
.scf-faq details[open] summary::after {
  transform: rotate(45deg);
}
.scf-faq-a {
  padding: 0 24px 22px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--sec-slate);
}
.scf-faq-a :deep(p) {
  margin: 0 0 10px;
}
.scf-faq-a :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* ---------- Sources ---------- */
.scf-src {
  margin: 0;
  padding: 0 0 0 20px;
  display: grid;
  gap: 6px;
}
.scf-src li {
  font-size: 14.5px;
  line-height: 1.6;
  word-break: break-word;
}
.scf-src a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* ---------- Offices ---------- */
.scf-offices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.scf-office {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
}
.scf-office-top {
  padding: 22px 26px;
}
.scf-office-top h3 {
  margin: 12px 0 0;
  font-size: 21px;
}
.scf-office dl {
  margin: 0;
  padding: 20px 26px 24px;
  display: grid;
  gap: 10px;
}
.scf-office dl div {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  font-size: 14.5px;
  line-height: 1.6;
}
.scf-office dt {
  color: var(--sec-slate);
  font-weight: 600;
}
.scf-office dd {
  margin: 0;
  font-weight: 700;
}
.scf-office dd a {
  color: var(--sec-green-dk);
}
.scf-link {
  margin: 0 26px 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 16px;
  border-radius: 10px;
  border: 1.5px solid var(--sec-line);
  font-weight: 800;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s;
}
.scf-link:hover {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
}

/* ---------- CTA ---------- */
.scf-cta {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--sec-green) 0%, #1e6e39 100%);
  padding: 70px 0;
  color: #fff;
  text-align: center;
}
.scf-cta::before {
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
  animation: scf-rotate 80s linear infinite;
}
.scf-cta .scf-container {
  position: relative;
}
.scf-cta h2 {
  font-size: clamp(26px, 3.4vw, 40px);
  margin: 0 0 12px;
  font-weight: 800;
}
.scf-cta p {
  margin: 0 auto 28px;
  max-width: 620px;
  font-size: 17px;
  color: #ddf2e2;
  line-height: 1.7;
}
.scf-cta .scf-btn-primary {
  background: #fff;
  color: var(--sec-green-dk) !important;
}
.scf-cta .scf-btn-ghost {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.6);
}

@keyframes scf-rotate {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 1100px) {
  .scf-team {
    grid-template-columns: repeat(3, 1fr);
  }
  .scf-values {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .scf-hero-grid,
  .scf-overview,
  .scf-pillars,
  .scf-offices {
    grid-template-columns: 1fr;
  }
  .scf-aside {
    position: static;
  }
  .scf-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px 0;
  }
  .scf-stat:nth-child(odd) {
    border-left: 0;
    padding-left: 0;
  }
  .scf-team {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .scf-section {
    padding: 56px 0;
  }
  .scf-container {
    padding: 0 16px;
  }
  .scf-hero {
    padding: 28px 0 50px;
  }
  .scf-values {
    grid-template-columns: 1fr;
  }
  .scf-cta-row .scf-btn {
    flex: 1;
    justify-content: center;
  }
  .scf-facts dl div,
  .scf-office dl div {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  .scf-pillar-body,
  .scf-pillar-top {
    padding-left: 22px;
    padding-right: 22px;
  }
  .scf-table td:first-child {
    width: auto;
  }
  .scf-table td,
  .scf-table th {
    padding: 12px 14px;
  }
}
@media (max-width: 420px) {
  .scf-cta-row {
    flex-direction: column;
  }
  .scf-cta-row .scf-btn {
    width: 100%;
  }
  .scf-team {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .scf-member {
    padding: 16px 10px;
  }
  .scf-member .scf-av {
    width: 64px;
    height: 64px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .scf * {
    animation: none !important;
    transition: none !important;
  }
  .scf-js .scf-reveal {
    opacity: 1;
    transform: none;
  }
}
</style>
