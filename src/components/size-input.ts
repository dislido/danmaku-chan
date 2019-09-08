const createOption = (text: string, value: string = text) => {
  const el = document.createElement('option');
  el.textContent = text;
  el.setAttribute('value', value);
  return el;
}

customElements.define('size-input', class extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }
  
  container: HTMLDivElement;
  sizeInput: HTMLInputElement;
  unitInput: HTMLSelectElement;
  suppotedUnit = ['px', 'em'];
  mounted = false;
  errorValue = false;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const container = this.container = document.createElement('div');
    container.style.display = 'inline-flex';
    shadowRoot.appendChild(container);
    const style = document.createElement('style');
    style.textContent = `
input, select {
  background-color: inherit;
}
input {
  border: darkgray 1px solid;
}`;
    shadowRoot.appendChild(style);

    let value = this.getAttribute('value') || '16px';

    const sizeInput = this.sizeInput = document.createElement('input');
    const unitInput = this.unitInput = document.createElement('select');

    unitInput.appendChild(createOption('px'));
    unitInput.appendChild(createOption('em'));
  
    sizeInput.setAttribute('type', 'number');
    sizeInput.value = `${parseInt(value)}`;
    unitInput.value = /[a-z]*$/.exec(value)![0];

    sizeInput.addEventListener("change", () => {
      this.setErrorValue(false);
      this.dispathChangeEvent();
    });
    unitInput.addEventListener('change', () => {
      this.setErrorValue(false);
      this.dispathChangeEvent();
    });

    container.appendChild(sizeInput);
    container.appendChild(unitInput);
  }
  
  dispathChangeEvent(value = `${this.sizeInput.value}${this.unitInput.value}`) {
    this.dispatchEvent(new CustomEvent('change', { detail: { value } }));
  }

  setErrorValue(isErr: boolean) {
    this.errorValue = isErr;
    if (isErr) this.container.style.backgroundColor = '#aaaaaaaa';
    else this.container.style.backgroundColor = '';
  }

  connectedCallback() {
    this.mounted = true;
  }
  disconnectedCallback() { this.mounted = false; }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    if (name === 'value') {
      const reg = /^([0-9]*\.?(?=\d)[0-9]*)(.*)$/.exec(newValue);
      if (reg && this.suppotedUnit.includes(reg[2])) {
        this.setErrorValue(false);
        this.sizeInput.value = `${parseFloat(reg[1])}`;
        this.unitInput.value = reg[2];
      } else {
        this.setErrorValue(true);
      }
      if (this.mounted) this.dispathChangeEvent(newValue);
    }
  }
});