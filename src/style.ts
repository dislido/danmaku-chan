import ConfigManager from './setting/config-manager';

const styleEl = document.createElement('style');
document.head.appendChild(styleEl);

type cssVarObj = {
  [selector: string]: {
    [v: string]: string;
  };
}
function objToCss(obj: cssVarObj) {
  let style = '';
  Object.entries(obj).forEach(([selector, vars]) => {
    const vals = Object.entries(vars).map(([key, value]) => {
      return `  --${key}: ${value};`;
    }).join('\n');
    style += `${selector} {\n${vals}}\n`;
  });
  return style;
}