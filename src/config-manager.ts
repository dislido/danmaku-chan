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
  render: {
    danmaku: {
      uname: {
        
      };
      danmaku: {
        
      };
    };
  };
}