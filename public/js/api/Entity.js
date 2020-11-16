class Entity {
  static URL = '';

  static list( data, callback = (f) => f ) {
    if (data) {
      createRequest( {
        method: 'GET',
        responseType: 'json',
        url: this.URL,
        data: data },
        (err, response) => { callback(err, response) }
      );
    }
  }

  static create( data, callback = f => f ) {
    createRequest({
      method: 'POST',
      responseType: 'json',
      url: this.URL,
      data: Object.assign( {_method: 'PUT'}, data)},
      (err, response) => { callback(err, response) }
    );
  }

  static get( id = '', data, callback = f => f ) {
    createRequest({
      method: 'GET',
      responseType: 'json',
      url: this.URL,
      data: data,
      id,},
      (err, response) => { callback(err, response) }
    );
  }

  static remove( id = '', data, callback = f => f ) {
    createRequest({
      method: 'POST',
      responseType: 'json',
      url: this.URL,
      data: Object.assign({_method: 'DELETE', id}, data)},
      (err, response) => { callback(err, response) }
    );
  }

}

