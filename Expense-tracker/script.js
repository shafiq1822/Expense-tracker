'use strict';

const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const transaction = document.getElementById('transaction');
const amount = document.getElementById('amount');

// First step is to get the data already available in dataBase (in this project its localStorage)

// const localStorageTransactions = JSON.parse(localStorage.getItem(transactions));

// We create local copy of data (We follow clean method)
// let transactions  = localStorageTransactions !== null ? localStorageTransactions : [];

// User will enter the expense/income details - Create(POST)

// Should be displaying them on the screen - Read

// Should store the user data in localStorage - Create(PUT)

// Should sum all the values and update them on the screeen

// Delete functionality - Delete (POST)

// Delete the data in local storage

// Update the UI after Delete Event

// let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const localStorageTransactions = JSON.parse(localStorage.getItem('transaction'));

let transactions = localStorageTransactions !== null ? localStorageTransactions : [];

const updatelocalStorage = function() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};
// update values 

const updateValues = function() {
    const amounts = transactions.map((transaction) => transaction.amount); 

    // method Chaining
    
    const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => acc + amount, 0)

    const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, amount) => acc + amount, 0);

    const total = amounts.reduce((acc, amount) => acc + amount, 0).toFixed(2);

    moneyPlus.innerHTML = `₹${income}`
    moneyMinus.innerHTML = `₹${expense}`
    balance.innerHTML = `₹${total}`
};

// Add transactions to DOM list

const addTransactionDom = function(transaction) {

    // get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    //create an li element
    const item = document.createElement('li');

    // Add class based on sign/value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.transaction} <span>${sign}${Math.abs(transaction.amount,)}</span> <button class="delete-btn" onClick = "removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);

    updatelocalStorage();
};

const removeTransaction = function(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    updatelocalStorage();
    list.innerHTML = '';
    transactions.forEach(addTransactionDom);
    updateValues();
    init();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(transaction.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add Transaction details');
    }

    const transactionDetails = {
        id: Math.floor(Math.random() * 10000),
        transaction: transaction.value,
        amount: Number(amount.value),
    };

    transactions.push(transactionDetails);

    addTransactionDom(transactionDetails);

    updateValues();

    updatelocalStorage();

    transaction.value = '';
    amount.value = '';
});

// Starting inital values
const init = function(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDom);
    updateValues();
};

init();