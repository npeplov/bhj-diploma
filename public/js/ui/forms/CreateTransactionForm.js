class CreateTransactionForm extends AsyncForm {

  constructor( element ) {
    if (element) {
      super(element);
      this.renderAccountsList();
    }
    else
      throw new Error('Элемент не элемент');
  }

  renderAccountsList() {
    Account.list( User.current(), 
    (err, response) => {
      if (response) {
        const select = this.element.querySelector('select');
        select.innerHTML = '';
        response.data.forEach( (account) => {
          select.innerHTML += `<option value="${account.id}">${account.name}</option>`
        });
      }
      else
        console.log(err);
    }
    );
  }

  onSubmit( options ) {
    Transaction.create(options, 
      (err, response) => {
        if (response) {
          App.update();
          this.element.reset();
          if (options.type === 'expense')
            App.getModal('newExpense').close();
          else if (options.type === 'income')
            App.getModal('newIncome').close();
        }
        else
          console.log(err);
      }
    )
  }

}
