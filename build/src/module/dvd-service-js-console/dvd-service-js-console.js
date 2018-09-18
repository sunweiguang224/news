import date from '../dvd-base-js-date/dvd-base-js-date';

function getTime() {
  return date.format(new Date(), 'yyyy-MM-dd hh:mm:ss:SSS');
}

/**
 * 获取log前缀（前缀包括时间、日志类型、用户信息等）
 * @param type
 * @returns {string}
 */
function getPrefix(type, {req} = {}) {
  // console.log(req)
  if (req && !req.logPrefix) {
    req.logPrefix = `[${req.method}] [${req.protocol}://${req.headers.host}${req.url}] [force_domain=${req.cookies.force_domain || ''}] [dvdsid=${req.cookies.dvdsid || ''}] [UA=${req.headers['user-agent'] || ''}]`;
  }
  return `[${getTime()}] [${type}]${req && req.logPrefix ? ' ' + req.logPrefix : ''} => `;
}

/**
 * @module dvd-service-js-console
 * @author sunweiguang [源码地址](http://gitlab.rd.vyohui.com/FE-Service/dvd-service-js-console.git)
 */
export default {
  /**
   * 打印日志
   * @param text {String|Object}  日志
   */
  log(text, {req} = {}) {
    console.log();
    console.log(getPrefix('log', {req}), text);
  },

  /**
   * 打印错误
   * @param text {String|Object}  错误
   */
  error(text, {req} = {}) {
    console.error();
    console.error(getPrefix('error', {req}), text);
  },

  /**
   * 打印信息
   * @param text {String|Object}  信息
   */
  info(text, {req} = {}) {
    console.info();
    console.info(getPrefix(), {req}, text);
  },
};
