/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
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
    }
    );
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, 
      (err, response) => {
        if (response) {
          App.update();
          this.element.reset();
          if (options.data.type === 'expense')
            App.getModal('newExpense').close();
          else if (options.data.type === 'income')
            App.getModal('newIncome').close();
        }
      }
    )
  }

}
