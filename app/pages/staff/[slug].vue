<script setup>
const route = useRoute();
const slug = route.params.slug;

// Current member
const { data: member } = await useApi(`/staff/${slug}`, {
  key: `staff-${slug}`,
  transform: (res) => res.data,
});

if (!member.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Team member not found",
    fatal: true,
  });
}

// Other members. Own cache key: the /staff page caches the RAW response
// under "staff-list", so sharing that key gave us { data: [...] } instead of
// an array. We also normalise below, whatever shape comes back.
const { data: team } = await useApi("/staff", {
  key: "staff-others",
});

const others = computed(() => {
  const raw = team.value;
  const list = Array.isArray(raw) ? raw : raw?.data || [];
  return list.filter((m) => m.slug !== slug).slice(0, 3);
});

// Helpers
const initial = (name) => name?.trim().charAt(0).toUpperCase() || "?";

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Plain text becomes paragraphs; HTML from the admin editor is used as it is.
const aboutHtml = computed(() => {
  const text = member.value?.about?.trim();
  if (!text) return "";
  if (/<\/?[a-z][\s\S]*>/i.test(text)) return text;
  return text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => `<p>${escapeHtml(p).replace(/\r?\n/g, "<br>")}</p>`)
    .join("");
});

const whatsappUrl = computed(() => {
  const w = member.value?.contact?.whatsapp;
  if (!w) return null;
  if (/^https?:\/\//i.test(w)) return w;
  const digits = w.replace(/\D+/g, "");
  return digits ? `https://wa.me/${digits}` : null;
});

const brand = "Sunrise Education Consultants";

useSeoMeta({
  title: () =>
    member.value?.seo?.meta_title || `${member.value?.name} | ${brand}`,
  description: () =>
    member.value?.seo?.meta_description ||
    `${member.value?.name}, ${member.value?.designation || "team member"} at ${brand}.`,
  keywords: () => member.value?.seo?.meta_keywords || "",
  ogTitle: () => `${member.value?.name} | ${brand}`,
  ogImage: () => member.value?.photo || "",
});

// Structured data for Google
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: member.value.name,
        jobTitle: member.value.designation,
        image: member.value.photo,
        email: member.value.contact?.email,
        telephone: member.value.contact?.phone,
        worksFor: { "@type": "Organization", name: brand },
      }),
    },
  ],
});
</script>

