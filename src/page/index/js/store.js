import ajax from 'ajax';
import runtime from 'runtime';

export default {
  namespaced: true,
  state () {
    return {
      categoryList: [
        '推荐',
        '娱乐',
        '生活',
        '体育',
        '军事',
        '科技',
        '互联网',
        '国际',
        '国内',
        '人文',
        '汽车',
        '财经',
        '房产',
        '时尚',
      ],
      category: '推荐',
      response: null,
    };
  },
  mutations: {
    setResponse (state, data) {
      state.response = data;
    },
    setCategory (state, data) {
      state.category = data;
    },
  },
  actions: {
    async fetchResponse (context, {req, res} = {}) {
      let response = await ajax.send({
        type: 'get',
        url: `http://${runtime.isServer() ? 'localhost' : location.hostname}:8100/api/queryNewsList`,
        dataType: 'json',
        // data: {
        //   category: context.state.category,
        // },
        params: {
          category: context.state.category,
        },
      }, {req, res});

      // console.log(response.data.feedList);

      // let response = require('../json/center.json');

      context.commit('setResponse', response);

      console.log(response);
    },
  },
};
