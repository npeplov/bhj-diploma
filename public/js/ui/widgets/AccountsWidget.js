class AccountsWidget {

  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
      this.update();
    }
    else
      throw new Error('Элемент не элемент');
  }

  registerEvents() {
    const newAccount = this.element.querySelector('.create-account');
    newAccount.addEventListener('click', () => {
      App.getModal('createAccount').open();
    })

    const accounts = Array.from(this.element.querySelectorAll('.account'));

    accounts.forEach( (account) => {
      account.addEventListener('click', this.onSelectAccount );
    } )
  }

  update() {
    if (User.current()) {
      Account.list( User.current(), (err, response) => {
        if (response) {
          this.clear();
          this.renderItem(response.data);
          this.registerEvents();
        }
        else
          console.log(err);
      });
    };
  }

  clear() {
    let accounts = Array.from(this.element.querySelectorAll('.account'));

    if (accounts.length > 0)
      accounts.forEach( (li) => { li.remove() });
  }


  onSelectAccount( element ) {
    element.target.parentElement.classList.add('active');
    App.showPage('transactions', {account_id: element.target.parentElement.dataset.id})
  }

  getAccountHTML( item ) {
    return `
    <li class="account" data-id="${item.id}">
        <a href="#">${item.name} ${item.sum} ₽</a>
    </li>
    `
  }

  renderItem( items ) {
    items.forEach( (item) => {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
    });
  }
}
