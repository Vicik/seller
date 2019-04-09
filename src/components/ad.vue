<style lang="stylus" scoped>
  @import '../assets/css/mixin.styl'
  .ad
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      background-repeat: no-repeat
    &.big
      .icon
        margin-right: 6px
        width: 16px
        height: 16px
        background-size: 16px 16px
        &.decrease
          bg-image('../assets/img/decrease_2')
        &.discount
          bg-image('../assets/img/discount_2')
        &.guarantee
          bg-image('../assets/img/guarantee_2')
        &.invoice
          bg-image('../assets/img/invoice_2')
        &.special
          bg-image('../assets/img/special_2')
      .text
        line-height: 16px
        font-size: 12px
    &.small
      .icon
        margin-right: 4px
        width: 12px
        height: 12px
        background-size: 12px 12px
        &.decrease
          bg-image('../assets/img/decrease_1')
        &.discount
          bg-image('../assets/img/discount_1')
        &.guarantee
          bg-image('../assets/img/guarantee_1')
        &.invoice
          bg-image('../assets/img/invoice_1')
        &.special
          bg-image('../assets/img/special_1')
      .text
        line-height: 12px
        font-size: 10px
</style>

<template>
  <div class="ad" :class="size">
    <span class="icon" :class="supportsType"></span>
    <span class="text">{{description}}</span>
  </div>
</template>

<script>
export default {
  props: {
    supportsType: {
      type: String
    },
    description: {
      type: String
    },
    size: {
      type: String
    }
  }
}
</script>
