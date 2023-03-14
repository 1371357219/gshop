<template>
  <div class="shop_header">
    <div class="shop_nav" :style="{ backgroundImage: `url(${info.bgImg})` }">
      <span @click="$router.back()" class="iconfont icon-jiantou1"></span>
    </div>
    <div class="shop_content clearfix" @click="show_information">
      <img class="content_img" :src="info.avatar" />
      <div class="content_content">
        <h2 class="content_title">
          <span class="content_title_container">
            <span class="content_tag_container">
              <span class="content_tag">品牌</span>
            </span>

            <span class="content_name">{{ info.name }}</span>
          </span>
          <span class="content_icon"></span>
        </h2>
        <div class="shop-message">
          <span class="shop-message-detail">{{ info.score }}</span>
          <span class="shop-message-detail">月售{{ info.sellCount }}单</span>
          <span class="shop-message-detail">
            XX专送
            <span>约{{ info.deliveryTime }}分钟</span>
          </span>
          <span class="shop-message-detail">距离{{ info.distance }}</span>
        </div>
      </div>
    </div>
    <div class="shop_discound" @click="show_discound" v-if="info.supports">
      <div class="discound_left">
        <span class="content_tag">
          <span class="tag">首单</span>
        </span>
        <span class="content_activity ellipsis">{{
          info.supports[0].content
        }}</span>
      </div>
      <div class="discound_right">
        <span>{{ info.supports.length }}个优惠</span>
      </div>
    </div>

    <div class="shop_header_information" v-show="information_show">
      <div class="information_container">
        <span class="content_title_container">
          <span class="content_tag_container">
            <span class="content_tag">品牌</span>
          </span>

          <span class="content_name">{{ info.name }}</span>
        </span>
        <div class="content_details">
          <div class="score">
            <span>{{ info.score }}</span>
            <span>评分</span>
          </div>
          <div class="sellCount">
            <span>{{ info.sellCount }}单</span>
            <span>月售</span>
          </div>
          <div class="deliveryTime">
            <span>XX专送</span>
            <span>约{{ info.deliveryTime }}分钟</span>
          </div>
          <div class="deliveryPrice">
            <span>{{ info.deliveryPrice }}元</span>
            <span>配送费用</span>
          </div>
          <div class="distance">
            <span>{{ info.distance }}</span>
            <span>距离</span>
          </div>
        </div>
        <div class="announcement">
          <h2 class="title">公告</h2>
          <p>{{ info.bulletin }}</p>
        </div>
        <div class="close" @click="show_information">
          <span>&#935;</span>
        </div>
      </div>
    </div>
    <transition name="move">
      <div class="shop_header_discound" v-show="discound_show">
        <div class="content">
          <h2 class="title">优惠活动</h2>
          <ul class="discounds_container">
            <li v-for="(val, key) in info.supports" :key="key">
              <span :class="supportClasses[val.type]">{{ val.name }}</span>
              <span>{{ val.content }}</span>
            </li>
          </ul>
          <div class="close" @click="show_discound">
            <span>&#935;</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      supportClasses: ["activity-green", "activity-red", "activity-orange"],
      information_show: false,
      discound_show: false,
    };
  },
  computed: {
    ...mapState(["info"]),
  },
  methods: {
     
    show_information() {
      this.information_show = !this.information_show;
    },
    show_discound() {
      this.discound_show = !this.discound_show;
    },
  },
  
};
</script>

<style lang="stylus" scoped>
.shop_header {
  background: #fff;
}

