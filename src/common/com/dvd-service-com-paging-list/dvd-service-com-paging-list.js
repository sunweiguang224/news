import Swiper from 'swiper';
import runtime from 'runtime';

export default {
  props: {
    // 获取下一页方法
    getData: {
      type: Function,
      default: null,
    },
    // 列表高度，需要显式指定
    listHeight: {
      type: String,
      default: '100%',
    },
    // 列表中的当前item数量
    listLength: {
      type: Number,
      default: 0,
    },
    // 是否立即加载首屏数据
    isLoadFirstPage: {
      type: Boolean,
      default: false,
    },
    // 没有列表项时的提示图片
    noneImg: {
      type: String,
      default: require('./img/none.png'),
    },
    // 没有列表项时的提示信息
    noneTip: {
      type: String,
      default: '还没有红包哟~',
    },
  },
  data () {
    return {
      // 全局变量
      window: runtime.isClient() && window,
      document: runtime.isClient() && document,
      location: runtime.isClient() && location,

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

      // 时间间隔，不允许频繁触发下一页
      isInMinInterver: false,

      // 停止滚动定时器
      stopScrollingTimeout: null,
    };
  },
  computed: {
    // // 是否显示加载更多，超过一屏才显示
    //  ifShowLoadMore() {
    //    return this.listLength > 0 && this.$refs.wripper.clientHeight > this.$el.clientHeight;
    //  }
  },
  created () {
  },
  updated () {
  },
  mounted () {
    let ts = this;

    // 加载更多元素实际显示高度
    // let loadMoreHeight = ts.$refs.load_more.clientHeight;
    let loadMoreHeight = 40;

    // 触底加载下一页
    let ifGetData = function () {
      if (ts.ajaxing || ts.isInMinInterver) {
        return;
      }

      // 上拉加载更多
      if (-ts.swiper.translate + loadMoreHeight > ts.swiper.virtualSize - ts.swiper.size) {
        setTimeout(() => {
          ts.getNextPage();
          ts.isInMinInterver = false;
        }, 1000);
        ts.isInMinInterver = true;

        // 下拉加载更多
      } else if (ts.swiper.translate > loadMoreHeight) {
        setTimeout(() => {
          ts.getNextPage('prepend');
          ts.isInMinInterver = false;
        }, 1000);
        ts.isInMinInterver = true;
      }
    };

    // 初始化swiper
    ts.swiper = new Swiper(ts.$el, {
      speed: 500,
      freeMode: true,
      slidesPerView: 'auto',
      direction: 'vertical',
      setWrapperSize: true,
      // 松手后滚动时间
      freeModeMomentumRatio: 1.2,
      // 松手后滚动速度
      freeModeMomentumVelocityRatio: 1.2,
      on: {
        // 非正式反弹回调函数
        momentumBounce: ifGetData,
        // 触摸滑动回调函数
        sliderMove: ifGetData,
        // slideNextTransitionStart () {
        //   debugger
        // },
        // slideNextTransitionEnd () {
        //   debugger
        // },
        // slidePrevTransitionStart () {
        //   debugger
        // },
        // slidePrevTransitionEnd () {
        //   debugger
        // },
      },
    });

    // 是否立即加载第一页数据
    if (ts.isLoadFirstPage) {
      ts.getNextPage();
    }
  },
  // 销毁手动注册的事件和定时器等，单页面应用必须这样做，这是一个好习惯
  beforeDestroy () {
  },
  filters: {},
  watch: {
    // 列表长度变化时重新设置swiper的slides高度
    listLength () {
      this.$nextTick(() => {
        this.swiper.updateSlides();
      });
    },
  },
  methods: {
    // 获取下一页
    getNextPage (type = 'append') {
      let ts = this;
      ts.isLoading = true;
      // ajax完成回调
      let cb = function (isOver = false) {
        ts.isLoading = false;
        // 业务代码告诉组件是否全部加载结束，因为
        ts.isOver = isOver;
        // 页码+1
        ts.pageNo++;
        // 是否显示加载更多，延迟一毫秒等待重绘完成
        setTimeout(() => {
          // 有数据 && 超过一屏，才显示
          ts.ifShowLoadMore = ts.listLength > 0 && ts.$refs.wrapper.clientHeight > ts.$el.clientHeight;
          ts.$nextTick(() => {
            ts.swiper.updateSlides();
          });
        }, 1);
      };
      ts.getData({
        cb,
        type,
      });
    },
    /**
     * 手指按下停止滚动
     */
    stopScrolling (event) {
      if (this.swiper.animating) {
        this.swiper.setTranslate(this.swiper.getTranslate());
        this.swiper.animating = false;
        this.$refs.wrapper.style.transitionDuration = '0ms';
        event.stopPropagation();
        event.preventDefault();
      }
    },
  },
};
