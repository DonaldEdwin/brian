<script setup lang="ts">
import { marked } from 'marked'
import type { StrapiImage } from '~/composables/useStrapi'

interface BlogPost {
  documentId: string
  slug?: string
  title: string
  excerpt?: string
  body?: string
  category?: string
  readTime?: string
  coverImage?: StrapiImage | null
}

const route = useRoute()
const config = useRuntimeConfig()
const slug = String(route.params.slug)
const baseUrl = import.meta.server ? config.strapiUrl : config.public.strapiUrl

const { data: post } = await useAsyncData<BlogPost | null>(`strapi-blog-${slug}`, async () => {
  const res = await $fetch<{ data: BlogPost[] }>(`${baseUrl}/api/blog-posts`, {
    query: { populate: '*', 'filters[slug][$eq]': slug }
  })
  if (res.data[0]) return res.data[0]
  const byId = await $fetch<{ data: BlogPost }>(`${baseUrl}/api/blog-posts/${slug}`, {
    query: { populate: '*' }
  }).catch(() => null)
  return byId?.data ?? null
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const html = computed(() => marked.parse(post.value?.body ?? '', { async: false }) as string)

useHead({ title: post.value.title })
</script>

<template>
  <article v-if="post" class="bg-white">
    <div class="mx-auto max-w-3xl px-6 py-20">
      <NuxtLink to="/blog" class="text-teal text-sm font-medium">&larr; All posts</NuxtLink>
      <div class="mt-6 flex items-center gap-3 text-xs text-navy/60">
        <span v-if="post.category" class="uppercase font-semibold text-teal">{{ post.category }}</span>
        <span v-if="post.readTime">{{ post.readTime }}</span>
      </div>
      <h1 class="mt-2 text-4xl font-semibold text-navy">{{ post.title }}</h1>
      <img
        v-if="strapiImageUrl(post.coverImage)"
        :src="strapiImageUrl(post.coverImage)"
        :alt="post.title"
        class="mt-8 w-full rounded-2xl"
      >
      <div class="blog-body mt-8 text-navy/80 leading-relaxed" v-html="html" />
    </div>
  </article>
</template>

<style>
.blog-body h2 { font-size: 1.5rem; font-weight: 600; margin: 2rem 0 0.75rem; color: #050C2B; }
.blog-body h3 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: #050C2B; }
.blog-body p { margin: 1rem 0; }
.blog-body ul { list-style: disc; padding-left: 1.5rem; margin: 1rem 0; }
.blog-body ol { list-style: decimal; padding-left: 1.5rem; margin: 1rem 0; }
.blog-body a { color: #0F8D98; text-decoration: underline; }
.blog-body img { border-radius: 1rem; margin: 1.5rem 0; max-width: 100%; }
.blog-body blockquote { border-left: 4px solid #0F8D98; padding-left: 1rem; font-style: italic; }
</style>
