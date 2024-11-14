<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="amount" class="form-label">Amount ($)</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span class="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          id="amount"
          v-model.number="form.amount"
          type="number"
          step="0.01"
          min="0"
          required
          class="input-field pl-7"
          placeholder="0.00"
        />
      </div>
    </div>

    <div>
      <label for="category" class="form-label">Category</label>
      <select
        id="category"
        v-model="form.category"
        required
        class="input-field"
      >
        <option value="" disabled>Select a category</option>
        <option v-for="category in DEFAULT_CATEGORIES" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div>
      <label for="description" class="form-label">Description</label>
      <input
        id="description"
        v-model="form.description"
        type="text"
        required
        class="input-field"
        placeholder="Enter expense description"
      />
    </div>

    <div>
      <label for="date" class="form-label">Date</label>
      <input
        id="date"
        v-model="form.date"
        type="date"
        required
        class="input-field"
      />
    </div>

    <div class="flex gap-4">
      <button
        type="submit"
        class="flex-1 btn btn-primary"
      >
        {{ expense ? 'Update' : 'Add' }} Expense
      </button>
      
      <button
        v-if="expense"
        type="button"
        @click="resetForm"
        class="btn btn-secondary"
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
  emit('submit', { ...form.value });
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
