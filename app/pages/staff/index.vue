<script setup>
const { data: team, pending, error, refresh } = await useApi('/staff', {
  key: 'staff-list',
  transform: (res) => res.data,
})

useSeoMeta({
  title: 'Our Team | Sunrise Education Consultants',
  description: 'Meet the experienced counsellors leading your study abroad application.',
})

const initial = (name) => name?.trim().charAt(0).toUpperCase() || '?'
</script>
<template>
  <section class="sec-team" aria-label="Meet the Sunrise Education Consultants Team">
    <div class="sec-team-inner">
      <div class="sec-team-head">
        <span class="sec-team-eyebrow"><span class="sec-team-eyebrow-dot"></span>Our Team</span>
        <h2 class="sec-team-title">Meet the People Behind Sunrise</h2>
        <p class="sec-team-subtitle">
          A named, experienced team leading your application &mdash; not an anonymous call center.
        </p>
      </div>

      <p v-if="pending" class="sec-team-subtitle" style="text-align:center">Loading team…</p>

      <div v-else-if="error" style="text-align:center">
        <p class="sec-team-subtitle">Could not load the team right now.</p>
        <button type="button" class="sec-team-btn" @click="refresh()">Try again</button>
      </div>

      <p v-else-if="!team?.length" class="sec-team-subtitle" style="text-align:center">
        Team members will be listed here soon.
      </p>

      <div v-else class="sec-team-grid">
        <div v-for="m in team" :key="m.slug" class="sec-team-card">
          <img
            v-if="m.photo"
            class="sec-team-photo"
            :src="m.photo"
            :alt="`${m.name}, ${m.designation || 'Team member'} at Sunrise Education Consultants`"
            loading="lazy"
          />
          <div v-else class="sec-team-photo" style="display:grid;place-items:center;font-size:48px;font-weight:700">
            {{ initial(m.name) }}
          </div>

          <div class="sec-team-body">
            <h3>{{ m.name }}</h3>
            <span class="sec-team-role">{{ m.designation }}</span>
            <NuxtLink :to="`/staff/${m.slug}`" class="sec-team-link">View Profile</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>