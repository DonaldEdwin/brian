<script setup lang="ts">
import type { StrapiImage } from '~/composables/useStrapi'

interface Stat {
  label: string
  value: string
}

interface Hero {
  heading: string
  subheading: string
  portraitImage?: StrapiImage | null
  stats: Stat[]
}

const { data: hero } = await useStrapiSingle<Hero>('hero')

const heading = computed(() => hero.value?.heading || 'Passionate about AI, Emerging Technologies, and The Kingdom')
const subheading = computed(() => hero.value?.subheading || 'It Can Be Done. It Must Be Done.')
const stats = computed(() => hero.value?.stats?.length ? hero.value.stats : [
  { label: 'People Trained', value: '200+' },
  { label: 'Organisations Served', value: '50+' }
])
const portrait = computed(() => strapiImageUrl(hero.value?.portraitImage))
</script>

<template>
  <section class="bg-navy text-white">
    <div class="mx-auto max-w-6xl px-6 py-24 grid gap-12 md:grid-cols-2 md:items-center">
      <div>
        <p class="text-teal font-medium tracking-wide uppercase text-sm mb-4">Brian Gakere</p>
        <h1 class="text-4xl md:text-5xl font-semibold leading-tight">{{ heading }}</h1>
        <p class="mt-6 text-lg text-light-blue">{{ subheading }}</p>
        <div class="mt-10 flex gap-10">
          <div v-for="stat in stats" :key="stat.label">
            <p class="text-3xl font-bold text-teal">{{ stat.value }}</p>
            <p class="text-sm text-light-blue mt-1">{{ stat.label }}</p>
          </div>
        </div>
        <NuxtLink to="/contact" class="inline-block mt-10 bg-teal text-navy font-semibold px-6 py-3 rounded-full hover:bg-white transition-colors">
          Book a Call
        </NuxtLink>
      </div>
      <div class="justify-self-center">
        <img
          v-if="portrait"
          :src="portrait"
          alt="Brian Gakere"
          class="rounded-2xl w-full max-w-sm object-cover aspect-[4/5]"
        >
        <div v-else class="rounded-2xl w-full max-w-sm aspect-[4/5] bg-gradient-to-br from-teal/40 to-light-blue/10 border border-teal/30" />
      </div>
    </div>
  </section>
</template>
