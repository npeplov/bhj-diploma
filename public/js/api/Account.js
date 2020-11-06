/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
    static URL = '/account';

    // constructor() {
    //     super() ;
    // }
}

// Account.list({
//     mail: 'ivan@biz.pro',
//     password: 'odinodin'
// }, (response) => console.log(response) 
// )

// Entity.list({
//     mail: 'ivan@biz.pro',
//     password: 'odinodin'
//     }, 
//     (response) => console.log(response) 
// )