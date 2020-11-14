class Modal {

  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents(this.element);
    }
    else
      throw new Error('Это не те дроиды, которых вы ищете');
  }

  registerEvents() {
    this.element.addEventListener('click', this.onClose.bind(this));
  }

  onClose( e ) {
    if (e.target.closest('[data-dismiss="modal"]')) {
      this.close(this.element);
      this.unregisterEvents();
    }
  }

  unregisterEvents() {
    this.element.removeEventListener('click', this.onClose.bind(this));
  }

  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.display = '';
  }
}
