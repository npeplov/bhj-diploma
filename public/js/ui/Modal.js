class Modal {

  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents(this.element);
    }
    else
      throw new Error('Элемент не элемент');
  }

  registerEvents() {
    const close = this.element.querySelectorAll('[data-dismiss]');
    close[0].addEventListener('click', () => {this.close()});
    close[1].addEventListener('click', () => {this.close()});
  }

  onClose( e ) {
    this.close(this.element)
  }

  unregisterEvents() {
    const buttons = Array.from(this.element.querySelectorAll('[data-dismiss="modal"]'));

    buttons.forEach( (button) => {
      button.removeEventListener('click', this.onClose)
    })
  }

  open() {
    this.element.style.display = 'block';
  }

  close(){
    this.element.style.display = '';
  }
}
