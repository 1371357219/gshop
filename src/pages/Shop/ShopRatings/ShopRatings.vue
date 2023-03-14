<template>
  <div class="ratings_wrapper">
    <div class="wrapper">
      <div class="header">
        <div class="left_header">
          <span class="score">{{ info.score }}</span>
          <span class="title">综合评分</span>
          <span class="rank">高于周边商家{{ info.rankRate }}%</span>
        </div>
        <div class="right_header">
          <div class="service_grade">
            <span class="">服务态度</span>
            <Star :rating="info.serviceScore" :size="36" />
            <span class="score">{{ info.serviceScore }}</span>
          </div>
          <div class="shop_grade">
            <span class="">商品评分</span>
            <Star :rating="info.foodScore" :size="36" />
            <span class="score">{{ info.foodScore }}</span>
          </div>
          <div class="delivery_time">
            <span>送达时间</span>
            <span>{{ info.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content_header">
          <div class="selects">
            <div
              class="select"
              :class="SelectType == 2 ? 'active' : ''"
              @click="setSelectType(2)"
            >
              <span>全部</span>
              <span class="count">{{ ratings.length }}</span>
            </div>
            <div
              class="select"
              :class="SelectType == 0 ? 'active' : ''"
              @click="setSelectType(0)"
            >
              <span>满意</span>
              <span class="count">
                {{ satisfiedLength }}
              </span>
            </div>
            <div
              class="select"
              :class="SelectType == 1 ? 'active' : ''"
              @click="setSelectType(1)"
            >
              <span>不满意</span>
              <span class="count">
                {{ ratings.length - satisfiedLength }}
              </span>
            </div>
          </div>
          <div class="check_content " :class="switch_content?'on':''" @click="switch_content=!switch_content">
            <span class="iconfont icon-check-circle-fill"></span>
            <span class="title">只看有内容的评价</span>
          </div>
        </div>
        <div class="rating_container">
          <ul class="ratings">
            <li
              class="rating_item"
              v-for="(rating, index) in ratings_select"
              :key="index"
            >
              <div class="avatar">
                <img :src="rating.avatar" />
              </div>
              <div class="content">
                <h1 class="name">{{ rating.username }}</h1>
                <div class="star_container">
                  <Star :rating="rating.score" :size="24" />
                  <span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分前</span>
                </div>
                <p class="text">{{ rating.text }}</p>
                <div class="recommend">
                  <span class="iconfont icon-icon-thumb_up"></span>
                  <span
                    v-for="(item, index1) in rating.recommend"
                    :key="index1"
                    class="item"
                    >{{ item }}</span
                  >
                </div>
                <div class="time">{{ rating.rateTime|dateString }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BScroll from "@better-scroll/core";
import Star from "../../../components/Star/Star.vue";
export default {
  data() {
    return {
      SelectType: 2,
      
      switch_content: true,
    };
  },
  components: {
    Star,
  },
  computed: {
    ...mapState(["ratings", "info"]),
    satisfiedLength() {
      return this.ratings.filter((item) => item.rateType === 0).length;
    },
    ratings_select() {
      const {switch_content}=this
      switch (this.SelectType) {
        case 0:
          return this.ratings.filter(
            (item) => item.rateType == 0&&(!switch_content||item.text.length)
          );
           
        case 1:
          return this.ratings.filter(
            (item) => item.rateType == 1&&(!switch_content||item.text.length)
          );
           
        case 2:
          return this.ratings.filter(
            (item)=>(!switch_content||item.text.length)
          );
          
      }
    },
  },
  watch: {
    ratings_select(newvalue) {
      this.$nextTick(() => {
        new BScroll(".ratings_wrapper", {
          click: true,
        });
      });
    },
  },
  methods: {
    ...mapActions(["getShopRatings"]),
    setSelectType(type) {
      this.SelectType = type;
    },
  },
  mounted() {
    this.getShopRatings();
  },
};
</script>

<style lang="stylus" scoped>
.ratings_wrapper {
  position: absolute;
  top: 195px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .wrapper {
    .header {
      padding: 18px 0;
      display: flex;
      margin-bottom: 16px;
      background: #fff;

      .left_header {
        display: flex;
        flex: 0 0 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        flex-direction: column;
        align-items: center;

        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: #f90;
        }

        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: #07111b;
        }

        .rank {
          line-height: 10px;
          font-size: 10px;
          color: #93999f;
        }
      }

      .right_header {
        flex: 1;
        padding: 0px 0 6px 24px;

        &>div {
          margin-bottom: 8px;

          &>span {
            line-height: 18px;
            vertical-align: top;
            font-size: 12px;
            color: #07111b;

            &.score {
              color: #f90;
            }
          }

          .stars {
            margin: 0 12px;
          }
        }

        .delivery_time {
          &>span:nth-child(2) {
            margin-left: 12px;
            font-size: 12px;
            color: #93999f;
          }
        }
      }
    }

    .content {
      background: #fff;

      .content_header {
        .selects {
          display: flex;
          padding: 18px;

          .select {
            padding: 8px 12px;
            margin-right: 8px;
            line-height: 16px;
            border-radius: 1px;
            font-size: 12px;
            color: #4d555d;
            background: rgba(77, 85, 93, 0.2);

            &.active {
              background: #02a774;
              color: #fff;
            }

            .count {
              margin-left: 2px;
            }
          }
        }

        .check_content {
          padding: 12px 18px;
          line-height: 24px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          color: #93999f;

          &>span:nth-child(1) {
            vertical-align: top;
            display: inline-block;
            vertical-align: top;
            margin-right: 4px;
            font-size: 22px;
          }

          &.on>span:nth-child(1) {
            color: #02a774;
          }

          &>span:nth-child(2) {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
          }
        }
      }

      .rating_container {
        padding: 0 18px;

        .ratings {
          .rating_item {
            display: flex;
            padding: 18px 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);

            .avatar {
              flex: 0 0 28px;
              margin-right: 12px;

              &>img {
                width: 100%;
                height: 28px;
              }
            }

            .content {
              flex: 1;
              position: relative;

              .name {
                margin-bottom: 4px;
                line-height: 12px;
                font-size: 10px;
                color: #07111b;
              }

              .star_container {
                margin-bottom: 6px;

                .stars {
                  margin-right: 6px;
                  vertical-align: top;
                }

                .delivery {
                  line-height: 12px;
                  font-size: 10px;
                  color: #93999f;
                }
              }

              .text {
                margin-bottom: 8px;
                line-height: 18px;
                color: #07111b;
                font-size: 12px;
              }

              .recommend {
                .icon-icon-thumb_down {
                  color: #93999f;
                }

                .icon-icon-thumb_up {
                  color: #f5a100;
                }

                &>span {
                  display: inline-block;
                  margin: 0 8px 4px 0;
                  font-size: 9px;

                  &.item {
                    padding: 2px 6px;
                    border: 1px solid rgba(7, 17, 27, 0.1);
                    border-radius: 1px;
                    color: #93999f;
                    background: #fff;
                  }
                }
              }

              .time {
                position: absolute;
                top: 0;
                right: 0;
                line-height: 12px;
                font-size: 10px;
                color: #93999f;
              }
            }
          }
        }
      }
    }
  }
}
</style>