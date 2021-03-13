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
              v-if="this.$store.state.searchFlag"
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
        title="房间预订"
        :visible="dialogVisible"
        width="40%"
        center
        :before-close="handleClose"
      >
        <el-form :model="order" label-width="100px" v-if="orderFlag">
          <el-form-item label="支付方式：">
            <el-radio-group v-model="order.payType">
              <el-radio :label="0">支付宝</el-radio>
              <el-radio :label="1">微信</el-radio>
              <el-radio :label="2">银行卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="order.note" type="textarea" :rows="4" />
          </el-form-item>
        </el-form>
        <el-form
          :model="successInformation"
          label-width="100px"
          v-if="!orderFlag"
        >
          <el-form-item label="支付方式：">
            <el-radio-group v-model="successInformation.order.payType">
              <el-radio :label="0">支付宝</el-radio>
              <el-radio :label="1">微信</el-radio>
              <el-radio :label="2">银行卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入住时间">
                <el-date-picker
                  v-model="successInformation.order.inTime"
                  type="date"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="离店时间">
                <el-date-picker
                  v-model="successInformation.order.outTime"
                  type="date"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="下单时间">
                <el-date-picker
                  v-model="successInformation.order.createTime"
                  type="date"
                /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="订单金额">
                <el-input
                  v-model="successInformation.order.transactionAmount"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="备注：">
            <el-input
              v-model="successInformation.order.note"
              type="textarea"
              :rows="4"
            />
          </el-form-item>
          <el-form-item>
            <img :src="successInformation.qrCode" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitOrder()" v-if="orderFlag"
            >确 定</el-button
          >
          <el-button type="primary" @click="handleClose" v-if="!orderFlag"
            >确 定</el-button
          >
          <el-button @click="handleClose">取 消</el-button>
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
      houseId: "",
      time: [],
      order: {
        userId: this.$store.state.currentUser.id,
        note: "",
        payType: "",
        transactionAmount: "",
      },
      orderFlag: true,
      //   预订成功返回的信息
      successInformation: {},
    };
  },
  created() {
    this.detailsData = JSON.parse(decodeURIComponent(this.$route.query.obj));
    this.houseId = this.detailsData.id;
    this.time = this.detailsData.time;
    if (this.$store.state.currentUser.roles[0].name == "user") {
      this.order.transactionAmount = this.detailsData.price;
    } else {
      this.order.transactionAmount = this.detailsData.memberPrice;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    createOrder() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    submitOrder() {
      this.postRequest(
        "/order/createOrder?houseId=" +
          this.houseId +
          "&inTime=" +
          this.time[0] +
          "&outTime=" +
          this.time[1],
        this.order
      ).then((resp) => {
        if (resp) {
          //   this.dialogVisible = false;
          this.successInformation = resp.data;
          this.orderFlag = false;
          console.log(resp);
        }
      });
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