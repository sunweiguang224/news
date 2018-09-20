<template>
  <transition :name="$store.state.index.pageSwitchClassPrefix">
    <div class="index"
      :style="{'padding-top': numToRem($store.state.global.statusBarHeight + style.titleBarHeight + style.categoryBarHeight)}">

      <!--app状态栏-->
      <div class="status-bar" :style="{height: numToRem($store.state.global.statusBarHeight)}"></div>

      <!--顶部标题栏-->
      <div class="title-bar"
        :style="{'top': numToRem($store.state.global.statusBarHeight), 'height': numToRem(style.titleBarHeight), 'line-height': numToRem(style.titleBarHeight)}">
        天天想看
      </div>

      <!--分类栏-->
      <div class="category-bar swiper-container" ref="categoryBar"
        :style="{'top': numToRem($store.state.global.statusBarHeight + style.titleBarHeight)}">
        <div class="swiper-wrapper">
          <span class="swiper-slide" v-for="(item, i) in $store.state.index.categoryList"
                :class="{active: $store.state.index.category === item}"
                :style="{'height': numToRem(style.categoryBarHeight), 'line-height': numToRem(style.categoryBarHeight)}"
                @click="newsListSwiper.slideTo(i);">
                <!--@click="changeCategoryTo(item);">-->
            {{item}}
          </span>
        </div>
      </div>

      <!--新闻列表-->
      <div class="news-list-swiper swiper-container" ref="newsListSwiper">
        <div class="swiper-wrapper">
          <span class="swiper-slide" v-for="(category, i) in $store.state.index.categoryList">
            <dvd-service-com-paging-list class="news-list" ref="newsList"
              :get-data="getNextPage"
              :list-length="$store.state.index.newsList[category].list.length">
              <div slot="list">
                <!--模板-->
                <template v-for="(item, i) in $store.state.index.newsList[category].list">

                  <!--多图模板-->
                  <div class="news multi" v-if="item.imgs.length > 1" @click="$router.push({name: 'detail', query: {id: item.id}, params: {news: item}});">
                      <div class="title">{{item.title}}</div>
                      <div class="imgs">
                        <div class="img-container" v-for="img in item.imgs">
                          <img :src="img" alt="想看">
                        </div>
                      </div>
                      <div class="attrs">
                        <span class="attr">{{item.author}}</span>
                        <span class="attr">{{date.format(item.time, 'yyyy-MM-dd hh:mm:ss')}}</span>
                      </div>
                  </div>

                  <!--单图模板-->
                  <div class="news single" v-else-if="item.imgs.length === 1" @click="$router.push({name: 'detail', query: {id: item.id}, params: {news: item}});">
                    <div class="info">
                      <div class="title">{{item.title}}</div>
                      <div class="attrs">
                        <span class="attr">{{item.author}}</span>
                        <span class="attr">{{date.format(item.time, 'yyyy-MM-dd hh:mm:ss')}}</span>
                      </div>
                    </div>
                    <div class="img-container" v-for="img in item.imgs">
                      <img :src="img" alt="想看">
                    </div>
                  </div>

                </template>
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
  </transition>
</template>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./css/index";
</style>

<script>
  /* eslint object-curly-spacing: "off" */
  export default from './js/index.js';
</script>
