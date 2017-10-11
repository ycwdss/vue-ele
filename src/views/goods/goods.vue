<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" @click="menuClick(index,$event)"
            :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
          <span class="text">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1>{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="goDetail(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2>{{food.name}}</h2>
                <p class="description" v-show="food.description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice"><span class="unit">￥</span>{{food.price}}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--购物车-->
    <Cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></Cart>
    <!--购物车详情-->
    <FoodDetail :food="selectedFood" v-if="selectedFood" ref="myFood"></FoodDetail>
  </div>

</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import CartControl from '../../components/cart/CartControl.vue'
  import Cart from '../../components/cart/Cart.vue'
  import FoodDetail from '../../components/cart/FoodDetail.vue'

  export default {
    name: 'goods',
    props: {
      seller: Object
    },
    data () {
      return {
        goods: [],//商品集合
        listHeight: [],//商品区高度集合
        foodsScrollY: 0, //商品滚动的y轴
        selectedFood: ''
      }
    },
    created() {
      axios.get('static/data.json').then((res) => {
        this.goods = res.data.goods
        this.$nextTick(() => {
          this._initScroll(); // 初始化scroll
          this._calculateHeight(); // 初始化列表高度列表
        })
      });
    },
    computed: {
      //计算商品滚动中左侧导航对应
      menuCurrentIndex() {
        for (let i = 0, l = this.listHeight.length; i < l; i++) {
          let topHeight = this.listHeight[i]
          let bottomHeight = this.listHeight[i + 1] //滚动超出最后一个
          if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _initScroll() {
        this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        // 监控滚动事件
        this.foodsScroll.on('scroll', (pos) => {
          this.foodsScrollY = Math.abs(Math.round(pos.y))
        })
      },
      //商品滚动条集合
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0, l = foodList.length; i < l; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      //点击左侧导航滚动
      menuClick(index, event) {
        if (!event._constructed) {
          return
        }
        this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
      },
      //商品详情
      goDetail(food) {
        this.selectedFood = food
        this.$nextTick(() => {
          this.$refs.myFood.showToggle()
        })
      }
    },
    components: {
      CartControl,
      Cart,
      FoodDetail
    }
  }

</script>

<style lang="scss" type="text/scss">
  .goods {
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      -ms-flex: 0 0 80px;
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      margin-top: 2px;
      .menu-item, .menu-item-selected {
        position: relative;
        display: table;
        height: 54px;
        line-height: 14px;
        width: 56px;
        padding: 0 12px;
      }
      .menu-item-selected {
        background: #fff;
        font-weight: 700;
        margin-top: -1px;
      }
      .text {
        display: table-cell;
        vertical-align: middle;
        font-size: 12px;
        font-weight: 200;
        white-space: normal;
        line-height: 14px;
      }
    }
    .foods-wrapper {
      -ms-flex: 1;
      flex: 1;
      margin-top: 2px;
      .food-list h1 {
        height: 26px;
        line-height: 26px;
        padding-left: 12px;
        font-size: 12px;
        color: #93999f;
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
      }
      .food-item {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        margin: 0 18px;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .icon {
          -ms-flex: 0 0 57px;
          flex: 0 0 57px;
        }
        .content {
          -ms-flex: 1;
          flex: 1;
          padding-left: 10px;
          h2 {
            margin: 2px 0 8px 0;
            font-size: 14px;
            line-height: 14px;
            height: 14px;
            font-weight: 700;
            color: #07111b;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .description {
            font-size: 10px;
            margin-bottom: 8px;
            line-height: 12px;
          }
          .sell-info {
            font-size: 10px;
            color: #93999f;
            line-height: 10px;
          }
          .sellCount {
            margin-right: 4px;
          }
          .price {
            font-size: 10px;
            font-weight: 700;
            line-height: 24px;
            .newPrice {
              font-size: 14px;
              color: #f01414;
              .unit {
                font-size: 10px;
                font-weight: normal;
              }

            }
            .oldPrice {
              text-decoration: line-through;
              color: #93999f;
              padding-left: 4px;
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
            z-index: 20;
          }
          .cartcontrol .cart-decrease {
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
          .cartcontrol .cart-count {
            display: inline-block;
            vertical-align: top;
            font-size: 10px;
            color: #93999f;
            line-height: 24px;
            text-align: center;
            padding: 6px 0;
          }
          .cartcontrol .cart-add {
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
  }
</style>
