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
