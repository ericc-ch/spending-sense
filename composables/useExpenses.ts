import { ref, onMounted } from 'vue';
import type { Expense, ExpenseInput } from '~/types/expense';

const STORAGE_KEY = 'spendingsense_expenses';

export const useExpenses = () => {
  const expenses = ref<Expense[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Load expenses from localStorage
  const loadExpenses = () => {
    try {
      isLoading.value = true;
      const stored = localStorage.getItem(STORAGE_KEY);
      expenses.value = stored ? JSON.parse(stored) : [];
    } catch (e) {
      error.value = 'Failed to load expenses';
      console.error('Error loading expenses:', e);
    } finally {
      isLoading.value = false;
    }
  };

  // Save expenses to localStorage
  const saveExpenses = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses.value));
    } catch (e) {
      error.value = 'Failed to save expenses';
      console.error('Error saving expenses:', e);
    }
  };

  // Add a new expense
  const addExpense = (expenseInput: ExpenseInput) => {
    const newExpense: Expense = {
      ...expenseInput,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    expenses.value.push(newExpense);
    saveExpenses();
    return newExpense;
  };

  // Update an existing expense
  const updateExpense = (id: string, updates: Partial<ExpenseInput>) => {
    const index = expenses.value.findIndex(e => e.id === id);
    if (index === -1) {
      error.value = 'Expense not found';
      return null;
    }

    expenses.value[index] = {
      ...expenses.value[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    saveExpenses();
    return expenses.value[index];
  };

  // Delete an expense
  const deleteExpense = (id: string) => {
    expenses.value = expenses.value.filter(e => e.id !== id);
    saveExpenses();
  };

  // Get expenses for a specific date range
  const getExpensesByDateRange = (startDate: string, endDate: string) => {
    return expenses.value.filter(expense => {
      return expense.date >= startDate && expense.date <= endDate;
    });
  };

  // Calculate total expenses
  const calculateTotal = (expenseList: Expense[] = expenses.value) => {
    return expenseList.reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Initialize expenses when the component is mounted
  onMounted(() => {
    loadExpenses();
  });

  return {
    expenses,
    isLoading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpensesByDateRange,
    calculateTotal,
  };
};
