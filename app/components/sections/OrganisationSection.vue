<script setup lang="ts">
interface FocusArea {
  text: string
}

interface Organisation {
  documentId: string
  name: string
  tagline?: string
  description?: string
  focusAreas: FocusArea[]
  externalUrl?: string
}

const { data: organisations } = await useStrapiList<Organisation>('organisations')
</script>

<template>
  <section id="organisation" class="bg-navy text-white">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <p class="text-teal font-medium tracking-wide uppercase text-sm mb-3">Organisation</p>
      <h2 class="text-3xl font-semibold mb-10">Communities I Lead</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div
          v-for="org in organisations"
          :key="org.documentId"
          class="rounded-2xl bg-white/5 border border-white/10 p-8"
        >
          <h3 class="text-xl font-semibold">{{ org.name }}</h3>
          <p v-if="org.tagline" class="text-teal text-sm mt-1 italic">{{ org.tagline }}</p>
          <p v-if="org.description" class="text-light-blue/90 mt-4 leading-relaxed">{{ org.description }}</p>
          <ul class="mt-6 space-y-2">
            <li
              v-for="area in org.focusAreas"
              :key="area.text"
              class="flex items-start gap-2 text-sm text-light-blue"
            >
              <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
              {{ area.text }}
            </li>
          </ul>
          <a
            v-if="org.externalUrl"
            :href="org.externalUrl"
            target="_blank"
            rel="noopener"
            class="inline-block mt-6 text-teal text-sm font-medium hover:underline"
          >
            Visit site →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
