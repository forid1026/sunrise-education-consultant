<template>
  <main class="sce">
    <div ref="root" class="svp mv" :class="{ 'mv-js': js }">
      <!-- ================= HERO ================= -->
      <section class="svp-hero" aria-labelledby="mv-h1">
        <div class="svp-hero-rays" aria-hidden="true"></div>
        <div class="svp-container">
          <nav class="svp-crumb" aria-label="Breadcrumb">
            <NuxtLink to="/">Home</NuxtLink><span>/</span
            ><NuxtLink to="/about-us">About Us</NuxtLink><span>/</span
            ><span aria-current="page">Mission &amp; Vision</span>
          </nav>

          <div class="mv-hero-grid">
            <div>
              <span class="svp-eyebrow"><i></i>Mission &amp; Vision</span>
              <h1 id="mv-h1" class="svp-h1">
                Our Mission <span>and Vision</span>
              </h1>
              <p v-if="hero.intro" class="svp-sub mv-sub">{{ hero.intro }}</p>
              <p v-else class="svp-sub mv-sub">
                Since 2014, <NuxtLink to="/">{{ brand }}</NuxtLink> has guided
                Bangladeshi students and professionals to study and build
                careers abroad. Our mission and vision explain why we do this
                work, where we are going, and the standards every counsellor
                follows, from the first conversation to the day a student
                flies.
              </p>

              <div class="mv-actions">
                <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now">
                  Get Free Assessment <span aria-hidden="true">&rarr;</span>
                </NuxtLink>
                <a class="svp-btn svp-btn-ghost" href="#mv-commit-h"
                  >Our Commitments</a
                >
              </div>

              <div class="mv-byline">
                <span class="mv-av" aria-hidden="true"
                  >{{ founder.initials }}<img
                    v-if="founder.photo && !broken.byline"
                    :src="founder.photo"
                    alt=""
                    data-key="byline"
                    loading="lazy"
                    @error="broken.byline = true"
                /></span>
                <div>
                  Approved by
                  <b
                    ><NuxtLink :to="FOUNDER_PATH">{{ founder.name }}</NuxtLink></b
                  >, {{ founder.role }}<br />Last updated:
                  <time :datetime="modifiedIso">{{ modifiedLabel }}</time>
                </div>
              </div>
            </div>

            <figure class="mv-fig mv-hero-fig">
              <img
                v-if="!broken.hero"
                :src="heroSrc"
                :alt="heroAlt"
                data-key="hero"
                width="1200"
                height="960"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                @error="broken.hero = true"
              />
              <figcaption>
                <b>{{ brand }}</b>
                <small>{{ hero.caption }}</small>
              </figcaption>
            </figure>
          </div>

          <div class="mv-stats" :style="{ '--n': stats.length }">
            <div v-for="s in stats" :key="s.label" class="mv-stat">
              <b>{{ s.value }}<span v-if="s.suffix">{{ s.suffix }}</span></b>
              <small>{{ s.label }}</small>
            </div>
          </div>
          <p v-if="statsNote" class="mv-foot">{{ statsNote }}</p>
        </div>
      </section>

      <!-- ================= STATEMENTS (mission + vision from API) ================= -->
      <section class="svp-section" aria-labelledby="mv-st-h">
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Why we exist</span>
          <h2 id="mv-st-h" class="svp-h2">
            The Sunrise Mission <span>and Vision</span>
          </h2>
          <p class="svp-lead">
            Two short statements guide every decision we make, from which
            countries we cover to how we train our counsellors.
          </p>

          <div class="mv-statement">
            <article
              v-for="st in statements"
              :key="st.key"
              class="mv-big mv-reveal"
              :class="st.cls"
              :aria-labelledby="`mv-${st.key}-h`"
            >
              <small>{{ st.kicker }}</small>
              <h3 :id="`mv-${st.key}-h`">{{ st.heading }}</h3>
              <div class="mv-big-text" v-html="st.text"></div>
            </article>
          </div>

          <div class="mv-pledge mv-reveal">
            <i aria-hidden="true">&ldquo;</i>
            <div>
              <p>{{ pledge.text }}</p>
              <small v-if="pledge.caption">{{ pledge.caption }}</small>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= COMMITMENTS ================= -->
      <section class="svp-section svp-services" aria-labelledby="mv-commit-h">
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Our commitments</span>
          <h2 id="mv-commit-h" class="svp-h2 mv-anchor">
            Eight Commitments <span>Behind Our Mission</span>
          </h2>
          <p class="svp-lead">
            Our mission is more than a statement. These eight commitments
            describe how we treat students, families and each other.
          </p>

          <div class="mv-commit">
            <div v-for="(c, i) in commitments" :key="`${i}-${c.title}`" class="mv-card mv-reveal">
              <span class="mv-ci">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path v-for="d in c.paths" :key="d" :d="d" />
                </svg>
              </span>
              <h3>{{ c.title }}</h3>
              <p>{{ c.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= IN PRACTICE ================= -->
      <section class="svp-section" aria-labelledby="mv-pr-h">
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Mission in practice</span>
          <h2 id="mv-pr-h" class="svp-h2">
            What Our Mission Means <span>for Students</span>
          </h2>
          <p class="svp-lead mv-lead">
            Here is how each part of our mission turns into something you can
            see and check when you work with Sunrise. See the full range of
            <NuxtLink to="/services"
              >study abroad services for Bangladeshi students</NuxtLink
            >.
          </p>

          <div class="mv-table-wrap mv-reveal">
            <table class="mv-table">
              <thead>
                <tr>
                  <th scope="col">Our mission says</th>
                  <th scope="col">What you experience</th>
                  <th scope="col">Learn more</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in practice" :key="r.says">
                  <td>{{ r.says }}</td>
                  <td>{{ r.exp }}</td>
                  <td>
                    <NuxtLink :to="r.to"
                      >{{ r.label }} <span aria-hidden="true">&rarr;</span></NuxtLink
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ================= FOUNDER QUOTE ================= -->
      <section class="svp-section svp-services" aria-labelledby="mv-q-h">
        <div class="svp-container">
          <h2 id="mv-q-h" class="svp-h2">
            A Word From <span>Our Founder</span>
          </h2>
          <div class="mv-quote mv-reveal">
            <div class="mv-photo">
              {{ founder.initials }}<img
                v-if="founder.photo && !broken.quote"
                :src="founder.photo"
                :alt="`${founder.name}, ${founder.role} of ${brand}`"
                data-key="quote"
                width="400"
                height="400"
                loading="lazy"
                @error="broken.quote = true"
              />
            </div>
            <blockquote>
              <p>
                We prioritise quality over quantity, ensuring that we never take
                on more assignments than we can handle. This guarantees that
                each client receives the full attention and tailored service
                they deserve.
              </p>
              <cite
                >{{ founder.name }}<small>{{ founder.role }}, {{ brand }}</small></cite
              >
              <p class="mv-quote-more">
                Read the full
                <NuxtLink to="/message-from-ceo"
                  >message from {{ founder.name }}</NuxtLink
                >.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <!-- ================= LIFE AT SUNRISE ================= -->
      <section v-if="galleryShown.length" class="svp-section" aria-labelledby="mv-gal-h">
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Life at Sunrise</span>
          <h2 id="mv-gal-h" class="svp-h2">
            Where Our Mission <span>Comes to Life</span>
          </h2>
          <p class="svp-lead">
            Our mission is lived every day in our offices in Banani and Sylhet,
            in counselling rooms, seminars and team meetings. Visit us any day
            from Saturday to Thursday, 10 am to 6 pm.
          </p>

          <div class="mv-gal" :class="galMode">
            <figure
              v-for="(g, i) in galleryShown"
              :key="g.key"
              class="mv-fig"
              :class="[g.tone, { wide: galMode === 'many' && i === 0 }]"
            >
              <img
                :src="g.src"
                :alt="g.alt"
                :data-key="g.key"
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                @error="broken[g.key] = true"
              />
              <figcaption v-if="g.title || g.sub">
                <b>{{ g.title }}</b>
                <small>{{ g.sub }}</small>
              </figcaption>
            </figure>
          </div>

          <p class="mv-note">
            Office addresses, maps and directions are on our
            <NuxtLink to="/contact-us">contact {{ brand }}</NuxtLink> page. Meet
            everyone on the <NuxtLink to="/staff">Sunrise counsellors</NuxtLink>
            page.
          </p>
        </div>
      </section>

      <!-- ================= SUCCESS ================= -->
      <section v-if="storiesShown.length" class="svp-section svp-services" aria-labelledby="mv-ss-h">
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Proof of our mission</span>
          <h2 id="mv-ss-h" class="svp-h2">
            Students Who <span>Made It Abroad</span>
          </h2>
          <p class="svp-lead">
            The clearest measure of our mission is the students who reached
            their universities. Their photos and stories are shared with their
            permission.
          </p>

          <div class="mv-stories">
            <figure
              v-for="s in storiesShown"
              :key="s.key"
              class="mv-fig"
              :class="s.tone"
            >
              <img
                :src="s.src"
                :alt="s.alt"
                :data-key="s.key"
                width="900"
                height="1200"
                loading="lazy"
                decoding="async"
                @error="broken[s.key] = true"
              />
              <figcaption v-if="s.title || s.sub">
                <b>{{ s.title }}</b>
                <small>{{ s.sub }}</small>
              </figcaption>
            </figure>
          </div>

          <div class="mv-center-cta">
            <NuxtLink class="svp-btn svp-btn-ghost" to="/success-story"
              >Read student success stories
              <span aria-hidden="true">&rarr;</span></NuxtLink
            >
          </div>
        </div>
      </section>

      <!-- ================= EXPLORE ================= -->
      <section class="svp-section" aria-labelledby="mv-ex-h">
        <div class="svp-container">
          <span class="svp-eyebrow"><i></i>Learn more about us</span>
          <h2 id="mv-ex-h" class="svp-h2">More About <span>Sunrise</span></h2>

          <div class="mv-explore">
            <div v-for="e in explore" :key="e.title" class="mv-card mv-reveal">
              <span class="mv-ci">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path v-for="d in e.paths" :key="d" :d="d" />
                </svg>
              </span>
              <h3>{{ e.title }}</h3>
              <p>{{ e.text }}</p>
              <NuxtLink class="mv-link" :to="e.to"
                >{{ e.link }} <span aria-hidden="true">&rarr;</span></NuxtLink
              >
            </div>
          </div>
        </div>
      </section>

      <!-- ================= FAQ ================= -->
      <section class="svp-section mv-faq" aria-labelledby="mv-faq-h">
        <div class="svp-container">
          <div class="mv-center">
            <span class="svp-eyebrow"><i></i>FAQ</span>
            <h2 id="mv-faq-h" class="svp-h2">
              Mission and Vision: <span>Common Questions</span>
            </h2>
          </div>
          <div class="mv-faq-list">
            <details v-for="(f, i) in faqs" :key="f.q" :open="i === 0">
              <summary>{{ f.q }}</summary>
              <div class="mv-faq-a" v-html="f.a"></div>
            </details>
          </div>
        </div>
      </section>

      <!-- ================= CTA ================= -->
      <section class="svp-cta" aria-labelledby="mv-cta-h">
        <div class="svp-container">
          <h2 id="mv-cta-h">Let Our Mission Work for You</h2>
          <p>
            Start with a free assessment. A Sunrise counsellor will review your
            profile and build an honest plan for your study abroad journey.
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
  </main>
</template>

<script setup>
const config = useRuntimeConfig();
const siteUrl =
  (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";
const brand = "Sunrise Education Consultants";
const slug = "mission-vision";
const pageUrl = siteUrl + slug;

/* ---------- Constants (edit here) ---------- */
const API_PATH = "/mission-vision"; // Laravel route (routes/api.php)
const CEO_API_PATH = "/message-from-ceo"; // Laravel route for the chairman message
const FAQ_GROUP = "missionvission"; // must match the FAQ "Group" value in the admin panel
const FOUNDER_PATH = "/staff/anisuzzaman-kiron";
const FOUNDER_NAME_FALLBACK = "Anisuzzaman Kiron";
const FOUNDER_PHOTO_FALLBACK = siteUrl + "upload/team/1873934979029250.jpeg";
// Default photos, used only when the admin has not uploaded any.
// They are shown only if the file really loads (see probe() below).
const uploadUrl = (p) => siteUrl + "upload/mission-vision/" + p;

/* ---------- Data (mission and vision come from the API) ---------- */
const { data } = await useApi(API_PATH, {
  key: "mission-vision",
  transform: (res) => res.data,
});
const page = computed(() => data.value || null);

const list = (v) => (Array.isArray(v) ? v : []);
const initials = (n) =>
  (n || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("") || "?";

/* Founder (shared with the CEO page: same cache key, so no extra request) */
const { data: ceoData } = await useApi(CEO_API_PATH, {
  key: "ceo-message",
  transform: (res) => res.data,
});
const founder = computed(() => {
  const c = ceoData.value;
  const name = c?.name || FOUNDER_NAME_FALLBACK;
  return {
    name,
    initials: initials(name),
    role: c?.designation || "Founder & CEO",
    photo: c?.photo || FOUNDER_PHOTO_FALLBACK,
  };
});


/* "Last updated" comes from the API (Dhaka time, so server and browser agree) */
const DATE_FALLBACK = { iso: "2026-10-17", label: "17 October 2026" };
const modifiedDate = computed(() => {
  const raw = page.value?.updated_at;
  const d = raw ? new Date(raw) : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
});
const modifiedIso = computed(() =>
  modifiedDate.value
    ? modifiedDate.value.toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" })
    : DATE_FALLBACK.iso,
);
const modifiedLabel = computed(() =>
  modifiedDate.value
    ? modifiedDate.value.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      })
    : DATE_FALLBACK.label,
);

/* Hero */
const hero = computed(() => ({
  intro: (page.value?.hero?.intro || "").trim(),
  image: page.value?.hero?.image || "",
  caption: page.value?.hero?.image_caption || "Head office, Banani, Dhaka",
}));
const heroSrc = computed(
  () => hero.value.image || uploadUrl("banani-head-office.webp"),
);
const heroAlt = computed(
  () => page.value?.image_alt || `${brand}, ${hero.value.caption}`,
);

/* Pledge */
const pledge = computed(() => ({
  text:
    page.value?.pledge?.text ||
    "We will always perform our obligations with devotion, integrity, truthfulness and confidence, and work for the best outcome for every student we serve.",
  caption:
    page.value?.pledge?.caption ||
    "The Sunrise pledge, followed by every member of our team",
}));

const STATS_NOTE =
  "*Based on Sunrise's documented case history of student visa applications we prepared. Every visa is decided by the embassy, so no consultancy can guarantee one.";

const stripHtml = (h) =>
  (h || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* Design statements. The API supplies the label (title) and the text;
   the headline is part of the design. Falls back to the design text. */
const MISSION_FALLBACK =
  "<p>To empower students and professionals with honest, personalised guidance for studying and migrating abroad, bridging the educational divide between Bangladesh and developed countries and helping every client achieve their academic and professional goals.</p>";
const VISION_FALLBACK =
  "<p>To be a leading global education and immigration consultancy from Bangladesh, recognised for outstanding service and client success, and to make study and career opportunities abroad accessible to everyone, regardless of geographical boundaries.</p>";

const statements = computed(() => {
  const p = page.value;
  return [
    {
      key: "mission",
      cls: "m",
      kicker: p?.mission?.title || "Our mission",
      heading: p?.mission?.headline || "Guidance that changes futures",
      text: p?.mission?.text || MISSION_FALLBACK,
    },
    {
      key: "vision",
      cls: "v",
      kicker: p?.vision?.title || "Our vision",
      heading: p?.vision?.headline || "Opportunity without borders",
      text: p?.vision?.text || VISION_FALLBACK,
    },
  ];
});

/* ---------- Image state ----------
   broken   : key -> true when an image failed to load (item is hidden)
   verified : key -> true when a default (fallback) photo loaded fine */
const broken = reactive({});
const verified = reactive({});

/* ---------- Static content ---------- */
const statsStatic = [
  { value: "2014", label: "Founded in Dhaka" },
  { value: "2,500", suffix: "+", label: "Students and applicants supported" },
  { value: "80", suffix: "%", label: "Student visa success rate*" },
  { value: "15", label: "Study destinations" },
];

const commitmentsStatic = [
  {
    title: "Academic excellence",
    text: "We help each student reach the strongest university and program their profile allows, not simply the easiest admission to sell.",
    paths: ["m12 3 10 5-10 5L2 8l10-5Z", "M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"],
  },
  {
    title: "No limits on ambition",
    text: "We encourage students to aim high, then build an honest plan to get there, whether that means a scholarship, a better English score or a different intake.",
    paths: [
      "M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0",
      "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
    ],
  },
  {
    title: "Ethics and responsibility",
    text: "We promote ethical practice and social responsibility in our team and our students: genuine documents, honest answers and respect for the rules of every country.",
    paths: [
      "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z",
      "m9 12 2 2 4-4",
    ],
  },
  {
    title: "Celebrating achievement",
    text: "We take pride in our students' success, celebrate it and share it, so the next student can see what is possible.",
    paths: ["M6 9a6 6 0 1 0 12 0a6 6 0 1 0-12 0", "m8.5 14-1.5 7 5-3 5 3-1.5-7"],
  },
  {
    title: "Equal care for everyone",
    text: "Students of every background, religion and region of Bangladesh receive the same care, encouragement and attention.",
    paths: [
      "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0",
      "M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
    ],
  },
  {
    title: "Courage, honesty and fair play",
    text: "We work with courage, honesty, fair play and initiative, as one team, even when the honest answer is not the one a family hoped to hear.",
    paths: ["M4 5h16v11H8l-4 4z", "M9 9h6M9 12h4"],
  },
  {
    title: "Keeping up with change",
    text: "Visa rules, fees and technology change every year. We update our knowledge and our guides before every intake so our advice stays practical.",
    paths: ["M4 13a8 8 0 1 0 16 0a8 8 0 1 0-16 0", "M12 9v4l3 2M9 2h6"],
  },
  {
    title: "A motivated team",
    text: "We build a workplace that motivates our people and recognises achievement at every level, because motivated counsellors give better advice.",
    paths: [
      "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
      "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    ],
  },
];

const practice = [
  {
    says: "Honest, personalised guidance",
    exp: "A free profile assessment before any service fee, and a plan built around your results, budget and goals",
    to: "/apply-now",
    label: "Free assessment",
  },
  {
    says: "Bridging the educational divide",
    exp: "Guides to 15 study destinations, checked against official university, embassy and government sources",
    to: "/study-abroad",
    label: "Study abroad destinations",
  },
  {
    says: "Opportunities for everyone",
    exp: "Scholarship guidance for students who need funding, including government and university awards",
    to: "/scholarships",
    label: "Scholarships for Bangladeshi students",
  },
  {
    says: "Academic excellence",
    exp: "University and program matching, applications and statements of purpose reviewed by experienced counsellors",
    to: "/service-details/university-admission-process",
    label: "University admission support",
  },
  {
    says: "Ethics and integrity",
    exp: "Genuine documents only, written advice and no visa guarantees, because only embassies decide visas",
    to: "/service-details/counselling-and-visa-processing",
    label: "Student visa processing",
  },
  {
    says: "Celebrating achievement",
    exp: "Real student journeys shared with each student's permission",
    to: "/success-story",
    label: "Student visa success stories",
  },
];

/* Default photos: used only when the admin has uploaded none, and shown only if they load */
const galleryStatic = [
  {
    key: "g1",
    tone: "",
    file: "banani-head-office.webp",
    alt: "Reception of the Sunrise Education Consultants head office in Banani, Dhaka",
    title: "Our Banani head office",
    sub: "House 61, Road 08, Banani, Dhaka",
  },
  {
    key: "g2",
    tone: "g2",
    file: "counselling-session.webp",
    alt: "A Sunrise counsellor advising a student and parent in Dhaka",
    title: "One-to-one counselling",
    sub: "Parents are welcome in every session",
  },
  {
    key: "g3",
    tone: "g3",
    file: "sunrise-team.webp",
    alt: "The Sunrise Education Consultants team in Dhaka",
    title: "The Sunrise team",
    sub: "50+ people across two offices",
  },
  {
    key: "g4",
    tone: "",
    file: "sylhet-branch-office.webp",
    alt: "Sunrise Education Consultants branch office on Jail Road, Sylhet",
    title: "Our Sylhet branch",
    sub: "Ananda Tower, Jail Road, Sylhet",
  },
  {
    key: "g5",
    tone: "g2",
    file: "student-seminar.webp",
    alt: "Students attending a Sunrise study abroad seminar",
    title: "Seminars and events",
    sub: "Free guidance sessions for students",
  },
];

const storiesStatic = [
  { n: 1, tone: "", title: "Student visa approved", sub: "Italy" },
  { n: 2, tone: "g2", title: "Admission secured", sub: "Hungary" },
  { n: 3, tone: "g3", title: "Scholarship won", sub: "Finland" },
  { n: 4, tone: "", title: "Off to university", sub: "Malta" },
].map((s) => ({
  ...s,
  key: `s${s.n}`,
  file: `success-story-${s.n}.webp`,
  alt: `Bangladeshi student who studied abroad with ${brand}, story ${s.n}`,
}));

/* ---------- Content from the API, with the design content as fallback ---------- */
/* Icon keys the admin can pick (keep in sync with MissionVision::ICONS in Laravel) */
const ICONS = {
  academic: ["m12 3 10 5-10 5L2 8l10-5Z", "M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"],
  ambition: [
    "M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0",
    "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  ],
  ethics: [
    "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z",
    "m9 12 2 2 4-4",
  ],
  achievement: ["M6 9a6 6 0 1 0 12 0a6 6 0 1 0-12 0", "m8.5 14-1.5 7 5-3 5 3-1.5-7"],
  equal: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0",
    "M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
  ],
  courage: ["M4 5h16v11H8l-4 4z", "M9 9h6M9 12h4"],
  change: ["M4 13a8 8 0 1 0 16 0a8 8 0 1 0-16 0", "M12 9v4l3 2M9 2h6"],
  team: [
    "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
    "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  ],
  home: ["M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"],
  star: ["m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"],
};

const stats = computed(() => {
  const rows = list(page.value?.stats).filter((r) => r?.value && r?.label);
  return rows.length ? rows : statsStatic;
});
const statsNote = computed(() =>
  list(page.value?.stats).some((r) => r?.value && r?.label)
    ? page.value?.stats_note || ""
    : STATS_NOTE,
);

const commitments = computed(() => {
  const rows = list(page.value?.commitments).filter((c) => c?.title);
  return (rows.length ? rows : commitmentsStatic).map((c) => ({
    ...c,
    paths: c.paths || ICONS[c.icon] || ICONS.academic,
  }));
});

const gallery = computed(() => {
  const rows = list(page.value?.gallery).filter((g) => g?.image);
  if (!rows.length)
    return galleryStatic.map((g) => ({ ...g, src: uploadUrl(g.file), fallback: true }));
  const tones = ["", "g2", "g3"];
  return rows.map((g, i) => ({
    key: `g${i}`,
    tone: tones[i % tones.length],
    src: g.image,
    alt: g.alt || g.title || `${brand} photo ${i + 1}`,
    title: g.title,
    sub: g.caption,
    fallback: false,
  }));
});

const stories = computed(() => {
  const rows = list(page.value?.stories).filter((s) => s?.image);
  if (!rows.length)
    return storiesStatic.map((s) => ({ ...s, src: uploadUrl(s.file), fallback: true }));
  const tones = ["", "g2", "g3", ""];
  return rows.map((s, i) => ({
    key: `s${i}`,
    tone: tones[i % tones.length],
    src: s.image,
    alt:
      s.alt || `Bangladeshi student who studied abroad with ${brand}, story ${i + 1}`,
    title: s.title,
    sub: s.country,
    fallback: false,
  }));
});

/* An item is shown when its image did not fail.
   Default photos are shown only after they were checked and loaded. */
const usable = (it) => !broken[it.key] && (!it.fallback || verified[it.key]);
const galleryShown = computed(() => gallery.value.filter(usable));
const storiesShown = computed(() => stories.value.filter(usable));

/* Gallery layout depends on how many photos there are */
const galMode = computed(() => {
  const n = galleryShown.value.length;
  return n === 1 ? "one" : n === 2 ? "two" : "many";
});

const explore = [
  {
    title: "About Us",
    text: "How Sunrise started in Dhaka in 2014, the leaders behind it and the six principles every counsellor follows.",
    to: "/about-us",
    link: `About ${brand}`,
    paths: ["M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"],
  },
  {
    title: "Company Profile",
    text: "The key facts: company type, business lines, destinations, leadership, offices and FACDCAB membership.",
    to: "/company-profile",
    link: "Sunrise company profile",
    paths: [
      "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z",
      "m9 12 2 2 4-4",
    ],
  },
  {
    title: "Careers",
    text: "Share our mission? We regularly hire counsellors, admission officers and support staff in Dhaka and Sylhet.",
    to: "/career",
    link: "Jobs at Sunrise Education Consultants",
    paths: [
      "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
      "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    ],
  },
];

/* Fallback FAQs, shown only when the API returns none */
const faqFallback = [
  {
    q: "What is the mission of Sunrise Education Consultants?",
    a: "The mission of Sunrise Education Consultants is to empower students and professionals with honest, personalised guidance for studying and migrating abroad, bridging the educational divide between Bangladesh and developed countries and helping every client achieve their academic and professional goals.",
  },
  {
    q: "What is the vision of Sunrise Education Consultants?",
    a: "Sunrise Education Consultants aims to be a leading global education and immigration consultancy from Bangladesh, recognised for outstanding service and client success, and to make study and career opportunities abroad accessible to everyone, regardless of geographical boundaries.",
  },
  {
    q: "What values guide Sunrise Education Consultants?",
    a: "Sunrise is guided by academic excellence, honesty, ethics and social responsibility, equal care for students of every background, courage and fair play, teamwork, and keeping its advice up to date with changing rules.",
  },
  {
    q: "How does the Sunrise mission affect students?",
    a: "In practice, every student gets a free profile assessment, a personal plan, advice based on official sources, help only with genuine documents, and honest answers about visa chances. Sunrise never guarantees a visa, because only embassies decide.",
  },
  {
    q: "Who leads Sunrise Education Consultants?",
    a: "Sunrise Education Consultants was founded in Dhaka in 2014 by Anisuzzaman Kiron, the Founder and CEO, with Yeasmin Akther as Co-Founder and COO.",
  },
  {
    q: "Does Sunrise help students from all backgrounds?",
    a: "Yes. Sunrise gives the same care and attention to students of every background, religion and region of Bangladesh, with offices in Dhaka and Sylhet and online counselling for students anywhere in the country.",
  },
];

/* ---------- FAQs from API ---------- */
const { data: faqData } = await useApi("/faqs", {
  key: "faqs-" + FAQ_GROUP,
  query: { group: FAQ_GROUP },
});

/* Used for BOTH the visible FAQ and the FAQPage JSON-LD (they must match) */
const faqs = computed(() => {
  const raw = faqData.value;
  const rows = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
  const fromApi = rows
    .map((f) => ({
      q: String(f.question ?? f.q ?? "").trim(),
      a: String(f.answer ?? f.a ?? "").trim(), // may contain HTML
    }))
    .filter((f) => f.q && f.a);
  return fromApi.length ? fromApi : faqFallback;
});

/* ---------- SEO (API values first, sensible fallbacks) ---------- */
const seoTitle = computed(
  () => page.value?.seo?.meta_title || `Mission and Vision | ${brand}`,
);
const seoDesc = computed(
  () =>
    page.value?.seo?.meta_description ||
    "The mission, vision and commitments of Sunrise Education Consultants, and what they mean for every Bangladeshi student we guide to study abroad since 2014.",
);
const ogImage = computed(
  () =>
    page.value?.hero?.image ||
    page.value?.mission?.image ||
    page.value?.vision?.image ||
    uploadUrl("banani-head-office.webp"),
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

const orgId = siteUrl + "#organization";
const founderId = siteUrl + "staff/anisuzzaman-kiron#person";

const jsonLd = computed(() => {
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: siteUrl + "about-us",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Mission and Vision",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": pageUrl + "#page",
      url: pageUrl,
      name: `${brand} Mission and Vision`,
      description:
        "The mission, vision, commitments and pledge of Sunrise Education Consultants, and what they mean for students who study abroad with Sunrise.",
      inLanguage: "en",
      dateModified: modifiedIso.value,
      mainEntity: { "@id": orgId },
      reviewedBy: { "@id": founderId },
      isPartOf: {
        "@type": "WebSite",
        "@id": siteUrl + "#website",
        url: siteUrl,
        name: brand,
      },
    },
    {
      "@type": "EducationalOrganization",
      "@id": orgId,
      name: brand,
      url: siteUrl,
      foundingDate: "2014",
      founder: {
        "@type": "Person",
        "@id": founderId,
        name: founder.value.name,
        jobTitle: founder.value.role,
        url: siteUrl + "staff/anisuzzaman-kiron",
      },
      description:
        "Sunrise Education Consultants is a study abroad and immigration consultancy in Bangladesh, founded in Dhaka in 2014.",
      slogan:
        "We will always perform our obligations with devotion, integrity, truthfulness and confidence, and work for the best outcome for every student we serve.",
      ethicsPolicy: pageUrl,
      knowsAbout: [
        "Study abroad counselling",
        "University admission",
        "Student visa processing",
        "Scholarships",
        "Immigration consultancy",
      ],
      memberOf: {
        "@type": "Organization",
        name: "Foreign Admission and Career Development Consultants Association of Bangladesh (FACDCAB)",
        url: "https://www.facdcab.org/",
      },
      sameAs: [
        "https://www.facebook.com/SunriseEC",
        "https://www.youtube.com/@SunriseEducationConsultants",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.value.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: stripHtml(f.a) },
      })),
    },
  ];
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
});

useHead(() => ({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{ type: "application/ld+json", innerHTML: jsonLd.value }],
}));

/* ---------- Image checks + scroll reveal (browser only) ---------- */
const root = ref(null);
const js = ref(false);
let io = null;

// Checks that a default photo can really be loaded before it is shown
const probe = (items) => {
  items
    .filter((it) => it.fallback && it.src)
    .forEach((it) => {
      const im = new Image();
      im.onload = () => (verified[it.key] = true);
      im.onerror = () => (broken[it.key] = true);
      im.src = it.src;
    });
};

onMounted(() => {
  // Images that already failed while the page was still server-rendered HTML
  root.value?.querySelectorAll("img[data-key]").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) broken[img.dataset.key] = true;
  });
  probe([...gallery.value, ...stories.value]);

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
    root.value.querySelectorAll(".mv-reveal").forEach((el) => io.observe(el));
  });
});
onBeforeUnmount(() => io && io.disconnect());
</script>

