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
                <time :datetime="updatedISO">29 September 2026</time>
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
              to travel. At Sunrise, that support is organised into five
              services:
            </p>
            <ul class="svp-picks">
              <li v-for="s in services" :key="s.id">
                <a :href="`#${s.id}`"
                  >{{ s.quick }} <small>{{ s.quickTag }}</small></a
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
              <p class="svp-svc-tag">{{ s.tag }}</p>
              <dl class="svp-svc-meta">
                <div v-for="m in s.meta" :key="m[0]">
                  <dt>{{ m[0] }}</dt>
                  <dd>{{ m[1] }}</dd>
                </div>
              </dl>
            </div>
            <div class="svp-svc-body">
              <p v-for="(p, i) in s.paras" :key="i">
                <template v-if="typeof p === 'string'">{{ p }}</template>
                <template v-else>
                  <template v-for="(seg, j) in p" :key="j">
                    <template v-if="typeof seg === 'string'">{{
                      seg
                    }}</template>
                    <NuxtLink v-else :to="seg.to">{{ seg.label }}</NuxtLink>
                  </template>
                </template>
              </p>
              <div class="svp-incl">
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
              <span>Last updated: 29 Sep 2026</span
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

<script setup lang="ts">
/* ------------------------------------------------------------ constants */
const siteUrl = "https://sunrise-bd.net/";
const pageUrl = siteUrl + "services";
const orgId = siteUrl + "#organization";
const updatedISO = "2026-09-29";

type Seg = string | { to: string; label: string };
type Para = string | Seg[];

const heroStats = [
  { big: "5", small: "Core study abroad services" },
  { big: "2014", small: "Guiding students since" },
  { big: "2", small: "Offices: Dhaka and Sylhet" },
  { big: "Free", small: "First profile assessment" },
];

