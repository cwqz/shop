<template>
  <div class="index">
    <div style="height: 20px; width: 100%"></div>
    <div class="index_one">
      <div
        v-for="(item, index) of orderItem"
        :key="index"
        class="index_one_item"
      >
        <div class="index_one_item_left">
          <div class="index_one_item_left_name">
            {{ item.name }}
          </div>
          <div class="index_one_item_left_number">
            {{ item.number }}
          </div>
        </div>
        <div class="index_one_item_right">
          <div :class="item.icon" class="index_one_item_right_icon" />
        </div>
      </div>
    </div>
    <div class="index_two">2222</div>
    <div class="index_two">3333</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderItem: [
        { name: "订单数量", number: "1234", icon: "el-icon-goods" },
        { name: "订单数量", number: "1234", icon: "el-icon-goods" },
        { name: "订单数量", number: "1234", icon: "el-icon-goods" },
        { name: "订单数量", number: "1234", icon: "el-icon-goods" },
      ],
    };
  },

  methods: {},
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home/index.css";
</style>
