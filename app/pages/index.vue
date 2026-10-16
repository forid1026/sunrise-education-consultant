<template>
  <div>
    <!-- ================= HERO ================= -->
    <section
      id="sec-hero"
      ref="heroEl"
      class="sec-hero"
      aria-label="Sunrise Education Consultants — Hero"
    >
      <div class="sec-hero-bg" aria-hidden="true">
        <div class="sec-sunburst">
          <span
            v-for="i in 12"
            :key="i"
            class="sec-ray"
            :style="{ '--i': i - 1 }"
          ></span>
        </div>
        <div class="sec-float-icon sec-float-icon-left" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
            <path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3Z" fill="currentColor" />
            <path
              d="M5 10.18v4.6c0 .35.18.67.48.85C6.6 16.28 9.1 17.5 12 17.5s5.4-1.22 6.52-1.87c.3-.18.48-.5.48-.85v-4.6l-7 3.18-7-3.18Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="sec-float-icon sec-float-icon-right" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
            <path
              d="M4 5.5C4 4.67 4.67 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z"
              fill="currentColor"
            />
            <path
              d="M20 5.5c0-.83-.67-1.5-1.5-1.5H13v16h5.5c.83 0 1.5-.67 1.5-1.5v-13Z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
        </div>
        <div ref="pulseEl" class="sec-origin-pulse"></div>
        <svg ref="svgEl" class="sec-route" preserveAspectRatio="none">
          <g ref="pathsG"></g>
          <g ref="destsG"></g>
          <g ref="planeEl" class="sec-plane">
            <text class="sec-plane-icon">&#9992;</text>
          </g>
        </svg>
      </div>

      <div class="sec-hero-content">
        <span class="sec-eyebrow"
          ><span class="sec-eyebrow-dot"></span>Trusted Study Abroad Consultancy
          in Bangladesh</span
        >
        <h1 class="sec-title">
          Bangladesh’s Best Education Consultants
          <span class="sec-title-accent">for Study Abroad Success</span>
        </h1>
        <p class="sec-subtitle">
          Sunrise Education Consultants is one of the leading study abroad
          consultants in Bangladesh, guiding students through admissions,
          scholarships, and visa processing for the USA, UK, Canada, Australia,
          New Zealand, Italy, and more.
        </p>
        <div class="sec-cta-row">
          <NuxtLink to="/apply-now" class="sec-btn sec-btn-primary">
            Get Free Assessment <span class="sec-btn-arrow">&rarr;</span>
          </NuxtLink>
          <NuxtLink to="/study-abroad" class="sec-btn sec-btn-ghost"
            >Explore Destinations</NuxtLink
          >
        </div>
        <div
          class="sec-stats"
          role="group"
          aria-label="Sunrise Education Consultants track record"
        >
          <template v-for="(s, i) in heroStats" :key="s.label">
            <div v-if="i > 0" class="sec-stat-divider"></div>
            <div class="sec-stat">
              <span
                class="sec-stat-num"
                :data-count="s.count"
                :data-suffix="s.suffix"
                >0</span
              >
              <span class="sec-stat-label">{{ s.label }}</span>
            </div>
          </template>
        </div>
        <div class="sec-destinations" aria-label="Study destinations we cover">
          <template v-for="(d, i) in heroDestinations" :key="d">
            <span v-if="i > 0" class="sec-dot">&bull;</span>
            <span>{{ d }}</span>
          </template>
        </div>
      </div>
    </section>

    <!-- ================= ABOUT ================= -->
    <section class="sec-about" aria-label="About Sunrise Education Consultants">
      <div class="sec-about-inner">
        <div class="sec-about-grid">
          <div class="sec-about-media">
            <div class="sec-about-photo sec-photo-ceo">
              <div
                class="sec-photo-img"
                :style="{ backgroundImage: `url(${aboutPhoto})` }"
              ></div>
              <span class="sec-photo-caption">Anisuzzaman Kiron, CEO</span>
            </div>
            <div class="sec-about-photo sec-photo-team">
              <div
                class="sec-photo-img"
                :style="{ backgroundImage: `url(${aboutPhoto})` }"
              ></div>
              <span class="sec-photo-label">Meet Our Team</span>
            </div>
            <div class="sec-about-photo sec-photo-students">
              <div
                class="sec-photo-img"
                :style="{ backgroundImage: `url(${aboutPhoto})` }"
              ></div>
              <span class="sec-photo-label">Our Success Story</span>
            </div>
          </div>
          <div class="sec-about-copy">
            <span class="sec-about-eyebrow"
              ><span class="sec-about-eyebrow-dot"></span>About Sunrise
              Education Consultants</span
            >
            <h2 class="sec-about-title">
              Bangladesh’s Best Education Consultants
              <span class="sec-about-title-accent"
                >&amp; Study Abroad Consultancy Since 2014</span
              >
            </h2>
            <p>
              Sunrise Education Consultants is one of the best education
              consultants in Bangladesh, widely recognized as a top education
              consultancy in Bangladesh for students applying to universities
              across the USA, UK, Canada, Australia, New Zealand, Italy, Malta,
              Hungary, Finland, Cyprus, Malaysia, China, Norway, Turkey, and
              Greece. Founded in 2014 by Anisuzzaman Kiron, Sunrise is
              headquartered in Banani, Dhaka, with a second office serving the
              Sylhet region, giving students in-person access to counselling in
              two of Bangladesh's major cities rather than remote-only support.
            </p>
            <p>
              As a leading education consultancy in Bangladesh, Sunrise guides
              students through the complete admissions journey: university and
              program selection, application and document preparation,
              scholarship arrangement, student visa filing, pre-departure
              briefing, and post-arrival support once they land abroad. Since
              2014, our education consultants in Bangladesh have grown into one
              of the most established names for students planning a study abroad
              journey. Alongside education consulting, Sunrise operates as one
              of the best immigration consultancy firms in Dhaka, supporting
              skilled professionals, families, and business migrants relocating
              to Germany, Italy, Norway, Hungary, Romania, and Dubai, covering
              residence visa processing, business migration, qualification
              recognition, and resettlement services. Every piece of immigration
              advice we give is provided in writing, so students and clients
              have a documented record of their guidance at every step.
            </p>
            <p class="sec-about-quickfacts">
              Founded 2014 &nbsp;&middot;&nbsp; Offices in Dhaka &amp; Sylhet
              &nbsp;&middot;&nbsp; Led by Anisuzzaman Kiron, CEO
            </p>
            <h3 class="sec-about-subhead">Why Students Choose Sunrise</h3>
            <div class="sec-about-list">
              <div
                v-for="(a, i) in aboutPoints"
                :key="a.title"
                class="sec-about-item"
              >
                <span class="sec-about-num">{{ i + 1 }}</span>
                <p>
                  <strong>{{ a.title }}:</strong> {{ a.text }}
                </p>
              </div>
            </div>
            <NuxtLink to="/about-us" class="sec-about-link">
              Read the full story
              <span class="sec-about-link-arrow">&rarr;</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= WHY CHOOSE ================= -->
    <section
      class="sec-why"
      aria-label="Why Choose Sunrise Education Consultants"
    >
      <div class="sec-why-inner">
        <div class="sec-why-head">
          <span class="sec-why-eyebrow"
            ><span class="sec-why-eyebrow-dot"></span>Why Choose Sunrise</span
          >
          <h2 class="sec-why-title">
            Why Choose Sunrise Education Consultants?
          </h2>
          <p class="sec-why-subtitle">
            Four reasons students across Bangladesh consider Sunrise among the
            best education consultancy in Bangladesh for study abroad and visa
            applications, backed by a documented track record, not just a
            promise.
          </p>
        </div>
        <div class="sec-why-grid">
          <div v-for="w in whyCards" :key="w.title" class="sec-why-card">
            <div
              class="sec-why-icon"
              :style="{ background: w.bg }"
              v-html="w.icon"
            ></div>
            <h3>{{ w.title }}</h3>
            <p>{{ w.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= COUNTRIES ================= -->
    <section
      class="sec-countries"
      aria-label="Study Destinations Sunrise Offers"
    >
      <div class="sec-countries-inner">
        <div class="sec-countries-head">
          <span class="sec-countries-eyebrow"
            ><span class="sec-countries-eyebrow-dot"></span>Study
            Destinations</span
          >
          <h2 class="sec-countries-title">Countries We Offer</h2>
          <p class="sec-countries-subtitle">
            Sunrise guides students through admissions, scholarships, and visa
            processing across 15 study destinations — each with its own intake
            schedule, tuition structure, and post-study options.
          </p>
        </div>
      </div>
      <div ref="countriesViewport" class="sec-countries-viewport">
        <div ref="countriesTrack" class="sec-countries-track">
          <div
            v-for="(c, i) in loopCountries"
            :key="c.name + '-' + i"
            class="sec-country-card"
            :aria-hidden="i >= countries.length ? 'true' : undefined"
          >
            <img
              v-if="c.img"
              class="sec-country-img"
              :src="c.img"
              :alt="
                i < countries.length
                  ? `Bangladeshi student studying in ${c.name} with Sunrise Education Consultants`
                  : ''
              "
              loading="lazy"
            />
            <div v-else class="sec-country-img sec-country-img-placeholder">
              <span
                class="sec-country-ph-bg"
                :style="{ background: c.grad }"
              ></span
              >{{ c.name }}
            </div>
            <div class="sec-country-body">
              <span class="sec-country-name">{{ c.name }}</span>
              <p>{{ c.text }}</p>
              <NuxtLink
                :to="c.to"
                class="sec-country-link"
                :tabindex="i >= countries.length ? -1 : undefined"
              >
                Study in {{ c.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PROCESS ================= -->
    <section
      class="sec-process"
      aria-label="How Sunrise Education Consultants Works"
    >
      <div class="sec-process-inner">
        <div class="sec-process-head">
          <span class="sec-process-eyebrow"
            ><span class="sec-process-eyebrow-dot"></span>Our Process</span
          >
          <h2 class="sec-process-title">
            How Sunrise Education Consultants Works, From Consultation to
            Arrival
          </h2>
          <p class="sec-process-subtitle">
            Five steps, one named counsellor guiding you through every one of
            them, from your first free consultation to settling in after you
            land.
          </p>
        </div>
        <div class="sec-process-steps">
          <div
            v-for="(s, i) in processSteps"
            :key="s.title"
            class="sec-process-step"
          >
            <div class="sec-process-num">{{ i + 1 }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= STORIES ================= -->
    <!-- <section
      class="sec-stories"
      aria-label="Sunrise Education Consultants Student Success Stories"
    >
      <div class="sec-stories-inner">
        <div class="sec-stories-head">
          <span class="sec-stories-eyebrow"
            ><span class="sec-stories-eyebrow-dot"></span>Success Stories</span
          >
          <h2 class="sec-stories-title">Our Successful Students Review</h2>
          <p class="sec-stories-subtitle">
            Twelve of the students Sunrise has guided from application to
            admission and visa approval &mdash; with their permission to share.
          </p>
        </div>
      </div>
      <div ref="storiesViewport" class="sec-stories-viewport">
        <div ref="storiesTrack" class="sec-stories-track">
          <div
            v-for="(s, i) in loopStories"
            :key="i"
            class="sec-story-card"
            :aria-hidden="i >= stories.length ? 'true' : undefined"
          >
            <img
              class="sec-story-photo"
              :src="s.image"
              :alt="s.image_alt ?? s.name"
              loading="lazy"
            />
            <span class="sec-story-quotemark" aria-hidden="true">&ldquo;</span>
            <div class="sec-story-body">
              <div class="sec-story-meta">
                <span class="sec-story-country">{{ s.country }}</span>
                <span class="sec-story-dot">&bull;</span>
                <span class="sec-story-year">{{ s.year }}</span>
              </div>
              <p class="sec-story-quote" v-html="s.quotation"></p>
              <div class="sec-story-footer">
                <span class="sec-story-name">{{ s.name }}</span>
                <span class="sec-story-program">{{ s.program }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->


        <!-- ================= STORIES ================= -->
    <section
      v-if="stories.length"
      class="sec-stories"
      aria-label="Sunrise Education Consultants Student Success Stories"
    >
      <div class="sec-stories-inner">
        <div class="sec-stories-head">
          <span class="sec-stories-eyebrow"
            ><span class="sec-stories-eyebrow-dot"></span>Success Stories</span
          >
          <h2 class="sec-stories-title">Our Successful Students Review</h2>
          <p class="sec-stories-subtitle">
            Students Sunrise has guided from application to admission and visa
            approval &mdash; with their permission to share.
          </p>
        </div>
      </div>
      <div ref="storiesViewport" class="sec-stories-viewport">
        <div ref="storiesTrack" class="sec-stories-track">
          <div
            v-for="(s, i) in loopStories"
            :key="i"
            class="sec-story-card"
            :aria-hidden="i >= stories.length ? 'true' : undefined"
          >
            <img
              v-if="s.image"
              class="sec-story-photo"
              :src="s.image"
              :alt="s.image_alt || s.name"
              loading="lazy"
            />
            <div v-else class="sec-story-photo" style="display:grid;place-items:center;font-size:48px;font-weight:800">
              {{ s.name?.trim().charAt(0).toUpperCase() }}
            </div>
            <span class="sec-story-quotemark" aria-hidden="true">&ldquo;</span>
            <div class="sec-story-body">
              <div class="sec-story-meta">
                <span class="sec-story-country">{{ s.country }}</span>
                <template v-if="s.intake">
                  <span class="sec-story-dot">&bull;</span>
                  <span class="sec-story-year">{{ s.intake }}</span>
                </template>
              </div>
              <div class="sec-story-quote" v-html="s.quotation"></div>
              <div class="sec-story-footer">
                <span class="sec-story-name">{{ s.name }}</span>
                <span class="sec-story-program">{{ s.university }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style="text-align:center;margin-top:24px">
        <NuxtLink to="/success-stories" class="sec-team-btn">
          Read All Success Stories <span class="sec-team-btn-arrow">&rarr;</span>
        </NuxtLink>
      </p>
    </section>

    <!-- ================= EVENTS ================= -->
    <section
    v-if="events.length"
      class="sec-events"
      aria-label="Upcoming Events at Sunrise Education Consultants"
    >
      <div class="sec-events-inner">
        <div class="sec-events-head">
          <span class="sec-events-eyebrow"
            ><span class="sec-events-eyebrow-dot"></span>Upcoming Events</span
          >
          <h2 class="sec-events-title">Reserve Your Seat Now</h2>
          <p class="sec-events-subtitle">
            Free seminars and expos on study destinations, scholarships, and
            visa processing &mdash; hosted at our Dhaka and Sylhet offices.
          </p>
        </div>
        <div class="sec-events-grid">
          <div v-for="(e, i) in events" :key="i" class="sec-event-card">
            <div class="sec-event-date">
              <span class="sec-event-day">{{ e.day }}</span
              ><span class="sec-event-month">{{ e.month }}</span>
            </div>
            <NuxtLink
              :to="`/events/${e.slug}`"
              tabindex="-1"
              aria-hidden="true"
            >
            <img
              class="sec-event-img"
              :src="e.image"
              :alt="`${e.title} hosted by Sunrise Education Consultants`"
              loading="lazy"
            />
            </NuxtLink>
            <div class="sec-event-body">
              <h3>
                <NuxtLink :to="`/events/${e.slug}`" class="evp-title-link">{{
                  e.title
                }}</NuxtLink>

              </h3>
              <div class="sec-event-meta">
                <span>&#128337; {{ e.time }}</span
                >
                <span>&#128205; {{ e.venue }}</span>
              </div>
              <NuxtLink :to="`/event/reg/${e.slug}`" class="sec-event-btn"
                >Book Now</NuxtLink
              >
            </div>
          </div>
        </div>
        <div class="sec-events-cta">
          <NuxtLink to="/events" class="sec-events-link-all">
            See All Events <span class="sec-events-link-arrow">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= TEAM ================= -->
    <section
      v-if="team.length"
      class="sec-team"
      aria-label="Meet the Sunrise Education Consultants Team"
    >
      <div class="sec-team-inner">
        <div class="sec-team-head">
          <span class="sec-team-eyebrow"
            ><span class="sec-team-eyebrow-dot"></span>Our Team</span
          >
          <h2 class="sec-team-title">Meet the People Behind Sunrise</h2>
          <p class="sec-team-subtitle">
            A named, experienced team leading your application &mdash; not an
            anonymous call center.
          </p>
        </div>
        <div class="sec-team-grid">
          <div v-for="m in team" :key="m.slug" class="sec-team-card">
            <img
              class="sec-team-photo"
              :src="m.photo"
              :alt="`${m.name}, ${m.role} at Sunrise Education Consultants`"
              loading="lazy"
            />
            <div class="sec-team-body">
              <h3>{{ m.name }}</h3>
              <span class="sec-team-role">{{ m.role }}</span>
              <NuxtLink :to="`/staff/${m.slug}`" class="sec-team-link"
                >View Profile</NuxtLink
              >
            </div>
          </div>
        </div>
        <div class="sec-team-cta">
          <NuxtLink to="/staff" class="sec-team-btn">
            Meet the Full Team <span class="sec-team-btn-arrow">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= CTA BAND ================= -->
    <section
      class="sec-ctatext"
      aria-label="Ready to Start Your Study Abroad Journey"
    >
      <div class="sec-ctatext-bg" aria-hidden="true">
        <div class="sec-ctatext-sunburst">
          <span
            v-for="i in 12"
            :key="i"
            class="sec-ctatext-ray"
            :style="{ '--i': i - 1 }"
          ></span>
        </div>
      </div>
      <div class="sec-ctatext-inner">
        <h2 class="sec-ctatext-title">
          Ready to Start Your Study Abroad Journey?
        </h2>
        <p class="sec-ctatext-subtitle">
          Free consultation, no obligation &mdash; a Sunrise counsellor is ready
          to help.
        </p>
      </div>
    </section>

    <!-- ================= CONTACT ================= -->
    <section
      class="sec-contact"
      aria-label="Book a Free Consultation with Sunrise Education Consultants"
    >
      <div class="sec-contact-bg" aria-hidden="true">
        <div class="sec-contact-ring"></div>
      </div>
      <div class="sec-contact-inner">
        <div class="sec-contact-head">
          <span class="sec-contact-eyebrow"
            ><span class="sec-contact-eyebrow-dot"></span>Get In Touch</span
          >
          <h2 class="sec-contact-title">Book a Free Consultation</h2>
          <p class="sec-contact-subtitle">
            Tell us where you want to study, and a Sunrise counsellor will get
            back to you within one business day &mdash; no cost, no obligation.
          </p>
        </div>
        <div class="sec-contact-grid">
          <form
            class="sec-contact-form"
            action="mailto:info@sunrise-bd.net"
            method="post"
            enctype="text/plain"
          >
            <div class="sec-form-row">
              <div class="sec-form-field">
                <label for="sec-name">Full Name</label>
                <input
                  id="sec-name"
                  type="text"
                  name="Full Name"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div class="sec-form-field">
                <label for="sec-phone">Phone Number</label>
                <input
                  id="sec-phone"
                  type="tel"
                  name="Phone"
                  placeholder="+880 1XXX-XXXXXX"
                  required
                />
              </div>
            </div>
            <div class="sec-form-row">
              <div class="sec-form-field">
                <label for="sec-email">Email Address</label>
                <input
                  id="sec-email"
                  type="email"
                  name="Email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div class="sec-form-field">
                <label for="sec-country">Destination Country</label>
                <select id="sec-country" name="Destination Country" required>
                  <option value="" disabled selected>Select a country</option>
                  <option v-for="c in countryOptions" :key="c">{{ c }}</option>
                </select>
              </div>
            </div>
            <div class="sec-form-field sec-form-field-full">
              <label for="sec-message">Message (optional)</label>
              <textarea
                id="sec-message"
                name="Message"
                rows="4"
                placeholder="Tell us about your academic background or any questions you have"
              ></textarea>
            </div>
            <button type="submit" class="sec-form-submit">
              Book Free Consultation<span class="sec-form-submit-arrow"
                >&rarr;</span
              >
            </button>
            <p class="sec-form-note">
              By submitting, you agree to be contacted by Sunrise Education
              Consultants regarding your inquiry.
            </p>
          </form>
          <div class="sec-contact-info">
            <div class="sec-contact-card">
              <div class="sec-contact-icon">&#128222;</div>
              <div>
                <span class="sec-contact-label">Call Us</span
                ><a href="tel:+8801911878274" class="sec-contact-value"
                  >+880 1911 878 274</a
                >
              </div>
            </div>
            <div class="sec-contact-card">
              <div class="sec-contact-icon">&#9993;</div>
              <div>
                <span class="sec-contact-label">Email Us</span
                ><a href="mailto:info@sunrise-bd.net" class="sec-contact-value"
                  >info@sunrise-bd.net</a
                >
              </div>
            </div>
            <div class="sec-contact-card">
              <div class="sec-contact-icon">&#128172;</div>
              <div>
                <span class="sec-contact-label">WhatsApp</span
                ><a
                  :href="whatsappUrl"
                  target="_blank"
                  rel="noopener"
                  class="sec-contact-value"
                  >+880 1811 156 665</a
                >
              </div>
            </div>
            <div class="sec-contact-card sec-contact-card-address">
              <div class="sec-contact-icon">&#128205;</div>
              <div>
                <span class="sec-contact-label">Banani, Dhaka Office</span
                ><span class="sec-contact-value sec-contact-address"
                  >House 61 (1st Floor), Block F, Road 08, Banani,
                  Dhaka-1213</span
                >
              </div>
            </div>
            <div class="sec-contact-card sec-contact-card-address">
              <div class="sec-contact-icon">&#128205;</div>
              <div>
                <span class="sec-contact-label">Sylhet Office</span
                ><span class="sec-contact-value sec-contact-address"
                  >Ananda Tower (3rd Floor), Jail Road, Sylhet-3100</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section
      v-if="faqs.length"
      class="sec-faq"
      aria-label="Frequently Asked Questions"
    >
      <div class="sec-faq-inner">
        <div class="sec-faq-head">
          <span class="sec-faq-eyebrow"
            ><span class="sec-faq-eyebrow-dot"></span>FAQ</span
          >
          <h2 class="sec-faq-title">Frequently Asked Questions</h2>
          <p class="sec-faq-subtitle">
            Straight answers about how Sunrise works, what it costs, and what to
            expect.
          </p>
        </div>
        <div class="sec-faq-list">
          <div
            v-for="(f, i) in faqs"
            :key="f.id"
            class="sec-faq-item"
            :class="{ 'is-open': openFaq === i }"
          >
            <button
              class="sec-faq-question"
              type="button"
              :aria-expanded="openFaq === i"
              @click="openFaq = openFaq === i ? -1 : i"
            >
              <span>{{ f.question }}</span
              ><span class="sec-faq-icon">&#43;</span>
            </button>
            <div class="sec-faq-answer">
              <p> 
                <div v-html="f.answer"></div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/* ---------------------------------------------------------------- SEO */
const siteUrl = "https://sunrise-bd.net/";
const pageTitle =
  "Sunrise Education Consultants — Bangladesh's Best Education Consultants for Study Abroad Success";
const shortDesc =
  "Best education consultants in Bangladesh for study abroad, scholarships, and visa processing across 15+ countries.";
const ogImage = "https://sunrise-bd.net/upload/og/homepage-share.jpg";

useSeoMeta({
  title: pageTitle,
  description:
    "Sunrise Education Consultants is one of Bangladesh's best education consultants and top education consultancy firms, guiding students on study abroad, scholarships, and visa processing for Italy, Malta, Hungary, Finland, Cyprus, Malaysia, Canada, USA, China, Norway, Turkey, Greece and 15+ countries.",
  ogType: "website",
  ogSiteName: "Sunrise Education Consultants",
  ogTitle: pageTitle,
  ogDescription: shortDesc,
  ogUrl: siteUrl,
  ogImage,
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle,
  twitterDescription: shortDesc,
  twitterImage: ogImage,
});

/* ---------------------------------------------------------------- data */
const aboutPhoto =
  "https://sunrise-bd.net/upload/about_page/1857539077720948.jpeg";
const whatsappUrl =
  "https://api.whatsapp.com/send?phone=8801811156665&text=" +
  encodeURIComponent("Welcome To Sunrise Education Consultants");

const heroStats = [
  { count: 12, suffix: "+", label: "Years Experience" },
  { count: 2500, suffix: "+", label: "Students Placed" },
  { count: 80, suffix: "%", label: "Visa Success Rate" },
  { count: 15, suffix: "+", label: "Countries Covered" },
];
const heroDestinations = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Italy",
  "New Zealand",
  "+9 more",
];

const aboutPoints = [
  {
    title: "12+ Years of Experience",
    text: "guiding Bangladeshi students and migrants since 2014.",
  },
  {
    title: "2,500+ Students & Applicants Supported",
    text: "across university admissions and visa processing.",
  },
  {
    title: "80% Visa Success Rate",
    text: "based on our documented case history.",
  },
  {
    title: "Two Offices, 15+ Study Destinations",
    text: "serving students from Dhaka and Sylhet.",
  },
];

const whyCards = [
  {
    bg: "rgba(47,168,79,0.1)",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12Zm0 2c-3.3 0-9 1.7-9 5v2h18v-2c0-3.3-5.7-5-9-5Z" fill="#2FA84F"/></svg>',
    title: "Personalized, Named-Counsellor Guidance",
    text: "Every student is assigned a dedicated counsellor for their full application timeline, from first consultation through visa decision, with advice matched to their academic background and destination goals, not a one-size-fits-all package.",
  },
  {
    bg: "rgba(245,166,35,0.12)",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M4 12l5-5M4 12l5 5M20 12l-5-5M20 12l-5 5" stroke="#F5A623" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    title: "End-to-End Support, Admission to Arrival",
    text: "We guide students through the complete journey, university shortlisting, application and document preparation, scholarship arrangement, student visa filing, pre-departure briefing, and post-arrival support once they land abroad.",
  },
  {
    bg: "rgba(45,108,180,0.1)",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="#2D6CB4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    title: "Documented 80% Visa Success Rate",
    text: "Our visa success rate is based on our own case history since 2014, handled by a dedicated in-house visa processing team. Every piece of advice we give is provided in writing, so students have a documented record at every step.",
  },
  {
    bg: "rgba(22,33,58,0.06)",
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#16213A" stroke-width="2"/><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9Z" stroke="#16213A" stroke-width="2"/></svg>',
    title: "Two Offices, Global Reach",
    text: "With offices in Banani, Dhaka and Sylhet, students get in-person counselling in two major cities, not remote-only support, with pathways to universities across 15+ destination countries.",
  },
];

const imgBase = "https://studyitalybd.com/wp-content/uploads/2026/08/";
interface Country {
  name: string;
  to: string;
  text: string;
  img?: string;
  grad?: string;
}
const countries: Country[] = [
  {
    name: "Italy",
    to: "/study-abroad/italy",
    img: imgBase + "study-in-milan-italy-international-students.webp.webp",
    text: "Italy is one of Europe's most affordable study destinations, with public universities charging as little as €200–€2,000 per year for eligible international students. Applications for the September intake open through the Universitaly portal each spring, and our visa guidance follows MAECI requirements for the Type D student visa.",
  },
  {
    name: "USA",
    to: "/study-abroad/study-in-usa",
    img: imgBase + "american-elections-vote-right-1-scaled.jpg",
    text: "The USA runs two main intakes each year, Fall (August/September) and Spring (January), backed by one of the widest scholarship ecosystems of any destination, from merit awards to graduate assistantships. We guide students through SEVIS registration and F-1 visa interview preparation from start to finish.",
  },
  {
    name: "UK",
    to: "/study-abroad/study-in-uk",
    img: imgBase + "architect-history-victorian-famous-tower-scaled.jpg",
    text: "UK universities charge international tuition typically between £10,000–£38,000 per year depending on the course. Most programs begin in September, and graduates can stay on the Graduate Route visa for up to 2 years after finishing their degree to gain work experience.",
  },
  {
    name: "Canada",
    to: "/study-abroad/study-in-canada",
    img: imgBase + "canada-day-celebration-with-maple-leaf-symbol-scaled.jpg",
    text: "Canada offers three intakes, September, January, and May, giving students more flexibility than most destinations. Graduates of eligible programs can apply for a Post-Graduation Work Permit valid for up to 3 years, one of the strongest post-study pathways available.",
  },
  {
    name: "Australia",
    to: "/study-abroad/study-in-australia",
    img: imgBase + "ramadan-australia-flag-mosque-scaled.jpg",
    text: "Australian universities run two intakes, in February and July, with annual tuition generally ranging from AUD 20,000–45,000 depending on the program. We support students through the Subclass 500 student visa process from application through arrival.",
  },
  {
    name: "New Zealand",
    to: "/study-abroad/study-in-new-zealand",
    img: imgBase + "person-front-cathedral-scaled.jpg",
    text: "New Zealand's main intakes fall in February and July, and graduates of eligible qualifications can apply for a post-study work visa valid for up to 3 years. It remains one of the more accessible English-speaking destinations in terms of visa approval timelines.",
  },
  {
    name: "Hungary",
    to: "/study-in-hungary-from-bangladesh",
    grad: "linear-gradient(135deg,#436F4D,#2C4A32)",
    text: "Hungary offers some of Europe's lowest tuition, from about €1,200 per year for arts programs up to €8,000 for medicine, plus the government-funded Stipendium Hungaricum scholarship covering tuition and living costs for eligible students. Applicants apply for a national D-type student visa.",
  },
  {
    name: "Malta",
    to: "/study-in-malta-from-bangladesh",
    grad: "linear-gradient(135deg,#CF142B,#8E0E1D)",
    text: "Malta's only public university, the University of Malta, teaches entirely in English, with non-EU tuition typically between €6,500 and €18,000 per year depending on level. As an EU member state, a Maltese student visa also opens Schengen-area travel during breaks.",
  },
  {
    name: "Finland",
    to: "/study-in-finland-from-bangladesh",
    grad: "linear-gradient(135deg,#003580,#002554)",
    text: "Finnish public universities charge non-EU tuition between €8,000 and €20,000 per year. Students apply for a residence permit for studies through Migri, showing at least €9,600 in available funds for the year, and can work up to 30 hours per week during term.",
  },
  {
    name: "Cyprus",
    to: "/study-in-cyprus-from-bangladesh",
    grad: "linear-gradient(135deg,#D57800,#A85E00)",
    text: "Cyprus combines EU-recognized degrees with tuition from about €3,600 to €13,000 per year, most programs taught fully in English. The country runs Fall and Spring intakes, and roughly three-quarters of the population speaks English day to day.",
  },
  {
    name: "Malaysia",
    to: "/study-in-malaysia",
    grad: "linear-gradient(135deg,#0032A0,#000C4E)",
    text: "Malaysia offers three intakes a year, February, July, and October, with public university tuition typically between RM 8,000 and RM 30,000 annually, among the most affordable English-taught options in Asia, with low living costs in Kuala Lumpur and other cities.",
  },
  {
    name: "China",
    to: "/study-in-china",
    grad: "linear-gradient(135deg,#DE2910,#9E1D0B)",
    text: "China runs September and February intakes, with international tuition typically between CNY 20,000 and CNY 50,000 per year, well below equivalent Western programs. The Chinese Government Scholarship (CSC) can cover tuition, accommodation, and a living stipend for eligible applicants.",
  },
  {
    name: "Norway",
    to: "/study-in-norway-from-bangladesh",
    grad: "linear-gradient(135deg,#BA0C2F,#7C0820)",
    text: "Norway's public universities have historically charged no tuition to international students, only a small semester fee, though this policy is under review for upcoming intakes — confirm the current fee position before accepting an offer. Immigration requires proof of roughly NOK 137,907/year for living costs.",
  },
  {
    name: "Turkey",
    to: "/study-in-turkey-from-bangladesh",
    grad: "linear-gradient(135deg,#E30A17,#9E0710)",
    text: "Turkey's public universities are among the most affordable in the world for international students, roughly USD 100–4,000 per year via the YÖS entrance exam, while private universities range from about USD 2,450 to USD 9,000+ for English-taught programs.",
  },
  {
    name: "Greece",
    to: "/study-in-greece-from-bangladesh",
    grad: "linear-gradient(135deg,#0D5EAF,#083E75)",
    text: "Greek public universities charge non-EU students between €1,500 and €9,000 per year depending on level and program, with a growing number of English-taught options in Athens and Thessaloniki. A Greek national Type D student visa is required before travel.",
  },
];
const loopCountries = [...countries, ...countries]; // second copy = seamless marquee loop
const countryOptions = [...countries.map((c) => c.name), "Not sure yet"];

const processSteps = [
  {
    title: "Free Consultation & Profile Assessment",
    text: "Meet with a named Sunrise counsellor at our Dhaka or Sylhet office to review your academic background, budget, and target countries, at no cost.",
  },
  {
    title: "University & Program Shortlisting",
    text: "Your counsellor matches you to suitable universities and programs across our 15 study destinations based on eligibility, intake timing, and tuition budget.",
  },
  {
    title: "Application & Scholarship Submission",
    text: "We prepare and submit your application documents, statement of purpose, and scholarship applications to your shortlisted institutions, tracking each one until decisions arrive.",
  },
  {
    title: "Visa Processing & Interview Prep",
    text: "Our dedicated in-house visa team compiles your required documentation and runs mock interview practice specific to your destination country. All advice is provided in writing.",
  },
  {
    title: "Pre-Departure Briefing & Post-Arrival Support",
    text: "A pre-departure orientation covers what to expect on arrival, and our destination management team stays available for accommodation guidance once you've landed.",
  },
];


/* ---------- Load success stories from the API ---------- */
/* ---------- Load success stories from the API ---------- */
const { data: storyData } = await useApi("/success-stories", {
  key: "stories-list",
  transform: (res: any) => res.data,
});
const stories = computed<any[]>(() => (storyData.value as any[]) || []);
const loopStories = computed(() => [...stories.value, ...stories.value]);

/* ---------- Load upcoming events from the API ---------- */
const { data: eventData } = await useApi("/events", {
  key: "events-upcoming",
  query: { type: "upcoming" },
  transform: (res: any) => res.data,
});
const events = computed<any[]>(() =>
  ((eventData.value as any[]) || []).slice(0, 3).map((e) => ({
    ...e,
    day: eventDate(e.date).day,
    month: eventDate(e.date).month,
  })),
);


// Team comes from the API (same key as the staff page, so it is cached)
const { data: teamData } = await useApi("/staff", {
  key: "staff-list",
  transform: (res: any) => res.data,
});
const team = computed<any[]>(() => (teamData.value as any[]) || []);

/* ---------- Load FAQs from the API ---------- */
const { data: faqData } = await useApi("/faqs", {
  key: "faqs-home",
  query: { group: "general" },
  transform: (res: any) => res.data,
});
const faqs = computed<any[]>(() => (faqData.value as any[]) || []);

const openFaq = ref(0);

/* ---------------------------------------------------------------- JSON-LD */
const org = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Sunrise Education Consultants",
  alternateName: "Sunrise Education Consultancy",
  url: siteUrl,
  logo: "https://sunrise-bd.net/upload/logo/sunrise-logo.png",
  foundingDate: "2014",
  founder: {
    "@type": "Person",
    name: "Anisuzzaman Kiron",
    url: siteUrl + "staff/anisuzzaman-kiron",
  },
  sameAs: [
    "https://facebook.com/SunriseEC",
    "https://youtube.com/@SunriseEducationConsultants",
  ],
  location: [
    {
      "@type": "Place",
      name: "Sunrise Education Consultants — Banani, Dhaka (Head Office)",
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
      name: "Sunrise Education Consultants — Sylhet Branch",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ananda Tower (3rd Floor), Jail Road",
        addressLocality: "Sylhet",
        postalCode: "3100",
        addressCountry: "BD",
      },
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+880-1911-878274",
      contactType: "customer service",
      email: "info@sunrise-bd.net",
      areaServed: "BD",
      availableLanguage: ["English", "Bengali"],
    },
  ],
  areaServed: "BD",
  employee: team.value.map((m) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    url: `${siteUrl}staff/${m.slug}`,
  })),
  // aggregateRating intentionally omitted — add it only with your real Google Business Profile numbers.
};
const howTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Sunrise Education Consultants Works",
  description:
    "The five-step process Sunrise Education Consultants uses to guide Bangladeshi students from initial consultation through university admission, visa processing, and post-arrival support.",
  step: processSteps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.text,
  })),
};
const faqLd = computed(() =>
  faqs.value.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.value.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer_text },
        })),
      }
    : null,
);

