<script setup lang="ts">
interface Service {
  documentId: string
  title: string
  description: string
  icon?: string
}

const { data: services } = await useStrapiList<Service>('services', { sort: 'order:asc' })
</script>

<template>
  <section id="services" class="bg-white">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <p class="text-teal font-medium tracking-wide uppercase text-sm mb-3">Services</p>
      <h2 class="text-3xl font-semibold text-navy mb-10">How I Can Help</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div
          v-for="service in services"
          :key="service.documentId"
          class="rounded-2xl border border-navy/10 p-8 hover:border-teal/50 transition-colors"
        >
          <h3 class="text-xl font-semibold text-navy mb-3">{{ service.title }}</h3>
          <p class="text-navy/70 leading-relaxed" v-html="service.description" />
        </div>
      </div>
    </div>
  </section>
</template>
