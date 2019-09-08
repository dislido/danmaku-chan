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

function configEl(name: string, type: keyof typeof configTypeMap, attr: any = {}, onChange?: (ev: CustomEvent) => void) {
  const el = document.createElement('div');
  el.textContent = name;
  const inputEl = document.createElement(configTypeMap[type]);
  for (const key in attr) {
    inputEl.setAttribute(key, attr[key]);
  }
  el.appendChild(inputEl);
  if(onChange) {
    inputEl.addEventListener('change', (ev: CustomEvent) => {
    onChange(ev);
    configManager.save();
    ipcRenderer.send('updateStyleVars');
  });
  }
  return el;
}

window.onload = function () {
  const styleCfgH = document.createElement('h2');
  styleCfgH.textContent = '配置';
  body.appendChild(styleCfgH);
  body.appendChild(configEl('文字颜色', 'color', { value: style['#list'].color }, (ev) => {
    style['#list'].color = ev.detail.value;
  }));
  body.appendChild(configEl('文字描边颜色', 'color', { value: style['#list']['text-stroke-color'] }, (ev) => {
    style['#list']['text-stroke-color'] = ev.detail.value;
  }));
  body.appendChild(configEl('背景颜色', 'color', { value: style['#list']['list-background-color'] }, (ev) => {
    style['#list']['list-background-color'] = ev.detail.value;
  }));
  // body.appendChild(configEl('文字阴影颜色', 'color', { value: style['#list']['list-background-color'] }, (ev) => {
  //   config.render.style['#list']['list-background-color'] = ev.detail.value;
  // }));
  body.appendChild(configEl('文字大小', 'size', { value: style['#list']['font-size'] }, (ev) => {
    style['#list']['font-size'] = ev.detail.value;
  }));
}