/* ------------------------------------------------------------ services */
interface Service {
  id: string;
  slug: string;
  cls: string;
  icon: string;
  title: string;
  tag: string;
  quick: string;
  quickTag: string;
  meta: [string, string][];
  paras: Para[];
  incl: string[];
  link: string;
  to: string;
  ld: { name: string; type: string; desc: string };
}
const services: Service[] = [
  {
    id: "svc-visa",
    slug: "counselling-and-visa-processing",
    to: "/service-details/counselling-and-visa-processing",
    cls: "g-navy",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    title: "Counselling & Student Visa Processing",
    tag: "From a free profile check to your visa decision",
    quick: "Counselling & Visa Processing",
    quickTag: "Start + visa",
    meta: [
      ["Best for", "Every new student, and anyone refused before"],
      ["When", "10 to 12 months before your intake"],
      ["You leave with", "Country shortlist, visa file, interview practice"],
    ],
    paras: [
      "Many study abroad plans go wrong at the very first step: a student picks a country from a social media post, then finds out that the budget, grades or English score do not fit. Our counselling starts with a free profile assessment at our Banani office in Dhaka, at our Sylhet office or online. A counsellor reviews your SSC, HSC and bachelor's results, any study gap, your IELTS score or Medium of Instruction (MOI) certificate, your family budget and your career goal, then tells you honestly which countries and programs are realistic.",
      "Once you hold an offer letter, the same team prepares your student visa file. Every embassy asks for something different. Italy needs a Type D national visa with proof of funds and accommodation, the U.S. Embassy in Dhaka expects an I-20, a SEVIS fee receipt and a confident F-1 interview, and Canada requires a study permit application through IRCC with biometrics at VFS Global. We build a checklist for your exact embassy, review your statement of purpose (SOP), sponsor letter and bank solvency papers, and check every page before you submit.",
      [
        "For interview-based visas we run mock interviews with the questions embassies really ask Bangladeshi applicants, and you can practise with our free list of ",
        {
          to: "/embassy-interview-questions-answer",
          label: "embassy interview questions and answers",
        },
        ". If you were refused before, bring the refusal letter: we read the reason given and fix that weakness before you reapply. We never promise a guaranteed visa, because only the embassy decides, but a complete and genuine file gives you the strongest chance.",
      ],
    ],
    incl: [
      "Free profile assessment",
      "Country and university shortlist",
      "Embassy-specific document checklist",
      "SOP and sponsor letter review",
      "Bank solvency and financial document check",
      "Visa form, appointment and VFS submission help",
      "Mock visa interview",
      "Refusal review and reapplication plan",
    ],
    link: "Student visa processing in Bangladesh",
    ld: {
      name: "Counselling and Student Visa Processing",
      type: "Study abroad counselling and student visa processing",
      desc: "Free profile assessment, country and university shortlisting, embassy-specific visa file preparation, SOP and financial document review, and mock visa interviews for Bangladeshi students.",
    },
  },
  {
    id: "svc-admission",
    slug: "university-admission-process",
    to: "/service-details/university-admission-process",
    cls: "g-blue",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 10 5-10 5L2 8l10-5Z"/><path d="M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"/></svg>',
    title: "University Admission Support",
    tag: "Shortlist, apply and secure your offer letter",
    quick: "University Admission",
    quickTag: "Offer letter",
    meta: [
      ["Best for", "Bachelor's, master's and PhD applicants"],
      ["When", "8 to 10 months before your intake"],
      ["You leave with", "Submitted applications and an offer letter"],
    ],
    paras: [
      "Admission is where most of the paperwork lives. We shortlist universities that match your grades, subject background and budget, then check the entry rules for each program: minimum GPA, English requirement, whether MOI is accepted, any portfolio or entrance test, and the application deadline for the September, January or February intake.",
      "Every country uses its own application route, and we handle each one. Italian public universities work through Universitaly pre-enrolment, often with a CIMEA statement or Declaration of Value for your Bangladeshi certificates. Finland uses the joint application on Studyinfo.fi, UK undergraduate applications go through UCAS, and Malaysian universities issue an offer before EMGS processes your student pass. We prepare and upload your transcripts, CV, SOP and recommendation letters, and guide you through Education Board, Ministry of Education and Ministry of Foreign Affairs (MOFA) attestation when a university or embassy asks for it.",
      "When an offer arrives, we explain its conditions in plain language, help you accept it before the deadline and guide you through paying the tuition deposit from Bangladesh through a bank student file, the route authorised dealer banks follow under Bangladesh Bank foreign exchange rules. Where a country needs one more document, such as an I-20 for the USA, a CAS for the UK or a Letter of Acceptance for Canada, we follow up with the university until it is issued.",
    ],
    incl: [
      "University and program shortlist",
      "Entry requirement and deadline check",
      "Application forms and portal submission",
      "SOP, CV and recommendation letter guidance",
      "Education Board and MOFA attestation guidance",
      "Offer letter review and acceptance",
      "Tuition payment through a student file",
      "I-20, CAS or LOA follow-up",
    ],
    link: "University admission support for Bangladeshi students",
    ld: {
      name: "University Admission Support",
      type: "University admission support",
      desc: "University shortlisting, applications through Universitaly, UCAS, Studyinfo and university portals, attestation guidance, offer letter review and tuition payment through a bank student file.",
    },
  },
  {
    id: "svc-housing",
    slug: "accommodation-and-housing",
    to: "/service-details/accommodation-and-housing",
    cls: "g-green",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"/></svg>',
    title: "Accommodation & Housing",
    tag: "Safe, affordable housing arranged before you fly",
    quick: "Accommodation & Housing",
    quickTag: "Before you fly",
    meta: [
      ["Best for", "First-time travellers and visa files that need an address"],
      ["When", "2 to 4 months before departure"],
      ["You leave with", "A checked housing option and visa-ready proof"],
    ],
    paras: [
      "Where you live affects your budget, your safety and sometimes your visa. Many Schengen embassies, including Italy's, ask for proof of accommodation in the visa file, and a weak or unreal booking can lead to refusal. We help you find housing that is genuine, affordable and close to your campus before you leave Bangladesh.",
      "The options depend on the country. Many universities in Hungary, Finland, China and Turkey offer dormitory places to international students, usually at the lowest price. In Italy most students share apartments, and the regional DSU scholarship can include a place in a university residence. In the UK, Canada and Australia students choose between university halls, private student residences, shared houses and homestays. We compare the options with you by monthly rent in BDT, distance to campus, contract length and deposit.",
      "Before you pay anything, we help you read the rental contract and spot the warning signs of housing scams, such as landlords who refuse a video viewing or ask for money through untraceable transfers. Whenever possible we also connect you with Sunrise students already living in the same city, so you can ask about the area from someone who knows it.",
    ],
    incl: [
      "Dormitory and residence applications",
      "Shared flat and homestay options",
      "Rent and deposit budget in BDT",
      "Rental contract check",
      "Accommodation proof for the visa",
      "Housing scam warning checklist",
      "Airport to residence plan",
      "Contact with students in your city",
    ],
    link: "Student accommodation support abroad",
    ld: {
      name: "Accommodation and Housing Support",
      type: "Student accommodation support",
      desc: "Help finding dormitories, student residences, shared apartments and homestays abroad, contract checks and visa-ready accommodation proof.",
    },
  },
  {
    id: "svc-departure",
    slug: "pre-departure-preparation",
    to: "/service-details/pre-departure-preparation",
    cls: "g-orange",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>',
    title: "Pre-Departure Preparation",
    tag: "Travel, money and your first week, planned",
    quick: "Pre-Departure Preparation",
    quickTag: "Last 6 weeks",
    meta: [
      ["Best for", "Students with a visa in hand"],
      ["When", "2 to 6 weeks before departure"],
      ["You leave with", "Packing list, document folder, arrival plan"],
    ],
    paras: [
      "A visa is not the finish line. Our pre-departure briefing covers everything between visa approval and your first class, so you do not land in a new country confused. We run it as a group seminar before each main intake, where you meet other students flying to the same country, and as a one-to-one session for students who travel at other times.",
      "We go through the documents to carry in your hand luggage (passport, visa, offer letter, insurance, accommodation proof and attested certificates), how much money to take and how to carry foreign currency legally from Bangladesh, what you can and cannot pack, and how to book a flight that matches your arrival and registration dates. We also explain the first-week tasks in each country, such as applying for the Permesso di Soggiorno in Italy, registering your address in Finland, setting up your UKVI eVisa account in the UK, opening a local bank account and getting a SIM card.",
      "Culture shock and homesickness are real, especially in the first months. We share practical advice from students who went before you on weather and clothing, food, part-time work rules, study culture and how to ask professors for help. You also leave with a Sunrise contact to message if something goes wrong after you arrive.",
    ],
    incl: [
      "Pre-departure seminar or 1:1 briefing",
      "Hand-luggage document checklist",
      "Packing list by country and season",
      "Currency and banking guidance",
      "Flight and arrival planning",
      "First-week registration steps",
      "Part-time work rules explained",
      "Support contact after you arrive",
    ],
    link: "Pre-departure preparation for Bangladeshi students",
    ld: {
      name: "Pre-Departure Preparation",
      type: "Pre-departure briefing",
      desc: "Pre-departure seminars and one-to-one briefings covering documents, packing, money, flights, arrival and first-week registration abroad.",
    },
  },
  {
    id: "svc-poststudy",
    slug: "post-study-opportunities",
    to: "/service-details/post-study-opportunities",
    cls: "g-blue",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    title: "Post-Study Opportunities",
    tag: "Plan your career route from day one",
    quick: "Post-Study Opportunities",
    quickTag: "After your degree",
    meta: [
      ["Best for", "Students who want to work abroad after graduating"],
      ["When", "Before you choose a course, and in your final year"],
      ["You leave with", "A clear study-to-work route plan"],
    ],
    paras: [
      "Many Bangladeshi students choose a country because of what happens after graduation, so we talk about post-study work before you pick a course, not after. Work rights depend on the country, the level of your degree and sometimes the length of your program, so the right course choice today can decide your options three years from now.",
      "We explain the main routes in plain language: the Post-Graduation Work Permit (PGWP) in Canada, Optional Practical Training (OPT) and STEM OPT in the USA, the Graduate Route in the UK, the Temporary Graduate visa in Australia and the post-study work visa in New Zealand. In Europe, graduates in Finland, Italy and several other EU countries can stay for a set period to look for work, and highly qualified graduates may qualify for the EU Blue Card.",
      "In your final year we help you prepare: moving from a study permit to a work permit, choosing internships that match jobs in demand, writing a CV for the local job market and understanding when a route can lead to permanent residence. Immigration rules change often, so we always check the official immigration website with you before you make a decision.",
    ],
    incl: [
      "Post-study work rules by country",
      "Course choice linked to jobs in demand",
      "Internship and part-time work guidance",
      "Study permit to work permit steps",
      "CV guidance for the local market",
      "Route to permanent residence explained",
    ],
    link: "Post-study work visa for Bangladeshi students",
    ld: {
      name: "Post-Study Opportunities Guidance",
      type: "Post-study work and career guidance",
      desc: "Guidance on post-study work routes such as PGWP, OPT, the Graduate Route and EU job-search permits, and on moving from a study permit to a work permit.",
    },
  },
];

