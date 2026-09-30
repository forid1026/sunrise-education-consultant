<template>
  <div ref="root" class="srp">
    <!-- ================= SECTION 1: HERO ================= -->
    <section class="srp-hero" aria-labelledby="srp-h1">
      <div class="srp-hero-rays" aria-hidden="true"></div>
      <div class="srp-container">
        <nav class="srp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Resources</span>
        </nav>
        <div class="srp-hero-grid">
          <div>
            <span class="srp-eyebrow"><i></i>Free guides and tools</span>
            <h1 class="srp-h1" id="srp-h1">
              Study Abroad Resources <span>for Bangladeshi Students</span>
            </h1>
            <p class="srp-sub">
              Everything you need to plan your study abroad journey in one
              place: a budget calculator in BDT, a timeline planner for your
              intake, a document checklist, visa interview practice, a glossary
              of confusing terms and links to every official website. All free,
              built by the counsellors at
              <NuxtLink to="/">Sunrise Education Consultants</NuxtLink> from
              what Bangladeshi students ask us every day.
            </p>
            <div class="srp-cta-row">
              <a class="srp-btn srp-btn-primary" href="#srp-budget"
                >Calculate My Budget <span aria-hidden="true">&rarr;</span></a
              >
              <a class="srp-btn srp-btn-ghost" href="#srp-checklist"
                >Open Document Checklist</a
              >
            </div>
            <div class="srp-byline">
              <span class="srp-avatar" aria-hidden="true">AK</span>
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
          <aside class="srp-answer" aria-labelledby="srp-quick">
            <h2 id="srp-quick">Quick answer: where should I start?</h2>
            <p>
              Follow these five steps in order. Each one links to the tool or
              guide you need.
            </p>
            <ul class="srp-picks">
              <li>
                <a href="#srp-library"
                  >Choose your country <small>Guides</small></a
                >
              </li>
              <li>
                <a href="#srp-budget"
                  >Check your budget in BDT <small>Calculator</small></a
                >
              </li>
              <li>
                <a href="#srp-timeline"
                  >Plan back from your intake <small>Planner</small></a
                >
              </li>
              <li>
                <a href="#srp-checklist"
                  >Collect your documents <small>Checklist</small></a
                >
              </li>
              <li>
                <a href="#srp-official"
                  >Apply on official sites <small>Links</small></a
                >
              </li>
            </ul>
          </aside>
        </div>
        <div class="srp-stats">
          <div class="srp-stat"><b>9</b><small>In-depth guides</small></div>
          <div class="srp-stat">
            <b>3</b><small>Free interactive tools</small>
          </div>
          <div class="srp-stat">
            <b>18</b><small>Study abroad terms explained</small>
          </div>
          <div class="srp-stat">
            <b>25+</b><small>Official websites listed</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 2: RESOURCE LIBRARY ================= -->
    <section
      class="srp-section srp-lib"
      id="srp-library"
      aria-labelledby="srp-lib-h"
    >
      <div class="srp-container">
        <span class="srp-eyebrow"><i></i>Resource library</span>
        <h2 class="srp-h2" id="srp-lib-h">
          Study Abroad Guides <span>by Topic</span>
        </h2>
        <p class="srp-lead">
          Our most useful guides, grouped by the stage you are at. Each card
          tells you what the guide covers and when to use it, so you can go
          straight to the one you need.
        </p>

        <div
          class="srp-tabs"
          role="tablist"
          aria-label="Filter guides by topic"
        >
          <button
            class="srp-tab is-active"
            data-f="all"
            role="tab"
            aria-selected="true"
          >
            All <span>9</span>
          </button>
          <button
            class="srp-tab"
            data-f="plan"
            role="tab"
            aria-selected="false"
          >
            Planning <span>2</span>
          </button>
          <button
            class="srp-tab"
            data-f="money"
            role="tab"
            aria-selected="false"
          >
            Cost &amp; Funding <span>3</span>
          </button>
          <button
            class="srp-tab"
            data-f="visa"
            role="tab"
            aria-selected="false"
          >
            Visa <span>3</span>
          </button>
          <button
            class="srp-tab"
            data-f="story"
            role="tab"
            aria-selected="false"
          >
            Stories <span>1</span>
          </button>
        </div>

        <div class="srp-grid">
          <!-- 1 DESTINATIONS -->
          <article class="srp-card srp-reveal" data-t="plan">
            <div class="srp-card-top c-plan">
              <span class="srp-type">Planning</span>
              <svg
                class="srp-card-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
                />
              </svg>
              <h3>Compare 15 Study Destinations</h3>
            </div>
            <div class="srp-card-body">
              <ul class="srp-facts">
                <li>Best for<b>Choosing a country</b></li>
                <li>Includes<b>Comparison table</b></li>
              </ul>
              <div class="srp-desc">
                <p>
                  Start here if you have not chosen a country yet. Our
                  destination hub compares 15 countries where Bangladeshi
                  students study, from low-tuition Italy, Hungary and Turkey to
                  career-focused Canada, the USA and Australia.
                </p>
                <p>
                  For each country you see the typical tuition level, living
                  cost, English requirement (including where an MOI certificate
                  is accepted), main intakes, the key scholarship and post-study
                  work rights. A goal-based section also groups countries by
                  what matters most to you, such as the lowest total cost, fully
                  funded scholarships or English-speaking Europe.
                </p>
                <p>
                  Use it to narrow your list to two or three countries, then
                  open each full country guide before you book a free
                  assessment.
                </p>
              </div>
              <button class="srp-more" aria-expanded="false">Read more</button>
              <NuxtLink class="srp-card-link" to="/study-abroad"
                >Study abroad destinations for Bangladeshi students
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
            </div>
          </article>

          <!-- 2 BLOG -->
          <article class="srp-card srp-reveal" data-t="plan">
            <div class="srp-card-top c-plan">
              <span class="srp-type">Planning</span>
              <svg
                class="srp-card-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <path d="M4 4h12l4 4v12H4z" />
                <path d="M8 10h8M8 14h8M8 18h5" />
              </svg>
              <h3>Study Abroad Blog</h3>
            </div>
            <div class="srp-card-body">
              <ul class="srp-facts">
                <li>Best for<b>Detailed answers</b></li>
                <li>Topics<b>Visa, cost, scholarships</b></li>
              </ul>
              <div class="srp-desc">
                <p>
                  Our blog is where Sunrise counsellors answer the detailed
                  questions that come up in real counselling sessions: how a
                  specific visa works, what a university really costs, which
                  documents trip students up and what changed this year.
                </p>
                <p>
                  Posts are organised by country and topic, written for
                  Bangladeshi students and families, and show the author,
                  reviewer and last update date. Costs are shown in local
                  currency and in BDT wherever possible, so you can plan with
                  real numbers.
                </p>
                <p>
                  Use the blog when you already know your destination and need
                  one specific answer, such as tuition fees at a certain
                  university or the processing time for a certain visa.
                </p>
              </div>
              <button class="srp-more" aria-expanded="false">Read more</button>
              <NuxtLink class="srp-card-link" to="/blog"
                >Study abroad blog for Bangladeshi students
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
            </div>
          </article>

          <!-- 3 COST GUIDE -->
          <article class="srp-card srp-reveal" data-t="money">
            <div class="srp-card-top c-money">
              <span class="srp-type">Cost &amp; Funding</span>
              <svg
                class="srp-card-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M15 9a3 3 0 0 0-3-2c-2 0-3 1-3 2.5S10 12 12 12s3 1 3 2.5S14 17 12 17a3 3 0 0 1-3-2M12 5v2M12 17v2"
                />
              </svg>
              <h3>Cost of Studying Abroad: 2027 Budget Guide</h3>
            </div>
            <div class="srp-card-body">
              <ul class="srp-facts">
                <li>Best for<b>Setting your budget</b></li>
                <li>Countries<b>Italy, USA, UK, CA, AU</b></li>
              </ul>
              <div class="srp-desc">
                <p>
                  This guide breaks down the full yearly cost of studying in
                  Italy, the United States, the United Kingdom, Canada and
                  Australia for the 2027 intake, with an at-a-glance table that
                  compares total annual costs side by side.
                </p>
                <p>
                  Beyond tuition and rent, it lists the hidden costs Bangladeshi
                  students often forget, such as visa fees, health insurance,
                  document attestation and the first months before part-time
                  work starts, and explains which country is the most affordable
                  for different budgets.
                </p>
                <p>
                  Read it together with the budget calculator on this page: the
                  guide gives you typical figures, and the calculator turns your
                  own university's figures into a first-year total in BDT.
                </p>
              </div>
              <button class="srp-more" aria-expanded="false">Read more</button>
              <NuxtLink
                class="srp-card-link"
                to="/blog/cost-of-studying-abroad-from-bangladesh-2027-budget-guide"
                >Cost of studying abroad from Bangladesh
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
            </div>
          </article>

          <!-- 4 SCHOLARSHIPS -->
          <article class="srp-card srp-reveal" data-t="money">
            <div class="srp-card-top c-money">
              <span class="srp-type">Cost &amp; Funding</span>
              <svg
                class="srp-card-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <circle cx="12" cy="9" r="6" />
                <path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" />
              </svg>
              <h3>Scholarships Guide</h3>
            </div>
            <div class="srp-card-body">
              <ul class="srp-facts">
                <li>Best for<b>Funding your degree</b></li>
                <li>Includes<b>Deadline calendar</b></li>
              </ul>
              <div class="srp-desc">
                <p>
                  Our scholarships guide compares the 10 scholarships
                  Bangladeshi students apply for most, including Stipendium
                  Hungaricum, the Chinese Government Scholarship, Türkiye
                  Burslari, Italy's DSU, Chevening and Fulbright.
                </p>
                <p>
                  Each scholarship shows what it covers, who can apply, when
                  applications open and whether you need IELTS. A calendar shows
                  which scholarships close in which months, and a country table
                  lists the partial scholarships and tuition waivers
                  universities offer.
                </p>
                <p>
                  Check it 10 to 12 months before your intake, because the
                  biggest government scholarships close long before the
                  admission season starts.
                </p>
              </div>
              <button class="srp-more" aria-expanded="false">Read more</button>
              <NuxtLink class="srp-card-link" to="/scholarships"
                >Scholarships for Bangladeshi students
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
            </div>
          </article>

          <!-- 5 ITALY FEES -->
          <article class="srp-card srp-reveal" data-t="money">
            <div class="srp-card-top c-money">
              <span class="srp-type">Cost &amp; Funding</span>
              <svg
                class="srp-card-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <path d="m12 3 10 5-10 5L2 8l10-5Z" />
                <path d="M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
              </svg>
              <h3>Italy Public University Tuition Fees</h3>
            </div>
            <div class="srp-card-body">
              <ul class="srp-facts">
                <li>Best for<b>Italy applicants</b></li>
                <li>Includes<b>ISEE brackets</b></li>
              </ul>
              <div class="srp-desc">
                <p>
                  Italy is one of the most popular choices for Bangladeshi
                  students because public tuition depends on family income
                  rather than a flat international fee. This guide explains how
                  that system actually works.
                </p>
                <p>
                  It lists public university tuition fees by institution,
                  explains the ISEE income brackets, compares private university
                  fees and covers the mandatory extra fees that many students
                  miss. It also combines tuition and living costs in EUR and
                  BDT, and shows how to qualify for the lowest ISEE bracket
                  without missing the deadline.
                </p>
                <p>
                  Use it before you shortlist Italian universities, so you know
                  what you will really pay in your first and later years.
                </p>
              </div>
              <button class="srp-more" aria-expanded="false">Read more</button>
              <NuxtLink
                class="srp-card-link"
                to="/blog/italy-public-university-tuition-fees-2026"
                >Italy public university tuition fees
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
            </div>
          </article>

          <!-- 6 INTERVIEW QUESTIONS -->
          <article class="srp-card srp-reveal" data-t="visa">
            <div class="srp-card-top c-visa">
              <span class="srp-type">Visa</span>
              <svg
                class="srp-card-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <path d="M4 5h16v11H8l-4 4z" />
                <path d="M9 9h6M9 12h4" />
              </svg>
              <h3>Visa Interview Questions and Answers</h3>
            </div>
            <div class="srp-card-body">
              <ul class="srp-facts">
                <li>Best for<b>Interview practice</b></li>
                <li>Includes<b>Sample answers</b></li>
              </ul>
              <div class="srp-desc">
                <p>
                  Many good students lose their visa at the interview, not
                  because of their documents, but because they cannot explain
                  their plan clearly. This guide collects the questions embassy
                  officers ask Bangladeshi student visa applicants most often.
                </p>
                <p>
                  Questions are grouped into basic questions about you and your
                  course, technical questions about your university, costs and
                  sponsor, and the harder questions officers use to test whether
                  you are a genuine student. Sample answers show the kind of
                  specific, honest reply that works.
                </p>
                <p>
                  Practise the answers out loud in English a few weeks before
                  your interview, and book a mock interview with a Sunrise
                  counsellor if you want feedback.
                </p>
              </div>
              <button class="srp-more" aria-expanded="false">Read more</button>
              <NuxtLink
                class="srp-card-link"
                to="/embassy-interview-questions-answer"
                >Student visa interview questions and answers
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
            </div>
          </article>

          <!-- 7 PROCESSING TIME -->
          <article class="srp-card srp-reveal" data-t="visa">
            <div class="srp-card-top c-visa">
              <span class="srp-type">Visa</span>
              <svg
                class="srp-card-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l3 2M9 2h6" />
              </svg>
              <h3>Visa Processing Time by Country</h3>
            </div>
            <div class="srp-card-body">
              <ul class="srp-facts">
                <li>Best for<b>Timing your visa</b></li>
                <li>Countries<b>Italy, USA, UK, CA, AU</b></li>
              </ul>
              <div class="srp-desc">
                <p>
                  A late visa can cost you a whole intake. This guide compares
                  student visa processing times side by side for Italy's Type D
                  visa, the US F-1 visa, the UK Student visa, Canada's study
                  permit and Australia's Subclass 500 visa.
                </p>
                <p>
                  It explains why processing times vary so much, what speeds up
                  or delays an application, and gives a recommended application
                  timeline for each country. It also covers what to do if your
                  visa decision is delayed close to your start date.
                </p>
                <p>
                  Use it with the timeline planner on this page to decide the
                  latest safe month to submit your visa application.
                </p>
              </div>
              <button class="srp-more" aria-expanded="false">Read more</button>
              <NuxtLink
                class="srp-card-link"
                to="/blog/student-visa-processing-time-by-country"
                >Student visa processing time by country
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
            </div>
          </article>

          <!-- 8 UK VISA & FEES -->
          <article class="srp-card srp-reveal" data-t="visa">
            <div class="srp-card-top c-visa">
              <span class="srp-type">Visa</span>
              <svg
                class="srp-card-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>
              <h3>UK Student Visa and Tuition Fees</h3>
            </div>
            <div class="srp-card-body">
              <ul class="srp-facts">
                <li>Best for<b>UK applicants</b></li>
                <li>Includes<b>28-day funds rule</b></li>
              </ul>
              <div class="srp-desc">
                <p>
                  The UK has one of the most detailed student visa systems, and
                  costs change often. This guide explains current UK Student
                  visa fees, tuition fees by course level and the financial
                  requirement, including the 28-day rule for bank funds.
                </p>
                <p>
                  It combines every cost into a realistic total in GBP and BDT,
                  explains what is changing with the Graduate Route, lists
                  scholarships that can reduce the cost and walks through the UK
                  Student visa application step by step.
                </p>
                <p>
                  Read it before you accept a UK offer, so your family can
                  prepare the right amount of money for the right length of
                  time.
                </p>
              </div>
              <button class="srp-more" aria-expanded="false">Read more</button>
              <NuxtLink
                class="srp-card-link"
                to="/blog/uk-student-visa-tuition-fees-2026"
                >UK student visa and tuition fees
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
            </div>
          </article>

          <!-- 9 SUCCESS STORIES -->
          <article class="srp-card srp-reveal" data-t="story">
            <div class="srp-card-top c-story">
              <span class="srp-type">Stories</span>
              <svg
                class="srp-card-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <path
                  d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"
                />
              </svg>
              <h3>Student Success Stories</h3>
            </div>
            <div class="srp-card-body">
              <ul class="srp-facts">
                <li>Best for<b>Real examples</b></li>
                <li>From<b>Sunrise students</b></li>
              </ul>
              <div class="srp-desc">
                <p>
                  Sometimes the most useful resource is someone who has already
                  done it. Our success stories share the journeys of Bangladeshi
                  students who reached universities abroad with Sunrise.
                </p>
                <p>
                  Each story shows the country, university and intake, and many
                  include the challenges the student faced along the way, from a
                  study gap to a previous refusal, and how they solved them.
                  Stories are shared with each student's permission.
                </p>
                <p>
                  Read stories from students with a profile like yours to see
                  what is realistic for your own results and budget.
                </p>
              </div>
              <button class="srp-more" aria-expanded="false">Read more</button>
              <NuxtLink class="srp-card-link" to="/success-story"
                >Student visa success stories
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 3: BUDGET CALCULATOR ================= -->
    <section class="srp-section" id="srp-budget" aria-labelledby="srp-budget-h">
      <div class="srp-container">
        <span class="srp-eyebrow"><i></i>Free tool</span>
        <h2 class="srp-h2" id="srp-budget-h">
          Study Abroad Budget Calculator <span>in BDT</span>
        </h2>
        <p class="srp-lead">
          Enter the figures from your university's website and today's exchange
          rate from your bank. The calculator shows your first-year cost in
          Bangladeshi Taka, which is also the amount most embassies expect you
          to prove.
        </p>
        <div class="srp-tool">
          <form
            class="srp-panel"
            id="srp-calc"
            @submit.prevent
            aria-label="Budget calculator"
          >
            <div class="srp-row2">
              <div class="srp-field">
                <label for="c-cur">Currency</label>
                <select id="c-cur">
                  <option value="EUR" data-r="140">
                    EUR (Italy, Malta, Finland, Cyprus, Greece)
                  </option>
                  <option value="USD" data-r="122">USD (USA)</option>
                  <option value="GBP" data-r="163">GBP (UK)</option>
                  <option value="CAD" data-r="88">CAD (Canada)</option>
                  <option value="AUD" data-r="80">AUD (Australia)</option>
                  <option value="MYR" data-r="28">MYR (Malaysia)</option>
                  <option value="CNY" data-r="17">CNY (China)</option>
                  <option value="HUF" data-r="0.35">HUF (Hungary)</option>
                  <option value="NOK" data-r="11">NOK (Norway)</option>
                  <option value="TRY" data-r="3">TRY (Turkey)</option>
                </select>
              </div>
              <div class="srp-field">
                <label for="c-rate">1 unit = BDT</label
                ><input
                  id="c-rate"
                  type="number"
                  min="0"
                  step="0.01"
                  inputmode="decimal"
                  value="140"
                /><small
                  >Example rate. Replace it with today's rate from your
                  bank.</small
                >
              </div>
            </div>
            <div class="srp-row2">
              <div class="srp-field">
                <label for="c-tui">Tuition per year</label
                ><input
                  id="c-tui"
                  type="number"
                  min="0"
                  step="1"
                  inputmode="decimal"
                  value="3000"
                />
              </div>
              <div class="srp-field">
                <label for="c-sch">Scholarship or waiver (%)</label
                ><input
                  id="c-sch"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  inputmode="numeric"
                  value="0"
                />
              </div>
            </div>
            <div class="srp-row2">
              <div class="srp-field">
                <label for="c-liv">Living cost per month</label
                ><input
                  id="c-liv"
                  type="number"
                  min="0"
                  step="1"
                  inputmode="decimal"
                  value="700"
                /><small>Rent, food, transport and phone.</small>
              </div>
              <div class="srp-field">
                <label for="c-mon">Months</label
                ><input
                  id="c-mon"
                  type="number"
                  min="1"
                  max="24"
                  step="1"
                  inputmode="numeric"
                  value="12"
                />
              </div>
            </div>
            <div class="srp-field">
              <label for="c-one">One-time costs in BDT</label
              ><input
                id="c-one"
                type="number"
                min="0"
                step="1000"
                inputmode="decimal"
                value="150000"
              /><small
                >Visa and application fees, flight, insurance, attestation and
                first-month setup.</small
              >
            </div>
            <small style="font-size: 12.5px; color: var(--sec-slate)"
              >Values shown are examples only. Enter your own figures.</small
            >
          </form>
          <div class="srp-result" aria-live="polite">
            <h3>Estimated first-year cost</h3>
            <p class="srp-big" id="r-total">BDT 0</p>
            <p class="srp-sub2" id="r-month">About BDT 0 per month</p>
            <ul class="srp-lines">
              <li>Tuition after scholarship <b id="r-tui">0</b></li>
              <li>Living costs <b id="r-liv">0</b></li>
              <li>One-time costs <b id="r-one">BDT 0</b></li>
              <li>Total in foreign currency <b id="r-fx">0</b></li>
            </ul>
            <p class="srp-disclaim">
              This is an estimate for planning, not financial advice. Embassies
              set their own proof-of-funds rules, so confirm the exact amount
              for your country. Compare typical figures in our
              <NuxtLink
                to="/blog/cost-of-studying-abroad-from-bangladesh-2027-budget-guide"
                >2027 cost guide</NuxtLink
              >.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 4: TIMELINE PLANNER ================= -->
    <section
      class="srp-section srp-lib"
      id="srp-timeline"
      aria-labelledby="srp-tl-h"
    >
      <div class="srp-container">
        <span class="srp-eyebrow"><i></i>Free tool</span>
        <h2 class="srp-h2" id="srp-tl-h">
          Study Abroad Timeline Planner <span>for Your Intake</span>
        </h2>
        <p class="srp-lead">
          Choose the month and year you want to start. The planner works
          backwards and shows when each step should happen, so you never miss a
          scholarship, application or visa deadline.
        </p>
        <div class="srp-tool">
          <div class="srp-panel">
            <div class="srp-row2">
              <div class="srp-field">
                <label for="t-mon">Intake month</label>
                <select id="t-mon">
                  <option value="0">January</option>
                  <option value="1">February</option>
                  <option value="2">March</option>
                  <option value="6">July</option>
                  <option value="8" selected>September</option>
                  <option value="9">October</option>
                </select>
              </div>
              <div class="srp-field">
                <label for="t-yr">Intake year</label>
                <select id="t-yr">
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                </select>
              </div>
            </div>
            <p
              style="
                font-size: 14.5px;
                line-height: 1.75;
                color: var(--sec-slate);
                margin: 6px 0 0;
              "
            >
              September and October are the main intakes in Europe, the UK and
              North America. Canada, the USA, the UK and Malaysia also run
              January intakes, and Australia and New Zealand start in February
              and July. Some government scholarships close even earlier than
              this plan shows, so check the scholarship calendar too.
            </p>
          </div>
          <div class="srp-result" aria-live="polite">
            <h3>
              Your plan for
              <span id="t-label" style="color: #fff">September 2027</span>
            </h3>
            <ol class="srp-plan" id="t-plan" style="margin-top: 16px"></ol>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 5: DOCUMENT CHECKLIST ================= -->
    <section class="srp-section" id="srp-checklist" aria-labelledby="srp-ck-h">
      <div class="srp-container">
        <span class="srp-eyebrow"><i></i>Free tool</span>
        <h2 class="srp-h2" id="srp-ck-h">
          Study Abroad Document Checklist <span>for Bangladeshi Students</span>
        </h2>
        <p class="srp-lead">
          Tick each document as you collect it. Your progress is saved in this
          browser only. Embassies and universities differ, so your Sunrise
          counsellor will give you a final list for your exact country.
        </p>
        <div class="srp-progress">
          <div class="srp-bar" aria-hidden="true"><i id="ck-bar"></i></div>
          <b id="ck-count">0 of 0 ready</b>
        </div>
        <div class="srp-checks" id="ck-list">
          <fieldset class="srp-group">
            <legend><h3>Identity</h3></legend>
            <label
              ><input type="checkbox" data-k="passport" /><span
                >Passport valid for your full study period</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="nid" /><span
                >NID or birth certificate</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="photos" /><span
                >Passport photos to the embassy's size rules</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="pcc" /><span
                >Police clearance certificate, if required</span
              ></label
            >
          </fieldset>
          <fieldset class="srp-group">
            <legend><h3>Academic</h3></legend>
            <label
              ><input type="checkbox" data-k="ssc" /><span
                >SSC certificate and marksheet</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="hsc" /><span
                >HSC certificate and marksheet</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="ba" /><span
                >Bachelor's certificate and transcript (master's
                applicants)</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="attest" /><span
                >Attestation: Board or university, Ministry of Education,
                MOFA</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="eng" /><span
                >IELTS, PTE, TOEFL or Duolingo score, or MOI certificate</span
              ></label
            >
          </fieldset>
          <fieldset class="srp-group">
            <legend><h3>Application</h3></legend>
            <label
              ><input type="checkbox" data-k="sop" /><span
                >Statement of purpose (SOP) or motivation letter</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="cv" /><span
                >Academic CV</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="lor" /><span
                >Two recommendation letters (LOR)</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="offer" /><span
                >Offer letter, CAS, I-20 or LOA</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="dov" /><span
                >CIMEA statement or Declaration of Value (Italy)</span
              ></label
            >
          </fieldset>
          <fieldset class="srp-group">
            <legend><h3>Finance</h3></legend>
            <label
              ><input type="checkbox" data-k="solv" /><span
                >Bank solvency certificate</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="stmt" /><span
                >Bank statements for the embassy's required period</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="income" /><span
                >Sponsor income proof: tax return, trade licence or salary
                certificate</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="sponsor" /><span
                >Sponsor letter or affidavit</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="file" /><span
                >Student file opened with your bank</span
              ></label
            >
          </fieldset>
          <fieldset class="srp-group">
            <legend><h3>Visa and travel</h3></legend>
            <label
              ><input type="checkbox" data-k="fee" /><span
                >Tuition deposit receipt</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="ins" /><span
                >Health insurance</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="acc" /><span
                >Accommodation proof</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="med" /><span
                >Medical test, if required</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="visa" /><span
                >Visa approved</span
              ></label
            >
            <label
              ><input type="checkbox" data-k="flight" /><span
                >Flight ticket and original documents folder</span
              ></label
            >
          </fieldset>
          <div
            class="srp-group"
            style="background: var(--sec-gold-bg); border-color: transparent"
          >
            <h3>Not sure what your embassy needs?</h3>
            <p
              style="
                margin: 0 0 14px;
                font-size: 14.5px;
                line-height: 1.7;
                color: var(--sec-slate);
              "
            >
              Every embassy has its own list. Our counsellors build an exact,
              written checklist for your country during your visa file
              preparation.
            </p>
            <NuxtLink
              class="srp-btn srp-btn-primary"
              style="padding: 12px 20px; font-size: 14px"
              to="/service-details/counselling-and-visa-processing"
              >Student visa processing
              <span aria-hidden="true">&rarr;</span></NuxtLink
            >
          </div>
        </div>
        <div class="srp-tools-row">
          <button class="srp-small-btn" type="button" id="ck-print">
            Print checklist
          </button>
          <button class="srp-small-btn" type="button" id="ck-reset">
            Clear all ticks
          </button>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 6: OFFICIAL LINKS ================= -->
    <section
      class="srp-section srp-lib"
      id="srp-official"
      aria-labelledby="srp-off-h"
    >
      <div class="srp-container">
        <span class="srp-eyebrow"><i></i>Official websites</span>
        <h2 class="srp-h2" id="srp-off-h">
          Official Study Abroad Links <span>in One Place</span>
        </h2>
        <p class="srp-lead">
          Always apply, pay and check rules on official websites. These are the
          ones Bangladeshi students use most, checked by our team.
        </p>
        <div class="srp-links">
          <div class="srp-linkcol srp-reveal">
            <h3><i></i>Bangladesh</h3>
            <ul>
              <li>
                <a href="https://mofa.gov.bd/" target="_blank" rel="noopener"
                  >Ministry of Foreign Affairs (attestation)</a
                >
              </li>
              <li>
                <a href="https://shed.gov.bd/" target="_blank" rel="noopener"
                  >Secondary and Higher Education Division</a
                >
              </li>
              <li>
                <a href="https://ugc.gov.bd/" target="_blank" rel="noopener"
                  >University Grants Commission</a
                >
              </li>
              <li>
                <a href="https://www.bb.org.bd/" target="_blank" rel="noopener"
                  >Bangladesh Bank</a
                >
              </li>
              <li>
                <a href="https://www.dip.gov.bd/" target="_blank" rel="noopener"
                  >Department of Immigration and Passports</a
                >
              </li>
              <li>
                <a
                  href="https://pcc.police.gov.bd/"
                  target="_blank"
                  rel="noopener"
                  >Police clearance certificate</a
                >
              </li>
            </ul>
          </div>
          <div class="srp-linkcol srp-reveal">
            <h3><i></i>English tests</h3>
            <ul>
              <li>
                <a
                  href="https://www.britishcouncil.org.bd/en/exam/ielts"
                  target="_blank"
                  rel="noopener"
                  >IELTS: British Council Bangladesh</a
                >
              </li>
              <li>
                <a
                  href="https://ielts.idp.com/bangladesh"
                  target="_blank"
                  rel="noopener"
                  >IELTS: IDP Bangladesh</a
                >
              </li>
              <li>
                <a
                  href="https://www.ets.org/toefl.html"
                  target="_blank"
                  rel="noopener"
                  >TOEFL iBT (ETS)</a
                >
              </li>
              <li>
                <a
                  href="https://www.pearsonpte.com/"
                  target="_blank"
                  rel="noopener"
                  >PTE Academic</a
                >
              </li>
              <li>
                <a
                  href="https://englishtest.duolingo.com/"
                  target="_blank"
                  rel="noopener"
                  >Duolingo English Test</a
                >
              </li>
            </ul>
          </div>
          <div class="srp-linkcol srp-reveal">
            <h3><i></i>Application portals</h3>
            <ul>
              <li>
                <a
                  href="https://www.universitaly.it/"
                  target="_blank"
                  rel="noopener"
                  >Universitaly (Italy)</a
                >
              </li>
              <li>
                <a href="https://studyinfo.fi/" target="_blank" rel="noopener"
                  >Studyinfo (Finland)</a
                >
              </li>
              <li>
                <a href="https://www.ucas.com/" target="_blank" rel="noopener"
                  >UCAS (UK)</a
                >
              </li>
              <li>
                <a
                  href="https://stipendiumhungaricum.hu/"
                  target="_blank"
                  rel="noopener"
                  >Stipendium Hungaricum</a
                >
              </li>
              <li>
                <a
                  href="https://www.campuschina.org/"
                  target="_blank"
                  rel="noopener"
                  >Campus China</a
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
                  href="https://visa.educationmalaysia.gov.my/"
                  target="_blank"
                  rel="noopener"
                  >EMGS (Malaysia)</a
                >
              </li>
            </ul>
          </div>
          <div class="srp-linkcol srp-reveal">
            <h3><i></i>Visa authorities</h3>
            <ul>
              <li>
                <a
                  href="https://www.vfsglobal.com/"
                  target="_blank"
                  rel="noopener"
                  >VFS Global</a
                >
              </li>
              <li>
                <a
                  href="https://vistoperitalia.esteri.it/"
                  target="_blank"
                  rel="noopener"
                  >Visa for Italy</a
                >
              </li>
              <li>
                <a
                  href="https://bd.usembassy.gov/"
                  target="_blank"
                  rel="noopener"
                  >U.S. Embassy Dhaka</a
                >
              </li>
              <li>
                <a
                  href="https://www.gov.uk/student-visa"
                  target="_blank"
                  rel="noopener"
                  >UK Student visa (GOV.UK)</a
                >
              </li>
              <li>
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship.html"
                  target="_blank"
                  rel="noopener"
                  >IRCC Canada</a
                >
              </li>
              <li>
                <a
                  href="https://immi.homeaffairs.gov.au/"
                  target="_blank"
                  rel="noopener"
                  >Australia Home Affairs</a
                >
              </li>
              <li>
                <a
                  href="https://www.immigration.govt.nz/"
                  target="_blank"
                  rel="noopener"
                  >Immigration New Zealand</a
                >
              </li>
              <li>
                <a
                  href="https://migri.fi/en/home"
                  target="_blank"
                  rel="noopener"
                  >Migri (Finland)</a
                >
              </li>
              <li>
                <a href="https://www.udi.no/en/" target="_blank" rel="noopener"
                  >UDI (Norway)</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 7: GLOSSARY ================= -->
    <section class="srp-section" id="srp-glossary" aria-labelledby="srp-gl-h">
      <div class="srp-container">
        <div class="srp-center">
          <span class="srp-eyebrow"><i></i>Glossary</span>
          <h2 class="srp-h2" id="srp-gl-h">
            Study Abroad Terms <span>Explained Simply</span>
          </h2>
          <p class="srp-lead">
            The words you will see on university, scholarship and visa websites,
            explained in plain English.
          </p>
        </div>
        <dl class="srp-gloss">
          <div class="srp-term srp-reveal">
            <dt>MOI certificate</dt>
            <dd>
              A Medium of Instruction certificate from your university
              confirming that your degree was taught in English. Some
              universities accept it instead of IELTS.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>SOP</dt>
            <dd>
              Statement of Purpose: a personal essay explaining your academic
              background, why you chose the course and country, and your career
              plan.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>LOR</dt>
            <dd>
              Letter of Recommendation: a reference letter from a teacher or
              employer supporting your application.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>Attestation</dt>
            <dd>
              Official verification of your certificates by the Education Board
              or university, the Ministry of Education and the Ministry of
              Foreign Affairs (MOFA) of Bangladesh, when a university or embassy
              asks for it.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>Bank solvency certificate</dt>
            <dd>
              A letter from a bank confirming the balance available in the
              student's or sponsor's account, used as proof of funds for a
              student visa.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>Student file</dt>
            <dd>
              A file opened with an authorised dealer bank in Bangladesh that
              allows tuition and living costs to be sent abroad for a student
              under Bangladesh Bank foreign exchange rules.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>CAS</dt>
            <dd>
              Confirmation of Acceptance for Studies: an electronic reference
              number issued by a UK university that you need to apply for a UK
              Student visa.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>I-20</dt>
            <dd>
              A form issued by a US school certified by SEVP that confirms your
              admission and funding and lets you apply for an F-1 student visa.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>SEVIS fee</dt>
            <dd>
              The I-901 SEVIS fee that most F-1 applicants must pay before their
              US visa interview.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>LOA</dt>
            <dd>
              Letter of Acceptance from a Canadian designated learning
              institution, required for a Canadian study permit application.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>PGWP</dt>
            <dd>
              Post-Graduation Work Permit: an open work permit that lets
              eligible graduates of Canadian institutions work in Canada after
              their studies.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>OPT</dt>
            <dd>
              Optional Practical Training: temporary work in the USA related to
              an F-1 student's field of study, with an extension for eligible
              STEM graduates.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>Genuine Student requirement</dt>
            <dd>
              Australia's assessment of whether a student visa applicant
              genuinely intends to study, which replaced the GTE requirement in
              2024.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>Type D visa</dt>
            <dd>
              Italy's national long-stay visa, which non-EU students need for
              degree study in Italy.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>Universitaly pre-enrolment</dt>
            <dd>
              The online pre-application that non-EU students complete on the
              Universitaly portal before applying for an Italian study visa.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>CIMEA statement</dt>
            <dd>
              A statement from Italy's CIMEA centre that verifies and compares a
              foreign qualification, often used instead of a Declaration of
              Value.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>ISEE parificato</dt>
            <dd>
              An Italian family income and assets indicator for students with
              foreign income, used to set university fees and DSU scholarship
              eligibility.
            </dd>
          </div>
          <div class="srp-term srp-reveal">
            <dt>Tuition fee waiver</dt>
            <dd>
              A reduction of part or all of a university's tuition fee, usually
              awarded on merit at the time of admission.
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- ================= SECTION 8: E-E-A-T ================= -->
    <section class="srp-section srp-lib" aria-labelledby="srp-trust-h">
      <div class="srp-container">
        <span class="srp-eyebrow"><i></i>About these resources</span>
        <h2 class="srp-h2" id="srp-trust-h">
          Who Maintains <span>These Resources</span>
        </h2>
        <div class="srp-trust">
          <div class="srp-author srp-reveal">
            <div class="srp-author-top">
              <span class="srp-avatar" aria-hidden="true">AK</span>
              <div>
                <h3>Anisuzzaman Kiron</h3>
                <small>Founder &amp; CEO, Sunrise Education Consultants</small>
              </div>
            </div>
            <p>
              These resources are built by the Sunrise counselling team and
              reviewed by Anisuzzaman Kiron, who founded Sunrise Education
              Consultants in 2014. The tools, checklists and guides come from
              the questions Bangladeshi students and parents ask in our Banani,
              Dhaka, and Sylhet offices every week.
            </p>
            <p>
              When you are ready for personal advice, our
              <NuxtLink class="srp-link" to="/services"
                >study abroad services</NuxtLink
              >
              cover every step, starting with a free assessment.
            </p>
            <div class="srp-meta">
              <span>Last updated: 29 Sep 2026</span
              ><span>Next review: Jan 2027</span>
            </div>
          </div>
          <div class="srp-policy srp-reveal">
            <h3>How we keep this page accurate</h3>
            <ul>
              <li>
                Rules and fees are checked against official websites before each
                main intake.
              </li>
              <li>
                Every guide shows its author, reviewer and last update date.
              </li>
              <li>
                Tools use the figures you enter; we never store your data.
              </li>
              <li>
                Found something out of date? Tell us at info@sunrise-bd.net.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 9: FAQ ================= -->
    <section class="srp-section srp-faq" aria-labelledby="srp-faq-h">
      <div class="srp-container">
        <div class="srp-center">
          <span class="srp-eyebrow"><i></i>FAQ</span>
          <h2 class="srp-h2" id="srp-faq-h">
            Study Abroad Resources: <span>Common Questions</span>
          </h2>
        </div>
        <div class="srp-faq-list">
          <details open>
            <summary>
              What study abroad resources does Sunrise offer Bangladeshi
              students?
            </summary>
            <p>
              Sunrise offers free guides on destinations, costs, scholarships,
              visa processing times and visa interviews, plus three free tools:
              a budget calculator in BDT, an intake timeline planner and a
              document checklist. The page also includes a glossary of study
              abroad terms and a directory of official websites.
            </p>
          </details>
          <details>
            <summary>
              What documents do Bangladeshi students need to study abroad?
            </summary>
            <p>
              Most students need a valid passport, SSC and HSC certificates and
              marksheets, bachelor's documents for master's study, an English
              test score or MOI certificate, an SOP, recommendation letters, an
              offer letter, bank solvency and sponsor documents, health
              insurance and accommodation proof. Exact lists differ by country
              and embassy.
            </p>
          </details>
          <details>
            <summary>
              How much money do I need to study abroad from Bangladesh?
            </summary>
            <p>
              It depends on the country and university. Public universities in
              Italy, Hungary, Turkey and China cost far less than the UK, USA,
              Canada or Australia. Add first-year tuition, living costs for 12
              months and one-time costs such as visa fees, flights and
              insurance, then compare with the proof of funds your embassy
              requires.
            </p>
          </details>
          <details>
            <summary>When should I start preparing to study abroad?</summary>
            <p>
              Start 10 to 12 months before your intake. That leaves time for an
              English test, scholarship deadlines, applications, certificate
              attestation, tuition payment and the visa process, which can take
              several weeks to a few months depending on the embassy.
            </p>
          </details>
          <details>
            <summary>
              Which English tests are accepted for studying abroad?
            </summary>
            <p>
              IELTS is the most widely accepted test, and many universities also
              accept TOEFL iBT, PTE Academic or the Duolingo English Test. Some
              universities in Italy, Malta, Cyprus, Malaysia, China and Turkey
              accept an MOI certificate instead, but embassies may still ask for
              proof of English.
            </p>
          </details>
          <details>
            <summary>
              Where can I practise student visa interview questions?
            </summary>
            <p>
              Sunrise publishes a free list of common student visa interview
              questions and sample answers for Bangladeshi applicants, and
              counsellors run mock interviews for students applying through
              Sunrise.
            </p>
          </details>
          <details>
            <summary>Are these study abroad tools free to use?</summary>
            <p>
              Yes. The budget calculator, timeline planner and document
              checklist are free and need no sign-up. Your checklist progress is
              saved only in your own browser.
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- ================= SECTION 10: CTA ================= -->
    <section class="srp-cta" aria-labelledby="srp-cta-h">
      <div class="srp-container">
        <h2 id="srp-cta-h">Want a Plan Made for You?</h2>
        <p>
          Tools help you prepare. A free assessment gives you a personal plan:
          the right country, realistic scholarships and a checklist for your
          exact embassy.
        </p>
        <div class="srp-cta-row" style="justify-content: center; margin: 0">
          <NuxtLink class="srp-btn srp-btn-primary" to="/apply-now"
            >Get Free Assessment
            <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <a class="srp-btn srp-btn-ghost" href="tel:+8801911878274"
            >Call 01911 878 274</a
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Resources page: guide filter, BDT budget calculator, intake timeline planner,
 * document checklist (saved in localStorage) and scroll reveal.
 * Markup is static; behaviour is wired in onMounted (same approach as SiteHeader / SiteFooter).
 * Layout already provides <main id="main">, so this page root is a <div>.
 */
