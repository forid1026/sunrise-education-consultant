<template>
  <div class="sap">
    <!-- ================= HERO ================= -->
    <section class="sap-hero" aria-labelledby="sap-h1">
      <div class="sap-hero-rays" aria-hidden="true"></div>
      <div class="sap-container">
        <nav class="sap-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Study Abroad</span>
        </nav>
        <div class="sap-hero-grid">
          <div>
            <span v-if="total" class="sap-eyebrow"
              ><i></i>{{ total }} destinations compared</span
            >
            <h1 id="sap-h1" class="sap-h1">
              Study Abroad Destinations <span>for Bangladeshi Students</span>
            </h1>
            <p class="sap-sub">
              Compare {{ total ? `${total} countries` : "countries" }} where
              Bangladeshi students study. See tuition level, English test rules,
              intakes, scholarships and post-study work for each one, then pick
              the country that fits your budget and profile.
            </p>
            <div class="sap-cta-row">
              <NuxtLink class="sap-btn sap-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a v-if="total" class="sap-btn sap-btn-ghost" href="#sap-compare"
                >Compare Countries</a
              >
            </div>
            <div class="sap-byline">
              <span class="sap-avatar" aria-hidden="true">AK</span>
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
          <aside
            v-if="quickPicks.length"
            class="sap-answer"
            aria-labelledby="sap-quick"
          >
            <h2 id="sap-quick">Quick answer: which country is best?</h2>
            <p>
              There is no single best country. The right destination depends on
              your budget, results, English score and career plan. These are the
              strongest matches we see for Bangladeshi students:
            </p>
            <ul class="sap-picks">
              <li v-for="p in quickPicks" :key="p.label">
                {{ p.label }} <b>{{ p.value }}</b>
              </li>
            </ul>
          </aside>
        </div>
        <div v-if="total" class="sap-stats">
          <div v-for="s in heroStats" :key="s.small" class="sap-stat">
            <b>{{ s.big }}</b
            ><small>{{ s.small }}</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= EMPTY STATE ================= -->
    <section v-if="!total" class="sap-section">
      <div class="sap-container sap-center">
        <h2 class="sap-h2">Destinations are <span>coming soon</span></h2>
        <p class="sap-lead">
          We are updating our destination guides. Book a free assessment and a
          counsellor will recommend countries for your profile.
        </p>
      </div>
    </section>

    <!-- ================= DESTINATIONS ================= -->
    <section
      v-if="total"
      id="sap-destinations"
      class="sap-section sap-dest"
      aria-labelledby="sap-dest-h"
    >
      <div class="sap-container">
        <span class="sap-eyebrow"><i></i>Choose your destination</span>
        <h2 id="sap-dest-h" class="sap-h2">
          All Study Destinations <span>at a Glance</span>
        </h2>
        <p class="sap-lead">
          Each card gives you the essentials for Bangladeshi applicants: typical
          tuition level, English requirement, main intakes and the scholarship
          most students ask us about. Open a card to read our counsellors'
          summary, then visit the full country guide.
        </p>

        <div
          class="sap-tabs"
          role="tablist"
          aria-label="Filter destinations by region"
        >
          <button
            v-for="t in tabs"
            :key="t.key"
            class="sap-tab"
            :class="{ 'is-active': filter === t.key }"
            role="tab"
            type="button"
            :aria-selected="filter === t.key"
            @click="filter = t.key"
          >
            {{ t.label }} <span>{{ t.count }}</span>
          </button>
        </div>

        <div class="sap-grid">
          <article
            v-for="d in destinations"
            :id="d.anchor"
            :key="d.id"
            class="sap-card sap-reveal"
            :class="{ 'is-open': openCards.has(d.anchor) }"
            :hidden="filter !== 'all' && filter !== d.region"
          >
            <!-- image when available, region gradient (r-eu, r-as...) otherwise -->
            <div
              class="sap-card-top"
              :class="[d.cls, { 'has-img': d.image }]"
              :style="d.topStyle"
            >
              <span class="sap-region">{{ d.regionLabel }}</span>
              <span v-if="d.code" class="sap-code" aria-hidden="true">{{
                d.code
              }}</span>
              <div>
                <h3>{{ d.short }}</h3>
                <div v-if="d.tagline" class="sap-tag">{{ d.tagline }}</div>
              </div>
            </div>
            <div class="sap-card-body">
              <ul v-if="d.facts.length" class="sap-facts">
                <li v-for="f in d.facts" :key="f[0]">
                  {{ f[0] }}<b>{{ f[1] }}</b>
                </li>
              </ul>
              <div v-if="d.description || d.bestFor" class="sap-desc">
                <p v-if="d.description">{{ d.description }}</p>
                <p v-if="d.bestFor">Best for: {{ d.bestFor }}</p>
              </div>
              <button
                v-if="d.expandable"
                class="sap-more"
                type="button"
                :aria-expanded="openCards.has(d.anchor)"
                @click="toggleCard(d.anchor)"
              >
                {{ openCards.has(d.anchor) ? "Show less" : "Read more" }}
              </button>
              <NuxtLink class="sap-card-link" :to="d.to">
                Study in {{ d.short }} from Bangladesh
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </NuxtLink>
            </div>
          </article>
        </div>
        <p class="sap-note">
          Tuition levels are relative for international students (Low, Medium,
          High). Fees, English rules and scholarship terms change every year and
          differ by university, so always confirm current details on the
          official website or with a Sunrise counsellor before applying.
        </p>
      </div>
    </section>

    <!-- ================= COMPARISON TABLE ================= -->
    <section
      v-if="total"
      id="sap-compare"
      class="sap-section"
      aria-labelledby="sap-cmp-h"
    >
      <div class="sap-container">
        <span class="sap-eyebrow"><i></i>Side-by-side</span>
        <h2 id="sap-cmp-h" class="sap-h2">
          Compare Study Abroad Countries <span>for Bangladeshi Students</span>
        </h2>
        <p class="sap-lead">
          Use this table to shortlist two or three countries. Then open each
          country guide for full costs, universities and visa steps.
        </p>
        <div class="sap-table-wrap sap-reveal">
          <table class="sap-table">
            <caption
              class="sap-note"
              style="caption-side: bottom; text-align: left; padding: 12px 16px"
            >
              Relative levels for international students. Check official sources
              for current figures.
            </caption>
            <thead>
              <tr>
                <th v-for="c in tableHeads" :key="c" scope="col">{{ c }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in destinations" :key="d.id">
                <td>
                  <NuxtLink :to="d.to">{{ d.short }}</NuxtLink>
                </td>
                <td>
                  <span
                    v-if="d.cmp.tuition"
                    class="lvl"
                    :class="`lvl-${d.cmp.tuition}`"
                    >{{ lvlText[d.cmp.tuition] }}</span
                  ><template v-else>-</template>
                </td>
                <td>{{ d.cmp.living || "-" }}</td>
                <td>{{ d.cmp.english || "-" }}</td>
                <td>{{ d.cmp.intakes || "-" }}</td>
                <td>{{ d.cmp.scholarship || "-" }}</td>
                <td>{{ d.cmp.work || "-" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ================= BY GOAL ================= -->
    <section
      v-if="goals.length"
      class="sap-section sap-dest"
      aria-labelledby="sap-goal-h"
    >
      <div class="sap-container sap-center">
        <span class="sap-eyebrow"><i></i>Start from your goal</span>
        <h2 id="sap-goal-h" class="sap-h2">
          Best Destinations <span>by Student Goal</span>
        </h2>
        <p class="sap-lead">
          Most students know their budget or goal before they know their
          country. Start here.
        </p>
      </div>
      <div class="sap-container">
        <div class="sap-goals">
          <div v-for="g in goals" :key="g.key" class="sap-goal sap-reveal">
            <div class="sap-goal-ico" v-html="g.icon"></div>
            <h3>{{ g.title }}</h3>
            <p>{{ g.text }}</p>
            <div class="sap-chips">
              <a
                v-for="c in g.chips"
                :key="c.id"
                :href="`#${c.id}`"
                @click.prevent="goTo(c.id)"
                >{{ c.label }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= HOW TO CHOOSE ================= -->
    <section class="sap-section sap-choose" aria-labelledby="sap-choose-h">
      <div class="sap-container">
        <span
          class="sap-eyebrow"
          style="
            color: #ffe3a8;
            border-color: rgba(255, 227, 168, 0.35);
            background: rgba(255, 227, 168, 0.08);
          "
          ><i></i>Our counselling method</span
        >
        <h2 id="sap-choose-h" class="sap-h2" style="color: #fff">
          How We Help Students <span>Shortlist a Country</span>
        </h2>
        <p class="sap-lead">
          These are the six questions our counsellors ask in every free
          assessment. Answer them honestly and your shortlist usually narrows to
          two or three countries.
        </p>
        <div class="sap-steps">
          <div v-for="s in chooseSteps" :key="s.h" class="sap-step sap-reveal">
            <h3>{{ s.h }}</h3>
            <p>{{ s.p }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= E-E-A-T ================= -->
    <section class="sap-section" aria-labelledby="sap-trust-h">
      <div class="sap-container">
        <span class="sap-eyebrow"><i></i>About this guide</span>
        <h2 id="sap-trust-h" class="sap-h2">
          Who Prepared <span>This Guide</span>
        </h2>
        <div class="sap-trust">
          <div class="sap-author sap-reveal">
            <div class="sap-author-top">
              <span class="sap-avatar" aria-hidden="true">AK</span>
              <div>
                <h3>Anisuzzaman Kiron</h3>
                <small>Founder &amp; CEO, Sunrise Education Consultants</small>
              </div>
            </div>
            <p>
              This page is written by the Sunrise counselling team and reviewed
              by Anisuzzaman Kiron, who founded Sunrise Education Consultants in
              2014. Our counsellors in Banani, Dhaka and in Sylhet prepare
              admission and visa files for these destinations every week.
            </p>
            <p>
              We only summarise what we see work for Bangladeshi applicants and
              point you to official sources for rules that change. We never
              promise a guaranteed visa.
            </p>
            <NuxtLink class="sap-link" to="/staff"
              >Meet our counsellors &rarr;</NuxtLink
            >
            <div class="sap-meta">
              <span>Last updated: {{ updatedLabel }}</span
              ><span>Next review: Jan 2027</span>
            </div>
          </div>
          <div class="sap-sources sap-reveal">
            <h3>Official sources we check</h3>
            <ul>
              <li v-for="s in sources" :key="s.u">
                <a :href="s.u" target="_blank" rel="noopener">{{ s.t }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="sap-section sap-faq" aria-labelledby="sap-faq-h">
      <div class="sap-container sap-center">
        <span class="sap-eyebrow"><i></i>FAQ</span>
        <h2 id="sap-faq-h" class="sap-h2">
          Study Abroad Destinations: <span>Common Questions</span>
        </h2>
        <p class="sap-lead">
          Short answers to what Bangladeshi students and parents ask us most.
        </p>
      </div>
      <div class="sap-container">
        <div class="sap-faq-list">
          <details v-for="(f, i) in faqs" :key="f.q" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <p>{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="sap-cta" aria-labelledby="sap-cta-h">
      <div class="sap-container">
        <h2 id="sap-cta-h">Not sure which country fits you?</h2>
        <p>
          Book a free profile assessment. A Sunrise counsellor will shortlist
          realistic countries, universities and scholarships for your results
          and budget.
        </p>
        <div class="sap-cta-row" style="justify-content: center; margin: 0">
          <NuxtLink class="sap-btn sap-btn-primary" to="/apply-now"
            >Get Free Assessment
            <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <a class="sap-btn sap-btn-ghost" href="tel:+8801911878274"
            >Call 01911 878 274</a
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/* ------------------------------------------------------------ API: the only data call */
const { data: abroadsRes } = await useApi("/study-abroad", {
  transform: (res) => res.data,
});

/* ------------------------------------------------------------ constants */
const siteUrl = "https://sunrise-bd.net/";
const pageUrl = siteUrl + "study-abroad";
const FALLBACK_UPDATED = "2026-09-29"; // used only when the API has no last_reviewed_at

// Regions come from the API. These are only optional pretty labels / gradient classes;
// any other region key is humanized automatically (e.g. "south_asia" -> "South Asia").
const regionLabels = { uk_oceania: "UK & Oceania" };
const knownCls = { europe: "r-eu", asia: "r-as", north_america: "r-na", uk_oceania: "r-oc" };
const gradients = ["r-eu", "r-as", "r-na", "r-oc"];
const humanize = (k) =>
  String(k || "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
const hash = (str) => [...String(str)].reduce((a, c) => a + c.charCodeAt(0), 0);
const regionInfo = (key) => ({
  label: regionLabels[key] || humanize(key),
  cls: knownCls[key] || gradients[hash(key) % gradients.length],
});
const levelKey = { low: "l", medium: "m", high: "h" };
const lvlText = { l: "Low", m: "Medium", h: "High" };
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

/* ------------------------------------------------------------ countries from the API */
function normalize(d) {
  const c = d.comparison || d; // nested `comparison` object or flat fields
  const region = d.region || "other";
  const meta = regionInfo(region);
  const short =
    d.short_name ||
    String(d.name || "")
      .replace(/^Study in /i, "")
      .replace(/ from Bangladesh$/i, "");

  // card facts: API facts, else built from the comparison fields
  const facts = d.facts?.length
    ? d.facts.map((f) => [f.label, f.value])
    : [
        ["Tuition level", cap(c.tuition_level)],
        ["English test", c.english_requirement],
        ["Main intakes", c.intakes],
        ["Key scholarship", c.scholarship_highlight],
      ].filter((f) => f[1]);

  const description = d.description || "";
  return {
    id: d.id,
    slug: d.slug,
    anchor: String(d.code || d.slug).toLowerCase(),
    code: d.code,
    short,
    region,
    regionLabel: d.region_label || meta.label,
    cls: meta.cls,
    tagline: d.tagline,
    image: d.image,
    // image with a dark overlay when present; otherwise the region gradient class applies
    topStyle: d.image
      ? {
          backgroundImage: `linear-gradient(180deg, rgba(16,24,40,.25), rgba(16,24,40,.78)), url("${d.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : undefined,
    facts,
    description,
    bestFor: d.best_for,
    expandable: description.length > 180 || !!d.best_for,
    goalTags: d.goal_tags || [],
    to: `/study-abroad/${d.slug}`,
    cmp: {
      tuition: levelKey[c.tuition_level] || null,
      living: cap(c.living_cost),
      english: c.english_requirement,
      intakes: c.intakes,
      scholarship: c.scholarship_highlight,
      work: c.work_after_study,
    },
    apiSources: d.official_sources || [],
    reviewed: d.last_reviewed_at || null,
  };
}
const destinations = computed(() => (abroadsRes.value || []).map(normalize));
const total = computed(() => destinations.value.length);

/* ------------------------------------------------------------ hero */
const heroStats = computed(() => [
  { big: String(total.value), small: "Study destinations" },
  { big: "2014", small: "Guiding students since" },
  { big: "2", small: "Offices: Dhaka and Sylhet" },
  { big: "Free", small: "Profile assessment" },
]);

const names = (tag) =>
  destinations.value
    .filter((d) => d.goalTags.includes(tag))
    .map((d) => d.short)
    .join(", ");
const quickPicks = computed(() =>
  [
    { label: "Low total cost", value: names("lowest_cost") },
    { label: "English-speaking Europe", value: names("english_eu") },
    { label: "Fully funded scholarships", value: names("fully_funded") },
    { label: "Without IELTS (MOI)", value: names("no_ielts") },
    { label: "Post-study work and careers", value: names("work_after") },
  ].filter((q) => q.value),
);

const updatedISO = computed(() => {
  const dates = destinations.value.map((d) => d.reviewed).filter(Boolean).sort();
  return dates.length ? dates[dates.length - 1] : FALLBACK_UPDATED;
});
const updatedLabel = computed(() =>
  new Date(updatedISO.value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
);

/* ------------------------------------------------------------ filter tabs + cards */
const filter = ref("all");
// One tab per distinct region found in the API data (duplicates collapse into one).
const tabs = computed(() => {
  const counts = new Map();
  for (const d of destinations.value) {
    counts.set(d.region, (counts.get(d.region) || 0) + 1);
  }
  return [
    { key: "all", label: "All", count: total.value },
    ...[...counts].map(([key, count]) => ({
      key,
      label: regionInfo(key).label,
      count,
    })),
  ];
});
const openCards = reactive(new Set());
const toggleCard = (id) =>
  openCards.has(id) ? openCards.delete(id) : openCards.add(id);
const goTo = async (id) => {
  filter.value = "all";
  openCards.add(id);
  await nextTick();
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ------------------------------------------------------------ comparison table */
const tableHeads = [
  "Country",
  "Tuition",
  "Living cost",
  "English requirement",
  "Main intakes",
  "Scholarship highlight",
  "Work after study",
];

/* ------------------------------------------------------------ goals (chips come from goal_tags) */
const goalDefs = [
  {
    key: "lowest_cost",
    title: "Lowest total cost",
    text: "Public universities with low tuition and affordable cities.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2m0 8v2"/></svg>',
  },
  {
    key: "fully_funded",
    title: "Fully funded scholarship",
    text: "Government scholarships open to Bangladeshi applicants.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/></svg>',
  },
  {
    key: "no_ielts",
    title: "Without IELTS",
    text: "Universities that often accept an MOI certificate or their own test.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2Z"/><path d="M8 7h6M8 11h6"/></svg>',
  },
  {
    key: "work_after",
    title: "Work after graduation",
    text: "Clear post-study work routes for international graduates.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  },
  {
    key: "medicine",
    title: "Medicine (MBBS / MD)",
    text: "English-taught medical degrees popular with Bangladeshi students.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.4-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.6-7 11-7 11Z"/></svg>',
  },
  {
    key: "english_eu",
    title: "English-speaking Europe",
    text: "Study and live in English inside the EU.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  },
];
const goals = computed(() =>
  goalDefs
    .map((g) => ({
      ...g,
      chips: destinations.value
        .filter((d) => d.goalTags.includes(g.key))
        .map((d) => ({ label: d.short, id: d.anchor })),
    }))
    .filter((g) => g.chips.length),
);

/* ------------------------------------------------------------ editorial content */
const chooseSteps = [
  { h: "What is your total budget?", p: "Add tuition, living costs, visa fees and the bank solvency amount the embassy expects. Budget rules out more countries than any other factor." },
  { h: "What is your academic record?", p: "Your HSC or bachelor's results, subject background and any study gap decide which universities are realistic." },
  { h: "Do you have IELTS or an MOI?", p: "Some destinations need IELTS for the visa itself. Others accept an MOI certificate for many programs." },
  { h: "Are you aiming for a scholarship?", p: "Government scholarships have fixed deadlines months before intake. Plan around them early." },
  { h: "Do you want to work after graduating?", p: "If a job abroad is the goal, weigh post-study work routes and local job markets, not just tuition." },
  { h: "Which intake can you meet?", p: "Count back from the intake: tests, document attestation, offer letter and visa processing all take time." },
];

// official sources: from the API when countries provide them, otherwise this default list
const defaultSources = [
  { t: "Universitaly", u: "https://www.universitaly.it/" },
  { t: "Embassy of Italy, Dhaka", u: "https://ambdhaka.esteri.it/" },
  { t: "Stipendium Hungaricum", u: "https://stipendiumhungaricum.hu/" },
  { t: "Studyinfo.fi", u: "https://studyinfo.fi/" },
  { t: "Finnish Immigration Service", u: "https://migri.fi/en/home" },
  { t: "UDI Norway", u: "https://www.udi.no/en/" },
  { t: "Education Malaysia Global Services", u: "https://educationmalaysia.gov.my/" },
  { t: "Campus China (CSC)", u: "https://www.campuschina.org/" },
  { t: "Türkiye Burslari", u: "https://www.turkiyeburslari.gov.tr/" },
  { t: "IRCC Canada", u: "https://www.canada.ca/en/immigration-refugees-citizenship.html" },
  { t: "U.S. Embassy Dhaka", u: "https://bd.usembassy.gov/" },
  { t: "UK Student visa (GOV.UK)", u: "https://www.gov.uk/student-visa" },
  { t: "Australian Department of Home Affairs", u: "https://immi.homeaffairs.gov.au/" },
  { t: "Immigration New Zealand", u: "https://www.immigration.govt.nz/" },
];
const sources = computed(() => {
  const seen = new Set();
  const fromApi = [];
  for (const d of destinations.value) {
    for (const s of d.apiSources) {
      if (s?.url && !seen.has(s.url)) {
        seen.add(s.url);
        fromApi.push({ t: s.title, u: s.url });
      }
    }
  }
  return fromApi.length ? fromApi : defaultSources;
});

const faqs = [
  { q: "Which country is best for Bangladeshi students to study abroad?", a: "There is no single best country. The right choice depends on your budget, academic record, English test score and career plan. Compare tuition level, English requirement, intakes, scholarships and post-study work in the table above, then shortlist two or three countries with a Sunrise counsellor." },
  { q: "Which countries accept Bangladeshi students without IELTS?", a: "Many universities in countries such as Italy, Malta, Cyprus, Malaysia, China and Turkey accept a Medium of Instruction (MOI) certificate or their own English test instead of IELTS. Rules differ by university and by program, and some embassies still ask for proof of English, so each application should be checked individually." },
  { q: "What is the cheapest country to study abroad from Bangladesh?", a: "Public universities in countries with low tuition levels, such as Italy, Hungary, Turkey and China, and many universities in Malaysia, usually cost the least in total. The UK, the USA, Canada, Australia and Norway usually cost the most. Check the tuition and living cost columns in the comparison table." },
  { q: "Which countries offer fully funded scholarships to Bangladeshi students?", a: "Well-known fully funded options open to Bangladeshi students include Stipendium Hungaricum (Hungary), the Chinese Government Scholarship (CSC), Türkiye Burslari (Turkey) and regional DSU scholarships in Italy. Eligibility and deadlines change every year, so confirm each call on the official website." },
  { q: "Can Bangladeshi students work part-time while studying abroad?", a: "Yes, most destinations on this page allow limited part-time work during studies, usually around 20 hours per week in term time. The exact limit depends on the country and your visa type, so check the current rule for your destination before you plan your budget around part-time income." },
  { q: "Which study destinations offer post-study work visas?", a: "Canada (PGWP), the USA (OPT), the UK (Graduate Route), Australia, New Zealand and Finland are known for post-study work options. Several EU countries, including Italy and Malta, allow graduates to stay for a period to look for work. Conditions and durations change, so check the latest rules for each country." },
  { q: "Which intake should Bangladeshi students target?", a: "The autumn intake (September or October) is the main intake in most of Europe, the UK and North America and offers the most programs and scholarships. Many countries also have January or spring intakes, and Australia and New Zealand start in February and July." },
  { q: "How can Sunrise Education Consultants help me choose a country?", a: "Sunrise offers a free profile assessment in Banani, Dhaka, in Sylhet or online. A counsellor reviews your academic results, English score, budget and goals, then shortlists countries, universities and scholarships that realistically fit your profile." },
];

/* ------------------------------------------------------------ SEO */
const pageTitle = "Study Abroad Destinations for Bangladeshi Students | Sunrise";
const pageDesc = total.value
  ? `Compare ${total.value} study destinations for Bangladeshi students: tuition level, IELTS or MOI rules, intakes, scholarships and post-study work. Find your best-fit country.`
  : "Study abroad destinations for Bangladeshi students: tuition level, IELTS or MOI rules, intakes, scholarships and post-study work.";

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: "Study Abroad Destinations for Bangladeshi Students",
  ogDescription: total.value
    ? `${total.value} destinations compared for Bangladeshi students: tuition, English requirements, intakes, scholarships and work rights.`
    : pageDesc,
  ogUrl: pageUrl,
  ogSiteName: "Sunrise Education Consultants",
  twitterCard: "summary_large_image",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Study Abroad", item: pageUrl },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": pageUrl + "#page",
      url: pageUrl,
      name: "Study Abroad Destinations for Bangladeshi Students",
      description: pageDesc,
      inLanguage: "en",
      dateModified: updatedISO.value,
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        geographicArea: { "@type": "Country", name: "Bangladesh" },
      },
      publisher: {
        "@type": "EducationalOrganization",
        "@id": siteUrl + "#organization",
        name: "Sunrise Education Consultants",
        url: siteUrl,
      },
      reviewedBy: {
        "@type": "Person",
        name: "Anisuzzaman Kiron",
        jobTitle: "Founder & CEO",
        url: siteUrl + "staff/anisuzzaman-kiron",
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Study abroad destinations for Bangladeshi students",
        numberOfItems: total.value,
        itemListElement: destinations.value.map((d, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `Study in ${d.short}`,
          url: siteUrl.slice(0, -1) + d.to,
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};
useHead({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) }],
});

/* ------------------------------------------------------------ reveal on scroll */
let io = null;
onMounted(() => {
  const els = document.querySelectorAll(".sap .sap-reveal");
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io?.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("is-in"));
  }
});
onBeforeUnmount(() => io?.disconnect());
</script>