import Swiper from 'swiper';
import runtime from 'runtime';
import date from 'date';
import ua from 'ua';
// import console from 'console';
import weixin from '../../../common/js/weixin/weixin.js';

export default {
  async asyncData ({route, store, req, res}) {
    if (!store.state.index.newsList[store.state.index.category].list.length) {
      await store.dispatch('index/getNextPage', {req, res});
    }
  },
  components: {
    'dvd-service-com-paging-list': require('../../../common/com/dvd-service-com-paging-list/dvd-service-com-paging-list.vue').default,
  },
  props: {},
  data () {
    return {
      window,
      document,
      location,

      // 工具模块
      date,

      // 页面内部状态
      categoryBarSwiper: null,
      newsListSwiper: null,
      style: {
        titleBarHeight: 40,
        categoryBarHeight: 36,
      },
    };
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
  },
  mounted () {
    let ts = this;

    // alert(this.$store.state.global.statusBarHeight);

    // alert(navigator.userAgent)

    // 初始化分类swiper
    this.categoryBarSwiper = new Swiper(this.$refs.categoryBar, {
      slidesPerView: 'auto',
    });

    // 初始化新闻列表swiper
    this.newsListSwiper = new Swiper(this.$refs.newsListSwiper, {
      initialSlide: this.$store.getters['index/categoryIndex'],
      on: {
        // 滚动至category对应列表时，更新category-bar和列表数据
        slideChangeTransitionStart () {
          // 获取下一个category
          let category = ts.$store.state.index.categoryList[this.activeIndex];

          // 更改category
          ts.$store.commit('index/setCategory', category);

          // 选中的category居中显示
          ts.categoryBarSwiper.slideTo(this.activeIndex - 3);

          // 获取category对应列表的首屏数据
          if (!ts.$store.state.index.newsList[category].list.length) {
            ts.getNextPage();
          }
        }
      },
    });

    // 预加载的js
    setTimeout(() => {
      // 详情页
      import(/* webpackChunkName: "page/detail/js/detail" */'../../detail/detail.vue');
    }, 1000);
  },

  // 客户端首次进入或每次路由切换时触发
  async enteredInClient() {
    // await weixin.init();

    // weixin.setShareInfo({
    //   title: '首页11',
    // });
  },

  methods: {
    async getNextPage ({cb, type} = {}) {
      await this.$store.dispatch('index/getNextPage', {
        type,
      });
      this.$refs.newsList[this.$store.getters['index/categoryIndex']].swiper.update();
      if (cb) {
        cb();
      }
    },
    numToRem(num) {
      return num / 100 + 'rem';
    },
  },
  filters: {},
};
