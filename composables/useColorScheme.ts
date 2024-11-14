import { ref, onMounted, watch } from 'vue'

export const useColorScheme = () => {
  const colorScheme = ref<'light' | 'dark'>('light')

  const toggleColorScheme = () => {
    colorScheme.value = colorScheme.value === 'light' ? 'dark' : 'light'
    updateHTMLClass()
    localStorage.setItem('color-scheme', colorScheme.value)
  }

  const updateHTMLClass = () => {
    const htmlElement = document.documentElement
    if (colorScheme.value === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }

  onMounted(() => {
    // Check local storage first
    const savedScheme = localStorage.getItem('color-scheme')
    if (savedScheme) {
      colorScheme.value = savedScheme as 'light' | 'dark'
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      colorScheme.value = prefersDark ? 'dark' : 'light'
    }
    updateHTMLClass()

    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('color-scheme')) {
        colorScheme.value = e.matches ? 'dark' : 'light'
        updateHTMLClass()
      }
    })
  })

  return {
    colorScheme,
    toggleColorScheme
  }
}