<template>
  <main class="sd">
    <!-- ================= HERO ================= -->
    <section class="sd-hero">
      <div class="sd-wrap">
        <nav class="sd-crumbs" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/staff">Our Team</NuxtLink>
          <span>/</span>
          <b>{{ member.name }}</b>
        </nav>

        <div class="sd-hero-grid">
          <!-- Photo -->
          <div class="sd-photo-col">
            <div class="sd-photo-card">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="`${member.name}, ${member.designation || 'Team member'} at ${brand}`"
                class="sd-photo"
              />
              <div v-else class="sd-photo sd-photo-ph">
                {{ initial(member.name) }}
              </div>
              <span v-if="member.experience" class="sd-badge">
                <b>{{ member.experience }}</b>
                <small>Experience</small>
              </span>
            </div>
          </div>

          <!-- Intro -->
          <div class="sd-intro">
            <span class="sd-eyebrow"
              ><span class="sd-dot"></span>Meet the Team</span
            >
            <h1 class="sd-name">{{ member.name }}</h1>
            <p v-if="member.designation" class="sd-role">
              {{ member.designation }}
            </p>

            <ul class="sd-facts">
              <li v-if="member.experience">
                <i class="sd-ico">★</i>
                <span
                  ><b>{{ member.experience }}</b> in international
                  education</span
                >
              </li>
              <li>
                <i class="sd-ico">✓</i>
                <span>Personal guidance from application to arrival</span>
              </li>
            </ul>

            <div class="sd-actions">
              <a
                v-if="member.contact?.phone"
                :href="`tel:${member.contact.phone}`"
                class="sd-btn sd-btn-primary"
              >
                Call Now <span>&rarr;</span>
              </a>
              <a
                v-if="whatsappUrl"
                :href="whatsappUrl"
                target="_blank"
                rel="noopener"
                class="sd-btn sd-btn-line"
              >
                WhatsApp
              </a>
              <a
                v-if="member.contact?.email"
                :href="`mailto:${member.contact.email}`"
                class="sd-btn sd-btn-line"
              >
                Email
              </a>
              <a
                v-if="member.contact?.facebook"
                :href="member.contact.facebook"
                target="_blank"
                rel="noopener"
                class="sd-btn sd-btn-line"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= ABOUT ================= -->
    <section class="sd-about">
      <div class="sd-wrap sd-about-grid">
        <article class="sd-card sd-article">
          <span class="sd-eyebrow"><span class="sd-dot"></span>About</span>
          <h2 class="sd-h2">About {{ member.name.split(" ")[0] }}</h2>
          <div v-if="aboutHtml" class="sd-prose" v-html="aboutHtml"></div>
          <p v-else class="sd-muted">Profile details will be added soon.</p>
        </article>

        <aside class="sd-side">
          <div class="sd-card sd-contact">
            <h3>Get in touch</h3>
            <p class="sd-muted">
              Book a free consultation with {{ member.name.split(" ")[0] }}.
            </p>

            <ul class="sd-contact-list">
              <li v-if="member.contact?.phone">
                <span class="sd-ci">☎</span>
                <div>
                  <small>Phone</small>
                  <a :href="`tel:${member.contact.phone}`">{{
                    member.contact.phone
                  }}</a>
                </div>
              </li>
              <li v-if="member.contact?.email">
                <span class="sd-ci">✉</span>
                <div>
                  <small>Email</small>
                  <a :href="`mailto:${member.contact.email}`">{{
                    member.contact.email
                  }}</a>
                </div>
              </li>
              <li v-if="whatsappUrl">
                <span class="sd-ci">✆</span>
                <div>
                  <small>WhatsApp</small>
                  <a :href="whatsappUrl" target="_blank" rel="noopener"
                    >Chat on WhatsApp</a
                  >
                </div>
              </li>
            </ul>

            <NuxtLink to="/contact-us" class="sd-btn sd-btn-primary sd-btn-block">
              Book Free Consultation <span>&rarr;</span>
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <!-- ================= MORE TEAM ================= -->
    <section v-if="others.length" class="sd-more">
      <div class="sd-wrap">
        <div class="sd-more-head">
          <h2 class="sd-h2">Meet more of the team</h2>
          <NuxtLink to="/staff" class="sd-link">View all &rarr;</NuxtLink>
        </div>

        <div class="sd-more-grid">
          <NuxtLink
            v-for="m in others"
            :key="m.slug"
            :to="`/staff/${m.slug}`"
            class="sd-mini"
          >
            <img v-if="m.photo" :src="m.photo" :alt="m.name" loading="lazy" />
            <div v-else class="sd-mini-ph">{{ initial(m.name) }}</div>
            <div class="sd-mini-body">
              <h3>{{ m.name }}</h3>
              <span>{{ m.designation }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="sd-cta">
      <div class="sd-wrap sd-cta-inner">
        <h2>Ready to Start Your Study Abroad Journey?</h2>
        <p>
          Free consultation, no obligation &mdash; Sunrise Education Consultants
          is ready to help.
        </p>
        <NuxtLink to="/contact-us" class="sd-btn sd-btn-white"
          >Book a Free Consultation <span>&rarr;</span></NuxtLink
        >
      </div>
    </section>
  </main>
</template>

<style scoped>
.sd {
  --sd-green: #16803c;
  --sd-green-dark: #0f6a2f;
  --sd-cream: #fdf5e6;
  --sd-ink: #14231a;
  --sd-mute: #5d6b62;
  --sd-line: #e8e1d0;
  font-family: "Manrope", system-ui, sans-serif;
  color: var(--sd-ink);
}
.sd-wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero */
.sd-hero {
  background: var(--sd-cream);
  padding: 28px 0 72px;
  border-bottom: 1px solid var(--sd-line);
  position: relative;
  overflow: hidden;
}
.sd-hero::before {
  content: "";
  position: absolute;
  width: 460px;
  height: 460px;
  right: -140px;
  top: -180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(22, 128, 60, 0.14), transparent 70%);
}
.sd-crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  color: var(--sd-mute);
  margin-bottom: 34px;
  position: relative;
}
.sd-crumbs a {
  color: var(--sd-mute);
  text-decoration: none;
}
.sd-crumbs a:hover {
  color: var(--sd-green);
}
.sd-crumbs b {
  color: var(--sd-ink);
  font-weight: 600;
}

.sd-hero-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 56px;
  align-items: center;
  position: relative;
}

.sd-photo-card {
  position: relative;
  border-radius: 28px;
  background: var(--sd-green);
  padding: 12px;
  box-shadow: 0 30px 50px -28px rgba(22, 128, 60, 0.7);
  transform: rotate(-1.5deg);
}
.sd-photo {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 20px;
  background: #dfeee4;
}
.sd-photo-ph {
  display: grid;
  place-items: center;
  font-size: 96px;
  font-weight: 800;
  color: var(--sd-green);
}
.sd-badge {
  position: absolute;
  left: -18px;
  bottom: 28px;
  background: #fff;
  border-radius: 16px;
  padding: 12px 18px;
  box-shadow: 0 14px 30px -12px rgba(0, 0, 0, 0.3);
  display: grid;
  transform: rotate(1.5deg);
}
.sd-badge b {
  font-size: 20px;
  color: var(--sd-green);
  line-height: 1.1;
}
.sd-badge small {
  font-size: 12px;
  color: var(--sd-mute);
}

.sd-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 99px;
  background: #fff;
  border: 1px solid var(--sd-line);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--sd-green);
}
.sd-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--sd-green);
}
.sd-name {
  margin: 16px 0 6px;
  font-size: clamp(32px, 4.4vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.025em;
  font-weight: 800;
}
.sd-role {
  margin: 0 0 22px;
  font-size: 19px;
  font-weight: 700;
  color: var(--sd-green);
}

.sd-facts {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  display: grid;
  gap: 12px;
}
.sd-facts li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--sd-mute);
  font-size: 15px;
}
.sd-facts b {
  color: var(--sd-ink);
}
.sd-ico {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  flex: none;
  display: grid;
  place-items: center;
  font-style: normal;
  font-size: 13px;
  background: rgba(22, 128, 60, 0.12);
  color: var(--sd-green);
}

