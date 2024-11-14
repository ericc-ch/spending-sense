<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-200">
    <div>
      <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Amount ($)</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span class="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
        </div>
        <input
          id="amount"
          v-model.number="form.amount"
          type="number"
          step="0.01"
          min="0"
          required
          class="block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
          placeholder="0.00"
        />
      </div>
    </div>

    <div>
      <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
      <select
        id="category"
        v-model="form.category"
        required
        class="block w-full mt-1 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white transition-colors duration-200"
      >
        <option value="" disabled>Select a category</option>
        <option v-for="category in DEFAULT_CATEGORIES" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
      <input
        id="description"
        v-model="form.description"
        type="text"
        required
        class="block w-full mt-1 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white transition-colors duration-200"
        placeholder="Enter expense description"
      />
    </div>

    <div>
      <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Date</label>
      <input
        id="date"
        v-model="form.date"
        type="date"
        required
        class="block w-full mt-1 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white transition-colors duration-200"
      />
    </div>

    <div class="flex gap-4">
      <button
        type="submit"
        class="flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
      >
        {{ expense ? 'Update' : 'Add' }} Expense
      </button>
      
      <button
        v-if="expense"
        type="button"
        @click="resetForm"
        class="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Expense, ExpenseInput } from '~/types/expense';
import { DEFAULT_CATEGORIES } from '~/types/expense';

const props = defineProps<{
  expense?: Expense
}>();

const emit = defineEmits<{
  (e: 'submit', expense: ExpenseInput): void
  (e: 'cancel'): void
}>();

const form = ref<ExpenseInput>({
  amount: 0,
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
});

const resetForm = () => {
  form.value = {
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  };
  emit('cancel');
};

const handleSubmit = () => {
  emit('submit', form.value);
  if (!props.expense) {
    resetForm();
  }
};

onMounted(() => {
  if (props.expense) {
    form.value = {
      amount: props.expense.amount,
      category: props.expense.category,
      description: props.expense.description,
      date: props.expense.date,
    };
  }
});
</script>
