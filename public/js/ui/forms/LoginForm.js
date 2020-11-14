class LoginForm extends AsyncForm {

  onSubmit( options ) {
    User.login(options, (err, response) => {
        if (response) {
          App.setState('user-logged');
          App.getModal( 'login' ).close();
        }
        else
          console.log('error:', err);
      });
  }
}
