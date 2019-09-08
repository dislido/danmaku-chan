// ==UserScript==
// @name         bilibili-danmaku-send
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://live.bilibili.com/*
// @grant        none
// ==/UserScript==
(function() {
  'use strict';
  function send(data) {
    data.forEach(it => it.site = 'bilibili');
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
  function parseGuardBuy(msg) {
    const data = {
      type: 'guard-buy',
      uname: msg.querySelector('.username').innerText,
      count: parseInt(msg.querySelector('.count').innerText.slice(1)),
    };
    const guardIcon = msg.querySelector('.guard-icon');
    data.level = +[...guardIcon.classList].find(it => /level-\d/.test(it)).slice(6);
    danmakuList.push(data);
  }
  /** @param {Element} msg */
  function parseGift(msg) {
    const data = {
      type: 'gift-item',
      uname: msg.querySelector('.username').innerText,
      giftName: msg.querySelector('.gift-name').innerText,
    };
    const giftCount = msg.querySelector('.gift-count').innerText
    if (giftCount) {
      data.giftCount = parseInt(giftCount);
    }
    danmakuList.push(data);
  }
  
  /** @param {Element} msg */
  function parseDanmaku(msg) {
    const data = {
      type: 'danmaku-item',
      uname: msg.getAttribute('data-uname'),
      danmaku: msg.getAttribute('data-danmaku'),
    }
    const fansMedal = msg.querySelector('.fans-medal-item');
    if (fansMedal) {
      data.fansMedal = {
        label: fansMedal.getElementsByClassName('label')[0].innerText,
        owner: fansMedal.getElementsByClassName('content')[0].innerText.slice(5),
        level: +fansMedal.getElementsByClassName('level')[0].innerText,
      }
    }
    const guardIcon = msg.querySelector('i.guard-icon');
    if (guardIcon) {
      data.guardLV = +[...guardIcon.classList].find(it => /guard-level-\d/.test(it)).slice(12);
    }
    if (msg.querySelector('.admin-icon')) {
      data.isAdmin = true;
    }
    danmakuList.push(data);
  }

  /** @param {Element} msg */
  function handleMsg(msg) {
    if (msg.classList.contains('danmaku-item')) parseDanmaku(msg);
    else if (msg.classList.contains('gift-item')) parseGift(msg);
    else if (msg.classList.contains('guard-buy')) parseGuardBuy(msg);
  }

  let chatlist;
  let curr;
  let lastHandled = null;
  setInterval(() => {
    if (!chatlist) {
      chatlist = document.getElementById('chat-history-list');
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
