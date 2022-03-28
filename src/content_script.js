function executeScript(details) {
  const temp = document.createElement('script');
  temp.textContent = details.code;
  document.documentElement.insertBefore(
    temp,
    document.documentElement.firstChild
  );
  temp.remove();
}

// start
chrome.storage.local.get('config', function (res) {
  if ('config' in res) {
    if (res.config.status) {
      // on

      const rule = res.config.rules[res.config.index];
      executeScript({
        code: `
        (function () {
          Object.defineProperty(Navigator.prototype, 'appVersion', {
            get() {
              return '${rule.appVersion}';
            },
          });

          Object.defineProperty(Navigator.prototype, 'platform', {
            get() {
              return '${rule.platform}';
            },
          });

          Object.defineProperty(Navigator.prototype, 'userAgent', {
            get() {
              return '${rule.userAgent}';
            },
          });
        })();
        `,
      });
    }
  }
});
