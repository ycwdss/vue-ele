<template>
  <div class="header">
    <div class="header-content">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
         <!-- <span class="name">{{seller.name}}</span>-->
        </div>
        <div class="description">
          {{seller.description + ' / ' + seller.deliveryTime + '分钟送达'}}
        </div>
        <div class="supports" v-if="seller.supports">
          <div class="supports_desc">
            <span class="icon"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" >
        <span class="count">{{seller.supports.length+'个'}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-tips" >
      <span class="tips-title"></span>
      <span class="tips-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="header-background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" lang="scss" scoped>
  .header {
    position: relative;
    background: rgba(7, 17, 27, 0.5);
    color: #fff;
    blur: 10px;
    overflow: hidden;
  }

  .header-content {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    padding: 24px 12px 18px 24px;
    font-size: 12px;
    .avatar img {
      border-radius: 2px;
    }
    .content {
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        font-size: 16px;
      }
      .brand {
        display: inline-block;
        vertical-align: top;
        width: 30px;
        height: 18px;
        background: url("./../../assets/image/header/brand@2x.png") no-repeat;
        background-size: cover;
      }
      .name {
        margin-left: 6px;
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
      }
      .description {
        font-size: 12px;
        margin-bottom: 10px;
      }
      .supports {
        .text {
          line-height: 12px;
          font-size: 10px;
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-image: url("./../../assets/image/header/decrease_2@2x.png");
          background-size: 12px 12px;
          background-repeat: no-repeat;
        }
      }
    }
  }

  .support-count {
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
    .count {
      vertical-align: top;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      font-size: 10px;
      margin-left: 2px;
      line-height: 24px;
    }

  }

  .header-tips {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);
    .tips-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      background-image: url('./../../assets/image/header/bulletin@2x.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .tips-text {
      font-size: 10px;
      vertical-align: middle;
      margin: 0 4px;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }

  }

  .header-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    z-index: -1;
  }
</style>