const stages = [
  {
    when: "10 to 12 months before",
    h: "Free assessment",
    p: "Profile check, budget, English plan and a first country shortlist.",
    to: "svc-visa",
    link: "Counselling",
  },
  {
    when: "8 to 10 months before",
    h: "Shortlist and apply",
    p: "Programs chosen, documents prepared and applications submitted.",
    to: "svc-admission",
    link: "University Admission",
  },
  {
    when: "5 to 7 months before",
    h: "Offer and tuition",
    p: "Offer accepted, attestation done and tuition paid through a student file.",
    to: "svc-admission",
    link: "University Admission",
  },
  {
    when: "3 to 5 months before",
    h: "Visa file and interview",
    p: "Embassy checklist, financial papers, submission and mock interview.",
    to: "svc-visa",
    link: "Visa Processing",
  },
  {
    when: "1 to 3 months before",
    h: "Housing and briefing",
    p: "Accommodation booked, flight planned and pre-departure briefing done.",
    to: "svc-housing",
    link: "Housing & Pre-Departure",
  },
  {
    when: "After arrival",
    h: "Study and career",
    p: "Registration abroad, part-time work rules and your post-study plan.",
    to: "svc-poststudy",
    link: "Post-Study",
  },
];

const tableHeads = [
  "Service",
  "When you need it",
  "Main result",
  "What you bring",
  "Official bodies involved",
];
const tableRows = [
  {
    id: "svc-visa",
    name: "Counselling & Visa Processing",
    when: "At the start, then after your offer",
    result: "Country shortlist, visa file, mock interview",
    bring: "Results, passport, budget, offer letter",
    bodies: "Embassies in Dhaka, VFS Global, IRCC, UKVI",
  },
  {
    id: "svc-admission",
    name: "University Admission",
    when: "8 to 10 months before intake",
    result: "Applications, offer letter, I-20, CAS or LOA",
    bring: "Certificates, transcripts, SOP, English score",
    bodies:
      "Universitaly, CIMEA, UCAS, Studyinfo, EMGS, Education Boards, MOFA",
  },
  {
    id: "svc-housing",
    name: "Accommodation & Housing",
    when: "2 to 4 months before departure",
    result: "Checked housing and visa-ready proof",
    bring: "City, budget, move-in date",
    bodies: "University housing offices, regional DSU offices (Italy)",
  },
  {
    id: "svc-departure",
    name: "Pre-Departure Preparation",
    when: "2 to 6 weeks before departure",
    result: "Briefing, document folder, arrival plan",
    bring: "Visa, ticket, accommodation details",
    bodies: "Your bank (student file), immigration offices abroad",
  },
  {
    id: "svc-poststudy",
    name: "Post-Study Opportunities",
    when: "At course choice and in your final year",
    result: "Study-to-work route plan",
    bring: "Degree plan, career goal",
    bodies: "IRCC, USCIS, UKVI, Home Affairs, Immigration NZ, Migri",
  },
];

