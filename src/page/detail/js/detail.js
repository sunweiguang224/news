import Swiper from 'swiper';
import runtime from 'runtime';
import date from 'date';
import weixin from '../../../common/js/weixin/weixin.js';

export default {
  async asyncData ({route, store, req, res}) {
    if (route.params.news) {
      store.commit('detail/setNews', route.params.news);
    } else {
      await store.dispatch('detail/getNews', {req, res, id: route.query.id});
    }

    route.meta.title = store.state.detail.news.title;
  },
  components: {},
  props: {},
  data () {
    return {
      window,
      document,
      location,

      // 工具模块
      date,

      // 页面内部状态
    };
  },
  computed: {
    // news() {
    //   return this.$route.params.news || {};
    // },
  },
  watch: {},
  beforeCreate () {
  },
  created () {
  },
  mounted () {
    let ts = this;

    // ts.$route.params.contents
  },

  // 客户端首次进入或每次路由切换时触发
  async enteredInClient() {
    // await weixin.init();

    // weixin.setShareInfo({
    //   title: '新闻详情页',
    // });
  },

  methods: {
    numToRem(num) {
      return num / 100 + 'rem';
    },
  },
  filters: {},
};
