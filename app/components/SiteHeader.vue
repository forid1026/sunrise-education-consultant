<template>
  <header ref="root" class="sh-wrap" id="sh-header">
    <!-- Top bar -->
    <div class="sh-topbar">
      <div class="sh-container">
        <div class="sh-top-left">
          <span class="sh-top-badge"><i></i>Since 2014</span>
          <a class="sh-top-item" href="tel:+8801911878274" aria-label="Call Sunrise Education Consultants">
            <svg viewBox="0 0 24 24" fill="currentColor"><path :d="PHONE" /></svg>+88 01911 878 274</a>
          <a class="sh-top-item sh-hide-md" href="mailto:info@sunrise-bd.net">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" /></svg>info@sunrise-bd.net</a>
        </div>
        <div class="sh-top-right">
          <span class="sh-top-item sh-hide-md">Banani, Dhaka &middot; Sylhet</span>
          <div class="sh-social">
            <a href="https://facebook.com/SunriseEC" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M14 9h3V5h-3c-2.8 0-4 1.7-4 4.3V11H7v4h3v9h4v-9h3l1-4h-4V9.6c0-.4.3-.6.6-.6Z" /></svg></a>
            <a href="https://youtube.com/@SunriseEducationConsultants" target="_blank" rel="noopener" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9L15.5 12l-5.8 3.1Z" /></svg></a>
            <a href="https://wa.me/8801811156665" target="_blank" rel="noopener" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a17 17 0 0 1-1.7-.6 13.4 13.4 0 0 1-5.1-4.5 5.8 5.8 0 0 1-1.2-3.1 3.3 3.3 0 0 1 1-2.5 1.1 1.1 0 0 1 .8-.4h.6c.2 0 .4 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.5.7-.4.4c-.1.2-.3.3-.1.6a9 9 0 0 0 1.6 2 7.9 7.9 0 0 0 2.4 1.4c.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2.2 1c.3.2.5.2.6.4 0 .1 0 .7-.2 1.4Z" /></svg></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main bar -->
    <div class="sh-main">
      <div class="sh-container">
        <NuxtLink class="sh-logo" to="/" aria-label="Sunrise Education Consultants home">
          <img src="https://sunrise-bd.net/frontend/assets/images/logo.png" alt="Sunrise Education Consultants" width="170" height="56" />
        </NuxtLink>

        <nav class="sh-nav" aria-label="Main navigation">
          <!-- Study Abroad (mega, dynamic from API) -->
          <div class="sh-item sh-has-drop sh-static">
            <NuxtLink class="sh-link" to="/study-abroad" active-class="is-active">Study Abroad</NuxtLink>
            <template v-if="abroadGroups.length">
              <button class="sh-tog" type="button" aria-expanded="false" aria-controls="sh-mega-dest" aria-label="Show Study Abroad menu">
                <svg class="sh-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 3.5 3 3 3-3" /></svg>
              </button>
              <div class="sh-panel sh-mega" id="sh-mega-dest">
                <div v-for="g in abroadGroups" :key="g.key">
                  <h4>{{ g.label }}</h4>
                  <NuxtLink v-for="a in g.items" :key="a.slug" class="sh-country" :to="`/study-abroad/${a.slug}`">Study in {{ a.short_name || a.name }}</NuxtLink>
                </div>
                <div class="sh-promo">
                  <div>
                    <b>Not sure where to go?</b>
                    <p>Get a free profile assessment from our counsellors</p>
                    <ul>
                      <li>Country and university match</li>
                      <li>Scholarship eligibility</li>
                      <li>Visa chance check</li>
                    </ul>
                  </div>
                  <NuxtLink to="/apply-now">Free Assessment &rarr;</NuxtLink>
                </div>
              </div>
            </template>
          </div>

          <!-- About -->
          <div class="sh-item sh-has-drop">
            <NuxtLink class="sh-link" to="/about-us" active-class="is-active">About Us</NuxtLink>
            <button class="sh-tog" type="button" aria-expanded="false" aria-controls="sh-drop-about" aria-label="Show About Us menu">
              <svg class="sh-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 3.5 3 3 3-3" /></svg>
            </button>
            <div class="sh-panel sh-drop" id="sh-drop-about">
              <NuxtLink v-for="it in aboutLinks" :key="it.to" :to="it.to">
                <span class="sh-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path v-for="p in it.icon" :key="p" :d="p" /></svg></span>
                <span>{{ it.name }}</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Services (dynamic from API) -->
          <div class="sh-item sh-has-drop">
            <NuxtLink class="sh-link" to="/services" active-class="is-active">Services</NuxtLink>
            <template v-if="services.length">
              <button class="sh-tog" type="button" aria-expanded="false" aria-controls="sh-drop-serv" aria-label="Show Services menu">
                <svg class="sh-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 3.5 3 3 3-3" /></svg>
              </button>
              <div class="sh-panel sh-drop" id="sh-drop-serv">
                <NuxtLink v-for="s in services" :key="s.slug" :to="`/service-details/${s.slug}`">
                  <span class="sh-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path v-for="d in iconPaths(s.icon)" :key="d" :d="d" /></svg></span>
                  <span>{{ s.name }}<small v-if="s.tagline">{{ s.tagline }}</small></span>
                </NuxtLink>
              </div>
            </template>
          </div>

          <div class="sh-item">
            <NuxtLink class="sh-link" to="/scholarships" active-class="is-active">Scholarships</NuxtLink>
          </div>

          <!-- Resources -->
          <div class="sh-item sh-has-drop">
            <NuxtLink class="sh-link" to="/resources" active-class="is-active">Resources</NuxtLink>
            <button class="sh-tog" type="button" aria-expanded="false" aria-controls="sh-drop-res" aria-label="Show Resources menu">
              <svg class="sh-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 3.5 3 3 3-3" /></svg>
            </button>
            <div class="sh-panel sh-drop" id="sh-drop-res">
              <NuxtLink v-for="it in resourceLinks" :key="it.to" :to="it.to">
                <span class="sh-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path v-for="p in it.icon" :key="p" :d="p" /></svg></span>
                <span>{{ it.name }}<small>{{ it.small }}</small></span>
              </NuxtLink>
            </div>
          </div>

          <div class="sh-item">
            <NuxtLink class="sh-link" to="/contact-us" active-class="is-active">Contact</NuxtLink>
          </div>
        </nav>

        <div class="sh-actions">
          <a class="sh-call" href="tel:+8801911878274">
            <span class="sh-call-ico"><svg viewBox="0 0 24 24" fill="currentColor"><path :d="PHONE" /></svg></span>
            <div>01911 878 274</div>
          </a>
          <NuxtLink class="sh-cta" to="/apply-now">Free Assessment
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </NuxtLink>
          <button class="sh-burger" aria-label="Open menu" aria-expanded="false" aria-controls="sh-drawer">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile drawer -->
    <div class="sh-overlay" data-sh-close></div>
    <aside class="sh-drawer" id="sh-drawer" aria-label="Mobile menu">
      <div class="sh-drawer-head">
        <img src="https://sunrise-bd.net/frontend/assets/images/logo.png" alt="Sunrise Education Consultants" />
        <button class="sh-close" aria-label="Close menu" data-sh-close>&times;</button>
      </div>
      <div class="sh-drawer-body">
        <!-- Study Abroad (dynamic from API) -->
        <div class="sh-acc">
          <div class="sh-acc-head">
            <NuxtLink to="/study-abroad">Study Abroad</NuxtLink>
            <button v-if="abroadGroups.length" type="button" aria-expanded="false" aria-label="Show Study Abroad pages">
              <svg class="sh-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 3.5 3 3 3-3" /></svg>
            </button>
          </div>
          <div v-if="abroadGroups.length" class="sh-acc-panel">
            <div>
              <template v-for="g in abroadGroups" :key="g.key">
                <h5>{{ g.label }}</h5>
                <NuxtLink v-for="a in g.items" :key="a.slug" :to="`/study-abroad/${a.slug}`">{{ a.short_name || a.name }}</NuxtLink>
              </template>
            </div>
          </div>
        </div>

        <div class="sh-acc">
          <div class="sh-acc-head">
            <NuxtLink to="/about-us">About Us</NuxtLink>
            <button type="button" aria-expanded="false" aria-label="Show About Us pages">
              <svg class="sh-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 3.5 3 3 3-3" /></svg>
            </button>
          </div>
          <div class="sh-acc-panel">
            <div>
              <NuxtLink v-for="it in aboutLinks" :key="it.to" :to="it.to">{{ it.name }}</NuxtLink>
            </div>
          </div>
        </div>

        <div class="sh-acc">
          <div class="sh-acc-head">
            <NuxtLink to="/services">Services</NuxtLink>
            <button v-if="services.length" type="button" aria-expanded="false" aria-label="Show Services pages">
              <svg class="sh-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 3.5 3 3 3-3" /></svg>
            </button>
          </div>
          <div v-if="services.length" class="sh-acc-panel">
            <div>
              <NuxtLink v-for="s in services" :key="s.slug" :to="`/service-details/${s.slug}`">{{ s.name }}</NuxtLink>
            </div>
          </div>
        </div>

        <div class="sh-acc"><NuxtLink to="/scholarships">Scholarships</NuxtLink></div>

        <div class="sh-acc">
          <div class="sh-acc-head">
            <NuxtLink to="/resources">Resources</NuxtLink>
            <button type="button" aria-expanded="false" aria-label="Show Resources pages">
              <svg class="sh-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 3.5 3 3 3-3" /></svg>
            </button>
          </div>
          <div class="sh-acc-panel">
            <div>
              <NuxtLink v-for="it in resourceLinks" :key="it.to" :to="it.to">{{ it.name }}</NuxtLink>
            </div>
          </div>
        </div>

        <div class="sh-acc"><NuxtLink to="/contact-us">Contact</NuxtLink></div>
      </div>
      <div class="sh-drawer-foot">
        <NuxtLink class="sh-cta" to="/apply-now">Free Assessment
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </NuxtLink>
        <a class="sh-call" href="tel:+8801911878274">
          <span class="sh-call-ico"><svg viewBox="0 0 24 24" fill="currentColor"><path :d="PHONE" /></svg></span>
          <div><span>Call us</span>01911 878 274</div>
        </a>
      </div>
    </aside>
  </header>
