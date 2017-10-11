import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../views/goods/goods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods',
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }
  ]
})
