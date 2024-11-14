<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">Spending Analytics</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Spending by Category</h2>
        <CategoryPieChart :expenses="expenses" />
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Monthly Spending Trend</h2>
        <MonthlyTrendChart :expenses="expenses" />
      </div>
      
      <div class="bg-white rounded-lg shadow p-6 md:col-span-2">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium text-gray-900">Spending Summary</h2>
          <select v-model="timeRange" class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-500">Total Spending</h3>
            <p class="mt-2 text-2xl font-semibold text-gray-900">{{ formatAmount(totalSpending) }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-500">Average per Day</h3>
            <p class="mt-2 text-2xl font-semibold text-gray-900">{{ formatAmount(averagePerDay) }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-500">Top Category</h3>
            <p class="mt-2 text-2xl font-semibold text-gray-900">{{ topCategory }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Expense } from '~/types/expense'
import { useExpenses } from '~/composables/useExpenses'

const timeRange = ref('30')
const { expenses } = useExpenses()

const filteredExpenses = computed(() => {
  const daysAgo = parseInt(timeRange.value)
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysAgo)
  
  return expenses.value.filter(expense => 
    new Date(expense.date) >= cutoffDate
  )
})

const totalSpending = computed(() => {
  return filteredExpenses.value.reduce((sum, expense) => sum + expense.amount, 0)
})

const averagePerDay = computed(() => {
  return totalSpending.value / parseInt(timeRange.value)
})

const topCategory = computed(() => {
  const categoryTotals = filteredExpenses.value.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
})

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}
</script>
