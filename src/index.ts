import { ipcRenderer, remote } from 'electron';
import ConfigManager from './setting/config-manager';
import Server from './server';
import biliRender from "./render/render-bili";
import twitchRender from "./render/render-twitch";

const listEl = document.getElementById('list')!;
const htmlEl = document.documentElement;
const limit = 50;

htmlEl.addEventListener('keydown', (ev) => {
  if (ev.key === 'F12') remote.getCurrentWebContents().openDevTools({ mode: 'detach' });
}); 

ipcRenderer.on('setWndFocus', (event: Electron.IpcRendererEvent, focus: boolean) => {
  console.log(focus);
  htmlEl.className = focus ? 'setting' : '';
})

function limitDanmaku() {
  if (listEl.childElementCount <= limit) return;
  for (let i = 0; i < listEl.childElementCount - limit; ++i) {
    listEl.children[i].remove();
  }
}
function appendDanmaku(el: Element | null, site: string) {
  if (el) {
    el.setAttribute('data-site', site)
    listEl.append(el);
  };
}

function render(data: Danmaku[]) {
  data.forEach(it => {
    if (it.site === 'bilibili') appendDanmaku(biliRender(it as BiliDanmaku), it.site);
    if (it.site === 'twitch') appendDanmaku(twitchRender(it as TwitchDanmaku), it.site);
  });
  limitDanmaku();
  listEl.scrollTop = listEl.scrollHeight;
}

const server = new Server(ConfigManager.config.port);
server.listen(render);

document.getElementById('setting-icon')!.addEventListener('click', () => {
  ipcRenderer.send('openSetting');
});