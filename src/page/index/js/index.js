import Swiper from 'swiper';

export default {
  async asyncData ({store, req, res}) {
    // if (runtime.isClient() && store.state.center.response) {
    //   store.dispatch('center/fetchResponse', {req, res});
    // } else {
    //   await store.dispatch('center/fetchResponse', {req, res});
    // }
  },
  components: {},
  props: {},
  data () {
    return {
      window,
      document,
      location,

    };
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
  },
  mounted () {
    var swiper = new Swiper(this.$refs.categoryBar, {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  },
  methods: {},
  filters: {},
};
