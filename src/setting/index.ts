import { ipcRenderer, remote } from 'electron';
import '../components';
import configManager from './config-manager';

const config = configManager.config;
const style = config.render.style;

const body = document.body;
const configTypeMap = {
  color: 'color-input',
  size: 'size-input',
}

function configEl(name: string, type: keyof typeof configTypeMap, value: string, onChange: (ev: CustomEvent) => void, attr?: any) {
  const el = document.createElement('section');

  const cfgTitle = document.createElement('div');
  cfgTitle.textContent = name;

  const text = document.createElement('input');
  text.value = value;
  cfgTitle.appendChild(text);

  const inputEl = document.createElement(configTypeMap[type]);
  inputEl.setAttribute('value', value);

  el.appendChild(cfgTitle);
  el.appendChild(inputEl);

  if (attr) {
    for (const name in attr) {
      inputEl.setAttribute(name, attr[name]);
    }
  }

  text.addEventListener('blur', () => {
    inputEl.setAttribute('value', text.value);
  });
  inputEl.addEventListener('change', (ev: CustomEvent) => {
    text.value = ev.detail.value;
    onChange(ev);
    configManager.save();
    ipcRenderer.send('updateStyleVars');
  });
  return el;
}

window.onload = function () {
  const styleCfgH = document.createElement('h2');
  styleCfgH.textContent = '配置';
  body.appendChild(styleCfgH);
  body.appendChild(configEl('文字颜色', 'color', style['#list'].color, (ev) => {
    style['#list'].color = ev.detail.value;
  }));
  body.appendChild(configEl('文字描边颜色', 'color', style['#list']['text-stroke-color'], (ev) => {
    style['#list']['text-stroke-color'] = ev.detail.value;
  }));
  body.appendChild(configEl('背景颜色', 'color', style['#list']['list-background-color'], (ev) => {
    style['#list']['list-background-color'] = ev.detail.value;
  }));
  // body.appendChild(configEl('文字阴影颜色', 'color', style['#list']['list-background-color'], (ev) => {
  //   config.render.style['#list']['list-background-color'] = ev.detail.value;
  // }));
  body.appendChild(configEl('文字大小', 'size', style['#list']['font-size'], (ev) => {
    style['#list']['font-size'] = ev.detail.value;
  }));
}
