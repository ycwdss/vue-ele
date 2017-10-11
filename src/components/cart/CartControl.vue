<template lang="html">

  <div class="cartcontrol">
    <!--减法-->
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart()">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <!--数量-->
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <!--加法-->
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>

</template>

<script>

  export default {
    props: {
      food: Object
    },
    methods: {
      /*加法*/
      addCart(event) {

        if (!event._constructed) {
          return
        }
        //如果等于0的，设置food里属性count为0
        if (!this.food.count) {
          this.$set(this.food, 'count', 0)
        }
        this.food.count++;
        Bus.$emit('cartAdd', event.target);
      },
      /*减法*/
      decreaseCart() {
        if (!event._constructed || !this.food.count) {
          return
        }
        this.food.count--;
      }
    }
  }

</script>

<style lang="scss" type="text/scss">

  .cartcontrol
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    transition: all .4s linear;
    .inner {
      line-height: 24px;
      font-size: 24px;
      color: #00a0dc;
      transition: all 0.4s linear;
    }
    /*回来*/
    &.fadeRotate-enter-active,
    &.fadeRotate-leave-active {
      transform: translate3d(0, 0, 0);
      .inner {
        display: inline-block;
        transform: rotate(0);
      }
    }
    /*出去*/
    &.fadeRotate-enter, &.fadeRotate-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }

  }

  .inner {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
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

</style>
