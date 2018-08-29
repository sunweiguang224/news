import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  create () {
    return new Vuex.Store({
      modules: {
        // center: require('./index/js/store.js').default,
      },
    });
  },
};
