<template>
  <main class="scr">
    <!-- ================= HERO ================= -->
    <section class="scr-hero" aria-labelledby="scr-h1">
      <div class="scr-hero-rays" aria-hidden="true"></div>
      <div class="scr-container">
        <nav class="scr-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <NuxtLink to="/about-us">About Us</NuxtLink><span>/</span>
          <span aria-current="page">Careers</span>
        </nav>

        <div class="scr-hero-grid">
          <div>
            <span class="scr-eyebrow"><i></i>We are hiring in Dhaka</span>
            <h1 id="scr-h1" class="scr-h1">
              Careers at Sunrise <span>Build Futures, Including Yours</span>
            </h1>
            <p class="scr-sub">
              Every day, our team helps Bangladeshi students reach universities
              around the world. Join
              <NuxtLink to="/">Sunrise Education Consultants</NuxtLink>, a study
              abroad consultancy founded in 2014 with more than 50 people in
              Dhaka and Sylhet, and do work that changes a family's future.
            </p>
            <div class="scr-cta-row">
              <a class="scr-btn scr-btn-primary" href="#scr-jobs-h"
                >See Open Jobs <span aria-hidden="true">&rarr;</span></a
              >
              <NuxtLink class="scr-btn scr-btn-ghost" to="/staff"
                >Meet the Team</NuxtLink
              >
            </div>
          </div>

          <aside class="scr-board" aria-label="Latest open positions">
            <div class="scr-board-head">
              <b>Hiring now</b>
              <span class="scr-live"
                ><i></i>{{ openJobs.length }}&nbsp;open roles</span
              >
            </div>
            <div v-if="openJobs.length" class="scr-mini">
              <NuxtLink
                v-for="j in openJobs.slice(0, 4)"
                :key="j.id"
                :to="`/career/${j.slug}`"
              >
                <span class="scr-ji" v-html="iconFor(j)"></span>
                <span>
                  <b>{{ j.position }}</b>
                  <small>{{
                    [j.location, vacLabel(j)].filter(Boolean).join(" · ")
                  }}</small>
                </span>
                <em>{{ leftLabel(j, true) }}</em>
              </NuxtLink>
            </div>
            <p v-else class="scr-note" style="margin: 0">
              No open roles right now. Please check back soon.
            </p>
            <div class="scr-board-foot">
              <span
                ><b>{{ totalVacancies }}+</b> vacancies</span
              >
              <a href="#scr-jobs-h">View all jobs &rarr;</a>
            </div>
          </aside>
        </div>

        <div class="scr-stats">
          <div class="scr-stat">
            <b>{{ openJobs.length }}</b
            ><small>Open positions right now</small>
          </div>
          <div class="scr-stat">
            <b>50<span>+</span></b
            ><small>People on the Sunrise team</small>
          </div>
          <div class="scr-stat"><b>2014</b><small>Founded in Dhaka</small></div>
          <div class="scr-stat">
            <b>2,500<span>+</span></b
            ><small>Students our team has supported</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= WHY ================= -->
    <section class="scr-section" aria-labelledby="scr-why-h">
      <div class="scr-container">
        <span class="scr-eyebrow"><i></i>Why join us</span>
        <h2 id="scr-why-h" class="scr-h2">
          Why Work at <span>Sunrise Education Consultants</span>
        </h2>
        <p class="scr-lead">
          We are a growing consultancy with a clear purpose: honest, personal
          guidance for every student. Here is what that means for the people who
          work with us.
        </p>
        <div class="scr-perks">
          <div v-for="p in perks" :key="p.title" class="scr-card scr-reveal">
            <span class="scr-ci" v-html="p.icon"></span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= LADDER ================= -->
    <section class="scr-section scr-soft" aria-labelledby="scr-grow-h">
      <div class="scr-container">
        <span class="scr-eyebrow"><i></i>Grow with us</span>
        <h2 id="scr-grow-h" class="scr-h2">
          A Real Career Path <span>in Counselling</span>
        </h2>
        <p class="scr-lead">
          These are real roles held by people on our team today. Many of our
          counsellors started at the first step and grew with Sunrise.
          <NuxtLink to="/staff">Meet them on our team page</NuxtLink>.
        </p>
        <div class="scr-ladder">
          <div v-for="r in ladder" :key="r.title" class="scr-rung scr-reveal">
            <small>{{ r.step }}</small>
            <h3>{{ r.title }}</h3>
            <p>{{ r.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= JOBS ================= -->
    <section class="scr-section" aria-labelledby="scr-jobs-h">
      <div class="scr-container">
        <span class="scr-eyebrow"><i></i>Open positions</span>
        <h2 id="scr-jobs-h" class="scr-h2">
          Current Jobs at <span>Sunrise</span>
        </h2>
        <p class="scr-lead">
          All roles are full-time and on-site in Dhaka. Filter by team, search
          by title, then read the full details and apply online before the
          deadline.
        </p>

        <p v-if="pending" class="scr-note">Loading jobs…</p>

        <div v-else-if="error" class="scr-empty" style="display: block">
          <p>Could not load jobs right now.</p>
          <button
            type="button"
            class="scr-btn scr-btn-primary"
            @click="refresh()"
          >
            Try again
          </button>
        </div>

        <template v-else>
          <div class="scr-tools">
            <div class="scr-tabs" role="group" aria-label="Filter jobs by team">
              <button
                v-for="t in tabs"
                :key="t.key"
                type="button"
                :aria-pressed="filter === t.key"
                @click="filter = t.key"
              >
                {{ t.label }}<span>{{ counts[t.key] || 0 }}</span>
              </button>
            </div>
            <div class="scr-right">
              <label class="scr-toggle">
                <input v-model="showClosed" type="checkbox" /> Show closed roles
              </label>
              <label class="scr-search">
                <span class="scr-sr">Search jobs</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  v-model="q"
                  type="search"
                  placeholder="Search jobs"
                  autocomplete="off"
                />
              </label>
            </div>
          </div>

          <div class="scr-jobs">
            <article
              v-for="j in shown"
              :key="j.id"
              class="scr-job is-pop"
              :class="{ 'is-closed': !j.is_open }"
            >
              <div class="scr-job-top">
                <span class="scr-ji" v-html="iconFor(j)"></span>
                <span class="scr-dept">{{
                  j.department_label || "General"
                }}</span>
                <span
                  class="scr-status"
                  :class="{ soon: statusOf(j) === 'soon' }"
                  >{{ statusText(j) }}</span
                >
              </div>

              <h3>
                <NuxtLink :to="`/career/${j.slug}`">{{ j.position }}</NuxtLink>
              </h3>
              <p v-if="j.summary">{{ j.summary }}</p>

              <ul class="scr-meta">
                <li v-if="j.job_type">
                  <span class="scr-mi" v-html="ic.briefcase"></span
                  >{{ j.job_type }}
                </li>
                <li v-if="j.location">
                  <span class="scr-mi" v-html="ic.globe"></span>{{ j.location }}
                </li>
                <li v-if="j.experience">
                  <span class="scr-mi" v-html="ic.award"></span
                  >{{ j.experience }}
                </li>
                <li v-if="j.vacancies">
                  <span class="scr-mi" v-html="ic.home"></span>{{ vacLabel(j) }}
                </li>
              </ul>

              <div class="scr-job-foot">
                <span class="scr-dl">
                  <template v-if="j.deadline">
                    Deadline <b>{{ fmt(j.deadline) }}</b>
                  </template>
                  <template v-else>No deadline</template>
                  <em v-if="leftLabel(j)">{{ leftLabel(j) }}</em>
                </span>
                <span class="scr-acts">
                  <NuxtLink class="scr-more" :to="`/career/${j.slug}`"
                    >Details</NuxtLink
                  >
                  <NuxtLink class="scr-apply" :to="`/job-apply/${j.slug}`"
                    >Apply now &rarr;</NuxtLink
                  >
                </span>
              </div>
            </article>
          </div>

          <p v-if="!shown.length" class="scr-empty" style="display: block">
            No open roles match your filter right now. Turn on "Show closed
            roles" to see recent positions, or check back soon.
          </p>
          <p class="scr-sr" aria-live="polite">{{ shown.length }} jobs shown</p>
        </template>
      </div>
    </section>

    <!-- ================= HIRING PROCESS ================= -->
    <section class="scr-section scr-values-sec" aria-labelledby="scr-hp-h">
      <div class="scr-container">
        <span class="scr-eyebrow"><i></i>How we hire</span>
        <h2 id="scr-hp-h" class="scr-h2">
          From Application <span>to Your First Day</span>
        </h2>
        <p class="scr-lead">
          Our hiring process is simple and transparent. Here is what to expect
          after you apply.
        </p>
        <div class="scr-steps">
          <div v-for="s in hiring" :key="s.title" class="scr-step scr-reveal">
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= LIFE ================= -->
    <section class="scr-section" aria-labelledby="scr-life-h">
      <div class="scr-container">
        <span class="scr-eyebrow"><i></i>Life at Sunrise</span>
        <h2 id="scr-life-h" class="scr-h2">
          What It Is Like <span>to Work Here</span>
        </h2>
        <p class="scr-lead">
          Busy intake seasons, proud visa days and a team that supports each
          other. Learn about the values we work by on our
          <NuxtLink to="/mission-vision">Sunrise mission and vision</NuxtLink>
          page.
        </p>
        <div class="scr-gal3">
          <figure
            v-for="(g, i) in gallery"
            :key="g.src"
            class="scr-ph"
            :class="g.cls"
          >
            <!-- <img
              :src="g.src"
              :alt="g.alt"
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              @error="$event.target.style.display = 'none'"
            /> -->
            <figcaption>
              <b>{{ g.title }}</b
              ><small>{{ g.sub }}</small>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="scr-section scr-faq" aria-labelledby="scr-faq-h">
      <div class="scr-container">
        <div class="scr-center">
          <span class="scr-eyebrow"><i></i>FAQ</span>
          <h2 id="scr-faq-h" class="scr-h2">
            Careers at Sunrise: <span>Common Questions</span>
          </h2>
        </div>
        <div class="scr-faq-list">
          <details v-for="(f, i) in faqs" :key="f.id" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <p>
              <span class="scr-faq-a" @click="onProseClick" v-html="f.a"></span>
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="scr-cta" aria-labelledby="scr-cta-h">
      <div class="scr-container">
        <h2 id="scr-cta-h">Ready to Help Students Go Global?</h2>
        <p>
          Find the role that fits you and apply today. We look forward to
          meeting you.
        </p>
        <div class="scr-cta-row" style="justify-content: center; margin: 0">
          <a class="scr-btn scr-btn-primary" href="#scr-jobs-h"
            >See Open Jobs <span aria-hidden="true">&rarr;</span></a
          >
          <NuxtLink class="scr-btn scr-btn-ghost" to="/about-us"
            >About Sunrise</NuxtLink
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const config = useRuntimeConfig();
const siteUrl = (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";
const brand = "Sunrise Education Consultants";
const pageUrl = siteUrl + "career";
const router = useRouter();

/* ---------- Data ---------- */
const { data, pending, error, refresh } = await useApi("/careers", {
  key: "careers-all",
  query: { status: "all" },
  transform: (res) => res.data,
});

// Open jobs first (soonest deadline first), closed jobs after (latest first)
const jobs = computed(() => {
  const list = [...(data.value || [])];
  const time = (j) =>
    j.deadline ? new Date(j.deadline + "T00:00:00Z").getTime() : Infinity;
  const open = list.filter((j) => j.is_open).sort((a, b) => time(a) - time(b));
  const closed = list
    .filter((j) => !j.is_open)
    .sort((a, b) => time(b) - time(a));
  return [...open, ...closed];
});
const openJobs = computed(() => jobs.value.filter((j) => j.is_open));
const totalVacancies = computed(() =>
  openJobs.value.reduce((sum, j) => sum + (Number(j.vacancies) || 0), 0),
);

/* ---------- FAQs: API group "careers", with built-in fallback ---------- */
const { data: faqData } = await useApi("/faqs", {
  key: "faqs-careers",
  query: { group: "careers" },
  transform: (res) => res.data,
});

const defaultFaqs = [
  [
    "How do I apply for a job at Sunrise Education Consultants?",
    "Choose an open position on this page, read the full job details, then select Apply now and submit the online form with your CV before the deadline. Shortlisted candidates are contacted for an interview.",
  ],
  [
    "Where are the Sunrise offices?",
    "Most roles are based at the head office at House 61 (1st Floor), Block F, Road 08, Banani, Dhaka-1213. Some roles are based at our Mirpur-11 office in Dhaka, and the branch office is on Jail Road, Sylhet. Each job post shows its location.",
  ],
  [
    "Can freshers apply for jobs at Sunrise?",
    "Most roles ask for one to five years of relevant experience, but some marketing roles accept freshers. Check the experience requirement on each job post.",
  ],
  [
    "What salary does Sunrise offer?",
    "Salaries are negotiable and based on your skills and experience. The salary range is discussed at the interview stage.",
  ],
  [
    "Are Sunrise jobs remote or office based?",
    "All current positions are full-time and on-site at our offices, because our work involves meeting students and parents in person.",
  ],
  [
    "Can I apply if there is no vacancy for my role?",
    "Yes. Sunrise hires regularly for counselling, admission, marketing and student support roles. Follow this page for new openings, or apply to the closest matching position and explain your interest.",
  ],
].map(([q, a], i) => ({ id: "d" + i, q, a: `<p>${a}</p>`, text: a }));

const faqs = computed(() =>
  faqData.value?.length
    ? faqData.value.map((f) => ({
        id: f.id,
        q: f.question,
        a: f.answer,
        text: f.answer_text,
      }))
    : defaultFaqs,
);

/* ---------- Today (set after mount, so server and browser HTML match) ---------- */
const today = ref(null);

const daysLeft = (j) => {
  if (!j.deadline || !today.value) return null;
  return Math.round((new Date(j.deadline + "T00:00:00") - today.value) / 864e5);
};
const statusOf = (j) => {
  if (!j.is_open) return "closed";
  const n = daysLeft(j);
  return n !== null && n <= 7 ? "soon" : "open";
};
const statusText = (j) =>
  ({ closed: "Closed", soon: "Closing soon", open: "Open" })[statusOf(j)];
const leftLabel = (j, short = false) => {
  if (!j.is_open) return short ? "Closed" : "Applications closed";
  const n = daysLeft(j);
  if (n === null) return short ? "Open" : "";
  if (n === 0) return short ? "Last day" : "Last day today";
  return `${n} day${n === 1 ? "" : "s"} left`;
};

const fmt = (iso) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
const vacLabel = (j) =>
  j.vacancies ? `${String(j.vacancies).padStart(2, "0")} vacancies` : "";

/* ---------- Icons ---------- */
const svg = (inner) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${inner}</svg>`;

const ic = {
  school: svg(
    '<path d="m12 3 10 5-10 5L2 8l10-5Z"/><path d="M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"/>',
  ),
  home: svg(
    '<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"/>',
  ),
  chat: svg('<path d="M4 5h16v11H8l-4 4z"/><path d="M9 9h6M9 12h4"/>'),
  coin: svg(
    '<circle cx="12" cy="12" r="9"/><path d="M15 9a3 3 0 0 0-3-2c-2 0-3 1-3 2.5S10 12 12 12s3 1 3 2.5S14 17 12 17a3 3 0 0 1-3-2M12 5v2M12 17v2"/>',
  ),
  clock: svg('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>'),
  briefcase: svg(
    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  ),
  globe: svg(
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  ),
  award: svg(
    '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
  ),
  shield: svg(
    '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  ),
  flask: svg(
    '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7 15h10"/>',
  ),
  sun: svg(
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  ),
};

const deptIcon = {
  counsel: ic.school,
  support: ic.home,
  marketing: ic.chat,
  finance: ic.coin,
  ops: ic.clock,
};
const iconFor = (j) => deptIcon[j.department] || ic.briefcase;

/* ---------- Static content ---------- */
const perks = [
  {
    icon: ic.award,
    title: "Work that matters",
    text: "Your work helps a student win an admission, a scholarship or a visa. Few jobs let you see the difference you make so clearly.",
  },
  {
    icon: ic.flask,
    title: "Learn international education",
    text: "Visa rules, scholarships and university systems change every year. You learn them from experienced counsellors and official sources, intake after intake.",
  },
  {
    icon: ic.sun,
    title: "Room to grow",
    text: "Our own team shows the path: junior counsellors grow into student, senior and head counsellors, and marketing executives into specialists.",
  },
  {
    icon: ic.chat,
    title: "A team of 50+ people",
    text: "Counsellors, admission officers, marketers, designers and support staff work side by side, so you never handle a difficult case alone.",
  },
  {
    icon: ic.shield,
    title: "Ethics you can be proud of",
    text: "We never use fake documents or promise visas. You will never be asked to mislead a student or a parent.",
  },
  {
    icon: ic.coin,
    title: "Pay that reflects your skills",
    text: "Salaries are negotiable and based on your experience and skills, so the value you bring is recognised from day one.",
  },
];

const ladder = [
  {
    step: "Step 1",
    title: "Junior Counselor",
    text: "Learn the process, support students with documents and shadow experienced counsellors.",
  },
  {
    step: "Step 2",
    title: "Student Counselor",
    text: "Run your own counselling sessions and guide students from assessment to visa file.",
  },
  {
    step: "Step 3",
    title: "Senior Student Counselor",
    text: "Handle complex cases, mentor newer counsellors and specialise in key destinations.",
  },
  {
    step: "Leadership",
    title: "Head Counselor",
    text: "Lead the counselling team, set quality standards and train every new counsellor.",
  },
];

const hiring = [
  {
    title: "Apply online",
    text: "Choose a role, read the details and submit the online form with your CV before the deadline.",
  },
  {
    title: "Shortlisting",
    text: "Our team reviews every application against the experience and skills the role needs.",
  },
  {
    title: "Interview",
    text: "Shortlisted candidates are invited to meet the team at our office in Dhaka.",
  },
  {
    title: "Skills check",
    text: "Some roles include a short practical task, such as a writing, design or counselling exercise.",
  },
  {
    title: "Offer and onboarding",
    text: "Successful candidates receive an offer and an introduction to our processes and standards.",
  },
];

const gallery = [
  {
    cls: "",
    src: siteUrl + "upload/career/team-at-work.webp",
    alt: "Sunrise Education Consultants team at work in the Banani office",
    title: "A day at Sunrise",
    sub: "Counselling, admissions and support under one roof",
  },
  {
    cls: "g2",
    src: siteUrl + "upload/career/team-training.webp",
    alt: "Sunrise counsellors in a training session",
    title: "Learning every intake",
    sub: "Rules change, so we keep learning",
  },
  {
    cls: "g3",
    src: siteUrl + "upload/career/team-celebration.webp",
    alt: "Sunrise team celebrating a student visa success",
    title: "Celebrating wins",
    sub: "Every visa is a team result",
  },
];

/* ---------- Filters ---------- */
const filter = ref("all");
const q = ref("");
const showClosed = ref(false);

const visible = computed(() =>
  jobs.value.filter((j) => showClosed.value || j.is_open),
);

const counts = computed(() => {
  const c = { all: visible.value.length };
  visible.value.forEach((j) => {
    if (j.department) c[j.department] = (c[j.department] || 0) + 1;
  });
  return c;
});

const deptLabels = computed(() => {
  const map = {};
  jobs.value.forEach((j) => {
    if (j.department) map[j.department] = j.department_label || j.department;
  });
  return map;
});
const tabs = computed(() => [
  { key: "all", label: "All roles" },
  ...Object.entries(deptLabels.value).map(([key, label]) => ({ key, label })),
]);

const shown = computed(() => {
  const term = q.value.trim().toLowerCase();
  return visible.value.filter(
    (j) =>
      (filter.value === "all" || j.department === filter.value) &&
      (!term || j.position.toLowerCase().includes(term)),
  );
});

/* ---------- Internal links inside FAQ HTML should not reload the page ---------- */
const onProseClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  const a = e.target.closest("a");
  const href = a?.getAttribute("href");
  if (href && href.startsWith("/") && !href.startsWith("//") && !a.target) {
    e.preventDefault();
    router.push(href);
  }
};

/* ---------- SEO ---------- */
useSeoMeta({
  title: `Careers at ${brand} | Jobs in Dhaka`,
  description:
    "Jobs at Sunrise Education Consultants in Dhaka: student counselor, call center, SEO and content, accounts, HR and operations roles. See openings and apply.",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: `Careers at ${brand}`,
  ogDescription:
    "Help Bangladeshi students build their future abroad. See open jobs in Dhaka and apply online.",
  ogUrl: pageUrl,
  ogImage: siteUrl + "upload/career/team-at-work.webp",
  ogSiteName: brand,
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
                name: "About Us",
                item: siteUrl + "about-us",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Careers",
                item: pageUrl,
              },
            ],
          },
          {
            "@type": "CollectionPage",
            "@id": pageUrl + "#page",
            url: pageUrl,
            name: `Careers at ${brand}`,
            inLanguage: "en",
            about: { "@id": siteUrl + "#organization" },
            mainEntity: { "@id": pageUrl + "#jobs" },
          },
          {
            "@type": "ItemList",
            "@id": pageUrl + "#jobs",
            name: `Open positions at ${brand}`,
            numberOfItems: openJobs.value.length,
            itemListElement: openJobs.value.map((j, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: j.position,
              url: `${siteUrl}career/${j.slug}`,
            })),
          },
          {
            "@type": "FAQPage",
            mainEntity: faqs.value.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.text },
            })),
          },
        ],
      }),
    },
  ],
}));

/* ---------- Client only ---------- */
let io = null;
onMounted(() => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  today.value = d;

  const els = document.querySelectorAll(".scr .scr-reveal");
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("is-in"));
  }
});
onBeforeUnmount(() => io?.disconnect());
</script>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: "Manrope", sans-serif;
  color: var(--sec-navy);
  background: var(--sec-white);
}
.scr a {
  color: inherit;
}
.scr-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}
.scr-section {
  padding: 80px 0;
}
.scr-eyebrow {
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
.scr-eyebrow i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--sec-orange);
}
.scr-h2 {
  font-size: clamp(26px, 3.2vw, 38px);
  line-height: 1.2;
  font-weight: 800;
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}
.scr-h2 span {
  color: var(--sec-green);
}
.scr-lead {
  font-size: 17px;
  line-height: 1.75;
  color: var(--sec-slate);
  margin: 0 0 36px;
  max-width: 780px;
}
.scr-lead a {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.scr-center {
  text-align: center;
}
.scr-center .scr-lead {
  margin-left: auto;
  margin-right: auto;
}
.scr-btn {
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
.scr-btn-primary {
  background: var(--sec-green);
  color: #fff !important;
  box-shadow: 0 10px 24px rgba(47, 168, 79, 0.22);
}
.scr-btn-primary:hover {
  background: var(--sec-green-dk);
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(47, 168, 79, 0.28);
}
.scr-btn-ghost {
  border: 1.5px solid var(--sec-line);
  color: var(--sec-navy);
  background: #fff;
}
.scr-btn-ghost:hover {
  border-color: var(--sec-green);
  color: var(--sec-green-dk);
  transform: translateY(-2px);
}
.scr-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.scr-reveal.is-in {
  opacity: 1;
  transform: none;
}

/* ---------- HERO ---------- */
.scr-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--sec-gold-bg) 0%, #fff 100%);
  padding: 40px 0 70px;
}
.scr-hero-rays {
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
  animation: scr-rotate 60s linear infinite;
}
.scr-crumb {
  position: relative;
  display: flex;
  gap: 8px;
  font-size: 13.5px;
  color: var(--sec-slate);
  margin-bottom: 34px;
}
.scr-crumb a {
  text-decoration: none;
  font-weight: 600;
}
.scr-crumb a:hover {
  color: var(--sec-green-dk);
}
.scr-hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.95fr;
  gap: 48px;
  align-items: center;
}
.scr-h1 {
  font-size: clamp(32px, 4.6vw, 54px);
  line-height: 1.1;
  font-weight: 800;
  margin: 0 0 18px;
  letter-spacing: -0.02em;
}
.scr-h1 span {
  display: block;
  color: var(--sec-green);
}
.scr-hero p.scr-sub {
  font-size: 17.5px;
  line-height: 1.75;
  color: var(--sec-slate);
  margin: 0 0 28px;
  max-width: 640px;
}
.scr-hero p.scr-sub a {
  color: var(--sec-navy);
  font-weight: 700;
  text-decoration-color: var(--sec-green);
  text-underline-offset: 3px;
}
.scr-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 26px;
}
.scr-byline {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13.5px;
  color: var(--sec-slate);
}
.scr-byline b {
  color: var(--sec-navy);
}
.scr-av {
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
.scr-av img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.scr-facts {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.08);
  position: relative;
}
.scr-facts::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22px;
  bottom: 22px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--sec-green);
}
.scr-facts h2 {
  font-size: 17px;
  margin: 0 0 14px;
  font-weight: 800;
}
.scr-facts dl {
  margin: 0;
  display: grid;
  gap: 8px;
}
.scr-facts dl div {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--sec-offwhite);
  font-size: 14px;
}
.scr-facts dt {
  color: var(--sec-slate);
  font-weight: 600;
}
.scr-facts dd {
  margin: 0;
  font-weight: 800;
}
.scr-facts dd a {
  text-decoration: none;
  color: var(--sec-green-dk);
}
.scr-stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 46px;
  border-top: 1px solid var(--sec-line);
  padding-top: 26px;
}
.scr-stat {
  padding: 0 20px;
  border-left: 1px solid var(--sec-line);
}
.scr-stat:first-child {
  border-left: 0;
  padding-left: 0;
}
.scr-stat b {
  display: block;
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
}
.scr-stat b span {
  color: var(--sec-orange);
}
.scr-stat small {
  font-size: 13px;
  color: var(--sec-slate);
  line-height: 1.4;
  display: block;
  margin-top: 4px;
}
.scr-foot {
  font-size: 12.5px;
  color: var(--sec-slate);
  margin: 16px 0 0;
  position: relative;
}

/* ---------- STORY ---------- */
.scr-story {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: start;
}
.scr-prose p {
  font-size: 16px;
  line-height: 1.85;
  color: #475467;
  margin: 0 0 16px;
}
.scr-prose a {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.scr-miles {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}
.scr-miles li {
  position: relative;
  padding: 0 0 22px 40px;
}
.scr-miles li::before {
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
.scr-miles li:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 14px;
  top: 24px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(var(--sec-green), var(--sec-orange));
}
.scr-miles b {
  display: block;
  font-size: 12.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #b87400;
  margin-bottom: 2px;
}
.scr-miles h3 {
  margin: 0 0 4px;
  font-size: 17px;
}
.scr-miles p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--sec-slate);
}

/* ---------- PILLARS ---------- */
.scr-soft {
  background: var(--sec-offwhite);
}
.scr-pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
}
.scr-pillar {
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
.scr-pillar:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 44px rgba(22, 33, 58, 0.11);
}
.scr-pillar-top {
  position: relative;
  overflow: hidden;
  padding: 26px 28px;
  color: #fff;
}
.scr-pillar-top::after {
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
.scr-pillar:hover .scr-pillar-top::after {
  transform: rotate(60deg);
}
.g-blue {
  background: linear-gradient(135deg, #2d6cb4, #16213a);
}
.g-green {
  background: linear-gradient(135deg, #2fa84f, #1e6e39);
}
.scr-pillar-top span {
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
.scr-pillar-top h3 {
  position: relative;
  z-index: 1;
  margin: 14px 0 0;
  font-size: 23px;
}
.scr-pillar-body {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.scr-pillar-body p {
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 1.8;
  color: #475467;
}
.scr-ticks {
  margin: 4px 0 20px;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 18px;
}
.scr-ticks li {
  position: relative;
  padding-left: 24px;
  font-size: 14px;
  line-height: 1.5;
}
.scr-ticks li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(47, 168, 79, 0.14);
}
.scr-ticks li::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 5px;
  width: 4px;
  height: 7px;
  border: solid var(--sec-green-dk);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.scr-link {
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
  transition: all 0.2s;
}
.scr-link svg {
  width: 16px;
  height: 16px;
  flex: none;
  transition: transform 0.2s;
}
.scr-link:hover {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
}
.scr-link:hover svg {
  transform: translateX(4px);
}
.scr-dest {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 34px;
}
.scr-dest a {
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  padding: 9px 16px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--sec-line);
  transition: all 0.2s;
}
.scr-dest a:hover {
  background: var(--sec-green);
  border-color: var(--sec-green);
  color: #fff;
  transform: translateY(-2px);
}

/* ---------- LEADERSHIP ---------- */
.scr-founder {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 36px;
  align-items: center;
  background: var(--sec-navy);
  color: #fff;
  border-radius: 20px;
  padding: 34px;
  position: relative;
  overflow: hidden;
  margin-bottom: 28px;
}
.scr-founder::before {
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
.scr-founder * {
  position: relative;
}
.scr-photo {
  position: relative;
  aspect-ratio: 1/1;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--sec-green), #1e6e39);
  display: grid;
  place-items: center;
  font-size: 64px;
  font-weight: 800;
  color: #fff;
  overflow: hidden;
}
.scr-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.scr-founder small {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sec-orange);
}
.scr-founder h3 {
  margin: 6px 0 4px;
  font-size: 28px;
}
.scr-founder .scr-role {
  margin: 0 0 16px;
  color: #9fe0b0;
  font-weight: 700;
}
.scr-founder p {
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 1.8;
  color: #c9d1e0;
}
.scr-founder a {
  color: #9fe0b0;
  font-weight: 700;
}
.scr-team {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.scr-member {
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
.scr-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.09);
  border-color: rgba(47, 168, 79, 0.4);
}
.scr-member .scr-av {
  width: 84px;
  height: 84px;
  margin: 0 auto 14px;
  font-size: 24px;
  background: linear-gradient(135deg, #2d6cb4, #16213a);
}
.scr-member h3 {
  margin: 0 0 2px;
  font-size: 16px;
}
.scr-member p {
  margin: 0 0 8px;
  font-size: 13.5px;
  color: var(--sec-green-dk);
  font-weight: 700;
}
.scr-member small {
  font-size: 12.5px;
  color: var(--sec-slate);
}
.scr-team-cta {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

/* ---------- VALUES ---------- */
.scr-values-sec {
  background: var(--sec-navy);
  color: #fff;
  position: relative;
  overflow: hidden;
}
.scr-values-sec::before {
  content: "";
  position: absolute;
  left: -200px;
  bottom: -300px;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(47, 168, 79, 0.18), transparent 65%);
}
.scr-values-sec .scr-lead {
  color: #aeb8cc;
}
.scr-values-sec .scr-eyebrow {
  color: #9fe0b0;
  border-color: rgba(159, 224, 176, 0.3);
  background: rgba(47, 168, 79, 0.1);
}
.scr-values {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  counter-reset: v;
}
.scr-value {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 24px;
  transition:
    background 0.3s,
    border-color 0.3s;
}
.scr-value:hover {
  background: rgba(47, 168, 79, 0.1);
  border-color: rgba(47, 168, 79, 0.5);
}
.scr-value::before {
  counter-increment: v;
  content: "0" counter(v);
  display: block;
  font-size: 30px;
  font-weight: 800;
  color: var(--sec-orange);
  margin-bottom: 8px;
}
.scr-value h3 {
  margin: 0 0 8px;
  font-size: 17px;
}
.scr-value p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.7;
  color: #c9d1e0;
}

/* ---------- EXPLORE (child pages) ---------- */
.scr-explore {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.scr-card {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.scr-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(22, 33, 58, 0.1);
  border-color: rgba(47, 168, 79, 0.4);
}
.scr-ci {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(47, 168, 79, 0.1);
  color: var(--sec-green-dk);
  margin-bottom: 16px;
}
.scr-ci svg {
  width: 24px;
  height: 24px;
}
.scr-card h3 {
  margin: 0 0 10px;
  font-size: 19px;
}
.scr-card p {
  margin: 0 0 12px;
  font-size: 14.5px;
  line-height: 1.75;
  color: #475467;
}
.scr-card .scr-link {
  margin-top: auto;
}

/* ---------- VIDEO + TRUST ---------- */
.scr-two {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 28px;
  align-items: start;
}
.scr-video {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 16px;
  overflow: hidden;
  background: #0f1829 center/cover no-repeat;
  cursor: pointer;
  border: 0;
  padding: 0;
  width: 100%;
  display: block;
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.15);
}
.scr-video::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(22, 33, 58, 0.1),
    rgba(22, 33, 58, 0.65)
  );
}
.scr-play {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 78px;
  height: 78px;
  margin: -39px 0 0 -39px;
  border-radius: 50%;
  background: var(--sec-green);
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 10px rgba(47, 168, 79, 0.25);
  transition: transform 0.2s;
}
.scr-video:hover .scr-play {
  transform: scale(1.08);
}
.scr-play svg {
  width: 28px;
  height: 28px;
  fill: #fff;
  margin-left: 4px;
}
.scr-vcap {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 18px;
  z-index: 1;
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  text-align: left;
}
.scr-video iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  z-index: 2;
}
.scr-trust {
  background: var(--sec-offwhite);
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  padding: 28px;
}
.scr-trust h3 {
  margin: 0 0 14px;
  font-size: 19px;
}
.scr-trust ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}
.scr-trust li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--sec-line);
  font-size: 14.5px;
  line-height: 1.55;
}
.scr-trust li i {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: rgba(47, 168, 79, 0.12);
  color: var(--sec-green-dk);
  font-style: normal;
  font-weight: 800;
  font-size: 13px;
}
.scr-trust a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* ---------- FAQ ---------- */
.scr-faq {
  background: var(--sec-gold-bg);
}
.scr-faq-list {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 12px;
}
.scr-faq details {
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 14px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}
.scr-faq details[open] {
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.08);
}
.scr-faq summary {
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
.scr-faq summary::-webkit-details-marker {
  display: none;
}
.scr-faq summary::after {
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
.scr-faq details[open] summary::after {
  transform: rotate(45deg);
}
.scr-faq details p {
  margin: 0;
  padding: 0 24px 22px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--sec-slate);
}
.scr-faq details p a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

/* ---------- CTA ---------- */
.scr-cta {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--sec-green) 0%, #1e6e39 100%);
  padding: 70px 0;
  color: #fff;
  text-align: center;
}
.scr-cta::before {
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
  animation: scr-rotate 80s linear infinite;
}
.scr-cta * {
  position: relative;
}
.scr-cta h2 {
  font-size: clamp(26px, 3.4vw, 40px);
  margin: 0 0 12px;
  font-weight: 800;
}
.scr-cta p {
  margin: 0 auto 28px;
  max-width: 620px;
  font-size: 17px;
  color: #ddf2e2;
  line-height: 1.7;
}
.scr-cta .scr-btn-primary {
  background: #fff;
  color: var(--sec-green-dk) !important;
}
.scr-cta .scr-btn-ghost {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.6);
}

@keyframes scr-rotate {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 1100px) {
  .scr-team {
    grid-template-columns: repeat(3, 1fr);
  }
  .scr-explore,
  .scr-values {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .scr-hero-grid,
  .scr-story,
  .scr-pillars,
  .scr-two,
  .scr-founder {
    grid-template-columns: 1fr;
  }
  .scr-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px 0;
  }
  .scr-stat:nth-child(3) {
    border-left: 0;
    padding-left: 0;
  }
  .scr-founder .scr-photo {
    max-width: 260px;
  }
  .scr-team {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .scr-section {
    padding: 56px 0;
  }
  .scr-container {
    padding: 0 16px;
  }
  .scr-hero {
    padding: 28px 0 50px;
  }
  .scr-explore,
  .scr-values {
    grid-template-columns: 1fr;
  }
  .scr-cta-row .scr-btn {
    flex: 1;
    justify-content: center;
  }
  .scr-ticks {
    grid-template-columns: 1fr;
  }
  .scr-founder {
    padding: 24px;
  }
  .scr-facts dl div {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  .scr-pillar-body,
  .scr-pillar-top {
    padding-left: 22px;
    padding-right: 22px;
  }
}
@media (max-width: 420px) {
  .scr-cta-row {
    flex-direction: column;
  }
  .scr-cta-row .scr-btn {
    width: 100%;
  }
  .scr-team {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .scr-member {
    padding: 16px 10px;
  }
  .scr-member .scr-av {
    width: 64px;
    height: 64px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .scr * {
    animation: none !important;
    transition: none !important;
  }
  .scr-reveal {
    opacity: 1;
    transform: none;
  }
}

/* ---------- MISSION & VISION ---------- */
.scr-ph {
  position: relative;
  margin: 0;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, #2d6cb4 0%, #16213a 100%);
  box-shadow: 0 16px 34px rgba(22, 33, 58, 0.12);
}
.scr-ph::before {
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
.scr-ph.g2 {
  background: linear-gradient(135deg, #2fa84f 0%, #1e6e39 100%);
}
.scr-ph.g3 {
  background: linear-gradient(135deg, #f5a623 0%, #b87400 100%);
}
.scr-ph img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.scr-ph:hover img {
  transform: scale(1.04);
}
.scr-ph figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 44px 18px 16px;
  color: #fff;
  background: linear-gradient(180deg, transparent, rgba(22, 33, 58, 0.82));
}
.scr-ph figcaption b {
  display: block;
  font-size: 15px;
}
.scr-ph figcaption small {
  display: block;
  font-size: 12.5px;
  color: #dce3ee;
  margin-top: 2px;
}
.scr-hero-ph {
  aspect-ratio: 5/4;
}
.scr-statement {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
}
.scr-big {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 34px;
  color: #fff;
}
.scr-big::after {
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
.scr-big * {
  position: relative;
  z-index: 1;
}
.scr-big small {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sec-orange);
}
.scr-big h3 {
  margin: 8px 0 14px;
  font-size: 26px;
}
.scr-big p {
  margin: 0;
  font-size: 17px;
  line-height: 1.8;
  color: #e6ecf5;
}
.scr-big.v {
  background: linear-gradient(135deg, #16213a, #2d6cb4);
}
.scr-big.m {
  background: linear-gradient(135deg, #1e6e39, #2fa84f);
}
.scr-big.m small {
  color: #ffe2a8;
}
.scr-pledge {
  margin: 28px 0 0;
  padding: 26px 30px;
  border-radius: 16px;
  background: var(--sec-gold-bg);
  border: 1px solid #f3ddb3;
  display: flex;
  gap: 18px;
  align-items: flex-start;
}
.scr-pledge i {
  flex: none;
  font-style: normal;
  font-size: 46px;
  line-height: 0.8;
  color: var(--sec-orange);
  font-weight: 800;
}
.scr-pledge p {
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  font-weight: 700;
}
.scr-pledge small {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  color: var(--sec-slate);
  font-weight: 600;
}
.scr-commit {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.scr-commit .scr-card h3 {
  font-size: 17px;
}
.scr-split {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 44px;
  align-items: center;
}
.scr-gal {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.scr-gal .wide {
  grid-column: span 2;
  aspect-ratio: auto;
}
.scr-stories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.scr-stories .scr-ph {
  aspect-ratio: 3/4;
}
.scr-table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid var(--sec-line);
  background: #fff;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.05);
}
.scr-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14.5px;
  min-width: 620px;
}
.scr-table th {
  background: var(--sec-navy);
  color: #fff;
  text-align: left;
  padding: 14px 18px;
  font-size: 12.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.scr-table td {
  padding: 15px 18px;
  border-top: 1px solid var(--sec-line);
  vertical-align: top;
  line-height: 1.6;
  color: #475467;
}
.scr-table td:first-child {
  font-weight: 800;
  color: var(--sec-navy);
}
.scr-table tr:nth-child(even) td {
  background: var(--sec-offwhite);
}
.scr-table a {
  color: var(--sec-green-dk);
  font-weight: 700;
  white-space: nowrap;
}
.scr-quote {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  align-items: center;
  background: var(--sec-navy);
  color: #fff;
  border-radius: 20px;
  padding: 32px;
  position: relative;
  overflow: hidden;
}
.scr-quote::before {
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
.scr-quote * {
  position: relative;
}
.scr-quote blockquote {
  margin: 0;
}
.scr-quote blockquote p {
  margin: 0 0 16px;
  font-size: 18px;
  line-height: 1.75;
  color: #e6ecf5;
}
.scr-quote cite {
  font-style: normal;
  font-weight: 800;
}
.scr-quote cite small {
  display: block;
  font-weight: 600;
  color: #9fe0b0;
  margin-top: 2px;
}
.scr-quote a {
  color: #9fe0b0;
  font-weight: 700;
}
.scr-note {
  font-size: 13.5px;
  color: var(--sec-slate);
  line-height: 1.7;
  margin: 18px 0 0;
}
.scr-note a {
  color: var(--sec-green-dk);
  font-weight: 700;
}
@media (max-width: 1100px) {
  .scr-commit,
  .scr-stories {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .scr-statement,
  .scr-split,
  .scr-quote {
    grid-template-columns: 1fr;
  }
  .scr-gal {
    grid-template-columns: 1fr 1fr;
  }
  .scr-gal .wide {
    grid-column: span 2;
    aspect-ratio: 16/9;
  }
  .scr-quote .scr-photo {
    max-width: 200px;
  }
}
@media (max-width: 640px) {
  .scr-commit {
    grid-template-columns: 1fr;
  }
  .scr-gal {
    grid-template-columns: 1fr;
  }
  .scr-gal .wide {
    grid-column: auto;
    aspect-ratio: 4/3;
  }
  .scr-stories {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .scr-big {
    padding: 26px;
  }
  .scr-big h3 {
    font-size: 22px;
  }
  .scr-pledge {
    padding: 22px;
    flex-direction: column;
    gap: 6px;
  }
  .scr-pledge p {
    font-size: 16px;
  }
  .scr-quote {
    padding: 24px;
  }
}

/* ---------- CAREERS ---------- */
.scr-board {
  position: relative;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 22px;
  padding: 22px;
  box-shadow: 0 26px 54px rgba(22, 33, 58, 0.13);
}
.scr-board::before {
  content: "";
  position: absolute;
  inset: -14px -14px auto auto;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(245, 166, 35, 0.35) 0 8deg,
    transparent 8deg 22deg
  );
  z-index: -1;
  animation: scr-rotate 40s linear infinite;
}
.scr-board-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}
.scr-board-head b {
  font-size: 16px;
}
.scr-live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  color: var(--sec-green-dk);
  background: rgba(47, 168, 79, 0.1);
  padding: 6px 11px;
  border-radius: 999px;
}
.scr-live i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sec-green);
  animation: scr-pulse 1.6s ease-in-out infinite;
}
.scr-mini {
  display: grid;
  gap: 10px;
}
.scr-mini a {
  display: grid;
  grid-template-columns: 44px 1fr auto;
  gap: 12px;
  align-items: center;
  text-decoration: none;
  padding: 12px;
  border-radius: 14px;
  background: var(--sec-offwhite);
  border: 1px solid transparent;
  transition: all 0.25s;
}
.scr-mini a:hover {
  background: #fff;
  border-color: rgba(47, 168, 79, 0.4);
  transform: translateX(4px);
}
.scr-mini .scr-ji {
  width: 44px;
  height: 44px;
}
.scr-mini b {
  display: block;
  font-size: 14.5px;
}
.scr-mini small {
  display: block;
  font-size: 12.5px;
  color: var(--sec-slate);
  margin-top: 2px;
}
.scr-mini em {
  font-style: normal;
  font-size: 12px;
  font-weight: 800;
  color: #b87400;
  background: rgba(245, 166, 35, 0.14);
  padding: 5px 9px;
  border-radius: 999px;
  white-space: nowrap;
}
.scr-board-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--sec-line);
  font-size: 13.5px;
  color: var(--sec-slate);
}
.scr-board-foot a {
  color: var(--sec-green-dk);
  font-weight: 800;
  text-decoration: none;
}
@keyframes scr-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(47, 168, 79, 0.5);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(47, 168, 79, 0);
  }
}
@keyframes scr-rotate {
  to {
    transform: rotate(360deg);
  }
}

.scr-perks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.scr-ladder {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  align-items: end;
  margin-top: 10px;
}
.scr-rung {
  position: relative;
  border-radius: 18px;
  padding: 22px 20px;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.14);
}
.scr-rung::after {
  content: "";
  position: absolute;
  right: -60px;
  top: -60px;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    rgba(255, 255, 255, 0.1) 0 8deg,
    transparent 8deg 22deg
  );
}
.scr-rung * {
  position: relative;
  z-index: 1;
}
.scr-rung small {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.85;
}
.scr-rung h3 {
  margin: 6px 0 8px;
  font-size: 19px;
}
.scr-rung p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
}
.scr-rung:nth-child(1) {
  min-height: 170px;
  background: linear-gradient(135deg, #2d6cb4, #16213a);
}
.scr-rung:nth-child(2) {
  min-height: 210px;
  background: linear-gradient(135deg, #2fa84f, #1e6e39);
}
.scr-rung:nth-child(3) {
  min-height: 250px;
  background: linear-gradient(135deg, #f5a623, #b87400);
}
.scr-rung:nth-child(4) {
  min-height: 290px;
  background: linear-gradient(135deg, #16213a, #0b1222);
}
.scr-rung:nth-child(4) small {
  color: var(--sec-orange);
  opacity: 1;
}

.scr-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 26px;
}
.scr-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.scr-tabs button {
  font-family: inherit;
  cursor: pointer;
  border: 1.5px solid var(--sec-line);
  background: #fff;
  color: var(--sec-navy);
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.2s;
}
.scr-tabs button span {
  display: inline-block;
  margin-left: 6px;
  min-width: 22px;
  padding: 1px 7px;
  border-radius: 999px;
  background: var(--sec-offwhite);
  font-size: 12px;
  color: var(--sec-slate);
}
.scr-tabs button:hover {
  border-color: var(--sec-green);
}
.scr-tabs button[aria-pressed="true"] {
  background: var(--sec-navy);
  border-color: var(--sec-navy);
  color: #fff;
}
.scr-tabs button[aria-pressed="true"] span {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.scr-right {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.scr-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}
.scr-toggle input {
  appearance: none;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: var(--sec-line);
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  margin: 0;
}
.scr-toggle input::after {
  content: "";
  position: absolute;
  left: 3px;
  top: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}
.scr-toggle input:checked {
  background: var(--sec-green);
}
.scr-toggle input:checked::after {
  transform: translateX(18px);
}
.scr-search {
  position: relative;
  width: 240px;
}
.scr-search input {
  width: 100%;
  font-family: inherit;
  font-size: 14.5px;
  padding: 11px 16px 11px 40px;
  border-radius: 999px;
  border: 1.5px solid var(--sec-line);
  outline: none;
  color: var(--sec-navy);
}
.scr-search input:focus {
  border-color: var(--sec-green);
}
.scr-search svg {
  position: absolute;
  left: 14px;
  top: 50%;
  width: 17px;
  height: 17px;
  margin-top: -8.5px;
  color: var(--sec-slate);
}

.scr-jobs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.scr-job {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 18px;
  padding: 22px;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.scr-job::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--sec-green), var(--sec-orange));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}
.scr-job:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 46px rgba(22, 33, 58, 0.12);
  border-color: rgba(47, 168, 79, 0.35);
}
.scr-job:hover::before {
  transform: scaleX(1);
}
.scr-job-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.scr-ji {
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(47, 168, 79, 0.1);
  color: var(--sec-green-dk);
}
.scr-ji svg {
  width: 21px;
  height: 21px;
}
.scr-dept {
  font-size: 12.5px;
  font-weight: 800;
  color: var(--sec-slate);
}
.scr-status {
  margin-left: auto;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(47, 168, 79, 0.12);
  color: var(--sec-green-dk);
}
.scr-status.soon {
  background: rgba(245, 166, 35, 0.16);
  color: #b87400;
}
.scr-job h3 {
  margin: 0 0 8px;
  font-size: 19px;
  line-height: 1.3;
}
.scr-job h3 a {
  text-decoration: none;
}
.scr-job h3 a:hover {
  color: var(--sec-green-dk);
}
.scr-job > p {
  margin: 0 0 14px;
  font-size: 14.3px;
  line-height: 1.7;
  color: #475467;
}
.scr-meta {
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.scr-meta li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--sec-offwhite);
  color: #344054;
}
.scr-mi {
  display: inline-grid;
  color: var(--sec-green-dk);
}
.scr-mi svg {
  width: 14px;
  height: 14px;
}
.scr-job-foot {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 14px;
  border-top: 1px solid var(--sec-line);
}
.scr-dl {
  font-size: 12.5px;
  color: var(--sec-slate);
}
.scr-dl b {
  color: var(--sec-navy);
}
.scr-dl em {
  display: block;
  font-style: normal;
  font-weight: 800;
  color: #b87400;
  margin-top: 2px;
}
.scr-acts {
  display: flex;
  gap: 8px;
}
.scr-more,
.scr-apply {
  font-size: 13.5px;
  font-weight: 800;
  text-decoration: none;
  padding: 9px 14px;
  border-radius: 9px;
  transition: all 0.2s;
}
.scr-more {
  border: 1.5px solid var(--sec-line);
}
.scr-more:hover {
  border-color: var(--sec-navy);
}
.scr-apply {
  background: var(--sec-green);
  color: #fff !important;
}
.scr-apply:hover {
  background: var(--sec-green-dk);
}
.scr-job.is-closed {
  background: var(--sec-offwhite);
}
.scr-job.is-closed .scr-status {
  background: #eef0f3;
  color: var(--sec-slate);
}
.scr-job.is-closed h3,
.scr-job.is-closed > p {
  opacity: 0.7;
}
.scr-job.is-closed .scr-apply {
  background: #d0d5dd;
  pointer-events: none;
}
.scr-job.is-hidden {
  display: none;
}
.scr-job.is-pop {
  animation: scr-pop 0.45s ease both;
}
@keyframes scr-pop {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.scr-empty {
  display: none;
  text-align: center;
  padding: 36px;
  border: 1.5px dashed var(--sec-line);
  border-radius: 16px;
  color: var(--sec-slate);
}
.scr-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.scr-steps {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  counter-reset: s;
}
.scr-step {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 22px 18px;
}
.scr-step::before {
  counter-increment: s;
  content: "0" counter(s);
  display: block;
  font-size: 30px;
  font-weight: 800;
  color: var(--sec-orange);
  margin-bottom: 8px;
}
.scr-step h3 {
  margin: 0 0 6px;
  font-size: 16.5px;
  color: #fff;
}
.scr-step p {
  margin: 0;
  font-size: 13.8px;
  line-height: 1.65;
  color: #c9d1e0;
}
.scr-gal3 {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 18px;
}
.scr-gal3 .scr-ph {
  aspect-ratio: auto;
  min-height: 260px;
}

@media (max-width: 1100px) {
  .scr-jobs {
    grid-template-columns: repeat(2, 1fr);
  }
  .scr-steps {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .scr-hero-grid > * {
    min-width: 0;
  }
  .scr-perks,
  .scr-ladder {
    grid-template-columns: 1fr 1fr;
  }
  .scr-rung {
    min-height: 0 !important;
  }
  .scr-gal3 {
    grid-template-columns: 1fr 1fr;
  }
  .scr-gal3 .scr-ph:first-child {
    grid-column: span 2;
  }
  .scr-right {
    width: 100%;
  }
  .scr-search {
    flex: 1;
  }
}
@media (max-width: 640px) {
  .scr-jobs,
  .scr-perks,
  .scr-ladder,
  .scr-steps {
    grid-template-columns: 1fr;
  }
  .scr-gal3 {
    grid-template-columns: 1fr;
  }
  .scr-gal3 .scr-ph:first-child {
    grid-column: auto;
  }
  .scr-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin: 0 -16px;
    padding: 0 16px 4px;
    scrollbar-width: none;
  }
  .scr-tabs::-webkit-scrollbar {
    display: none;
  }
  .scr-tabs button {
    white-space: nowrap;
  }
  .scr-board {
    padding: 16px;
  }
  .scr-mini a {
    grid-template-columns: 40px 1fr;
  }
  .scr-mini em {
    grid-column: 2;
    justify-self: start;
  }
  .scr-job {
    padding: 18px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .scr-board::before,
  .scr-live i {
    animation: none;
  }
}
</style>
