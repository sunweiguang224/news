<template>
  <transition :name="$store.state.detail.pageSwitchClassPrefix">
    <div class="detail"
      :style="{'padding-top': numToRem($store.state.global.statusBarHeight)}">

      <!--app状态栏-->
      <div class="status-bar" :style="{height: numToRem($store.state.global.statusBarHeight)}"></div>

      <!--详情内容-->
      <div class="contents">
        <!--标题-->
        <div class="title">{{$store.state.detail.news.title}}</div>

        <!--出处-->
        <div class="attrs">
      <span class="left">
        <span class="attr">{{$store.state.detail.news.author}}</span>
        <span class="attr">{{date.format($store.state.detail.news.time, 'yyyy-MM-dd hh:mm:ss')}}</span>
      </span>
          <span class="right"></span>
        </div>

        <!--正文-->
        <template v-for="(item, i) in $store.state.detail.news.contents">
          <div class="text" v-if="item.type === 'text' && item.text">{{item.text}}</div>
          <div class="image" v-else-if="item.type === 'image'">
            <img :src="item.url" alt="天天想看">
          </div>
        </template>

        <!--查看原文-->
        <div class="link"><a :href="$store.state.detail.news.link">查看原文</a></div>
      </div>
    </div>
  </transition>
</template>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "css/detail";
</style>

<script>
  /* eslint object-curly-spacing: "off" */
  export default from './js/detail.js';
</script>
