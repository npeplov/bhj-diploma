class TransactionsWidget {

  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
    }
    else
      throw new Error('Элемент не элемент');
  }

  registerEvents() {
    this.element.querySelector('.create-income-button').onclick = () => { 
      App.getModal('newIncome').open() };
      this.element.querySelector('.create-expense-button').onclick = () => { 
      App.getModal('newExpense').open() };
  }
}
