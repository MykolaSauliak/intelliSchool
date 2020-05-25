// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({isFlokiActive: false}, function() {
    console.log('Smart Quizzer(Floki) App active');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.youtube.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    console.log(tabId,changeInfo);
    if (changeInfo.status === "complete") {
      chrome.tabs.sendMessage( tabId, {
        message: 'urlChanged',
        url: "changeInfo.status"
      })
    }
  }
);

function jumpToTimeInVideo ( element, jumpToTime ) {
	var video = element.querySelector( 'video' );
	if ( video ) {
        video.currentTime = jumpToTime;
	}
};