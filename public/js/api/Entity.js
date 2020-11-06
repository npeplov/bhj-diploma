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
    return createRequest( {
      method: 'GET',
      responseType: 'json',
      url: this.URL,
      data }, callback )
  }

//     url: '', method: 'GET', responseType: 'json', callback: (response) => {console.log(response)},
//     data: { mail: 'ivan@biz.pro', password: 'odinodin'}

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    return createRequest({
      method: 'POST',
      responseType: 'json',

// К данным, передаваемых в параметре data, необходимо добавить свойство _method со значением PUT

      data}, callback)
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {

//id задаёт идентификатор записи (например, идентификатор счёта или дохода/расхода; 
//это станет актуально для классов Account и Transaction)

    return createRequest({
      method: 'GET',
      responseType: 'json',
      data}, callback)
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {

    return createRequest({
      method: 'POST ',
      responseType: 'json',
      data

      // К данным, передаваемых в параметре data, необходимо добавить идентификатор id 
      // и свойство _method со значением DELETE

      }, callback)

  }
}

