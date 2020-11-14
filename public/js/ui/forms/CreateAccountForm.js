class CreateAccountForm extends AsyncForm {

  onSubmit( options ) {
    Account.create( options, (err, response) => {
      if (response) {
        App.getModal('createAccount').close();
        this.element.reset();
        App.update();
      }
      else
        console.log(err);
    });
  }
}
