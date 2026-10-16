<script setup>
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;

const siteUrl = "https://sunrise-bd.net/";
const brand = "Sunrise Education Consultants";
const pageUrl = `${siteUrl}events/${slug}`;

/* ---------- Data ---------- */
const { data: event } = await useApi(`/events/${slug}`, {
  key: `event-${slug}`,
  transform: (res) => res.data,
});

if (!event.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Event not found",
    fatal: true,
  });
}

// Same key as the events page, so the list is cached
const { data: all } = await useApi("/events", {
  key: "events-all",
  transform: (res) => res.data,
});

const d = computed(() => eventDate(event.value.date));

const others = computed(() =>
  (all.value || [])
    .filter((e) => e.slug !== slug && e.is_upcoming)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)
    .map((e) => ({ ...e, d: eventDate(e.date) })),
);

/* ---------- Description: plain text becomes paragraphs, editor HTML is kept ---------- */
const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const descriptionHtml = computed(() => {
  const t = (event.value.description || "").trim();
  if (!t) return "";
  if (/<\/?[a-z][\s\S]*>/i.test(t)) return t;
  return t
    .split(/\r?\n\s*\r?\n/)
    .map((p) => `<p>${escapeHtml(p).replace(/\r?\n/g, "<br>")}</p>`)
    .join("");
});

const onProseClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  const a = e.target.closest("a");
  const href = a?.getAttribute("href");
  if (href && href.startsWith("/") && !href.startsWith("//") && !a.target) {
    e.preventDefault();
    router.push(href);
  }
};

