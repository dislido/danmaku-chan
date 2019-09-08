import * as fs from 'fs';
import * as path from 'path';
import defaultConfig from './default-config';
import { deepMerge } from '../util';

type Config = typeof defaultConfig;

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