const root = ref<HTMLElement | null>(null);
const router = useRouter();

const cleanups: Array<() => void> = [];
let io: IntersectionObserver | null = null;

/* ---------- SEO ---------- */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://sunrise-bd.net/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Resources",
          item: "https://sunrise-bd.net/resources",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://sunrise-bd.net/resources#page",
      url: "https://sunrise-bd.net/resources",
      name: "Study Abroad Resources for Bangladeshi Students",
      description:
        "Free study abroad guides and tools for Bangladeshi students, including a budget calculator in BDT, an intake timeline planner, a document checklist, a glossary of study abroad terms and a directory of official websites.",
      inLanguage: "en",
      dateModified: "2026-09-29",
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        geographicArea: {
          "@type": "Country",
          name: "Bangladesh",
        },
      },
      publisher: {
        "@type": "EducationalOrganization",
        "@id": "https://sunrise-bd.net/#organization",
        name: "Sunrise Education Consultants",
        url: "https://sunrise-bd.net/",
      },
      reviewedBy: {
        "@type": "Person",
        name: "Anisuzzaman Kiron",
        jobTitle: "Founder & CEO",
        url: "https://sunrise-bd.net/staff/anisuzzaman-kiron",
      },
      hasPart: [
        {
          "@id": "https://sunrise-bd.net/resources#budget-calculator",
        },
        {
          "@id": "https://sunrise-bd.net/resources#timeline-planner",
        },
        {
          "@id": "https://sunrise-bd.net/resources#document-checklist",
        },
        {
          "@id": "https://sunrise-bd.net/resources#glossary",
        },
      ],
      mainEntity: {
        "@type": "ItemList",
        name: "Study abroad guides for Bangladeshi students",
        numberOfItems: 9,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Study abroad destinations for Bangladeshi students",
            url: "https://sunrise-bd.net/study-abroad",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Study abroad blog for Bangladeshi students",
            url: "https://sunrise-bd.net/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Cost of studying abroad from Bangladesh",
            url: "https://sunrise-bd.net/blog/cost-of-studying-abroad-from-bangladesh-2027-budget-guide",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Scholarships for Bangladeshi students",
            url: "https://sunrise-bd.net/scholarships",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Italy public university tuition fees",
            url: "https://sunrise-bd.net/blog/italy-public-university-tuition-fees-2026",
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Student visa interview questions and answers",
            url: "https://sunrise-bd.net/embassy-interview-questions-answer",
          },
          {
            "@type": "ListItem",
            position: 7,
            name: "Student visa processing time by country",
            url: "https://sunrise-bd.net/blog/student-visa-processing-time-by-country",
          },
          {
            "@type": "ListItem",
            position: 8,
            name: "UK student visa and tuition fees",
            url: "https://sunrise-bd.net/blog/uk-student-visa-tuition-fees-2026",
          },
          {
            "@type": "ListItem",
            position: 9,
            name: "Student visa success stories",
            url: "https://sunrise-bd.net/success-story",
          },
        ],
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://sunrise-bd.net/resources#budget-calculator",
      name: "Study Abroad Budget Calculator (BDT)",
      url: "https://sunrise-bd.net/resources#srp-budget",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BDT",
      },
      description:
        "Estimates first-year study abroad costs in Bangladeshi Taka from tuition, living costs, scholarships and one-time expenses.",
    },
    {
      "@type": "WebApplication",
      "@id": "https://sunrise-bd.net/resources#timeline-planner",
      name: "Study Abroad Intake Timeline Planner",
      url: "https://sunrise-bd.net/resources#srp-timeline",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BDT",
      },
      description:
        "Creates a month-by-month study abroad preparation plan working back from the student's chosen intake.",
    },
    {
      "@type": "WebApplication",
      "@id": "https://sunrise-bd.net/resources#document-checklist",
      name: "Study Abroad Document Checklist for Bangladeshi Students",
      url: "https://sunrise-bd.net/resources#srp-checklist",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BDT",
      },
      description:
        "An interactive checklist of identity, academic, application, financial and travel documents that Bangladeshi students usually need.",
    },
    {
      "@type": "DefinedTermSet",
      "@id": "https://sunrise-bd.net/resources#glossary",
      name: "Study abroad glossary for Bangladeshi students",
      hasDefinedTerm: [
        {
          "@type": "DefinedTerm",
          name: "MOI certificate",
          description:
            "A Medium of Instruction certificate from your university confirming that your degree was taught in English. Some universities accept it instead of IELTS.",
        },
        {
          "@type": "DefinedTerm",
          name: "SOP",
          description:
            "Statement of Purpose: a personal essay explaining your academic background, why you chose the course and country, and your career plan.",
        },
        {
          "@type": "DefinedTerm",
          name: "LOR",
          description:
            "Letter of Recommendation: a reference letter from a teacher or employer supporting your application.",
        },
        {
          "@type": "DefinedTerm",
          name: "Attestation",
          description:
            "Official verification of your certificates by the Education Board or university, the Ministry of Education and the Ministry of Foreign Affairs (MOFA) of Bangladesh, when a university or embassy asks for it.",
        },
        {
          "@type": "DefinedTerm",
          name: "Bank solvency certificate",
          description:
            "A letter from a bank confirming the balance available in the student's or sponsor's account, used as proof of funds for a student visa.",
        },
        {
          "@type": "DefinedTerm",
          name: "Student file",
          description:
            "A file opened with an authorised dealer bank in Bangladesh that allows tuition and living costs to be sent abroad for a student under Bangladesh Bank foreign exchange rules.",
        },
        {
          "@type": "DefinedTerm",
          name: "CAS",
          description:
            "Confirmation of Acceptance for Studies: an electronic reference number issued by a UK university that you need to apply for a UK Student visa.",
        },
        {
          "@type": "DefinedTerm",
          name: "I-20",
          description:
            "A form issued by a US school certified by SEVP that confirms your admission and funding and lets you apply for an F-1 student visa.",
        },
        {
          "@type": "DefinedTerm",
          name: "SEVIS fee",
          description:
            "The I-901 SEVIS fee that most F-1 applicants must pay before their US visa interview.",
        },
        {
          "@type": "DefinedTerm",
          name: "LOA",
          description:
            "Letter of Acceptance from a Canadian designated learning institution, required for a Canadian study permit application.",
        },
        {
          "@type": "DefinedTerm",
          name: "PGWP",
          description:
            "Post-Graduation Work Permit: an open work permit that lets eligible graduates of Canadian institutions work in Canada after their studies.",
        },
        {
          "@type": "DefinedTerm",
          name: "OPT",
          description:
            "Optional Practical Training: temporary work in the USA related to an F-1 student's field of study, with an extension for eligible STEM graduates.",
        },
        {
          "@type": "DefinedTerm",
          name: "Genuine Student requirement",
          description:
            "Australia's assessment of whether a student visa applicant genuinely intends to study, which replaced the GTE requirement in 2024.",
        },
        {
          "@type": "DefinedTerm",
          name: "Type D visa",
          description:
            "Italy's national long-stay visa, which non-EU students need for degree study in Italy.",
        },
        {
          "@type": "DefinedTerm",
          name: "Universitaly pre-enrolment",
          description:
            "The online pre-application that non-EU students complete on the Universitaly portal before applying for an Italian study visa.",
        },
        {
          "@type": "DefinedTerm",
          name: "CIMEA statement",
          description:
            "A statement from Italy's CIMEA centre that verifies and compares a foreign qualification, often used instead of a Declaration of Value.",
        },
        {
          "@type": "DefinedTerm",
          name: "ISEE parificato",
          description:
            "An Italian family income and assets indicator for students with foreign income, used to set university fees and DSU scholarship eligibility.",
        },
        {
          "@type": "DefinedTerm",
          name: "Tuition fee waiver",
          description:
            "A reduction of part or all of a university's tuition fee, usually awarded on merit at the time of admission.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What study abroad resources does Sunrise offer Bangladeshi students?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sunrise offers free guides on destinations, costs, scholarships, visa processing times and visa interviews, plus three free tools: a budget calculator in BDT, an intake timeline planner and a document checklist. The page also includes a glossary of study abroad terms and a directory of official websites.",
          },
        },
        {
          "@type": "Question",
          name: "What documents do Bangladeshi students need to study abroad?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most students need a valid passport, SSC and HSC certificates and marksheets, bachelor's documents for master's study, an English test score or MOI certificate, an SOP, recommendation letters, an offer letter, bank solvency and sponsor documents, health insurance and accommodation proof. Exact lists differ by country and embassy.",
          },
        },
        {
          "@type": "Question",
          name: "How much money do I need to study abroad from Bangladesh?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on the country and university. Public universities in Italy, Hungary, Turkey and China cost far less than the UK, USA, Canada or Australia. Add first-year tuition, living costs for 12 months and one-time costs such as visa fees, flights and insurance, then compare with the proof of funds your embassy requires.",
          },
        },
        {
          "@type": "Question",
          name: "When should I start preparing to study abroad?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start 10 to 12 months before your intake. That leaves time for an English test, scholarship deadlines, applications, certificate attestation, tuition payment and the visa process, which can take several weeks to a few months depending on the embassy.",
          },
        },
        {
          "@type": "Question",
          name: "Which English tests are accepted for studying abroad?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "IELTS is the most widely accepted test, and many universities also accept TOEFL iBT, PTE Academic or the Duolingo English Test. Some universities in Italy, Malta, Cyprus, Malaysia, China and Turkey accept an MOI certificate instead, but embassies may still ask for proof of English.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I practise student visa interview questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sunrise publishes a free list of common student visa interview questions and sample answers for Bangladeshi applicants, and counsellors run mock interviews for students applying through Sunrise.",
          },
        },
        {
          "@type": "Question",
          name: "Are these study abroad tools free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The budget calculator, timeline planner and document checklist are free and need no sign-up. Your checklist progress is saved only in your own browser.",
          },
        },
      ],
    },
  ],
};

