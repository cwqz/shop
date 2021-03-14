<template>
  <div class="role">
    <div class="operation">
      <el-form :inline="true" :model="orderForm" class="demo-form-inline" style="margin-top:25px">
        <el-form-item label="订单编号">
          <el-input v-model="orderForm.oderId" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  size="small" icon="el-icon-search"  @click="searchOrder()" >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="orderTable"
      border
      height="86%"
      style="width: 100%"
      v-loading="loading"
      :header-cell-style="{ 'text-align': 'center', background: '#f1f2f6' }"
      :cell-style="{ 'text-align': 'center', padding: 6 + 'px' }"
      :row-style="{ height: 45 + 'px' }"
    >
      <el-table-column label="序号" type="index" width="80">
        <template scope="scope">
          <span>{{ (page_current - 1) * page_size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" prop="orderId" width="180"/>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          <span v-if="scope.row.payType === 0">支付宝</span>
          <span v-if="scope.row.payType === 1">微信</span>
          <span v-if="scope.row.payType === 2">银行卡</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">预定</span>
          <span v-if="scope.row.status === 1">取消订单</span>
          <span v-if="scope.row.status === 2">入住</span>
          <span v-if="scope.row.status === 3">退房</span>
        </template>
      </el-table-column>
      <el-table-column prop="transactionAmount" label="金额"  />
      <el-table-column prop="createTime" label="下单日期"  :formatter="formatDate" width="180"/>
      <el-table-column prop="inTime" label="入住日期"  :formatter="formatDate" width="180"/>
      <el-table-column prop="outTime" label="离店日期"  :formatter="formatDate" width="180"/>
      <el-table-column prop="note" label="备注" show-overflow-tooltip width="160"/>
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="updateOrderStatus(scope.row.id, 2)" v-if="scope.row.status === 0">办理入住</el-button>
          <el-button type="text" size="mini" v-else :disabled="true">办理入住</el-button>
          <el-button type="text" size="mini" @click="updateOrderStatus(scope.row.id, 3)" v-if="scope.row.status === 2">办理退房</el-button>
          <el-button type="text" size="mini" v-else :disabled="true">办理退房</el-button>
        </template>
      </el-table-column>
    </el-table>
    <common-page
      :total="page_total"
      :pageSize="page_size"
      :current="page_current"
      @currentChange="currentChange"
      @sizeChange="sizeChange"
    />
  </div>
</template>
<script>
import commonPage from "../../components/commonPage.vue";
export default {
  components: {
    commonPage,
  },
  data() {
    return {
      orderForm:{
        oderId:""
      },
      orderTable: [],
      //   分页
      page_current: 1,
      page_total: 0,
      page_size: 10,
      loading: true
    };
  },
  created() {
    this.orderManagementInit();
  },
  methods: {
    //   页面初始化
    orderManagementInit() {
      this.getRequest(
        "/order/page?current=" +
          this.page_current +
          "&pageSize=" +
          this.page_size
      ).then((resp) => {
        if (resp) {
          this.loading = false;
          this.orderTable = resp.data.records;
          this.page_total = resp.data.total;
        }
      });
    },
    // 根据订单编号查询
    searchOrder() {
        this.getRequest(
        "/order/queryByOrderId?orderId="+this.orderForm.oderId
      ).then((resp) => {
        if (resp) {
          this.orderTable = resp.data;
        }
      });
    },
    // 修改订单状态
    updateOrderStatus(id, status) {
      let order = {
        'id': id,
        'status': status
      };
      this.putRequest('/order/update', order).then(resp => {
        if(resp){
          this.orderManagementInit();
          this.$message({
            message: "办理成功！",
            type: "success",
          });
          // 修改房间状态
          if(status === 2) {
            status = 2
          } else {
            status = 0
          }
          this.putRequest("/house/updateByOrderId?orderId=" + id + "&status=" + status).then((resp) => {
            if (resp.code == 200) {
              console.log('success')
            }
          });
        } else {
           this.$message.error("修改订单状态失败！，请检查后重新提交！");
        }
      })
    },
    // 页码改变
    currentChange(val1) {
      this.page_current = val1;
      this.orderManagementInit();
    },
    // 每页条数改变
    sizeChange(val2) {
      this.page_size = val2;
      this.orderManagementInit();
    },
  },
};
</script>
<style lang="less" scoped>
.user_role {
  display: flex;
  flex-direction: column;
  color: #409eff;
  font-size: 13px;
}
</style>
