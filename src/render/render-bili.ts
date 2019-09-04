import { elFactory } from "../util";
function GuardBuyRender(it: BiliGuardBuy) {
  const levelMap = {
    3: '舰长',
    2: '提督',
    1: '总督',
  };
  const item = elFactory('div', {
    className: 'gift-item',
  });
  const name = elFactory('span', {
    innerText: it.uname,
    className: 'gift-uname',
  });
  const giftType = elFactory('span', {
    innerText: levelMap[it.level],
    className: 'guard-name',
  });
  item.append(name);
  item.append(giftType);
  if (it.count > 1) {
    const giftCount = elFactory('span', {
      innerText: it.count,
      className: 'gift-count',
    })
    item.append(giftCount);
  }
  return item;
}

function giftRender(it: BiliGiftItem) {
  const item = elFactory('div', {
    className: 'gift-item',
  });
  const name = elFactory('span', {
    innerText: it.uname,
    className: 'gift-uname',
  });
  const giftType = elFactory('span', {
    innerText: it.giftName,
    className: 'gift-name',
  });
  item.append(name);
  item.append(giftType);
  if (it.giftCount) {
    const giftCount = elFactory('span', {
      innerText: it.giftCount,
      className: 'gift-count',
    })
    item.append(giftCount);
  }
  return item;
}

function danmakuRender(it: BiliDanmakuItem) {
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
  if (it.fansMedal) {
    const fm = elFactory('span', {
      innerText: `${it.fansMedal.label}`,
      className: 'fans-medal',
    });
    fm.setAttribute('data-level', `${it.fansMedal.level}`);
    item.append(fm);
  }
  if (it.guardLV) {
    name.setAttribute('data-guard', `${it.guardLV}`);
  }
  if (it.isAdmin) {
    name.setAttribute('data-admin', 'true');
  }
  item.append(name);
  item.append(msg)
  return item;
}

export default function render(msg: BiliDanmaku) {
  if (msg.type === 'danmaku-item') return danmakuRender(msg as BiliDanmakuItem);
  if (msg.type === 'gift-item') return giftRender(msg as BiliGiftItem);
  if (msg.type === 'guard-buy') return GuardBuyRender(msg as BiliGuardBuy);
  return;
}