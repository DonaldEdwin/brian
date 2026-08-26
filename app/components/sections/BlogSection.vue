<script setup lang="ts">
import type { StrapiImage } from '~/composables/useStrapi'

interface BlogPost {
  documentId: string
  title: string
  excerpt?: string
  category?: string
  readTime?: string
  coverImage?: StrapiImage | null
}

const props = withDefaults(defineProps<{ limit?: number, heading?: string }>(), {
  limit: 3,
  heading: 'Design Insights & Trends'
})

const { data: posts } = await useStrapiList<BlogPost>('blog-posts', {
  sort: 'publishedAt:desc',
  'pagination[limit]': props.limit
})
</script>

<template>
  <section v-if="posts.length" class="bg-white">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <p class="text-teal font-medium tracking-wide uppercase text-sm mb-3">Blog</p>
      <h2 class="text-3xl font-semibold text-navy mb-10">{{ heading }}</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <article v-for="post in posts" :key="post.documentId" class="group">
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-pale-blue">
            <img
              v-if="strapiImageUrl(post.coverImage)"
              :src="strapiImageUrl(post.coverImage)"
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform"
            >
          </div>
          <div class="mt-4 flex items-center gap-3 text-xs text-navy/60">
            <span v-if="post.category" class="uppercase font-semibold text-teal">{{ post.category }}</span>
            <span v-if="post.readTime">{{ post.readTime }}</span>
          </div>
          <h3 class="mt-2 font-semibold text-navy">{{ post.title }}</h3>
          <p v-if="post.excerpt" class="mt-1 text-sm text-navy/70">{{ post.excerpt }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
