<template>
  <div>
    <div class="ShopCart">
      <div class="cart_left" @click="toggleShow()">
        <div class="icon">
          <span
            :class="{ highlignt: cartFoods.length }"
            class="iconfont icon-gouwucheman"
          ></span>
          <div v-if="totalCount" class="num">{{ totalCount }}</div>
        </div>
        <div class="detail">
          <span class="price"> ￥{{ totalPrice }}</span>
          <span>配送费￥{{ info.deliveryPrice }}元</span>
        </div>
      </div>
      <div
        class="cart_right"
        :class="this.totalPrice >= this.info.minPrice ? 'enough' : ''"
        @click="pay()"
      >
        <span>{{ paytext }}</span>
      </div>
      <transition name="swipe">
        <div class="shopCart_list" v-show="listShow">
          <div class="header">
            <div class="left_header">
              <span>购物车</span>
            </div>
            <div class="right_header" @click="clearAll()">清空</div>
          </div>
          <div class="list_wrapper">
            <ul class="lists">
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow()"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { MessageBox, Toast } from "mint-ui";
import CartControl from "./CartControl.vue";
import BScroll from "@better-scroll/core";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    CartControl,
  },
  methods: {
    toggleShow() {
      if (this.totalCount) {
        this.isShow = !this.isShow;
      }
    },
    pay() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      if (totalPrice >= minPrice) {
        Toast(`需要支付${totalPrice}元`);
      }
    },
    clearAll() {
      MessageBox.confirm("确定执行此操作?").then(
        (action) => {
          Toast("成功");
          this.$store.dispatch('clearCart', this.cartFoods)
        },
        (error) => {}
      );
    },
  },
  computed: {
    ...mapState(["info", "cartFoods"]),
    ...mapGetters(["totalCount", "totalPrice"]),
    paytext() {
      const { minPrice } = this.info;
      if (this.totalPrice == 0) {
        return `￥${minPrice}元起送`;
      } else if (this.totalPrice < minPrice) {
        return `还差￥${minPrice - this.totalPrice}元起送`;
      } else if (this.totalPrice >= minPrice) {
        return "去结算";
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.isShow = false;
      }
      if (this.isShow) {
        this.$nextTick(() => {
          /*
            单例: 只有一个实例
            实现:
                1. 在创建之前: 判断只有不存在时才创建
                2. 在创建之后: 保存
             */
          if (!this.scroll) {
            this.scroll = new BScroll('.list_wrapper', { click: true });
          } else {
            this.scroll.refresh(); // 刷新滚动
          }
        });
      }
      return this.isShow;
    },
  },
};
</script>

<style lang="stylus" scoped>
.ShopCart {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 50;
  display: flex;
  align-items: center;
  background: #141d27;
  color: rgba(255, 255, 255, 0.4);

  .cart_left {
    flex: 1;
    background: #141d27;
    height: 48px;

    .icon {
      display: inline-block;
      margin: 0 12px;
      padding: 6px;
      width: 56px;
      height: 56px;
      position: relative;
      top: -10px;
      box-sizing: border-box;
      border-radius: 50%;
      background: #141d27;
      text-align: center;

      &>span {
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #2b343c;
        line-height: 44px;
        font-size: 24px;
        color: #80858a;

        &.highlignt {
          color: #fff;
          background: #02a774;
        }
      }

      .num {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background: #f01414;
      }
    }

    .detail {
      display: inline-block;

      &>span {
        display: block;
      }

      &>span:nth-child(2) {
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -15px;
        font-size: 10px;
      }

      .price {
        box-sizing: border-box;
        vertical-align: top;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
        margin-top: 5px;
        line-height: 24px;
      }
    }
  }

  .cart_right {
    flex: 0 0 105px;
    background: #2b333b;
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    margin-left: -1px;

    &.enough {
      background: #00b43c;
      color: #fff;
    }
  }

  .shopCart_list {
    position: absolute;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    transform: translateY(-100%);

    &.swipe-enter-active, &.swipe-leave-active {
      transition: transform 0.3s;
    }

    &.swipe-enter, &.swipe-leave-to {
      transform: translateY(0);
    }

    .header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 14px;
      color: #07111b;
      display: flex;
      align-items: center;

      .left_header {
        flex: 1;
      }

      .right_header {
        flex: 0 0 60px;
        text-align: center;
        color: #656b79;
        background-color: #f6f8fa;
        box-shadow: 0 0 1px #b8bbbf;
        border-radius: 4px;
        padding: 0 6px;
      }
    }

    .list_wrapper {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .lists {
        .food {
          padding: 10px 0;
          box-sizing: border-box;
          position: relative;
          border: none;

          &:not(:last-child)::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: rgba(7, 17, 27, 0.1);
          }

          &>span {
            line-height: 24px;
            font-size: 14px;
            color: #07111b;
          }

          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: #f01414;
          }

          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 40;
  backdrop-filter: blur(10px);
}
</style>