<style scoped>
.mv-center {
  text-align: center;
}
.mv-anchor {
  scroll-margin-top: 110px;
}

/* ---------- Reveal ---------- */
.mv-js .mv-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.mv-js .mv-reveal.is-in {
  opacity: 1;
  transform: none;
}

/* ---------- Hero ---------- */
.mv-hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.95fr;
  gap: 48px;
  align-items: center;
}
.mv-hero-grid > * {
  min-width: 0;
}
.mv-sub a {
  color: var(--sec-navy);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: var(--sec-green);
  text-underline-offset: 3px;
}
.mv-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 26px;
}
.mv-byline {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--sec-slate);
}
.mv-byline b,
.mv-byline b a {
  color: var(--sec-navy);
}
.mv-av {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--sec-green);
  color: #fff;
  font-weight: 800;
}
.mv-av img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mv-stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--n, 4), 1fr);
  margin-top: 46px;
  padding-top: 26px;
  border-top: 1px solid var(--sec-line);
}
.mv-stat {
  padding: 0 20px;
  border-left: 1px solid var(--sec-line);
}
.mv-stat:first-child {
  border-left: 0;
  padding-left: 0;
}
.mv-stat b {
  display: block;
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
  color: var(--sec-navy);
}
.mv-stat b span {
  color: var(--sec-orange);
}
.mv-stat small {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--sec-slate);
}
.mv-foot {
  position: relative;
  margin: 16px 0 0;
  font-size: 12.5px;
  color: var(--sec-slate);
}

