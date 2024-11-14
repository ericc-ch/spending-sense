<template>
  <div
    :class="[
      'ad-container',
      position === 'sidebar' ? 'w-64' : 'w-full',
      'mx-auto my-4 relative',
      { 'min-h-[100px]': !error }
    ]"
  >
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-50">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
    </div>
    
    <div v-if="error" class="text-center p-4 text-sm text-gray-500 dark:text-gray-400">
      {{ error }}
    </div>

    <ins
      v-show="!error && !loading"
      class="adsbygoogle"
      :style="{ display: 'block' }"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="format"
      data-full-width-responsive="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  position?: 'sidebar' | 'footer'
  format?: 'auto' | 'horizontal' | 'rectangle'
  adClient?: string
  adSlot?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'footer',
  format: 'auto',
  adClient: import.meta.env.VITE_ADSENSE_CLIENT_ID || '',
  adSlot: import.meta.env.VITE_ADSENSE_SLOT_ID || ''
})

const loading = ref(true)
const error = ref<string | null>(null)

const initializeAd = async () => {
  try {
    if (!props.adClient || !props.adSlot) {
      throw new Error('AdSense configuration is missing')
    }

    // Check if AdSense script is loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script')
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      script.async = true
      script.crossOrigin = 'anonymous'
      script.dataset.adClient = props.adClient
      
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = () => reject(new Error('Failed to load AdSense script'))
        document.head.appendChild(script)
      })
    }

    // Initialize the ad
    (window.adsbygoogle = window.adsbygoogle || []).push({})
    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = err instanceof Error ? err.message : 'Failed to load advertisement'
    console.error('AdSense Error:', err)
  }
}

onMounted(() => {
  initializeAd()
})
</script>

<style scoped>
.ad-container {
  background-color: transparent;
  transition: all 0.3s ease;
}

.adsbygoogle {
  width: 100%;
  height: 100%;
}
</style>
