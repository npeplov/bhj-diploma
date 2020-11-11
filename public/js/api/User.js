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
    document.querySelector('.user-name').innerHTML = 'id: ' + User.current().id;
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
<<<<<<< HEAD
=======
    if (User.current()) {
      document.querySelector('.user-name').innerHTML = 'id: ' + User.current().id;
>>>>>>> 3ac9921ef17dea5de69fb6db31606712354e2126

      const xhr = createRequest({
        method: 'GET',
        responseType: 'json',
        url: this.URL + '/current',
        data: data}, 

        (err, response) => {
          if (response) {
            // Если в результате есть данные об авторизованном пользователе, 
            // обновить данные текущего пользователя (вызвать метод setCurrent)
            User.setCurrent(response.user);
          }
          else {
          // Если нет (success = false), удалить запись об авторизации (вызвать метод unsetCurrent)
            User.unsetCurrent();
            console.log(err);
          }
          
          callback(err, response);
        });
<<<<<<< HEAD
=======

    }
>>>>>>> 3ac9921ef17dea5de69fb6db31606712354e2126
    
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
      (err, response) => {
          if (response)
            User.setCurrent(response.user);
          else
            console.log(err);

          callback(err, response);
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
      data: data.data}, 

      (err, response) => {
        if (response) {
          // После успешной авторизации User.setCurrent.
          User.setCurrent(response.user);
        }

        callback(err, response);
      }
    );
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    // Какие data ожидает logout?
    createRequest({
      method: 'POST',
      responseType: 'json',
      url: this.URL + '/logout',
      data: data},

      callback = (err, response) => {
        if (response) {
          // После успешного выхода вызвать метод User.unsetCurrent.
          User.unsetCurrent();

        }
        else
          console.log(err);

      }
    );
  }

}
