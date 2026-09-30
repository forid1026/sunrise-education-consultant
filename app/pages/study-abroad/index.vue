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
            <span class="sap-eyebrow"><i></i>15 destinations compared</span>
            <h1 id="sap-h1" class="sap-h1">
              Study Abroad Destinations <span>for Bangladeshi Students</span>
            </h1>
            <p class="sap-sub">
              Compare 15 countries where Bangladeshi students study, from
              low-tuition Italy and Hungary to career-focused Canada and the
              USA. See tuition level, English test rules, intakes, scholarships
              and post-study work for each one, then pick the country that fits
              your budget and profile.
            </p>
            <div class="sap-cta-row">
              <NuxtLink class="sap-btn sap-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a class="sap-btn sap-btn-ghost" href="#sap-compare"
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
                <time :datetime="updatedISO">29 September 2026</time>
              </div>
            </div>
          </div>
          <aside class="sap-answer" aria-labelledby="sap-quick">
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
        <div class="sap-stats">
          <div v-for="s in heroStats" :key="s.small" class="sap-stat">
            <b>{{ s.big }}</b
            ><small>{{ s.small }}</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= DESTINATIONS ================= -->
    <section
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
            :id="d.id"
            :key="d.id"
            class="sap-card sap-reveal"
            :class="{ 'is-open': openCards.has(d.id) }"
            :hidden="filter !== 'all' && filter !== d.region"
          >
            <div class="sap-card-top" :class="d.cls">
              <span class="sap-region">{{ d.regionLabel }}</span>
              <span class="sap-code" aria-hidden="true">{{ d.code }}</span>
              <div>
                <h3>{{ d.name }}</h3>
                <div class="sap-tag">{{ d.tag }}</div>
              </div>
            </div>
            <div class="sap-card-body">
              <ul class="sap-facts">
                <li v-for="f in d.facts" :key="f[0]">
                  {{ f[0] }}<b>{{ f[1] }}</b>
                </li>
              </ul>
              <div class="sap-desc">
                <p v-for="(p, i) in d.body" :key="i">{{ p }}</p>
              </div>
              <button
                class="sap-more"
                type="button"
                :aria-expanded="openCards.has(d.id)"
                @click="toggleCard(d.id)"
              >
                {{ openCards.has(d.id) ? "Show less" : "Read more" }}
              </button>
              <NuxtLink class="sap-card-link" :to="d.to">
                {{ d.link }}
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
    <section id="sap-compare" class="sap-section" aria-labelledby="sap-cmp-h">
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
                <th v-for="h in tableHeads" :key="h" scope="col">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in tableRows" :key="r.name">
                <td>
                  <NuxtLink :to="r.to">{{ r.name }}</NuxtLink>
                </td>
                <td>
                  <span class="lvl" :class="`lvl-${r.lvl}`">{{
                    lvlText[r.lvl]
                  }}</span>
                </td>
                <td>{{ r.living }}</td>
                <td>{{ r.english }}</td>
                <td>{{ r.intakes }}</td>
                <td>{{ r.scholarship }}</td>
                <td>{{ r.work }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ================= BY GOAL ================= -->
    <section class="sap-section sap-dest" aria-labelledby="sap-goal-h">
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
          <div v-for="g in goals" :key="g.title" class="sap-goal sap-reveal">
            <div class="sap-goal-ico" v-html="g.icon"></div>
            <h3>{{ g.title }}</h3>
            <p>{{ g.text }}</p>
            <div class="sap-chips">
              <a
                v-for="c in g.chips"
                :key="c.label"
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
              <span>Last updated: 29 Sep 2026</span
              ><span>Next review: Jan 2027</span>
            </div>
          </div>
          <div class="sap-sources sap-reveal">
            <h3>Official sources we check</h3>
            <ul>
              <li v-for="(row, i) in sources" :key="i">
                <template v-for="(l, j) in row" :key="l.u">
                  <template v-if="j > 0"> and </template>
                  <a :href="l.u" target="_blank" rel="noopener">{{ l.t }}</a>
                </template>
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

<script setup lang="ts">
/* ------------------------------------------------------------ constants */
const siteUrl = "https://sunrise-bd.net/";
const pageUrl = siteUrl + "study-abroad";
const updatedISO = "2026-09-29";
const pageTitle =
  "Study Abroad Destinations for Bangladeshi Students | Sunrise";
const pageDesc =
  "Compare 15 study destinations for Bangladeshi students: tuition level, IELTS or MOI rules, intakes, scholarships and post-study work. Find your best-fit country.";

/* ------------------------------------------------------------ data */
const quickPicks = [
  { label: "Low tuition in Europe", value: "Italy, Hungary" },
  { label: "English-speaking EU country", value: "Malta" },
  { label: "Fully funded scholarships", value: "Hungary, China, Turkey" },
  { label: "Without IELTS (MOI)", value: "Italy, Malta, Cyprus, Malaysia" },
  { label: "Post-study work and careers", value: "Canada, USA, Finland" },
];
const heroStats = [
  { big: "15", small: "Study destinations" },
  { big: "2014", small: "Guiding students since" },
  { big: "2", small: "Offices: Dhaka and Sylhet" },
  { big: "Free", small: "Profile assessment" },
];

interface Dest {
  id: string;
  region: "eu" | "as" | "na" | "oc";
  regionLabel: string;
  cls: string;
  code: string;
  name: string;
  tag: string;
  facts: [string, string][];
  body: string[];
  to: string;
  link: string;
}
const destinations: Dest[] = [
  {
    id: "italy",
    region: "eu",
    regionLabel: "Europe",
    cls: "r-eu",
    code: "IT",
    name: "Italy",
    tag: "Low public tuition and DSU scholarships",
    facts: [
      ["Tuition level", "Low (public)"],
      ["English test", "IELTS or MOI"],
      ["Main intake", "September"],
      ["Key scholarship", "DSU regional"],
    ],
    body: [
      "Italy is one of the most popular European choices for Bangladeshi students because tuition at public universities is linked to family income through the ISEE system rather than a flat international fee. Hundreds of bachelor's and master's programs are taught fully in English at institutions such as Politecnico di Milano, the University of Bologna, Sapienza University of Rome and the University of Padua.",
      "Regional DSU scholarships can cover tuition, housing and a yearly stipend for students who qualify on income and merit. Many universities accept a Medium of Instruction certificate instead of IELTS. Applications run through the university and the Universitaly pre-enrollment portal, followed by a Type D study visa filed at VFS Global in Dhaka for the Italian Embassy.",
      "Best for: students who want an EU degree at a low total cost and are ready to prepare documents carefully, including CIMEA or a Declaration of Value.",
    ],
    to: "/study-abroad/italy",
    link: "Study in Italy from Bangladesh",
  },
  {
    id: "malta",
    region: "eu",
    regionLabel: "Europe",
    cls: "r-eu",
    code: "MT",
    name: "Malta",
    tag: "English-speaking EU island",
    facts: [
      ["Tuition level", "Medium"],
      ["English test", "IELTS or MOI (varies)"],
      ["Main intakes", "October, February"],
      ["Key advantage", "English is official"],
    ],
    body: [
      "Malta is a small EU and Schengen member where English is an official language, so daily life, classes and part-time work all happen in English. That makes adjustment easier for Bangladeshi students than in many other European countries.",
      "Students choose between the University of Malta, the public college MCAST and a group of private higher education institutions offering business, IT, hospitality and health programs. Some institutions accept an MOI certificate in place of IELTS. Tuition is usually higher than Italian public universities but lower than the UK, and the national (D) student visa gives access to the Schengen area.",
      "Best for: students who want an English-speaking EU experience, diploma or bachelor's routes and part-time work in a tourism-driven economy.",
    ],
    to: "/study-in-malta-from-bangladesh",
    link: "Study in Malta from Bangladesh",
  },
  {
    id: "hungary",
    region: "eu",
    regionLabel: "Europe",
    cls: "r-eu",
    code: "HU",
    name: "Hungary",
    tag: "Home of Stipendium Hungaricum",
    facts: [
      ["Tuition level", "Low to medium"],
      ["English test", "IELTS or university test"],
      ["Main intake", "September"],
      ["Key scholarship", "Stipendium Hungaricum"],
    ],
    body: [
      "Hungary is best known to Bangladeshi students for the Stipendium Hungaricum, a government scholarship that covers tuition and provides a monthly stipend and support toward accommodation. Bangladesh is a partner country, so applicants apply online and are also nominated through the Ministry of Education in Dhaka.",
      "Popular universities include the University of Debrecen, the University of Szeged, ELTE and the Budapest University of Technology and Economics, with English-taught programs in engineering, business, medicine and the sciences. Living costs outside Budapest are among the lowest in the EU.",
      "Best for: strong academic profiles aiming for a fully funded European degree, and self-funded students looking for an affordable Schengen option.",
    ],
    to: "/study-in-hungary-from-bangladesh",
    link: "Study in Hungary from Bangladesh",
  },
  {
    id: "finland",
    region: "eu",
    regionLabel: "Europe",
    cls: "r-eu",
    code: "FI",
    name: "Finland",
    tag: "Quality education and work after study",
    facts: [
      ["Tuition level", "Medium to high"],
      ["English test", "IELTS usually"],
      ["Main intake", "August / September"],
      ["Key scholarship", "University waivers"],
    ],
    body: [
      "Finland is known for high-quality, practical education and a clear path from study to work. Non-EU students pay tuition for English-taught degrees, but almost every university offers scholarships or tuition waivers, and some reward early payment.",
      "Students choose between research universities such as the University of Helsinki, Aalto University and Tampere University, and universities of applied sciences with a stronger job focus. Most applications go through the national joint application on Studyinfo.fi, and the student residence permit is applied for online through Enter Finland with the Finnish Immigration Service (Migri). Graduates can apply for a permit to stay and look for work.",
      "Best for: students with a good IELTS score who value long-term career prospects in Europe.",
    ],
    to: "/study-in-finland-from-bangladesh",
    link: "Study in Finland from Bangladesh",
  },
  {
    id: "cyprus",
    region: "eu",
    regionLabel: "Europe",
    cls: "r-eu",
    code: "CY",
    name: "Cyprus",
    tag: "EU degrees with flexible entry",
    facts: [
      ["Tuition level", "Medium"],
      ["English test", "IELTS or MOI (varies)"],
      ["Main intakes", "September, February"],
      ["Key advantage", "EU member state"],
    ],
    body: [
      "The Republic of Cyprus is an EU member with English widely used in universities and daily life. It attracts Bangladeshi students with flexible entry requirements, two intakes a year and programs in business, hospitality, computing and health.",
      "Options include the public University of Cyprus and Cyprus University of Technology, and private universities such as the University of Nicosia and European University Cyprus. Students apply for an entry permit through the Civil Registry and Migration Department. One point needs care: North Cyprus is a separate system outside the EU, so degree recognition and EU access are very different. We always confirm which side a university is on before a student applies.",
      "Best for: students who want an EU study route with simpler entry and are careful about choosing the right institution.",
    ],
    to: "/study-in-cyprus-from-bangladesh",
    link: "Study in Cyprus from Bangladesh",
  },
  {
    id: "norway",
    region: "eu",
    regionLabel: "Europe",
    cls: "r-eu",
    code: "NO",
    name: "Norway",
    tag: "High quality, high living costs",
    facts: [
      ["Tuition level", "High (non-EU)"],
      ["English test", "IELTS required"],
      ["Main intake", "August"],
      ["Key point", "Large funds requirement"],
    ],
    body: [
      "Norway offers excellent universities such as the University of Oslo, NTNU and the University of Bergen, with strong research and a high quality of life. Many older guides still describe Norway as free, but since autumn 2023 public universities charge tuition to students from outside the EU and EEA, including Bangladesh.",
      "The Norwegian Directorate of Immigration (UDI) also requires proof of a substantial amount of funds for living costs before issuing a study permit, and living costs are among the highest in Europe. Part-time work is allowed but rarely covers all expenses.",
      "Best for: well-funded students or those with external scholarships who want a top-quality Nordic education.",
    ],
    to: "/study-in-norway-from-bangladesh",
    link: "Study in Norway from Bangladesh",
  },
  {
    id: "greece",
    region: "eu",
    regionLabel: "Europe",
    cls: "r-eu",
    code: "GR",
    name: "Greece",
    tag: "Growing English-taught master's",
    facts: [
      ["Tuition level", "Low to medium"],
      ["English test", "Varies by program"],
      ["Main intake", "September / October"],
      ["Key advantage", "Schengen, low living cost"],
    ],
    body: [
      "Greece is a newer option for Bangladeshi students. Most English-taught options are master's programs at public universities such as the National and Kapodistrian University of Athens, Aristotle University of Thessaloniki, the University of Macedonia and the Athens University of Economics and Business.",
      "Living costs are lower than in much of Western Europe, and a Greek national (D) visa gives access to the Schengen area. Because English-taught bachelor's programs are still limited, we check each program's language of instruction and entry rules before recommending it.",
      "Best for: graduates looking for an affordable English-taught master's in a Mediterranean EU country.",
    ],
    to: "/study-in-greece-from-bangladesh",
    link: "Study in Greece from Bangladesh",
  },
  {
    id: "malaysia",
    region: "as",
    regionLabel: "Asia",
    cls: "r-as",
    code: "MY",
    name: "Malaysia",
    tag: "Affordable and close to home",
    facts: [
      ["Tuition level", "Low to medium"],
      ["English test", "IELTS or MOI (varies)"],
      ["Main intakes", "Jan, May, September"],
      ["Key advantage", "Foreign branch campuses"],
    ],
    body: [
      "Malaysia is a short flight from Dhaka, has a large Muslim-majority community and offers some of the lowest total study costs among English-taught destinations. Public universities such as Universiti Malaya and private universities such as Taylor's University and Asia Pacific University teach widely in English, and several British and Australian universities run branch campuses there.",
      "Student visas are processed online through Education Malaysia Global Services (EMGS), which issues a Visa Approval Letter before arrival. Multiple intakes a year make timing flexible, and many credits can transfer to universities in the UK or Australia.",
      "Best for: budget-conscious students, HSC graduates and those who want a familiar culture with an international degree.",
    ],
    to: "/study-in-malaysia",
    link: "Study in Malaysia from Bangladesh",
  },
  {
    id: "china",
    region: "as",
    regionLabel: "Asia",
    cls: "r-as",
    code: "CN",
    name: "China",
    tag: "CSC scholarships and MBBS",
    facts: [
      ["Tuition level", "Low"],
      ["English test", "MOI often accepted"],
      ["Main intake", "September"],
      ["Key scholarship", "CSC (Chinese Government)"],
    ],
    body: [
      "China draws Bangladeshi students for two main reasons: the Chinese Government Scholarship (CSC) and English-taught medical degrees. The CSC can be applied for through the Chinese Embassy in Dhaka (Type A) or directly through a university (Type B), and can cover tuition, accommodation and a stipend.",
      "Leading universities include Tsinghua, Peking and Zhejiang University, alongside many provincial universities with lower fees. Students receive an admission notice and a JW202 form, then apply for an X1 study visa. Students planning MBBS should confirm that the university and program meet BMDC requirements for practising in Bangladesh.",
      "Best for: scholarship seekers, medical aspirants and students interested in engineering and technology.",
    ],
    to: "/study-in-china",
    link: "Study in China from Bangladesh",
  },
  {
    id: "turkey",
    region: "as",
    regionLabel: "Asia / Europe",
    cls: "r-as",
    code: "TR",
    name: "Turkey",
    tag: "Türkiye Burslari and low costs",
    facts: [
      ["Tuition level", "Low (public)"],
      ["English test", "MOI or university test"],
      ["Main intakes", "September, February"],
      ["Key scholarship", "Türkiye Burslari"],
    ],
    body: [
      "Turkey sits between Europe and Asia and combines low public tuition with a culture many Bangladeshi students find familiar. The government's Türkiye Burslari scholarship covers tuition, accommodation, a monthly stipend and a Turkish language year.",
      "Well-known universities include Middle East Technical University, Istanbul Technical University, Boğaziçi University and Ankara University, with a fast-growing group of private universities offering English-taught programs. After arrival, students apply for a residence permit (ikamet). Many universities accept an MOI certificate or their own English exam.",
      "Best for: scholarship applicants and self-funded students who want low costs close to Europe.",
    ],
    to: "/study-in-turkey-from-bangladesh",
    link: "Study in Turkey from Bangladesh",
  },
  {
    id: "canada",
    region: "na",
    regionLabel: "North America",
    cls: "r-na",
    code: "CA",
    name: "Canada",
    tag: "Colleges, co-op and PGWP",
    facts: [
      ["Tuition level", "High"],
      ["English test", "IELTS required"],
      ["Main intakes", "Sept, Jan, May"],
      ["Key advantage", "Post-graduation work permit"],
    ],
    body: [
      "Canada remains a top choice for students planning a long-term career abroad. Universities and colleges offer co-op programs with paid work placements, and eligible graduates can apply for a Post-Graduation Work Permit (PGWP).",
      "Applications have become more selective. IRCC now caps new study permits and most applicants need a Provincial Attestation Letter (PAL) from the province. Students must show proof of funds, often through a Guaranteed Investment Certificate (GIC), and apply through VFS Global in Dhaka. A strong, consistent file matters more than ever.",
      "Best for: students with a solid budget and IELTS score who are planning for work experience after graduation.",
    ],
    to: "/study-abroad/study-in-canada",
    link: "Study in Canada from Bangladesh",
  },
  {
    id: "usa",
    region: "na",
    regionLabel: "North America",
    cls: "r-na",
    code: "US",
    name: "USA",
    tag: "Top universities and OPT",
    facts: [
      ["Tuition level", "High"],
      ["English test", "IELTS, TOEFL or Duolingo"],
      ["Main intakes", "August, January"],
      ["Key advantage", "OPT and STEM OPT"],
    ],
    body: [
      "The USA has the largest choice of universities in the world, from research leaders to affordable state universities and community colleges. Many universities offer merit scholarships and financial aid to international undergraduates, which can reduce the high sticker price.",
      "After admission, the university issues a Form I-20. Students pay the SEVIS I-901 fee, complete the DS-160 and attend an F-1 visa interview at the US Embassy in Dhaka. Graduates can work on Optional Practical Training (OPT), with a longer extension for eligible STEM degrees. Starting at a community college and transferring later is a popular way to lower costs.",
      "Best for: ambitious students aiming for top programs, research or STEM careers.",
    ],
    to: "/study-abroad/study-in-usa",
    link: "Study in USA from Bangladesh",
  },
  {
    id: "uk",
    region: "oc",
    regionLabel: "UK",
    cls: "r-oc",
    code: "UK",
    name: "United Kingdom",
    tag: "One-year master's degrees",
    facts: [
      ["Tuition level", "High"],
      ["English test", "IELTS (UKVI) usually"],
      ["Main intakes", "September, January"],
      ["Key advantage", "Graduate Route"],
    ],
    body: [
      "The UK is popular with Bangladeshi students for its globally recognised universities and one-year master's programs, which save a year of living costs compared with most other destinations. Scholarships such as Chevening and Commonwealth Scholarships are open to Bangladeshi applicants.",
      "After an offer, the university issues a Confirmation of Acceptance for Studies (CAS), and students apply for the Student visa through UKVI, paying the Immigration Health Surcharge. Graduates can apply for the Graduate Route to work after their degree; its length is changing, so check the current rule before you apply.",
      "Best for: students who want a fast, well-known degree and strong alumni networks.",
    ],
    to: "/study-abroad/study-in-uk",
    link: "Study in UK from Bangladesh",
  },
  {
    id: "australia",
    region: "oc",
    regionLabel: "Oceania",
    cls: "r-oc",
    code: "AU",
    name: "Australia",
    tag: "Strong universities and lifestyle",
    facts: [
      ["Tuition level", "High"],
      ["English test", "IELTS or PTE"],
      ["Main intakes", "February, July"],
      ["Key advantage", "Post-study work"],
    ],
    body: [
      "Australia offers highly ranked universities, including the Group of Eight, and a large Bangladeshi community in cities such as Sydney and Melbourne. Courses must be registered on CRICOS, and students need Overseas Student Health Cover (OSHC) for their stay.",
      "The Student visa (subclass 500) requires a Confirmation of Enrolment (CoE) and a written response to the Genuine Student (GS) requirement, which assesses whether the applicant truly intends to study. Eligible graduates can apply for post-study work rights.",
      "Best for: students with a good budget and English score who want a high quality of life and work experience after study.",
    ],
    to: "/study-abroad/study-in-australia",
    link: "Study in Australia from Bangladesh",
  },
  {
    id: "new-zealand",
    region: "oc",
    regionLabel: "Oceania",
    cls: "r-oc",
    code: "NZ",
    name: "New Zealand",
    tag: "Safe, welcoming and practical",
    facts: [
      ["Tuition level", "High"],
      ["English test", "IELTS or PTE"],
      ["Main intakes", "February, July"],
      ["Key advantage", "Post-study work visa"],
    ],
    body: [
      "New Zealand is known for safety, a welcoming culture and practical, industry-linked teaching. All eight universities, including the University of Auckland and the University of Otago, appear in global rankings, and qualifications are quality-assured by NZQA.",
      "Students apply to Immigration New Zealand for a Fee Paying Student Visa and must show funds for tuition and living costs. Eligible graduates can apply for a post-study work visa, and the Manaaki New Zealand Scholarship has supported students from eligible countries in the region.",
      "Best for: students who prefer a smaller, calmer country with a clear route to work experience.",
    ],
    to: "/study-abroad/study-in-new-zealand",
    link: "Study in New Zealand from Bangladesh",
  },
];

/* filter + card state */
const filter = ref<"all" | "eu" | "as" | "na" | "oc">("all");
const count = (r: string) => destinations.filter((d) => d.region === r).length;
const tabs = [
  { key: "all" as const, label: "All", count: destinations.length },
  { key: "eu" as const, label: "Europe", count: count("eu") },
  { key: "as" as const, label: "Asia", count: count("as") },
  { key: "na" as const, label: "North America", count: count("na") },
  { key: "oc" as const, label: "UK & Oceania", count: count("oc") },
];
const openCards = reactive(new Set<string>());
const toggleCard = (id: string) =>
  openCards.has(id) ? openCards.delete(id) : openCards.add(id);
const goTo = async (id: string) => {
  filter.value = "all";
  openCards.add(id);
  await nextTick();
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* comparison table */
const tableHeads = [
  "Country",
  "Tuition",
  "Living cost",
  "English requirement",
  "Main intakes",
  "Scholarship highlight",
  "Work after study",
];
const lvlText: Record<string, string> = { l: "Low", m: "Medium", h: "High" };
const tableRows = [
  {
    name: "Italy",
    to: "/study-abroad/italy",
    lvl: "l",
    living: "Medium",
    english: "IELTS or MOI",
    intakes: "Sep",
    scholarship: "DSU regional scholarship",
    work: "Job-search stay available",
  },
  {
    name: "Malta",
    to: "/study-in-malta-from-bangladesh",
    lvl: "m",
    living: "Medium",
    english: "IELTS or MOI (varies)",
    intakes: "Oct, Feb",
    scholarship: "Institution discounts",
    work: "Limited, check rules",
  },
  {
    name: "Hungary",
    to: "/study-in-hungary-from-bangladesh",
    lvl: "l",
    living: "Low",
    english: "IELTS or university test",
    intakes: "Sep",
    scholarship: "Stipendium Hungaricum",
    work: "Job-search stay available",
  },
  {
    name: "Finland",
    to: "/study-in-finland-from-bangladesh",
    lvl: "m",
    living: "High",
    english: "IELTS usually",
    intakes: "Aug/Sep",
    scholarship: "University tuition waivers",
    work: "Job-search permit",
  },
  {
    name: "Cyprus",
    to: "/study-in-cyprus-from-bangladesh",
    lvl: "m",
    living: "Medium",
    english: "IELTS or MOI (varies)",
    intakes: "Sep, Feb",
    scholarship: "University merit awards",
    work: "Limited, check rules",
  },
  {
    name: "Norway",
    to: "/study-in-norway-from-bangladesh",
    lvl: "h",
    living: "High",
    english: "IELTS required",
    intakes: "Aug",
    scholarship: "External scholarships only",
    work: "Job-search permit",
  },
  {
    name: "Greece",
    to: "/study-in-greece-from-bangladesh",
    lvl: "l",
    living: "Low",
    english: "Varies by program",
    intakes: "Sep/Oct",
    scholarship: "University awards",
    work: "Limited, check rules",
  },
  {
    name: "Malaysia",
    to: "/study-in-malaysia",
    lvl: "l",
    living: "Low",
    english: "IELTS or MOI (varies)",
    intakes: "Jan, May, Sep",
    scholarship: "University merit awards",
    work: "Limited",
  },
  {
    name: "China",
    to: "/study-in-china",
    lvl: "l",
    living: "Low",
    english: "MOI often accepted",
    intakes: "Sep",
    scholarship: "CSC (Chinese Government)",
    work: "Limited",
  },
  {
    name: "Turkey",
    to: "/study-in-turkey-from-bangladesh",
    lvl: "l",
    living: "Low",
    english: "MOI or university test",
    intakes: "Sep, Feb",
    scholarship: "Türkiye Burslari",
    work: "Limited",
  },
  {
    name: "Canada",
    to: "/study-abroad/study-in-canada",
    lvl: "h",
    living: "High",
    english: "IELTS required",
    intakes: "Sep, Jan, May",
    scholarship: "University entrance awards",
    work: "PGWP",
  },
  {
    name: "USA",
    to: "/study-abroad/study-in-usa",
    lvl: "h",
    living: "High",
    english: "IELTS, TOEFL or Duolingo",
    intakes: "Aug, Jan",
    scholarship: "Merit aid and financial aid",
    work: "OPT, STEM OPT",
  },
  {
    name: "UK",
    to: "/study-abroad/study-in-uk",
    lvl: "h",
    living: "High",
    english: "IELTS (UKVI) usually",
    intakes: "Sep, Jan",
    scholarship: "Chevening, Commonwealth",
    work: "Graduate Route",
  },
  {
    name: "Australia",
    to: "/study-abroad/study-in-australia",
    lvl: "h",
    living: "High",
    english: "IELTS or PTE",
    intakes: "Feb, Jul",
    scholarship: "University scholarships",
    work: "Post-study work rights",
  },
  {
    name: "New Zealand",
    to: "/study-abroad/study-in-new-zealand",
    lvl: "h",
    living: "High",
    english: "IELTS or PTE",
    intakes: "Feb, Jul",
    scholarship: "University scholarships",
    work: "Post-study work visa",
  },
];

/* goals */
const goals = [
  {
    title: "Lowest total cost",
    text: "Public universities with low tuition and affordable cities.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2m0 8v2"/></svg>',
    chips: [
      { label: "Italy", id: "italy" },
      { label: "Hungary", id: "hungary" },
      { label: "Turkey", id: "turkey" },
      { label: "China", id: "china" },
      { label: "Malaysia", id: "malaysia" },
    ],
  },
  {
    title: "Fully funded scholarship",
    text: "Government scholarships open to Bangladeshi applicants.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/></svg>',
    chips: [
      { label: "Hungary", id: "hungary" },
      { label: "China", id: "china" },
      { label: "Turkey", id: "turkey" },
      { label: "Italy (DSU)", id: "italy" },
    ],
  },
  {
    title: "Without IELTS",
    text: "Universities that often accept an MOI certificate or their own test.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2Z"/><path d="M8 7h6M8 11h6"/></svg>',
    chips: [
      { label: "Italy", id: "italy" },
      { label: "Malta", id: "malta" },
      { label: "Cyprus", id: "cyprus" },
      { label: "Malaysia", id: "malaysia" },
      { label: "China", id: "china" },
      { label: "Turkey", id: "turkey" },
    ],
  },
  {
    title: "Work after graduation",
    text: "Clear post-study work routes for international graduates.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    chips: [
      { label: "Canada", id: "canada" },
      { label: "USA", id: "usa" },
      { label: "Finland", id: "finland" },
      { label: "Australia", id: "australia" },
      { label: "UK", id: "uk" },
    ],
  },
  {
    title: "Medicine (MBBS / MD)",
    text: "English-taught medical degrees popular with Bangladeshi students.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.4-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.6-7 11-7 11Z"/></svg>',
    chips: [
      { label: "China", id: "china" },
      { label: "Hungary", id: "hungary" },
      { label: "Italy", id: "italy" },
    ],
  },
  {
    title: "English-speaking Europe",
    text: "Study and live in English inside the EU.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    chips: [
      { label: "Malta", id: "malta" },
      { label: "Cyprus", id: "cyprus" },
    ],
  },
];

