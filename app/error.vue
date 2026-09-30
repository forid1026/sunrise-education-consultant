<template>
  <!-- error.vue renders outside app.vue, so wrap with NuxtLayout to get SiteHeader + SiteFooter -->
  <NuxtLayout>
    <section class="e4-wrap" aria-labelledby="e4-h1">
      <div class="e4-rays" aria-hidden="true"></div>
      <div class="e4-container">
        <!-- 4 [sun] 4 -->
        <div v-if="is404" class="e4-code" aria-hidden="true">
          <span>4</span>
          <svg class="e4-sun" viewBox="0 0 120 120" fill="none">
            <g
              class="e4-sun-rays"
              stroke="currentColor"
              stroke-width="5"
              stroke-linecap="round"
            >
              <path
                d="M60 6v14M60 100v14M6 60h14M100 60h14M22 22l10 10M88 88l10 10M22 98l10-10M88 32l10-10"
              />
            </g>
            <circle cx="60" cy="60" r="28" fill="currentColor" />
          </svg>
          <span>4</span>
        </div>
        <div v-else class="e4-code e4-code-sm" aria-hidden="true">
          <span>{{ error.statusCode || 500 }}</span>
        </div>

        <span class="e4-eyebrow"
          ><i></i
          >{{
            is404 ? "Error 404" : "Error " + (error.statusCode || 500)
          }}</span
        >
        <h1 id="e4-h1" class="e4-h1">{{ title }}</h1>
        <p class="e4-sub">{{ message }}</p>

        <div class="e4-cta">
          <NuxtLink class="e4-btn e4-btn-primary" to="/"
            >Back to Home <span aria-hidden="true">&rarr;</span></NuxtLink
          >
          <NuxtLink class="e4-btn e4-btn-ghost" to="/apply-now"
            >Get Free Assessment</NuxtLink
          >
        </div>

        <div class="e4-popular">
          <h2>Or try one of these pages</h2>
          <ul class="e4-links">
            <li v-for="l in links" :key="l.to">
              <NuxtLink :to="l.to">
                <b>{{ l.title }}</b>
                <small>{{ l.text }}</small>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <p class="e4-help">
          Need help? Call <a href="tel:+8801911878274">+88 01911 878 274</a> or
          email
          <a href="mailto:info@sunrise-bd.net">info@sunrise-bd.net</a>
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

/**
 * Custom error page (404 + any other error). Place this file at the project root, next to app.vue.
 * Nuxt sends the correct HTTP status (404 / 500) automatically on SSR.
 */
const props = defineProps<{ error: NuxtError }>();
const route = useRoute();

const is404 = computed(() => props.error?.statusCode === 404);
const title = computed(() =>
  is404.value ? "Page not found" : "Something went wrong",
);
const message = computed(() =>
  is404.value
    ? "Sorry, the page you are looking for has moved, been renamed or never existed. Check the address, or use one of the links below to get back on track."
    : "An unexpected error happened on our side. Please try again in a moment, or go back to the home page.",
);

const links = [
  {
    to: "/study-abroad",
    title: "Study Abroad",
    text: "Compare 15 destinations",
  },
  {
    to: "/scholarships",
    title: "Scholarships",
    text: "Fully funded and partial",
  },
  { to: "/resources", title: "Resources", text: "Free tools and guides" },
  { to: "/blog", title: "Blog", text: "Guides for Bangladeshi students" },
  {
    to: "/success-story",
    title: "Success Stories",
    text: "Students we sent abroad",
  },
  { to: "/contact-us", title: "Contact Us", text: "Banani, Dhaka and Sylhet" },
];

useSeoMeta({
  title: () =>
    is404.value
      ? "Page Not Found (404) | Sunrise Education Consultants"
      : "Error | Sunrise Education Consultants",
  robots: "noindex, nofollow",
});

/* Nuxt keeps showing error.vue until the error is cleared, so clear it when the user navigates (header/footer links) */
watch(
  () => route.fullPath,
  () => clearError(),
);
</script>