const docs = [
  {
    title: "Academic documents",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 10 5-10 5L2 8l10-5Z"/><path d="M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"/></svg>',
    items: [
      "SSC and HSC certificates and marksheets",
      "Bachelor's certificate and transcript (for master's applicants)",
      "Attestation by the Education Board or university, Ministry of Education and MOFA, when required",
      "IELTS, PTE, TOEFL or Duolingo score, or an MOI certificate",
      "CIMEA statement or Declaration of Value (Italy)",
    ],
  },
  {
    title: "Application documents",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    items: [
      "Statement of purpose (SOP) or motivation letter",
      "Academic CV",
      "Two recommendation letters",
      "Portfolio for design and architecture programs",
      "Passport-size photos to the embassy's size rules",
    ],
  },
  {
    title: "Identity and financial documents",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/></svg>',
    items: [
      "Passport valid for your full study period",
      "Birth certificate or National ID (NID)",
      "Bank solvency certificate and statements of your sponsor",
      "Sponsor's income proof: tax return, trade licence or salary certificate",
      "Police clearance certificate and medical test, when the embassy asks",
    ],
  },
];

const promiseYes = [
  {
    h: "Give you an honest assessment",
    p: 'Even when the honest answer is "not this year" or "not this country".',
  },
  {
    h: "Put your checklist in writing",
    p: "So you know exactly which documents your embassy expects.",
  },
  {
    h: "Show you every application",
    p: "You see what is submitted in your name, to which university and when.",
  },
  {
    h: "Work from official sources",
    p: "Embassy, university and government websites, checked before every intake.",
  },
];
const promiseNo = [
  {
    h: "Guarantee a visa",
    p: "Only the embassy decides. Anyone who guarantees a visa is not telling you the truth.",
  },
  {
    h: 'Prepare fake or "arranged" documents',
    p: "No fake bank statements, certificates or bookings. They cause refusals and bans.",
  },
  {
    h: "Push a country that does not fit you",
    p: "Your budget, results and goals decide the shortlist.",
  },
  {
    h: "Leave you after the visa",
    p: "Pre-departure and post-study support are part of the journey.",
  },
];

