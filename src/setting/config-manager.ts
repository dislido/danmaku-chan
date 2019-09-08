import * as fs from 'fs';
import * as path from 'path';
import defaultConfig from './default-config';
import { deepMerge } from '../util';

const configFilePath = path.resolve(process.cwd(), 'config.json');
if (!fs.existsSync(configFilePath)) fs.writeFileSync(configFilePath, '{}');
const data = fs.readFileSync(configFilePath).toString();
const config = deepMerge(defaultConfig, JSON.parse(data)) as Config;
localStorage.setItem('config', JSON.stringify(config));

export default {
  config,
  save() {
    localStorage.setItem('config', JSON.stringify(config));
    fs.writeFileSync('config.json', JSON.stringify(config, undefined, 2));
  }
}

interface Config {
  port: number;
  render: {
    style: {
      // 全局
      '#list': {
        'font-size': string;
        'color': string;
        'text-stroke-color': string;
        'text-stroke-width': string;
        'font-weight': string;
        'list-background': string;
      };
      // 一般弹幕
      '.danmaku-msg': {
        // 用户名颜色
        'uname-color': string;
        // 弹幕颜色
        'danmaku-color': string;
      };
      // 礼物/会员等支付弹幕提醒
      '.danmaku-paid': {
        
      };
    };
  };
}