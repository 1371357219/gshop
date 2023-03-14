<template>
  <div class="footer">
    <ul class="foot_nav">
      <li class="foot_nav_item home_nav" :class="{active:'/home'===$route.path}" @click="goto('/home')">
        <span class="iconfont icon-shouye"></span>
        <span>首页</span>
      </li>
      <li class="foot_nav_item search_nav" :class="{active:'/search'===$route.path}" @click="goto('/search')">
        <span class="iconfont icon-sousuo"></span>
        <span>搜索</span>
      </li>
      <li class="foot_nav_item order_nav" :class="{active:'/order'===$route.path}"  @click="goto('/order')">
        <span class="iconfont icon-dingdan"></span>
        <span>订单</span>
      </li>
      <li class="foot_nav_item profile_nav" :class="{active:'/profile'===$route.path}"  @click="goto('/profile')">
        <span class="iconfont icon-geren"></span>
        <span>我的</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  methods: {
    goto(path){
      if(this.$route.path!==path){
        this.$router.replace(path)
      }
    }
  },
};
</script>

<style lang="stylus">
@import "../../common/stylus/minxin.styl"
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height:60px;
  box-sizing: border-box;
  background-color: white;
  border-top: 1px solid rgba(146, 146, 146, 0.4);
  color: rgb(146, 146, 146);
  font-weight: 600;
  padding: 10px 0;

  ul {
    display: flex;
    justify-content: space-around;

    li {
      display: flex;
      flex 1
      flex-direction: column;
      text-align: center;
      font-size:12px;
      span:nth-child(1) {
        font-size: 22px;
        line-height: 28px;
      }

      &.active {
        color: $green;
      }
    }
  }
}
</style>