.sd-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.sd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  padding: 0 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    background 0.15s;
}
.sd-btn:hover {
  transform: translateY(-2px);
}
.sd-btn-primary {
  background: var(--sd-green);
  color: #fff;
  box-shadow: 0 12px 22px -12px rgba(22, 128, 60, 0.9);
}
.sd-btn-primary:hover {
  background: var(--sd-green-dark);
}
.sd-btn-line {
  background: #fff;
  color: var(--sd-ink);
  border-color: var(--sd-line);
}
.sd-btn-line:hover {
  border-color: var(--sd-green);
  color: var(--sd-green);
}
.sd-btn-white {
  background: #fff;
  color: var(--sd-green);
}
.sd-btn-block {
  width: 100%;
}

/* About */
.sd-about {
  padding: 64px 0;
  background: #fff;
}
.sd-about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 32px;
  align-items: start;
}
.sd-card {
  background: #fff;
  border: 1px solid var(--sd-line);
  border-radius: 22px;
  padding: 32px;
  box-shadow: 0 18px 40px -30px rgba(20, 35, 26, 0.35);
}
.sd-h2 {
  margin: 14px 0 18px;
  font-size: 28px;
  letter-spacing: -0.02em;
  font-weight: 800;
}
.sd-muted {
  color: var(--sd-mute);
  margin: 0;
}
.sd-prose {
  font-size: 16.5px;
  line-height: 1.8;
  color: #2c3a31;
}
.sd-prose :deep(p) {
  margin: 0 0 18px;
}
.sd-prose :deep(ul),
.sd-prose :deep(ol) {
  padding-left: 22px;
  margin: 0 0 18px;
}
.sd-prose :deep(a) {
  color: var(--sd-green);
}
.sd-prose :deep(img) {
  max-width: 100%;
  border-radius: 14px;
}

.sd-side {
  position: sticky;
  top: 90px;
}
.sd-contact {
  background: var(--sd-cream);
}
.sd-contact h3 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 800;
}
.sd-contact-list {
  list-style: none;
  margin: 22px 0;
  padding: 0;
  display: grid;
  gap: 16px;
}
.sd-contact-list li {
  display: flex;
  align-items: center;
  gap: 14px;
}
.sd-ci {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  flex: none;
  display: grid;
  place-items: center;
  background: #fff;
  color: var(--sd-green);
  font-size: 17px;
  border: 1px solid var(--sd-line);
}
.sd-contact-list small {
  display: block;
  color: var(--sd-mute);
  font-size: 12px;
}
.sd-contact-list a {
  color: var(--sd-ink);
  font-weight: 700;
  text-decoration: none;
  word-break: break-all;
}
.sd-contact-list a:hover {
  color: var(--sd-green);
}

/* More team */
.sd-more {
  padding: 64px 0;
  background: var(--sd-cream);
  border-top: 1px solid var(--sd-line);
}
.sd-more-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 26px;
}
.sd-more-head .sd-h2 {
  margin: 0;
}
.sd-link {
  color: var(--sd-green);
  font-weight: 700;
  text-decoration: none;
}
.sd-more-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.sd-mini {
  display: block;
  background: #fff;
  border: 1px solid var(--sd-line);
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.sd-mini:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 36px -24px rgba(22, 128, 60, 0.6);
}
.sd-mini img,
.sd-mini-ph {
  display: block;
  width: 100%;
  height: 350px !important;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background: #dfeee4;
}
.sd-mini-ph {
  display: grid;
  place-items: center;
  font-size: 56px;
  font-weight: 800;
  color: var(--sd-green);
}
.sd-mini-body {
  padding: 16px 18px 20px;
}
.sd-mini-body h3 {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 800;
}
.sd-mini-body span {
  color: var(--sd-green);
  font-size: 14px;
  font-weight: 600;
}

/* CTA */
.sd-cta {
  background: linear-gradient(120deg, #136f33, #1b8f43);
  color: #fff;
  padding: 64px 0;
  text-align: center;
}
.sd-cta h2 {
  margin: 0 0 12px;
  font-size: clamp(26px, 3.6vw, 38px);
  letter-spacing: -0.02em;
  font-weight: 800;
}
.sd-cta p {
  margin: 0 0 26px;
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 980px) {
  .sd-hero-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .sd-photo-card {
    max-width: 360px;
    margin: 0 auto;
  }
  .sd-about-grid {
    grid-template-columns: 1fr;
  }
  .sd-side {
    position: static;
  }
  .sd-more-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .sd-card {
    padding: 22px;
  }
  .sd-more-grid {
    grid-template-columns: 1fr;
  }
  .sd-badge {
    left: 10px;
  }
  .sd-btn {
    flex: 1 1 100%;
  }
}
</style>