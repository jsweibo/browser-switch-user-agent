const DEFAULT_SETTINGS = {
  status: false,
  rules: ['.*'],
  excludeRules: [],
  userAgentRules: [
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
  ],
  index: 0,
};
