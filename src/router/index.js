import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods'
import ratings from '@/components/ratings'
import seller from '@/components/seller'
import food from '@/components/food'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '/food',
      name: 'food',
      component: food
    }
  ]
})
