import ajax from 'ajax';
import runtime from 'runtime';
import Vue from 'vue';

export default {
  namespaced: true,
  state () {
    return {
      categoryList: [
        '推荐',
        '娱乐',
        '生活',
        '体育',
        '军事',
        '科技',
        '互联网',
        '国际',
        '国内',
        '人文',
        '汽车',
        '财经',
        '房产',
        '时尚',
      ],
      newsList: {
        '推荐': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '娱乐': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '生活': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '体育': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '军事': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '科技': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '互联网': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '国际': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '国内': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '人文': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '汽车': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '财经': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '房产': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
        '时尚': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false,
        },
      },
      category: '推荐',
    };
  },
  mutations: {
    setCategory (state, data) {
      state.category = data;
    },
    prependNewsList (state, data) {
      state.newsList[data.category] = data.newsList.concat(state.newsList[data.category]);
    },
    appendNewsList (state, data) {
      let newNewsList = JSON.parse(JSON.stringify(state.newsList[data.category]));
      newNewsList.list = newNewsList.list.concat(data.newsList);
      newNewsList.pageNo += 1;
      newNewsList.isOver += false;
      state.newsList[data.category] = newNewsList;
    },
  },
  getters: {
    categoryIndex (state) {
      for (let i in state.categoryList) {
        if (state.category === state.categoryList[i]) {
          return i;
        }
      }
      return 0;
    }
  },
  actions: {
    async getNextPage (context, {req, res} = {}) {
      let category = context.state.category;

      let newsList = context.state.newsList[category];

      let list = await ajax.send({
        type: 'get',
        url: `http://${runtime.isServer() ? 'localhost' : location.hostname}:8100/api/queryNewsList`,
        dataType: 'json',
        // data: {
        //   category: context.state.category,
        // },
        params: {
          category,
          pageNo: newsList.pageNo + 1,
          pageSize: newsList.pageSize,
        },
      }, {req, res});

      console.log(list)

      context.commit('appendNewsList', {
        category,
        newsList: list,
      });
    },
  },
};
