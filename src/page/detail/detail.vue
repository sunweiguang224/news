<template>
  <div class="detail">
    <!--标题-->
    <div class="title">{{news.title}}</div>

    <!--出处-->
    <div class="attrs">
      <span class="left">
        <span class="attr">{{news.author}}</span>
        <span class="attr">{{date.format(news.time, 'yyyy-MM-dd hh:mm:ss')}}</span>
      </span>
      <span class="right"><a :href="news.link">查看原文</a></span>
    </div>

    <!--正文-->
    <template v-for="(item, i) in news.contents">
      <div class="text" v-if="item.type === 'text' && item.text">{{item.text}}</div>
      <div class="image" v-else-if="item.type === 'image'">
        <img :src="item.url" alt="天天想看">
      </div>
    </template>
  </div>
</template>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "css/detail";
</style>

<script>
  /* eslint object-curly-spacing: "off" */
  export default from './js/detail.js';
</script>
