const domElement = {
    appendChild: () => domElement,
    setAttribute: () => domElement,
    createElement: () => domElement,
    cloneNode: () => domElement,
    lastChild: {},
    childNodes: {},
    dataset: {},
    style: {},
    fontSize: '',
    0: global,
    className: '',
  },
  mockWindow = {
    setTimeout () {
    },
    getComputedStyle () {
      return domElement;
    },
    navigator: {
      userAgent: '',
    },
    document: {
      createDocumentFragment: () => domElement,
      getElementById: () => domElement,
      getElementsByTagName: () => domElement,
      createElement: () => domElement,
      querySelector: () => domElement,
      querySelectorAll: () => domElement,
      createTextNode: () => domElement,
      documentElement: domElement,
      body: domElement,
      head: domElement,
      implementation: {
        createHTMLDocument () {
          return {
            body: domElement,
          };
        },
      },
      scripts: [],
      cookie: '',
    },
    location: {
      href: '',
      search: '',
    },
    screen: {
      prototype: {},
    },
    Event: {
      prototype: {},
    },
    support: {
      prototype: {},
    },
    Symbol: {
      prototype: {},
    },
    HTMLIFrameElement: class {
    },
    Storage: class {
    },
    Units: {
      prototype: {},
    },
    sessionStorage: {
      getItem: () => null,
      setItem: () => null,
    },
    localStorage: {
      getItem: () => null,
      setItem: () => null,
    },
    jq: {
      fn: {},
    },
  };

export default {
  mock () {
    global.window = mockWindow;

    // 这里会导致gulp无法自动监听，应改掉
    Object.keys(global.window).forEach(i => {
      global[i] = global.window[i];
    });
  },
};