/* ---------- Photo figure (hero, gallery, stories) ---------- */
.mv-fig {
  position: relative;
  margin: 0;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #2d6cb4 0%, #16213a 100%);
  box-shadow: 0 16px 34px rgba(22, 33, 58, 0.12);
}
.mv-fig::before {
  content: "";
  position: absolute;
  right: -90px;
  top: -90px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.08) 0 8deg,
    transparent 8deg 22deg
  );
}
.mv-fig.g2 {
  background: linear-gradient(135deg, #2fa84f 0%, #1e6e39 100%);
}
.mv-fig.g3 {
  background: linear-gradient(135deg, #f5a623 0%, #b87400 100%);
}
.mv-fig img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.mv-fig:hover img {
  transform: scale(1.04);
}
.mv-fig figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 44px 18px 16px;
  color: #fff;
  background: linear-gradient(180deg, transparent, rgba(22, 33, 58, 0.82));
}
.mv-fig figcaption b {
  display: block;
  font-size: 15px;
}
.mv-fig figcaption small {
  display: block;
  margin-top: 2px;
  font-size: 12.5px;
  color: #dce3ee;
}
.mv-hero-fig {
  aspect-ratio: 5 / 4;
}

/* ---------- Statements (mission + vision) ---------- */
.mv-statement {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
}
.mv-big {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 34px;
  color: #fff;
}
.mv-big::after {
  content: "";
  position: absolute;
  right: -110px;
  bottom: -110px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.08) 0 8deg,
    transparent 8deg 22deg
  );
}
.mv-big > * {
  position: relative;
  z-index: 1;
}
.mv-big small {
  display: block;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sec-orange);
}
.mv-big h3 {
  margin: 8px 0 14px;
  font-size: 26px;
  color: #fff;
}
.mv-big.v {
  background: linear-gradient(135deg, #16213a, #2d6cb4);
}
.mv-big.m {
  background: linear-gradient(135deg, #1e6e39, #2fa84f);
}
.mv-big.m small {
  color: #ffe2a8;
}
.mv-big-text {
  font-size: 17px;
  line-height: 1.8;
  color: #e6ecf5;
}
.mv-big-text :deep(p) {
  margin: 0 0 14px;
}
.mv-big-text :deep(p:last-child) {
  margin-bottom: 0;
}
.mv-big-text :deep(ul),
.mv-big-text :deep(ol) {
  margin: 0 0 14px;
  padding-left: 22px;
}
.mv-big-text :deep(strong) {
  color: #fff;
}
.mv-big-text :deep(a) {
  color: #ffe2a8;
  font-weight: 700;
}
.mv-big-text :deep([style]) {
  color: inherit !important;
  font-family: inherit !important;
}

/* ---------- Pledge ---------- */
.mv-pledge {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin: 28px 0 0;
  padding: 26px 30px;
  border-radius: 16px;
  background: var(--sec-gold-bg);
  border: 1px solid #f3ddb3;
}
.mv-pledge i {
  flex: none;
  font-style: normal;
  font-size: 46px;
  line-height: 0.8;
  font-weight: 800;
  color: var(--sec-orange);
}
.mv-pledge p {
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  font-weight: 700;
  color: var(--sec-navy);
}
.mv-pledge small {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--sec-slate);
}

/* ---------- Cards (commitments + explore) ---------- */
.mv-commit {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.mv-explore {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.mv-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.mv-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(22, 33, 58, 0.1);
  border-color: rgba(47, 168, 79, 0.4);
}
.mv-ci {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
  border-radius: 14px;
  background: rgba(47, 168, 79, 0.1);
  color: var(--sec-green-dk);
}
.mv-ci svg {
  width: 24px;
  height: 24px;
}
.mv-card h3 {
  margin: 0 0 10px;
  font-size: 19px;
  color: var(--sec-navy);
}
.mv-commit .mv-card h3 {
  font-size: 17px;
}
.mv-card p {
  margin: 0 0 12px;
  font-size: 14.5px;
  line-height: 1.75;
  color: #475467;
}
.mv-link {
  margin-top: auto;
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
  color: var(--sec-navy);
  transition: all 0.2s;
}
.mv-link:hover {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
}

/* ---------- Table ---------- */
.mv-lead a {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.mv-table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid var(--sec-line);
  background: #fff;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
}
.mv-table {
  width: 100%;
  min-width: 620px;
  border-collapse: collapse;
  font-size: 14.5px;
}
.mv-table th {
  padding: 14px 18px;
  background: var(--sec-navy);
  color: #fff;
  text-align: left;
  font-size: 12.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.mv-table td {
  padding: 15px 18px;
  border-top: 1px solid var(--sec-line);
  vertical-align: top;
  line-height: 1.6;
  color: #475467;
}
.mv-table td:first-child {
  font-weight: 800;
  color: var(--sec-navy);
}
.mv-table tr:nth-child(even) td {
  background: var(--sec-offwhite);
}
.mv-table a {
  color: var(--sec-green-dk);
  font-weight: 700;
  white-space: nowrap;
}

/* ---------- Founder quote ---------- */
.mv-quote {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  align-items: center;
  padding: 32px;
  border-radius: 20px;
  background: var(--sec-navy);
  color: #fff;
}
.mv-quote::before {
  content: "";
  position: absolute;
  right: -160px;
  top: -160px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.05) 0 6deg,
    transparent 6deg 18deg
  );
}
.mv-quote > * {
  position: relative;
}
.mv-photo {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--sec-green), #1e6e39);
  font-size: 64px;
  font-weight: 800;
  color: #fff;
}
.mv-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mv-quote blockquote {
  margin: 0;
}
.mv-quote blockquote p {
  margin: 0 0 16px;
  font-size: 18px;
  line-height: 1.75;
  color: #e6ecf5;
}
.mv-quote cite {
  font-style: normal;
  font-weight: 800;
}
.mv-quote cite small {
  display: block;
  margin-top: 2px;
  font-weight: 600;
  color: #9fe0b0;
}
.mv-quote .mv-quote-more {
  margin: 14px 0 0;
  font-size: 14.5px;
}
.mv-quote a {
  color: #9fe0b0;
  font-weight: 700;
}

