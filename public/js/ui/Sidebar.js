class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    document.querySelector('.sidebar-toggle').onclick = function() {
      const body = document.children[0].children[1];
      body.classList.toggle('sidebar-open'); 
      body.classList.toggle('sidebar-collapse');
    }
  }

  static initAuthLinks() {
    const buttons = Array.from(document.querySelectorAll('li a'));

    buttons[0].addEventListener('click', login);
    buttons[1].addEventListener('click', register);
    buttons[2].addEventListener('click', logout);

    function login() {
      App.getModal( 'login' ).open();
    }

    function register() {
      App.getModal( 'register' ).open();
    }
 
    function logout() {
      User.logout('', (err, response) => {
        if (response)
          App.setState('init');
      });
    }
  }

}
