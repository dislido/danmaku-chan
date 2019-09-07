import * as fs from 'fs';
import * as path from 'path';

const data = fs.readFileSync(path.resolve(process.cwd(), 'config.json')).toString();
const config = JSON.parse(data) as Config;

export default {
  config,
  save() {
    fs.writeFileSync('config.json', JSON.stringify(config, undefined, 2));
  }
}

interface Config {
  port: number;
  style: {
    // 全局
    ':root': {
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
}