const sources = [
  {
    t: "Ministry of Foreign Affairs, Bangladesh (attestation)",
    u: "https://mofa.gov.bd/",
  },
  { t: "Ministry of Education, Bangladesh", u: "https://moedu.gov.bd/" },
  {
    t: "Bangladesh Bank (foreign exchange rules)",
    u: "https://www.bb.org.bd/",
  },
  {
    t: "Department of Immigration and Passports",
    u: "https://www.dip.gov.bd/",
  },
  {
    t: "Bangladesh Police clearance certificate",
    u: "https://pcc.police.gov.bd/",
  },
  { t: "VFS Global", u: "https://www.vfsglobal.com/" },
  { t: "U.S. Embassy Dhaka", u: "https://bd.usembassy.gov/" },
  {
    t: "IRCC Canada",
    u: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
  },
  { t: "UK Student visa (GOV.UK)", u: "https://www.gov.uk/student-visa" },
  { t: "Universitaly (Italy)", u: "https://www.universitaly.it/" },
];

const nextSteps = [
  {
    to: "/study-abroad",
    h: "Choose your destination",
    p: "Compare 15 countries by tuition level, English rules, intakes and post-study work.",
    link: "Compare destinations",
  },
  {
    to: "/success-story",
    h: "Read student stories",
    p: "See how Bangladeshi students reached universities abroad with Sunrise.",
    link: "Success stories",
  },
  {
    to: "/staff",
    h: "Meet your counsellors",
    p: "Get to know the team in Banani and Sylhet who will handle your file.",
    link: "Our team",
  },
];

