import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  // eslint-disable-next-line max-len
  // когда мы вызываем initDOMListeners все элементы уже должны быть в DOM считаны
  // то есть сначала мы вызываем excel.render()
  // и только потом initDOMListeners()
  // Но initDOMListeners нам нужно вызывать для каждого из компонентов
  // Надо придумать централизованное место, где мы сможем это сделать
  // И это место - это ExcelComponent
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        // eslint-disable-next-line max-len
        throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
