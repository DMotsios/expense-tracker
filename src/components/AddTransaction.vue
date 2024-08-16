<template>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit()">
        <div class="form-control">
            <label for="text">Text <span style="color: red;">*</span></label>
            <input type="text" id="text" placeholder="Enter text..." v-model="text">
        </div>
        <div class="form-control">
            <label for="amount">Amount <span style="color: red;">*</span> <span style="font-style: italic; font-size: 15px; color:brown">(negative ->
                    expense, positive -> income)</span></label>
            <input type="text" id="amount" placeholder="Enter amount..." v-model="amount" />
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <input type="text" id="description" placeholder="Enter description..." v-model="description" />
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import { ref, defineEmits } from 'vue';
import { transactionFormValidation } from '../utils.js';

const toast = useToast();
var text = ref('');
var amount = ref('');
var description = ref('');

const emit = defineEmits(['transactionSubmitted']);

function onSubmit() {
    let isIsValid = transactionFormValidation(text.value, amount.value);
    if (isIsValid != 'success') {
        return toast.error(isIsValid, {
            hideProgressBar: true,
            timeout: 1000,
        });
    }
    const transactionData = {
        text: text.value,
        amount: parseFloat(amount.value),
        description: description.value
    }

    emit('transactionSubmitted', transactionData);
    text.value = '';
    amount.value = '';
    description.value = '';
}

</script>