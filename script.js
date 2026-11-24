
let expenses = [];

const form = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const category = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const filter = document.getElementById("filter");

// Add Expense

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = expenseName.value.trim();
    let amount = Number(expenseAmount.value);
    let selectedCategory = category.value;

    // Validation

    if (name === "" || selectedCategory === "" ||
        expenseAmount.value.trim() === "" ||
        !Number.isFinite(amount) || amount <= 0) {

        alert("Please enter valid expense details!");
        return;
    }

    let expense = {
        name: name,
        amount: amount,
        category: selectedCategory
    };

    expenses.push(expense);

    form.reset();

    displayExpenses();

});

// Display Expenses

function displayExpenses() {

    expenseList.innerHTML = "";

    let selectedFilter = filter.value;

    let filteredExpenses = expenses.filter(function(expense) {
        return selectedFilter === "All" ||
               expense.category === selectedFilter;
    });

    if (filteredExpenses.length === 0) {
        expenseList.innerHTML =
            '<p class="empty">No expenses found.</p>';
    }

    filteredExpenses.forEach(function(expense) {

        let index = expenses.indexOf(expense);

        let item = document.createElement("div");
        item.className = "expense-item";

        item.innerHTML = `
            <div>
                <h3>${expense.name}</h3>
                <p>${expense.category}</p>
            </div>

            <div class="expense-right">
                <strong>₹${expense.amount.toFixed(2)}</strong>

                <button class="delete-btn"
                    onclick="deleteExpense(${index})">
                    Delete
                </button>
            </div>
        `;

        expenseList.appendChild(item);

    });

    updateTotal();

}

// Delete Expense

function deleteExpense(index) {

    expenses.splice(index, 1);

    displayExpenses();

}

// Update Summary

function updateTotal() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    let count = expenses.length;

    let average = count > 0 ? total / count : 0;

    document.getElementById("total").innerText =
        "₹" + total.toFixed(2);

    document.getElementById("count").innerText = count;

    document.getElementById("average").innerText =
        "₹" + average.toFixed(2);

}

// Category Filter

filter.addEventListener("change", displayExpenses);
