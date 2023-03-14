<template>
  <div class="info_wrapper">
    <div class="info_content">
      <div class="info_item">
        <h2 class="title">配送信息</h2>
        <div class="delivery">
          <div class="content">
            <span class="icon">XX专送</span>
            <span
              >由商家配送提供配送，约{{ info.deliveryTime }}分钟送达，距离{{
                info.distance
              }}</span
            >
          </div>
          <div class="money">配送费￥{{ info.deliveryPrice }}</div>
        </div>
      </div>
      <div class="info_item">
        <h2 class="title">活动与服务</h2>
        <div class="activity">
          <ul class="activity_items">
            <li
              class="item"
              v-for="(item, index) in info.supports"
              :key="index"
            >
              <span class="icon" :class="supportClasses[item.type]">{{
                item.name
              }}</span>
              <span class="content">{{ item.content }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="info_item">
        <h2 class="title">商家实景</h2>
        <div class="scene">
          <ul class="imgs">
            <li class="img" v-for="(item, index) in info.pics" :key="index">
              <img :src="item" />
            </li>
          </ul>
        </div>
      </div>
      <div class="info_item">
        <h2 class="title">商家信息</h2>
        <div class="information">
          <ul class="detail">
            <li>
              <span class="bold">品类</span>
              <span>{{ info.category }}</span>
            </li>
            <li>
              <span class="bold">商家电话</span>
              <span>{{ info.phone }}</span>
            </li>
            <li>
              <span class="bold">地址</span>
              <span>{{ info.address }}</span>
            </li>
            <li>
              <span class="bold">营业时间</span>
              <span>{{ info.workTime }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "@better-scroll/core";
export default {
  data() {
    return {
      supportClasses: ["activity-green", "activity-red", "activity-orange"],
    };
  },
  computed: {
    ...mapState(["info"]),
  },
  watch: {
    info() {
      this.$nextTick(() => {
        this.infoScroll.refresh();
        this.picsScroll.refresh();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.infoScroll = new BScroll(".info_wrapper", {
        click: true,
      });
      this.picsScroll = new BScroll(".scene", {
        click: true,
        scrollX: true,
      });
    });
  },
};
</script>

<style lang="stylus" scoped>
.info_wrapper {
  position: absolute;
  top: 195px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .info_content {
    .info_item {
      padding: 16px 14px 14px;
      font-size: 16px;
      background-color: #fff;
      color: #666;
      border-bottom: 1px solid #eee;
      position: relative;

      &:not(:last-child) {
        margin-bottom: 16px;
      }

      .title {
        color: #000;
        font-weight: 700;
        line-height: 16px;
      }

      .delivery {
        margin-top: 16px;
        font-size: 13px;
        line-height: 18px;

        .content {
          .icon {
            width: 55px;
            font-size: 11px;
            margin-right: 10px;
            display: inline-block;
            text-align: center;
            color: #fff;
            background-color: #0097ff;
            padding: 1px 0;
            border-radius: 4px;
          }
        }

        .money {
          margin-top: 5px;
        }
      }

      .activity {
        .activity_items {
          margin-top: 16px;

          .item {
            margin-bottom: 12px;
            font-size: 13px;

            .icon {
              display: inline-block;
              border-radius: 2px;
              width: 36px;
              height: 18px;
              margin-right: 10px;
              color: #fff;
              font-size: 12px;
              text-align: center;
              line-height: 18px;

              &.activity-green {
                background-color: rgb(112, 188, 70);
              }

              &.activity-red {
                background-color: rgb(240, 115, 115);
              }

              &.activity-orange {
                background-color: rgb(241, 136, 79);
              }
            }
          }
        }
      }

      .scene {
        width: 100%;
        overflow: hidden;
        margin-top: 16px;
        white-space: nowrap;

        .imgs {
          display: inline-block;

          .img {
            margin-right: 6px;
            width: 120px;
            height: 90px;
            display: inline-block;

            &>img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .information {
        .detail {
          margin-bottom: -16px;
          &>li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: -10px;
            padding: 16px 12px 16px 0;
            line-height: 16px;
            position: relative;
            border: none;
            font-size: 13px;

            .bold {
              font-weight: 700;
              color: #333;
            }

            &::after {
              content: '';
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 1px;
              background-color: #ddd;
              transform scaleY(.5)
            }
          }
        }
      }
    }
  }
}
</style>