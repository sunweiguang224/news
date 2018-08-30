import Swiper from 'swiper';

export default {
  props: {
    // 获取下一页方法
    getData: {
      type: Function,
      default: null
    },
    // 列表高度，需要显式指定
    listHeight: {
      type: String,
      default: '100%'
    },
    // 列表中的当前item数量
    listLength: {
      type: Number,
      default: 0
    },
    // 是否立即加载首屏数据
    isLoadFirstPage: {
      type: Boolean,
      default: false
    },
    // 没有列表项时的提示图片
    noneImg: {
      type: String,
      default: require('./img/none.png')
    },
    // 没有列表项时的提示信息
    noneTip: {
      type: String,
      default: '还没有红包哟~'
    },
  },
  data() {
    return {
      // 全局变量
      window,
      document,
      location,

      // swiper实例
      swiper: null,

      // 页码（从1开始）
      pageNo: 0,

      // 是否正在加载
      isLoading: false,

      // 是否已全部加载
      isOver: false,

      // 是否显示加载更多，超过一屏才显示
      ifShowLoadMore: false,
    }
  },
  computed: {
    // 是否显示加载更多，超过一屏才显示
//      ifShowLoadMore() {
//        return this.listLength > 0 && this.$refs.wripper.clientHeight > this.$el.clientHeight;
//      }
  },
  created() {
  },
  updated() {
  },
  mounted() {
    var ts = this;

    // 加载更多元素实际显示高度
//      let loadMoreHeight = ts.$refs.load_more.clientHeight;
    let loadMoreHeight = 40;


    // 触底加载下一页
    let ifGetData = function () {
      if (!ts.ajaxing && -this.translate + loadMoreHeight > this.virtualSize - this.size) {
        ts.getNextPage();
      }
    };

    // 初始化swiper
    ts.swiper = new Swiper(ts.$el, {
      speed: 500,
      freeMode: true,
      slidesPerView: 'auto',
      direction: 'vertical',
      setWrapperSize: true,
      on: {
        // 非正式反弹回调函数
        momentumBounce: ifGetData,
        // 触摸滑动回调函数
        sliderMove: ifGetData,
      }
    });

    // 是否立即加载第一页数据
    if (ts.isLoadFirstPage) {
      ts.getNextPage();
    }
  },
  // 销毁手动注册的事件和定时器等，单页面应用必须这样做，这是一个好习惯
  beforeDestroy() {
  },
  filters: {},
  watch: {
    // 列表长度变化时重新设置swiper的slides高度
    listLength() {
      this.$nextTick(function () {
        this.swiper.updateSlides();
      })
    },
  },
  methods: {
    // 获取下一页
    getNextPage() {
      debugger
      let ts = this;
      if (ts.isLoading || ts.isOver) return;
      ts.isLoading = true;
      // ajax完成回调
      let cb = function (isOver = false) {
        ts.isLoading = false;
        // 业务代码告诉组件是否全部加载结束，因为
        ts.isOver = isOver;
        // 页码+1
        ts.pageNo++;
        // 是否显示加载更多，超过一屏才显示，延迟一毫秒等待重绘完成
        setTimeout(function () {
          ts.ifShowLoadMore = ts.listLength > 0 && ts.$refs.wripper.clientHeight > ts.$el.clientHeight;
          ts.$nextTick(function () {
            ts.swiper.updateSlides();
          })
        }, 1);
      };
      ts.getData(cb);
    }
  },
}
