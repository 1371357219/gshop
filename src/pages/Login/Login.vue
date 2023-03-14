<template>
  <div class="Login clearfix">
    <div class="back" @click="back">
      <span class="iconfont icon-jiantou1"></span>
    </div>
    <div class="Login_container">
      <h2 class="title">硅谷外卖</h2>
      <div class="Login_header_select">
        <a
          href="javascript:;"
          @click="login_class = 'message'"
          :class="login_class === 'message' ? 'on' : ''"
          >短信登录</a
        >
        <a
          href="javascript:;"
          @click="login_class = 'password'"
          :class="login_class === 'password' ? 'on' : ''"
          >密码登录</a
        >
      </div>
      <form class="login_form" @submit.prevent="login">
        <div
          class="message_login"
          :class="login_class === 'message' ? 'on' : ''"
        >
          <div class="login_phone input_div">
            <input
              type="tel"
              maxlength="11"
              placeholder="手机号"
              v-model="phone"
            />
            <button
              :disabled="!rightPhone || !iswait"
              class="get_Verification"
              :class="{ right_phone: rightPhone && iswait }"
              @click.prevent="getCode"
            >
              {{ computeTime > 0 ? `已发送（${computeTime}s）` : "获取验证码" }}
            </button>
          </div>
          <div class="login_Verification input_div">
            <input
              type="text"
              maxlength="8"
              placeholder="验证码"
              v-model="code"
            />
          </div>
          <div class="login_hint">
            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
            <a href="javascript:;">《用户服务协议》</a>
          </div>
        </div>
        <div
          class="password_login"
          :class="login_class === 'password' ? 'on' : ''"
        >
          <div class="login_user input_div">
            <input type="text" placeholder="手机/邮箱/用户名" v-model="name" />
          </div>
          <div class="login_password input_div">
            <input
              v-if="!showPassword"
              type="password"
              placeholder="密码"
              v-model="pwd"
            />
            <input
              v-if="showPassword"
              type="text"
              placeholder="密码"
              v-model="pwd"
            />
            <div
              class="switch_password"
              @click="showPassword = !showPassword"
              :class="showPassword ? 'on' : ''"
            >
              <div
                class="switch_circle"
                :class="showPassword ? 'on' : ''"
              ></div>
            </div>
          </div>
          <div class="login_Verification input_div">
            <input type="text" placeholder="验证码" v-model="captcha" />
            <img
              ref="captcha"
              src="http://localhost:4000/captcha"
              alt="captcha"
              @click="getCaptcha"
              class="get_verification"
            />
          </div>
        </div>
        <input type="submit" value="登录" class="login_submit" />
      </form>
    </div>
    <a href="javascript:;" class="about_us">关于我们</a>
    <AlertTip
      :alertText="alertText"
      v-show="showAlert"
      @closeTip="
        showAlert = false;
        alertText = '';
      "
    >
    </AlertTip>
  </div>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue";
