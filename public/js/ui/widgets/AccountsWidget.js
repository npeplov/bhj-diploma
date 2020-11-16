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
    this.element.addEventListener('click', accWigd.bind(this));
  

    function accWigd(e) {
      if (e.target.classList.contains('create-account'))
        App.getModal('createAccount').open();

      if (e.target.closest('li').classList.contains('account'))
        this.onSelectAccount(e.target.closest('li'))
    }
  }

  update() {
    if (User.current()) {
      Account.list( User.current(), (err, response) => {
        if (response) {
          this.clear();
          this.renderItem(response.data);
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
    if (this.element.previousAccountSelected) 
      this.element.previousAccountSelected.classList.remove('active');
        
    App.showPage('transactions', {account_id: element.dataset.id});
    element.classList.add('active');

    this.element.previousAccountSelected = element;
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
