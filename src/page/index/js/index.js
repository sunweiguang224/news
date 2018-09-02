import Swiper from 'swiper';
import runtime from 'runtime';
import date from 'date';
import ua from 'ua';
// import console from 'console';


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

      // 样式
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
          let category = ts.$store.state.index.categoryList[this.activeIndex];
          ts.changeCategoryTo(category);
        }
      },
    });
  },
  methods: {
    async changeCategoryTo (category) {
      // 更改category
      this.$store.commit('index/setCategory', category);

      // // 新闻列表切换到category对应的列表
      // this.newsListSwiper.slideTo(this.$store.getters['index/categoryIndex']);

      // category对应的列表如果空的，获取数据，然后更新分页swiper
      if (!this.$store.state.index.newsList[category].list.length) {
        this.getNextPage();
      }
    },
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
