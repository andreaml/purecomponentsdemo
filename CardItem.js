const cardTemplate = document.createElement('template');

cardTemplate.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }
    :host {
      flex: 1;
      margin: 15px;
      min-width: 320px;
      width: auto;
    }
    .card__container {
      border-radius: 5px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      padding: 15px;
    }
    .card__description {
      font-family: sans-serif;
      font-size: 14px;
    }
  </style>

  <div class='card__container'>
    <h3 class='card__header'>Item header</h3>
    <p class='card__description'>Item description</p>
    <slot></slot>
    <custom-button label='Click me' display-position='right'></custom-button>
  </div>
`;

class CardItem extends HTMLElement {
  constructor() {
    super();
    
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
    
    this.card = this._shadowRoot.querySelector('.card__container');
    this.button = this._shadowRoot.querySelector('custom-button');
  }
  
  static get observedAttributes() {
    return ['header', 'description', 'backgroundcolor', 'button-bgcolor', 'button-label'];
  }
  
  get header() {
    return this.getAttribute('header');
  }
  
  set header(value) {
    this.setAttribute('header', value);
  }
  
  get description() {
    return this.getAttribute('description');
  }
  
  set description(value) {
    this.setAttribute('description', value);
  }

  get backgroundColor() {
    return this.getAttribute('backgroundcolor');
  }

  set backgroundColor(value) {
    this.setAttribute('backgroundcolor', value);
  }
  
  get buttonBgColor() {
    return this.getAttribute('button-bgcolor');
  }
  
  set buttonBgColor(value) {
    this.setAttribute('button-bgcolor', value);
  }
  
  get buttonLabel() {
    return this.getAttribute('button-label');
  }
  
  set buttonLabel(value) {
    this.setAttribute('button-label', value);
  }

  set onClick(value) {
    this.button.onClick = value;
  }
  
  attributeChangedCallback(name, old, newval) {
    // console.log(name, old, newval)
    this.render();
  }
  
  render() {
    this.card.querySelector('.card__header').innerHTML = this.header;
    this.card.querySelector('.card__description').innerHTML = this.description;
    this.card.style.backgroundColor = this.backgroundColor;
    this.button.backgroundColor = this.buttonBgColor;
    this.button.label = this.buttonLabel;
  }
}

window.customElements.define('card-item', CardItem);
