class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  //submit budget
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value < 0 || value == "") {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
      setTimeout(() => {
        this.budgetFeedback.classList.remove("showItem");
      }, 3000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetForm.reset();
      this.showBalance();
    }
  }
  //show balance
  showBalance() {
    const expense = this.totalExpense();
    const balance = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = balance;
    this.expenseAmount.textContent = expense;
    if (balance < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    } else if (balance == 0) {
      this.balance.classList.remove("showGreen", "showRed");
      this.balance.classList.add("showBlack");
    } else {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    }
  }
  //edit expense
  editExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    for (let i = 0; i < this.itemList.length; i++) {
      if (id == this.itemList[i].id) {
        this.expenseInput.value = this.itemList[i].title;
        this.amountInput.value = this.itemList[i].amount;
        this.itemList.splice(i, 1);
      }
    }
    this.showBalance();
  }
  //delete expense
  deleteExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    for (let i = 0; i < this.itemList.length; i++) {
      if (id == this.itemList[i].id) {
        this.itemList.splice(i, 1);
      }
    }
    this.showBalance();
  }
  //total expense
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      for (let i = 0; i < this.itemList.length; i++) {
        total += this.itemList[i].amount;
      }
      this.expenseAmount.textContent = total;
      return total;
    } else {
      this.expenseAmount.textContent = total;
      return total;
    }
  }
  //submit expense
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if (amountValue == "" || expenseValue == "" || amountValue <= 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `<p>Values cannot be empty or less than zero</p>`;
      setTimeout(() => {
        this.expenseFeedback.classList.remove("showItem");
      }, 3000);
    } else {
      const amount = parseInt(amountValue);
      this.expenseForm.reset();

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      };
      this.itemID++;
      this.itemList.push(expense);
      console.log(this.itemList);
      this.addExpense(expense);
      this.showBalance();
    }
  }
  // add expense to expense list
  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fa fa-edit"></i>
          </a>
          <a  href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fa fa-trash"></i>
          </a>
         </div>
        </div>`;
    this.expenseList.appendChild(div);
  }
}
function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  const ui = new UI();

  // BUDGET FORM
  budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitBudgetForm();
  });

  // EXPENSE FORM
  expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitExpenseForm();
  });
  // EXPENSE LIST
  expenseList.addEventListener("click", function(event) {
    if (event.target.parentElement.classList.contains("edit-icon")) {
      ui.editExpense(event.target.parentElement);
    } else if (event.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteExpense(event.target.parentElement);
    }
  });
}
document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
});
