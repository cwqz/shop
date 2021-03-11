<template>
  <div class="homeHeader">
    <!-- 面包屑、用户头像等 -->
    <div class="homeHeader_breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }" v-if="indexShow"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item
          v-for="(item, index) in breadList"
          :key="index"
          :to="item.path"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
      <div class="homeHeader_breadcrumb_right">
        <!-- 用户头像 -->
        <el-avatar
          shape="circle"
          :src="this.$store.state.currentUser.avatar"
          size="large"
          class="homeHeader_breadcrumb_right_img"
        />
        <!-- 用户信息 -->
        <el-dropdown class="homeHeader_breadcrumb_right_dropdown">
          <span class="el-dropdown-link">
            {{ this.$store.state.currentUser.username }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" @click.native="gotoPersonal()"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-pie-chart" @click.native="logout()"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="homeHeader_tags" v-if="showTags">
      <ul class="tags_ul">
        <li
          class="tags-li"
          v-for="(item, index) in tagsList"
          :class="{ active: isActive(item.path) }"
          :key="index"
        >
          <router-link :to="item.path" class="tags-li-title">
            <i class="el-icon-menu" v-if="item.name === '首页'" />
            {{ item.name }}
          </router-link>
          <span @click="closeTags(index)" v-if="item.name !== '首页'">
            <i class="el-icon-close" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 动态面包屑
      breadList: [],
      // 默认首页显示标志
      indexShow: true,
      // tabs标签
      tagsList: [],
      activeName: "first",
    };
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    },
  },
  watch: {
    // 监听路由
    $route(val) {
      this.getBreadList(val);
      this.setTags(val);
    },
  },
  created() {
    // 第一次进入页面时，修改tag的值
    this.setTags(this.$route);
  },
  methods: {
    // 动态面包屑
    getBreadList(val) {
      this.indexShow = false;
      const matched = val.matched.filter((item) => item.name);
      this.breadList = matched;
    },
    // 标签页
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      // 删除已关闭标签
      const delItem = this.tagsList.splice(index, 1)[0];
      // 已关闭标签的前一个标签
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/index");
      }
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some((item) => {
        return item.path === route.fullPath;
      });
      !isExist &&
        this.tagsList.push({
          path: route.fullPath,
          name: route.matched[1].name,
        });
    },
    // 跳转到个人中心页面
    gotoPersonal() {
      this.$router.push({ path: "/personalCenter" });
    },
    // 退出登录
    logout() {
      this.$confirm("此操作将退出系统，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      })
        .then(() => {
          this.deleteRequest("/workbench-system/main/logout").then((resp) => {
            if (resp) {
              window.sessionStorage.clear();
              this.$router.replace("/");
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消操作",
            type: "info",
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../assets/css/homeHeader.css";
</style>
<style>
.homeHeader_breadcrumb .el-breadcrumb {
  font-size: 15px;
  line-height: 4;
  padding-left: 2%;
}
.el-icon--right {
  margin: 0;
}
</style>