</template>

<script setup lang="ts">
/**
 * Site header: mega menu (hover on desktop, tap on mobile), sticky shrink on scroll,
 * mobile drawer + accordions. Study Abroad and Services menus come from the API.
 */
const root = ref<HTMLElement | null>(null);
const route = useRoute();

const PHONE =
  "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.23Z";

/* ---------- Study Abroad (dynamic mega menu + drawer) ---------- */
// Keep `await` (not lazy) so the lists are rendered before onMounted wires the toggles.
const { data: abroadsData } = await useApi("/study-abroad", {
  key: "abroads-list",
  transform: (res: any) => res.data,
});

const REGIONS = [
  { key: "europe", label: "Europe" },
  { key: "asia", label: "Asia" },
  { key: "north_america", label: "North America" },
  { key: "uk_oceania", label: "UK & Oceania" },
  { key: "others", label: "More" },
];

const abroadGroups = computed(() => {
  const list = (abroadsData.value as any[] | null) || [];
  return REGIONS.map((r) => ({
    ...r,
    items: list.filter((a) => a.region === r.key),
  })).filter((g) => g.items.length);
});

/* ---------- Services (dynamic dropdown + drawer) ---------- */
const { data: servicesData } = await useApi("/services", {
  key: "services-list",
  transform: (res: any) => res.data,
});
const services = computed<any[]>(() =>
  ((servicesData.value as any[] | null) || [])
    .slice()
    .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0)),
);

