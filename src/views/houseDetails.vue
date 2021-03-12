<template>
  <el-container class="container">
    <el-header class="header">
      <div class="header_all">
        <div class="header_title">欢迎来到星期天酒店！</div>
        <div class="header_menu">
          <router-link :to="{ name: 'login' }">登录</router-link>
          <el-divider direction="vertical" />
          <router-link :to="{ name: 'register' }">免费注册</router-link>
          <el-divider direction="vertical" />
          <router-link
            :to="{ name: 'personalCenter' }"
            class="el-icon-user-solid"
            >个人中心</router-link
          >
          <el-divider direction="vertical" />
          <router-link :to="{ name: 'login' }" class="el-icon-s-claim"
            >商家中心</router-link
          >
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <!-- 搜索框 -->
      <div class="main_search">
        <img
          class="search_img"
          src="../assets/images/logo.png"
          @click="back()"
        />
        <div class="serach_all">
          <div class="main_search_input">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="入住时间"
              end-placeholder="离店时间"
            />
            <el-button
              class="search_btn"
              icon="el-icon-search"
              @click="searcHouse()"
              >搜索</el-button
            >
          </div>
        </div>
      </div>
      <el-divider class="divider" />
      <!-- 内容展示 -->
      <div class="product">
        <div class="product_details">
          <div class="product_details_img">
            <img :src="this.detailsData.img" class="product_details_img_item" />
          </div>
          <div class="product_details_message">
            <p style="color: #606266; font-size: 20px; font-weight: 500">
              {{ this.detailsData.title }}
            </p>
            <p>可入住人数：{{ this.detailsData.peopleNum }}</p>
            <p>标准价格(￥)：{{ this.detailsData.price }}</p>
            <p>会员价格(￥)：{{ this.detailsData.memberPrice }}</p>
            <p>房间号：{{ this.detailsData.position }}</p>
            <p>描述：{{ this.detailsData.description }}</p>
            <el-button
              type="danger"
              size="small"
              round
              icon="el-icon-folder-checked"
              @click="createOrder"
              >立即预订</el-button
            >
          </div>
        </div>
        <div class="contact">
          <el-tooltip
            class="contact_item"
            effect="dark"
            content="1776857122"
            placement="left"
          >
            <img src="../assets/images/QQ.png" alt="QQ" />
          </el-tooltip>
          <el-tooltip
            class="contact_item"
            effect="dark"
            content="18192180979"
            placement="left"
          >
            <img src="../assets/images/wechart.png" alt="微信" />
          </el-tooltip>
          <el-tooltip
            class="contact_item"
            effect="dark"
            content="19802928252"
            placement="left"
          >
            <img src="../assets/images/phone.png" alt="电话" />
          </el-tooltip>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-main>
    <el-footer class="footer">
      <el-divider class="divider" />
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      // 详情
      detailsData: {},
      dialogVisible: false,
    };
  },
  created() {
    this.detailsData = JSON.parse(decodeURIComponent(this.$route.query.obj));
    console.log(this.detailsData);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    createOrder() {
      if (this.$store.state.currentUser === null) {
        this.$router.replace("/login");
      } else {
        this.dialogVisible = true;
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less">
@import "../assets/css/publicHome.css";
</style>
<style >
.el-range-editor.el-input__inner {
  height: 100%;
  border-radius: 0;
  border: solid 2px #dd4545;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>