useHead({
  link: [{ rel: "canonical", href: siteUrl }],
  script: [org, howTo, faqLd.value].filter(Boolean).map((o) => ({
    type: "application/ld+json",
    innerHTML: JSON.stringify(o),
  })),
});

/* ---------------------------------------------------------------- client behaviour */
const heroEl = ref<HTMLElement | null>(null);
const svgEl = ref<SVGSVGElement | null>(null);
const pathsG = ref<SVGGElement | null>(null);
const destsG = ref<SVGGElement | null>(null);
const planeEl = ref<SVGGElement | null>(null);
const pulseEl = ref<HTMLElement | null>(null);
const countriesViewport = ref<HTMLElement | null>(null);
const countriesTrack = ref<HTMLElement | null>(null);
const storiesViewport = ref<HTMLElement | null>(null);
const storiesTrack = ref<HTMLElement | null>(null);

const cleanups: Array<() => void> = [];
const timers: number[] = [];

const heroDests = [
  { name: "ITALY", fx: 0.64, fy: 0.1 },
  { name: "FINLAND", fx: 0.66, fy: 0.32, plane: true },
  { name: "USA", fx: 0.7, fy: 0.52 },
  { name: "AUSTRALIA", fx: 0.75, fy: 0.7 },
  { name: "NEW ZEALAND", fx: 0.8, fy: 0.88 },
];

