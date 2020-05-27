const buttonTemplate = document.createElement('template');
 
buttonTemplate.innerHTML = `
  <style>
    .button__container {
      max-width: 220px;
      padding: 15px 0;
    }
 
    .button-item {
      background: #ffffff;
      border: none;
      border-radius: 5px;
      box-sizing: border-box;
      cursor: pointer;
      display: block;
      font-size: 16px;
      font-weight: bold;
      height: 40px;
      outline: none;
      overflow: hidden;
      padding: 0 15px;
      position: relative;
      text-overflow: ellipsis;
      width: 100%;
    }

    .button-item:hover {
      filter: brightness(95%);
    }
  </style>
 
  <div class="button__container">
    <button class="button-item">Label</button>
  </div>
`;
 
class CustomButton extends HTMLElement {
  constructor() {
    super();
 
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));

    this.container = this._shadowRoot.querySelector('.button__container');
    this.button = this._shadowRoot.querySelector('button');

    this.button.addEventListener('click', () => {
      console.log('OnClick from Custom Button');
    });
  }

  static get observedAttributes() {
    return ['label', 'backgroundcolor'];
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get backgroundColor() {
    return this.getAttribute('backgroundcolor');
  }

  set backgroundColor(value) {
    this.setAttribute('backgroundcolor', value);
  }

  get displayPosition() {
    return this.getAttribute('display-position');
  }

  set displayPosition(value) {
    this.setAttribute('display-position', value);
  }

  set onClick(value) {
    this.button.addEventListener('click', () => {
      value();
    });
  }

  connectedCallback() {
    switch (this.displayPosition) {
      case 'center':
        this.container.style.marginLeft = 'auto';
        this.container.style.marginRight = 'auto';
        break;
      case 'right':
        this.container.style.marginLeft = 'auto';
        this.container.style.marginRight = '0';
        break;
      default:
        this.container.style.marginRight = 'auto';
        this.container.style.marginLeft = '0';
        break;
    }
  }
 
  attributeChangedCallback(name, old, newval) {
    console.log(name, old, newval)
    this.render();
  }
 
  render() {
    this.button.innerHTML = this.label;
    this.button.style.backgroundColor = this.backgroundColor;
  }
}
 
window.customElements.define('custom-button', CustomButton);
