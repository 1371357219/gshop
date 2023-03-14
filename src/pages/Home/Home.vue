<template>
  <div class="home">
    <header class="home_header">
      <div class="search_icon" @click="$router.replace('/search')">
        <span class="iconfont icon-sousuo"></span>
      </div>

      <span class="home_location ellipsis">{{ address.name }}</span>
      <div
        class="user_login"
        @click="
          userInfo._id ? $router.push('/userinfo') : $router.push('/login')
        "
      >
        <span v-if="!userInfo._id">登录|注册</span>
        <span v-else class="iconfont icon-yonghu"></span>
      </div>
    </header>
    <div class="home_swiper">
      <div class="home_container">
        <div class="home_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="n in Math.ceil(categorys.length / 8)"
                :key="n"
              >
                <ul class="food_items_ul">
                  <li
                    class="food_item"
                    v-for="value in categorys.slice(
                      (n - 1) * 8,
                      n * 8 <= categorys.length ? n * 8 : categorys.length
                    )"
                    :key="value.id"
                  >
                    <div class="food_img">
                      <img :src="imgBaseUrl + value.image_url" />
                    </div>
                    <span>{{ value.title }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <!-- <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div> -->

            <!-- 如果需要滚动条 -->
            <!-- <div class="swiper-scrollbar"></div> -->
          </div>
        </div>
        <div class="home_show_list">
          <div class="show_list_header">
            <span class="iconfont icon-xuanxiang"></span>
            <span>附近商家</span>
          </div>
          <ShowList :shopLists="shops"></ShowList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ShowList from "../../components/Home/ShowList.vue";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      imgBaseUrl: "https://fuss10.elemecdn.com",
    };
  },
  watch: {
    shops() {
      this.$nextTick(() => {
        new BScroll(".home_swiper", {
          click: true,
        });
      });
    },
    categorys: {
      handler(newQuestion) {
        // 在组件实例创建时会立即调用
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            // nextButton: ".swiper-button-next",
            // prevButton: ".swiper-button-prev",
            // 如果需要滚动条
            // scrollbar: ".swiper-scrollbar",
          });
        });
      },
      // 强制立即执行回调
      // immediate: true,
    },
  },
  computed: {
    ...mapState(["address", "categorys", "shops", "userInfo"]),
  },
  methods: {
    ...mapActions(["getCategorys", "getShops"]),
  },
  components: {
    ShowList,
  },
  mounted() {
    this.getCategorys();
    this.getShops();
  },
};
</script>

<style lang="stylus">
@import '../../common/stylus/minxin.styl';

.swiper {
  width: 100%;
  height: 200px;
}

.home {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  .home_header {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #fff;
    height: 40px;
    background-color: $green;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-around;
    user-select: none;

    .search_icon {
      padding: 0 6px;

      span {
        font-size: 22px;
      }
    }

    .home_location {
      width: 200px;
      text-align: center;
      line-height: 26px;
    }

    .user_login {
      font-size: 14px;
      display: flex;
      align-items: center;

      .Separator {
        display: inline-block;
        height: 20px;
        width: 0px;
        border-left: 1px solid #ffffff;
        margin: 0 4px;
      }
    }
  }

  .home_swiper {
    position: fixed;
    top: 40px;
    bottom: 40px;
    width: 100%;

    .home_nav {
      background-color: #fff;
      height: 200px;
      width: 100%;
      overflow: hidden;

      .food_items_ul {
        display: flex;
        flex-wrap: wrap;
        flex-shrink: 0;
        justify-content: center;
        align-items: flex-start;
        height: 200px;
        width: 100%;

        .food_item {
          width: 25%;
          text-align: center;

          img {
            width: 50px;
            height: 50px;
            display: inline-block;
          }

          span {
            font-size: 14px;
            color: #444;
          }
        }
      }
    }

    .home_show_list {
      background-color: #fff;
      margin-top: 10px;
      padding: 10px;

      .show_list_header {
        color: #999;
        font-size: 14px;
        vertical-align: baseline;
        line-height: 20px;

        .icon-xuanxiang {
          padding-right: 4px;
        }
      }
    }
  }
}
</style>