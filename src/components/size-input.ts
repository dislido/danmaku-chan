customElements.define('size-input', class extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }
  
  sizeInput: HTMLInputElement;
  unitInput: HTMLSelectElement;
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

    let value = this.getAttribute('value') || '16px';

    const sizeInput = this.sizeInput = document.createElement('input');
    const unitInput = this.unitInput = document.createElement('select');

    const createOption = (text: string, value: string = text) => {
      const el = document.createElement('option');
      el.textContent = text;
      el.setAttribute('value', value);
      return el;
    }
    unitInput.appendChild(createOption('px'));
    unitInput.appendChild(createOption('em'));
    unitInput.appendChild(createOption(''));
  
    sizeInput.setAttribute('type', 'number');
    sizeInput.value = `${parseInt(value)}`;
    unitInput.value = /[a-z]*$/.exec(value)![0];

    sizeInput.addEventListener("change", () => {
      this.dispathChangeEvent();
    });
    unitInput.addEventListener('change', () => {
      this.dispathChangeEvent();
    });

    container.appendChild(sizeInput);
    container.appendChild(unitInput);
  }
  
  dispathChangeEvent() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: `${this.sizeInput.value}${this.unitInput.value}`,
      },
    }));
  }

  connectedCallback() { this.mounted = true; }
  disconnectedCallback() { this.mounted = false; }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    if (name === 'value') {
      this.sizeInput.value = `${parseInt(newValue)}`;
      this.unitInput.value = /[a-z]*$/.exec(newValue)![0];
      if (this.mounted) this.dispathChangeEvent();
    }
  }
});