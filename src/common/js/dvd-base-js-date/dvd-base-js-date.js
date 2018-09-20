import number from '../dvd-base-js-number/dvd-base-js-number';
import type from '../dvd-base-js-type/dvd-base-js-type';

/**
 * @module dvd-base-js-date
 * @author swg [源码地址](http://gitlab.rd.vyohui.com/FE-Base/dvd-base-js-date.git)
 */
export default {
  /**
   * 时间格式化
   * @param date 日期对象|时间戳数字|时间戳字符串
   * @param format 格式化字符串
   * @returns {String}
   * Demo: date.format(new Date(), 'yyyy-MM-dd HH:mm:ss SSS');
   */
  format (date, format) {
    if (!(date instanceof Date)) {
      if (type.isString(date)) {
        date = new Date(parseInt(date));
      } else if (type.isNumber(date)) {
        date = new Date(date);
      } else {
        date = new Date();
      }
    }

    if (!type.isString(format)) {
      format = 'yyyy-MM-dd hh:mm:ss SSS';
    }

    let map = {
      y: date.getFullYear(),
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      S: date.getMilliseconds(),
    };

    for (let key in map) {
      format = format.replace(new RegExp(`${key}+`), (matchValue, index, input) => number.preZero(map[key], matchValue.length));
    }
    return format;
  },
  /**
   * 根据年、月计算本月有多少天
   * @param year 年（默认取当前年）
   * @param month 月份1-12（默认取当前月）
   */
  getDayCount (year, month) {
    year = year || new Date().getFullYear();
    month = month || new Date().getMonth() + 1;

    let days = null;
    if (month === 4 || month === 6 || month === 9 || month === 11) {
      days = 30;
    } else if (month === 2) {
      days = 28;
      // 闰年
      if (year % 4 === 0) {
        days += 1;
      }
    } else {
      days = 31;
    }

    return days;
  },
  /**
   * 获取时间长度
   * @param param.targetDate {Date} 目标时刻Date变量（可用于：获取距离目标时刻的天、小时、分钟、秒。与其他参数互斥）
   * @param param.targetTimestamp {Number} 目标时刻时间戳（可用于：获取距离目标时刻的天、小时、分钟、秒。与其他参数互斥）
   * @param param.second {Number} 秒（可用于：将传入的秒转换成天、小时、分钟、秒。与targetDate、targetTimestamp互斥）
   * @param param.minute {Number} 秒（可用于：将传入的分转换成天、小时、分钟、秒。与targetDate、targetTimestamp互斥）
   * @param param.hour {Number} 秒（可用于：将传入的小时转换成天、小时、分钟、秒。与targetDate、targetTimestamp互斥）
   * @param param.day {Number} 秒（可用于：将传入的天转换成天、小时、分钟、秒。与targetDate、targetTimestamp互斥）
   * @param param.digit {Number} 位数，用于格式化，如果19:1格式化成19:01
   * @returns {{second: Number, minute: Number, hour: Number, day: Number}}
   */
  getTimeDuration (param = {}) {
    // 默认值
    param.second = param.second || 0;
    param.minute = param.minute || 0;
    param.hour = param.hour || 0;
    param.day = param.day || 0;

    // 时间单位对应的毫秒数
    let second = 1000;
    let minute = 60000;
    let hour = 3600000;
    let day = 86400000;

    // 长度，毫秒
    let distance = 0;
    if (param.targetDate) {
      distance = param.targetDate - new Date();
    } else if (param.targetTimestamp) {
      distance = new Date(param.targetTimestamp) - new Date();
    } else {
      distance = param.second * second + param.minute * minute + param.hour * hour + param.day * day;
    }

    let result = {
      second: parseInt(distance % minute / second),
      minute: parseInt(distance % hour / minute),
      hour: parseInt(distance % day / hour),
      day: parseInt(distance / day),
    };

    // 返回时间长度
    return {
      second: param.digit ? number.preZero(result.second, param.digit) : result.second,
      minute: param.digit ? number.preZero(result.minute, param.digit) : result.minute,
      hour: param.digit ? number.preZero(result.hour, param.digit) : result.hour,
      day: param.digit ? number.preZero(result.day, param.digit) : result.day,
    };
  },
};