function initHero(reduceMotion: boolean) {
  const hero = heroEl.value,
    svg = svgEl.value,
    paths = pathsG.value,
    dests = destsG.value;
  const plane = planeEl.value,
    pulse = pulseEl.value;
  const btn = hero?.querySelector(".sec-btn-primary") as HTMLElement | null;
  if (!hero || !svg || !paths || !dests || !plane || !pulse || !btn) return;
  let firstRun = true;
  const NS = "http://www.w3.org/2000/svg";

  const buildPath = (ox: number, oy: number, dx: number, dy: number) => {
    const c1x = ox + (dx - ox) * 0.42;
    const c1y = oy - Math.abs(oy - dy) * 0.55 - 20;
    const c2x = ox + (dx - ox) * 0.78;
    const c2y = dy + (oy - dy) * 0.08;
    return `M ${ox},${oy} C ${c1x},${c1y} ${c2x},${c2y} ${dx},${dy}`;
  };

  const layout = () => {
    if (window.innerWidth <= 1024) return;
    const hr = hero.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    const w = hr.width,
      h = hr.height;
    const ox = br.right - hr.left - 6;
    const oy = br.top - hr.top + br.height / 2;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));
    pulse.style.left = ox + "px";
    pulse.style.top = oy + "px";
    pulse.style.opacity = "1";
    paths.innerHTML = "";
    dests.innerHTML = "";

    heroDests.forEach((dest, i) => {
      const dx = dest.fx * w,
        dy = dest.fy * h;
      const d = buildPath(ox, oy, dx, dy);
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "sec-route-path");
      paths.appendChild(path);
      const len = path.getTotalLength();
      if (firstRun && !reduceMotion) {
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
        path.style.transition = "none";
        void path.getBoundingClientRect();
        path.style.transition =
          "stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)";
        path.style.transitionDelay = i * 0.14 + "s";
        requestAnimationFrame(() => {
          path.style.strokeDashoffset = "0";
        });
      } else {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      }
      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", String(dx));
      dot.setAttribute("cy", String(dy));
      dot.setAttribute("r", "4");
      dot.setAttribute("class", "sec-dest-dot");
      dests.appendChild(dot);
      const label = document.createElementNS(NS, "text");
      label.setAttribute("x", String(dx));
      label.setAttribute("y", String(dy - 14));
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("class", "sec-dest-label");
      label.textContent = dest.name;
      dests.appendChild(label);
      timers.push(
        window.setTimeout(
          () => {
            dot.classList.add("is-visible");
            label.classList.add("is-visible");
          },
          firstRun ? 1500 + i * 140 : 0,
        ),
      );
      if (dest.plane) {
        (plane.style as any).offsetPath = `path('${d}')`;
        if (!reduceMotion)
          timers.push(
            window.setTimeout(
              () => plane.classList.add("is-flying"),
              firstRun ? 1900 : 0,
            ),
          );
      }
    });
    firstRun = false;
  };

  layout();
  let rt: number;
  const onResize = () => {
    clearTimeout(rt);
    rt = window.setTimeout(layout, 150);
  };
  window.addEventListener("resize", onResize);
  cleanups.push(() => {
    window.removeEventListener("resize", onResize);
    clearTimeout(rt);
  });

  /* count-up stats */
  const nums = hero.querySelectorAll<HTMLElement>(".sec-stat-num");
  const animateCount = (el: HTMLElement) => {
    const target = parseInt(el.dataset.count || "0", 10);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    nums.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());
  } else nums.forEach(animateCount);
}

