class AsyncForm {

  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
    }
    else
      throw new Error('Элемент не элемент');
  }

  registerEvents() {
    if ( this.element.checkValidity() ) {
      this.element.onsubmit = (e) => { 
        e.preventDefault();
        this.submit();
      }
    }
    else
      return;
  }

  getData() {
    const obj = {};
    const form = Array.from(this.element);

    form.forEach( (elem) => {
      if (elem.value)
        obj[elem.name] = elem.value;
    })
    return obj;
  }

  onSubmit( options ) {

  }

  submit() {
    this.onSubmit( this.getData() );
  }

}
