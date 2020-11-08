"use strict"
/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    // Если передан пустой элемент в конструктор, должна быть выброшена ошибка.

    this.element = element;
    this.registerEvents(this.element);
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const close = this.element.querySelectorAll('[data-dismiss]');
    close[0].addEventListener('click', () => {this.close()});
    close[1].addEventListener('click', () => {this.close()});
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    this.close(this.element)
  }

  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    const buttons = Array.from(this.element.querySelectorAll('[data-dismiss="modal"]'));

    buttons.forEach( (button) => {
      button.removeEventListener('click', this.onClose)
    })
  }

  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = '';
  }
}
