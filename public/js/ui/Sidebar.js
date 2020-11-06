/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    document.querySelector('.sidebar-toggle').onclick = function() {
      const body = document.children[0].children[1];
      body.classList.toggle('sidebar-open'); 
      body.classList.toggle('sidebar-collapse');
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const buttons = Array.from(document.querySelectorAll('li a'));

    buttons[0].addEventListener('click', open);
    buttons[2].addEventListener('click', logout)


    function open() {
      App.getModal( 'login' ).open();
    }
    function logout() {
      User.logout();
    }
  }

}

// клик по кнопке Вход.
/* <li class="menu-item menu-item_login">
                        <a href="#">Вход */
// где регистрация события клик по этому элементу?