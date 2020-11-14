class UserWidget {

  constructor( element ) {
    if (element)
      this.element = element;
    else
      throw new Error('not element');
  }

  update() {
    const userAuthorized = { name: User.current().name };

    if (userAuthorized) {
      this.element.querySelector('.user-name').innerHTML = userAuthorized.name;
    }
  }
}
