<template>
  <div class="Profile">
    <header class="Profile_header">
      <span>我的</span>
    </header>
    <div class="profile_container">
      <div class="profile_login" @click="to_login">
        <div class="login_img">
          <span class="iconfont icon-yonghu"></span>
        </div>
        <div class="login_container">
          <div class="login_left">
            <span class="login_off" v-if="!userInfo.phone">{{
              userInfo._id || "登录/注册"
            }}</span>
            <div class="login_phone">
              <i class="iconfont icon-shouji"></i>
              <span>{{ userInfo.phone || "暂无绑定手机号" }}</span>
            </div>
          </div>
          <span class="iconfont icon-jiantou"></span>
        </div>
      </div>
      <div class="profile_accounts">
        <div class="balance accounts_list">
          <p><span class="balance_val">0.00</span>元</p>
          <span>我的余额</span>
        </div>
        <div class="coupon accounts_list">
          <p><span class="coupon_val">0</span>个</p>
          <span>我的优惠</span>
        </div>
        <div class="integral accounts_list">
          <p><span class="integral_val">0</span>分</p>
          <span>我的积分</span>
        </div>
      </div>
      <div class="profile_list">
        <ul class="profile_list_ul">
          <li class="list_li">
            <span class="iconfont icon-dingdan"></span>
            <div class="list_right">
              <span>我的订单</span>
              <span class="iconfont icon-jiantou"></span>
            </div>
          </li>
          <li class="list_li">
            <span class="iconfont icon-icon"></span>
            <div class="list_right">
              <span>积分商城</span>
              <span class="iconfont icon-jiantou"></span>
            </div>
          </li>
          <li class="list_li">
            <span class="iconfont icon-huiyuan"></span>
            <div class="list_right">
              <span>硅谷外卖会员卡</span>
              <span class="iconfont icon-jiantou"></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="other_list">
        <ul class="other_list_ul">
          <li class="list_li">
            <span class="iconfont icon-fuwu"></span>
            <div class="list_right">
              <span>服务中心</span>
              <span class="iconfont icon-jiantou"></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="outLogin" v-if="userInfo._id">
        <mt-button @click="out_login" size="large" type="danger"
          >退出登录</mt-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox,Toast} from "mint-ui";

export default {
  name: "Profile",
  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    to_login() {
      if (this.userInfo._id) {
        this.$router.push("/userinfo");
      } else {
        this.$router.push("/login");
      }
    },
    out_login() {
      MessageBox.confirm("确定执行此操作?").then((action) => {
        // 请求退出
        this.$store.dispatch('logout')
        Toast('退出登录');
      },action=>{

      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/minxin.styl';

.Profile {
  overflow: hidden;
}

.Profile_header {
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
  justify-content: center;
  user-select: none;
  font-size: 20px;
}

.profile_container {
  margin-top: 40px;

  .profile_login {
    display: flex;
    align-items: center;
    user-select: none;
    background: #02a774;
    padding: 20px 10px;
    border-top: 1px solid #f5f5f5;

    .login_img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      vertical-align: top;

      &>span {
        font-size: 66px;
        background-color: #e4e4e4;
      }
    }

    .login_container {
      display: flex;
      padding: 0 10px;
      width: calc(100% - 60px);
      justify-content: space-between;
      align-items: center;

      .login_left {
        .login_off {
          font-weight: 700;
          font-size: 18px;
          color: #fff;
        }

        .login_phone {
          font-size: 14px;
          color: #fff;
          margin-top: 10px;
        }
      }

      .icon-jiantou {
        color: #fff;
        font-size: 5px;
      }
    }
  }

  .profile_accounts {
    display: flex;
    justify-content: space-around;
    width: 100%;
    background: #fff;

    .accounts_list {
      width: 33%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #666;
      font-weight: 400;
      padding: 10px 20px;

      &:nth-child(1), &:nth-child(2) {
        border-right: 1px solid #f1f1f1;
      }

      &>p {
        padding: 10px 0;

        &>span {
          font-size: 30px;
          color: #f90;
          font-weight: 700;
          line-height: 30px;

          &.coupon_val {
            color: #ff5f3e;
          }

          &.integral_val {
            color: #6ac20b;
          }
        }
      }
    }
  }

  .profile_list {
    margin-top: 10px;
    background: #fff;

    .profile_list_ul {
      padding: 10px 10px 5px 10px;

      .list_li {
        display: flex;
        align-items: center;

        &>span {
          width: 20px;
          height: 20px;
          font-size: 20px;
          margin-right: 4px;

          &.icon-dingdan {
            color: #02a774;
          }

          &.icon-icon {
            color: #02a774;
          }

          &.icon-huiyuan {
            color: #f90;
          }
        }

        .list_right {
          display: flex;
          font-size: 16px;
          color: #333;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          width: calc(100% - 20px);
        }

        &:nth-child(1) .list_right, &:nth-child(2) .list_right {
          border-bottom: 1px solid #f1f1f1;
        }
      }
    }
  }

  .other_list {
    margin-top: 10px;
    background: #fff;

    .other_list_ul {
      padding: 0 10px;

      .list_li {
        display: flex;
        align-items: center;

        &>span {
          width: 20px;
          height: 20px;
          font-size: 20px;
          margin-right: 4px;

          &.icon-fuwu {
            color: #02a774;
          }
        }

        .list_right {
          display: flex;
          font-size: 16px;
          color: #333;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          width: calc(100% - 20px);
        }
      }
    }
  }

  .outLogin {
    margin-top: 10px;
  }
}
</style>