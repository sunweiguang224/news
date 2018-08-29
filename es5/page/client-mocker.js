'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var domElement = {
  appendChild: function appendChild() {
    return domElement;
  },
  setAttribute: function setAttribute() {
    return domElement;
  },
  createElement: function createElement() {
    return domElement;
  },
  cloneNode: function cloneNode() {
    return domElement;
  },
  lastChild: {},
  childNodes: {},
  dataset: {},
  style: {},
  fontSize: '',
  0: global,
  className: ''
},
    mockWindow = {
  setTimeout: function setTimeout() {},
  getComputedStyle: function getComputedStyle() {
    return domElement;
  },

  navigator: {
    userAgent: ''
  },
  document: {
    createDocumentFragment: function createDocumentFragment() {
      return domElement;
    },
    getElementById: function getElementById() {
      return domElement;
    },
    getElementsByTagName: function getElementsByTagName() {
      return domElement;
    },
    createElement: function createElement() {
      return domElement;
    },
    querySelector: function querySelector() {
      return domElement;
    },
    querySelectorAll: function querySelectorAll() {
      return domElement;
    },
    createTextNode: function createTextNode() {
      return domElement;
    },
    documentElement: domElement,
    body: domElement,
    head: domElement,
    implementation: {
      createHTMLDocument: function createHTMLDocument() {
        return {
          body: domElement
        };
      }
    },
    scripts: [],
    cookie: ''
  },
  location: {
    href: '',
    search: ''
  },
  screen: {
    prototype: {}
  },
  Event: {
    prototype: {}
  },
  support: {
    prototype: {}
  },
  Symbol: {
    prototype: {}
  },
  HTMLIFrameElement: function HTMLIFrameElement() {
    _classCallCheck(this, HTMLIFrameElement);
  },
  Storage: function Storage() {
    _classCallCheck(this, Storage);
  },
  Units: {
    prototype: {}
  },
  sessionStorage: {
    getItem: function getItem() {
      return null;
    },
    setItem: function setItem() {
      return null;
    }
  },
  localStorage: {
    getItem: function getItem() {
      return null;
    },
    setItem: function setItem() {
      return null;
    }
  },
  jq: {
    fn: {}
  }
};

exports.default = {
  mock: function mock() {
    global.window = mockWindow;

    // 这里会导致gulp无法自动监听，应改掉
    Object.keys(global.window).forEach(function (i) {
      global[i] = global.window[i];
    });
  }
};