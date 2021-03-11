<template>
  <el-menu
    background-color="#000e2B"
    text-color="#fff"
    active-text-color="#fff"
    :default-active="$route.path"
    :unique-opened="true"
    class="menu"
    router
  >
    <div class="menu_logo">
      <img src="../assets/images/logo.png" class="menu_logo_img" />
      <h1 class="menu_logo_title">一体化云平台</h1>
    </div>
    <div v-for="(item, index) in menus1" :key="index">
      <el-submenu
        :index="item.path"
        v-if="item.children.length > 0 && !item.hidden"
      >
        <template slot="title">
          <i :class="item.icon" />
          <span slot="title">{{ item.name }}</span>
        </template>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, indexj) in item.children"
          :key="indexj"
        >
          <i :class="subItem.icon" />
          <span slot="title">{{ subItem.name }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item :index="item.path" v-else>
        <i :class="item.icon" />
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
export default {
  computed: {
    menus1() {
      return this.$store.state.routes;
    },
  },
};
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  overflow: hidden;
}

.menu_logo {
  width: 100%;
  height: 74px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(to right, #081f53, #2257a0);
}

.menu_logo_img {
  width: 38px;
  height: 38px;
  margin: 0px 10px 0 25px;
}

.menu_logo_title {
  font-size: 24px;
  font-family: "Microsoft YaHei";
  line-height: 74px;
  color: white;
}
</style>
<style>
.menu .el-menu {
  border: none;
}
.el-menu-item.is-active {
  background-color: rgba(50, 108, 158, 0.4) !important;
}
.menu .iconfont {
  font-size: 15px;
  color: white !important;
  margin-right: 3%;
}
</style>
