const cssColor = require('css-color-names');

customElements.define('color-input', class extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }

  colorInput: HTMLInputElement;
  alphaInput: HTMLInputElement;
  opacityText: HTMLElement;
  mounted = false;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    const style = document.createElement('style');
    style.textContent = `
.color-input-container {
  width: 50px;
  height: 50px;
  display: inline-block;
  background: conic-gradient(white 90deg, gray 90deg 180deg, white 180deg 270deg, gray 270deg);
}
.color-input {
  width: 50px;
  height: 50px;
  padding: 0;
  position: absolute;
  border: none;
  background-color: transparent;
}`;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(container);

    let value = this.getAttribute('value') || '#000000ff';
    if (cssColor[value]) value = `${cssColor[value]}ff`;
    
    this.colorInput = document.createElement('input');
    this.colorInput.setAttribute('type', 'color');
    this.colorInput.className = 'color-input';
    this.colorInput.value = value.substring(0,7);

    const colorInputContainer = document.createElement('div');
    colorInputContainer.className = 'color-input-container';
    colorInputContainer.appendChild(this.colorInput);

    this.alphaInput = document.createElement('input');
    this.alphaInput.setAttribute('type', 'range');
    this.alphaInput.setAttribute('min', '0');
    this.alphaInput.setAttribute('max', '255');
    this.alphaInput.value = `${parseInt(value.substring(7, 9), 16)}`;

    this.opacityText = document.createElement('section');
    this.opacityText.textContent = `opacity: ${this.colorInput.value}/255`;

    const opacityInputContainer = document.createElement('div');
    opacityInputContainer.style.display = 'inline-block';
    opacityInputContainer.appendChild(this.opacityText);
    opacityInputContainer.appendChild(this.alphaInput);

    this.colorInput.addEventListener("change", () => {
      this.dispathChangeEvent();
    });
    this.alphaInput.addEventListener('change', () => {
      this.colorInput.style.opacity = `${parseInt(this.alphaInput.value) / 255}`;
      this.opacityText.textContent = `opacity: ${this.alphaInput.value}/255`;
      this.dispathChangeEvent();
    });
  
    container.appendChild(colorInputContainer);
    container.appendChild(opacityInputContainer);
  }

  dispathChangeEvent() {
    const hexAlpha = parseInt(this.alphaInput.value).toString(16).padStart(2, '0');
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: `${this.colorInput.value}${hexAlpha}`,
      },
    }));
  }

  connectedCallback() {
    this.mounted = true;
  }

  disconnectedCallback() {
    this.mounted = false;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    if (name === 'value') {
      if (cssColor[newValue]) newValue = `${cssColor[newValue]}ff`;
      this.colorInput.value = newValue.substring(0,7);
      this.alphaInput.value = `${parseInt(newValue.substring(7, 9), 16)}`;
      this.colorInput.style.opacity = `${parseInt(this.alphaInput.value) / 255}`;
      this.opacityText.textContent = `opacity: ${this.alphaInput.value}/255`;
      if (this.mounted) this.dispathChangeEvent();
    }
  }
});