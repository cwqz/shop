<template>
  <div class="login">
    <el-form
      :model="sysUserLogin"
      :rules="rules"
      ref="loginForm"
      class="loginContainer"
    >
      <h4 class="loginContainer-h3">用户登录</h4>
      <el-form-item prop="username">
        <el-input
          v-model="sysUserLogin.username"
          type="text"
          placeholder="输入用户名"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-user"
            style="font-size: 20px; margin: 0 2px"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="sysUserLogin.password"
          type="password"
          placeholder="输入密码"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-key"
            style="font-size: 20px; margin: 0 2px"
          />
        </el-input>
      </el-form-item>
      <el-button
        type="primary"
        class="loginContainer-button"
        @click.native.prevent="submitLogin()"
        @keyup.enter.native="submitLogin()"
      >
        登录
      </el-button>
      <el-link
        class="loginContainer-register"
        type="primary"
        @click="register()"
        >注册</el-link
      >
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sysUserLogin: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    var _self = this;
    document.onkeydown = function (e) {
      var key;
      if (window.event == undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key == 13 || key == 100) {
        _self.submitLogin();
      }
    };
  },
  methods: {
    // 提交信息，登录后进入首页
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.postKeyValueRequest("/login", this.sysUserLogin).then((resp) => {
            if (resp.code === 200) {
              this.$store.commit("INIT_CURRENTHR", resp.data);
              window.sessionStorage.setItem("token", JSON.stringify(resp.data));
              this.$router.replace("/index");
            }
          });
        } else {
          return this.$message.error(resp.message);
        }
      });
    },
    // 注册用户
    register() {
      this.$router.replace("/register");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/login.css";
</style>