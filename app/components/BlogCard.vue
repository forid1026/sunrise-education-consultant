<template>
  <article class="blg-card" :class="{ feat: featured }">
    <NuxtLink
      :to="`/blog/${post.slug}`"
      class="blg-card-img"
      tabindex="-1"
      aria-hidden="true"
    >
      <img
        v-if="post.image && !failed"
        ref="img"
        :src="post.image"
        :alt="post.image_alt || post.title"
        :loading="featured ? 'eager' : 'lazy'"
        decoding="async"
        @error="failed = true"
      />
      <span v-else class="blg-card-ph">{{
        post.category?.name || "Sunrise"
      }}</span>
    </NuxtLink>

    <div class="blg-card-body">
      <div class="blg-card-meta">
        <NuxtLink
          v-if="post.category"
          class="blg-tag"
          :to="{ path: '/blog', query: { category: post.category.slug } }"
          >{{ post.category.name }}</NuxtLink
        >
        <time v-if="post.published_at" :datetime="post.published_at">{{
          blogDate(post.published_at, true)
        }}</time>
      </div>
      <h3>
        <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
      </h3>
      <p v-if="text">{{ text }}</p>
      <NuxtLink class="blg-more" :to="`/blog/${post.slug}`">
        Read article <span aria-hidden="true">&rarr;</span>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: { type: Object, required: true },
  featured: { type: Boolean, default: false },
});

const text = computed(() =>
  String(props.post.excerpt || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim(),
);

// A photo that failed before the page became interactive is replaced by the placeholder
const failed = ref(false);
const img = ref(null);
onMounted(() => {
  if (img.value && img.value.complete && img.value.naturalWidth === 0)
    failed.value = true;
});
</script>

<style scoped>
.blg-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--sec-line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(22, 33, 58, 0.06);
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.blg-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 44px rgba(22, 33, 58, 0.12);
  border-color: rgba(47, 168, 79, 0.35);
}
.blg-card-img {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: linear-gradient(135deg, #2d6cb4, #16213a);
}
.blg-card-img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  transition: transform 0.6s ease;
}
.blg-card:hover .blg-card-img img {
  transform: scale(1.04);
}
.blg-card-ph {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 16px;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  color: #fff;
}
.blg-card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 22px;
}
.blg-card-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--sec-slate);
}
.blg-tag {
  padding: 5px 11px;
  border-radius: 999px;
  background: rgba(47, 168, 79, 0.12);
  color: var(--sec-green-dk);
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
}
.blg-tag:hover {
  background: var(--sec-green);
  color: #fff;
}
.blg-card h3 {
  margin: 0 0 10px;
  font-size: 19px;
  line-height: 1.35;
}
.blg-card h3 a {
  color: var(--sec-navy);
  text-decoration: none;
}
.blg-card h3 a:hover {
  color: var(--sec-green-dk);
}
.blg-card p {
  margin: 0 0 16px;
  font-size: 14.5px;
  line-height: 1.75;
  color: #475467;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blg-more {
  margin-top: auto;
  font-size: 14px;
  font-weight: 800;
  color: var(--sec-green-dk);
  text-decoration: none;
}
.blg-more:hover {
  text-decoration: underline;
}

/* Featured (first post on the first page) */
.blg-card.feat {
  flex-direction: row;
}
.blg-card.feat .blg-card-img {
  flex: 1.15;
  aspect-ratio: auto;
  min-height: 340px;
}
.blg-card.feat .blg-card-body {
  flex: 1;
  justify-content: center;
  padding: 34px;
}
.blg-card.feat h3 {
  font-size: clamp(24px, 2.6vw, 32px);
  line-height: 1.25;
}
.blg-card.feat p {
  -webkit-line-clamp: 4;
  font-size: 15.5px;
}

@media (max-width: 900px) {
  .blg-card.feat {
    flex-direction: column;
  }
  .blg-card.feat .blg-card-img {
    flex: none;
    aspect-ratio: 16 / 10;
    min-height: 0;
  }
  .blg-card.feat .blg-card-body {
    padding: 24px;
  }
}
</style>
