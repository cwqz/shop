<template>
  <div class="home" ref="init">
    <el-container>
      <el-aside class="home_aside">
        <common-aside />
      </el-aside>
      <el-main class="home_main">
        <home-header />
        <router-view :style="{ height: mainHeight + 'px' }" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import commonAside from "../components/commonAside";
import homeHeader from "../components/homeHeder";
export default {
  components: {
    commonAside,
    homeHeader,
  },
  data() {
    return {
      mainHeight: 0,
    };
  },
  mounted() {
    this.$nextTick(function () {
      let height = this.$refs.init.offsetHeight;
      this.mainHeight = height - 110;
    });
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  margin: 0;
}

.home_aside {
  width: 240px !important;
  height: 100%;
}

.home_main {
  width: 85%;
  background-color: #ffffff;
}
</style>
