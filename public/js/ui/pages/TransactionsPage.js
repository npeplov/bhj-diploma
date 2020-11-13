/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element)
      this.element = element;
    else 
      throw new Error('Элемент не элемент')
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions)
      this.render(this.lastOptions);
    else
      this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.querySelector('.remove-account').onclick = () => {
      this.removeAccount();
    }
    const transactions = this.element.querySelectorAll('.transaction__remove');
    // console.log(transactions);
    transactions.forEach( (transaction) => {
      transaction.onclick = () => {
        this.removeTransaction(transaction.dataset.id)
      }
    }
    )
  }

  /**
   * Удаляет счёт. Если согласен - удалить
     вызовите Account.remove, 
     а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      const userAgree = confirm('Are you sure?');
      if (userAgree) {
        Account.remove(this.lastOptions.account_id, '',
          (err, response) => {
            if (response) {
              App.update();
              this.clear();
            }
            else
              console.log(err);
          }
        );
        this.clear();
      }
    }
  }
  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    const userAgree = confirm('Are you sure?');
    if (userAgree) {
      Transaction.remove(id, '', (err, response) => {
        if (response) {
          this.update();
        }
        else
          console.log(err);
        }
      )
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options) {
      Account.get(options.account_id, '', 
        (err, response) => {
          if (response) {
            this.renderTitle(response.data.name);
          }
          else
            console.log(err);
          }
      );
      Transaction.list(options,
        (err, response) => {
          this.renderTransactions(response.data);
        });
      this.lastOptions = options;
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.element.querySelector('.content-title').innerText = "Название счёта";
    this.renderTransactions([]);
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    this.element.querySelector('.content-title').innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    const result = new Date(date);
    return result.toLocaleString('ru', { day:'2-digit' , month: 'long', year: 'numeric'}) + 
    ' в ' + result.toLocaleString('ru', { hour:'2-digit' , minute: '2-digit'});
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    return `
    <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
              ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
    </div>
    `
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const content = this.element.querySelector('.content');
    content.innerHTML = '';

    data.forEach( (transaction) => {
      content.innerHTML += this.getTransactionHTML(transaction);
    })
    this.registerEvents();
  }
}