.shop_header_discound {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.43);
  box-shadow: 0 -1px 5px 0 rgb(0 0 0 / 40%);
  z-index: 999;
  transition: transform 0.2s, -webkit-transform 0.2s;
  will-change: transform;
  color: #333;

  &.move-enter-active, &.move-leave-active {
    transition: opacity .5s ease;
  }

  &.move-enter-from, &.move-leave-to {
    opacity: 0;
  }

  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 30px;
    background-color: #fff;

    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      font-weight: 800;
      font-size: 26px;
    }

    .title {
      text-align: center;
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 600;
    }

    .discounds_container {
      font-size: 16px;
      height: 160px;
      overflow-y: auto;

      &>li {
        font-size: 13px;
        display: flex;
        margin-bottom: 12px;
        align-items: center;

        &>span:nth-child(1) {
          margin-right: 6px;
          background-color: red;
          padding: 2px 4px;
          border-radius: 4px;
          color: #fff;

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
}

.shop_header_information {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.43);
  z-index: 999;

  .information_container {
    background-color: #fff;
    width: 80%;
    position: relative;
    padding: 25px 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content_title_container {
      position: relative;
      font-size: 20px;

      .content_tag_container {
        position: relative;
        display: inline-block;
        background-image: linear-gradient(90deg, #fff100, #ffe339);
        width: 36px;
        height: 18px;
        margin-right: 10px;

        .content_tag {
          position: absolute;
          font-size: 24px;
          white-space: nowrap;
          font-weight: 600;
          top: 50%;
          left: 50%;
          color: #6a3709;
          transform: scale(0.5) translateX(-50%) translateY(-25%);
          transform-origin: 0 0;
        }
      }

      .content_name {
        font-weight: 700;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .content_details {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      text-align: center;
      width: 100%;
      white-space: nowrap;

      &>div {
        display: flex;
        flex-direction: column;
        flex: 1;

        &>span:nth-child(1) {
          font-size: 15px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        &>span:nth-child(2) {
          font-size: 12px;
          color: #999;
        }
      }
    }

    .announcement {
      .title {
        position: relative;
        text-align: center;
        margin: 15px auto 15px;
        width: 85px;
        background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
        background-size: 100% 1px;
        background-position: 50%;
        background-repeat: no-repeat;
        font-size: 12px;
        padding: 0 6px;
        color: #999;
        background-color: #fff;
      }

      &>p {
        font-size: 13px;
        line-height: 1.54;
        color: #333;
        overflow-y: auto;
      }
    }

    .close {
      position: absolute;
      bottom: -60px;
      padding: 6px;
      left: 50%;
      border-radius: 50%;
      transform: translateX(-50%);
      border: 1px solid rgba(255, 255, 255, 0.7);
      color: rgba(255, 255, 255, 0.7);
      user-select: none;
    }
  }
}

.shop_nav {
  position: relative;
  height: 40px;
  padding: 5px 10px;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 20px;
  color: #fff;

  &>span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}

.shop_content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 20px 5px 20px;
  background: #fff;

  .content_img {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 66px;
    height: 66px;
  }

  .content_title {
    display: flex;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    white-space: nowrap;
    position: relative;
    justify-content: center;
    align-items: center;

    .content_title_container {
      position: relative;

      .content_tag_container {
        position: relative;
        display: inline-block;
        background-image: linear-gradient(90deg, #fff100, #ffe339);
        width: 36px;
        height: 18px;
        margin-right: 10px;

        .content_tag {
          position: absolute;
          font-size: 24px;
          font-weight: 600;
          top: 50%;
          left: 50%;
          color: #6a3709;
          transform: scale(0.5) translateX(-50%) translateY(-25%);
          transform-origin: 0 0;
        }
      }

      .content_name {
        font-weight: 700;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .content_icon {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 16px;

      &::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 2px;
        border: 6px solid;
        border-color: transparent transparent transparent rgba(0, 0, 0, 0.67);
      }
    }
  }

  .shop-message {
    margin-top: 10px;
    white-space: nowrap;
    height: 12px;
    text-align: center;
    font-size: 11px;
    color: #333;

    &>span {
      margin-right: 6px;
    }
  }
}

.shop_discound {
  display: flex;
  background: #fff;
  border-radius: 1px;
  border: 1px solid #eee;
  background: #fff;
  padding: 5px 6px;
  margin: 0 30px;
  font-size: 11px;
  color: #666;
  justify-content: center;
  align-items: center;

  .discound_left {
    display: flex;
    flex: 1;
    overflow: hidden;

    .content_tag {
      width: 25px;
      height: 13px;
      margin-right: 5px;
      color: #fff;
      font-style: normal;
      font-weight: 700;
      position: relative;
      background-color: #70bc46;
      box-sizing: border-box;

      .tag {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 18px;
        transform-origin: 0 0;
        transform: scale(0.5) translateX(25%) translateY(25%);
        white-space: nowrap;
      }
    }
  }

  .discound_right {
    flex-shrink: 0;
    width: 60px;
    text-align: right;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      display: block;
      border: 6px solid;
      border-color: rgba(0, 0, 0, 0.57) transparent transparent transparent;
      right: 0;
      top: 0;
      transform: translateX(105%) translateY(25%);
    }
  }
}
</style>