/* API `icon` value -> SVG path(s). Add new icons here. */
const ICONS: Record<string, string[]> = {
  document: [
    "M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    "M8 8h8M8 12h8M8 16h5",
  ],
  graduation: ["m12 3 10 5-10 5L2 8l10-5Z", "M6 10v5c0 1 2.7 3 6 3s6-2 6-3v-5"],
  home: ["M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"],
  plane: ["M2 16h20M6 16l3-9 3 5 3-3 3 7"],
  briefcase: [
    "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
    "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  ],
};
const ICON_ALIAS: Record<string, string> = {
  accommodation: "home",
  housing: "home",
  travel: "plane",
  departure: "plane",
  flight: "plane",
  work: "briefcase",
  career: "briefcase",
  job: "briefcase",
  university: "graduation",
  admission: "graduation",
  visa: "document",
};
const iconPaths = (name?: string | null): string[] => {
  const key = String(name || "").toLowerCase();
  return ICONS[key] || ICONS[ICON_ALIAS[key]] || ICONS.document;
};

/* ---------- Static menus ---------- */
const aboutLinks = [
  {
    to: "/company-profile",
    name: "Company Profile",
    icon: [
      "M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
      "M9 7h6M9 11h6M9 15h3",
    ],
  },
  {
    to: "/mission-vision",
    name: "Mission & Vision",
    icon: [
      "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0",
      "M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0",
      "M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
    ],
  },
  {
    to: "/message-from-ceo",
    name: "Message from the CEO",
    icon: ["M8 8a4 4 0 1 0 8 0a4 4 0 1 0-8 0", "M4 21a8 8 0 0 1 16 0"],
  },
  {
    to: "/staff",
    name: "Our Team",
    icon: [
      "M5.5 8a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0",
      "M14.5 9a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
      "M2 20a7 7 0 0 1 14 0M15 14.5a5 5 0 0 1 7 5.5",
    ],
  },
  {
    to: "/career",
    name: "Careers",
    icon: [
      "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
      "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18",
    ],
  },
];

const resourceLinks = [
  {
    to: "/blog",
    name: "Blog",
    small: "Guides for Bangladeshi students",
    icon: ["M4 4h12l4 4v12H4z", "M8 12h8M8 16h6"],
  },
  {
    to: "/success-story",
    name: "Success Stories",
    small: "Students we sent abroad",
    icon: [
      "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z",
    ],
  },
  {
    to: "/embassy-interview-questions-answer",
    name: "Visa Interview Questions",
    small: "Sample answers",
    icon: ["M21 12a8 8 0 0 1-11.7 7.1L3 21l1.9-6.3A8 8 0 1 1 21 12Z"],
  },
  {
    to: "/blog/cost-of-studying-abroad-from-bangladesh-2027-budget-guide",
    name: "Cost of Studying Abroad",
    small: "Country budgets in BDT",
    icon: [
      "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0",
      "M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2m0 8v2",
    ],
  },
];

/* ---------- Behaviour ---------- */
let closeAll: (except?: Element | null) => void = () => {};
let setMenu: (open: boolean) => void = () => {};
const cleanups: Array<() => void> = [];

onMounted(() => {
  const h = root.value;
  if (!h) return;
  const on = (
    t: Document | Window | Element,
    ev: string,
    fn: (e: any) => void,
    opts?: AddEventListenerOptions,
  ) => {
    t.addEventListener(ev, fn, opts);
    cleanups.push(() => t.removeEventListener(ev, fn, opts));
  };

  const items = Array.from(h.querySelectorAll<HTMLElement>(".sh-has-drop"));
  const desk = window.matchMedia("(min-width:1025px)");

  closeAll = (except) => {
    items.forEach((it) => {
      if (it !== except) {
        it.classList.remove("is-open");
        it.querySelector(".sh-tog")?.setAttribute("aria-expanded", "false");
      }
    });
  };

  items.forEach((it: any) => {
    const btn = it.querySelector(".sh-tog") as HTMLElement | null;
    if (!btn) return; // no API data: only the link remains
    let t: ReturnType<typeof setTimeout>;
    on(it, "mouseenter", () => {
      if (!desk.matches) return;
      clearTimeout(t);
      if (!it.classList.contains("is-open")) it._hov = Date.now();
      closeAll(it);
      it.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    });
    on(it, "mouseleave", () => {
      if (!desk.matches) return;
      t = setTimeout(() => {
        it.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }, 140);
    });
    on(btn, "click", (e: Event) => {
      e.stopPropagation();
      const o =
        !it.classList.contains("is-open") || Date.now() - (it._hov || 0) < 700;
      closeAll();
      it.classList.toggle("is-open", o);
      btn.setAttribute("aria-expanded", String(o));
    });
  });

  on(document, "click", (e: Event) => {
    if (!h.contains(e.target as Node)) closeAll();
  });
  on(document, "keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeAll();
      setMenu(false);
    }
  });

  /* sticky shrink */
  const onScroll = () => h.classList.toggle("is-scrolled", window.scrollY > 40);
  on(window, "scroll", onScroll, { passive: true });
  onScroll();

  /* mobile drawer */
  const burger = h.querySelector(".sh-burger") as HTMLElement;
  setMenu = (o) => {
    h.classList.toggle("is-menu", o);
    burger.setAttribute("aria-expanded", String(o));
    document.body.style.overflow = o ? "hidden" : "";
  };
  on(burger, "click", () => setMenu(!h.classList.contains("is-menu")));
  h.querySelectorAll("[data-sh-close]").forEach((el) =>
    on(el, "click", () => setMenu(false)),
  );
  h.querySelectorAll(".sh-acc-head>button").forEach((b) =>
    on(b, "click", () => {
      const o = (b.closest(".sh-acc") as HTMLElement).classList.toggle("is-open");
      b.setAttribute("aria-expanded", String(o));
    }),
  );
});

/* close menus after every navigation */
watch(
  () => route.fullPath,
  () => {
    closeAll();
    setMenu(false);
  },
);

onBeforeUnmount(() => {
  cleanups.forEach((fn) => fn());
  cleanups.length = 0;
  if (import.meta.client) document.body.style.overflow = "";
});
</script>