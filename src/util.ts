export function elFactory(tagName: keyof HTMLElementTagNameMap, attr = {}, style = {}) {
  const el = document.createElement(tagName);
  Object.assign(el, attr);
  Object.assign(el.style, style);
  return el;
}

export function deepMerge(obj1: any, obj2: any) {
  for(const key in obj2) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') deepMerge(obj1[key], obj2[key]);
    else obj1[key] = obj2[key];
  }
  return obj1;
}