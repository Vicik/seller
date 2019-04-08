<style lang="stylus">
@import './assets/css/mixin.styl'
body,html
  margin: 0
  padding: 0
  line-height: 1
  font-weight: 200
  font-family: 'PingFang SC','STHeitiSC-Light'
a
  text-decoration: none
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50;
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1;
      text-align: center;
      & > a
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.router-link-exact-active.router-link-active
          color: red;
</style>

<template>
  <div id="app">
    <v-head :seller="seller"></v-head>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" :goods="goods" :ratings="ratings"></router-view>
  </div>
</template>

<script>
import header from './components/header'
import data from './assets/data.json'
export default {
  name: 'App',
  data () {
    return {
      seller: data.seller,
      goods: data.goods,
      ratings: data.ratings
    }
  },
  components: {
    'v-head': header
  }
}
</script>
