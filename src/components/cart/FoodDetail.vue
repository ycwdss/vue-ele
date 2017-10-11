<template>
  <transition name="move">
    <div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
      <div class="foodDetail">
        <div class="back" @click="showToggle()">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="food.image" height="425" width="100%">
        <div class="info">
          <div class="title">{{food.name}}</div>
          <div class="desc">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{food.price}}
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="shopCart">
            <transition name="fade">
              <div class="text" @click="addCart($event)" v-show="!food.count">加入购物车</div>
            </transition>
          </div>
          <CartControl :food="food"></CartControl>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import BScroll from 'better-scroll'
  import CartControl from '../../components/cart/CartControl.vue'

  export default {
    name: 'cartdetail',
    props: {
      food: Object
    },
    data () {
      return {
        showDetail: false,
      }
    },
    components: {
      CartControl
    },
    methods: {
      showToggle() {
        this.showDetail = !this.showDetail
        if (this.showDetail) {
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      },
      _initScroll() {
        if (!this.detailWrapper) {
          this.detailWrapper = new BScroll(this.$refs.detailWrapper, {
            click: true
          });
        } else {
          this.detailWrapper.refresh()
        }
      },
      addCart(event) {
        if (!event._constructed) {
          return
        }
        this.$set(this.food, 'count', 1)
        Bus.$emit('cartAdd', event.target)
      },
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .detailWrapper {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    width: 100%;
    background: #fff;
    transition: all 0.4s ease;
    &.move-enter-avtive, &.move-leave-active {
      transform: translate3d(0, 0, 0);
    }
    &.move-enter, &.move-leave-active {
      transform: translate3d(100%, 0, 0);
    }
    .back {
      position: absolute;
      color: #fff;
      top: 12px;
      left: 6px;
      font-size: 20px;
      padding: 10px;
    }
    .info {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 18px;
      .title {
        font-size: 14px;
        font-weight: 700;
        color: #07111b;
        line-height: 14px;
      }
      .desc {
        display: -ms-flexbox;
        display: flex;
        padding: 0;
        padding-top: 8px;
        font-size: 10px;
        color: #93999f;
        line-height: 10px;
        span:last-child {
          padding-left: 12px;
        }
      }
      .price {
        display: -ms-flexbox;
        display: flex;
        padding-top: 18px;
        font-size: 14px;
        font-weight: 700;
        color: #f01414;
        line-height: 24px;
      }
      .shopCart {
        position: absolute;
        right: 18px;
        bottom: 18px;
        height: 24px;
        text-align: center;
        z-index: 2;
        .text {
          box-sizing: border-box;
          height: 100%;
          line-height: 24px;
          color: #fff;
          font-size: 10px;
          padding: 0 12px;
          border-radius: 12px;
          background: #00a0dc;
        }
      }
      .cartcontrol {
        position: absolute;
        right: 12px;
        bottom: 12px;
        .cart-decrease {
          display: inline-block;
          padding: 6px;
          transition: all 0.4s linear;
          .inner {
            line-height: 24px;
            font-size: 24px;
            color: #00a0dc;
            transition: all 0.4s linear;
          }
        }
        .cart-count {
          display: inline-block;
          vertical-align: top;
          font-size: 10px;
          color: #93999f;
          line-height: 24px;
          text-align: center;
          padding: 6px 0;
        }
        .cart-add {
          display: inline-block;
          vertical-align: top;
          font-size: 24px;
          color: #00a0dc;
          line-height: 24px;
          padding: 6px;
        }
      }
    }
  }

  .divider {
    height: 16px;
    width: 100%;
    background: #f3f5f7;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .foodDetail {
    .desc {
      padding: 18px;
    }
    .title {
      font-size: 14px;
      font-weight: 500;
      color: #07111b;
      margin-bottom: 6px;
    }
    .content {
      font-size: 12px;
      font-weight: 200;
      color: #4d555d;
      line-height: 24px;
      padding: 0 8px;
    }
  }
</style>
