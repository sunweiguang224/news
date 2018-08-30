import Swiper from 'swiper';
import runtime from 'runtime';
import date from 'date';

export default {
  async asyncData ({store, req, res}) {
    if (runtime.isClient() && store.state.center.response) {
      store.dispatch('index/getNextPage', {req, res});
    } else {
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

    // 初始化分类swiper
    this.categoryBarSwiper = new Swiper(this.$refs.categoryBar, {
      slidesPerView: 'auto',
    });

    // setTimeout(() => {
    // 初始化新闻列表swiper
    this.newsListSwiper = new Swiper(this.$refs.newsListSwiper, {
      initialSlide: this.$store.getters['index/categoryIndex'],
      on: {
        slideChangeTransitionEnd () {
          let category = ts.$store.state.index.categoryList[this.activeIndex];
          ts.changeCategoryTo(category);
        }
      },
    });
    // }, 3000);

    // debugger
  },
  methods: {
    async changeCategoryTo (category) {
      // 更改category
      this.$store.commit('index/setCategory', category);

      // 新闻列表切换到category对应的列表
      this.newsListSwiper.slideTo(this.$store.getters['index/categoryIndex']);

      // category对应的列表如果空的，获取数据，然后更新分页swiper
      if (!this.$store.state.index.newsList[category].length) {
        this.getNextPage();
      }
    },
    async getNextPage ({cb, type} = {}) {
      // return;
      await this.$store.dispatch('index/getNextPage', {
        type,
      });
      this.$refs.newsList[this.$store.getters['index/categoryIndex']].swiper.update();
      if (cb) {
        cb();
      }
    },
  },
  filters: {},
};
