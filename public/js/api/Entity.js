/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = (f) => f ) {
    if (data) {
      createRequest( {
        method: 'GET',
        responseType: 'json',
        url: this.URL,
        data: data },
        (err, response) => {
          if (err)
            console.log(err);
        callback (err, response);
      });
    }
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    createRequest({
      method: 'POST',
      responseType: 'json',
      url: this.URL,
      data: Object.assign( {_method: 'PUT'}, data.data) },
      (err, response) => {
        if (err)
          console.log(err);
      callback(err, response);
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
  //id задаёт идентификатор записи (например, идентификатор счёта или дохода/расхода; 
  //это станет актуально для классов Account и Transaction)
    createRequest({
      method: 'GET',
      responseType: 'json',
      url: this.URL,
      data
    }, 
    (err, response) => {
      if (err)
        console.log(err);
      callback(err, response)
    })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    // Account.remove(166m33a1okhdfv1qo, User.current())
    createRequest({
      method: 'POST',
      responseType: 'json',
      url: this.URL,
      data: Object.assign({_method: 'DELETE', id}, data),
      // К данным, передаваемых в параметре data, необходимо добавить идентификатор id 
      // и свойство _method со значением DELETE
      }, 
      (err, response) => { callback(err, response) }
    )
  }

}

