<script setup lang="ts">
withDefaults(defineProps<{ linkToContact?: boolean }>(), { linkToContact: true })
</script>

<template>
  <section class="bg-teal">
    <div class="mx-auto max-w-6xl px-6 py-16 text-center">
      <h2 class="text-2xl md:text-3xl font-semibold text-navy">
        Got a Vision? Let's Bring It to Life.
      </h2>
      <p class="text-navy/80 mt-3">
        Whether it's AI adoption, training, or mentorship — book a free consultation.
      </p>
      <NuxtLink
        v-if="linkToContact"
        to="/contact"
        class="inline-block mt-8 bg-navy text-white font-semibold px-8 py-3 rounded-full hover:bg-navy/90 transition-colors"
      >
        Book Gakere
      </NuxtLink>
      <a
        v-else
        href="mailto:contact@briangakere.com"
        class="inline-block mt-8 bg-navy text-white font-semibold px-8 py-3 rounded-full hover:bg-navy/90 transition-colors"
      >
        Book Gakere
      </a>
    </div>
  </section>
</template>
