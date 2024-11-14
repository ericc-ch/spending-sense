<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Expense Form Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          {{ selectedExpense ? 'Edit Expense' : 'Add New Expense' }}
        </h2>
        <ExpenseForm
          :expense="selectedExpense"
          @submit="handleExpenseSubmit"
          @cancel="selectedExpense = null"
        />
      </div>

      <!-- Expense List Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-medium text-gray-900">Recent Expenses</h2>
          <div class="text-sm text-gray-500">
            {{ expenses.length }} {{ expenses.length === 1 ? 'expense' : 'expenses' }}
          </div>
        </div>
        <ExpenseList
          :expenses="sortedExpenses"
          :is-loading="isLoading"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Expense, ExpenseInput } from '~/types/expense';

// Define page metadata
definePageMeta({
  layout: 'default',
  name: 'home'
});

const { 
  expenses,
  isLoading,
  error,
  addExpense,
  updateExpense,
  deleteExpense
} = useExpenses();

const selectedExpense = ref<Expense | null>(null);

// Sort expenses by date (most recent first)
const sortedExpenses = computed(() => {
  return [...expenses.value].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

const handleExpenseSubmit = (expenseData: ExpenseInput) => {
  try {
    if (selectedExpense.value) {
      updateExpense(selectedExpense.value.id, expenseData);
      selectedExpense.value = null;
    } else {
      addExpense(expenseData);
    }
  } catch (e) {
    console.error('Error handling expense submission:', e);
  }
};

const handleEdit = (expense: Expense) => {
  selectedExpense.value = expense;
  // Scroll to form on mobile
  if (window.innerWidth < 768) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const handleDelete = (id: string) => {
  deleteExpense(id);
  if (selectedExpense.value?.id === id) {
    selectedExpense.value = null;
  }
};
</script>
