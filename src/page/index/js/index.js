import Swiper from 'swiper';
import runtime from 'runtime';
import date from 'date';

export default {
  async asyncData ({store, req, res}) {
    if (runtime.isClient() && store.state.center.response) {
      store.dispatch('index/fetchResponse', {req, res});
    } else {
      await store.dispatch('index/fetchResponse', {req, res});
    }
  },
  components: {},
  props: {},
  data () {
    return {
      window,
      document,
      location,

      date,
    };
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
  },
  mounted () {
    new Swiper(this.$refs.categoryBar, {
      slidesPerView: 'auto',
      // spaceBetween: 0,
      // centeredSlides: true,
    });
  },
  methods: {
  },
  filters: {},
};
