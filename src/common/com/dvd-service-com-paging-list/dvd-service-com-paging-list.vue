<!--分页组件，触底显示loading并加载下一页，结束时显示结束状态。-->
<template>
  <!--垂直滑动-->
  <div class="swiper-container dvd-service-com-paging-list" :style="{height: listHeight}"
    @click.capture="stopScrolling">

    <div class="swiper-wrapper" ref="wrapper">

      <!--下拉加载更多-->
      <div class="load-more pull-down" ref="pullDown">
        <div class="over" v-if="isOver">没有更多了~</div>
        <div class="loading" v-else>
          <span class="text">加载更多</span>
          <img src="./img/loading.gif">
        </div>
      </div>

      <!--列表-->
      <div class="swiper-slide">
        <slot name="list"></slot>
      </div>

      <!--上拉加载更多-->
      <div class="swiper-slide load-more" ref="pullUp">
        <div class="over" v-if="isOver">没有更多了~</div>
        <div class="loading" v-else>
          <span class="text">加载更多</span>
          <img src="./img/loading.gif">
        </div>
      </div>

      <!--暂无红包-->
      <!--<div class="none" v-if="listLength === 0">&lt;!&ndash; && pageNo > 0&ndash;&gt;
        <div class="content">
          <img class="pic" :src="noneImg">
          <div class="tip">{{noneTip}}</div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
  export default from './dvd-service-com-paging-list';
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./dvd-service-com-paging-list";
</style>
