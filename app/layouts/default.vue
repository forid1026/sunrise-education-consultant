<template>
  <div>
    <SiteHeader />
    <main id="main">
      <slot />
    </main>
    <!-- Shown while the next page's data is loading (navigation waits for the API) -->
    <Transition name="pk-fade">
      <PageSkeleton v-if="showSkeleton" />
    </Transition>
    <SiteFooter />
  </div>
</template>

<script setup>
const { isLoading } = useLoadingIndicator();
const showSkeleton = ref(false);
let timer;

/* wait 150ms so fast navigations never flash a skeleton */
watch(isLoading, (loading) => {
  clearTimeout(timer);
  if (loading) {
    timer = setTimeout(() => {
      showSkeleton.value = true;
    }, 150);
  } else {
    showSkeleton.value = false;
  }
});

onBeforeUnmount(() => clearTimeout(timer));
</script>
