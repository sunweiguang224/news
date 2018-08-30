import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  create () {
    return new Vuex.Store({
      modules: {
        index: require('./index/js/store.js').default,
        detail: require('./detail/js/store.js').default,
      },
    });
  },
};
