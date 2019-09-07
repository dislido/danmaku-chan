import { elFactory } from "../util";

function danmakuRender(it: TwitchDanmakuItem) {
  const item = elFactory('div', {
    className: 'danmaku-item',
  });
  const name = elFactory('span', {
    innerText: it.uname,
    className: 'name',
  });
  const msg = elFactory('span', {
    innerText: it.danmaku,
    className: 'msg',
  });
  item.append(name);
  item.append(msg)
  return item;
}

export default function render(msg: TwitchDanmaku) {
  if (msg.type === 'danmaku-item') return danmakuRender(msg as TwitchDanmakuItem);
  return null;
}