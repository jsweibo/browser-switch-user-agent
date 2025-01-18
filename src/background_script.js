let rule = null;

function onBeforeSendHeaders(requestDetails) {
  for (const requestHeader of requestDetails.requestHeaders) {
    if (requestHeader.name.toLowerCase() === 'user-agent') {
      requestHeader.value = rule.userAgent;
    }
  }
  return {
    requestHeaders: requestDetails.requestHeaders,
  };
}

function start() {
  chrome.storage.local.get('config', function (res) {
    if ('config' in res) {
      if (res.config.status) {
        // on

        if (res.config.userAgentRules.length) {
          rule = res.config.userAgentRules[res.config.index];
          chrome.webRequest.onBeforeSendHeaders.addListener(
            onBeforeSendHeaders,
            { urls: ['<all_urls>'] },
            ['blocking', 'requestHeaders']
          );
        }
      }
    } else {
      // writing settings will invoke chrome.storage.onChanged
      chrome.storage.local.set({
        config: DEFAULT_SETTINGS,
      });
    }
  });
}

chrome.browserAction.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage();
});

chrome.storage.onChanged.addListener(function () {
  // clear
  chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeaders);

  // restart
  start();
});

// start
start();
