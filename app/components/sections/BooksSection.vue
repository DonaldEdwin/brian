<script setup lang="ts">
import type { StrapiImage } from '~/composables/useStrapi'

interface Book {
  documentId: string
  title: string
  description?: string
  purchaseUrl?: string
  coverImage?: StrapiImage | null
}

const { data: books } = await useStrapiList<Book>('books')
</script>

<template>
  <section v-if="books.length" id="books" class="bg-pale-blue">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <p class="text-teal font-medium tracking-wide uppercase text-sm mb-3">Books</p>
      <h2 class="text-3xl font-semibold text-navy mb-10">Published Works</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div v-for="book in books" :key="book.documentId" class="bg-white rounded-2xl p-6">
          <div class="aspect-[3/4] rounded-lg overflow-hidden bg-navy/5 mb-4">
            <img
              v-if="strapiImageUrl(book.coverImage)"
              :src="strapiImageUrl(book.coverImage)"
              :alt="book.title"
              class="w-full h-full object-cover"
            >
          </div>
          <h3 class="font-semibold text-navy">{{ book.title }}</h3>
          <p v-if="book.description" class="text-sm text-navy/70 mt-1">{{ book.description }}</p>
          <a
            v-if="book.purchaseUrl"
            :href="book.purchaseUrl"
            target="_blank"
            rel="noopener"
            class="inline-block mt-4 text-teal text-sm font-medium hover:underline"
          >
            Get the book →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
