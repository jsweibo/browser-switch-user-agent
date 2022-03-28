const RECOMMENDED_CONFIG = {
  status: true,
  rules: [
    {
      name: 'Windows 10; Internet Explorer/11.0',
      appVersion:
        '5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
      platform: 'Win32',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
    },
    {
      name: 'Windows 10; Edge/18.19041',
      appVersion:
        '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19041',
      platform: 'Win32',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19041',
    },
    {
      name: 'Windows 10; Edg/92.0.902.78',
      appVersion:
        '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.78',
      platform: 'Win32',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.78',
    },
    {
      name: 'Windows 10; Firefox/91.0.2',
      appVersion: '5.0 (Windows)',
      platform: 'Win32',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
    },
    {
      name: 'Windows 10; Chrome/92.0.4515.159',
      appVersion:
        '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
      platform: 'Win32',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    },
    {
      name: 'Android 10; org.mozilla.firefox/91.3.1',
      appVersion: '5.0 (Android 10; Mobile; rv:91.0) Gecko/91.0 Firefox/91.0',
      platform: 'Linux aarch64',
      userAgent:
        'Mozilla/5.0 (Android 10; Mobile; rv:91.0) Gecko/91.0 Firefox/91.0',
    },
    {
      name: 'Android 10; com.microsoft.emmx/45.09.4.5079',
      appVersion:
        '5.0 (Linux; Android 10; Redmi Note 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.116 Mobile Safari/537.36 EdgA/45.09.4.5079',
      platform: 'Linux aarch64',
      userAgent:
        'Mozilla/5.0 (Linux; Android 10; Redmi Note 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.116 Mobile Safari/537.36 EdgA/45.09.4.5079',
    },
    {
      name: 'Android 10; com.kiwibrowser.browser/93.0.4577.52',
      appVersion:
        '5.0 (Linux; Android 10; Redmi Note 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.52 Mobile Safari/537.36',
      platform: 'Linux aarch64',
      userAgent:
        'Mozilla/5.0 (Linux; Android 10; Redmi Note 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.52 Mobile Safari/537.36',
    },
    {
      name: 'Android 10; com.baidu.searchcraft/3.9.1',
      appVersion:
        '5.0 (Linux; Android 10; Redmi Note 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.52 Mobile Safari/537.36 T7/12.16 SearchCraft/3.9.1 (Baidu; P1 10)',
      platform: 'Linux aarch64',
      userAgent:
        'Mozilla/5.0 (Linux; Android 10; Redmi Note 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.52 Mobile Safari/537.36 T7/12.16 SearchCraft/3.9.1 (Baidu; P1 10)',
    },
    {
      name: 'Android 10; com.tencent.mm/8.0.9',
      appVersion:
        '5.0 (Linux; Android 10; Redmi Note 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.52 Mobile Safari/537.36 MicroMessenger/8.0.7.1920(0x28000753) WeChat/arm64 Weixin',
      platform: 'Linux aarch64',
      userAgent:
        'Mozilla/5.0 (Linux; Android 10; Redmi Note 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.52 Mobile Safari/537.36 MicroMessenger/8.0.7.1920(0x28000753) WeChat/arm64 Weixin',
    },
  ],
  index: 0,
};

const configForm = document.querySelector('#config');
const statusInput = document.querySelector('#status');
const rulesInput = document.querySelector('#rules');
const indexSelect = document.querySelector('#index');
const hintField = document.querySelector('.hint-field');
const hintText = document.querySelector('.hint-field .hint');
let needSave = false;

function notify({ type = '', message = '' }) {
  if (hintField.classList.length === 1) {
    hintText.textContent = message;
    if (type === 'success') {
      hintText.classList.add('hint_success');
      hintField.classList.add('hint-field_visible');
      setTimeout(function () {
        hintField.classList.remove('hint-field_visible');
        hintText.classList.remove('hint_success');
      }, 1e3);
    } else {
      hintText.classList.add('hint_error');
      hintField.classList.add('hint-field_visible');
      setTimeout(function () {
        hintField.classList.remove('hint-field_visible');
        hintText.classList.remove('hint_error');
      }, 1e3);
    }
  }
}

function writeSelectOption(rules) {
  // strcat html
  let output = '';
  rules.forEach(function (item, index) {
    output += `<option value="${index}">${item.name}</option>`;
  });
  indexSelect.innerHTML = output;
}

rulesInput.addEventListener('change', function () {
  try {
    // check rules
    const rules = JSON.parse(rulesInput.value);
    if (!Array.isArray(rules)) {
      notify({
        type: 'error',
        message: 'Invalid Rules',
      });
      return false;
    }
    writeSelectOption(rules);
    indexSelect.value = '';
  } catch (error) {
    writeSelectOption([]);
    indexSelect.value = '';
    notify({
      type: 'error',
      message: 'Error Rules',
    });
    return false;
  }
});

configForm.addEventListener('change', function () {
  needSave = true;
});

configForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let savedConfig = {
    status: statusInput.checked,
    rules: [],
    index: 0,
  };

  if (rulesInput.value) {
    // check rules syntax
    try {
      const rules = JSON.parse(rulesInput.value);
      if (!Array.isArray(rules)) {
        notify({
          type: 'error',
          message: 'Invalid Rules',
        });
        return false;
      }
      rulesInput.value = JSON.stringify(rules, null, 2);
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error Rules',
      });
      return false;
    }
    // pass check
    savedConfig.rules = JSON.parse(rulesInput.value);
  }

  if (indexSelect.value) {
    // check index
    try {
      const index = Number.parseInt(indexSelect.value, 10);
      if (index < 0) {
        notify({
          type: 'error',
          message: 'Invalid Index',
        });
        return false;
      }
      if (index > savedConfig.rules.length - 1) {
        notify({
          type: 'error',
          message: 'Invalid Index',
        });
        return false;
      }
      indexSelect.value = index;
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error Rules',
      });
      return false;
    }
    // pass check
    savedConfig.index = Number.parseInt(indexSelect.value, 10);
  }

  // save options
  chrome.storage.local.set(
    {
      config: savedConfig,
    },
    function () {
      notify({
        type: 'success',
        message: 'Saved',
      });
      needSave = false;
    }
  );
});

document.querySelector('#get-advice').addEventListener('click', function () {
  needSave = true;
  statusInput.checked = RECOMMENDED_CONFIG.status;
  rulesInput.value = JSON.stringify(RECOMMENDED_CONFIG.rules, null, 2);
  writeSelectOption(RECOMMENDED_CONFIG.rules);
  indexSelect.value = RECOMMENDED_CONFIG.index;
});

window.addEventListener('beforeunload', function (event) {
  if (needSave) {
    event.preventDefault();
    event.returnValue = '';
  }
});

// start
chrome.storage.local.get('config', function (res) {
  if ('config' in res) {
    statusInput.checked = res.config.status;
    rulesInput.value = JSON.stringify(res.config.rules, null, 2);
    writeSelectOption(res.config.rules);
    indexSelect.value = res.config.index;
  }
});
