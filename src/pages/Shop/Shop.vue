<template>
  <div>
    <ShopHeader />
    <ul class="Shop_select">
      <li @click="changing" :class="$route.path === '/shop/goods' ? 'on' : ''">
        点餐
      </li>
      <li
        @click="changing"
        :class="$route.path === '/shop/ratings' ? 'on' : ''"
      >
        评价
      </li>
      <li @click="changing" :class="$route.path === '/shop/info' ? 'on' : ''">
        商家
      </li>
    </ul>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import ShopHeader from "../../components/Shop/ShopHeader.vue";
export default {
  data() {
    return {};
  },
  methods: {
    // 切换子路由
    changing(event) {
      const pathName = event.target.innerText;
      switch (pathName) {
        case "点餐":
          if (this.$route.path !== "/shop/goods") {
            this.$router.replace("/shop/goods");
          }
          break;
        case "评价":
          if (this.$route.path !== "/shop/ratings") {
            this.$router.replace("/shop/ratings");
          }
          break;
        case "商家":
          if (this.$route.path !== "/shop/info") {
            this.$router.replace("/shop/info");
          }
          break;
      }
    },
  },
  components: {
    ShopHeader,
  },
};
</script>

<style lang="stylus" scoped>
.Shop_select {
  display: flex;
  justify-content: space-between;

  &>li {
    position: relative;
    width: 33.33%;
    text-align: center;
    font-size: 14px;
    color: #4d555d;
    height: 40px;
    line-height: 40px;
    background: #fff;

    &.on {
      color: #02a774;
    }

    &.on::after {
      content: '';
      position: absolute;
      width: 36px;
      height: 2px;
      background: #02a774;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>