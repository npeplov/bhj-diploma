class User {
  static URL = '/user';

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {
    if (localStorage.user) 
      return JSON.parse(localStorage.user);
  }

  static fetch( data, callback = f => f ) {
    if (User.current()) {
      const xhr = createRequest({
        method: 'GET',
        responseType: 'json',
        url: this.URL + '/current',
        data: data}, 

        (err, response) => {
          if (response) {
            User.setCurrent(response.user);
          }
          else {
            User.unsetCurrent();
            console.log(err);
          }
          callback(err, response);
      });
    }
    
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
      data: data}, 
      (err, response) => {
        if (response)
          User.setCurrent(response.user);
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
          User.unsetCurrent();
        }
      }
    );
  }

}
