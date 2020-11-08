/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    const answ = User.register(options);
    // После успешной регистрации
    // if (answ) 
    App.setState( 'user-logged' );
    App.getModal( 'register' ).close();
  }
}
