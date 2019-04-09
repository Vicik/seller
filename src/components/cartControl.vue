<style lang="stylus" scoped>
.cartcontrol
  font-size: 0
  .cart-decrease
    &.fade-enter-active
      animation: anim 0.5s
    &.fade-leave-active
      animation: anim 0.5s reverse
  .cart-decrease,
  .cart-add
    display: inline-block
    padding: 6px
    font-size: 24px
    color: rgb(0, 160, 220)
  .cart-count
    display: inline-block
    vertical-align: top
    padding-top: 6px
    width: 12px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
@keyframes anim{
  from{
    opacity: 0;
    transform: translate3d(24px, 0, 0) rotate(0deg)
  }
  to{
    opacity: 1
    transform: translate3d(0, 0, 0) rotate(180deg)
  }
}
</style>

<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCount"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('send', event.target)
    },
    decreaseCount (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>
