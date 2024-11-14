<template>
  <div class="relative h-64">
    <Line v-if="chartData.datasets[0].data.length > 0" :data="chartData" :options="chartOptions" />
    <div v-else class="absolute inset-0 flex items-center justify-center text-gray-500">
      No data available
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { Expense } from '~/types/expense'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<{
  expenses: Expense[]
}>()

const monthlyData = computed(() => {
  const data: Record<string, number> = {}
  const sortedExpenses = [...props.expenses].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  sortedExpenses.forEach(expense => {
    const date = new Date(expense.date)
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' })
    data[monthYear] = (data[monthYear] || 0) + expense.amount
  })

  return data
})

const chartData = computed(() => {
  const months = Object.keys(monthlyData.value)
  const amounts = Object.values(monthlyData.value)

  return {
    labels: months,
    datasets: [
      {
        label: 'Monthly Spending',
        data: amounts,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
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
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number) => {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(value)
        }
      }
    }
  }
}
</script>
