<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
}

interface SiteSetting {
  siteName?: string
  contactEmail?: string
  contactPhone?: string
  socialLinks: SocialLink[]
}

const { data: settings } = await useStrapiSingle<SiteSetting>('site-setting')

const contactEmail = computed(() => settings.value?.contactEmail || 'contact@briangakere.com')
const contactPhone = computed(() => settings.value?.contactPhone || '+254768222006')
const socialLinks = computed(() => settings.value?.socialLinks || [
  { platform: 'linkedin', url: 'https://www.linkedin.com/in/gakere-nyingi/' },
  { platform: 'x', url: 'https://x.com/Gakerenyingi' },
  { platform: 'facebook', url: 'https://www.facebook.com/briangakerenyingi' }
])
</script>

<template>
  <footer class="bg-navy text-white">
    <div class="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-3">
      <div>
        <p class="text-xl font-semibold">Brian Gakere</p>
        <p class="text-light-blue mt-2 text-sm">It Can Be Done. It Must Be Done.</p>
      </div>
      <div>
        <p class="font-semibold mb-3 text-sm uppercase tracking-wide text-teal">Quick Links</p>
        <ul class="space-y-2 text-sm text-light-blue">
          <li><NuxtLink to="/about" class="hover:text-white">About</NuxtLink></li>
          <li><NuxtLink to="/organisation" class="hover:text-white">Organisation</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-white">Book Gakere</NuxtLink></li>
          <li><NuxtLink to="/blog" class="hover:text-white">Blog</NuxtLink></li>
          <li><NuxtLink to="/books" class="hover:text-white">Books</NuxtLink></li>
        </ul>
      </div>
      <div>
        <p class="font-semibold mb-3 text-sm uppercase tracking-wide text-teal">Contact</p>
        <p class="text-sm text-light-blue">
          <a :href="`mailto:${contactEmail}`" class="hover:text-white">{{ contactEmail }}</a>
        </p>
        <p class="text-sm text-light-blue mt-1">{{ contactPhone }}</p>
        <div class="flex gap-4 mt-4">
          <a
            v-for="link in socialLinks"
            :key="link.platform"
            :href="link.url"
            target="_blank"
            rel="noopener"
            class="text-light-blue hover:text-teal text-sm capitalize"
          >
            {{ link.platform }}
          </a>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10 py-6 text-center text-xs text-light-blue/70">
      © {{ new Date().getFullYear() }} Brian Gakere. All rights reserved.
    </div>
  </footer>
</template>
