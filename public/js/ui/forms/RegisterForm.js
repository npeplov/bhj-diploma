class RegisterForm extends AsyncForm {

  onSubmit( options ) {
    User.register(options, (err, response) => {
      if (response) {
        console.log(response);
        App.setState( 'user-logged' );
        App.getModal( 'register' ).close();
      }
      else
        console.log('error:', err);
    });

  }
}
