class TransactionsPage {

  constructor( element ) {
    if (element)
      this.element = element;
    else 
      throw new Error('Элемент не элемент')
  }

  update() {
    if (this.lastOptions)
      this.render(this.lastOptions);
    else
      this.render();
  }

  registerEvents() {
    this.element.querySelector('.remove-account').onclick = () => {
      this.removeAccount();
    }
    const transactions = this.element.querySelectorAll('.transaction__remove');
    transactions.forEach( (transaction) => {
      transaction.onclick = () => {
        this.removeTransaction(transaction.dataset.id)
      }
    }
    )
  }

  removeAccount() {
    if (this.lastOptions) {
      this.clear();
      const userAgree = confirm('Are you sure?');
      if (userAgree) {
        Account.remove(this.lastOptions.account_id, '',
          (err, response) => {
            if (response) {
              App.update();
            }
            else
              console.log(err);
          }
        );
      }
    }
  }

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

  clear() {
    this.renderTitle("Название счёта");
    this.renderTransactions([]);
    this.lastOptions = null;
  }

  renderTitle( name ) {
    this.element.querySelector('.content-title').innerText = name;
  }

  formatDate( date ) {
    const result = new Date(date);
    return result.toLocaleString('ru', { day:'2-digit' , month: 'long', year: 'numeric'}) + 
    ' в ' + result.toLocaleString('ru', { hour:'2-digit' , minute: '2-digit'});
  }

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

  renderTransactions( data ) {
    const content = this.element.querySelector('.content');
    content.innerHTML = '';

    data.forEach( (transaction) => {
      content.innerHTML += this.getTransactionHTML(transaction);
    })
    this.registerEvents();
  }
}
