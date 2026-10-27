<template>
  <div class="sau">
    <!-- ================= HERO ================= -->
    <section class="sau-hero" aria-labelledby="sau-h1">
      <div class="sau-hero-rays" aria-hidden="true"></div>
      <div class="sau-container">
        <nav class="sau-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">About Us</span>
        </nav>
        <div class="sau-hero-grid">
          <div>
            <span class="sau-eyebrow"><i></i>Since 2014</span>
            <h1 id="sau-h1" class="sau-h1">
              About Sunrise <span>Education Consultants</span>
            </h1>
            <p class="sau-sub">
              Sunrise Education Consultants is a study abroad and immigration
              consultancy in Bangladesh, founded in 2014 by
              {{ founder.name }}. From our head office in Banani, Dhaka, and our
              branch in Sylhet, we help students choose the right country and
              university, apply, win scholarships and get their student visas,
              then prepare them for life abroad. Learn how
              <NuxtLink to="/">Sunrise Education Consultants</NuxtLink> started,
              who leads it and the principles we work by.
            </p>
            <div class="sau-cta-row">
              <NuxtLink class="sau-btn sau-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a class="sau-btn sau-btn-ghost" href="#sau-team"
                >Meet Our Leaders</a
              >
            </div>
            <div class="sau-byline">
              <span class="sau-av" aria-hidden="true"
                >{{ reviewer.initials
                }}<img
                  v-if="reviewer.photo"
                  :src="reviewer.photo"
                  alt=""
                  loading="lazy"
                  data-fb
                  @error="hideImg"
              /></span>
              <div>
                Reviewed by
                <b
                  ><NuxtLink :to="reviewer.to">{{ reviewer.name }}</NuxtLink></b
                >, {{ reviewer.role }}<br />
                Last updated:
                <time :datetime="modifiedIso">{{ modifiedLabel }}</time>
              </div>
            </div>
          </div>

          <aside class="sau-facts" aria-labelledby="sau-glance">
            <h2 id="sau-glance">Sunrise at a glance</h2>
            <dl>
              <div v-for="g in glance" :key="g.label">
                <dt>{{ g.label }}</dt>
                <dd>
                  <NuxtLink v-if="g.to" :to="g.to">{{ g.value }}</NuxtLink
                  ><template v-else>{{ g.value }}</template>
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <div class="sau-stats">
          <div v-for="s in stats" :key="s.small" class="sau-stat">
            <b
              >{{ s.num }}<span>{{ s.suffix }}</span></b
            ><small>{{ s.small }}</small>
          </div>
        </div>
        <p v-if="statsNote" class="sau-foot">{{ statsNote }}</p>
      </div>
    </section>

    <!-- ================= STORY ================= -->
    <section class="sau-section" aria-labelledby="sau-story-h">
      <div class="sau-container">
        <div class="sau-story">
          <div class="sau-prose sau-reveal">
            <span class="sau-eyebrow"><i></i>Our story</span>
            <h2 id="sau-story-h" class="sau-h2">
              From One Office in Dhaka to <span>Students Across the World</span>
            </h2>
            <p v-for="(p, i) in storyParas" :key="i">{{ p }}</p>
          </div>
          <ol class="sau-miles sau-reveal" aria-label="Sunrise milestones">
            <li v-for="m in milestones" :key="m.h">
              <b>{{ m.tag }}</b>
              <h3>{{ m.h }}</h3>
              <p>{{ m.p }}</p>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ================= WHAT WE DO ================= -->
    <section class="sau-section sau-soft" aria-labelledby="sau-do-h">
      <div class="sau-container">
        <div class="sau-center">
          <span class="sau-eyebrow"><i></i>What we do</span>
          <h2 id="sau-do-h" class="sau-h2">
            Two Areas of Expertise, <span>One Trusted Team</span>
          </h2>
          <p class="sau-lead">
            Most of our work is helping students study abroad. Alongside it, we
            advise individuals and families who want to live and work overseas.
          </p>
        </div>
        <div class="sau-pillars">
          <article
            v-for="p in pillars"
            :key="p.title"
            class="sau-pillar sau-reveal"
          >
            <div class="sau-pillar-top" :class="p.cls">
              <span>{{ p.tag }}</span>
              <h3>{{ p.title }}</h3>
            </div>
            <div class="sau-pillar-body">
              <p v-for="(t, i) in p.body" :key="i">{{ t }}</p>
              <ul class="sau-ticks">
                <li v-for="t in p.ticks" :key="t">{{ t }}</li>
              </ul>
              <NuxtLink class="sau-link" :to="p.to">
                {{ p.link }}
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

        <!-- Study destinations from the API -->
        <nav
          v-if="countries.length"
          class="sau-dest"
          aria-label="Study destinations"
        >
          <NuxtLink v-for="c in countries" :key="c.slug" :to="c.to">{{
            c.name
          }}</NuxtLink>
          <NuxtLink to="/study-abroad"
            ><b>All {{ countries.length }} destinations &rarr;</b></NuxtLink
          >
        </nav>
      </div>
    </section>

    <!-- ================= LEADERSHIP ================= -->
    <section id="sau-team" class="sau-section" aria-labelledby="sau-team-h">
      <div class="sau-container">
        <span class="sau-eyebrow"><i></i>Leadership</span>
        <h2 id="sau-team-h" class="sau-h2">
          The People Who <span>Lead Sunrise</span>
        </h2>
        <p class="sau-lead">
          You will always know who is handling your file. These are the leaders
          behind our counselling, admission and visa work.
        </p>

        <div class="sau-founder sau-reveal">
          <div class="sau-photo" aria-hidden="true">
            {{ founder.initials
            }}<img
              v-if="founder.photo"
              :src="founder.photo"
              :alt="`${founder.name}, ${founder.role} of Sunrise Education Consultants`"
              loading="lazy"
              data-fb
              @error="hideImg"
            />
          </div>
          <div>
            <small>{{ founder.role }}</small>
            <h3>{{ founder.name }}</h3>
            <p class="sau-role">{{ founder.exp }}</p>
            <p>{{ founder.bio }}</p>
            <p>
              He reviews the guides on this website and regularly explains the
              study abroad process to students and parents on the Sunrise
              YouTube channel. Read his
              <NuxtLink to="/message-from-ceo"
                >message to students and parents</NuxtLink
              >
              or see his <NuxtLink :to="founder.to">full profile</NuxtLink>.
            </p>
          </div>
        </div>

        <div v-if="leaders.length" class="sau-team">
          <NuxtLink
            v-for="m in leaders"
            :key="m.slug"
            class="sau-member sau-reveal"
            :to="m.to"
          >
            <span class="sau-av" aria-hidden="true"
              >{{ m.init
              }}<img
                v-if="m.photo"
                :src="m.photo"
                alt=""
                loading="lazy"
                data-fb
                @error="hideImg"
            /></span>
            <h3>{{ m.name }}</h3>
            <p>{{ m.role }}</p>
            <small v-if="m.note">{{ m.note }}</small>
          </NuxtLink>
        </div>
        <div class="sau-team-cta">
          <NuxtLink class="sau-btn sau-btn-ghost" to="/staff"
            >Meet our study abroad counsellors &rarr;</NuxtLink
          >
        </div>
      </div>
    </section>

    <!-- ================= VALUES ================= -->
    <section class="sau-section sau-values-sec" aria-labelledby="sau-val-h">
      <div class="sau-container">
        <span class="sau-eyebrow"><i></i>How we work</span>
        <h2 id="sau-val-h" class="sau-h2">
          Six Principles <span>Behind Every File</span>
        </h2>
        <p class="sau-lead">
          These are the standards that every Sunrise counsellor follows, from
          the first conversation to the day you fly.
        </p>
        <div class="sau-values">
          <div v-for="v in values" :key="v.h" class="sau-value sau-reveal">
            <h3>{{ v.h }}</h3>
            <p>{{ v.p }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= EXPLORE ================= -->
    <section class="sau-section sau-soft" aria-labelledby="sau-exp-h">
      <div class="sau-container">
        <div class="sau-center">
          <span class="sau-eyebrow"><i></i>Learn more about us</span>
          <h2 id="sau-exp-h" class="sau-h2">Explore <span>Sunrise</span></h2>
          <p class="sau-lead">
            Want the detail? Each page below covers one part of who we are.
          </p>
        </div>
        <div class="sau-explore">
          <article
            v-for="c in explore"
            :key="c.title"
            class="sau-card sau-reveal"
          >
            <span class="sau-ci" v-html="c.icon"></span>
            <h3>{{ c.title }}</h3>
            <p v-for="(t, i) in c.body" :key="i">{{ t }}</p>
            <NuxtLink class="sau-link" :to="c.to">
              {{ c.link }}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= VIDEO + TRUST ================= -->
    <section class="sau-section" aria-labelledby="sau-trust-h">
      <div class="sau-container">
        <span class="sau-eyebrow"><i></i>Why families trust us</span>
        <h2 id="sau-trust-h" class="sau-h2">
          Hear From Our Founder, <span>Then Check the Facts</span>
        </h2>
        <div class="sau-two">
          <div class="sau-reveal">
            <button
              class="sau-video"
              type="button"
              :aria-label="`Play video: About Sunrise Education Consultants with ${founder.name}`"
              :style="{
                backgroundImage: `url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg')`,
              }"
              @click="playing = true"
            >
              <span class="sau-play" aria-hidden="true"
                ><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg
              ></span>
              <span class="sau-vcap"
                >About Sunrise Education Consultants, with
                {{ founder.name }}</span
              >
              <iframe
                v-if="playing"
                :src="`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`"
                title="About Sunrise Education Consultants"
                allow="
                  accelerometer;
                  autoplay;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                "
                allowfullscreen
              ></iframe>
            </button>
            <p
              style="
                font-size: 14px;
                color: var(--sec-slate);
                margin: 12px 0 0;
                line-height: 1.6;
              "
            >
              More videos for students and parents on our
              <a
                href="https://www.youtube.com/@SunriseEducationConsultants"
                target="_blank"
                rel="noopener"
                style="color: var(--sec-green-dk); font-weight: 700"
                >YouTube channel</a
              >.
            </p>
          </div>
          <div class="sau-trust sau-reveal">
            <h3>Facts you can verify</h3>
            <ul>
              <li>
                <i>1</i
                ><span
                  >Operating since <b>2014</b>, with our head office at House
                  61, Road 08, Block F, Banani, Dhaka-1213.</span
                >
              </li>
              <li>
                <i>2</i
                ><span
                  >A second office at <b>Ananda Tower, Jail Road, Sylhet</b>,
                  open to walk-in students.</span
                >
              </li>
              <li>
                <i>3</i
                ><span
                  >Listed as a member of
                  <a
                    href="https://www.facdcab.org/member-detail/sunrise-education-consultants/"
                    target="_blank"
                    rel="noopener"
                    >FACDCAB</a
                  >, the association of foreign admission consultants in
                  Bangladesh.</span
                >
              </li>
              <li>
                <i>4</i
                ><span
                  >A named team of <b>{{ staffLabel }} people</b> with public
                  staff profiles, so you know who is advising you.</span
                >
              </li>
              <li>
                <i>5</i
                ><span
                  >Official channels only:
                  <a
                    href="https://www.facebook.com/SunriseEC"
                    target="_blank"
                    rel="noopener"
                    >Facebook</a
                  >,
                  <a
                    href="https://www.youtube.com/@SunriseEducationConsultants"
                    target="_blank"
                    rel="noopener"
                    >YouTube</a
                  >
                  and the numbers on our
                  <NuxtLink to="/contact-us">contact page</NuxtLink>.</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FAQ (API group: aboutpage) ================= -->
    <section class="sau-section sau-faq" aria-labelledby="sau-faq-h">
      <div class="sau-container">
        <div class="sau-center">
          <span class="sau-eyebrow"><i></i>FAQ</span>
          <h2 id="sau-faq-h" class="sau-h2">
            About Sunrise: <span>Common Questions</span>
          </h2>
        </div>
        <div class="sau-faq-list">
          <details v-for="(f, i) in faqs" :key="f.id" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <div class="sau-faq-a" @click="onProseClick" v-html="f.a"></div>
          </details>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="sau-cta" aria-labelledby="sau-cta-h">
      <div class="sau-container">
        <h2 id="sau-cta-h">Start Your Journey With Sunrise</h2>
        <p>
          Book a free profile assessment in Banani, Sylhet or online. A
          counsellor will review your results, budget and goals and give you an
          honest plan.
        </p>
        <div class="sau-cta-row" style="justify-content: center; margin: 0">
          <NuxtLink class="sau-btn sau-btn-primary" to="/apply-now"
            >Get Free Assessment
            <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <NuxtLink class="sau-btn sau-btn-ghost" to="/contact-us"
            >Contact Us</NuxtLink
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/* ------------------------------------------------------------ constants (edit here) */
const config = useRuntimeConfig();
const siteUrl =
  (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";
const pageUrl = siteUrl + "about-us";
const orgId = siteUrl + "#organization";
const brand = "Sunrise Education Consultants";
const videoId = "iBou0U7j5Mg";

const COMPANY_API = "/company-profile"; // stats, key facts, reviewer, staff counts
const STAFF_API = "/staff"; // same cache key as the home page
const ABROAD_API = "/study-abroad"; // list of study destinations. Change if your route differs.
const FAQ_GROUP = "aboutpage"; // FAQ "Group" value in the admin panel
const LEADER_LABEL = "leadership"; // staff "label" shown in the leadership grid
const FOUNDER_SLUG = "anisuzzaman-kiron";

// Used only when the admin has not filled "Total staff" / "Total counsellors"
const FALLBACK_STAFF = "50+";
const FALLBACK_COUNSELLORS = "15";
const FOUNDER_FALLBACK = {
  name: "Anisuzzaman Kiron",
  role: "Founder & CEO",
  photo: siteUrl + "upload/team/1873934979029250.jpeg",
};
const FOUNDER_BIO_FALLBACK =
  "Anisuzzaman Kiron founded Sunrise Education Consultants in 2014 and still leads its counselling standards today. His work covers university admissions, application strategy, scholarship guidance, student visa documentation and pre-departure planning.";

/* ------------------------------------------------------------ data (all four requests run together) */
const [
  { data: companyData },
  { data: staffData },
  { data: countryData },
  { data: faqData },
] = await Promise.all([
  useApi(COMPANY_API, {
    key: "about-company-profile",
    transform: (res) => res.data,
  }),
  useApi(STAFF_API, { key: "staff-list", transform: (res) => res.data }),
  useApi(ABROAD_API, {
    key: "study-abroad-list",
    transform: (res) => res.data,
  }),
  useApi("/faqs", {
    key: "faqs-" + FAQ_GROUP,
    query: { group: FAQ_GROUP },
    transform: (res) => res.data,
  }),
]);

/* ------------------------------------------------------------ helpers */
const list = (v) => (Array.isArray(v) ? v : []);

const initials = (n) =>
  (n || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("") || "?";

const stripHtml = (h) =>
  (h || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&(?:rsquo|lsquo|#0?39);/g, "'")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

// Short plain-text excerpt that ends at a sentence when possible
const excerpt = (html, max = 520) => {
  const t = stripHtml(html);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const end = cut.lastIndexOf(". ");
  return end > max * 0.5
    ? cut.slice(0, end + 1)
    : cut.replace(/\s+\S*$/, "") + "…";
};

// "12+ Years" -> "12+ years of experience", "1 Years" -> "1 year of experience"
const expText = (e) => {
  const s = String(e ?? "").trim();
  if (!s) return "";
  const m = s.match(/^(\d+\+?)\s*(years?)?$/i);
  if (!m) return s;
  const one = parseInt(m[1], 10) === 1 && !m[1].includes("+");
  return `${m[1]} ${one ? "year" : "years"} of experience`;
};

// The API may return "staff/slug" or just "slug"
const staffPath = (slug) => {
  const s = String(slug || "").replace(/^\/+/, "");
  if (!s) return "/staff";
  return s.startsWith("staff/") ? "/" + s : "/staff/" + s;
};

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

const namesText = (names) =>
  names.length > 1
    ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1]
    : names[0] || "";

/* ------------------------------------------------------------ company profile */
const company = computed(() => companyData.value || {});

/* Stats: from the API, with the old design numbers as fallback */
const STATS_STATIC = [
  { num: "12", suffix: "+", small: "Years guiding Bangladeshi students" },
  { num: "2,500", suffix: "+", small: "Students and applicants supported" },
  { num: "80", suffix: "%", small: "Student visa success rate*" },
  { num: "15", suffix: "+", small: "Study destinations, 2 offices" },
];
const STATS_NOTE =
  "*Based on Sunrise's documented case history of student visa applications we prepared. Every visa is decided by the embassy, so no consultancy can guarantee one.";

const stats = computed(() => {
  const rows = list(company.value.stats)
    .filter((r) => r?.value && r?.label)
    .map((r) => ({
      num: String(r.value),
      suffix: r.suffix || "",
      small: String(r.label),
    }));
  return rows.length ? rows : STATS_STATIC;
});
// The footnote is shown only for a stat that carries an asterisk
const statsNote = computed(() =>
  stats.value.some((s) => s.small.includes("*")) ? STATS_NOTE : "",
);
const studentsNum = computed(
  () => stats.value.find((s) => /student/i.test(s.small))?.num || "2,500",
);

/* Team size: "Total staff" and "Total counsellors" from the company profile */
const staffLabel = computed(
  () => String(company.value.total_staff ?? "").trim() || FALLBACK_STAFF,
);
const counsellorsLabel = computed(
  () =>
    String(company.value.total_counsellors ?? "").trim() ||
    FALLBACK_COUNSELLORS,
);
const staffPlain = computed(() => staffLabel.value.replace(/\+/g, ""));
const teamGlance = computed(
  () => `${staffLabel.value} people, ${counsellorsLabel.value} counsellors`,
);

/* "Last updated" (Dhaka time, so server and browser agree) */
const DATE_FALLBACK = { iso: "2026-09-29", label: "29 September 2026" };
const modifiedDate = computed(() => {
  const raw = company.value.updated_at;
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

/* ------------------------------------------------------------ staff */
const staffAll = computed(() => list(staffData.value));

const founder = computed(() => {
  const rows = staffAll.value;
  const s =
    rows.find((x) => x.slug === FOUNDER_SLUG) ||
    rows.find((x) => /^founder\b/i.test(x.designation || ""));
  const name = s?.name || FOUNDER_FALLBACK.name;
  const slug = s?.slug || FOUNDER_SLUG;
  return {
    name,
    slug,
    to: staffPath(slug),
    initials: initials(name),
    role: s?.designation || FOUNDER_FALLBACK.role,
    photo: s?.photo || FOUNDER_FALLBACK.photo,
    exp: expText(s?.experience) || "12+ years in international education",
    bio: s?.about ? excerpt(s.about) : FOUNDER_BIO_FALLBACK,
  };
});

// Leadership order: co-founder first, then managers, then the rest
const RANKS = [
  /co-?founder/i,
  /general manager/i,
  /chief advis/i,
  /head counsel/i,
  /destination/i,
  /operation/i,
  /branch/i,
];
const rank = (s) => {
  const i = RANKS.findIndex((r) => r.test(s.designation || ""));
  return i === -1 ? 99 : i;
};

const leaders = computed(() =>
  staffAll.value
    .filter(
      (s) =>
        String(s.label || "")
          .trim()
          .toLowerCase() === LEADER_LABEL && s.slug !== founder.value.slug,
    )
    .sort((a, b) => rank(a) - rank(b))
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      role: s.designation,
      note: expText(s.experience),
      photo: s.photo,
      init: initials(s.name),
      to: staffPath(s.slug),
    })),
);

const cofounder = computed(() => {
  const l = leaders.value.find((x) => /co-?founder/i.test(x.role || ""));
  return { name: l?.name || "Yeasmin Akther", to: l?.to || null };
});

/* Reviewer in the byline */
const reviewer = computed(() => {
  const r = company.value.reviewed_by;
  const name = r?.name || founder.value.name;
  return {
    name,
    role: r?.position || founder.value.role,
    photo: r?.photo || founder.value.photo,
    initials: initials(name),
    to: staffPath(r?.slug || founder.value.slug),
  };
});

/* "Sunrise at a glance": company key facts, with fallbacks */
const factMap = computed(() => {
  const m = {};
  list(company.value.key_facts).forEach((f) => {
    if (f?.label) m[String(f.label).toLowerCase()] = f;
  });
  return m;
});
const fact = (label, fallback, fallbackTo = null) => {
  const f = factMap.value[label.toLowerCase()];
  return { label, value: f?.value || fallback, to: f?.to || fallbackTo };
};
const glance = computed(() => [
  fact("Founded", "2014, Dhaka"),
  fact("Founder & CEO", founder.value.name, founder.value.to),
  fact("Co-Founder & COO", cofounder.value.name, cofounder.value.to),
  fact("Head office", "Banani, Dhaka-1213"),
  fact("Branch", "Jail Road, Sylhet-3100"),
  { label: "Team", value: teamGlance.value, to: null },
  fact("Member of", company.value.member_of || "FACDCAB"),
]);

/* ------------------------------------------------------------ study destinations (API) */
const countries = computed(() =>
  list(countryData.value)
    .map((c) => ({
      slug: c.slug,
      name:
        c.short_name ||
        String(c.name || "")
          .replace(/^Study in\s+/i, "")
          .replace(/\s+from Bangladesh$/i, ""),
    }))
    .filter((c) => c.slug && c.name)
    .map((c) => ({ ...c, to: `/study-abroad/${c.slug}` })),
);
const countryNames = computed(() => countries.value.map((c) => c.name));
const destText = computed(() =>
  countries.value.length ? String(countries.value.length) : "15+",
);

/* ------------------------------------------------------------ static content (uses live numbers where it can) */
const storyParas = computed(() => [
  "Anisuzzaman Kiron started Sunrise Education Consultants in Dhaka in 2014 with a simple idea: Bangladeshi students deserve honest, personal advice about studying abroad. Choosing a country, a university and a visa route is one of the biggest financial decisions a family makes, and it should be based on what is realistic for each student.".replace(
    "Anisuzzaman Kiron",
    founder.value.name,
  ),
  `From the start, Sunrise limited the number of students each counsellor handles, so every file gets real attention. As word spread, the team grew from a small counselling office into a company of more than ${staffPlain.value} people, including counsellors, admission officers, destination specialists and a dedicated support team, working from our head office in Banani.`,
  countries.value.length
    ? `To serve students outside Dhaka, we opened a branch on Jail Road in Sylhet, giving families in the Sylhet division face-to-face counselling close to home. Today we guide students to ${countries.value.length} study destinations: ${namesText(countryNames.value)}.`
    : "To serve students outside Dhaka, we opened a branch on Jail Road in Sylhet, giving families in the Sylhet division face-to-face counselling close to home. Today our destinations range from the UK, the USA, Canada and Australia to affordable and scholarship-rich options in Europe and Asia.",
  `Today Sunrise has supported more than ${studentsNum.value} students and applicants. We also advise skilled professionals and families on immigration, but our core purpose has not changed since 2014: help each student make the right decision and carry it through, one well-prepared file at a time.`,
]);

const milestones = computed(() => [
  {
    tag: "2014",
    h: "Founded in Dhaka",
    p: `${founder.value.name} and ${cofounder.value.name} start Sunrise Education Consultants.`,
  },
  {
    tag: "Growth",
    h: "Head office in Banani",
    p: "Counselling, admission and visa teams work under one roof at House 61, Road 08.",
  },
  {
    tag: "Expansion",
    h: "Sylhet branch opens",
    p: "In-person counselling for students across the Sylhet division.",
  },
  {
    tag: "New services",
    h: "Immigration consultancy",
    p: "Support for skilled workers, families and business migrants moving to Europe and Dubai.",
  },
  {
    tag: "Today",
    h: `${studentsNum.value}+ students and applicants`,
    p: `${destText.value} study destinations and a team of more than ${staffPlain.value} people.`,
  },
]);

const pillars = [
  {
    cls: "g-blue",
    tag: "Main service",
    title: "Study Abroad Consultancy",
    body: [
      "We guide Bangladeshi students through the complete journey: choosing a country and program, preparing applications and documents, finding scholarships, filing the student visa, and preparing for departure and life after arrival.",
      "Every student starts with a free profile assessment. A counsellor reviews your results, English score, budget and goals, then builds a realistic plan. Counselling happens in person in Banani or Sylhet, or online from anywhere in Bangladesh.",
    ],
    ticks: [
      "Counselling & visa processing",
      "University admission",
      "Scholarship guidance",
      "Accommodation support",
      "Pre-departure briefing",
      "Post-study career guidance",
    ],
    to: "/services",
    link: "Study abroad services for Bangladeshi students",
  },
  {
    cls: "g-green",
    tag: "Also available",
    title: "Immigration Consultancy",
    body: [
      "For skilled professionals, families and business migrants, Sunrise provides guidance on relocating to Germany, Italy, Norway, Hungary, Romania and Dubai. We cover residence visa processing, business migration, qualification recognition and resettlement support.",
      "Every piece of immigration advice we give is provided in writing, so you have a clear, documented record of what we recommended and why at every step. Where a rule is set by a government, we point you to the official source.",
    ],
    ticks: [
      "Residence visa processing",
      "Business migration",
      "Qualification recognition",
      "Resettlement support",
    ],
    to: "/contact-us",
    link: "Contact Sunrise about immigration",
  },
];

const values = [
  {
    h: "Honest assessment first",
    p: 'We tell you what is realistic for your results and budget, even when the answer is "not this country" or "not this year".',
  },
  {
    h: "Advice in writing",
    p: "Our guidance and your service terms are given in writing, so you always have a record of what we recommended and what you agreed to.",
  },
  {
    h: "Quality over quantity",
    p: "We limit how many students each counsellor handles, so every application gets full attention instead of a rushed template.",
  },
  {
    h: "Genuine documents only",
    p: "We never prepare fake bank statements, certificates or bookings. They lead to refusals and bans, and they are simply wrong.",
  },
  {
    h: "No visa guarantees",
    p: "Only embassies decide visas. We improve your chances with a complete file and interview practice, and we never promise the impossible.",
  },
  {
    h: "Official sources",
    p: "Rules on fees, scholarships and visas change often, so we check embassy, university and government websites before every intake.",
  },
];

const explore = [
  {
    title: "Company Profile",
    to: "/company-profile",
    link: "Sunrise company profile",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h3"/></svg>',
    body: [
      "The formal overview of Sunrise Education Consultants: when and where we were founded, the type of company we are, our leadership team, the services we provide and the markets we serve.",
      "It is the page to share with universities, partners or anyone who needs the key facts about Sunrise in one place.",
    ],
  },
  {
    title: "Mission & Vision",
    to: "/mission-vision",
    link: "Our mission and vision",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    body: [
      "Why Sunrise exists and where we are going: our mission to help every student reach their full potential through ethical, personalised guidance, and our vision of bridging the gap between education in Bangladesh and the rest of the world.",
      "Read it to understand the values behind the advice you receive.",
    ],
  },
  {
    title: "Message from the CEO",
    to: "/message-from-ceo",
    link: "Anisuzzaman Kiron's message",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    body: [
      "A personal message from Anisuzzaman Kiron to students and parents about how Sunrise works: close relationships throughout each application, practical experience in every team member and a promise never to take on more students than we can serve well.",
      "It explains the thinking behind our quality-over-quantity approach.",
    ],
  },
  {
    title: "Our Team",
    to: "/staff",
    link: "Study abroad counsellors in Dhaka",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20a7 7 0 0 1 14 0M15 14.5a5 5 0 0 1 7 5.5"/></svg>',
    body: [
      "Meet the counsellors, admission officers, destination specialists and support staff in Banani and Sylhet, with each person's role and experience.",
      "Many of our guides are written by these counsellors, so this page shows you exactly who is behind the advice.",
    ],
  },
  {
    title: "Success Stories",
    to: "/success-story",
    link: "Student visa success stories",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/></svg>',
    body: [
      "Real journeys of Bangladeshi students who reached universities abroad with Sunrise, including the country, university and intake, and the obstacles they overcame along the way.",
      "Stories are shared with each student's permission.",
    ],
  },
  {
    title: "Careers",
    to: "/career",
    link: "Jobs at Sunrise Education Consultants",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
    body: [
      "Sunrise is growing, and we regularly look for counsellors, admission officers, customer support staff and marketers in Dhaka and Sylhet.",
      "See current openings and how to apply if you want to help students build their future abroad.",
    ],
  },
];

/* ------------------------------------------------------------ FAQs (API group "aboutpage"; built-in fallback) */
const faqFallback = computed(() => {
  const n = countries.value.length;
  const destAnswer = n
    ? `Sunrise supports students applying to ${n} destinations: ${namesText(countryNames.value)}. Compare them on our <a href="/study-abroad">study abroad destinations</a> page.`
    : 'Sunrise supports students applying to destinations in Europe, Asia, North America and Oceania. Compare them on our <a href="/study-abroad">study abroad destinations</a> page.';

  const rows = [
    [
      "What is Sunrise Education Consultants?",
      `Sunrise Education Consultants is a study abroad and immigration consultancy in Bangladesh, founded in 2014 by ${founder.value.name}. It helps students choose countries and universities, apply, win scholarships and get student visas, and it has offices in Banani, Dhaka and Jail Road, Sylhet.`,
    ],
    [
      "Who founded Sunrise Education Consultants?",
      `Sunrise Education Consultants was founded in 2014 by ${founder.value.name}, who leads the company as ${founder.value.role}. ${cofounder.value.name} is Co-Founder and Chief Operating Officer.`,
    ],
    [
      "Where are Sunrise Education Consultants' offices?",
      "The head office is at House 61 (1st Floor), Block F, Road 08, Banani, Dhaka-1213, and the Sylhet branch is at Ananda Tower (3rd Floor), Jail Road, Sylhet-3100. Students anywhere in Bangladesh can also take counselling online.",
    ],
    ["Which countries does Sunrise send students to?", destAnswer],
    [
      "Is Sunrise Education Consultants a trusted consultancy?",
      `Sunrise has worked with Bangladeshi students since 2014, has supported more than ${studentsNum.value} students and applicants, runs two physical offices with a team of more than ${staffPlain.value} people and is listed as a member of FACDCAB. Its advice is given in writing and it never promises guaranteed visas.`,
    ],
    [
      "Does Sunrise offer immigration services as well as study abroad?",
      "Yes. Alongside study abroad consultancy, Sunrise supports skilled professionals, families and business migrants moving to Germany, Italy, Norway, Hungary, Romania and Dubai, with residence visa processing, business migration, qualification recognition and resettlement support.",
    ],
  ];
  return rows.map(([q, a], i) => ({
    id: `fb${i}`,
    q,
    a: `<p>${a}</p>`,
    text: stripHtml(a),
  }));
});

/* Used for BOTH the visible FAQ and the FAQPage JSON-LD (they must match) */
const faqs = computed(() => {
  const raw = faqData.value;
  const rows = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
      ? raw.data
      : [];
  const fromApi = rows
    .map((f) => {
      const a = fixLinks(String(f.answer ?? f.a ?? "").trim());
      return {
        id: f.id ?? f.question,
        q: String(f.question ?? f.q ?? "").trim(),
        a,
        text: String(f.answer_text ?? "").trim() || stripHtml(a),
      };
    })
    .filter((f) => f.q && f.a);
  return fromApi.length ? fromApi : faqFallback.value;
});

/* ------------------------------------------------------------ interactions */
const playing = ref(false);
const hideImg = (e) => {
  e.target.style.display = "none"; // do not remove Vue-managed nodes
};

// Internal links inside FAQ HTML use the router (no page reload)
const router = useRouter();
const onProseClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const a = e.target.closest("a");
  const href = a?.getAttribute("href");
  if (href && href.startsWith("/") && !href.startsWith("//") && !a.target) {
    e.preventDefault();
    router.push(href);
  }
};

/* ------------------------------------------------------------ SEO */
useSeoMeta({
  title: "About Us | Sunrise Education Consultants, Since 2014",
  description:
    "Sunrise Education Consultants has guided Bangladeshi students to study abroad since 2014. Meet our founder and team, see our offices and learn how we work.",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: "About Sunrise Education Consultants",
  ogDescription: () =>
    `Founded in 2014 by ${founder.value.name}. Offices in Banani, Dhaka and Sylhet. ${studentsNum.value}+ students and applicants supported across ${destText.value} study destinations.`,
  ogUrl: pageUrl,
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

const addr = (street, city, zip) => ({
  "@type": "PostalAddress",
  streetAddress: street,
  addressLocality: city,
  postalCode: zip,
  addressCountry: "BD",
});
const bananiStreet = "House 61 (1st Floor), Block F, Road 08, Banani";
const sylhetStreet = "Ananda Tower (3rd Floor), Jail Road";

const jsonLd = computed(() => {
  const founderId = `${siteUrl}staff/${founder.value.slug}#person`;
  const origin = siteUrl.replace(/\/$/, "");
  const person = (name, jobTitle, to) => ({
    "@type": "Person",
    name,
    jobTitle,
    url: origin + to,
  });

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "About Us", item: pageUrl },
        ],
      },
      {
        "@type": "AboutPage",
        "@id": pageUrl + "#page",
        url: pageUrl,
        name: "About Sunrise Education Consultants",
        description:
          "The story, leadership, offices, services and working principles of Sunrise Education Consultants, a study abroad and immigration consultancy founded in Dhaka, Bangladesh in 2014.",
        inLanguage: "en",
        dateModified: modifiedIso.value,
        mainEntity: { "@id": orgId },
        reviewedBy: { "@id": founderId },
      },
      {
        "@type": "EducationalOrganization",
        "@id": orgId,
        name: brand,
        alternateName: ["Sunrise EC", "Sunrise Education Consultancy"],
        url: siteUrl,
        logo: siteUrl + "upload/logo/sunrise-logo.png",
        description: `Sunrise Education Consultants is a study abroad and immigration consultancy in Bangladesh, founded in 2014 by ${founder.value.name}, with its head office in Banani, Dhaka and a branch in Sylhet.`,
        foundingDate: "2014",
        foundingLocation: { "@type": "Place", name: "Dhaka, Bangladesh" },
        founder: { "@id": founderId },
        employee: [
          { "@id": founderId },
          ...leaders.value.map((l) => person(l.name, l.role, l.to)),
        ],
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: parseInt(staffPlain.value, 10) || 50,
        },
        address: addr(bananiStreet, "Dhaka", "1213"),
        location: [
          {
            "@type": "Place",
            name: "Banani Head Office",
            address: addr(bananiStreet, "Dhaka", "1213"),
          },
          {
            "@type": "Place",
            name: "Sylhet Branch",
            address: addr(sylhetStreet, "Sylhet", "3100"),
          },
        ],
        email: "info@sunrise-bd.net",
        telephone: "+8801911878274",
        areaServed: { "@type": "Country", name: "Bangladesh" },
        memberOf: {
          "@type": "Organization",
          name: "Foreign Admission and Career Development Consultants Association of Bangladesh (FACDCAB)",
          url: "https://www.facdcab.org/",
        },
        knowsAbout: [
          "Study abroad counselling",
          "University admission",
          "Student visa processing",
          "Scholarships",
          "Immigration consultancy",
          ...countryNames.value.map((n) => `Study in ${n}`),
        ],
        sameAs: [
          "https://www.facebook.com/SunriseEC",
          "https://www.youtube.com/@SunriseEducationConsultants",
        ],
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: founder.value.name,
        jobTitle: founder.value.role,
        url: origin + founder.value.to,
        image: founder.value.photo,
        worksFor: { "@id": orgId },
        knowsAbout: [
          "International education",
          "University admissions",
          "Scholarship guidance",
          "Student visa documentation",
          "Pre-departure planning",
        ],
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
  }).replace(/</g, "\\u003c");
});

useHead(() => ({
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{ type: "application/ld+json", innerHTML: jsonLd.value }],
}));

/* ------------------------------------------------------------ browser only */
let io = null;
onMounted(() => {
  // Photos that already failed while the page was still server-rendered HTML
  document.querySelectorAll(".sau img[data-fb]").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) img.style.display = "none";
  });

  // Reveal on scroll
  const els = document.querySelectorAll(".sau .sau-reveal");
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
/* FAQ answers come from the admin editor as HTML */
.sau-faq-a :deep(p) {
  margin: 0;
  padding: 0 24px 12px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--sec-slate);
}
.sau-faq-a :deep(p:last-child) {
  padding-bottom: 22px;
}
.sau-faq-a :deep(ul),
.sau-faq-a :deep(ol) {
  margin: 0;
  padding: 0 24px 12px 46px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--sec-slate);
}
.sau-faq-a :deep(a) {
  color: var(--sec-green-dk);
  font-weight: 700;
}
.sau-faq-a :deep([style]) {
  color: inherit !important;
  font-family: inherit !important;
}
</style>
