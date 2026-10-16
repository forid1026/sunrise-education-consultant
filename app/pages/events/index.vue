<script setup>
const siteUrl = "https://sunrise-bd.net/";
const tab = ref("upcoming");

const { data, pending, error, refresh } = await useApi("/events", {
  key: "events-all",
  transform: (res) => res.data,
});

const all = computed(() =>
  (data.value || []).map((e) => ({ ...e, d: eventDate(e.date) })),
);
const upcoming = computed(() =>
  all.value
    .filter((e) => e.is_upcoming)
    .sort((a, b) => a.date.localeCompare(b.date)),
);
const past = computed(() =>
  all.value
    .filter((e) => !e.is_upcoming)
    .sort((a, b) => b.date.localeCompare(a.date)),
);
const shown = computed(() =>
  tab.value === "upcoming" ? upcoming.value : past.value,
);

// Open the past tab automatically when there is nothing upcoming
if (!upcoming.value.length && past.value.length) tab.value = "past";

useSeoMeta({
  title: "Events and Seminars | Sunrise Education Consultants",
  description:
    "Free study abroad seminars, expos and file opening days hosted by Sunrise Education Consultants in Dhaka and Sylhet.",
  ogTitle: "Events and Seminars | Sunrise Education Consultants",
  ogUrl: siteUrl + "events",
  ogSiteName: "Sunrise Education Consultants",
  twitterCard: "summary_large_image",
});

useHead({
  link: [{ rel: "canonical", href: siteUrl + "events" }],
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
                item: siteUrl + "events",
              },
            ],
          },
          ...upcoming.value.map((e) => ({
            "@type": "Event",
            name: e.title,
            startDate: e.date,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: e.venue || "Sunrise Education Consultants",
            },
            image: e.image || undefined,
            url: `${siteUrl}events/${e.slug}`,
            organizer: {
              "@type": "Organization",
              name: "Sunrise Education Consultants",
              url: siteUrl,
            },
          })),
        ],
      }),
    },
  ],
});
</script>

<template>
  <main class="evp">
    <!-- Hero -->
    <section class="evp-hero">
      <div class="evp-wrap">
        <nav class="evp-crumbs" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span><b>Events</b>
        </nav>
        <span class="evp-eyebrow"><i></i>Events &amp; Seminars</span>
        <h1 class="evp-h1">Reserve Your Seat Now</h1>
        <p class="evp-sub">
          Free seminars, expos and file opening days on study destinations,
          scholarships and visa processing, hosted at our Dhaka and Sylhet
          offices.
        </p>
      </div>
    </section>

    <!-- List -->
    <section class="evp-list">
      <div class="evp-wrap">
        <div class="evp-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            :aria-selected="tab === 'upcoming'"
            :class="{ on: tab === 'upcoming' }"
            @click="tab = 'upcoming'"
          >
            Upcoming <small>{{ upcoming.length }}</small>
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="tab === 'past'"
            :class="{ on: tab === 'past' }"
            @click="tab = 'past'"
          >
            Past events <small>{{ past.length }}</small>
          </button>
        </div>

        <p v-if="pending" class="evp-msg">Loading events…</p>

        <div v-else-if="error" class="evp-msg">
          <p>Could not load events right now.</p>
          <button type="button" class="evp-btn" @click="refresh()">
            Try again
          </button>
        </div>

        <div v-else-if="!shown.length" class="evp-msg">
          <p v-if="tab === 'upcoming'">
            No upcoming events right now. Please check back soon.
          </p>
          <p v-else>No past events yet.</p>
        </div>

        <div v-else class="sec-events-grid">
          <article
            v-for="e in shown"
            :key="e.id"
            class="sec-event-card"
            :class="{ 'evp-past': !e.is_upcoming }"
          >
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
                :alt="
                  e.image_alt ||
                  `${e.title} hosted by Sunrise Education Consultants`
                "
                loading="lazy"
              />
              <div v-else class="sec-event-img evp-noimg">
                {{ e.d.month }} {{ e.d.day }}
              </div>
            </NuxtLink>

            <div class="sec-event-body">
              <h3>
                <NuxtLink :to="`/events/${e.slug}`" class="evp-title-link">{{
                  e.title
                }}</NuxtLink>
              </h3>
              <div class="sec-event-meta">
                <span v-if="e.time">&#128337; {{ e.time }}</span>
                <span v-if="e.venue">&#128205; {{ e.venue }}</span>
                <span v-if="e.speaker">&#127908; {{ e.speaker }}</span>
              </div>
              <NuxtLink
                v-if="e.is_upcoming"
                :to="`/event/reg/${e.slug}`"
                class="sec-event-btn"
                >Book Now</NuxtLink
              >
              <NuxtLink
                v-else
                :to="`/events/${e.slug}`"
                class="sec-event-btn evp-btn-ghost"
                >View details</NuxtLink
              >
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.evp {
  font-family: "Manrope", system-ui, sans-serif;
  color: #14231a;
}
.evp-wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

.evp-hero {
  background: #fdf5e6;
  border-bottom: 1px solid #e8e1d0;
  padding: 28px 0 60px;
  text-align: center;
}
.evp-crumbs {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: #5d6b62;
  margin-bottom: 30px;
}
.evp-crumbs a {
  color: #5d6b62;
  text-decoration: none;
}
.evp-crumbs a:hover {
  color: #16803c;
}
.evp-crumbs b {
  color: #14231a;
}
.evp-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 99px;
  background: #fff;
  border: 1px solid #e8e1d0;
  font-size: 12.5px;
  font-weight: 700;
  color: #16803c;
}
.evp-eyebrow i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #16803c;
}
.evp-h1 {
  margin: 16px 0 12px;
  font-size: clamp(30px, 4.4vw, 48px);
  letter-spacing: -0.025em;
  font-weight: 800;
}
.evp-sub {
  margin: 0 auto;
  max-width: 62ch;
  color: #5d6b62;
  line-height: 1.7;
}

.evp-list {
  padding: 48px 0 80px;
}
.evp-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: #f3efe3;
  margin-bottom: 32px;
}
.evp-tabs button {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 9px 18px;
  border-radius: 9px;
  font: 700 14px/1 inherit;
  color: #5d6b62;
}
.evp-tabs button small {
  background: #e8e1d0;
  border-radius: 99px;
  padding: 2px 8px;
  font-size: 11.5px;
}
.evp-tabs button.on {
  background: #fff;
  color: #14231a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.evp-tabs button.on small {
  background: #16803c;
  color: #fff;
}

.evp-msg {
  text-align: center;
  padding: 56px 0;
  color: #5d6b62;
}
.evp-btn {
  margin-top: 12px;
  height: 44px;
  padding: 0 22px;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  background: #16803c;
  color: #fff;
  font: 700 14px/1 inherit;
}

.evp-past {
  opacity: 0.85;
}
.evp-title-link {
  color: inherit;
  text-decoration: none;
}
.evp-title-link:hover {
  color: #16803c;
}
.evp-noimg {
  display: grid;
  place-items: center;
  min-height: 180px;
  font-size: 28px;
  font-weight: 800;
  color: #16803c;
  background: #dfeee4;
}
.evp-btn-ghost {
  background: #fff !important;
  color: #16803c !important;
  border: 1.5px solid #16803c;
}
</style>
