<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/Header.vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      axios.get('static/data.json').then((res) => {
        this.seller = res.data.seller
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style type="text/scss" lang="scss">

  @import "assets/style/base";

  .tab {
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    &:after{
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-top: 1px solid rgba(7,17,27,0.1);
      content: '';
    }
    .tab-item {
      -ms-flex: 1;
      flex: 1;
      text-align: center;
      a {
        display: block;
        font-size: 14px;
        color: #4d555d;
        &.active {
          font-size: 14px;
          color: #f01414;
        }
      }
    }
  }
</style>
