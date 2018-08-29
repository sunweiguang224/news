/**
 * @module dvd-base-js-number
 * @author swg [源码地址](http://gitlab.rd.vyohui.com/FE-Base/dvd-base-js-number.git)
 */
export default {
  /**
   * 数字前面加0，不满足位数前置0
   * @param value {int} 数字
   * @param digit {int} 总位数，不满足补0
   */
  preZero(value, digit) {
    value = (value || value === 0) ? value.toString() : '';
    digit = digit || value.length;
    let zeroNum = digit - value.length;
    for (let i = 0; i < zeroNum; i++) {
      value = '0' + value;
    }
    return value;
  },
}
