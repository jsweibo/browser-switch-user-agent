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

        if (res.config.rules.length) {
          rule = res.config.rules[res.config.index];
          chrome.webRequest.onBeforeSendHeaders.addListener(
            onBeforeSendHeaders,
            { urls: ['<all_urls>'] },
            ['blocking', 'requestHeaders']
          );
        }
      }
    }
  });
}

chrome.browserAction.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage();
});

chrome.storage.onChanged.addListener(function () {
  // remove event listener
  chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeaders);

  // restart
  start();
});

// start
start();
