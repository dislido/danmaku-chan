customElements.define('size-input', class extends HTMLElement {
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
    style.textContent = ``;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(container);

    let size = this.getAttribute('data-size') || '16';
    let unit = this.getAttribute('data-unit') || 'px';
    const sizeInput = document.createElement('input');
    const unitInput = document.createElement('select');

    const unitPx = document.createElement('option');
    unitPx.textContent = 'px';
    unitPx.setAttribute('value', 'px');
    unitInput.appendChild(unitPx);
    const unitEm = document.createElement('option');
    unitEm.textContent = 'em';
    unitEm.setAttribute('value', 'em');
    unitInput.appendChild(unitEm);
  
    const update = () => {
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: `${size}${unit}`,
        },
      }));
    }

    sizeInput.setAttribute('type', 'number');
    sizeInput.value = size;
    unitInput.value = unit;

    sizeInput.addEventListener("change", () => {
      size = sizeInput.value;
      update();
    });
    unitInput.addEventListener('change', () => {
      unit = unitInput.value;
      update();
    });

    container.appendChild(sizeInput);
    container.appendChild(unitInput);
    update();
  }
  
  dispathChangeEvent() {
    const hexAlpha = parseInt(this.alphaInput.value).toString(16).padStart(2, '0');
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: `${this.colorInput.value}${hexAlpha}`,
      },
    }));
  }

  connectedCallback() { this.mounted = true; }
  disconnectedCallback() { this.mounted = false; }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    if (name === 'value') {
      this.colorInput.value = newValue.substring(0,7);
      this.alphaInput.value = `${parseInt(newValue.substring(7, 9), 16)}`;
      this.colorInput.style.opacity = `${parseInt(this.alphaInput.value) / 255}`;
      this.opacityText.textContent = `opacity: ${this.alphaInput.value}/255`;
      if (this.mounted) this.dispathChangeEvent();
    }
  }
});