import { reqPwdLogin, reqSendCode, reqSmsLogin } from "../../api";
export default {
  name: "",
  data() {
    return {
      login_class: "message", //控制当前显示的是短信登录还是密码登录
      showPassword: false, // 是否显示密码
      iswait: true, //是否正在倒计时
      computeTime: 0, //验证码计时时间
      phone: "", //电话号码
      code: "", //短信验证码
      name: "", //用户名
      pwd: "", //密码
      captcha: "", // 验证码
      showAlert: false, //显示警告框
      alertText: "", //提示文本
    };
  },
  components: {
    AlertTip,
  },
  computed: {
    rightPhone: {
      // 当手机号输入正确时
      get() {
        return /^1\d{10}$/.test(this.phone);
      },
      set(newValue) {},
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 异步获取短信验证码
    async getCode() {
      // 启动倒计时
      if (!this.computeTime) {
        this.computeTime = 30;
        this.iswait = false;
        this.intervalCode = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            clearInterval(this.intervalCode);
            this.iswait = true;
          }
        }, 1000);

        // 发送ajax请求(向指定手机号发送验证码)
        const result = await reqSendCode(this.phone);
        if (result.code === 1) {
          // 显示提示
          this.showAlertFuc(result.msg);
          // 停止计时
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalCode);
          }
        }
      }
    },
    // 显示警告框
    showAlertFuc(text) {
      this.showAlert = true;
      this.alertText = text;
    },
    // 获取图片验证码
    getCaptcha() {
      this.$ref.captcha.src = "http://localhost:4000/captcha?time=" + Date.now();
    },
    // 异步登录
    async login() {
      let result;
      if (this.login_class === "message") {
        // 短信登录
        const { rightPhone, phone, code } = this;
        if (!rightPhone) {
          this.showAlertFuc("手机号不正确");
          return;
        } else if (!/^\d{6}$/.test(code)) {
          this.showAlertFuc("验证码必须6位数字");
          return;
        }
        result = await reqSmsLogin(phone, code);
      } else if (this.login_class === "password") {
        // 密码登录
        const { name, pwd, captcha } = this;
        if (!name) {
          this.showAlertFuc("用户名必须指定");
          return;
        } else if (!pwd) {
          this.showAlertFuc("密码必须指定");
          return;
        } else if (!captcha) {
          this.showAlertFuc("验证码必须指定");
          return;
        }
        result = await reqPwdLogin(name, pwd, captcha);
      }

      // 停止计时
      if (this.computeTime) {
        this.computeTime = 0;
        clearInterval(this.intervalCode);
      }
      // 返回结果数据处理
      if (result.code === 0) {
        const user = result.data;
        // 将user保存到vuex
        this.$store.dispatch('recordUser',user)
        // 去个人中心界面
        this.$router.replace('/profile')
      } else {
        const msg = result.msg;
        this.getCaptcha();
        this.showAlertFuc(msg);

      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.Login {
  position: relative;

  .back {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    font-size: 20px;
    color: #999;
  }

  .Login_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;

    h2.title {
      font-size: 40px;
      font-weight: bold;
      color: #02a774;
      text-align: center;
    }

    .Login_header_select {
      margin-top: 40px;
      margin-bottom: 10px;

      a {
        color: #333;
        font-size: 14px;
        padding-bottom: 4px;

        &:nth-child(1) {
          margin-right: 40px;
        }

        &.on {
          color: #02a774;
          font-weight: 700;
          border-bottom: 2px solid #02a774;
        }
      }
    }

    .login_form {
      width: 80%;

      .input_div {
        box-sizing: border-box;
        position: relative;
        margin-top: 10px;
        height: 48px;
        font-size: 14px;
        background: #fff;

        &>input {
          box-sizing: border-box;
          height: 100%;
          width: 100%;
          outline: none;
          border: 1px solid #ddd;
          padding-left: 10px;

          &:focus {
            border: 1px solid #02a774;
          }
        }
      }

      .message_login {
        display: none;

        &.on {
          display: block;
        }

        .login_phone {
          &>button.right_phone {
            color: #000;
          }

          .get_Verification {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            border: 0;
            color: #ccc;
            font-size: 14px;
            background: transparent;
          }
        }

        .login_hint {
          margin-top: 12px;
          color: #999;
          font-size: 14px;
          line-height: 20px;

          &>a {
            color: #02a774;
          }
        }
      }

      .password_login {
        display: none;

        &.on {
          display: block;
        }

        .login_password {
          position: relative;

          .switch_password {
            position: absolute;
            top: 50%;
            right: 10px;
            width: 40px;
            height: 16px;
            transform: translateY(-50%);
            border-radius: 8px;
            border: 1px solid #ddd;
            transition: background-color 0.3s;

            &.on {
              background: #02a774;
            }

            .switch_circle {
              position: absolute;
              top: 0;
              left: -2px;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 1px solid #ddd;
              transition: left 0.3s;
              background-color: #fff;

              &.on {
                left: calc(40px - 16px);
              }
            }
          }
        }

        .login_Verification {
          position: relative;

          .get_verification {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            border: 0;
            color: #ccc;
            font-size: 14px;
            background: transparent;
          }
        }
      }

      .login_submit {
        display: block;
        width: 100%;
        height: 42px;
        margin-top: 30px;
        border-radius: 4px;
        background: #4cd96f;
        color: #fff;
        text-align: center;
        font-size: 16px;
        line-height: 42px;
        border: 0;
      }
    }
  }

  .about_us {
    display: block;
    font-size: 12px;
    margin-top: 20px;
    text-align: center;
    color: #999;
  }
}
</style>