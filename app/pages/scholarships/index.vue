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
            <b>10</b><small>Major scholarships compared</small>
          </div>
          <div class="ssp-stat">
            <b>8</b><small>Countries, plus the EU</small>
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
            class="ssp-tab is-active"
            data-f="all"
            role="tab"
            aria-selected="true"
          >
            All <span>10</span>
          </button>
          <button class="ssp-tab" data-f="ba" role="tab" aria-selected="false">
            After HSC <span>4</span>
          </button>
          <button class="ssp-tab" data-f="ma" role="tab" aria-selected="false">
            Master's <span>10</span>
          </button>
          <button class="ssp-tab" data-f="phd" role="tab" aria-selected="false">
            PhD <span>2</span>
          </button>
          <button class="ssp-tab" data-f="moi" role="tab" aria-selected="false">
            Without IELTS <span>4</span>
          </button>
        </div>

        <div class="ssp-grid">
          <!-- 1 STIPENDIUM HUNGARICUM -->
          <article
            class="ssp-card ssp-reveal"
            data-l="ba ma moi"
            id="stipendium-hungaricum"
          >
            <div class="ssp-card-top r-eu">
              <div class="ssp-badges">
                <span class="ssp-badge full">Fully funded</span
                ><span class="ssp-badge">Hungary</span>
              </div>
              <span class="ssp-code" aria-hidden="true">HU</span>
              <div>
                <h3>Stipendium Hungaricum</h3>
                <div class="ssp-tag">Hungarian Government Scholarship</div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>Tuition, stipend, housing, insurance</b></li>
                <li>Levels<b>Bachelor's, master's, one-tier master's</b></li>
                <li>Applications<b>Usually Nov to mid-January</b></li>
                <li>English<b>Set by each university</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  Stipendium Hungaricum is the Hungarian government's flagship
                  scholarship, managed by the Tempus Public Foundation, and
                  Bangladesh is one of its sending partner countries. It is one
                  of the few fully funded scholarships open to students straight
                  after HSC, which makes it the first scholarship we discuss
                  with most bachelor's applicants.
                </p>
                <p>
                  Under the 2026/27 call, winners receive free tuition, a
                  monthly stipend of HUF 43,700 for bachelor's and master's
                  students, a free dormitory place or a housing contribution of
                  HUF 40,000 a month, and medical insurance. Popular
                  universities include the University of Debrecen, the
                  University of Szeged, the University of Pécs, Eötvös Loránd
                  University (ELTE) and the Budapest University of Technology
                  and Economics.
                </p>
                <p>
                  Bangladeshi students apply in two steps: an online application
                  on the Stipendium Hungaricum portal, which closed on 15
                  January for the 2026/27 intake, and a nomination file
                  submitted to the Secondary and Higher Education Division of
                  the Ministry of Education. Many applicants miss the second
                  step or send incomplete hard copies, so we prepare both files
                  together. English rules are set by each university, and some
                  programs accept a Medium of Instruction (MOI) certificate or
                  an entrance test instead of IELTS.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <NuxtLink
                class="ssp-card-link"
                to="/study-in-hungary-from-bangladesh"
                >Study in Hungary from Bangladesh
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
              <!-- When the blog is live, add: /blog/stipendium-hungaricum-scholarship-bangladesh (anchor: "Stipendium Hungaricum step-by-step guide") -->
            </div>
          </article>

          <!-- 2 CSC -->
          <article
            class="ssp-card ssp-reveal"
            data-l="ba ma phd moi"
            id="csc-scholarship"
          >
            <div class="ssp-card-top r-as">
              <div class="ssp-badges">
                <span class="ssp-badge full">Fully funded</span
                ><span class="ssp-badge">China</span>
              </div>
              <span class="ssp-code" aria-hidden="true">CN</span>
              <div>
                <h3>Chinese Government Scholarship (CSC)</h3>
                <div class="ssp-tag">
                  China Scholarship Council, Type A and Type B
                </div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>Tuition, housing, stipend, insurance</b></li>
                <li>Levels<b>Bachelor's, master's, PhD</b></li>
                <li>Applications<b>Usually January to April</b></li>
                <li>English<b>MOI often accepted</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  The Chinese Government Scholarship, run by the China
                  Scholarship Council (CSC), is one of the largest scholarship
                  programs in the world and a strong option for Bangladeshi
                  students at every level. It covers tuition, on-campus
                  accommodation and comprehensive medical insurance, and pays a
                  monthly living allowance, currently CNY 3,000 for master's
                  students and CNY 3,500 for doctoral students, with a lower
                  rate for bachelor's students.
                </p>
                <p>
                  There are two routes. Type A applications go through the
                  Chinese Embassy in Dhaka and Bangladesh's nominating
                  authority, while Type B applications go directly to designated
                  Chinese universities, such as Zhejiang University, Wuhan
                  University, Tsinghua University and Peking University, through
                  the Campus China portal. Applying to the right university for
                  your subject often matters more than the route itself.
                </p>
                <p>
                  Most English-taught programs in China accept an MOI
                  certificate, although top universities may still ask for
                  IELTS, and Chinese-taught programs need an HSK score. For
                  master's and PhD applicants, a strong study plan and an
                  acceptance letter from a Chinese professor improve your
                  chances considerably, and we help you prepare both.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <NuxtLink class="ssp-card-link" to="/study-in-china"
                >Study in China from Bangladesh
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
              <!-- When the blog is live, add: /blog/csc-scholarship-china-bangladesh (anchor: "CSC scholarship guide") -->
            </div>
          </article>

          <!-- 3 TURKIYE BURSLARI -->
          <article
            class="ssp-card ssp-reveal"
            data-l="ba ma phd moi"
            id="turkiye-burslari"
          >
            <div class="ssp-card-top r-as">
              <div class="ssp-badges">
                <span class="ssp-badge full">Fully funded</span
                ><span class="ssp-badge">Turkey</span>
              </div>
              <span class="ssp-code" aria-hidden="true">TR</span>
              <div>
                <h3>Türkiye Burslari</h3>
                <div class="ssp-tag">Türkiye Scholarships by YTB</div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>Tuition, stipend, housing, flights</b></li>
                <li>Levels<b>Bachelor's, master's, PhD</b></li>
                <li>Applications<b>10 Jan to 20 Feb (2026)</b></li>
                <li>English<b>No IELTS at application</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  Türkiye Burslari, the Türkiye Scholarships program run by the
                  Presidency for Turks Abroad and Related Communities (YTB), is
                  fully funded and one of the most generous packages open to
                  Bangladeshi students. It covers tuition, a monthly stipend,
                  accommodation in state dormitories, health insurance, a
                  one-time return flight and a one-year Turkish language course
                  before your degree starts.
                </p>
                <p>
                  For the 2026 round, applications ran online from 10 January to
                  20 February. Applicants need at least 70% in their previous
                  studies for bachelor's programs and 75% for master's and PhD
                  programs (90% for medicine and other health sciences), and
                  must be under 21, 30 or 35 respectively. Shortlisted
                  candidates are called for an interview, which is where many
                  strong files fall short.
                </p>
                <p>
                  The application is free and no IELTS score is needed at the
                  application stage, which makes it attractive for students with
                  an MOI certificate. Competition is very high, so your
                  motivation letter, your choice of universities, such as
                  Istanbul University, Middle East Technical University or
                  Hacettepe University, and your interview answers all need
                  careful preparation. We run mock interviews in the format the
                  Türkiye Burslari panel uses.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <NuxtLink
                class="ssp-card-link"
                to="/study-in-turkey-from-bangladesh"
                >Study in Turkey from Bangladesh
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
              <!-- When the blog is live, add: /blog/turkiye-burslari-scholarship-bangladesh (anchor: "Türkiye Burslari application guide") -->
            </div>
          </article>

          <!-- 4 DSU ITALY -->
          <article
            class="ssp-card ssp-reveal"
            data-l="ba ma moi"
            id="dsu-italy"
          >
            <div class="ssp-card-top r-eu">
              <div class="ssp-badges">
                <span class="ssp-badge full">Need-based</span
                ><span class="ssp-badge">Italy</span>
              </div>
              <span class="ssp-code" aria-hidden="true">IT</span>
              <div>
                <h3>DSU Regional Scholarship</h3>
                <div class="ssp-tag">Italy's right-to-study scholarship</div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>Cash grant, fee waiver, meals, housing</b></li>
                <li>Levels<b>Bachelor's and master's</b></li>
                <li>Applications<b>Usually July to September</b></li>
                <li>English<b>Depends on the university</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  The DSU (Diritto allo Studio Universitario) scholarship is
                  paid by Italian regional agencies, such as ER.GO in
                  Emilia-Romagna, DSU Toscana, EDISU Piemonte and DiSCo Lazio.
                  It is based on family income rather than grades in the first
                  year, which is why so many Bangladeshi students study in Italy
                  at very low cost.
                </p>
                <p>
                  Depending on the region and your family's income, DSU can pay
                  a cash grant of up to around EUR 7,000 a year for students
                  living away from home, exempt you from university tuition, and
                  include free or discounted meals and a place in a student
                  residence. Awards are renewed each year if you earn the
                  required number of credits.
                </p>
                <p>
                  The key document is the ISEE parificato, calculated from your
                  family's income, property and bank records in Bangladesh,
                  which must be translated and legalised before a CAF office in
                  Italy can issue it. Errors in these papers are the most common
                  reason Bangladeshi applicants lose DSU, so we plan the
                  documents months before your admission and check them line by
                  line.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <NuxtLink class="ssp-card-link" to="/study-abroad/italy"
                >Study in Italy from Bangladesh
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

          <!-- 5 FINLAND -->
          <article
            class="ssp-card ssp-reveal"
            data-l="ma"
            id="finland-scholarship"
          >
            <div class="ssp-card-top r-eu">
              <div class="ssp-badges">
                <span class="ssp-badge">Partial to full tuition</span
                ><span class="ssp-badge">Finland</span>
              </div>
              <span class="ssp-code" aria-hidden="true">FI</span>
              <div>
                <h3>Finland Scholarship &amp; Tuition Waivers</h3>
                <div class="ssp-tag">
                  Government and university scholarships
                </div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>50% to 100% tuition, relocation grant</b></li>
                <li>Levels<b>Master's (some bachelor's)</b></li>
                <li>Applications<b>With admission, usually January</b></li>
                <li>English<b>IELTS usually required</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  Finnish universities charge tuition to students from outside
                  the EU, but almost all of them offer scholarships that cover
                  50% or 100% of those fees for strong applicants. On top of
                  this, the Finland Scholarship, coordinated by the Finnish
                  National Agency for Education with participating universities,
                  covers first-year tuition in full and adds a EUR 5,000 grant
                  toward relocation and living costs.
                </p>
                <p>
                  There is usually no separate scholarship form. You are
                  considered when you apply for admission through the joint
                  application on Studyinfo.fi, which for autumn programs
                  normally takes place in January, so your grades, motivation
                  letter and English score decide both your place and your
                  scholarship. Universities such as the University of Helsinki,
                  Aalto University and Tampere University set their own
                  scholarship rules and renewal conditions.
                </p>
                <p>
                  A tuition waiver also lowers the money you must show for the
                  student residence permit from the Finnish Immigration Service
                  (Migri), because you no longer need to prove funds for the
                  waived fees. Finland does not usually accept an MOI
                  certificate for scholarship programs, so plan your IELTS or
                  equivalent test well before January.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <NuxtLink
                class="ssp-card-link"
                to="/study-in-finland-from-bangladesh"
                >Study in Finland from Bangladesh
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></NuxtLink>
              <!-- When the blog is live, add: /blog/finland-scholarships-bangladeshi-students (anchor: "Finland scholarships and tuition waivers") -->
            </div>
          </article>

          <!-- 6 ERASMUS MUNDUS -->
          <article class="ssp-card ssp-reveal" data-l="ma" id="erasmus-mundus">
            <div class="ssp-card-top r-eu">
              <div class="ssp-badges">
                <span class="ssp-badge full">Fully funded</span
                ><span class="ssp-badge">European Union</span>
              </div>
              <span class="ssp-code" aria-hidden="true">EU</span>
              <div>
                <h3>Erasmus Mundus Joint Masters</h3>
                <div class="ssp-tag">European Commission scholarship</div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>Tuition, EUR 1,400 a month, travel</b></li>
                <li>Levels<b>Master's</b></li>
                <li>Applications<b>Usually October to February</b></li>
                <li>English<b>Usually IELTS or TOEFL</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  Erasmus Mundus Joint Masters are one- or two-year master's
                  programs run by groups of universities in at least two
                  European countries, funded by the European Commission.
                  Scholarship holders study in two or more countries, for
                  example Italy, Hungary, Finland, Greece or Cyprus, and
                  graduate with a joint or multiple degree.
                </p>
                <p>
                  The scholarship covers participation costs, which include
                  tuition and insurance, together with travel and a monthly
                  allowance of EUR 1,400 for the full length of the program.
                  Bangladeshi graduates are eligible, and you can apply to up to
                  three programs in the same year.
                </p>
                <p>
                  Each consortium runs its own application, with deadlines
                  usually between October and February for study starting the
                  following autumn. Selection is highly competitive and depends
                  on your academic record, motivation letter, references and how
                  well your background fits the program, so choosing the right
                  programs is half the work. We help you shortlist programs that
                  match your degree and plan a strong, program-specific
                  motivation letter.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <NuxtLink class="ssp-card-link" to="/study-abroad"
                >Compare European study destinations
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

          <!-- 7 CHEVENING -->
          <article class="ssp-card ssp-reveal" data-l="ma" id="chevening">
            <div class="ssp-card-top r-oc">
              <div class="ssp-badges">
                <span class="ssp-badge full">Fully funded</span
                ><span class="ssp-badge">United Kingdom</span>
              </div>
              <span class="ssp-code" aria-hidden="true">UK</span>
              <div>
                <h3>Chevening Scholarship</h3>
                <div class="ssp-tag">UK Government, FCDO</div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>Tuition, living allowance, flights</b></li>
                <li>Levels<b>One-year master's</b></li>
                <li>Applications<b>4 Aug to 6 Oct 2026</b></li>
                <li>Experience<b>2 years (2,800 hours)</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  Chevening is the UK government's global scholarship, funded by
                  the Foreign, Commonwealth and Development Office (FCDO), for
                  future leaders to complete a one-year master's degree at any
                  UK university. It covers tuition, a monthly living allowance,
                  return flights and visa costs.
                </p>
                <p>
                  For the 2027/28 cohort, applications open on 4 August 2026 and
                  close on 6 October 2026. Bangladeshi applicants need an
                  undergraduate degree, at least two years (2,800 hours) of work
                  experience, three eligible UK course choices and an
                  unconditional offer by July 2027, and they must return to
                  Bangladesh for at least two years after the award.
                </p>
                <p>
                  Chevening is decided on four essays about leadership,
                  networking, study plans and career goals, followed by an
                  interview at the British High Commission in Dhaka. Generic
                  essays are the most common reason strong candidates are
                  rejected, so we help you turn your real work experience into
                  specific, evidence-based answers and practise the interview.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <NuxtLink class="ssp-card-link" to="/study-abroad/study-in-uk"
                >Study in UK from Bangladesh
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

          <!-- 8 COMMONWEALTH -->
          <article class="ssp-card ssp-reveal" data-l="ma" id="commonwealth">
            <div class="ssp-card-top r-oc">
              <div class="ssp-badges">
                <span class="ssp-badge full">Fully funded</span
                ><span class="ssp-badge">United Kingdom</span>
              </div>
              <span class="ssp-code" aria-hidden="true">CW</span>
              <div>
                <h3>Commonwealth Master's Scholarship</h3>
                <div class="ssp-tag">
                  Commonwealth Scholarship Commission in the UK
                </div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>Tuition, stipend, airfare</b></li>
                <li>Levels<b>Master's</b></li>
                <li>Applications<b>Usually September to October</b></li>
                <li>Nomination<b>Through UGC Bangladesh</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  Commonwealth Master's Scholarships are funded by the UK
                  government for talented graduates from developing Commonwealth
                  countries, including Bangladesh. They cover tuition, return
                  airfare, a monthly living stipend and arrival allowances for a
                  one-year master's at a UK university.
                </p>
                <p>
                  Unlike Chevening, you cannot apply directly. Bangladeshi
                  candidates are nominated through the University Grants
                  Commission (UGC) of Bangladesh: you complete the Commission's
                  online application, usually by mid-October, and submit a hard
                  copy to UGC by its own deadline. Missing either step ends the
                  application.
                </p>
                <p>
                  Every application must connect your chosen course to one of
                  the Commission's development themes, such as science and
                  technology for development, health systems, or governance and
                  institutions. A clear development impact statement is what
                  separates successful Bangladeshi applicants, and we help you
                  build it around your real experience.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <a
                class="ssp-card-link"
                href="https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships"
                target="_blank"
                rel="noopener"
                >Official Commonwealth scholarship details
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg
              ></a>
            </div>
          </article>

          <!-- 9 FULBRIGHT -->
          <article class="ssp-card ssp-reveal" data-l="ma" id="fulbright">
            <div class="ssp-card-top r-na">
              <div class="ssp-badges">
                <span class="ssp-badge full">Fully funded</span
                ><span class="ssp-badge">USA</span>
              </div>
              <span class="ssp-code" aria-hidden="true">US</span>
              <div>
                <h3>Fulbright Foreign Student Program</h3>
                <div class="ssp-tag">U.S. Department of State</div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>Tuition, living stipend, airfare</b></li>
                <li>Levels<b>Master's</b></li>
                <li>Applications<b>Announced by U.S. Embassy Dhaka</b></li>
                <li>English<b>TOEFL iBT 90 or IELTS 7.0</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  The Fulbright Foreign Student Program funds master's study at
                  universities in the United States and is administered in
                  Bangladesh by the U.S. Embassy in Dhaka. It normally covers
                  tuition, a living stipend, airfare and health insurance.
                </p>
                <p>
                  In the most recent Bangladesh call, applicants needed a
                  four-year bachelor's degree with an outstanding record, at
                  least two years of full-time work experience in their field,
                  and a TOEFL iBT score of 90 or IELTS 7.0. Candidates holding a
                  foreign master's degree or a previous U.S. degree were not
                  eligible, and the embassy listed priority fields such as
                  economics, energy, education, public policy and the sciences.
                </p>
                <p>
                  The call is usually published more than a year before studies
                  begin, and program details can change from one year to the
                  next, so always follow the embassy's current announcement. We
                  help you plan the timeline, prepare your essays and
                  references, and choose a field that matches both your
                  experience and the embassy's priorities.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <NuxtLink class="ssp-card-link" to="/study-abroad/study-in-usa"
                >Study in USA from Bangladesh
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

          <!-- 10 AUSTRALIA AWARDS -->
          <article
            class="ssp-card ssp-reveal"
            data-l="ma"
            id="australia-awards"
          >
            <div class="ssp-card-top r-oc">
              <div class="ssp-badges">
                <span class="ssp-badge full">Fully funded</span
                ><span class="ssp-badge">Australia</span>
              </div>
              <span class="ssp-code" aria-hidden="true">AU</span>
              <div>
                <h3>Australia Awards Scholarship</h3>
                <div class="ssp-tag">Australian Government, DFAT</div>
              </div>
            </div>
            <div class="ssp-card-body">
              <ul class="ssp-facts">
                <li>Covers<b>Tuition, living costs, airfare, OSHC</b></li>
                <li>Levels<b>Master's</b></li>
                <li>Applications<b>Usually February to April</b></li>
                <li>English<b>IELTS or PTE required</b></li>
              </ul>
              <div class="ssp-desc">
                <p>
                  Australia Awards Scholarships are funded by the Australian
                  Department of Foreign Affairs and Trade (DFAT) for
                  professionals from partner countries, including Bangladesh, to
                  complete a master's degree at an Australian university. The
                  award covers full tuition, return airfare, an establishment
                  allowance, a contribution to living expenses and Overseas
                  Student Health Cover (OSHC).
                </p>
                <p>
                  Applications for Bangladesh are made online and usually open
                  in February and close at the end of April, for study starting
                  early the following year. The program focuses on development
                  priorities, so your work experience and the impact you plan to
                  create back home carry as much weight as your grades.
                </p>
                <p>
                  Winners must return to Bangladesh for at least two years after
                  graduating. Shortlisted applicants sit an English test and an
                  interview, and we help you prepare a clear link between your
                  chosen course, your current job and Bangladesh's development
                  needs.
                </p>
              </div>
              <button class="ssp-more" aria-expanded="false">Read more</button>
              <NuxtLink
                class="ssp-card-link"
                to="/study-abroad/study-in-australia"
                >Study in Australia from Bangladesh
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
              <tr>
                <td>
                  <a href="#stipendium-hungaricum">Stipendium Hungaricum</a>
                </td>
                <td>Hungary</td>
                <td><span class="lvl lvl-f">Full</span></td>
                <td>BA, MA</td>
                <td>Nov to mid-Jan</td>
                <td>University decides</td>
                <td>Online portal + Ministry of Education</td>
              </tr>
              <tr>
                <td><a href="#csc-scholarship">CSC</a></td>
                <td>China</td>
                <td><span class="lvl lvl-f">Full</span></td>
                <td>BA, MA, PhD</td>
                <td>Jan to Apr</td>
                <td>MOI often accepted</td>
                <td>Embassy (Type A) or university (Type B)</td>
              </tr>
              <tr>
                <td><a href="#turkiye-burslari">Türkiye Burslari</a></td>
                <td>Turkey</td>
                <td><span class="lvl lvl-f">Full</span></td>
                <td>BA, MA, PhD</td>
                <td>Jan to Feb</td>
                <td>Not needed to apply</td>
                <td>Online portal</td>
              </tr>
              <tr>
                <td><a href="#dsu-italy">DSU</a></td>
                <td>Italy</td>
                <td><span class="lvl lvl-f">Need-based</span></td>
                <td>BA, MA</td>
                <td>Jul to Sep</td>
                <td>University decides</td>
                <td>Regional agency + ISEE</td>
              </tr>
              <tr>
                <td><a href="#finland-scholarship">Finland Scholarship</a></td>
                <td>Finland</td>
                <td><span class="lvl lvl-p">Partial to full</span></td>
                <td>MA</td>
                <td>With admission, Jan</td>
                <td>IELTS usually</td>
                <td>Studyinfo.fi</td>
              </tr>
              <tr>
                <td><a href="#erasmus-mundus">Erasmus Mundus</a></td>
                <td>EU</td>
                <td><span class="lvl lvl-f">Full</span></td>
                <td>MA</td>
                <td>Oct to Feb</td>
                <td>IELTS or TOEFL</td>
                <td>Each program</td>
              </tr>
              <tr>
                <td><a href="#chevening">Chevening</a></td>
                <td>UK</td>
                <td><span class="lvl lvl-f">Full</span></td>
                <td>MA</td>
                <td>Aug to Oct</td>
                <td>University decides</td>
                <td>Chevening portal</td>
              </tr>
              <tr>
                <td><a href="#commonwealth">Commonwealth</a></td>
                <td>UK</td>
                <td><span class="lvl lvl-f">Full</span></td>
                <td>MA</td>
                <td>Sep to Oct</td>
                <td>University decides</td>
                <td>UGC Bangladesh nomination</td>
              </tr>
              <tr>
                <td><a href="#fulbright">Fulbright</a></td>
                <td>USA</td>
                <td><span class="lvl lvl-f">Full</span></td>
                <td>MA</td>
                <td>Set by embassy</td>
                <td>TOEFL 90 / IELTS 7.0</td>
                <td>U.S. Embassy Dhaka</td>
              </tr>
              <tr>
                <td><a href="#australia-awards">Australia Awards</a></td>
                <td>Australia</td>
                <td><span class="lvl lvl-f">Full</span></td>
                <td>MA</td>
                <td>Feb to Apr</td>
                <td>IELTS or PTE</td>
                <td>Online portal</td>
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
          <details open>
            <summary>
              Which scholarships can Bangladeshi students get to study abroad?
            </summary>
            <p>
              Major scholarships open to Bangladeshi students include Stipendium
              Hungaricum (Hungary), the Chinese Government Scholarship (CSC),
              Türkiye Burslari (Turkey), Italy's regional DSU scholarship, the
              Finland Scholarship, Erasmus Mundus (Europe), Chevening and
              Commonwealth scholarships (UK), Fulbright (USA) and Australia
              Awards. Universities in most countries also offer partial
              scholarships and tuition waivers.
            </p>
          </details>
          <details>
            <summary>
              Which fully funded scholarships can I apply for after HSC?
            </summary>
            <p>
              After HSC, Bangladeshi students can apply for bachelor's
              scholarships such as Stipendium Hungaricum, the Chinese Government
              Scholarship and Türkiye Burslari, all of which cover tuition and
              give a monthly stipend. Italy's DSU scholarship is also open to
              bachelor's students and is based on family income. Chevening,
              Commonwealth, Fulbright and Australia Awards are for master's
              study only.
            </p>
          </details>
          <details>
            <summary>Can I get a scholarship without IELTS?</summary>
            <p>
              Yes, in some cases. Türkiye Burslari does not ask for IELTS at
              application, many Chinese and Hungarian universities accept a
              Medium of Instruction (MOI) certificate, and some Italian
              universities accept MOI for DSU-eligible programs. UK, US and
              Australian government scholarships normally need an English test
              score. You can compare English rules by country on our
              <NuxtLink to="/study-abroad">study abroad destinations</NuxtLink>
              page.
            </p>
          </details>
          <details>
            <summary>What CGPA or GPA do I need for a scholarship?</summary>
            <p>
              There is no single cut-off. Türkiye Burslari asks for at least 70%
              for bachelor's and 75% for master's applicants, while Chevening,
              Fulbright and Australia Awards look for a strong record plus work
              experience. Need-based scholarships such as Italy's DSU depend on
              family income first, then on academic progress from the second
              year.
            </p>
          </details>
          <details>
            <summary>
              When should Bangladeshi students start applying for scholarships?
            </summary>
            <p>
              Start 10 to 12 months before your intake. Chevening and
              Commonwealth close in October, Stipendium Hungaricum in
              mid-January, Türkiye Burslari in February and Australia Awards in
              April, all for study that starts the following autumn or later.
            </p>
          </details>
          <details>
            <summary>Can Sunrise guarantee me a scholarship?</summary>
            <p>
              No. Scholarship committees and governments choose their own
              winners, and many programs accept only a small share of
              applicants. Sunrise improves your chances by matching you with
              realistic scholarships, strengthening your documents and preparing
              you for interviews.
            </p>
          </details>
          <details>
            <summary>Is the scholarship eligibility check free?</summary>
            <p>
              Yes. The first profile and scholarship eligibility assessment at
              Sunrise is free, in Banani, Dhaka, in Sylhet or online. Ask your
              counsellor to explain any service charge for full application
              support before you start.
            </p>
          </details>
          <details>
            <summary>
              Do I still need bank solvency if I win a scholarship?
            </summary>
            <p>
              It depends on the scholarship and the embassy. A fully funded
              government scholarship usually reduces or replaces the proof of
              funds, while a partial scholarship or tuition waiver only lowers
              the amount you must show. Always check the current embassy rule
              for your country.
            </p>
          </details>
          <details>
            <summary>
              Are scholarships available for master's students with a low CGPA?
            </summary>
            <p>
              Options are narrower but real. Need-based awards such as Italy's
              DSU, partial university scholarships in Cyprus, Malaysia and
              Malta, and some Erasmus Mundus programs weigh your full profile,
              including work experience and motivation, not grades alone.
            </p>
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

