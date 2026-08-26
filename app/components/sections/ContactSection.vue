<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
}

interface SiteSetting {
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

const config = useRuntimeConfig()

const form = reactive({ name: '', email: '', message: '' })
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function submitForm() {
  status.value = 'submitting'
  errorMessage.value = ''
  try {
    await $fetch(`${config.public.strapiUrl}/api/contact-submissions`, {
      method: 'POST',
      body: { data: { ...form } }
    })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (err) {
    status.value = 'error'
    errorMessage.value = 'Something went wrong sending your message. Please try again or email me directly.'
  }
}
</script>

<template>
  <section class="bg-navy text-white">
    <div class="mx-auto max-w-6xl px-6 py-24 grid gap-12 md:grid-cols-2">
      <div>
        <p class="text-teal font-medium tracking-wide uppercase text-sm mb-3">Contact</p>
        <h1 class="text-4xl font-semibold">Message Me</h1>
        <p class="text-light-blue mt-4 max-w-md">
          Whether it's AI solutions, training, mentorship, or teaching — reach out and let's talk
          about what you're trying to build.
        </p>
        <div class="mt-10 flex flex-col gap-2">
          <a :href="`mailto:${contactEmail}`" class="text-xl font-semibold text-teal hover:underline">
            {{ contactEmail }}
          </a>
          <p class="text-light-blue">{{ contactPhone }}</p>
        </div>
        <div class="flex gap-6 mt-8">
          <a
            v-for="link in socialLinks"
            :key="link.platform"
            :href="link.url"
            target="_blank"
            rel="noopener"
            class="text-light-blue hover:text-white text-sm capitalize"
          >
            {{ link.platform }}
          </a>
        </div>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-2xl p-8">
        <form v-if="status !== 'success'" class="space-y-5" @submit.prevent="submitForm">
          <div>
            <label for="name" class="block text-sm text-light-blue mb-1">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-white placeholder:text-light-blue/50 focus:outline-none focus:border-teal"
              placeholder="Your name"
            >
          </div>
          <div>
            <label for="email" class="block text-sm text-light-blue mb-1">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-white placeholder:text-light-blue/50 focus:outline-none focus:border-teal"
              placeholder="you@example.com"
            >
          </div>
          <div>
            <label for="message" class="block text-sm text-light-blue mb-1">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="4"
              class="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-white placeholder:text-light-blue/50 focus:outline-none focus:border-teal"
              placeholder="Tell me about your project..."
            />
          </div>
          <p v-if="status === 'error'" class="text-sm text-red-300">{{ errorMessage }}</p>
          <button
            type="submit"
            :disabled="status === 'submitting'"
            class="w-full bg-teal text-navy font-semibold px-6 py-3 rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ status === 'submitting' ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
        <div v-else class="text-center py-10">
          <p class="text-2xl font-semibold text-teal">Thank you!</p>
          <p class="text-light-blue mt-2">Your message has been sent. I'll get back to you soon.</p>
          <button
            class="mt-6 text-sm text-teal hover:underline"
            @click="status = 'idle'"
          >
            Send another message
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
