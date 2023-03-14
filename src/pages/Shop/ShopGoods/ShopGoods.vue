<template>
  <div class="goods">
    <div class="goods_left_wrapper">
      <ul class="left_nav">
        <li
          class="nav_item"
          v-for="(v, i) in goods"
          :key="i"
          @click="nav_click(i)"
          :class="currentIndex === i ? 'on' : ''"
        >
          <img v-if="v.icon" :src="v.icon" />
          <span>{{ v.name }}</span>
        </li>
      </ul>
    </div>
    <div class="goods_right_wrapper" ref="goods_right_wrapper">
      <ul class="right_foods">
        <li class="food_item" v-for="(v1, k1) in goods" :key="k1">
          <h2 class="title">{{ v1.name }}</h2>
          <ul class="food_type_items">
            <li v-for="(v2, k2) in v1.foods" :key="k2" @click="food_click(v2)" class="type_item">
              <div class="type_item_icon">
                <img :src="v2.icon" />
              </div>
              <div class="type_item_content">
                <h2 class="title">{{ v2.name }}</h2>
                <span class="desc">{{ v2.description }}</span>
                <div class="extra">
                  <span>月售{{ v2.sellCount }}份</span>
                  <span>好评率{{ v2.rating }}%</span>
                </div>
                <div class="price">
                  <span>￥{{ v2.price }}</span>
                </div>
                <div class="cartcontrol_wrapper">
                  <CartControl  :food="v2"/>
                 
                </div>
                
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <Food :food="food" ref="food"/>
    <ShopCart/>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import { mapActions, mapState } from "vuex";
import Food from '../../../components/Shop/Food.vue'
import ShopCart from '../../../components/Shop/ShopCart.vue'
import CartControl from "../../../components/Shop/CartControl.vue";
export default {
  data() {
    return {
      scrollY: 0, //右侧滑动的y坐标
      tops: [], // 所有右侧分类li标签的top所组成数组
      food: {},
    };
  },
  computed: {
    ...mapState(["goods"]),
    currentIndex() {
      const { scrollY, tops } = this;
      
      return tops.findIndex((top, index) => {
        return top <= scrollY && tops[index + 1] > scrollY;
      });
    },
  },
  watch: {
    goods(newQuestion, oldQuestion) {
      // 在组件实例创建时会立即调用
      this.$nextTick(() => {
        new BScroll(".goods_left_wrapper", {
          click: true,
        });
        this.foodsScroll = new BScroll(".goods_right_wrapper", {
          probeType: 3,
          click: true,
        });
        this.foodsScroll.on("scroll", (event)=> {
          this.scrollY = Math.abs(event.y);
        });
        this.foodsScroll.on("scrollEnd", (event)=> {
          this.scrollY = Math.abs(event.y);
        });
        this.init_tops();
      });
    },
  },
  components: { CartControl ,Food ,ShopCart},
  methods: {
    ...mapActions(["getShopGoods"]),
    // 得到右边各分类列表的y坐标数组
    init_tops() {
      const tops = [];
      let top = 0;
      tops.push(top);
      const lis =
        this.$refs.goods_right_wrapper.getElementsByClassName("food_item");
      const lis_arr = Array.prototype.slice.call(lis);

      lis_arr.forEach((li) => {
        top += li.clientHeight;
        tops.push(top);
      });
      this.tops = tops;
    },
    // 左侧nav点击事件
    nav_click(index) {
      // 立即更新scrollY, 立即让currentIndex重新计算
      this.scrollY = this.tops[index];
      this.foodsScroll.scrollTo(0, -this.tops[index], 200);
    },
    // 右侧食物点击事件
    food_click(val){
  
      this.food=val
      // 触发food组件的事件控制显示与否
      this.$refs.food.showToggle()
    }
  },
  mounted() {
    this.getShopGoods();
  },
};
</script>

<style lang="stylus" scoped>
.goods {
  position: absolute;
  top: 196px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;
  display: flex;

  .goods_left_wrapper {
    height: 100%;
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .left_nav {
      .nav_item {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        height: 54px;
        font-size: 12px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        vertical-align: middle;

        &.on {
          background: #fff;
          color: #02a774;
        }

        &>img {
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
        }

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 80%;
          height: 1px;
          background-color: rgba(7, 17, 27, 0.1);
          transform: scaleY(0.5) translateX(-50%);
        }
      }
    }
  }

  .goods_right_wrapper {
    height: 100%
    flex: 1;

    .right_foods {
      .food_item {
        &>.title {
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          color: #93999f;
          background: #f3f5f7;
        }

        .food_type_items {
          .type_item {
            display: flex;
            position: relative;
            padding: 8px 10px 18px 10px;

            &:not(:last-child)::after {
              content: '';
              position: absolute;
              display: block;
              width: 100%;
              height: 1px;
              background-color: rgba(7, 17, 27, 0.1);
              bottom: 0;
              left: 0;
            }

            .type_item_icon {
              flex: 0 0 57px;
              height: 57px;
              margin-right: 10px;

              &>img {
                width: 100%;
                height: 100%;
              }
            }

            .type_item_content {
              flex: 1;
              font-size: 10px;
              color: #93999f;
              position: relative;

              .title {
                margin: 2px 0 8px 0;
                height: 14px;
                line-height: 14px;
                font-size: 14px;
                color: #07111b;
              }

              .desc {
                display: inline-block;
                margin-bottom: 8px;
              }

              .extra {
                margin-bottom: 8px;

                &>span:nth-child(1) {
                  margin-right: 10px;
                }
              }

              .price {
                margin-right: 8px;
                font-size: 14px;
                color: #f01414;
              }

              .cartcontrol_wrapper {
                position: absolute;
                right: 0;
                bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>