/* ---------- Gallery + stories ---------- */
.mv-gal {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.mv-gal .wide {
  grid-column: span 2;
  aspect-ratio: auto;
  min-height: 260px;
}
/* one photo: full width. two photos: side by side */
.mv-gal.one {
  grid-template-columns: 1fr;
}
.mv-gal.one .mv-fig {
  aspect-ratio: 21 / 9;
}
.mv-gal.two {
  grid-template-columns: 1fr 1fr;
}
.mv-stories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.mv-stories .mv-fig {
  aspect-ratio: 3 / 4;
}
.mv-center-cta {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.mv-note {
  margin: 18px 0 0;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--sec-slate);
}
.mv-note a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* ---------- FAQ ---------- */
.mv-faq {
  background: var(--sec-gold-bg);
}
.mv-faq-list {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 12px;
}
.mv-faq details {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 14px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}
.mv-faq details[open] {
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.08);
}
.mv-faq summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  font-size: 16px;
  font-weight: 800;
  color: var(--sec-navy);
}
.mv-faq summary::-webkit-details-marker {
  display: none;
}
.mv-faq summary::after {
  content: "+";
  flex: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(47, 168, 79, 0.1);
  color: var(--sec-green-dk);
  font-size: 18px;
  transition: transform 0.3s;
}
.mv-faq details[open] summary::after {
  transform: rotate(45deg);
}
.mv-faq-a {
  padding: 0 24px 22px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--sec-slate);
}
.mv-faq-a :deep(p) {
  margin: 0 0 10px;
}
.mv-faq-a :deep(p:last-child) {
  margin-bottom: 0;
}
.mv-faq-a :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.mv-faq-a :deep([style]) {
  color: inherit !important;
  font-family: inherit !important;
}

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .mv-commit,
  .mv-stories {
    grid-template-columns: repeat(2, 1fr);
  }
  .mv-explore {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .mv-hero-grid,
  .mv-statement,
  .mv-quote {
    grid-template-columns: 1fr;
  }
  .mv-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px 0;
  }
  .mv-stat:nth-child(odd) {
    border-left: 0;
    padding-left: 0;
  }
  .mv-gal {
    grid-template-columns: 1fr 1fr;
  }
  .mv-gal .wide {
    grid-column: span 2;
    aspect-ratio: 16 / 9;
  }
  .mv-gal.one {
    grid-template-columns: 1fr;
  }
  .mv-gal.one .mv-fig {
    aspect-ratio: 16 / 9;
  }
  .mv-quote .mv-photo {
    max-width: 200px;
  }
}
@media (max-width: 640px) {
  .mv-big {
    padding: 26px;
  }
  .mv-big h3 {
    font-size: 22px;
  }
  .mv-big-text {
    font-size: 16px;
  }
  .mv-commit,
  .mv-explore,
  .mv-gal,
  .mv-gal.two {
    grid-template-columns: 1fr;
  }
  .mv-gal .wide {
    grid-column: auto;
    aspect-ratio: 4 / 3;
  }
  .mv-gal.one .mv-fig {
    aspect-ratio: 4 / 3;
  }
  .mv-stories {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .mv-pledge {
    flex-direction: column;
    gap: 6px;
    padding: 22px;
  }
  .mv-pledge p {
    font-size: 16px;
  }
  .mv-quote {
    padding: 24px;
  }
  .mv-actions :deep(.svp-btn) {
    flex: 1;
    justify-content: center;
  }
}
@media (max-width: 420px) {
  .mv-actions {
    flex-direction: column;
  }
  .mv-actions :deep(.svp-btn) {
    width: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .mv-js .mv-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>