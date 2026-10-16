<template>
  <div class="svp">
    <!-- ================= HERO ================= -->
    <section class="svp-hero" aria-labelledby="stm-h1">
      <div class="svp-hero-rays" aria-hidden="true"></div>
      <div class="svp-container">
        <nav class="svp-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span
          ><span aria-current="page">Our Team</span>
        </nav>

        <div class="svp-hero-grid">
          <div>
            <span class="svp-eyebrow"
              ><i></i>Named, experienced counsellors</span
            >
            <h1 id="stm-h1" class="svp-h1">
              Meet the Team <span>Behind Sunrise</span>
            </h1>
            <p class="svp-sub">
              A real, named team leads every application at
              <NuxtLink to="/">Sunrise Education Consultants</NuxtLink>, from
              your first free assessment to admission and visa approval. Not an
              anonymous call center.
            </p>
            <div class="svp-cta-row">
              <NuxtLink class="svp-btn svp-btn-primary" to="/apply-now"
                >Get Free Assessment
                <span aria-hidden="true">&rarr;</span></NuxtLink
              >
              <a class="svp-btn svp-btn-ghost" href="#stm-list"
                >Meet the Team</a
              >
            </div>
          </div>

          <aside
            v-if="roleCounts.length > 1"
            class="svp-answer"
            aria-labelledby="stm-browse"
          >
            <h2 id="stm-browse">Browse the team by role</h2>
            <p>Pick a role to see who handles that part of your journey.</p>
            <ul class="svp-picks">
              <li v-for="r in roleCounts" :key="r.name">
                <a href="#stm-list" @click="active = r.name">
                  {{ r.name }}
                  <small
                    >{{ r.count }}
                    {{ r.count === 1 ? "member" : "members" }}</small
                  >
                </a>
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

    <!-- ================= TEAM ================= -->
    <section
      id="stm-list"
      class="svp-section svp-services"
      aria-labelledby="stm-list-h"
    >
      <div class="svp-container">
        <span class="svp-eyebrow"><i></i>Our people</span>
        <h2 id="stm-list-h" class="svp-h2">
          The Counsellors <span>Guiding Your Application</span>
        </h2>
        <p class="svp-lead">
          Every profile shows who they are and what they handle, so you know
          exactly who is working on your case.
        </p>

        <p v-if="pending" class="svp-lead">Loading team…</p>

        <div v-else-if="error" class="stm-msg">
          <p>Could not load the team right now.</p>
          <button
            type="button"
            class="svp-btn svp-btn-primary"
            @click="refresh()"
          >
            Try again
          </button>
        </div>

        <p v-else-if="!team.length" class="svp-lead">
          Team members will be listed here soon.
        </p>

        <template v-else>
          <div
            v-if="roleCounts.length > 1"
            class="stm-chips"
            role="tablist"
            aria-label="Filter by role"
          >
            <button
              v-for="c in chips"
              :key="c"
              type="button"
              role="tab"
              :aria-selected="active === c"
              :class="{ on: active === c }"
              @click="active = c"
            >
              {{ c }}
            </button>
          </div>

          <div class="sec-team-grid stm-grid">
            <div v-for="m in shown" :key="m.slug" class="sec-team-card">
              <img
                v-if="m.photo"
                class="sec-team-photo"
                :src="m.photo"
                :alt="`${m.name}, ${m.designation || 'Team member'} at Sunrise Education Consultants`"
                loading="lazy"
              />
              <div v-else class="sec-team-photo stm-ph">
                {{ initial(m.name) }}
              </div>

              <div class="sec-team-body">
                <h3>{{ m.name }}</h3>
                <span class="sec-team-role">{{ m.designation }}</span>
                <NuxtLink :to="`/staff/${m.slug}`" class="sec-team-link"
                  >View Profile</NuxtLink
                >
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="svp-cta" aria-labelledby="stm-cta-h">
      <div class="svp-container">
        <h2 id="stm-cta-h">Ready to Talk to Your Counsellor?</h2>
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

<script setup>
const siteUrl = "https://sunrise-bd.net/";
const brand = "Sunrise Education Consultants";
const pageUrl = siteUrl + "team"; // change if your route is different

/* ---------- Data ---------- */
const { data, pending, error, refresh } = await useApi("/staff", {
  key: "staff-list",
  transform: (res) => res.data,
});
const team = computed(() => data.value || []);

/* ---------- Role filter ---------- */
const active = ref("All");

const roleCounts = computed(() => {
  const map = new Map();
  team.value.forEach((m) => {
    if (m.designation)
      map.set(m.designation, (map.get(m.designation) || 0) + 1);
  });
  return [...map].map(([name, count]) => ({ name, count }));
});
const chips = computed(() => ["All", ...roleCounts.value.map((r) => r.name)]);
const shown = computed(() =>
  active.value === "All"
    ? team.value
    : team.value.filter((m) => m.designation === active.value),
);

/* ---------- Hero stats ---------- */
const heroStats = computed(() => [
  { big: String(team.value.length), small: "Team members" },
  { big: String(roleCounts.value.length), small: "Different roles" },
  { big: "Free", small: "First profile assessment" },
  { big: "2014", small: "Guiding students since" },
]);

const initial = (n) => n?.trim().charAt(0).toUpperCase() || "?";

/* ---------- SEO ---------- */
useSeoMeta({
  title: `Our Team | ${brand}`,
  description:
    "Meet the experienced counsellors at Sunrise Education Consultants who guide Bangladeshi students from application to visa approval.",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogTitle: `Our Team | ${brand}`,
  ogUrl: pageUrl,
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
                name: "Our Team",
                item: pageUrl,
              },
            ],
          },
          {
            "@type": "CollectionPage",
            url: pageUrl,
            name: "Our Team",
            inLanguage: "en",
            publisher: {
              "@type": "EducationalOrganization",
              name: brand,
              url: siteUrl,
            },
          },
        ],
      }),
    },
  ],
});
</script>

<style scoped>
.stm-msg {
  text-align: center;
  padding: 40px 0;
  color: var(--sec-slate);
}

/* Filter chips */
.stm-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 34px;
}
.stm-chips button {
  border: 1.5px solid var(--sec-line);
  background: #fff;
  color: var(--sec-navy);
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}
.stm-chips button:hover {
  border-color: var(--sec-green);
  color: var(--sec-green-dk);
}
.stm-chips button.on {
  background: var(--sec-navy);
  border-color: var(--sec-navy);
  color: #fff;
}

/* Team grid (reuses .sec-team-card from style.css) */
.stm-grid {
  margin-bottom: 0;
}
.stm-ph {
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
  font-size: 64px;
  font-weight: 800;
  color: var(--sec-green);
}

@media (max-width: 640px) {
  .stm-chips {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 6px;
  }
  .stm-chips button {
    flex: none;
  }
}
</style>