<style scoped>
/* ---------- 404 / ERROR PAGE (append to style.css) ---------- */
.e4-wrap {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--sec-gold-bg) 0%, #fff 100%);
  padding: 70px 0 90px;
  font-family: "Manrope", sans-serif;
  color: var(--sec-navy);
  text-align: center;
}
.e4-rays {
  position: absolute;
  left: 50%;
  top: -330px;
  width: 900px;
  height: 900px;
  margin-left: -450px;
  border-radius: 50%;
  pointer-events: none;
  background: repeating-conic-gradient(
    rgba(245, 166, 35, 0.13) 0 6deg,
    transparent 6deg 18deg
  );
  animation: e4-rotate 70s linear infinite;
}
.e4-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
}

.e4-code {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: clamp(90px, 17vw, 180px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--sec-navy);
  margin-bottom: 10px;
}
.e4-code-sm {
  color: var(--sec-green);
}
.e4-sun {
  width: 0.82em;
  height: 0.82em;
  color: var(--sec-orange);
  flex: none;
}
.e4-sun-rays {
  transform-origin: 60px 60px;
  animation: e4-rotate 24s linear infinite;
}

.e4-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sec-green-dk);
  border: 1px solid rgba(47, 168, 79, 0.28);
  background: rgba(47, 168, 79, 0.06);
  padding: 8px 16px;
  border-radius: 999px;
  margin-bottom: 18px;
}
.e4-eyebrow i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--sec-orange);
}
.e4-h1 {
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.15;
  font-weight: 800;
  margin: 0 0 14px;
  letter-spacing: -0.02em;
}
.e4-sub {
  font-size: 17px;
  line-height: 1.75;
  color: var(--sec-slate);
  max-width: 600px;
  margin: 0 auto 30px;
}

.e4-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-bottom: 56px;
}
.e4-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 15px 28px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  font-family: inherit;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}
.e4-btn-primary {
  background: var(--sec-green);
  color: #fff !important;
  box-shadow: 0 10px 24px rgba(47, 168, 79, 0.22);
}
.e4-btn-primary:hover {
  background: var(--sec-green-dk);
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(47, 168, 79, 0.28);
}
.e4-btn-ghost {
  border: 1.5px solid var(--sec-line);
  color: var(--sec-navy) !important;
  background: #fff;
}
.e4-btn-ghost:hover {
  border-color: var(--sec-green);
  color: var(--sec-green-dk) !important;
  transform: translateY(-2px);
}

.e4-popular h2 {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 20px;
}
.e4-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 0 0 40px;
  padding: 0;
  list-style: none;
  text-align: left;
}
.e4-links a {
  display: block;
  height: 100%;
  padding: 20px 22px;
  border: 1px solid var(--sec-line);
  border-radius: 14px;
  background: #fff;
  text-decoration: none;
  color: var(--sec-navy);
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.e4-links a:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(22, 33, 58, 0.08);
  border-color: rgba(47, 168, 79, 0.4);
}
.e4-links b {
  display: block;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 4px;
}
.e4-links small {
  font-size: 13.5px;
  color: var(--sec-slate);
  line-height: 1.5;
}
.e4-links a:hover b {
  color: var(--sec-green-dk);
}

.e4-help {
  font-size: 14.5px;
  color: var(--sec-slate);
  margin: 0;
}
.e4-help a {
  color: var(--sec-green-dk);
  font-weight: 700;
}

@keyframes e4-rotate {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 900px) {
  .e4-links {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .e4-wrap {
    padding: 44px 0 60px;
  }
  .e4-container {
    padding: 0 16px;
  }
  .e4-links {
    grid-template-columns: 1fr;
  }
  .e4-cta .e4-btn {
    flex: 1;
    justify-content: center;
  }
}
@media (max-width: 420px) {
  .e4-cta {
    flex-direction: column;
  }
  .e4-cta .e4-btn {
    width: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .e4-rays,
  .e4-sun-rays {
    animation: none;
  }
}
</style>