/* 3D auto-scrolling marquee shared by countries + stories */
function initMarquee(
  viewport: HTMLElement | null,
  track: HTMLElement | null,
  speed: number,
) {
  if (!viewport || !track) return;
  const cards = Array.from(track.children) as HTMLElement[];
  const maxTilt = 22,
    minScale = 0.86,
    minOpacity = 0.55;
  let posX = 0,
    lastTs: number | null = null,
    paused = false,
    half = 0,
    raf = 0;
  const measure = () => {
    half = track.scrollWidth / 2;
  };
  measure();
  const enter = () => {
    paused = true;
  };
  const leave = () => {
    paused = false;
  };
  window.addEventListener("resize", measure);
  viewport.addEventListener("mouseenter", enter);
  viewport.addEventListener("mouseleave", leave);

  const update = () => {
    const vr = viewport.getBoundingClientRect();
    const center = vr.left + vr.width / 2;
    const halfVp = vr.width / 2;
    cards.forEach((card) => {
      const r = card.getBoundingClientRect();
      const c = Math.max(
        -1,
        Math.min(1, (r.left + r.width / 2 - center) / halfVp),
      );
      const a = Math.abs(c);
      card.style.transform = `translateZ(${-a * 60}px) rotateY(${c * -maxTilt}deg) scale(${1 - a * (1 - minScale)})`;
      card.style.opacity = String(1 - a * (1 - minOpacity));
      card.style.zIndex = String(Math.round((1 - a) * 40));
    });
  };
  const step = (ts: number) => {
    if (lastTs === null) lastTs = ts;
    const dt = (ts - lastTs) / 1000;
    lastTs = ts;
    if (!paused) {
      posX += speed * dt;
      if (posX >= half) posX -= half;
      track.style.transform = `translateX(${-posX}px)`;
    }
    update();
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  cleanups.push(() => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", measure);
    viewport.removeEventListener("mouseenter", enter);
    viewport.removeEventListener("mouseleave", leave);
  });
}

onMounted(() => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  initHero(reduceMotion);
  if (!reduceMotion) {
    initMarquee(countriesViewport.value, countriesTrack.value, 55);
    initMarquee(storiesViewport.value, storiesTrack.value, 50);
  }
});

onBeforeUnmount(() => {
  cleanups.forEach((fn) => fn());
  cleanups.length = 0;
  timers.forEach((t) => clearTimeout(t));
  timers.length = 0;
});
</script>