interface Faq {
  q: string;
  a: string;
  parts?: Seg[];
}
const faqs: Faq[] = [
  {
    q: "What study abroad services does Sunrise offer Bangladeshi students?",
    a: "Sunrise Education Consultants offers five study abroad services for Bangladeshi students: counselling and student visa processing, university admission support, accommodation and housing, pre-departure preparation, and post-study opportunities guidance. Every student starts with a free profile assessment in Banani, Dhaka, in Sylhet or online.",
  },
  {
    q: "Is the first study abroad counselling session free?",
    a: "Yes. The first profile assessment at Sunrise is free, whether you visit the Banani or Sylhet office or join online. Before you start any further service, ask your counsellor to explain the service charge for your chosen country and keep it in writing.",
  },
  {
    q: "Can a study abroad consultant guarantee a student visa?",
    a: "No. Only the embassy or immigration authority decides a visa, so no consultant can honestly guarantee one. A good consultant improves your chances by building a complete, genuine file and preparing you for the interview. Treat any visa guarantee as a warning sign.",
  },
  {
    q: "How long does the study abroad process take from Bangladesh?",
    a: "Most students need 6 to 12 months from the first assessment to departure. Admission usually takes 1 to 3 months, and visa processing takes from a few weeks to several months depending on the embassy. Starting 10 to 12 months before your intake gives you time for scholarships and attestation.",
  },
  {
    q: "Can you help me study abroad without IELTS?",
    a: "Yes. Many universities in Italy, Malta, Cyprus, Malaysia, China and Turkey accept a Medium of Instruction (MOI) certificate or their own English test instead of IELTS. Rules differ by university and embassy, so we check each program before you apply.",
    parts: [
      "Yes. Many universities in Italy, Malta, Cyprus, Malaysia, China and Turkey accept a Medium of Instruction (MOI) certificate or their own English test instead of IELTS. Rules differ by university and embassy, so we check each program before you apply. You can compare the English rules of every country on our ",
      { to: "/study-abroad", label: "study abroad destinations" },
      " page.",
    ],
  },
  {
    q: "Do you help with scholarships?",
    a: "Yes. Your counsellor checks scholarship options during the free assessment, and all scholarships for Bangladeshi students, including Stipendium Hungaricum, the Chinese Government Scholarship, Türkiye Burslari and Italy's DSU, are covered on our dedicated Scholarships page.",
    parts: [
      "Yes. Your counsellor checks scholarship options during the free assessment, and all scholarships for Bangladeshi students, including Stipendium Hungaricum, the Chinese Government Scholarship, Türkiye Burslari and Italy's DSU, are covered on our dedicated ",
      { to: "/scholarships", label: "Scholarships" },
      " page.",
    ],
  },
  {
    q: "Can you help if my student visa was refused before?",
    a: "Yes. Bring your refusal letter. We read the reason the embassy gave, fix that weakness in your documents, finances or interview answers, and help you decide whether to reapply to the same country or change your plan.",
  },
  {
    q: "Can I use your services if I live outside Dhaka?",
    a: "Yes. Students can visit our head office in Banani, Dhaka, or our Sylhet office on Jail Road, and students from any district can take counselling online and share documents digitally.",
  },
  {
    q: "What documents do I need for the first counselling session?",
    a: "Bring your passport if you have one, SSC and HSC results, bachelor's results if you are applying for a master's degree, any English test score or MOI certificate, and a rough idea of your total budget. Copies or phone photos are enough for the first session.",
  },
];

/* ------------------------------------------------------------ SEO */
useSeoMeta({
  title: "Study Abroad Services for Bangladeshi Students | Sunrise",
  description:
    "Study abroad services for Bangladeshi students: free counselling, student visa processing, university admission, housing, pre-departure and post-study support.",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: "Study Abroad Services for Bangladeshi Students",
  ogDescription:
    "Counselling, student visa processing, university admission, accommodation, pre-departure and post-study support from Sunrise Education Consultants, Dhaka and Sylhet.",
  ogUrl: pageUrl,
  ogSiteName: "Sunrise Education Consultants",
  twitterCard: "summary_large_image",
});

