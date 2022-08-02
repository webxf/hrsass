<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="loginRules"
    >
      <!-- 放置标题图片 @是设置的别名-->
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="" />
        </h3>
      </div>
      <!-- 表单区域 -->
      <el-form-item prop="mobile">
        <i class="el-icon-user-solid svg-container"></i>
        <el-input
          placeholder="请输入手机号"
          v-model="loginForm.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <i class="svg-container">
          <svg-icon iconClass="password"></svg-icon>
        </i>
        <el-input
          placeholder="请输入密码"
          v-model="loginForm.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        class="loginBtn"
        @click="loginBtn"
        :loading="loading"
        >登录</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/index.vue'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '13800000002',
        password: '123456',
      },
      //表单校验
      loginRules: {
        //手机号校验
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/, //手机号正则校验
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        //密码校验
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // {
          //   pattern:
          //     /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/, //密码正则校验  至少有数字字母下划线，至少6位
          //   message: '密码请包含数字、字母、特殊字符，并且不能少于6位',
          //   trigger: 'blur',
          // },
        ],
      },
      loading: false,
    }
  },
  components: { SvgIcon },
  methods: {
    //绑定点击事件
    async loginBtn() {
      //通过try,catch来捕获表单验证是否是异常
      try {
        this.loading = true
        //拿到loginform上自带的validate，可以实现点击登录按钮，自动校验input框是否异常
        await this.$refs.loginForm.validate()
        //通过传入请求回来的数据，传到user里面
        await this.$store.dispatch('user/getToken', this.loginForm)
        this.$router.push('/')
        this.$message.success('登录成功')
      } finally {
        //点击登录后，最后让loading为false
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe;
$cursor: #68b0fe;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  overflow: hidden;
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
::v-deep .el-form-item__content {
  height: 52px;
}
::v-deep .el-form-item__error {
  color: #fff;
}
</style>