<script setup lang="ts">
/**
 * Scholarships page: level filter, read-more cards, comparison-table jump links and scroll reveal.
 * Markup is static; behaviour is wired in onMounted (same approach as SiteHeader / SiteFooter).
 * Layout already provides <main id="main">, so this page root is a <div>.
 */
const root = ref<HTMLElement | null>(null);

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
          name: "Scholarships",
          item: "https://sunrise-bd.net/scholarships",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://sunrise-bd.net/scholarships#page",
      url: "https://sunrise-bd.net/scholarships",
      name: "Scholarships for Bangladeshi Students to Study Abroad",
      description:
        "A guide to fully funded and partial scholarships open to Bangladeshi students, with coverage, eligibility, application windows and scholarship application support from Sunrise Education Consultants.",
      inLanguage: "en",
      dateModified: "2026-09-29",
      about: [
        {
          "@type": "Thing",
          name: "Scholarship",
        },
        {
          "@type": "Thing",
          name: "International education",
        },
        {
          "@type": "Country",
          name: "Bangladesh",
        },
      ],
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
      mainEntity: {
        "@type": "ItemList",
        name: "Scholarships for Bangladeshi students",
        numberOfItems: 10,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "MonetaryGrant",
              name: "Stipendium Hungaricum",
              url: "https://stipendiumhungaricum.hu/",
              funder: {
                "@type": "GovernmentOrganization",
                name: "Government of Hungary (Tempus Public Foundation)",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "MonetaryGrant",
              name: "Chinese Government Scholarship (CSC)",
              url: "https://www.campuschina.org/",
              funder: {
                "@type": "GovernmentOrganization",
                name: "China Scholarship Council",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "MonetaryGrant",
              name: "Türkiye Burslari (Türkiye Scholarships)",
              url: "https://www.turkiyeburslari.gov.tr/",
              funder: {
                "@type": "GovernmentOrganization",
                name: "Presidency for Turks Abroad and Related Communities (YTB)",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "MonetaryGrant",
              name: "DSU Regional Scholarship (Italy)",
              funder: {
                "@type": "GovernmentOrganization",
                name: "Italian regional right-to-study agencies",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 5,
            item: {
              "@type": "MonetaryGrant",
              name: "Finland Scholarship and university tuition waivers",
              url: "https://www.studyinfinland.fi/",
              funder: {
                "@type": "GovernmentOrganization",
                name: "Finnish National Agency for Education",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 6,
            item: {
              "@type": "MonetaryGrant",
              name: "Erasmus Mundus Joint Masters Scholarship",
              url: "https://erasmus-plus.ec.europa.eu/",
              funder: {
                "@type": "GovernmentOrganization",
                name: "European Commission",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 7,
            item: {
              "@type": "MonetaryGrant",
              name: "Chevening Scholarship",
              url: "https://www.chevening.org/scholarship/bangladesh/",
              funder: {
                "@type": "GovernmentOrganization",
                name: "UK Foreign, Commonwealth & Development Office",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 8,
            item: {
              "@type": "MonetaryGrant",
              name: "Commonwealth Master's Scholarship",
              url: "https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships",
              funder: {
                "@type": "GovernmentOrganization",
                name: "Commonwealth Scholarship Commission in the UK",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 9,
            item: {
              "@type": "MonetaryGrant",
              name: "Fulbright Foreign Student Program",
              url: "https://bd.usembassy.gov/",
              funder: {
                "@type": "GovernmentOrganization",
                name: "U.S. Department of State",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 10,
            item: {
              "@type": "MonetaryGrant",
              name: "Australia Awards Scholarship",
              url: "https://australiaawardsbangladesh.org/",
              funder: {
                "@type": "GovernmentOrganization",
                name: "Australian Department of Foreign Affairs and Trade",
              },
            },
          },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://sunrise-bd.net/scholarships#service",
      name: "Scholarship application support for Bangladeshi students",
      serviceType: "Scholarship consultancy",
      description:
        "Eligibility checks, scholarship shortlisting, application calendars, motivation letter and study plan review, nomination paperwork, interview preparation and post-award admission and visa support.",
      provider: {
        "@id": "https://sunrise-bd.net/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
      url: "https://sunrise-bd.net/scholarships",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which scholarships can Bangladeshi students get to study abroad?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Major scholarships open to Bangladeshi students include Stipendium Hungaricum (Hungary), the Chinese Government Scholarship (CSC), Türkiye Burslari (Turkey), Italy's regional DSU scholarship, the Finland Scholarship, Erasmus Mundus (Europe), Chevening and Commonwealth scholarships (UK), Fulbright (USA) and Australia Awards. Universities in most countries also offer partial scholarships and tuition waivers.",
          },
        },
        {
          "@type": "Question",
          name: "Which fully funded scholarships can I apply for after HSC?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "After HSC, Bangladeshi students can apply for bachelor's scholarships such as Stipendium Hungaricum, the Chinese Government Scholarship and Türkiye Burslari, all of which cover tuition and give a monthly stipend. Italy's DSU scholarship is also open to bachelor's students and is based on family income. Chevening, Commonwealth, Fulbright and Australia Awards are for master's study only.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get a scholarship without IELTS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, in some cases. Türkiye Burslari does not ask for IELTS at application, many Chinese and Hungarian universities accept a Medium of Instruction (MOI) certificate, and some Italian universities accept MOI for DSU-eligible programs. UK, US and Australian government scholarships normally need an English test score.",
          },
        },
        {
          "@type": "Question",
          name: "What CGPA or GPA do I need for a scholarship?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no single cut-off. Türkiye Burslari asks for at least 70% for bachelor's and 75% for master's applicants, while Chevening, Fulbright and Australia Awards look for a strong record plus work experience. Need-based scholarships such as Italy's DSU depend on family income first, then on academic progress from the second year.",
          },
        },
        {
          "@type": "Question",
          name: "When should Bangladeshi students start applying for scholarships?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start 10 to 12 months before your intake. Chevening and Commonwealth close in October, Stipendium Hungaricum in mid-January, Türkiye Burslari in February and Australia Awards in April, all for study that starts the following autumn or later.",
          },
        },
        {
          "@type": "Question",
          name: "Can Sunrise guarantee me a scholarship?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Scholarship committees and governments choose their own winners, and many programs accept only a small share of applicants. Sunrise improves your chances by matching you with realistic scholarships, strengthening your documents and preparing you for interviews.",
          },
        },
        {
          "@type": "Question",
          name: "Is the scholarship eligibility check free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The first profile and scholarship eligibility assessment at Sunrise is free, in Banani, Dhaka, in Sylhet or online. Ask your counsellor to explain any service charge for full application support before you start.",
          },
        },
        {
          "@type": "Question",
          name: "Do I still need bank solvency if I win a scholarship?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on the scholarship and the embassy. A fully funded government scholarship usually reduces or replaces the proof of funds, while a partial scholarship or tuition waiver only lowers the amount you must show. Always check the current embassy rule for your country.",
          },
        },
        {
          "@type": "Question",
          name: "Are scholarships available for master's students with a low CGPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Options are narrower but real. Need-based awards such as Italy's DSU, partial university scholarships in Cyprus, Malaysia and Malta, and some Erasmus Mundus programs weigh your full profile, including work experience and motivation, not grades alone.",
          },
        },
      ],
    },
  ],
};

useSeoMeta({
  title: "Scholarships for Bangladeshi Students to Study Abroad",
  description:
    "Fully funded and partial scholarships for Bangladeshi students: Stipendium Hungaricum, CSC, Türkiye Burslari, DSU, Chevening and more, plus free help to apply.",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: "Scholarships for Bangladeshi Students to Study Abroad",
  ogDescription:
    "10 major scholarships compared for Bangladeshi students, with an application calendar, eligibility rules and free application help from Sunrise.",
  ogUrl: "https://sunrise-bd.net/scholarships",
  ogSiteName: "Sunrise Education Consultants",
  twitterCard: "summary_large_image",
});

useHead({
  link: [{ rel: "canonical", href: "https://sunrise-bd.net/scholarships" }],
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(schema) }],
});

