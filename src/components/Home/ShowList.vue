<template>
  <div class="shoplist">
    <ul class="shop_list_ul">
      <li
        class="shop_listitem"
        v-for="(value, index) in shopLists"
        :key="index"
        @click="$router.push('/shop')"
      >
        <div class="item_left">
          <div class="shop_img">
            <img :src="imgBaseUrl + value.image_path" />
          </div>
          <div class="shop_details">
            <div class="shop_title">
              <span class="title">{{ value.name }}</span>
            </div>
            <div class="sale_details">
              <span>{{ value.rating }}</span>
              <span>月售{{ value.recent_order_num }}单</span>
              
              <Star :rating="value.rating" :size="24"/>
            </div>
            <span>￥{{value.float_minimum_order_amount}}起送/配送费约￥5</span>
          </div>
        </div>
        <div class="item_right">
          <ul class="shop_detail_ul">
            <li class="supports">保</li>
            <li class="supports">准</li>
            <li class="supports">票</li>
          </ul>
          <div class="shop_brand">XX专送</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Star from '../Star/Star.vue'
export default {
  name: "showlist",
  data() {
    return {
      imgBaseUrl: 'http://cangdu.org:8001/img/',
    };
  },
  props: ["shopLists"],
  components:{
    Star
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/minxin.styl';

.shoplist {
  user-select: none
  .shop_list_ul {
    padding: 10px;

    .shop_listitem {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;

      .item_left {
        display: flex;

        .shop_img {
          width: 75px;
          height: 75px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .shop_details {
          display: flex;
          margin-left: 5px;
          flex-direction: column;
          justify-content: space-between;
          font-size: 12px;
          color: #666;

          .shop_title {
            .title {
              color: #333;
              font-size: 16px;
              line-height: 16px;
              font-weight: 700;

              &::before {
                content: '品牌';
                display: inline-block;
                font-size: 11px;
                line-height: 11px;
                color: #333;
                background-color: #ffd930;
                padding: 2px 2px;
                border-radius: 2px;
                margin-right: 5px;
              }
            }
          }

          .sale_details {
            span:nth-child(1) {
              font-size: 10px;
              color: #ff6000;
              margin-left: 4px;
            }

            &>span:nth-child(2) {
              font-size: 10px;
              color: #666;
              margin-left: 4px;
              transform: scale(0.8);
            }

            .stars {
              margin-left 4px
            }
          }
        }
      }

      .item_right {
        .shop_detail_ul {
          display: flex;

          .supports {
            font-size: 10px;
            color: #999;
            border: 1px solid #f1f1f1;
            padding: 0 2px;
            border-radius: 2px;
            margin-bottom: 15px;
          }
        }

        .shop_brand {
          color: #02a774;
          border: 1px solid #02a774;
          transform: scale(0.7);
          display: inline-block;
          font-size: 12px;
          padding: 1px;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>