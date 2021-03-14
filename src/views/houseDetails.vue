<template>
  <el-container class="container">
    <el-header class="header">
      <div class="header_all">
        <div class="header_title">欢迎来到星期天酒店！</div>
        <div class="header_menu">
          <span @click="login">{{this.$store.state.topLoginName}}</span>
          <el-divider direction="vertical" />
          <router-link :to="{ name: 'register' }">免费注册</router-link>
          <el-divider direction="vertical" />
          <span @click="toPersonalCenter" class="el-icon-user-solid"
            >个人中心</span
          >
          <el-divider direction="vertical" />
          <span @click="toIndex" class="el-icon-s-claim">商家中心</span>
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <!-- top -->
      <div class="main_search">
        <img
          class="search_img"
          src="../assets/images/logo.png"
          @click="back()"
        />
        <div style="margin: 3% 0 0 16%;font-size: 38px;font-weight:bold">
          星期天酒店
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
            <p style="color: #000; font-size: 18px; font-weight: bold">
              {{ this.detailsData.title }}
            </p>
            <p>可入住人数：{{ this.detailsData.peopleNum }}</p>
            <div class="details-price">
              <p style="font-size: 15px;padding: 20px 0 0 10px">标准价格<span style="margin-left: 30px;font-size:16px;color: #000">￥{{ this.detailsData.price }}</span></p>
              <p style="font-size: 15px;padding: 0 0 5px 10px">会员价<span style="margin-left: 30px;font-size:26px;color: red;font-weight: bold">￥{{ this.detailsData.memberPrice }}</span></p>
            </div>
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
            v-for="(item, index) in rightData"
            :key="index"
            class="contact_item"
            effect="dark"
            :content="item.content"
            placement="left"
          >
            <img :src="item.src" alt="loading..." />
          </el-tooltip>
        </div>
      </div>
      <el-divider class="eval-divider">酒店评价列表</el-divider>
      <!-- 酒店评价列表 -->
      <el-collapse style="width: 70%;margin-left: 12%" v-model="activeNames">
        <el-collapse-item 
          style="margin-left: 30px"
          v-for="(item, index) in evaluateData" 
          :key="index"
          :title="item.userName" 
          :name="index"
        >
          <div class="eval">
            <div class="eval-text">{{ item.evaluate }}</div>
            <div class="eval-time">{{ dateFormate(item.createTime) }}</div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 房间预订 -->
      <el-dialog
        title="房间预订"
        :visible="dialogVisible"
        width="35%"
        center
        :before-close="handleClose"
      >
        <el-form :model="order" label-width="100px" v-if="orderFlag">
          <el-form-item style="margin-left: -80px">
            <span>预订时间：{{this.time[0]}} - {{this.time[1]}}</span>
          </el-form-item>
          <el-form-item label="支付方式：">
            <el-radio-group v-model="order.payType">
              <el-radio :label="0">支付宝</el-radio>
              <el-radio :label="1">微信</el-radio>
              <el-radio :label="2">银行卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="添加备注：">
            <el-input v-model="order.note" type="textarea" :rows="4" />
          </el-form-item>
          <el-form-item style="margin-left: -80px">
            <span>当前预订价格：{{this.price}}￥/天</span>
            <p v-if="this.$store.state.currentUser && this.$store.state.currentUser.roles[0].name === 'user'">
              您还不是本店会员，会员享受更优惠价格，是否办理本店会员：</p>
            <span style="color: red; font-size: 20px;font-weight: bold" v-if="this.$store.state.currentUser && this.$store.state.currentUser.roles[0].name === 'user'" @click="vip">点击办理</span>
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
          <el-form-item>
            <span>入住时向酒店前台展示该二维码进行入住登记，请妥善保管</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="submitOrder()" v-if="orderFlag"
            >预 订</el-button
          >
          <el-button type="primary" size="small" @click="handleClose" v-if="!orderFlag"
            >确 定</el-button
          >
          <el-button type="danger" size="small" @click="handleClose">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 办理会员 -->
      <el-dialog
        title="办理会员"
        center
        width="30%"
        :visible="vipVisible"
        :before-close="vipClose"
        v-if="this.$store.state.currentUser"
      >
        <p>付款账户：{{this.$store.state.currentUser.id}}</p>
        <p>收款账户：XingQiTianJiuDian</p>
        <p>收款人姓名：酒店张经理</p>
        <p>转账金额：800 (￥)</p>
      <span slot="footer" class="dialog_footer">
        <el-button type="primary" size="small" @click="submitVip()"
          >办理</el-button
        >
        <el-button type="danger" size="small" @click="vipClose">取消</el-button>
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
      // 评价列表
      evaluateData: [],
      dialogVisible: false,
      houseId: "",
      time: [],
      price: 0,
      order: {
        userId: '',
        note: "",
        payType: "",
        transactionAmount: "",
      },
      orderFlag: true,
      // 预订成功返回的信息
      successInformation: {},
      vipVisible: false,
      activeNames: ['1'],
      // 右侧qq等联系方式数据
      rightData: [{
        content: '1776857122',
        src: 'http://nongbangshou.top:9090/hotel/house/QQ.png'
      }, {
        content: '18192180979',
        src: 'http://nongbangshou.top:9090/hotel/house/wechart.png'
      }, {
        content: '19802928252',
        src: 'http://nongbangshou.top:9090/hotel/house/phone.png'
      }]
    };
  },
  created() {
    this.detailsData = JSON.parse(decodeURIComponent(this.$route.query.obj));
    this.houseId = this.detailsData.id;
    this.time = this.detailsData.time;
    this.getEvaluateList();
  },
  methods: {
    getEvaluateList() {
      this.getRequest("/order/queryEvaluateList").then(resp => {
        if(resp) {
          this.evaluateData = resp.data;
        }
      })
    },
    back() {
      this.$router.go(-1);
    },
    createOrder() {
      if (this.$store.state.currentUser === null) {
        this.$message({
            type: "error",
            message: "暂未登录，请登录后再进行预定",
        });
      } else if(this.time == null || this.time == '') {
        this.$message({
            type: "error",
            message: "请先选择预订时间再进行预订",
        });
      } else {
        if (this.$store.state.currentUser.roles[0].name == "user") {
          this.order.transactionAmount = this.detailsData.price;
          this.price = this.detailsData.price;
        } else {
          this.order.transactionAmount = this.detailsData.memberPrice;
          this.price = this.detailsData.memberPrice;
        }
        this.dialogVisible = true;
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    submitOrder() {
      this.order.userId = this.$store.state.currentUser.id;
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
    // 办理会员
    vip(val){
      this.vipVisible = true;
      this.dialogVisible = false;
    },
    vipClose(){
      this.vipVisible = false
    },
    submitVip() {
      this.putRequest("/user/changeUserRole?userId=" + this.$store.state.currentUser.id + "&roleId=5edc5472476444c6a5d0c07816b9d041").then(resp => {
        if(resp) {
            this.vipVisible = false;
            this.$store.state.currentUser.roles[0].id="5edc5472476444c6a5d0c07816b9d041";
             this.$store.state.currentUser.roles[0].description="会员";
             this.$store.state.currentUser.roles[0].name="vip";
            this.$message({
              message:'会员办理成功',
              type:'success'
            });
        }
      })
    },
    login() {
      if (this.$store.state.currentUser === null) {
        this.$router.push("/login");
      }
    },
    // 进入商家中心
    toIndex() {
      if (this.$store.state.currentUser === null) {
        this.$message({
            type: "error",
            message: "暂未登录，请先登录",
        });
      } else if(this.$store.state.currentUser.roles[0].name === 'admin') { // 根据登录用户的角色判断是否为酒店管理员
        this.$router.push("/index");
      } else {
        this.$message({
            type: "error",
            message: "您还不是本酒店的管理员",
        });
      }
    },
    // 进入个人中心
    toPersonalCenter() {
      if (this.$store.state.currentUser === null) {
        this.$message({
            type: "error",
            message: "暂未登录，请先登录",
        });
      } else {
        this.$router.push("/personalCenter");
      }
    },
    // 时间格式化
    dateFormate(time) {
      var date = new Date(time);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return YY + MM + DD +" "+hh + mm + ss;
    }
  },
};
</script>

<style lang="less">
@import "../assets/css/publicHome.css";
</style>
<style >
.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>