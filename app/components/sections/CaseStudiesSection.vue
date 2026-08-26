<script setup lang="ts">
import type { StrapiImage } from '~/composables/useStrapi'

interface CaseStudy {
  documentId: string
  clientName: string
  problem?: string
  solution?: string
  result?: string
  logo?: StrapiImage | null
}

const { data: caseStudies } = await useStrapiList<CaseStudy>('case-studies')
</script>

<template>
  <section v-if="caseStudies.length" id="clients" class="bg-pale-blue">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <p class="text-teal font-medium tracking-wide uppercase text-sm mb-3">Clients</p>
      <h2 class="text-3xl font-semibold text-navy mb-10">Case Studies</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="cs in caseStudies"
          :key="cs.documentId"
          class="rounded-2xl bg-white p-6 shadow-sm"
        >
          <img
            v-if="strapiImageUrl(cs.logo)"
            :src="strapiImageUrl(cs.logo)"
            :alt="cs.clientName"
            class="h-8 object-contain mb-4"
          >
          <h3 v-else class="font-semibold text-navy mb-4">{{ cs.clientName }}</h3>
          <p v-if="cs.problem" class="text-sm text-navy/70"><span class="font-medium text-navy">Problem: </span>{{ cs.problem }}</p>
          <p v-if="cs.solution" class="text-sm text-navy/70 mt-2"><span class="font-medium text-navy">Solution: </span>{{ cs.solution }}</p>
          <p v-if="cs.result" class="text-sm text-teal font-medium mt-2">{{ cs.result }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