const chooseSteps = [
  {
    h: "What is your total budget?",
    p: "Add tuition, living costs, visa fees and the bank solvency amount the embassy expects. Budget rules out more countries than any other factor.",
  },
  {
    h: "What is your academic record?",
    p: "Your HSC or bachelor's results, subject background and any study gap decide which universities are realistic.",
  },
  {
    h: "Do you have IELTS or an MOI?",
    p: "Some destinations need IELTS for the visa itself. Others accept an MOI certificate for many programs.",
  },
  {
    h: "Are you aiming for a scholarship?",
    p: "Government scholarships have fixed deadlines months before intake. Plan around them early.",
  },
  {
    h: "Do you want to work after graduating?",
    p: "If a job abroad is the goal, weigh post-study work routes and local job markets, not just tuition.",
  },
  {
    h: "Which intake can you meet?",
    p: "Count back from the intake: tests, document attestation, offer letter and visa processing all take time.",
  },
];

const sources = [
  [
    { t: "Universitaly", u: "https://www.universitaly.it/" },
    { t: "Embassy of Italy, Dhaka", u: "https://ambdhaka.esteri.it/" },
  ],
  [{ t: "Stipendium Hungaricum", u: "https://stipendiumhungaricum.hu/" }],
  [
    { t: "Studyinfo.fi", u: "https://studyinfo.fi/" },
    { t: "Finnish Immigration Service", u: "https://migri.fi/en/home" },
  ],
  [{ t: "UDI Norway", u: "https://www.udi.no/en/" }],
  [
    {
      t: "Education Malaysia Global Services",
      u: "https://educationmalaysia.gov.my/",
    },
  ],
  [{ t: "Campus China (CSC)", u: "https://www.campuschina.org/" }],
  [{ t: "Türkiye Burslari", u: "https://www.turkiyeburslari.gov.tr/" }],
  [
    {
      t: "IRCC Canada",
      u: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    },
  ],
  [{ t: "U.S. Embassy Dhaka", u: "https://bd.usembassy.gov/" }],
  [{ t: "UK Student visa (GOV.UK)", u: "https://www.gov.uk/student-visa" }],
  [
    {
      t: "Australian Department of Home Affairs",
      u: "https://immi.homeaffairs.gov.au/",
    },
  ],
  [{ t: "Immigration New Zealand", u: "https://www.immigration.govt.nz/" }],
];

