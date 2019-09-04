customElements.define('color-input', class extends HTMLElement {
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

    let color = this.getAttribute('data-color') || '#000000';
    let alpha = this.getAttribute('data-alpha') || '255';
    const colorInput = document.createElement('input');
    const alphaInput = document.createElement('input');
    const inputContainer = document.createElement('div');

    const update = () => {
      const hexAlpha = parseInt(alphaInput.value).toString(16).padStart(2, '0');
      colorInput.style.opacity = `${parseInt(alpha) / 255}`;
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: `${color}${hexAlpha}`,
        },
      }));
    }

    inputContainer.className = 'color-input-container';
    colorInput.setAttribute('type', 'color');
    colorInput.className = 'color-input';
    colorInput.value = this.getAttribute('data-color') || '#000000';
    alphaInput.setAttribute('type', 'range');
    alphaInput.setAttribute('min', '0');
    alphaInput.setAttribute('max', '255');
    alphaInput.value = `${this.getAttribute('data-alpha') || 255}`;

    colorInput.addEventListener("change", () => {
      color = colorInput.value;
      update();
    });
    alphaInput.addEventListener('change', () => {
      alpha = alphaInput.value;
      update();
    });

    inputContainer.appendChild(colorInput);
    container.appendChild(inputContainer);
    container.appendChild(alphaInput);
    update();
  }
});