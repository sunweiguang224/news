import common from '../../../common/js/common/common.js';

export default {
  components: {},
  props: {},
  data () {
    return common.mergeState({
      categoryBarSwiper: null,
      newsListSwiper: null,
      style: {
        titleBarHeight: 40,
        categoryBarHeight: 36,
      },
    });
  },
  computed: {
    // news() {
    //   return this.$route.params.news || {};
    // },
  },
  watch: {},
  beforeRouteEnter (to, from, next) {
    next();
  },
  async beforeLifeInServer ({route, store, req, res}) {
    await store.dispatch('detail/getNews', {req, res, id: route.query.id});
  },
  async beforeLifeInClient ({route, store, req, res}) {
    if (route.params.news) {
      store.commit('detail/setNews', route.params.news);
    } else {
      await store.dispatch('detail/getNews', {req, res, id: route.query.id});
    }

    // 设置新闻内容为标题
    route.meta.title = `天天想看：${store.state.detail.news.title}`;

    // // 设置微信分享内容
    // await weixin.init();
    // weixin.setShareInfo({
    //   title: '新闻详情页',
    // });
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    next();
  },
  beforeDestroy () {
  },
  methods: {
    numToRem (num) {
      return `${num / 100}rem`;
    },
  },
  filters: {},
};
