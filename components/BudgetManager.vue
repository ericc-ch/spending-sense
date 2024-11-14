<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Budget Management</h2>
    <div v-for="category in categories" :key="category" class="mb-4">
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ category }}</span>
        <input 
          type="number" 
          v-model.number="budgets[category]" 
          class="rounded-md border-gray-300 dark:border-gray-600 py-1 px-2 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white w-24 transition-colors duration-200" 
          placeholder="Set limit" 
        />
      </div>
      <div class="mt-2 relative pt-1">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <span class="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
              {{ Math.round((getCategorySpending(category) / (budgets[category] || 1)) * 100) }}% Used
            </span>
          </div>
        </div>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
          <div
            :style="{ width: Math.min((getCategorySpending(category) / (budgets[category] || 1)) * 100, 100) + '%' }"
            :class="{
              'bg-green-500': getCategorySpending(category) <= budgets[category] * 0.8,
              'bg-yellow-500': getCategorySpending(category) > budgets[category] * 0.8 && getCategorySpending(category) <= budgets[category],
              'bg-red-500': getCategorySpending(category) > budgets[category]
            }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
          ></div>
        </div>
      </div>
      <div 
        v-if="getCategorySpending(category) > budgets[category]" 
        class="text-red-600 dark:text-red-400 text-sm mt-1"
      >
        Alert: Over budget!
      </div>
      <div 
        v-else-if="getCategorySpending(category) > budgets[category] * 0.8" 
        class="text-yellow-600 dark:text-yellow-400 text-sm mt-1"
      >
        Warning: Approaching budget limit
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Expense } from '~/types/expense'

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Health & Medical',
  'Travel',
  'Education'
]

const budgets = ref<Record<string, number>>({})

const props = defineProps<{
  expenses: Expense[]
}>()

const getCategorySpending = (category: string) => {
  return props.expenses
    .filter(expense => expense.category === category)
    .reduce((sum, expense) => sum + expense.amount, 0)
}
</script>
