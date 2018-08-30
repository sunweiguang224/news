<template>
  <div class="index">

    <!--顶部标题栏-->
    <div class="title-bar">天天想看</div>

    <!--分类栏-->
    <div class="category-bar swiper-container" ref="categoryBar">
      <div class="swiper-wrapper">
        <span class="swiper-slide" v-for="(item, i) in $store.state.index.categoryList"
              :class="{active: $store.state.index.category === item}"
              @click="changeCategoryTo(item);">
          {{item}}
        </span>
      </div>
    </div>

    <!--新闻列表-->
    <div class="news-list-swiper swiper-container" ref="newsListSwiper">
      <div class="swiper-wrapper">
        <span class="swiper-slide" v-for="(category, i) in $store.state.index.categoryList">

          <!--<div class="news" v-for="(item, i) in $store.state.index.newsList[category]">
            <div class="title">{{item.title}}</div>
            <div class="imgs">
              <div class="img-container" v-for="img in item.imgs">
                <img :src="img" alt="想看">
              </div>
            </div>
            <div class="attrs">
              <span>{{item.author}}</span>
              <span>{{date.format(item.time, 'yyyy-MM-dd hh:mm:ss')}}</span>
            </div>
          </div>-->

          <dvd-service-com-paging-list class="news-list" ref="newsList" :get-data="getNextPage">
            <!--:class="'list-' + i"-->
                                       <!--ref="paging"-->
                                         <!--:list-height="listHeight"-->
                                         <!--:list-length="item.length"-->
                                         <!--:get-data="getData"-->
                                         <!--:is-load-first-page="false"-->
                                         <!--none-tip="还没有红包哟~"-->


            <div slot="list">
              <div class="news" v-for="(item, i) in $store.state.index.newsList[category].list">
                <div class="title">{{item.title}}</div>
                <div class="imgs">
                  <div class="img-container" v-for="img in item.imgs">
                    <img :src="img" alt="想看">
                  </div>
                </div>
                <div class="attrs">
                  <span>{{item.author}}</span>
                  <span>{{date.format(item.time, 'yyyy-MM-dd hh:mm:ss')}}</span>
                </div>
              </div>
            </div>
          </dvd-service-com-paging-list>

        </span>
      </div>
    </div>

    <!--<div class="news-list">
      <div class="news" v-for="(item, i) in $store.state.index.newsList[$store.state.index.category]">
        <div class="title">{{item.title}}</div>
        <div class="imgs">
          <div class="img-container" v-for="img in item.imgs">
            <img :src="img" alt="想看">
          </div>
        </div>
        <div class="attrs">
          <span>{{item.author}}</span>
          <span>{{date.format(item.time, 'yyyy-MM-dd hh:mm:ss')}}</span>
        </div>
      </div>
    </div>-->

  </div>
</template>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "css/index";
</style>

<script>
  /* eslint object-curly-spacing: "off" */
  export default from './js/index.js';
</script>
