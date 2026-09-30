<template>
  <footer ref="root" class="sf-wrap" :class="{ 'is-in': inView }" id="sf-footer">

    <div class="sf-main">
      <div class="sf-container">
        <div class="sf-grid">
          <!-- Brand -->
          <div class="sf-col">
            <NuxtLink class="sf-logo" to="/" aria-label="Sunrise Education Consultants home">
              <img src="https://sunrise-bd.net/frontend/assets/images/logo.png" alt="Sunrise Education Consultants" width="150" height="48" loading="lazy"></NuxtLink>
            <p class="sf-about">Sunrise Education Consultants is a study abroad consultancy in Dhaka, Bangladesh, guiding students through admission, scholarships and student visas since 2014.</p>
            <div class="sf-stats">
              <div><b>2014</b>Founded</div>
              <div><b>12<span>+</span></b>Destinations</div>
              <div><b>2</b>Offices</div>
            </div>
            <div class="sf-social">
              <a href="https://facebook.com/SunriseEC" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 9h3V5h-3c-2.8 0-4 1.7-4 4.3V11H7v4h3v9h4v-9h3l1-4h-4V9.6c0-.4.3-.6.6-.6Z"/></svg></a>
              <a href="https://youtube.com/@SunriseEducationConsultants" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9L15.5 12l-5.8 3.1Z"/></svg></a>
              <a href="https://wa.me/8801811156665" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a17 17 0 0 1-1.7-.6 13.4 13.4 0 0 1-5.1-4.5 5.8 5.8 0 0 1-1.2-3.1 3.3 3.3 0 0 1 1-2.5 1.1 1.1 0 0 1 .8-.4h.6c.2 0 .4 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.5.7-.4.4c-.1.2-.3.3-.1.6a9 9 0 0 0 1.6 2 7.9 7.9 0 0 0 2.4 1.4c.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2.2 1c.3.2.5.2.6.4 0 .1 0 .7-.2 1.4Z"/></svg></a>
            </div>
          </div>

          <!-- Destinations -->
          <div class="sf-col">
            <h3 class="sf-h">Top Destinations</h3>
            <ul class="sf-links sf-dest">
              <li><NuxtLink to="/study-abroad/italy">Italy</NuxtLink></li>
              <li><NuxtLink to="/study-in-malta-from-bangladesh">Malta</NuxtLink></li>
              <li><NuxtLink to="/study-in-hungary-from-bangladesh">Hungary</NuxtLink></li>
              <li><NuxtLink to="/study-in-finland-from-bangladesh">Finland</NuxtLink></li>
              <li><NuxtLink to="/study-in-cyprus-from-bangladesh">Cyprus</NuxtLink></li>
              <li><NuxtLink to="/study-in-malaysia">Malaysia</NuxtLink></li>
              <li><NuxtLink to="/study-abroad/study-in-canada">Canada</NuxtLink></li>
              <li><NuxtLink to="/study-abroad/study-in-usa">USA</NuxtLink></li>
              <li><NuxtLink to="/study-in-china">China</NuxtLink></li>
              <li><NuxtLink to="/study-in-norway-from-bangladesh">Norway</NuxtLink></li>
              <li><NuxtLink to="/study-in-turkey-from-bangladesh">Turkey</NuxtLink></li>
              <li><NuxtLink to="/study-in-greece-from-bangladesh">Greece</NuxtLink></li>
            </ul>
          </div>

          <!-- Services -->
          <div class="sf-col">
            <h3 class="sf-h">Our Services</h3>
            <ul class="sf-links">
              <li><NuxtLink to="/service-details/counselling-and-visa-processing">Counselling &amp; Visa</NuxtLink></li>
              <li><NuxtLink to="/service-details/university-admission-process">University Admission</NuxtLink></li>
              <li><NuxtLink to="/service-details/scholarship-arrangement">Scholarship Support</NuxtLink></li>
              <li><NuxtLink to="/service-details/accommodation-and-housing">Accommodation</NuxtLink></li>
              <li><NuxtLink to="/service-details/pre-departure-preparation">Pre-Departure</NuxtLink></li>
              <li><NuxtLink to="/service-details/post-study-opportunities">Post-Study Work</NuxtLink></li>
            </ul>
          </div>

          <!-- Quick links -->
          <div class="sf-col">
            <h3 class="sf-h">Quick Links</h3>
            <ul class="sf-links">
              <li><NuxtLink to="/about-us">About Us</NuxtLink></li>
              <li><NuxtLink to="/scholarships">Scholarships</NuxtLink></li>
              <li><NuxtLink to="/success-story">Success Stories</NuxtLink></li>
              <li><NuxtLink to="/blog">Blog</NuxtLink></li>
              <li><NuxtLink to="/staff">Our Team</NuxtLink></li>
              <li><NuxtLink to="/career">Careers</NuxtLink></li>
              <li><NuxtLink to="/payment">Payment Methods</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="sf-col">
            <h3 class="sf-h">Our Offices</h3>
            <div class="sf-office">
              <b><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>Banani, Dhaka (Head Office)</b>
              <p>House 61 (1st Floor), Block F, Road 08, Banani, Dhaka-1213</p>
              <a href="https://www.google.com/maps/search/?api=1&amp;query=Sunrise+Education+Consultants+Banani+Dhaka" target="_blank" rel="noopener">Get directions &rarr;</a>
            </div>
            <div class="sf-office">
              <b><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>Sylhet Branch</b>
              <p>Ananda Tower (3rd Floor), Jail Road, Sylhet-3100</p>
              <a href="https://www.google.com/maps/search/?api=1&amp;query=Sunrise+Education+Consultants+Sylhet" target="_blank" rel="noopener">Get directions &rarr;</a>
            </div>
            <ul class="sf-contact">
              <li><a href="tel:+8801911878274"><span><svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.23Z"/></svg></span>+88 01911 878 274</a></li>
              <li><a href="tel:+8801611878274"><span><svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.23Z"/></svg></span>+88 01611 878 274</a></li>
              <li><a href="mailto:info@sunrise-bd.net"><span><svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/></svg></span>info@sunrise-bd.net</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sf-bottom">
        <div class="sf-container">
          <div>&copy; <span>{{ year }}</span> <strong>Sunrise Education Consultants</strong>. All rights reserved.</div>
          <nav aria-label="Legal">
            <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
            <NuxtLink to="/terms-conditions">Terms &amp; Conditions</NuxtLink>
            <NuxtLink to="/contact-us">Contact</NuxtLink>
          </nav>
        </div>
      </div>
    </div>

    <!-- Back to top -->
    <button class="sf-top" :class="{ 'is-show': showTop }" type="button" aria-label="Back to top" @click="toTop">
      <svg class="sf-ring" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" :style="{ strokeDashoffset: dashOffset }"/></svg>
      <svg class="sf-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 19V5m-6 6 6-6 6 6"/></svg>
    </button>

    <!-- WhatsApp (remove if your site already has one) -->
    <a class="sf-wa" href="https://wa.me/8801811156665" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a17 17 0 0 1-1.7-.6 13.4 13.4 0 0 1-5.1-4.5 5.8 5.8 0 0 1-1.2-3.1 3.3 3.3 0 0 1 1-2.5 1.1 1.1 0 0 1 .8-.4h.6c.2 0 .4 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.5.7-.4.4c-.1.2-.3.3-.1.6a9 9 0 0 0 1.6 2 7.9 7.9 0 0 0 2.4 1.4c.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2.2 1c.3.2.5.2.6.4 0 .1 0 .7-.2 1.4Z"/></svg>
    </a>
  </footer>
</template>

<script setup lang="ts">
/** Site footer: copyright year, column reveal on scroll, back-to-top button with progress ring. */
const root = ref<HTMLElement | null>(null)
const route = useRoute()

const year = new Date().getFullYear()
const inView = ref(false)
const showTop = ref(false)
const RING = 150.8
const dashOffset = ref(RING)

let io: IntersectionObserver | null = null
const tick = () => {
  const el = document.documentElement
  const max = el.scrollHeight - el.clientHeight
  const p = max > 0 ? window.scrollY / max : 0
  dashOffset.value = RING - RING * p
  showTop.value = window.scrollY > 500
}
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  const main = root.value?.querySelector('.sf-main')
  if ('IntersectionObserver' in window && main) {
    io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { inView.value = true; io?.disconnect() }
    }, { threshold: 0.12 })
    io.observe(main)
  } else {
    inView.value = true
  }
  window.addEventListener('scroll', tick, { passive: true })
  window.addEventListener('resize', tick)
  tick()
})

/* page height changes between routes, so refresh the progress ring */
watch(() => route.fullPath, () => nextTick(tick))

onBeforeUnmount(() => {
  io?.disconnect()
  window.removeEventListener('scroll', tick)
  window.removeEventListener('resize', tick)
})
</script>