const serviceId = (slug: string) => `${siteUrl}service-details/${slug}#service`;
const country = { "@type": "Country", name: "Bangladesh" };
const reviewer = {
  "@type": "Person",
  name: "Anisuzzaman Kiron",
  jobTitle: "Founder & CEO",
  url: siteUrl + "staff/anisuzzaman-kiron",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: pageUrl },
      ],
    },
    {
      "@type": "EducationalOrganization",
      "@id": orgId,
      name: "Sunrise Education Consultants",
      url: siteUrl,
      logo: siteUrl + "upload/logo/sunrise-logo.png",
      foundingDate: "2014",
      founder: reviewer,
      email: "info@sunrise-bd.net",
      telephone: "+8801911878274",
      areaServed: country,
      location: [
        {
          "@type": "Place",
          name: "Sunrise Education Consultants, Banani (Head Office)",
          address: {
            "@type": "PostalAddress",
            streetAddress: "House 61 (1st Floor), Block F, Road 08, Banani",
            addressLocality: "Dhaka",
            postalCode: "1213",
            addressCountry: "BD",
          },
        },
        {
          "@type": "Place",
          name: "Sunrise Education Consultants, Sylhet",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ananda Tower (3rd Floor), Jail Road",
            addressLocality: "Sylhet",
            postalCode: "3100",
            addressCountry: "BD",
          },
        },
      ],
      sameAs: [
        "https://www.facebook.com/SunriseEC",
        "https://www.youtube.com/@SunriseEducationConsultants",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Study abroad services for Bangladeshi students",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@id": serviceId(s.slug) },
        })),
      },
    },
    {
      "@type": "CollectionPage",
      "@id": pageUrl + "#page",
      url: pageUrl,
      name: "Study Abroad Services for Bangladeshi Students",
      description:
        "The five study abroad services Sunrise Education Consultants offers Bangladeshi students: counselling and student visa processing, university admission support, accommodation and housing, pre-departure preparation and post-study opportunities.",
      inLanguage: "en",
      dateModified: updatedISO,
      isPartOf: {
        "@type": "WebSite",
        "@id": siteUrl + "#website",
        url: siteUrl,
        name: "Sunrise Education Consultants",
      },
      about: [
        { "@type": "Thing", name: "Education consultancy" },
        { "@type": "Thing", name: "Student visa" },
        { "@type": "Thing", name: "International student admission" },
      ],
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        geographicArea: country,
      },
      publisher: { "@id": orgId },
      reviewedBy: reviewer,
      mainEntity: {
        "@type": "ItemList",
        name: "Study abroad services for Bangladeshi students",
        numberOfItems: services.length,
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            "@id": serviceId(s.slug),
            name: s.ld.name,
            serviceType: s.ld.type,
            url: siteUrl + "service-details/" + s.slug,
            description: s.ld.desc,
            provider: { "@id": orgId },
            areaServed: country,
          },
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

/* ------------------------------------------------------------ reveal on scroll (with grid stagger) */
let io: IntersectionObserver | null = null;
onMounted(() => {
  const root = document.querySelector(".svp");
  if (!root) return;
  root
    .querySelectorAll(".svp-journey,.svp-docs,.svp-next,.svp-pgrid")
    .forEach((g) => {
      g.querySelectorAll<HTMLElement>(".svp-reveal").forEach((el, i) => {
        el.style.transitionDelay = i * 80 + "ms";
      });
    });
  const els = root.querySelectorAll<HTMLElement>(".svp-reveal");
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io?.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => io!.observe(el));
  } else {
    els.forEach((el) => el.classList.add("is-in"));
  }
});
onBeforeUnmount(() => io?.disconnect());
</script>
