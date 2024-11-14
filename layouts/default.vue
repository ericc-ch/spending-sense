<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col"
  >
    <header
      class="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
              >SpendingSense</NuxtLink
            >
            <nav class="hidden md:flex space-x-6">
              <NuxtLink
                to="/"
                class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >Dashboard</NuxtLink
              >
              <NuxtLink
                to="/analytics"
                class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >Analytics</NuxtLink
              >
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <AdDisplay />

    <footer
      class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} SpendingSense. All rights
          reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AdDisplay from "~/components/AdDisplay.vue";

// Layout level scripts can go here
</script>
