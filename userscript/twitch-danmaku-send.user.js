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
  function parseDanmaku(msg) {
    const data = {
      type: 'danmaku-item',
      uname: msg.querySelector('.chat-author__display-name').innerText,
      danmaku: '',
    }
    const danmakuItems = [...msg.querySelectorAll('[aria-hidden="true"] ~ *')];
    danmakuItems.forEach(it => {
      if (it.classList.contains('text-fragment')) data.danmaku += it.innerText;
      else if (it.classList.contains('chat-line__message--emote-button')) data.danmaku += `::${it.querySelector('img').getAttribute('alt')}::`;
    });
    danmakuList.push(data);
  }

  /** @param {Element} msg */
  function handleMsg(msg) {
    if (msg.classList.contains('chat-line__message')) parseDanmaku(msg);
  }
  let chatlist;
  let curr;
  let lastHandled = null;
  setInterval(() => {
    if (!chatlist) {
      chatlist = document.querySelector('.chat-list__list-container');
      return;
    }
    if (!curr && !chatlist.children[0].classList.contains('scrollable-trigger__wrapper')) {
      curr = chatlist.children[0];
      return;
    }
    while(true) {
      if (curr !== lastHandled) {
        handleMsg(curr);
        lastHandled = curr;
      }
      if (curr.nextElementSibling && !curr.nextElementSibling.classList.contains('scrollable-trigger__wrapper')) curr = curr.nextElementSibling;
      else break;
    }
    if (danmakuList.length > 0) {
      send(danmakuList);
      danmakuList = [];
    }
  }, 500);
})();
/*直播者
<div class="chat-line__message" data-a-target="chat-line-message"><span class="chat-line__timestamp" data-a-target="chat-timestamp" data-test-selector="chat-timestamp">10:46</span><span><img alt="直播者" aria-label="直播者徽章" class="chat-badge" src="https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1" srcset="https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1 1x, https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/2 2x, https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3 4x"></span><span class="chat-line__username" role="button" tabindex="0"><span><span class="chat-author__display-name" data-a-target="chat-message-username" data-a-user="wuyikoei" data-test-selector="message-username" style="color: rgb(51, 115, 117);">wuyikoei</span></span></span><span aria-hidden="true">: </span><span class="text-fragment" data-a-target="chat-message-text">草，boss是黑百合么，我怀疑我要被爆甲开盾撞死</span></div>
*/