onMounted(() => {
  const r = root.value;
  if (!r) return;

  const on = (t: Element, ev: string, fn: (e: any) => void) => {
    t.addEventListener(ev, fn);
    cleanups.push(() => t.removeEventListener(ev, fn));
  };

  /* ---- level filter ---- */
  const tabs = r.querySelectorAll<HTMLElement>(".ssp-tab");
  const cards = r.querySelectorAll<HTMLElement>(".ssp-card");
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
        c.hidden = !(
          f === "all" ||
          (" " + c.getAttribute("data-l") + " ").includes(" " + f + " ")
        );
      });
    }),
  );

  /* ---- read more ---- */
  const setOpen = (c: HTMLElement, o: boolean) => {
    c.classList.toggle("is-open", o);
    const b = c.querySelector<HTMLElement>(".ssp-more");
    if (b) {
      b.setAttribute("aria-expanded", String(o));
      b.textContent = o ? "Show less" : "Read more";
    }
  };
  r.querySelectorAll<HTMLElement>(".ssp-more").forEach((b) =>
    on(b, "click", () => {
      const c = b.closest(".ssp-card") as HTMLElement;
      setOpen(c, !c.classList.contains("is-open"));
    }),
  );

  /* ---- comparison table links: show all cards and open the target card ---- */
  r.querySelectorAll<HTMLElement>('.ssp-table a[href^="#"]').forEach((a) =>
    on(a, "click", () => {
      const c = r.querySelector<HTMLElement>(
        "#" + (a.getAttribute("href") as string).slice(1),
      );
      if (!c) return;
      r.querySelector<HTMLElement>('.ssp-tab[data-f="all"]')?.click();
      setOpen(c, true);
    }),
  );

  /* ---- reveal on scroll ---- */
  const els = r.querySelectorAll<HTMLElement>(".ssp-reveal");
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
