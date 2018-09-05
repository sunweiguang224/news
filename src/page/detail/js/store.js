import ajax from 'ajax';
import runtime from 'runtime';
import Vue from 'vue';

export default {
  namespaced: true,
  state () {
    return {
      news: null,
    };
  },
  mutations: {
    setNews (state, data) {
      state.news = data;
    },
  },
  getters: {
  },
  actions: {
    /**
     * 获取新闻详情
     * @param context
     * @param req
     * @param res
     * @param id
     * @return {Promise.<void>}
     */
    async getNews (context, {req, res, id} = {}) {

      let news = await ajax.send({
        type: 'get',
        url: `/api/queryNewsDetail`,
        dataType: 'json',
        // data: {
        //   category: context.state.category,
        // },
        params: {
          id,
        },
      }, {req, res});

      // console.log(news)

      context.commit('setNews', news);
    },
  },
};
