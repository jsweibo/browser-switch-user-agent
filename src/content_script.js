let config = null;
const envBackup = {
  appVersion: navigator.appVersion,
  platform: navigator.platform,
  userAgent: navigator.userAgent,
};

function executeScript(details) {
  const temp = document.createElement('script');
  temp.textContent = details.code;
  document.documentElement.insertBefore(
    temp,
    document.documentElement.firstChild
  );
  temp.remove();
}

function run(rule) {
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

function runCheck() {
  if (config.status) {
    let disableFlag = false;

    const excludeRules = config.excludeRules.map(function (item) {
      return new RegExp(item);
    });

    for (let excludeRule of excludeRules) {
      if (excludeRule.test(location.href)) {
        disableFlag = true;
        break;
      }
    }

    if (!disableFlag) {
      const rules = config.rules.map(function (item) {
        return new RegExp(item);
      });

      for (let rule of rules) {
        if (rule.test(location.href)) {
          // inject
          run(config.userAgentRules[config.index]);
          break;
        }
      }
    }
  } else {
    // restore
    run(envBackup);
  }
}

window.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('config', function (res) {
    if ('config' in res) {
      // sync
      config = res.config;
      runCheck();
    }
  });
});

chrome.storage.onChanged.addListener(function (changes) {
  if (changes.config) {
    // sync
    if ('newValue' in changes.config) {
      config = changes.config.newValue;
      runCheck();
    } else {
      config = null;
    }
  }
});
