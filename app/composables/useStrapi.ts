export interface StrapiImage {
  url: string
  alternativeText?: string | null
}

export function strapiImageUrl(image?: StrapiImage | null): string | undefined {
  if (!image?.url) return undefined
  if (image.url.startsWith('http')) return image.url
  const config = useRuntimeConfig()
  return `${config.public.strapiUrl}${image.url}`
}

export function useStrapiSingle<T>(collection: string) {
  const config = useRuntimeConfig()
  return useAsyncData<T | null>(`strapi-single-${collection}`, async () => {
    const res = await $fetch<{ data: T }>(`${config.strapiUrl}/api/${collection}`, {
      query: { populate: '*' }
    })
    return res.data
  })
}

export function useStrapiList<T>(collection: string, params: Record<string, any> = {}) {
  const config = useRuntimeConfig()
  return useAsyncData<T[]>(`strapi-list-${collection}`, async () => {
    const res = await $fetch<{ data: T[] }>(`${config.strapiUrl}/api/${collection}`, {
      query: { populate: '*', ...params }
    })
    return res.data
  }, { default: () => [] })
}
