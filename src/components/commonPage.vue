<template>
  <div class="page">
    <el-pagination
      :current-page="this.current"
      :page-size="this.pageSize"
      :page-sizes="[10, 20, 30, 40, 50]"
      layout="total,sizes,prev,pager,next,jumper"
      :total="this.total"
      @current-change="changerCurrent"
      @size-change="changeSize"
    />
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
    },
    current: {
      type: Number,
    },
    pageSize: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    //   页码改变
    changerCurrent(val1) {
      this.$emit("currentChange", val1);
    },
    // 每页条数改变
    changeSize(val2) {
      this.$emit("sizeChange", val2);
    },
  },
};
</script>
<style>
.page {
  width: 100%;
  height: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
</style>