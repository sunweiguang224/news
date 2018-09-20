/**
 * @module dvd-base-js-number
 * @author swg [源码地址](http://gitlab.rd.vyohui.com/FE-Base/dvd-base-js-number.git)
 */
export default {
  /**
   * 数字前面加0，不满足位数前置0
   * @param value {int} 值
   * @param digit {int} 总位数，不满足补0
   * @return {String}
   */
  preZero (value, digit = 0) {
    let valueLength = value.toString().length;
    if (digit <= valueLength) {
      return value.toString();
    }

    let zeroNum = digit - valueLength;
    let zeroArr = [];
    for (let i = 0; i < zeroNum; i++) {
      zeroArr.push(0);
    }
    return `${zeroArr.join('')}${value}`;
  },
};
