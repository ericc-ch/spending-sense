<template>
  <div class="relative h-64">
    <Pie v-if="chartData.datasets[0].data.length > 0" :data="chartData" :options="chartOptions" />
    <div v-else class="absolute inset-0 flex items-center justify-center text-gray-500">
      No data available
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { Expense } from '~/types/expense'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  expenses: Expense[]
}>()

const categoryTotals = computed(() => {
  return props.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)
})

const chartData = computed(() => {
  const categories = Object.keys(categoryTotals.value)
  const amounts = Object.values(categoryTotals.value)
  
  return {
    labels: categories,
    datasets: [{
      data: amounts,
      backgroundColor: [
        '#3B82F6', // blue
        '#10B981', // green
        '#F59E0B', // yellow
        '#EF4444', // red
        '#8B5CF6', // purple
        '#EC4899', // pink
        '#6366F1', // indigo
        '#14B8A6', // teal
      ],
      borderWidth: 1
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20
      }
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.raw
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(value)
        }
      }
    }
  }
}
</script>