const faqs = [
  {
    q: "Which country is best for Bangladeshi students to study abroad?",
    a: "There is no single best country. For low tuition in Europe, Italy and Hungary are strong choices. For English-speaking Europe, Malta. For scholarships, Hungary (Stipendium Hungaricum), China (CSC) and Turkey (Türkiye Burslari). For long-term careers and post-study work, Canada, the USA and Finland. The right choice depends on your budget, academic record, English test score and career plan.",
  },
  {
    q: "Which countries accept Bangladeshi students without IELTS?",
    a: "Many universities in Italy, Malta, Cyprus, Malaysia, China and Turkey accept a Medium of Instruction (MOI) certificate or their own English test instead of IELTS. Rules differ by university and by program, and some embassies still ask for proof of English, so each application should be checked individually.",
  },
  {
    q: "What is the cheapest country to study abroad from Bangladesh?",
    a: "Public universities in Italy, Hungary, Turkey and China, and many universities in Malaysia, usually cost the least in total. Italy links public tuition to family income (ISEE), and regional DSU scholarships can cover tuition, housing and a stipend. Norway, the UK, the USA, Canada and Australia usually cost the most.",
  },
  {
    q: "Which countries offer fully funded scholarships to Bangladeshi students?",
    a: "Well-known fully funded options open to Bangladeshi students include Stipendium Hungaricum (Hungary), the Chinese Government Scholarship (CSC), Türkiye Burslari (Turkey) and regional DSU scholarships in Italy. Eligibility and deadlines change every year, so confirm each call on the official website.",
  },
  {
    q: "Can Bangladeshi students work part-time while studying abroad?",
    a: "Yes, most destinations on this page allow limited part-time work during studies, usually around 20 hours per week in term time. The exact limit depends on the country and your visa type, so check the current rule for your destination before you plan your budget around part-time income.",
  },
  {
    q: "Which study destinations offer post-study work visas?",
    a: "Canada (PGWP), the USA (OPT), the UK (Graduate Route), Australia, New Zealand and Finland are known for post-study work options. Several EU countries, including Italy and Malta, allow graduates to stay for a period to look for work. Conditions and durations change, so check the latest rules for each country.",
  },
  {
    q: "Which intake should Bangladeshi students target?",
    a: "The autumn intake (September or October) is the main intake in most of Europe, the UK and North America and offers the most programs and scholarships. Canada, the USA, the UK and Malaysia also have January or spring intakes, and Australia and New Zealand start in February and July.",
  },
  {
    q: "How can Sunrise Education Consultants help me choose a country?",
    a: "Sunrise offers a free profile assessment in Banani, Dhaka, in Sylhet or online. A counsellor reviews your academic results, English score, budget and goals, then shortlists countries, universities and scholarships that realistically fit your profile.",
  },
];

