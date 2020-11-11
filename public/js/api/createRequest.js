/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options, callback) => {
    console.log(options);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.responseType)
        xhr.responseType = options.responseType;
    xhr.setRequestHeader = options.headers;

    xhr.withCredentials = true;

    if (options.method === 'GET') {
        let url = options.url + "?";
        for (let key in options.data)
            url += key + "=" + options.data[key] + "&";
        
        xhr.open( options.method, url.slice(0, -1) );
        xhr.send();
    }

    else {
        const formData = new FormData;
        for (let key in options.data)
            formData.append( key, options.data[key] );

        xhr.open(options.method, options.url);
        xhr.send(formData);
        
        // for(let pair of formData.entries()) { console.log(pair[0]+ ', '+ pair[1]);}
    }

    xhr.onload = () => {
        if (xhr.response.success) {
            const err = null;
            callback(err, xhr.response);
            // console.log('ok', xhr.response);
        }
        else {
<<<<<<< HEAD
            // console.log('ERROR', xhr.response);
            callback(xhr.response.error);
=======
            console.log('ERROR', xhr.response);
            // callback(xhr.response.error);
>>>>>>> 3ac9921ef17dea5de69fb6db31606712354e2126
        }
    }

//  Если в процессе запроса произойдёт ошибка, её объект
//  должен быть в параметре err.
//  response success: false; error: "E-Mail адрес 1@1.ru уже существует."

    return xhr.response;
};

// createRequest( {
//     url: '', method: 'GET', responseType: 'json', callback: (response) => {console.log(response)},
//     data: { mail: 'ivan@biz.pro', password: 'odinodin'}
// });

