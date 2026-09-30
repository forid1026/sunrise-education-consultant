<template>
  <div class="scp">
    <!-- ================= HERO ================= -->
    <section class="scp-hero" aria-labelledby="scp-h1">
      <div class="scp-hero-rays" aria-hidden="true"></div>
      <div class="scp-container">
        <nav class="scp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Contact</span>
        </nav>
        <div class="scp-hero-grid">
          <div>
            <span class="scp-eyebrow"><i></i>We reply fast</span>
            <h1 id="scp-h1" class="scp-h1">
              Contact Sunrise <span>Education Consultants</span>
            </h1>
            <p class="scp-sub">
              Talk to a study abroad counsellor today. Call us, send a WhatsApp
              message, email or visit our head office in Banani, Dhaka, or our
              branch on Jail Road, Sylhet.
              <NuxtLink to="/">Sunrise Education Consultants</NuxtLink> has
              guided Bangladeshi students to universities abroad since 2014, and
              your first consultation is always free.
            </p>
            <div class="scp-cta-row">
              <a class="scp-btn scp-btn-primary" href="tel:+8801911878274"
                ><span v-html="icons.phone"></span>Call Now</a
              >
              <a
                class="scp-btn scp-btn-wa"
                href="https://wa.me/8801811156665"
                target="_blank"
                rel="noopener"
                ><span v-html="icons.waFull"></span>WhatsApp Us</a
              >
              <a class="scp-btn scp-btn-ghost" href="#scp-form"
                >Send a Message</a
              >
            </div>
            <div
              class="scp-status"
              :class="{ 'is-open': status.open === true }"
              aria-live="polite"
            >
              <i></i>
              <span v-if="status.open === null"
                >Office hours: Sat to Thu, 10 am to 6 pm</span
              >
              <span v-else-if="status.open"
                >Open now <small>Banani office closes at 6 pm</small></span
              >
              <span v-else
                >Closed now
                <small>{{
                  status.friday
                    ? "Friday is our day off. WhatsApp us anytime."
                    : "Open Sat to Thu, 10 am to 6 pm. WhatsApp us anytime."
                }}</small></span
              >
            </div>
          </div>
          <aside class="scp-answer" aria-labelledby="scp-quick">
            <h2 id="scp-quick">Quick contact details</h2>
            <ul class="scp-quick">
              <li v-for="q in quick" :key="q.big">
                <a
                  :href="q.href"
                  :target="q.external ? '_blank' : undefined"
                  :rel="q.external ? 'noopener' : undefined"
                >
                  <span class="scp-qi" v-html="q.icon"></span>
                  <span
                    ><b>{{ q.big }}</b
                    ><small>{{ q.small }}</small></span
                  >
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <!-- ================= METHODS ================= -->
    <section class="scp-section" aria-labelledby="scp-ways-h">
      <div class="scp-container">
        <div class="scp-center">
          <span class="scp-eyebrow"><i></i>Choose what suits you</span>
          <h2 id="scp-ways-h" class="scp-h2">
            Four Ways to <span>Reach Us</span>
          </h2>
          <p class="scp-lead">
            Whichever you choose, you speak to a Sunrise counsellor, not a call
            centre. Pick the option that fits your question.
          </p>
        </div>
        <div class="scp-methods">
          <div
            v-for="m in methods"
            :key="m.title"
            class="scp-method scp-reveal"
          >
            <span class="scp-mi" :class="m.cls" v-html="m.icon"></span>
            <h3>{{ m.title }}</h3>
            <p class="scp-val">
              <template v-for="(l, i) in m.val" :key="l"
                >{{ l }}<br v-if="i < m.val.length - 1"
              /></template>
            </p>
            <p>{{ m.text }}</p>
            <a v-if="m.href.startsWith('#')" class="scp-go" :href="m.href"
              >{{ m.go }} &rarr;</a
            >
            <a
              v-else
              class="scp-go"
              :href="m.href"
              :target="m.external ? '_blank' : undefined"
              :rel="m.external ? 'noopener' : undefined"
              >{{ m.go }} &rarr;</a
            >
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FORM ================= -->
    <section
      id="scp-form"
      class="scp-section scp-form-sec"
      aria-labelledby="scp-form-h"
    >
      <div class="scp-container">
        <span class="scp-eyebrow"><i></i>Let's connect</span>
        <h2 id="scp-form-h" class="scp-h2">Send Us <span>a Message</span></h2>
        <p class="scp-lead">
          Tell us a little about your plans and a counsellor will get back to
          you by phone or email, usually within one working day.
        </p>
        <div class="scp-form-grid">
          <form
            class="scp-form scp-reveal"
            aria-label="Contact form"
            @submit.prevent="submitForm"
          >
            <h3>Free study abroad enquiry</h3>
            <p>
              Fields marked
              <em style="color: #d92d20; font-style: normal">*</em> are
              required.
            </p>
            <div class="scp-row">
              <div class="scp-field">
                <label for="f-name">Your name <em>*</em></label
                ><input
                  id="f-name"
                  v-model.trim="form.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                />
              </div>
              <div class="scp-field">
                <label for="f-phone">Phone or WhatsApp <em>*</em></label
                ><input
                  id="f-phone"
                  v-model.trim="form.phone"
                  name="phone"
                  type="tel"
                  autocomplete="tel"
                  inputmode="tel"
                  placeholder="01XXXXXXXXX"
                  pattern="[0-9+\s\-]{11,16}"
                  required
                />
              </div>
            </div>
            <div class="scp-row">
              <div class="scp-field">
                <label for="f-email">Email address</label
                ><input
                  id="f-email"
                  v-model.trim="form.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                />
              </div>
              <div class="scp-field">
                <label for="f-dest">Country you are interested in</label>
                <select
                  id="f-dest"
                  v-model="form.destination"
                  name="destination"
                >
                  <option value="">Not sure yet</option>
                  <option v-for="c in countries" :key="c">{{ c }}</option>
                </select>
              </div>
            </div>
            <div class="scp-row">
              <div class="scp-field">
                <label for="f-subject">Subject <em>*</em></label>
                <select
                  id="f-subject"
                  v-model="form.subject"
                  name="subject"
                  required
                >
                  <option value="">Choose a topic</option>
                  <option v-for="s in subjects" :key="s">{{ s }}</option>
                </select>
              </div>
              <div class="scp-field">
                <label for="f-office">Preferred office</label>
                <select id="f-office" v-model="form.office" name="office">
                  <option>Banani, Dhaka</option>
                  <option>Sylhet</option>
                  <option>Online or phone</option>
                </select>
              </div>
            </div>
            <div class="scp-field">
              <label for="f-msg">Your message <em>*</em></label>
              <textarea
                id="f-msg"
                v-model.trim="form.message"
                name="message"
                required
                placeholder="For example: I finished HSC in 2026 with GPA 4.5 and want to study computer science in Europe."
              ></textarea>
            </div>
            <p class="scp-consent">
              By sending this form you agree that Sunrise may contact you about
              your enquiry. We never share your details. See our
              <NuxtLink to="/privacy-policy">privacy policy</NuxtLink>.
            </p>
            <button
              class="scp-btn scp-btn-primary"
              type="submit"
              :disabled="sending"
            >
              {{ sending ? "Sending..." : "Send Message" }}
              <span aria-hidden="true">&rarr;</span>
            </button>
            <p
              v-if="result === 'ok'"
              role="status"
              style="
                margin: 14px 0 0;
                padding: 12px 14px;
                border-radius: 10px;
                background: rgba(47, 168, 79, 0.1);
                color: #238040;
                font-weight: 700;
                font-size: 14.5px;
              "
            >
              Thank you. Your message has been sent and a counsellor will
              contact you within one working day.
            </p>
            <p
              v-else-if="result === 'error'"
              role="alert"
              style="
                margin: 14px 0 0;
                padding: 12px 14px;
                border-radius: 10px;
                background: #fef3f2;
                color: #b42318;
                font-weight: 700;
                font-size: 14.5px;
              "
            >
              Sorry, we could not send your message. Please call +88 01911 878
              274 or message us on WhatsApp.
            </p>
          </form>

          <div class="scp-side">
            <div class="scp-box scp-reveal">
              <h3>What happens next</h3>
              <ol class="scp-next">
                <li>
                  <b>We read your message</b>A counsellor who handles your
                  chosen country reviews it.
                </li>
                <li>
                  <b>We contact you</b>By phone or email, usually within one
                  working day.
                </li>
                <li>
                  <b>Free assessment</b>We book a free session in Banani, Sylhet
                  or online and plan your next steps.
                </li>
              </ol>
            </div>
            <div class="scp-box scp-reveal">
              <h3>Looking for something specific?</h3>
              <ul class="scp-route">
                <li v-for="r in routes" :key="r.to">
                  {{ r.label }}<NuxtLink :to="r.to">{{ r.link }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= OFFICES ================= -->
    <section id="scp-offices" class="scp-section" aria-labelledby="scp-off-h">
      <div class="scp-container">
        <div class="scp-center">
          <span class="scp-eyebrow"><i></i>Visit us</span>
          <h2 id="scp-off-h" class="scp-h2">
            Our Offices in <span>Dhaka and Sylhet</span>
          </h2>
          <p class="scp-lead">
            Two offices, one team. Visit whichever is closer, or meet us online
            from anywhere in Bangladesh.
          </p>
        </div>
        <div class="scp-offices">
          <article
            v-for="o in offices"
            :id="o.id"
            :key="o.id"
            class="scp-office scp-reveal"
          >
            <div class="scp-map">
              <span class="scp-map-tag">{{ o.tag }}</span>
              <iframe
                :title="o.mapTitle"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                :src="o.mapSrc"
              ></iframe>
            </div>
            <div class="scp-office-body">
              <h3>{{ o.name }}</h3>
              <ul class="scp-facts">
                <li class="full">
                  Address<b>{{ o.address }}</b>
                </li>
                <li>
                  Phone<b
                    ><a :href="`tel:${o.tel}`">{{ o.phone }}</a></b
                  >
                </li>
                <li>
                  Hours<b>{{ o.hours }}</b>
                </li>
              </ul>
              <div class="scp-desc">
                <p v-for="(p, i) in o.paras" :key="i">
                  {{ p
                  }}<template v-if="i === o.paras.length - 1"
                    >{{ o.tail.pre
                    }}<NuxtLink :to="o.tail.to">{{ o.tail.label }}</NuxtLink
                    >{{ o.tail.post }}</template
                  >
                </p>
              </div>
              <div class="scp-office-actions">
                <a
                  class="scp-btn scp-btn-primary"
                  :href="o.dir"
                  target="_blank"
                  rel="noopener"
                  >Get Directions</a
                >
                <a class="scp-btn scp-btn-ghost" :href="`tel:${o.tel}`">{{
                  o.callLabel
                }}</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= BRING + TRUST ================= -->
    <section class="scp-section scp-form-sec" aria-labelledby="scp-bring-h">
      <div class="scp-container">
        <div class="scp-two">
          <div class="scp-reveal">
            <span class="scp-eyebrow"><i></i>Before you come</span>
            <h2 id="scp-bring-h" class="scp-h2">
              What to Bring to <span>Your First Meeting</span>
            </h2>
            <p class="scp-lead" style="margin-bottom: 22px">
              Copies or phone photos are fine for the first session. The more we
              see, the more accurate your plan will be.
            </p>
            <ul class="scp-list">
              <li v-for="b in bring" :key="b">{{ b }}</li>
            </ul>
            <p
              style="
                font-size: 14.5px;
                color: var(--sec-slate);
                margin: 16px 0 0;
                line-height: 1.7;
              "
            >
              Preparing early? Use our free
              <NuxtLink
                to="/resources"
                style="color: var(--sec-green-dk); font-weight: 700"
                >study abroad resources</NuxtLink
              >, including a full document checklist and a budget calculator in
              BDT.
            </p>
          </div>
          <div class="scp-trust scp-reveal">
            <h3>Official Sunrise contact details only</h3>
            <p>
              Some people misuse the names of well-known consultancies. To stay
              safe, contact Sunrise only through the details below, and never
              send money to a personal account. Official payment options are
              listed on our payment page.
            </p>
            <ul>
              <li v-for="t in trustList" :key="t.value">
                {{ t.label }} <b>{{ t.value }}</b>
              </li>
            </ul>
            <p>
              Sunrise Education Consultants was founded in 2014 by
              <NuxtLink to="/staff/anisuzzaman-kiron"
                >Anisuzzaman Kiron</NuxtLink
              >, Founder and CEO. Follow our official pages:
            </p>
            <div class="scp-social">
              <a
                href="https://www.facebook.com/SunriseEC"
                target="_blank"
                rel="noopener"
                aria-label="Sunrise on Facebook"
                ><svg viewBox="0 0 24 24">
                  <path
                    d="M14 9h3V5h-3c-2.8 0-4 1.7-4 4.3V11H7v4h3v9h4v-9h3l1-4h-4V9.6c0-.4.3-.6.6-.6Z"
                  /></svg
              ></a>
              <a
                href="https://www.youtube.com/@SunriseEducationConsultants"
                target="_blank"
                rel="noopener"
                aria-label="Sunrise on YouTube"
                ><svg viewBox="0 0 24 24">
                  <path
                    d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9L15.5 12l-5.8 3.1Z"
                  /></svg
              ></a>
              <a
                href="https://wa.me/8801811156665"
                target="_blank"
                rel="noopener"
                aria-label="Sunrise on WhatsApp"
                ><svg viewBox="0 0 24 24">
                  <path
                    d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z"
                  /></svg
              ></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="scp-section scp-faq" aria-labelledby="scp-faq-h">
      <div class="scp-container">
        <div class="scp-center">
          <span class="scp-eyebrow"><i></i>FAQ</span>
          <h2 id="scp-faq-h" class="scp-h2">
            Contacting Sunrise: <span>Common Questions</span>
          </h2>
        </div>
        <div class="scp-faq-list">
          <details v-for="(f, i) in faqs" :key="f.q" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <p>
              {{ f.a
              }}<template v-if="f.extra">
                {{ f.extra }}
                <NuxtLink :to="f.extraTo">{{ f.extraLink }}</NuxtLink
                >.</template
              >
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="scp-cta" aria-labelledby="scp-cta-h">
      <div class="scp-container">
        <h2 id="scp-cta-h">Ready to Plan Your Study Abroad Journey?</h2>
        <p>
          Book a free profile assessment. A counsellor will review your results,
          budget and goals and tell you honestly which countries fit.
        </p>
        <div class="scp-cta-row" style="justify-content: center; margin: 0">
          <NuxtLink class="scp-btn scp-btn-primary" to="/apply-now"
            >Get Free Assessment
            <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <a class="scp-btn scp-btn-ghost" href="tel:+8801911878274"
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
const pageUrl = siteUrl + "contact-us";
const orgId = siteUrl + "#organization";
const updatedISO = "2026-09-29";

/**
 * Where the contact form is POSTed. '/api/contact' expects a Nuxt server route
 * (server/api/contact.post.ts). If your Laravel backend handles it, put its
 * absolute URL here (needs CORS + no CSRF cookie requirement for this route).
 */
const contactEndpoint = "/api/contact";

const icons = {
  phone:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.23Z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z"/></svg>',
  waFull:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a17 17 0 0 1-1.7-.6 13.4 13.4 0 0 1-5.1-4.5 5.8 5.8 0 0 1-1.2-3.1 3.3 3.3 0 0 1 1-2.5 1.1 1.1 0 0 1 .8-.4h.6c.2 0 .4 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.5.7-.4.4c-.1.2-.3.3-.1.6a9 9 0 0 0 1.6 2 7.9 7.9 0 0 0 2.4 1.4c.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2.2 1c.3.2.5.2.6.4 0 .1 0 .7-.2 1.4Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>',
};

/* ------------------------------------------------------------ data */
const quick = [
  {
    big: "+88 01911 878 274",
    small: "Phone, Saturday to Thursday",
    href: "tel:+8801911878274",
    icon: icons.phone,
  },
  {
    big: "+88 01811 156 665",
    small: "WhatsApp messages and calls",
    href: "https://wa.me/8801811156665",
    icon: icons.wa,
    external: true,
  },
  {
    big: "info@sunrise-bd.net",
    small: "Email for documents and questions",
    href: "mailto:info@sunrise-bd.net",
    icon: icons.mail,
  },
  {
    big: "Banani, Dhaka & Jail Road, Sylhet",
    small: "Maps and directions below",
    href: "#scp-offices",
    icon: icons.pin,
  },
];

const methods = [
  {
    title: "Call",
    cls: "m-call",
    icon: icons.phone,
    val: ["+88 01911 878 274", "+88 01611 878 274"],
    text: "Best for quick questions about countries, intakes and costs, or to book a meeting. Lines are open Saturday to Thursday, 10 am to 6 pm.",
    href: "tel:+8801911878274",
    go: "Call now",
  },
  {
    title: "WhatsApp",
    cls: "m-wa",
    icon: icons.wa,
    val: ["+88 01811 156 665"],
    text: "Best if you live outside Dhaka or Sylhet, or want to send photos of your results. You can message any time and we reply during office hours.",
    href: "https://wa.me/8801811156665",
    go: "Open WhatsApp",
    external: true,
  },
  {
    title: "Email",
    cls: "m-mail",
    icon: icons.mail,
    val: ["info@sunrise-bd.net"],
    text: "Best for sending documents, detailed questions or anything you want in writing. For feedback or a complaint, you can also write to ceo@sunrise-bd.net.",
    href: "mailto:info@sunrise-bd.net",
    go: "Send an email",
  },
  {
    title: "Visit",
    cls: "m-visit",
    icon: icons.pin,
    val: ["Banani, Dhaka", "Jail Road, Sylhet"],
    text: "Best for a full profile assessment with your parents. Bring your results and passport, and a counsellor will build your plan with you face to face.",
    href: "#scp-offices",
    go: "See office maps",
  },
];

const countries = [
  "Italy",
  "Malta",
  "Hungary",
  "Finland",
  "Cyprus",
  "Norway",
  "Greece",
  "Malaysia",
  "China",
  "Turkey",
  "Canada",
  "USA",
  "UK",
  "Australia",
  "New Zealand",
];
const subjects = [
  "Free profile assessment",
  "University admission",
  "Student visa",
  "Scholarships",
  "Visa refusal or reapplication",
  "Accommodation or pre-departure",
  "Payment",
  "Other",
];

const routes = [
  {
    label: "Check your eligibility",
    to: "/apply-now",
    link: "Free assessment",
  },
  { label: "Compare countries", to: "/study-abroad", link: "Destinations" },
  { label: "What we help with", to: "/services", link: "Our services" },
  { label: "Funding your studies", to: "/scholarships", link: "Scholarships" },
  { label: "Pay a service fee", to: "/payment", link: "Payment methods" },
  { label: "Work with us", to: "/career", link: "Careers" },
];

const offices = [
  {
    id: "banani-office",
    tag: "Head office",
    name: "Banani, Dhaka (Head Office)",
    mapTitle: "Map of Sunrise Education Consultants, Banani, Dhaka",
    mapSrc:
      "https://www.google.com/maps?q=Sunrise+Education+Consultants,+House+61,+Road+08,+Block+F,+Banani,+Dhaka+1213&output=embed",
    address: "House 61 (1st Floor), Block F, Road 08, Banani, Dhaka-1213",
    tel: "+8801911878274",
    phone: "+88 01911 878 274",
    hours: "Sat to Thu, 10 am to 6 pm",
    paras: [
      "Our head office in Banani is where Sunrise began in 2014 and where most of our counselling, admission and visa file work happens. Banani sits between Gulshan and Mohakhali, so it is easy to reach from most parts of Dhaka by car, ride-share or bus, and our office is on the first floor of House 61 on Road 08 in Block F.",
      "Counsellors for every destination we work with are based here, so you can compare countries such as Italy, Hungary, Malta, Canada and the USA in a single visit. It is also where we run pre-departure seminars and prepare students for embassy interviews, including mock interviews before visa appointments at VFS Global and the embassies in Dhaka.",
      "If you plan to come with your parents or sponsor, call ahead so we can reserve a counsellor and enough time to go through your finances and documents properly.",
    ],
    tail: {
      pre: " Learn more about our ",
      to: "/education-consultancy-services-in-banani",
      label: "education consultancy services in Banani",
      post: ".",
    },
    dir: "https://www.google.com/maps/dir/?api=1&destination=Sunrise+Education+Consultants+Banani+Dhaka",
    callLabel: "Call Banani",
  },
  {
    id: "sylhet-office",
    tag: "Sylhet branch",
    name: "Jail Road, Sylhet (Branch)",
    mapTitle: "Map of Sunrise Education Consultants, Jail Road, Sylhet",
    mapSrc:
      "https://www.google.com/maps?q=Sunrise+Education+Consultants,+Ananda+Tower,+Jail+Road,+Sylhet+3100&output=embed",
    address: "Ananda Tower (3rd Floor), Jail Road, Sylhet-3100",
    tel: "+8801611878274",
    phone: "+88 01611 878 274",
    hours: "Please call before visiting",
    paras: [
      "Our Sylhet branch serves students from Sylhet city and the wider Sylhet division, so families no longer need to travel to Dhaka for study abroad counselling. The office is on the third floor of Ananda Tower on Jail Road, in the centre of the city.",
      "The Sylhet team offers the same free profile assessment, country and university shortlisting, scholarship guidance and student visa file preparation as our head office. Files prepared in Sylhet are reviewed together with the Banani team, so you get the same standard of checking wherever you start.",
      "Many students from Sylhet have family links in the UK and Europe, and we help you understand how that fits with your study plans and your visa.",
    ],
    tail: {
      pre: " See our ",
      to: "/sylhet-branch",
      label: "Sylhet branch",
      post: " page for more about the office and team.",
    },
    dir: "https://www.google.com/maps/dir/?api=1&destination=Sunrise+Education+Consultants+Sylhet",
    callLabel: "Call Sylhet",
  },
];

const bring = [
  "Passport, if you already have one",
  "SSC and HSC certificates and marksheets",
  "Bachelor's certificate and transcript, for master's applicants",
  "IELTS, PTE or Duolingo score, or an MOI certificate",
  "A rough idea of your total budget and who will sponsor you",
  "Any previous visa refusal letter",
];
const trustList = [
  { label: "Phone", value: "+88 01911 878 274" },
  { label: "Phone", value: "+88 01611 878 274" },
  { label: "WhatsApp", value: "+88 01811 156 665" },
  { label: "Email", value: "info@sunrise-bd.net" },
  { label: "CEO", value: "ceo@sunrise-bd.net" },
];

interface Faq {
  q: string;
  a: string;
  extra?: string;
  extraTo?: string;
  extraLink?: string;
}
const faqs: Faq[] = [
  {
    q: "What are Sunrise Education Consultants' office hours?",
    a: "The Banani office in Dhaka is open Saturday to Thursday from 10:00 am to 6:00 pm and closed on Friday. Please call before visiting the Sylhet branch or on public holidays.",
  },
  {
    q: "Do I need an appointment to visit the office?",
    a: "Walk-ins are welcome during office hours, but booking ahead by phone or WhatsApp means a counsellor for your country is free when you arrive, so you do not have to wait.",
  },
  {
    q: "Is the first consultation free?",
    a: "Yes. The first profile assessment is free, whether you visit the Banani or Sylhet office, call, message on WhatsApp or book online.",
    extra: "You can also start with our",
    extraTo: "/apply-now",
    extraLink: "free assessment form",
  },
  {
    q: "Can I get counselling online or on WhatsApp?",
    a: "Yes. Students from any district in Bangladesh can take counselling by phone, WhatsApp or video call and share documents digitally. Message +88 01811 156 665 on WhatsApp to book a time.",
  },
  {
    q: "Where are Sunrise Education Consultants' offices?",
    a: "The head office is at House 61 (1st Floor), Block F, Road 08, Banani, Dhaka-1213. The Sylhet branch is at Ananda Tower (3rd Floor), Jail Road, Sylhet-3100.",
  },
  {
    q: "How can I be sure I am talking to the real Sunrise?",
    a: "Use only the phone numbers, WhatsApp number and email addresses listed on sunrise-bd.net. Sunrise never asks you to send money to a personal account. If anyone contacts you in Sunrise's name from another number, call +88 01911 878 274 to check.",
  },
  {
    q: "What should I bring to my first meeting?",
    a: "Bring your passport if you have one, SSC and HSC results, bachelor's results for master's applications, any IELTS score or MOI certificate, and a rough idea of your total budget. Photos on your phone are enough for the first meeting.",
  },
];

/* ------------------------------------------------------------ office status (Dhaka time) */
const status = reactive<{ open: boolean | null; friday: boolean }>({
  open: null,
  friday: false,
});
let statusTimer: ReturnType<typeof setInterval> | undefined;
function updateStatus() {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dhaka",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const get = (t: string) => parts.find((p) => p.type === t)?.value || "";
    const day = get("weekday");
    const mins =
      (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
    status.friday = day === "Fri";
    status.open = day !== "Fri" && mins >= 600 && mins < 1080;
  } catch {
    /* keep default text */
  }
}

/* ------------------------------------------------------------ form */
const form = reactive({
  name: "",
  phone: "",
  email: "",
  destination: "",
  subject: "",
  office: "Banani, Dhaka",
  message: "",
});
const sending = ref(false);
const result = ref<"idle" | "ok" | "error">("idle");
async function submitForm() {
  if (sending.value) return;
  sending.value = true;
  result.value = "idle";
  try {
    await $fetch(contactEndpoint, { method: "POST", body: { ...form } });
    result.value = "ok";
    Object.assign(form, {
      name: "",
      phone: "",
      email: "",
      destination: "",
      subject: "",
      office: "Banani, Dhaka",
      message: "",
    });
  } catch {
    result.value = "error";
  } finally {
    sending.value = false;
  }
}

/* ------------------------------------------------------------ SEO */
useSeoMeta({
  title: "Contact Sunrise Education Consultants | Banani & Sylhet",
  description:
    "Call, WhatsApp, email or visit Sunrise Education Consultants in Banani, Dhaka and Jail Road, Sylhet. Office hours, maps, directions and a free assessment form.",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: "Contact Sunrise Education Consultants",
  ogDescription:
    "Offices in Banani, Dhaka and Jail Road, Sylhet. Call +88 01911 878 274, WhatsApp +88 01811 156 665 or email info@sunrise-bd.net.",
  ogUrl: pageUrl,
  ogSiteName: "Sunrise Education Consultants",
  twitterCard: "summary_large_image",
});

const logo = siteUrl + "upload/logo/sunrise-logo.png";
const contactPoint = (
  tel: string,
  type: string,
  extra: Record<string, unknown> = {},
) => ({
  "@type": "ContactPoint",
  contactType: type,
  telephone: tel,
  ...extra,
  areaServed: "BD",
  availableLanguage: ["English", "Bengali"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Contact", item: pageUrl },
      ],
    },
    {
      "@type": "ContactPage",
      "@id": pageUrl + "#page",
      url: pageUrl,
      name: "Contact Sunrise Education Consultants",
      description:
        "Phone, WhatsApp, email, office hours, maps and a contact form for Sunrise Education Consultants' offices in Banani, Dhaka and Jail Road, Sylhet.",
      inLanguage: "en",
      dateModified: updatedISO,
      about: { "@id": orgId },
      mainEntity: { "@id": orgId },
    },
    {
      "@type": "EducationalOrganization",
      "@id": orgId,
      name: "Sunrise Education Consultants",
      url: siteUrl,
      logo,
      foundingDate: "2014",
      founder: {
        "@type": "Person",
        name: "Anisuzzaman Kiron",
        jobTitle: "Founder & CEO",
        url: siteUrl + "staff/anisuzzaman-kiron",
      },
      email: "info@sunrise-bd.net",
      telephone: "+8801911878274",
      sameAs: [
        "https://www.facebook.com/SunriseEC",
        "https://www.youtube.com/@SunriseEducationConsultants",
      ],
      contactPoint: [
        contactPoint("+8801911878274", "customer service", {
          email: "info@sunrise-bd.net",
        }),
        contactPoint("+8801611878274", "customer service"),
        contactPoint("+8801811156665", "customer support", {
          description: "WhatsApp",
        }),
      ],
      subOrganization: [
        { "@id": pageUrl + "#banani" },
        { "@id": pageUrl + "#sylhet" },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": pageUrl + "#banani",
      name: "Sunrise Education Consultants, Banani (Head Office)",
      parentOrganization: { "@id": orgId },
      url: pageUrl,
      image: logo,
      telephone: "+8801911878274",
      email: "info@sunrise-bd.net",
      priceRange: "Free first consultation",
      address: {
        "@type": "PostalAddress",
        streetAddress: "House 61 (1st Floor), Block F, Road 08, Banani",
        addressLocality: "Dhaka",
        postalCode: "1213",
        addressCountry: "BD",
      },
      hasMap:
        "https://www.google.com/maps/search/?api=1&query=Sunrise+Education+Consultants+Banani+Dhaka",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
          ],
          opens: "10:00",
          closes: "18:00",
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": pageUrl + "#sylhet",
      name: "Sunrise Education Consultants, Sylhet Branch",
      parentOrganization: { "@id": orgId },
      url: siteUrl + "sylhet-branch",
      image: logo,
      telephone: "+8801611878274",
      priceRange: "Free first consultation",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ananda Tower (3rd Floor), Jail Road",
        addressLocality: "Sylhet",
        postalCode: "3100",
        addressCountry: "BD",
      },
      hasMap:
        "https://www.google.com/maps/search/?api=1&query=Sunrise+Education+Consultants+Sylhet",
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

/* ------------------------------------------------------------ lifecycle */
let io: IntersectionObserver | null = null;
onMounted(() => {
  updateStatus();
  statusTimer = setInterval(updateStatus, 60_000);
  const els = document.querySelectorAll<HTMLElement>(".scp .scp-reveal");
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
onBeforeUnmount(() => {
  io?.disconnect();
  if (statusTimer) clearInterval(statusTimer);
});
</script>
