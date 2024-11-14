<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-medium text-gray-900 mb-4">Budget Management</h2>
    <div v-for="category in categories" :key="category" class="mb-4">
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium text-gray-700">{{ category }}</span>
        <input type="number" v-model.number="budgets[category]" class="rounded-md border-gray-300 py-1 px-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-24" placeholder="Set limit" />
      </div>
      <div v-if="getCategorySpending(category) > budgets[category]" class="text-red-600 text-sm mt-1">
        Alert: Over budget!
      </div>
      <div v-else-if="getCategorySpending(category) > budgets[category] * 0.8" class="text-yellow-600 text-sm mt-1">
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
