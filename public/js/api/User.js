/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user)
      return JSON.parse(localStorage.user);
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    const xhr = createRequest({
      method: 'GET',
      responseType: 'json',
      url: this.URL + '/current',
      data: data}, 
      callback
    );
    // Если в результате есть данные об авторизованном пользователе, 
    // обновить данные текущего пользователя (вызвать метод setCurrent)

    // Если нет (success = false), удалить запись об авторизации (вызвать метод unsetCurrent)
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    const xhr = createRequest({
      method: 'POST',
      responseType: 'json',
      url: this.URL + '/login',
      data: data.data}, 
      callback = (response) => {
        if (response.user)
          this.setCurrent(response.user);
        else
          console.log(response);
      }
    );

  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    const xhr = createRequest({
      method: 'POST',
      responseType: 'json',
      url: this.URL + '/register',
      data: data}, callback
    );
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    createRequest({
      method: 'POST',
      responseType: 'json',
      url: this.URL + '/logout',
      data: data}, callback
    );
  // После успешного выхода вызвать метод User.unsetCurrent.
      this.unsetCurrent();
  }
}

// const data = {
//   email: 'test@test.ru',
//   password: 'abracadabra'
// }

// User.login( data, ( response ) => {
//   console.log( response.user ); 
// });

// User.logout( data, (resp) => console.log('logout =',  resp.success));

// User.unsetCurrent();
// User.fetch(0, (resp) => console.log(resp));
// {success: false, user: null, error: "Необходимо передать id, name и email пользователя"
// User.setCurrent(data);
