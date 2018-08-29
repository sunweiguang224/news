/**
 * @module dvd-base-js-runtime
 * @author sunweiguang [源码地址](http://gitlab.rd.vyohui.com/FE-Base/dvd-base-js-runtime.git)
 */
export default {
  /**
   * 是否是server端（server端包括NodeJS）
   * @returns {Boolean}
   */
  isServer() {
    return typeof global !== 'undefined' && typeof global.process !== 'undefined';
  },
  /**
   * 是否是client端（client端包括浏览器、微信、app）
   * @returns {Boolean}
   */
  isClient() {
    return !this.isServer();
  },
  /**
   * 当前程序是否在Linux服务器上运行
   * @returns {Boolean}
   */
  isLinux() {
    return typeof global !== 'undefined' && global.process && global.process.platform === 'linux';
  },
};
