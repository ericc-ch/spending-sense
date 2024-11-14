<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
    
    <div v-else-if="expenses.length === 0" class="text-center py-8">
      <div class="text-gray-400 text-5xl mb-4">📊</div>
      <h3 class="text-lg font-medium text-gray-900">No expenses yet</h3>
      <p class="mt-1 text-sm text-gray-500">
        Start tracking your expenses by adding your first entry.
      </p>
    </div>
    
    <div v-else class="space-y-3">
      <div v-for="expense in expenses" :key="expense.id" 
           class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
        <div class="flex justify-between items-start gap-4">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-medium text-gray-900 truncate">{{ expense.description }}</h3>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" 
                    :class="getCategoryClass(expense.category)">
                {{ expense.category }}
              </span>
            </div>
            <p class="mt-1 text-sm text-gray-500">{{ formatDate(expense.date) }}</p>
          </div>
          <div class="flex items-start gap-4">
            <span class="text-sm font-medium" :class="expense.amount >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ formatAmount(expense.amount) }}
            </span>
            <div class="flex items-center gap-2">
              <button
                @click="$emit('edit', expense)"
                class="text-gray-400 hover:text-gray-600"
                title="Edit"
              >
                ✏️
              </button>
              <button
                @click="handleDelete(expense.id)"
                class="text-gray-400 hover:text-red-600"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="expenses.length > 0" 
         class="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium text-gray-500">Total Expenses</span>
        <span class="text-lg font-semibold" 
              :class="calculateTotal(expenses) >= 0 ? 'text-green-600' : 'text-red-600'">
          {{ formatAmount(calculateTotal(expenses)) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Expense } from '~/types/expense';

const props = defineProps<{
  expenses: Expense[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'edit', expense: Expense): void;
  (e: 'delete', id: string): void;
}>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const calculateTotal = (expenses: Expense[]) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

const getCategoryClass = (category: string) => {
  const classes = {
    'Food & Dining': 'bg-blue-100 text-blue-800',
    'Transportation': 'bg-green-100 text-green-800',
    'Shopping': 'bg-purple-100 text-purple-800',
    'Entertainment': 'bg-pink-100 text-pink-800',
    'Bills & Utilities': 'bg-yellow-100 text-yellow-800',
    'Health & Medical': 'bg-red-100 text-red-800',
    'Travel': 'bg-indigo-100 text-indigo-800',
    'Education': 'bg-orange-100 text-orange-800',
    'Other': 'bg-gray-100 text-gray-800'
  };
  return classes[category as keyof typeof classes] || 'bg-gray-100 text-gray-800';
};

const handleDelete = (id: string) => {
  if (confirm('Are you sure you want to delete this expense?')) {
    emit('delete', id);
  }
};
</script>
