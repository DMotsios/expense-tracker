<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li v-for="transaction in transactions" :key="transaction.id" :style="transaction.description ? 'border-bottom: 1px solid #333' : ''"
            :class="transaction.amount < 0 ? 'minus' : 'plus'" :title="'Description: ' + transaction.description">
            {{ transaction.text }} <span>${{ transaction.amount }}</span>
            <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
            <button @click="editTransaction(transaction)" class="edit-btn">...</button>
        </li>

    </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['transactionDeleted', 'transactionEdit']);

defineProps({
    transactions: {
        type: Array,
        required: true
    }
});

function deleteTransaction(id) {
    emit('transactionDeleted', id);
}

function editTransaction(transaction) {
    emit('transactionEdit', transaction);
}

</script>