/* ------------------------------------------------------------ SEO */
useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: "Study Abroad Destinations for Bangladeshi Students",
  ogDescription:
    "15 destinations compared for Bangladeshi students: tuition, English requirements, intakes, scholarships and work rights.",
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Study Abroad",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": pageUrl + "#page",
      url: pageUrl,
      name: "Study Abroad Destinations for Bangladeshi Students",
      description:
        "A comparison of 15 study abroad destinations for Bangladeshi students, covering tuition level, English requirements, intakes, scholarships and post-study work rights.",
      inLanguage: "en",
      dateModified: updatedISO,
      about: [
        { "@type": "Thing", name: "International education" },
        { "@type": "Thing", name: "Student visa" },
        { "@type": "Country", name: "Bangladesh" },
      ],
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
        numberOfItems: tableRows.length,
        itemListElement: tableRows.map((r, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `Study in ${r.name}`,
          url: siteUrl.slice(0, -1) + r.to,
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
let io: IntersectionObserver | null = null;
onMounted(() => {
  const els = document.querySelectorAll<HTMLElement>(".sap .sap-reveal");
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
    els.forEach((el) => io!.observe(el));
  } else {
    els.forEach((el) => el.classList.add("is-in"));
  }
});
onBeforeUnmount(() => io?.disconnect());
</script>
