import ajax from 'dvd-service-js-ajax';

export default {
  namespaced: true,
  state () {
    return {
      response: null,
    };
  },
  mutations: {
    setResponse (state, data) {
      state.response = data;
    },
  },
  actions: {
    async fetchResponse (context, {req, res}) {
      let response = await ajax.send({
        type: 'post',
        url: '/api/mg/user/center/newIndex',
        dataType: 'json',
        data: {},
      }, {req, res, debug: false});


      // console.log(response.data.feedList);

      // let response = require('../json/center.json');

      context.commit('setResponse', response);
    },
  },
};