/* ---------- Share ---------- */
const copied = ref(false);
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(pageUrl);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {}
};
const shareText = encodeURIComponent(`${event.value.title} | ${brand}`);
const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(pageUrl)}`;

/* ---------- SEO ---------- */
const seoTitle = computed(
  () => event.value.seo?.meta_title || `${event.value.title} | ${brand}`,
);
const seoDesc = computed(
  () =>
    event.value.seo?.meta_description ||
    descriptionHtml.value
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 155) ||
    `${event.value.title} hosted by ${brand}.`,
);

useSeoMeta({
  title: seoTitle,
  description: seoDesc,
  keywords: () => event.value.seo?.meta_keywords || "",
  ogType: "website",
  ogTitle: seoTitle,
  ogDescription: seoDesc,
  ogUrl: pageUrl,
  ogImage: () => event.value.image || "",
  ogSiteName: brand,
  twitterCard: "summary_large_image",
});

useHead({
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
                name: "Events",
                item: `${siteUrl}events`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: event.value.title,
                item: pageUrl,
              },
            ],
          },
          {
            "@type": "Event",
            name: event.value.title,
            startDate: event.value.date,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: event.value.venue || brand,
              address: event.value.venue || "Dhaka, Bangladesh",
            },
            image: event.value.image || undefined,
            description: seoDesc.value,
            url: pageUrl,
            performer: event.value.speaker
              ? { "@type": "Person", name: event.value.speaker }
              : undefined,
            organizer: { "@type": "Organization", name: brand, url: siteUrl },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BDT",
              availability: "https://schema.org/InStock",
              url: `${siteUrl}event/reg/${slug}`,
            },
          },
        ],
      }),
    },
  ],
});
</script>

<template>
  <main v-if="event" class="evd">
    <!-- ================= HERO ================= -->
    <section class="evd-hero">
      <div class="evd-wrap">
        <nav class="evd-crumbs" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <NuxtLink to="/events">Events</NuxtLink><span>/</span>
          <b>{{ event.title }}</b>
        </nav>

        <div class="evd-hero-grid">
          <div>
            <span
              class="evd-status"
              :class="event.is_upcoming ? 'is-up' : 'is-past'"
            >
              <i></i>{{ event.is_upcoming ? "Upcoming event" : "Past event" }}
            </span>
            <h1 class="evd-h1">{{ event.title }}</h1>

            <ul class="evd-quick">
              <li v-if="d.full"><span>&#128197;</span>{{ d.full }}</li>
              <li v-if="event.time"><span>&#128337;</span>{{ event.time }}</li>
              <li v-if="event.venue">
                <span>&#128205;</span>{{ event.venue }}
              </li>
            </ul>

            <div class="evd-actions">
              <NuxtLink
                v-if="event.is_upcoming"
                :to="`/event/reg/${event.slug}`"
                class="evd-btn evd-btn-primary"
              >
                Reserve Your Seat <span>&rarr;</span>
              </NuxtLink>
              <NuxtLink v-else to="/events" class="evd-btn evd-btn-primary"
                >See upcoming events</NuxtLink
              >
              <a href="tel:+8801911878274" class="evd-btn evd-btn-line"
                >Call 01911 878 274</a
              >
            </div>
          </div>

          <div class="evd-photo">
            <img
              v-if="event.image"
              :src="event.image"
              :alt="event.image_alt || event.title"
            />
            <div v-else class="evd-photo-ph">
              <b>{{ d.day }}</b
              ><span>{{ d.month }} {{ d.year }}</span>
            </div>
            <div class="evd-datebox">
              <b>{{ d.day }}</b
              ><small>{{ d.month }}</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= BODY ================= -->
    <section class="evd-body">
      <div class="evd-wrap evd-grid">
        <article class="evd-card">
          <span class="evd-eyebrow"><i></i>About this event</span>
          <h2 class="evd-h2">What to expect</h2>
          <div
            v-if="descriptionHtml"
            class="evd-prose"
            @click="onProseClick"
            v-html="descriptionHtml"
          ></div>
          <p v-else class="evd-muted">Details will be added soon.</p>

          <div class="evd-share">
            <span>Share this event</span>
            <a
              :href="facebookUrl"
              target="_blank"
              rel="noopener"
              aria-label="Share on Facebook"
              >Facebook</a
            >
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener"
              aria-label="Share on WhatsApp"
              >WhatsApp</a
            >
            <button type="button" @click="copyLink">
              {{ copied ? "Link copied" : "Copy link" }}
            </button>
          </div>
        </article>

        <aside class="evd-side">
          <div class="evd-card evd-info">
            <h3>Event details</h3>
            <dl>
              <div v-if="d.full">
                <dt>Date</dt>
                <dd>{{ d.full }}</dd>
              </div>
              <div v-if="event.time">
                <dt>Time</dt>
                <dd>{{ event.time }}</dd>
              </div>
              <div v-if="event.venue">
                <dt>Venue</dt>
                <dd>{{ event.venue }}</dd>
              </div>
              <div v-if="event.speaker">
                <dt>Speaker</dt>
                <dd>{{ event.speaker }}</dd>
              </div>
              <div>
                <dt>Entry</dt>
                <dd>Free</dd>
              </div>
            </dl>
            <NuxtLink
              v-if="event.is_upcoming"
              :to="`/event/reg/${event.slug}`"
              class="evd-btn evd-btn-primary evd-block"
            >
              Reserve Your Seat <span>&rarr;</span>
            </NuxtLink>
            <p v-else class="evd-muted">This event has ended.</p>
          </div>
        </aside>
      </div>
    </section>

    <!-- ================= MORE EVENTS ================= -->
    <section v-if="others.length" class="evd-more">
      <div class="evd-wrap">
        <div class="evd-more-head">
          <h2 class="evd-h2">More upcoming events</h2>
          <NuxtLink to="/events" class="evd-link">View all &rarr;</NuxtLink>
        </div>
        <div class="sec-events-grid">
          <div v-for="e in others" :key="e.id" class="sec-event-card">
            <div class="sec-event-date">
              <span class="sec-event-day">{{ e.d.day }}</span>
              <span class="sec-event-month">{{ e.d.month }}</span>
            </div>
            <NuxtLink
              :to="`/events/${e.slug}`"
              tabindex="-1"
              aria-hidden="true"
            >
              <img
                v-if="e.image"
                class="sec-event-img"
                :src="e.image"
                :alt="e.image_alt || e.title"
                loading="lazy"
              />
              <div v-else class="sec-event-img evd-noimg">
                {{ e.d.month }} {{ e.d.day }}
              </div>
            </NuxtLink>
            <div class="sec-event-body">
              <h3>
                <NuxtLink :to="`/events/${e.slug}`" class="evd-title-link">{{
                  e.title
                }}</NuxtLink>
              </h3>
              <div class="sec-event-meta">
                <span v-if="e.time">&#128337; {{ e.time }}</span>
                <span v-if="e.venue">&#128205; {{ e.venue }}</span>
              </div>
              <NuxtLink :to="`/event/reg/${e.slug}`" class="sec-event-btn"
                >Book Now</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="evd-cta">
      <div class="evd-wrap">
        <h2>Ready to Start Your Study Abroad Journey?</h2>
        <p>
          Free consultation, no obligation. A Sunrise counsellor is ready to
          help.
        </p>
        <NuxtLink to="/apply-now" class="evd-btn evd-btn-white"
          >Get Free Assessment <span>&rarr;</span></NuxtLink
        >
      </div>
    </section>
  </main>
</template>

<style scoped>
.evd {
  --g: #16803c;
  --gd: #0f6a2f;
  --ink: #14231a;
  --mute: #5d6b62;
  --line: #e8e1d0;
  --cream: #fdf5e6;
  font-family: "Manrope", system-ui, sans-serif;
  color: var(--ink);
}
.evd-wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero */
.evd-hero {
  position: relative;
  overflow: hidden;
  background: var(--cream);
  border-bottom: 1px solid var(--line);
  padding: 28px 0 72px;
}
.evd-hero::before {
  content: "";
  position: absolute;
  width: 460px;
  height: 460px;
  right: -140px;
  top: -180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(22, 128, 60, 0.14), transparent 70%);
}
.evd-hero .evd-wrap {
  position: relative;
}
.evd-crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  color: var(--mute);
  margin-bottom: 34px;
}
.evd-crumbs a {
  color: var(--mute);
  text-decoration: none;
}
.evd-crumbs a:hover {
  color: var(--g);
}
.evd-crumbs b {
  color: var(--ink);
  font-weight: 600;
}

.evd-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 52px;
  align-items: center;
}
.evd-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 99px;
  background: #fff;
  border: 1px solid var(--line);
  font-size: 12.5px;
  font-weight: 700;
}
.evd-status i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--mute);
}
.evd-status.is-up {
  color: var(--g);
}
.evd-status.is-up i {
  background: var(--g);
  box-shadow: 0 0 0 4px rgba(22, 128, 60, 0.2);
}
.evd-status.is-past {
  color: var(--mute);
}
.evd-h1 {
  margin: 16px 0 20px;
  font-size: clamp(30px, 4.4vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.025em;
  font-weight: 800;
}

.evd-quick {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  display: grid;
  gap: 12px;
}
.evd-quick li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-weight: 600;
  line-height: 1.5;
}
.evd-quick span {
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 1px solid var(--line);
  font-size: 15px;
}

.evd-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.evd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 50px;
  padding: 0 26px;
  border-radius: 13px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition:
    transform 0.15s,
    background 0.15s;
}
.evd-btn:hover {
  transform: translateY(-2px);
}
.evd-btn-primary {
  background: var(--g);
  color: #fff;
  box-shadow: 0 14px 24px -12px rgba(22, 128, 60, 0.9);
}
.evd-btn-primary:hover {
  background: var(--gd);
}
.evd-btn-line {
  background: #fff;
  color: var(--ink);
  border-color: var(--line);
}
.evd-btn-line:hover {
  border-color: var(--g);
  color: var(--g);
}
.evd-btn-white {
  background: #fff;
  color: var(--g);
}
.evd-block {
  width: 100%;
}

.evd-photo {
  position: relative;
  border-radius: 26px;
  background: var(--g);
  padding: 10px;
  box-shadow: 0 30px 50px -28px rgba(22, 128, 60, 0.7);
  transform: rotate(1.5deg);
}
.evd-photo img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 18px;
  background: #dfeee4;
}
.evd-photo-ph {
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  background: #dfeee4;
  display: grid;
  place-content: center;
  text-align: center;
  color: var(--g);
}
.evd-photo-ph b {
  font-size: 72px;
  line-height: 1;
  font-weight: 800;
}
.evd-photo-ph span {
  font-weight: 700;
}
.evd-datebox {
  position: absolute;
  left: -16px;
  top: 24px;
  width: 66px;
  padding: 10px 0;
  border-radius: 16px;
  background: #fff;
  text-align: center;
  box-shadow: 0 14px 28px -12px rgba(0, 0, 0, 0.35);
  transform: rotate(-3deg);
}
.evd-datebox b {
  display: block;
  font-size: 24px;
  line-height: 1;
  color: var(--g);
  font-weight: 800;
}
.evd-datebox small {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--mute);
}

/* Body */
.evd-body {
  padding: 60px 0;
  background: #fff;
}
.evd-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 32px;
  align-items: start;
}
.evd-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 32px;
  box-shadow: 0 18px 40px -30px rgba(20, 35, 26, 0.35);
}
.evd-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 99px;
  background: var(--cream);
  border: 1px solid var(--line);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--g);
}
.evd-eyebrow i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--g);
}
.evd-h2 {
  margin: 14px 0 18px;
  font-size: 28px;
  letter-spacing: -0.02em;
  font-weight: 800;
}
.evd-muted {
  color: var(--mute);
  margin: 0;
  line-height: 1.6;
}

.evd-prose {
  font-size: 16.5px;
  line-height: 1.8;
  color: #2c3a31;
}
.evd-prose :deep(p) {
  margin: 0 0 18px;
}
.evd-prose :deep(h2),
.evd-prose :deep(h3) {
  margin: 26px 0 12px;
  color: var(--ink);
  line-height: 1.3;
}
.evd-prose :deep(ul),
.evd-prose :deep(ol) {
  padding-left: 22px;
  margin: 0 0 18px;
}
.evd-prose :deep(li) {
  margin-bottom: 6px;
}
.evd-prose :deep(a) {
  color: var(--g);
  font-weight: 600;
}
.evd-prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 14px;
}

.evd-share {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}
.evd-share span {
  font-weight: 700;
  font-size: 14px;
  margin-right: 4px;
}
.evd-share a,
.evd-share button {
  height: 38px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  font: 600 13.5px/1 inherit;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
.evd-share a:hover,
.evd-share button:hover {
  border-color: var(--g);
  color: var(--g);
}

.evd-side {
  position: sticky;
  top: 90px;
}
.evd-info {
  background: var(--cream);
  display: grid;
  gap: 18px;
}
.evd-info h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
}
.evd-info dl {
  margin: 0;
  display: grid;
  gap: 14px;
}
.evd-info dt {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--g);
  margin-bottom: 3px;
}
.evd-info dd {
  margin: 0;
  font-weight: 600;
  line-height: 1.5;
}

/* More */
.evd-more {
  padding: 64px 0;
  background: var(--cream);
  border-top: 1px solid var(--line);
}
.evd-more-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 26px;
}
.evd-more-head .evd-h2 {
  margin: 0;
}
.evd-link {
  color: var(--g);
  font-weight: 700;
  text-decoration: none;
}
.evd-title-link {
  color: inherit;
  text-decoration: none;
}
.evd-title-link:hover {
  color: var(--g);
}
.evd-noimg {
  display: grid;
  place-items: center;
  min-height: 180px;
  font-size: 28px;
  font-weight: 800;
  color: var(--g);
  background: #dfeee4;
}

/* CTA */
.evd-cta {
  background: linear-gradient(120deg, #136f33, #1b8f43);
  color: #fff;
  padding: 64px 0;
  text-align: center;
}
.evd-cta h2 {
  margin: 0 0 12px;
  font-size: clamp(26px, 3.6vw, 38px);
  letter-spacing: -0.02em;
  font-weight: 800;
}
.evd-cta p {
  margin: 0 0 26px;
  opacity: 0.9;
}

@media (max-width: 980px) {
  .evd-hero-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .evd-photo {
    max-width: 460px;
  }
  .evd-grid {
    grid-template-columns: 1fr;
  }
  .evd-side {
    position: static;
  }
}
@media (max-width: 560px) {
  .evd-card {
    padding: 22px;
  }
  .evd-btn {
    flex: 1 1 100%;
  }
  .evd-datebox {
    left: 8px;
  }
}
</style>
