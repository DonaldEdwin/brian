<script setup lang="ts">
const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/organisation', label: 'Organisation' },
  { to: '/blog', label: 'Blog' },
  { to: '/books', label: 'Books' }
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-navy/95 backdrop-blur text-white">
    <div class="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="font-semibold">Brian Gakere</NuxtLink>
      <nav class="hidden md:flex items-center gap-8 text-sm text-light-blue">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="hover:text-white"
          active-class="text-white"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <NuxtLink
        to="/contact"
        class="bg-teal text-navy text-sm font-semibold px-5 py-2 rounded-full hover:bg-white transition-colors"
      >
        Message Me
      </NuxtLink>
    </div>
  </header>
</template>
