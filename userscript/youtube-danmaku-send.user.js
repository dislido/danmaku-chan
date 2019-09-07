// ==UserScript==
// @name         twitch-danmaku-send
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://twitch.tv/*
// @include      https://www.twitch.tv/*
// @grant        none
// ==/UserScript==
(function() {
  'use strict';
  function send(data) {
    data.forEach(it => { it.site = 'twitch'; });
    fetch(new Request('http://127.0.0.1:4080', {
      method: 'POST',
      body: JSON.stringify(data),
    })).catch(e => {
      if (e.name === 'TypeError') return;
      console.error(e);
    });
  }

  let danmakuList = [];

  /** @param {Element} msg */
  function parseSuperChat(msg) {

  }
  /** @param {Element} msg */
  function parseMember(msg) {

  }
  /** @param {Element} msg */
  function parseDanmaku(msg) {
  }

  /** @param {Element} msg */
  function handleMsg(msg) {
    // if (msg.classList.contains('chat-line__message')) parseDanmaku(msg);
  }

  let chatlist;
  let curr;
  let lastHandled = null;
  setInterval(() => {
    if (!chatlist) {
      // chatlist = document.querySelector('div#items.yt-live-chat-item-list-renderer');
      return;
    }
    if (!curr) {
      curr = chatlist.children[0];
      return;
    }
    while(true) {
      if (curr !== lastHandled) {
        handleMsg(curr);
        lastHandled = curr;
      }
      if (curr.nextElementSibling) curr = curr.nextElementSibling;
      else break;
    }
    if (danmakuList.length > 0) {
      send(danmakuList);
      danmakuList = [];
    }
  }, 500);
})();
/* member
<yt-live-chat-legacy-paid-message-renderer class="style-scope yt-live-chat-item-list-renderer" id="ChwKGkNObkc3Xy1VdC1RQ0ZUZUl3Z0VkSVhNQjNn">
  <div id="card" class="style-scope yt-live-chat-legacy-paid-message-renderer">
    <yt-img-shadow id="author-photo" height="40" width="40" class="style-scope yt-live-chat-legacy-paid-message-renderer no-transition" loaded="" style="background-color: transparent;"><img id="img" class="style-scope yt-img-shadow" alt="" height="40" width="40" src="https://yt3.ggpht.com/-MDJU006Ia6g/AAAAAAAAAAI/AAAAAAAAAAA/j6xYdK1ifTE/s64-c-k-no-mo-rj-c0xffffff/photo.jpg"></yt-img-shadow>
    <div id="content" class="style-scope yt-live-chat-legacy-paid-message-renderer">
      <div id="content-primary-column" class="style-scope yt-live-chat-legacy-paid-message-renderer">
        <div id="author-name" class="style-scope yt-live-chat-legacy-paid-message-renderer">やまかぜ</div>
        <div id="event-text" class="style-scope yt-live-chat-legacy-paid-message-renderer">新会员！</div>
        <div id="detail-text" class="style-scope yt-live-chat-legacy-paid-message-renderer">欢迎やまかぜ！</div>
      </div>
      <div id="timestamp" class="style-scope yt-live-chat-legacy-paid-message-renderer">9:26 PM</div>
    </div>
    <div id="menu" class="style-scope yt-live-chat-legacy-paid-message-renderer">
      <yt-icon-button id="menu-button" class="style-scope yt-live-chat-legacy-paid-message-renderer"><button id="button" class="style-scope yt-icon-button" aria-label="评论操作">
        <yt-icon icon="more_vert" class="style-scope yt-live-chat-legacy-paid-message-renderer"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" class="style-scope yt-icon"></path>
    </g></svg>
  </yt-icon>
        </button></yt-icon-button>
      </div>
    </div>
    <div id="inline-action-button-container" class="style-scope yt-live-chat-legacy-paid-message-renderer" aria-hidden="true">
      <div id="inline-action-buttons" class="style-scope yt-live-chat-legacy-paid-message-renderer"></div>
    </div>
  </yt-live-chat-legacy-paid-message-renderer>
*/
/* superchat
<yt-live-chat-paid-message-renderer class="style-scope yt-live-chat-item-list-renderer" id="ChwKGkNJdm9pTHlWdC1RQ0ZRdWpXQW9kaW5nSGZR" show-only-header="" style="--yt-live-chat-paid-message-primary-color:rgba(255,202,40,1); --yt-live-chat-paid-message-secondary-color:rgba(255,179,0,1); --yt-live-chat-paid-message-header-color:rgba(0,0,0,0.87451); --yt-live-chat-paid-message-author-name-color:rgba(0,0,0,0.541176); --yt-live-chat-paid-message-timestamp-color:rgba(0,0,0,0.501961); --yt-live-chat-paid-message-color:rgba(0,0,0,0.87451);" allow-animations="">
    <div id="card" class="style-scope yt-live-chat-paid-message-renderer">
      <div id="header" class="style-scope yt-live-chat-paid-message-renderer">
        
          <yt-img-shadow id="author-photo" height="40" width="40" class="style-scope yt-live-chat-paid-message-renderer no-transition" loaded="" style="background-color: transparent;"><img id="img" class="style-scope yt-img-shadow" alt="" height="40" width="40" src="https://yt3.ggpht.com/-90JYELxNZeU/AAAAAAAAAAI/AAAAAAAAAAA/WP168IuAstc/s32-c-k-no-mo-rj-c0xffffff/photo.jpg"></yt-img-shadow>
        <dom-if restamp="" class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
        <dom-if class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
        <div id="header-content" class="style-scope yt-live-chat-paid-message-renderer">
          <div id="header-content-primary-column" class="style-scope yt-live-chat-paid-message-renderer">
            <div id="author-name" class="style-scope yt-live-chat-paid-message-renderer">深淵走りゴールデン・ポムトリウスSR</div>
            <div id="purchase-amount-column" class="style-scope yt-live-chat-paid-message-renderer">
              <yt-img-shadow id="currency-img" class="style-scope yt-live-chat-paid-message-renderer no-transition" hidden=""><img id="img" class="style-scope yt-img-shadow" alt=""></yt-img-shadow>
              <div id="purchase-amount" class="style-scope yt-live-chat-paid-message-renderer">JP¥1,000</div>
            </div>
          </div>
          <span id="timestamp" class="style-scope yt-live-chat-paid-message-renderer">9:28 PM</span>
        </div>
        <div id="menu" class="style-scope yt-live-chat-paid-message-renderer">
          <yt-icon-button id="menu-button" class="style-scope yt-live-chat-paid-message-renderer"><button id="button" class="style-scope yt-icon-button" aria-label="评论操作">
            <yt-icon icon="more_vert" class="style-scope yt-live-chat-paid-message-renderer"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" class="style-scope yt-icon"></path>
      </g></svg>
    
    
  </yt-icon>
          </button></yt-icon-button>
        </div>
      </div>
      <div id="content" class="style-scope yt-live-chat-paid-message-renderer">
        <div id="message" dir="auto" class="style-scope yt-live-chat-paid-message-renderer"></div>
        <div id="input-container" class="style-scope yt-live-chat-paid-message-renderer">
          <dom-if class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
        </div>
        <yt-formatted-string id="deleted-state" class="style-scope yt-live-chat-paid-message-renderer"></yt-formatted-string>
        <div id="footer" class="style-scope yt-live-chat-paid-message-renderer"></div>
      </div>
    </div>
    <div id="buy-flow-button" class="style-scope yt-live-chat-paid-message-renderer" hidden=""></div>
    <div id="inline-action-button-container" class="style-scope yt-live-chat-paid-message-renderer" aria-hidden="true">
      <div id="inline-action-buttons" class="style-scope yt-live-chat-paid-message-renderer"></div>
    </div>
  </yt-live-chat-paid-message-renderer>
  */