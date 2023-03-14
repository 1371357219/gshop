<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
import {mapActions} from 'vuex'
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    FooterGuide,
  },
  mounted(){
    this.getAddress();
    this.getUserInfo()
    this.getShopInfo()
  },
  methods: {
    ...mapActions(['getAddress','getUserInfo','getShopInfo'])
  },
};
</script>

<style lang="stylus">
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
body{
  background: #f5f5f5;
}
</style>