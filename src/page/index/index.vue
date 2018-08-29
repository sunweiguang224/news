<template>
  <div class="index">

    <!--顶部标题栏-->
    <div class="title-bar">天天想看</div>

    <!--分类栏-->
    <div class="category-bar swiper-container" ref="categoryBar">
      <div class="swiper-wrapper">
        <!--<span class="swiper-slide" :class="{active: category === '推荐'}" @click="active">推荐</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '娱乐'}">娱乐</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '生活'}">生活</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '体育'}">体育</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '军事'}">军事</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '科技'}">科技</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '互联网'}">互联网</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '国际'}">国际</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '国内'}">国内</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '人文'}">人文</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '汽车'}">汽车</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '财经'}">财经</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '房产'}">房产</span>-->
        <!--<span class="swiper-slide" :class="{active: category === '时尚'}">时尚</span>-->

        <span class="swiper-slide" v-for="(item, i) in $store.state.index.categoryList"
              :class="{active: $store.state.index.category === item}"
              @click="$store.commit('index/setCategory', item); $store.dispatch('index/fetchResponse');">
          {{item}}
        </span>
      </div>
    </div>

    <!--新闻列表-->
    <div class="news-list">
      <div class="news" v-for="(item, i) in $store.state.index.response">
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

  </div>
</template>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "css/index";
</style>

<script>
  /* eslint object-curly-spacing: "off" */
  export default from './js/index.js';
</script>
