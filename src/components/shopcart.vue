<style lang="stylus" scoped>
@import '../assets/css/mixin.styl'
.shopcart
  position: fixed
  bottom: 0
  left: 0
  z-index: 40
  width: 100%
  height: 48px
  .content
    display: flex
    background: #141d27
    color: rgba(255, 255, 255,0.4)
    .content-left
      flex: 1
      font-size: 0
      .logo-wrapper
        display: inline-block
        vertical-align: top
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 58px
        height: 58px
        box-sizing: border-box
        border-radius: 50%
        background: #141d27
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          text-align: center
          background: #2b343c
          &.highlight
            background: rgb(0, 160, 220)
          .icon-shopping_cart
            line-height: 44px
            font-size: 24px
            &.highlight
              color: #fff
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 16px
          font-size: 9px
          font-weight: 700
          color: #fff
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        vertical-align: top
        margin-top: 12px
        padding-right: 12px
        line-height: 24px
        font-size: 16px
        font-weight: 700
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        &.highlight
          color: #fff
      .desc
        display: inline-block
        vertical-align: top
        margin: 12px 0 0 12px
        line-height: 24px
        font-size: 16px
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 16px
        font-weight: 700
        &.not-enough
          padding: 0 8px
          background: #2b333b
        &.enough
          background: #00b43c
          color: #fff
  .shopcart-list
    position: absolute
    top: 0
    left: 0
    z-index: -1
    width: 100%
    transform translate3d(0, -100%, 0)
    &.fold-enter-active,&.fold-leave-active
      transition: all 0.5s linear
    &.fold-enter,&.fold-leave-to
      opacity: 0
      transform: translate3d(0, 0, 0)
    &.fold-enter-to,&.fold-leave
      opacity: 1
      transform: translate3d(0, -100%, 0)
    .list-header
      padding: 0 18px
      height: 40px
      line-height: 40px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7,17, 27, 0.1)
      .title
        float: left
        font-size: 14px
        color: rgb(7,17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0,160, 220)
    .list-content
      padding:0 18px
      max-height: 217px
      overflow: hidden
      background: #fff
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height: 24px
          cont-size: 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 6px
.list-mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 30
  background: rgba(7, 17, 27, 0.6)
  &.fade-enter-active,&.fade-leave-active
    transifion: all 0.5s
  &.fade-enter,.&fade-leave-to
    opacity: 0
  &.fade-enter-to,&.fade-leave
    opacity: 1
.ball-container
  .ball
    position: fixed
    left: 32px
    bottom: 22px
    z-index: 200
    transition: all 1s cubic-bezier(0.49,-0.29,0.75,0.41)
    .inner
      width: 16px
      height: 16px
      border-radius: 50%
      background: rgb(0, 160, 220)
      transition: all 1s linear
</style>

<template>
  <div class="shopcart-wrapper">
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <span class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="fold">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref='listContent'>
            <ul>
              <li v-for="(food, i) in selectFoods" :key="i" class="food">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="fold" @click.stop.prevent="hideList"></div>
    </transition>
    <!-- 购物车小球 -->
    <div class="ball-container">
      <div v-for="(ball, i) in balls" :key="i">
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <div class="ball" v-show="ball.show" :css="false">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from './cartControl'
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      fold: false,
      balls: [
        {
          id: 1,
          show: false,
          el: null
        },
        {
          id: 2,
          show: false,
          el: null
        },
        {
          id: 3,
          show: false,
          el: null
        },
        {
          id: 4,
          show: false,
          el: null
        },
        {
          id: 5,
          show: false,
          el: null
        }
      ],
      dropBalls: [],
      scroll: null
    }
  },
  components: {cartcontrol},
  watch: {
    selectedFoods (newFoods, oldFoods) {
      if (newFoods.length === 0) {
        this.fold = true
      }
    },
    totalCount () {
      if (this.totalCount > 0) {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    hideList () {
      this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
      this.fold = false
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert('支付')
    },
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.querySelector('.inner-hook')
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.querySelector('.inner-hook')
        inner.style.transform = 'translate3d(0, 0, 0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
</script>
