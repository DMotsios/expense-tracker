<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted"
      @transactionEdit="handleTransactionEdit" />
    <AddTransaction v-if="editTransaction == null" @transactionSubmitted="handleTransactionSubmitted" />
    <EditTransaction v-if="editTransaction != null" :transaction="editTransaction"
      @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import Balance from './components/Balance.vue';
import Header from './components/Header.vue'
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import EditTransaction from './components/EditTransaction.vue';

const toast = useToast();
const transactions = ref([]);
const editTransaction = ref(null);


onMounted(() => {
  const saveTransactions = JSON.parse(localStorage.getItem('transactions'));
  if (saveTransactions) {
    transactions.value = saveTransactions;
  }
});

const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount
  },
    0);
});

const income = computed(() => {
  return transactions.value.filter((transaction) => transaction.amount > 0).reduce((acc, transaction) => {
    return acc + transaction.amount
  },
    0).toFixed(2);
});

const expenses = computed(() => {
  return transactions.value.filter((transaction) => transaction.amount < 0).reduce((acc, transaction) => {
    return acc + transaction.amount
  },
    0).toFixed(2);
});

function handleTransactionSubmitted(transactionData) {
  //edit case
  if (transactionData.id) {
    transactions.value = transactions.value.map(transaction => {
      if (transaction.id === transactionData.id) {
        return {
          id: transactionData.id,
          text: transactionData.text,
          amount: transactionData.amount,
          description: transactionData.description
        }
      }
      return transaction;
    });
    toast.success('Transaction edited successfully!', {
      hideProgressBar: true,
      timeout: 1000,
    });
    saveToLocalStorage();
    editTransaction.value = null;
    return;
  } else {
    //add case
    transactions.value.push({
      id: transactions.value.length + 1,
      text: transactionData.text,
      amount: transactionData.amount,
      description: transactionData.description
    });
    toast.success('Transaction added successfully!', {
      hideProgressBar: true,
      timeout: 1000,
    });
    saveToLocalStorage();
  }
}

function handleTransactionDeleted(id) {
  transactions.value = transactions.value.filter(transaction => transaction.id !== id);
  toast.success('Transaction deleted successfully!', {
    hideProgressBar: true,
    timeout: 1000,
  });
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
}

function handleTransactionEdit(transaction) {
  editTransaction.value = transaction;
}

</script>