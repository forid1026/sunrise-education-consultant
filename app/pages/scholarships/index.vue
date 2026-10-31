<template>
  <div ref="root" class="ssp">
    <!-- ================= SECTION 1: HERO ================= -->
    <section class="ssp-hero" aria-labelledby="ssp-h1">
      <div class="ssp-hero-rays" aria-hidden="true"></div>
      <div class="ssp-container">
        <nav class="ssp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Scholarships</span>
        </nav>
        <div class="ssp-hero-grid">
          <div>
            <span class="ssp-eyebrow"><i></i>Fully funded and partial</span>
            <h1 class="ssp-h1" id="ssp-h1">
              Scholarships for Bangladeshi Students <span>to Study Abroad</span>
            </h1>
            <p class="ssp-sub">
              Compare the 10 scholarships Bangladeshi students apply for most,
              from Stipendium Hungaricum and the Chinese Government Scholarship
              to Chevening and Fulbright. See what each one covers, who can
              apply and when applications open, then get free help from
              <NuxtLink to="/">Sunrise Education Consultants</NuxtLink> to build
              an application that stands out.
            </p>
            <div class="ssp-cta-row">
              <NuxtLink class="ssp-btn ssp-btn-primary" to="/apply-now"
                >Check My Eligibility
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a class="ssp-btn ssp-btn-ghost" href="#ssp-calendar"
                >See Deadlines</a
              >
            </div>
            <div class="ssp-byline">
              <span class="ssp-avatar" aria-hidden="true">AK</span>
              <div>
                Reviewed by
                <b
                  ><NuxtLink to="/staff/anisuzzaman-kiron"
                    >Anisuzzaman Kiron</NuxtLink
                  ></b
                >, Founder &amp; CEO<br />Last updated:
                <time datetime="2026-09-29">29 September 2026</time>
              </div>
            </div>
          </div>
          <aside class="ssp-answer" aria-labelledby="ssp-quick">
            <h2 id="ssp-quick">
              Quick answer: which scholarships can Bangladeshi students get?
            </h2>
            <p>
              The best scholarship depends on your study level, results and
              English score. These are the strongest matches for Bangladeshi
              students:
            </p>
            <ul class="ssp-picks">
              <li>After HSC (bachelor's) <b>Hungary, China, Turkey</b></li>
              <li>Master's with work experience <b>Chevening, Fulbright</b></li>
              <li>Need-based, on family income <b>Italy (DSU)</b></li>
              <li>Without IELTS <b>Türkiye Burslari, CSC</b></li>
              <li>Study in several EU countries <b>Erasmus Mundus</b></li>
            </ul>
          </aside>
        </div>
        <div class="ssp-stats">
          <div class="ssp-stat">
            <b>{{ list.length }}</b
            ><small>Major scholarships compared</small>
          </div>
          <div class="ssp-stat">
            <b>{{ countryCount }}</b
            ><small>Countries, plus the EU</small>
          </div>
          <div class="ssp-stat">
            <b>2014</b><small>Guiding students since</small>
          </div>
          <div class="ssp-stat">
            <b>Free</b><small>Scholarship eligibility check</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 2: SCHOLARSHIP CARDS ================= -->
    <section
      class="ssp-section ssp-list"
      id="ssp-list"
      aria-labelledby="ssp-list-h"
    >
      <div class="ssp-container">
        <span class="ssp-eyebrow"><i></i>Find your scholarship</span>
        <h2 class="ssp-h2" id="ssp-list-h">
          Fully Funded Scholarships <span>for Bangladeshi Students</span>
        </h2>
        <p class="ssp-lead">
          Each card shows what the scholarship covers, who can apply, when
          applications usually open and the English requirement. Open a card for
          our counsellors' summary of how Bangladeshi students apply and what
          makes an application succeed.
        </p>

        <div
          class="ssp-tabs"
          role="tablist"
          aria-label="Filter scholarships by study level"
        >
          <button
            v-for="t in tabs"
            :key="t.key"
            class="ssp-tab"
            :class="{ 'is-active': filter === t.key }"
            role="tab"
            :aria-selected="filter === t.key"
            @click="filter = t.key"
          >
            {{ t.label }} <span>{{ counts[t.key] }}</span>
          </button>
        </div>

        <div class="ssp-grid">
          <article
            v-for="s in shown"
            :id="s.slug"
            :key="s.id"
            class="ssp-card"
            :class="{ 'is-open': open[s.id] }"
          >
            <div class="ssp-card-top" :class="`r-${s.region}`">
              <div class="ssp-badges">
                <span
                  class="ssp-badge"
                  :class="{
                    full: s.funding === 'full' || s.funding === 'need',
                  }"
                  >{{ s.fundingLabel }}</span
                >
                <span v-if="s.country" class="ssp-badge">{{ s.country }}</span>
              </div>
              <span class="ssp-code" aria-hidden="true">{{ s.code }}</span>
              <div>
                <h3>{{ s.name }}</h3>
                <div v-if="s.tag" class="ssp-tag">{{ s.tag }}</div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul v-if="s.facts.length" class="ssp-facts">
                <li v-for="f in s.facts" :key="f.label">
                  {{ f.label }}<b>{{ f.value }}</b>
                </li>
              </ul>
              <div class="ssp-desc" @click="onProseClick" v-html="s.html"></div>
              <button
                class="ssp-more"
                :aria-expanded="!!open[s.id]"
                @click="open[s.id] = !open[s.id]"
              >
                {{ open[s.id] ? "Show less" : "Read more" }}
              </button>
              <component
                :is="s.link.internal ? 'NuxtLink' : 'a'"
                v-if="s.link.url"
                class="ssp-card-link"
              >
                {{ s.link.label }}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </component>
              <!-- <component
                :is="s.link.internal ? 'NuxtLink' : 'a'"
                v-if="s.link.url"
                class="ssp-card-link"
                v-bind="
                  s.link.internal
                    ? { to: s.link.url }
                    : { href: s.link.url, target: '_blank', rel: 'noopener' }
                "
              >
                {{ s.link.label }}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </component> -->
            </div>
          </article>
        </div>
        <p v-if="!shown.length" class="ssp-note">
          No scholarships found for this filter.
        </p>

        <p class="ssp-note">
          Coverage, dates and rules come from each program's latest official
          call and can change every year. Always confirm on the official website
          before you apply.
        </p>
      </div>
    </section>

    <!-- ================= SECTION 3: COMPARISON TABLE ================= -->
    <section
      class="ssp-section"
      id="ssp-compare"
      aria-labelledby="ssp-compare-h"
    >
      <div class="ssp-container">
        <span class="ssp-eyebrow"><i></i>Side by side</span>
        <h2 class="ssp-h2" id="ssp-compare-h">
          Compare Scholarships <span>at a Glance</span>
        </h2>
        <p class="ssp-lead">
          Use this table to shortlist two or three scholarships that match your
          level, English score and experience.
        </p>
        <div
          class="ssp-table-wrap"
          role="region"
          aria-label="Scholarship comparison table"
          tabindex="0"
        >
          <table class="ssp-table">
            <thead>
              <tr>
                <th scope="col">Scholarship</th>
                <th scope="col">Country</th>
                <th scope="col">Funding</th>
                <th scope="col">Levels</th>
                <th scope="col">Usual window</th>
                <th scope="col">English</th>
                <th scope="col">Apply through</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in list" :key="s.id">
                <td>
                  <a :href="`#${s.slug}`" @click.prevent="jump(s)">{{
                    s.short
                  }}</a>
                </td>
                <td>{{ s.country }}</td>
                <td>
                  <span
                    class="lvl"
                    :class="s.funding === 'partial' ? 'lvl-p' : 'lvl-f'"
                    >{{ s.fundingLabel }}</span
                  >
                </td>
                <td>{{ s.levelsText }}</td>
                <td>{{ s.window }}</td>
                <td>{{ s.english }}</td>
                <td>{{ s.applyThrough }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 4: CALENDAR ================= -->
    <section
      class="ssp-section ssp-list"
      id="ssp-calendar"
      aria-labelledby="ssp-cal-h"
    >
      <div class="ssp-container">
        <div class="ssp-center">
          <span class="ssp-eyebrow"><i></i>Plan ahead</span>
          <h2 class="ssp-h2" id="ssp-cal-h">
            Scholarship Application <span>Calendar</span>
          </h2>
          <p class="ssp-lead">
            Most fully funded scholarships close 8 to 12 months before classes
            start. This is the typical cycle for study that begins the following
            autumn.
          </p>
        </div>
        <div class="ssp-cal">
          <div class="ssp-month ssp-reveal">
            <h3>Aug to Oct</h3>
            <small>UK government scholarships</small>
            <ul>
              <li><b>Chevening</b>Opens early August, closes early October</li>
              <li>
                <b>Commonwealth Master's</b>Online form and UGC hard copy by
                October
              </li>
            </ul>
          </div>
          <div class="ssp-month ssp-reveal">
            <h3>Oct to Jan</h3>
            <small>Europe opens</small>
            <ul>
              <li>
                <b>Erasmus Mundus</b>Program deadlines from October to February
              </li>
              <li>
                <b>Stipendium Hungaricum</b>Portal closes mid-January, then
                ministry nomination
              </li>
            </ul>
          </div>
          <div class="ssp-month ssp-reveal">
            <h3>Jan to Apr</h3>
            <small>Turkey, China, Finland, Australia</small>
            <ul>
              <li>
                <b>Finland</b>Joint application on Studyinfo.fi in January
              </li>
              <li><b>Türkiye Burslari</b>Mid-January to late February</li>
              <li><b>CSC</b>January to April, by university</li>
              <li><b>Australia Awards</b>February to end of April</li>
            </ul>
          </div>
          <div class="ssp-month ssp-reveal">
            <h3>Jul to Sep</h3>
            <small>After admission</small>
            <ul>
              <li><b>Italy DSU</b>Regional calls with ISEE parificato</li>
              <li>
                <b>University awards</b>Many partial scholarships are decided
                with the offer
              </li>
            </ul>
          </div>
        </div>
        <p class="ssp-note">
          Dates follow the most recent cycles and can move. Fulbright is
          announced by the U.S. Embassy in Dhaka on its own timeline. For a
          fuller list, see our
          <NuxtLink
            to="/blog/full-partial-scholarships-for-bangladeshi-students-2027-complete-list"
            >partial scholarships and tuition waivers list for 2027</NuxtLink
          >.
        </p>
      </div>
    </section>

    <!-- ================= SECTION 5: UNIVERSITY SCHOLARSHIPS BY COUNTRY ================= -->
    <section class="ssp-section" aria-labelledby="ssp-uni-h">
      <div class="ssp-container">
        <span class="ssp-eyebrow"><i></i>Partial scholarships</span>
        <h2 class="ssp-h2" id="ssp-uni-h">
          University Scholarships and <span>Tuition Waivers by Country</span>
        </h2>
        <p class="ssp-lead">
          Not every student wins a government scholarship, but most universities
          offer partial scholarships or fee waivers that can cut your costs
          sharply. These are usually decided with your admission, so a strong
          application does double duty.
        </p>
        <div
          class="ssp-table-wrap"
          role="region"
          aria-label="University scholarships by country"
          tabindex="0"
        >
          <table class="ssp-table">
            <thead>
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Typical university support</th>
                <th scope="col">What decides it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><NuxtLink to="/study-abroad/italy">Italy</NuxtLink></td>
                <td>
                  Income-based fee reductions and merit awards at universities
                  such as Politecnico di Milano, Bologna and Padua, on top of
                  DSU
                </td>
                <td>ISEE parificato and academic record</td>
              </tr>
              <tr>
                <td>
                  <NuxtLink to="/study-in-malta-from-bangladesh"
                    >Malta</NuxtLink
                  >
                </td>
                <td>
                  Limited merit scholarships and fee discounts at some
                  institutions
                </td>
                <td>Grades and program</td>
              </tr>
              <tr>
                <td>
                  <NuxtLink to="/study-in-cyprus-from-bangladesh"
                    >Cyprus</NuxtLink
                  >
                </td>
                <td>
                  Partial tuition scholarships at many universities, often a set
                  percentage of fees
                </td>
                <td>Previous grades</td>
              </tr>
              <tr>
                <td>
                  <NuxtLink to="/study-in-greece-from-bangladesh"
                    >Greece</NuxtLink
                  >
                </td>
                <td>
                  Limited university scholarships and fee waivers, mostly for
                  master's programs
                </td>
                <td>Academic record and program</td>
              </tr>
              <tr>
                <td>
                  <NuxtLink to="/study-in-norway-from-bangladesh"
                    >Norway</NuxtLink
                  >
                </td>
                <td>
                  No general government scholarship for non-EU students since
                  tuition began in 2023; few university awards
                </td>
                <td>Program-specific</td>
              </tr>
              <tr>
                <td><NuxtLink to="/study-in-malaysia">Malaysia</NuxtLink></td>
                <td>
                  Merit scholarships and tuition discounts at public and private
                  universities
                </td>
                <td>SSC and HSC or CGPA results</td>
              </tr>
              <tr>
                <td>
                  <NuxtLink to="/study-abroad/study-in-canada">Canada</NuxtLink>
                </td>
                <td>
                  Entrance scholarships at universities and colleges; funded
                  research master's and PhD positions
                </td>
                <td>Grades, research fit, supervisor</td>
              </tr>
              <tr>
                <td>
                  <NuxtLink to="/study-abroad/study-in-usa">USA</NuxtLink>
                </td>
                <td>
                  Merit scholarships, need-based aid and graduate assistantships
                  (TA or RA) that can cover tuition and pay a stipend
                </td>
                <td>SAT or GRE where required, grades, research</td>
              </tr>
              <tr>
                <td>
                  <NuxtLink to="/study-abroad/study-in-new-zealand"
                    >New Zealand</NuxtLink
                  >
                </td>
                <td>
                  University merit scholarships, mostly for postgraduate study
                </td>
                <td>Academic record</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 6: HOW WE HELP (SERVICE) ================= -->
    <section class="ssp-section ssp-help" aria-labelledby="ssp-help-h">
      <div class="ssp-container">
        <span class="ssp-eyebrow"><i></i>Our scholarship service</span>
        <h2 class="ssp-h2" id="ssp-help-h">
          How Sunrise Helps You <span>Win a Scholarship</span>
        </h2>
        <p class="ssp-lead">
          Our scholarship services for Bangladeshi students follow six steps,
          from your first eligibility check to your visa after the award.
          Scholarship support is part of our full range of
          <NuxtLink to="/services">study abroad services</NuxtLink>, so the same
          team carries your file from start to finish.
        </p>
        <div class="ssp-steps">
          <div class="ssp-step ssp-reveal">
            <h3>Free eligibility check</h3>
            <p>
              We review your SSC, HSC or CGPA, English score or MOI, work
              experience and budget, then tell you honestly which scholarships
              you can realistically win.
            </p>
          </div>
          <div class="ssp-step ssp-reveal">
            <h3>Shortlist and calendar</h3>
            <p>
              You get a written shortlist of scholarships and universities with
              every deadline, including nomination steps at the Ministry of
              Education or UGC.
            </p>
          </div>
          <div class="ssp-step ssp-reveal">
            <h3>Essays and study plan</h3>
            <p>
              We help you plan and review your motivation letter, study plan,
              research proposal and Chevening-style essays so they sound like
              you and show real evidence.
            </p>
          </div>
          <div class="ssp-step ssp-reveal">
            <h3>Documents and nomination</h3>
            <p>
              Transcripts, recommendation letters, attestation and hard copies
              for ministry or UGC nomination are checked before every deadline.
            </p>
          </div>
          <div class="ssp-step ssp-reveal">
            <h3>Interview practice</h3>
            <p>
              Mock interviews for Türkiye Burslari, Chevening, Australia Awards
              and university panels, with honest feedback after each session.
            </p>
          </div>
          <div class="ssp-step ssp-reveal">
            <h3>After the award</h3>
            <p>
              Admission,
              <NuxtLink to="/service-details/counselling-and-visa-processing"
                >student visa processing</NuxtLink
              >, housing and pre-departure support, so your scholarship turns
              into a smooth start abroad.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 7: COMMON MISTAKES ================= -->
    <section class="ssp-section" aria-labelledby="ssp-mis-h">
      <div class="ssp-container">
        <div class="ssp-center">
          <span class="ssp-eyebrow"><i></i>Avoid these</span>
          <h2 class="ssp-h2" id="ssp-mis-h">
            Common Scholarship Mistakes <span>Bangladeshi Students Make</span>
          </h2>
          <p class="ssp-lead">
            Most rejected applications are not weak students. They are good
            students who made one of these avoidable mistakes.
          </p>
        </div>
        <div class="ssp-mistakes">
          <div class="ssp-mistake ssp-reveal">
            <i aria-hidden="true">1</i>
            <h3>Starting too late</h3>
            <p>
              Chevening and Commonwealth close in October for study the
              following year. Starting in spring usually means waiting another
              full year.
            </p>
          </div>
          <div class="ssp-mistake ssp-reveal">
            <i aria-hidden="true">2</i>
            <h3>Missing the nomination step</h3>
            <p>
              Stipendium Hungaricum and Commonwealth need a Bangladeshi
              nomination file as well as the online form. One without the other
              is rejected.
            </p>
          </div>
          <div class="ssp-mistake ssp-reveal">
            <i aria-hidden="true">3</i>
            <h3>Copy-paste essays</h3>
            <p>
              Committees read thousands of letters. Templates from the internet
              are easy to spot and rarely make the shortlist.
            </p>
          </div>
          <div class="ssp-mistake ssp-reveal">
            <i aria-hidden="true">4</i>
            <h3>Wrong university choices</h3>
            <p>
              For CSC, Türkiye Burslari and Erasmus Mundus, choosing programs
              that fit your background matters as much as your grades.
            </p>
          </div>
          <div class="ssp-mistake ssp-reveal">
            <i aria-hidden="true">5</i>
            <h3>Unprepared for the interview</h3>
            <p>
              Many strong files fail at the interview. Practise explaining your
              plan and your return to Bangladesh in clear, simple English.
            </p>
          </div>
          <div class="ssp-mistake ssp-reveal">
            <i aria-hidden="true">6</i>
            <h3>Trusting "guaranteed" offers</h3>
            <p>
              No agent can guarantee a government scholarship. Paying for a
              promise is how many families lose money.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 8: E-E-A-T ================= -->
    <section class="ssp-section ssp-list" aria-labelledby="ssp-trust-h">
      <div class="ssp-container">
        <span class="ssp-eyebrow"><i></i>About this guide</span>
        <h2 class="ssp-h2" id="ssp-trust-h">
          Who Prepared <span>This Guide</span>
        </h2>
        <div class="ssp-trust">
          <div class="ssp-author ssp-reveal">
            <div class="ssp-author-top">
              <span class="ssp-avatar" aria-hidden="true">AK</span>
              <div>
                <h3>Anisuzzaman Kiron</h3>
                <small>Founder &amp; CEO, Sunrise Education Consultants</small>
              </div>
            </div>
            <p>
              This guide is written by the Sunrise counselling team and reviewed
              by Anisuzzaman Kiron, who founded Sunrise Education Consultants in
              2014. Our counsellors in Banani, Dhaka, and Sylhet prepare
              scholarship, admission and visa files for Bangladeshi students
              every intake.
            </p>
            <p>
              We summarise each scholarship from its latest official call and
              link to the source, because rules and dates change every year. We
              never promise a scholarship.
              <NuxtLink class="ssp-link" to="/staff"
                >Meet our counsellors &rarr;</NuxtLink
              >
            </p>
            <div class="ssp-meta">
              <span>Last updated: 29 Sep 2026</span
              ><span>Next review: Jan 2027</span>
            </div>
          </div>
          <div class="ssp-sources ssp-reveal">
            <h3>Official sources we check</h3>
            <p>
              Confirm dates and rules on these official websites before you
              apply.
            </p>
            <ul>
              <li>
                <a
                  href="https://stipendiumhungaricum.hu/"
                  target="_blank"
                  rel="noopener"
                  >Stipendium Hungaricum (Tempus Public Foundation)</a
                >
              </li>
              <li>
                <a href="https://shed.gov.bd/" target="_blank" rel="noopener"
                  >Secondary and Higher Education Division, Ministry of
                  Education</a
                >
              </li>
              <li>
                <a href="https://ugc.gov.bd/" target="_blank" rel="noopener"
                  >University Grants Commission of Bangladesh</a
                >
              </li>
              <li>
                <a
                  href="https://www.campuschina.org/"
                  target="_blank"
                  rel="noopener"
                  >Campus China (CSC)</a
                >
              </li>
              <li>
                <a
                  href="https://www.turkiyeburslari.gov.tr/"
                  target="_blank"
                  rel="noopener"
                  >Türkiye Burslari</a
                >
              </li>
              <li>
                <a
                  href="https://www.studyinfinland.fi/"
                  target="_blank"
                  rel="noopener"
                  >Study in Finland</a
                >
              </li>
              <li>
                <a
                  href="https://erasmus-plus.ec.europa.eu/"
                  target="_blank"
                  rel="noopener"
                  >Erasmus+ (European Commission)</a
                >
              </li>
              <li>
                <a
                  href="https://www.chevening.org/scholarship/bangladesh/"
                  target="_blank"
                  rel="noopener"
                  >Chevening Bangladesh</a
                >
              </li>
              <li>
                <a
                  href="https://cscuk.fcdo.gov.uk/"
                  target="_blank"
                  rel="noopener"
                  >Commonwealth Scholarship Commission in the UK</a
                >
              </li>
              <li>
                <a
                  href="https://bd.usembassy.gov/"
                  target="_blank"
                  rel="noopener"
                  >U.S. Embassy Dhaka (Fulbright)</a
                >
              </li>
              <li>
                <a
                  href="https://australiaawardsbangladesh.org/"
                  target="_blank"
                  rel="noopener"
                  >Australia Awards Bangladesh</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 9: NEXT STEPS ================= -->
    <section class="ssp-section" aria-labelledby="ssp-next-h">
      <div class="ssp-container">
        <div class="ssp-center">
          <span class="ssp-eyebrow"><i></i>Keep planning</span>
          <h2 class="ssp-h2" id="ssp-next-h">
            Plan the Rest of <span>Your Journey</span>
          </h2>
        </div>
        <div class="ssp-next">
          <NuxtLink class="ssp-reveal" to="/study-abroad"
            ><h3>Choose your destination</h3>
            <p>
              Compare 15 countries by tuition level, English rules, intakes and
              post-study work.
            </p>
            <span>Compare destinations &rarr;</span></NuxtLink
          >
          <NuxtLink
            class="ssp-reveal"
            to="/service-details/university-admission-process"
            ><h3>Get your admission</h3>
            <p>
              Most scholarships need an offer or a strong application. See how
              our admission support works.
            </p>
            <span>University admission support &rarr;</span></NuxtLink
          >
          <NuxtLink class="ssp-reveal" to="/success-story"
            ><h3>Read student stories</h3>
            <p>
              See how Bangladeshi students reached universities abroad with
              Sunrise.
            </p>
            <span>Success stories &rarr;</span></NuxtLink
          >
        </div>
        <!-- SCHOLARSHIP GUIDES: add these links here (or on each card) once each blog is published:
             /blog/scholarships-without-ielts-bangladeshi-students  (anchor: "scholarships without IELTS")
             /blog/scholarships-in-malaysia-bangladeshi-students    (anchor: "scholarships in Malaysia")
             /blog/usa-scholarships-bangladeshi-undergraduate       (anchor: "US scholarships for undergraduates") -->
      </div>
    </section>

    <!-- ================= SECTION 10: FAQ ================= -->
    <section class="ssp-section ssp-faq" aria-labelledby="ssp-faq-h">
      <div class="ssp-container">
        <div class="ssp-center">
          <span class="ssp-eyebrow"><i></i>FAQ</span>
          <h2 class="ssp-h2" id="ssp-faq-h">
            Scholarships for Bangladeshi Students: <span>Common Questions</span>
          </h2>
          <p class="ssp-lead">
            Short answers to what Bangladeshi students and parents ask us most
            about scholarships.
          </p>
        </div>
        <div class="ssp-faq-list">
          <details v-for="(f, i) in faqs" :key="f.id" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <div @click="onProseClick" v-html="f.a"></div>
          </details>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 11: CTA ================= -->
    <section class="ssp-cta" aria-labelledby="ssp-cta-h">
      <div class="ssp-container">
        <h2 id="ssp-cta-h">Find Out Which Scholarships You Can Win</h2>
        <p>
          Book a free scholarship eligibility check. A Sunrise counsellor will
          review your results, English score and experience and give you a
          realistic shortlist with every deadline.
        </p>
        <div class="ssp-cta-row" style="justify-content: center; margin: 0">
          <NuxtLink class="ssp-btn ssp-btn-primary" to="/apply-now"
            >Check My Eligibility
            <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <a class="ssp-btn ssp-btn-ghost" href="tel:+8801911878274"
            >Call 01911 878 274</a
          >
        </div>
      </div>
    </section>
  </div>
</template>



<script setup>
const root = ref(null)
const router = useRouter()
const siteUrl = 'https://sunrise-bd.net/'
const pageUrl = siteUrl + 'scholarships'

/* ---------- Data ---------- */
const { data } = await useApi('/scholarships', { key: 'scholarships-list', transform: (r) => r.data })
const { data: faqData } = await useApi('/faqs', {
  key: 'faqs-scholarships',
  query: { group: 'scholarships' },
  transform: (r) => r.data,
})

const stripHtml = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const body = (t) =>
  /<[a-z][\s\S]*>/i.test(t || '')
    ? t
    : String(t || '').split(/\r?\n\s*\r?\n/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join('')
const fixLinks = (h) =>
  (h || '')
    .replace(/href="https?:\/\/(?:www\.)?sunrise-bd\.net\/?/gi, 'href="/')
    .replace(/<a\s+([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (m, a, href, b) =>
      /target=/i.test(a + b) ? m : `<a ${a}href="${href}"${b} target="_blank" rel="noopener">`)

const LEVEL_NAMES = { ba: 'BA', ma: 'MA', phd: 'PhD', moi: 'No IELTS' }
const FUNDING = { full: 'Fully funded', need: 'Need-based', partial: 'Partial' }

const list = computed(() =>
  (Array.isArray(data.value) ? data.value : []).map((s, i) => {
    const levels = Array.isArray(s.levels) ? s.levels : String(s.levels || '').split(/[\s,]+/).filter(Boolean)
    const funding = s.funding_type || 'full'
    const facts = Array.isArray(s.facts) && s.facts.length
      ? s.facts
      : [
          ['Covers', s.covers],
          ['Levels', s.levels_text],
          ['Applications', s.window],
          ['English', s.english],
        ].filter(([, v]) => v).map(([label, value]) => ({ label, value }))
    const url = s.link_url || ''
    return {
      id: s.id ?? i,
      slug: s.slug || `s-${s.id ?? i}`,
      short: s.short_name || s.name,
      name: s.name,
      country: s.country || '',
      code: s.country_code || (s.country || '').slice(0, 2).toUpperCase(),
      tag: s.tag || '',
      region: s.region || 'eu',
      funding,
      fundingLabel: s.funding_label || FUNDING[funding] || 'Fully funded',
      levels,
      levelsText: s.levels_text || levels.filter((l) => l !== 'moi').map((l) => LEVEL_NAMES[l] || l).join(', '),
      window: s.window || '',
      english: s.english || '',
      applyThrough: s.apply_through || '',
      facts,
      html: fixLinks(body(s.description)),
      link: {
        url,
        label: s.link_label || 'Learn more',
        internal: url.startsWith('/'),
      },
    }
  }),
)

const countryCount = computed(() => new Set(list.value.map((s) => s.country).filter(Boolean)).size)

/* ---------- Filter + read more ---------- */
const filter = ref('all')
const open = reactive({})
const tabs = [
  { key: 'all', label: 'All' },
  { key: 'ba', label: 'After HSC' },
  { key: 'ma', label: "Master's" },
  { key: 'phd', label: 'PhD' },
  { key: 'moi', label: 'Without IELTS' },
]
const counts = computed(() =>
  Object.fromEntries(
    tabs.map((t) => [t.key, t.key === 'all' ? list.value.length : list.value.filter((s) => s.levels.includes(t.key)).length]),
  ),
)
const shown = computed(() => (filter.value === 'all' ? list.value : list.value.filter((s) => s.levels.includes(filter.value))))

const jump = (s) => {
  filter.value = 'all'
  open[s.id] = true
  nextTick(() => document.getElementById(s.slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

/* ---------- FAQs (API group "scholarships") ---------- */
const faqs = computed(() =>
  (Array.isArray(faqData.value) ? faqData.value : []).map((f) => ({
    id: f.id,
    q: f.question,
    a: fixLinks(f.answer),
    text: f.answer_text || stripHtml(f.answer),
  })),
)

const onProseClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  const a = e.target.closest('a')
  const href = a?.getAttribute('href')
  if (href && href.startsWith('/') && !href.startsWith('//') && !a.target) {
    e.preventDefault()
    router.push(href)
  }
}

/* ---------- SEO ---------- */
useSeoMeta({
  title: 'Scholarships for Bangladeshi Students to Study Abroad',
  description:
    'Fully funded and partial scholarships for Bangladeshi students: Stipendium Hungaricum, CSC, Türkiye Burslari, DSU, Chevening and more, plus free help to apply.',
  robots: 'index, follow, max-image-preview:large',
  ogType: 'website',
  ogTitle: 'Scholarships for Bangladeshi Students to Study Abroad',
  ogDescription: () => `${list.value.length} major scholarships compared for Bangladeshi students, with an application calendar, eligibility rules and free application help from Sunrise.`,
  ogUrl: pageUrl,
  ogSiteName: 'Sunrise Education Consultants',
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
              { '@type': 'ListItem', position: 2, name: 'Scholarships', item: pageUrl },
            ],
          },
          {
            '@type': 'CollectionPage',
            '@id': pageUrl + '#page',
            url: pageUrl,
            name: 'Scholarships for Bangladeshi Students to Study Abroad',
            inLanguage: 'en',
            publisher: { '@type': 'EducationalOrganization', '@id': siteUrl + '#organization', name: 'Sunrise Education Consultants', url: siteUrl },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: list.value.length,
              itemListElement: list.value.map((s, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'MonetaryGrant',
                  name: s.name,
                  ...(s.link.url && !s.link.internal ? { url: s.link.url } : {}),
                  ...(s.country ? { funder: { '@type': 'Organization', name: s.country } } : {}),
                },
              })),
            },
          },
          ...(faqs.value.length
            ? [{
                '@type': 'FAQPage',
                mainEntity: faqs.value.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.text },
                })),
              }]
            : []),
        ],
      }).replace(/</g, '\\u003c'),
    },
  ],
}))

/* ---------- Reveal on scroll ---------- */
let io = null
onMounted(() => {
  const els = root.value?.querySelectorAll('.ssp-reveal') || []
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
  } else els.forEach((el) => el.classList.add('is-in'))
})
onBeforeUnmount(() => io?.disconnect())
</script>
