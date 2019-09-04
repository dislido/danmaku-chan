
type DanmakuType = 'danmaku-item' | 'gift-item' | 'guard-buy';
type SiteName = 'bilibili' | 'twitch';
interface Danmaku {
  site: SiteName;
  type: DanmakuType;
}

interface BiliDanmaku extends Danmaku {
  site: 'bilibili';
}

interface BiliGuardBuy extends BiliDanmaku {
  type: 'guard-buy';
  uname: string;
  count: number;
  level: 1 | 2 | 3;
}

interface BiliDanmakuItem extends BiliDanmaku {
  type: 'danmaku-item';
  uname: string;
  danmaku: string;
  fansMedal?: {
    label: string;
    level: number;
    owner: string;
  },
  guardLV?: number;
  isAdmin?: boolean;
}

interface BiliGiftItem extends BiliDanmaku {
  type: 'gift-item',
  uname: string,
  giftName: string,
  giftCount?: number,
}

interface TwitchDanmaku extends Danmaku {
  site: 'twitch';
}

interface TwitchDanmakuItem extends TwitchDanmaku {
  type: 'danmaku-item';
  uname: string;
  danmaku: string;
}