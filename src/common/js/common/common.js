import date from 'date';
import runtime from 'runtime';
import ua from 'ua';
import weixin from '../../../common/js/weixin/weixin.js';

// 利用webpack设置到全局
// import console from 'console';

export default {
  mergeState (state) {
    return Object.assign({}, {
      // 工具模块
      date,
      runtime,
      ua,
      weixin,
    }, state);
  },
};