useSeoMeta({
  title: "Study Abroad Resources for Bangladeshi Students | Sunrise",
  description:
    "Free study abroad resources for Bangladeshi students: budget calculator in BDT, intake timeline planner, document checklist, glossary and official links.",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: "Study Abroad Resources for Bangladeshi Students",
  ogDescription:
    "Free tools and guides: BDT budget calculator, intake timeline planner, document checklist, visa interview practice and official links.",
  ogUrl: "https://sunrise-bd.net/resources",
  ogSiteName: "Sunrise Education Consultants",
  twitterCard: "summary_large_image",
});

useHead({
  link: [{ rel: "canonical", href: "https://sunrise-bd.net/resources" }],
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(schema) }],
});

onMounted(() => {
  const r = root.value;
  if (!r) return;

  const on = (t: Element, ev: string, fn: (e: any) => void) => {
    t.addEventListener(ev, fn);
    cleanups.push(() => t.removeEventListener(ev, fn));
  };
  const el = <T extends HTMLElement = HTMLElement>(id: string) =>
    r.querySelector("#" + id) as T;
  const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

  /* ---- topic filter ---- */
  const tabs = r.querySelectorAll<HTMLElement>(".srp-tab");
  const cards = r.querySelectorAll<HTMLElement>(".srp-card");
  tabs.forEach((t) =>
    on(t, "click", () => {
      tabs.forEach((x) => {
        x.classList.remove("is-active");
        x.setAttribute("aria-selected", "false");
      });
      t.classList.add("is-active");
      t.setAttribute("aria-selected", "true");
      const f = t.getAttribute("data-f");
      cards.forEach((c) => {
        c.hidden = !(f === "all" || c.getAttribute("data-t") === f);
      });
    }),
  );

  /* ---- read more ---- */
  r.querySelectorAll<HTMLElement>(".srp-more").forEach((b) =>
    on(b, "click", () => {
      const c = b.closest(".srp-card") as HTMLElement;
      const o = c.classList.toggle("is-open");
      b.setAttribute("aria-expanded", String(o));
      b.textContent = o ? "Show less" : "Read more";
    }),
  );

  /* ---- budget calculator ---- */
  const cur = el<HTMLSelectElement>("c-cur");
  const num = (id: string) => +el<HTMLInputElement>(id).value || 0;
  const calc = () => {
    const code = cur.value;
    const rate = num("c-rate");
    const tui = num("c-tui");
    const sch = Math.min(100, Math.max(0, num("c-sch")));
    const liv = num("c-liv");
    const mon = Math.max(1, num("c-mon") || 1);
    const one = num("c-one");
    const tuiNet = tui * (1 - sch / 100);
    const livT = liv * mon;
    const fx = tuiNet + livT;
    const total = fx * rate + one;
    el("r-tui").textContent =
      `${code} ${fmt(tuiNet)} (BDT ${fmt(tuiNet * rate)})`;
    el("r-liv").textContent = `${code} ${fmt(livT)} (BDT ${fmt(livT * rate)})`;
    el("r-one").textContent = `BDT ${fmt(one)}`;
    el("r-fx").textContent = `${code} ${fmt(fx)}`;
    el("r-total").innerHTML = `BDT <span>${fmt(total)}</span>`;
    el("r-month").textContent =
      `About BDT ${fmt(total / mon)} per month over ${mon} months`;
  };
  on(cur, "change", () => {
    el<HTMLInputElement>("c-rate").value =
      cur.options[cur.selectedIndex].getAttribute("data-r") || "0";
    calc();
  });
  ["c-rate", "c-tui", "c-sch", "c-liv", "c-mon", "c-one"].forEach((id) =>
    on(el(id), "input", calc),
  );
  calc();

  /* ---- timeline planner ---- */
  const M = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // [months before intake, step text, internal link, link label]
  const steps: Array<[number, string, string?, string?]> = [
    [12, "Free assessment and country shortlist", "/apply-now", "Book"],
    [11, "Book IELTS or PTE, or request your MOI certificate"],
    [
      10,
      "Check scholarships and their deadlines",
      "/scholarships",
      "Scholarships",
    ],
    [9, "Shortlist universities; prepare SOP, CV and recommendation letters"],
    [
      8,
      "Submit university applications",
      "/service-details/university-admission-process",
      "Admission help",
    ],
    [6, "Accept your offer and start certificate attestation"],
    [5, "Open a student file, pay the deposit, prepare bank solvency"],
    [
      4,
      "Prepare your visa file and book the appointment",
      "/service-details/counselling-and-visa-processing",
      "Visa help",
    ],
    [
      3,
      "Practise for the visa interview",
      "/embassy-interview-questions-answer",
      "Questions",
    ],
    [
      2,
      "Book accommodation and health insurance",
      "/service-details/accommodation-and-housing",
      "Housing help",
    ],
    [
      1,
      "Pre-departure briefing, flight and currency",
      "/service-details/pre-departure-preparation",
      "Briefing",
    ],
    [0, "Arrive, register and start your classes"],
  ];
  const plan = () => {
    const m = +el<HTMLSelectElement>("t-mon").value;
    const y = +el<HTMLSelectElement>("t-yr").value;
    el("t-label").textContent = `${M[m]} ${y}`;
    el("t-plan").innerHTML = steps
      .map(([back, text, href, label]) => {
        const d = new Date(y, m - back, 1);
        return `<li><b>${M[d.getMonth()]} ${d.getFullYear()}</b><span>${text}</span>${href ? `<a href="${href}">${label} &rarr;</a>` : ""}</li>`;
      })
      .join("");
  };
  on(el("t-mon"), "change", plan);
  on(el("t-yr"), "change", plan);
  /* links are injected as HTML, so route them through vue-router (no full page reload) */
  on(el("t-plan"), "click", (e: Event) => {
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (href && href.startsWith("/")) {
      e.preventDefault();
      router.push(href);
    }
  });
  plan();

  /* ---- document checklist (progress saved in this browser only) ---- */
  const KEY = "sunrise-doc-checklist";
  const boxes = r.querySelectorAll<HTMLInputElement>(
    "#ck-list input[type=checkbox]",
  );
  let saved: Record<string, boolean> = {};
  try {
    saved = JSON.parse(localStorage.getItem(KEY) || "{}") || {};
  } catch {
    saved = {};
  }
  const upd = () => {
    let n = 0;
    boxes.forEach((b) => {
      if (b.checked) n++;
    });
    el("ck-bar").style.width = (n / boxes.length) * 100 + "%";
    el("ck-count").textContent = `${n} of ${boxes.length} ready`;
  };
  boxes.forEach((b) => {
    const k = b.getAttribute("data-k") as string;
    if (saved[k]) b.checked = true;
    on(b, "change", () => {
      saved[k] = b.checked;
      try {
        localStorage.setItem(KEY, JSON.stringify(saved));
      } catch {}
      upd();
    });
  });
  on(el("ck-reset"), "click", () => {
    boxes.forEach((b) => {
      b.checked = false;
    });
    saved = {};
    try {
      localStorage.removeItem(KEY);
    } catch {}
    upd();
  });
  on(el("ck-print"), "click", () => window.print());
  upd();

  /* ---- reveal on scroll ---- */
  const els = r.querySelectorAll<HTMLElement>(".srp-reveal");
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io?.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((e) => io?.observe(e));
  } else {
    els.forEach((e) => e.classList.add("is-in"));
  }
});

onBeforeUnmount(() => {
  io?.disconnect();
  cleanups.forEach((fn) => fn());
  cleanups.length = 0;
});
</script>
