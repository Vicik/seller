<style lang="stylus" scoped>
  @import '../assets/css/mixin'
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        margin-right: 22px
        width: 20px
        height: 20px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image("../assets/img/star48_on")
        &.half
          bg-image("../assets/img/star48_half")
        &.off
          bg-image("../assets/img/star48_off")
    &.star-36
      .star-item
        margin-right: 6px
        width: 15px
        height: 15px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image("../assets/img/star36_on")
        &.half
          bg-image("../assets/img/star36_half")
        &.off
          bg-image("../assets/img/star36_off")
    &.star-24
      .star-item
        margin-right: 3px
        width: 10px
        height: 10px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image("../assets/img/star24_on")
        &.half
          bg-image("../assets/img/star24_half")
        &.off
          bg-image("../assets/img/star24_off")
</style>

<template>
  <div class="star" :class="starType">
    <span v-for="(item, i) in itemClass" :key="i" :class="item" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClass () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>
