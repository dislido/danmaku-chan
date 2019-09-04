export function elFactory(tagName: keyof HTMLElementTagNameMap, attr = {}, style = {}) {
  const el = document.createElement(tagName);
  Object.assign(el, attr);
  Object.assign(el.style, style);
  return el;
}