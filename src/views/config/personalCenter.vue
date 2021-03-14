<template>
  <div class="personalCenter">
    <router-link class="back-home" :to="{ path: '/' }">返回酒店前台</router-link>
    <div class="personalCenter_content">
      <div class="personalCenter_content_left">
        <el-avatar
            :src="this.$store.state.currentUser.avatar"
            class="personalCenter_content_left_img"
          />
        <div class="personalCenter_content_left_user">
          <div
            class="personalCenter_content_left_user_name"
            v-if="this.$store.state.currentUser.nickName"
          >
            {{ this.$store.state.currentUser.nickName }}
          </div>
          <div
            class="personalCenter_content_left_user_name"
            v-if="!this.$store.state.currentUser.nickName"
          >
            {{ this.$store.state.currentUser.id }}
          </div>
          <div class="personalCenter_content_left_user_tabs">
            {{ this.$store.state.currentUser.signature }}
          </div>
        </div>
        <div class="personalCenter_content_left_tag">
          <div class="personalCenter_content_left_tag_item">
            <i class="el-icon-user" style="margin-right: 10px" />{{
              this.$store.state.currentUser.username
            }}
          </div>
          <div class="personalCenter_content_left_tag_item">
            <i class="el-icon-mobile" style="margin-right: 10px" />{{
              this.$store.state.currentUser.phone
            }}
          </div>
          <div class="personalCenter_content_left_tag_item">
            <i class="el-icon-location-outline" style="margin-right: 10px" />{{
              this.$store.state.currentUser.address
            }}
          </div>
          <div class="personalCenter_content_left_tag_item">
            <i class="el-icon-edit" style="margin-right: 10px" />
            <span
              v-for="(item, index) in this.$store.state.currentUser.roles"
              :key="index"
            >
              {{ item.description }}
            </span>
          </div>
        </div>
      </div>
      <div class="personalCenter_content_right">
        <el-tabs>
          <el-tab-pane label="基本信息">
            <el-form
              label-width="80px"
              :model="userMessageForm"
              :rules="userMessageRules"
              ref="userMessageForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userMessageForm.username" :disabled="true" />
              </el-form-item>
              <el-form-item label="昵称" prop="nickName">
                <el-input v-model="userMessageForm.nickName" />
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userMessageForm.email" />
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="userMessageForm.phone" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateUser()"
                  >更新基本信息</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="安全设置">
            <el-form
              :model="passwordForm"
              :rules="rules"
              ref="passwordForm"
              label-width="80px"
            >
              <el-form-item label="旧密码" prop="oldPassword" required>
                <el-input v-model="passwordForm.oldPassword" show-password />
                <span
                  v-if="this.message"
                  class="personalCenter_content_right_error_message"
                  >{{ this.message }}</span
                >
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="passwordForm.newPassword" show-password />
              </el-form-item>
              <el-form-item label="确认密码" prop="newPassword2">
                <el-input v-model="passwordForm.newPassword2" show-password />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitPassword()" size="small"
                  >修改密码</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="会员信息">
            <el-button type="primary" v-if="this.$store.state.currentUser.roles[0].name == 'user'" @click="vip"> 办理会员</el-button>
            <span v-else>您已是本店会员</span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="personalCenter_order">
      <el-table 
        :data="orderData" 
        border 
        style="width: 100%"
        height="98%" 
        :header-cell-style="{ 'text-align': 'center', background: '#f1f2f6' }"
        :cell-style="{ 'text-align': 'center', padding: 6 + 'px' }"
        :row-style="{ height: 45 + 'px' }"
      >
        <el-table-column prop="orderId" label="订单编号" width="180"/>
        <el-table-column label="支付方式" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.payType === 0">支付宝</span>
            <span v-if="scope.row.payType === 1">微信</span>
            <span v-if="scope.row.payType === 2">银行卡</span>
          </template>
        </el-table-column>
        <el-table-column prop="transactionAmount" label="金额(￥)" />
        <el-table-column prop="house.position" label="房间号" width="120"/>
        <el-table-column prop="house.title" label="房间类型" width="120" />
        <el-table-column prop="house.peopleNum" label="可入住人数" width="100" />
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">预定中</span>
            <span v-if="scope.row.status === 1">取消订单</span>
            <span v-if="scope.row.status === 2">入住中</span>
            <span v-if="scope.row.status === 3">已退房</span>
          </template>
       </el-table-column>
        <el-table-column prop="createTime" label="下单日期"  :formatter="formatDate" width="180"/>
        <el-table-column prop="inTime" label="入住日期"  :formatter="formatDate" width="180"/>
        <el-table-column prop="outTime" label="离店日期"  :formatter="formatDate" width="180"/>
        <el-table-column prop="note" label="备注" show-overflow-tooltip width="120"/>
        <el-table-column label="操作" fixed="right" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="cancelOrder(scope.row)" v-if="scope.row.status === 0">取消订单</el-button>
            <el-button type="text" size="mini" @click="cancelOrder(scope.row)" v-else :disabled="true">取消订单</el-button>
            <el-button type="text" size="mini" @click="addEvaluate" v-if="scope.row.status === 3">评价</el-button>
            <el-button type="text" size="mini" v-else :disabled="true">评价</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 办理会员 -->
     <el-dialog
      title="办理会员"
      center
      width="30%"
      :visible="vipVisible"
      :before-close="vipClose"
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
    <!-- 添加评价 -->
    <el-dialog
      title="添加评价"
      center
      width="30%"
      :visible="evaluateVisible"
      :before-close="evaluateClose"
    >
        <el-input
          type="textarea"
          :rows="4"
          maxlength="50"
          show-word-limit
          placeholder="请输入评价内容"
          v-model="evaluate">
        </el-input>
      <span slot="footer" class="dialog_footer">
        <el-button type="primary" size="small" @click="submitEvaluate()"
          >提交</el-button
        >
        <el-button type="danger" size="small" @click="evaluateClose">取消</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
export default {
  inject: ["reload"],
  data() {
    //  密码验证
    let validateNewPassword = (rule, value, callback) => {
      if (value === this.passwordForm.oldPassword) {
        callback(new Error("新密码与原始密码相同！"));
      } else {
        callback();
      }
    };
    let validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error("两次输入新密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      //   用户基本信息
      userMessageForm: {
        id: this.$store.state.currentUser.id,
        username: this.$store.state.currentUser.username,
        nickName: this.$store.state.currentUser.nickName,
        email: this.$store.state.currentUser.email,
        phone: this.$store.state.currentUser.phone,
      },
      //   标签
      label: [],
      userMessageRules: {
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
      },
      //   密码
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请设置新密码", trigger: "blur" },
          { validator: validateNewPassword, trigger: "blur" },
        ],
        newPassword2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateNewPassword2, trigger: "blur" },
        ],
      },
      message: "",
      orderData:[],
      orderForm:{
        id:"",
        status:"1"
      },
      // 办理会员
      vipVisible: false,
      // 评价
      evaluateVisible: false,
      evaluate: ''
    };
  },
  created() {
    this.orderInit();
  },
  methods: {
    // 订单初始化
    orderInit() {
      this.getRequest(
        "/order/queryByUserId?userId=" + this.$store.state.currentUser.id
      ).then((resp) => {
        if (resp) {
          this.orderData = resp.data;
        }
      });
    },
    //取消订单
    cancelOrder(val){
      this.orderForm.id = val.id;
      this.orderForm.status = '1';
      let house = {
        'id': val.house.id,
        'status': 0
      };
      this.$confirm("确认取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.putRequest("/order/update", this.orderForm).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.putRequest("/house/update", house).then(resp => {
                if(resp) {
                  console.log("success");
                }
              })
              this.orderInit();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 办理会员
    vip(val){
      this.vipVisible = true
    },
    vipClose(){
      this.vipVisible = false
    },
    submitVip(){
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
            this.reload()

        }
      })
    },
    //   修改用户信息
    updateUser() {
      this.$refs.userMessageForm.validate((valid) => {
        if (valid) {
          this.putRequest("/user/user", this.userMessageForm).then((resp) => {
            if (resp) {
              this.$message({
                message: "用户信息修改成功！",
                type: "success",
              });
              this.$store.state.currentUser.email = this.userMessageForm.email;
              this.$store.state.currentUser.nickName = this.userMessageForm.nickName;
              this.$store.state.currentUser.phone = this.userMessageForm.phone;
              this.reload();
            } else {
              this.$message.error("用户信息修改失败！");
            }
          });
        } else {
          return false;
        }
      });
    },
    // 修改密码
    submitPassword() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          this.postRequest(
            "/user/changePassword?newPassword=" +
              this.passwordForm.newPassword +
              "&oldPassword=" +
              this.passwordForm.oldPassword
          ).then((resp) => {
            if (resp.code === 200) {
              this.$router.replace("/");
            } else {
              this.message = resp.message;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 添加评价
    addEvaluate() {
      this.evaluateVisible = true
    },
    evaluateClose(){
      this.evaluateVisible = false
    },
    submitEvaluate() {
      let evaluateInfo = {
        'userId': this.$store.state.currentUser.id,
        'userName': this.$store.state.currentUser.username,
        'evaluate': this.evaluate
      }
      this.postRequest("/order/evaluate", evaluateInfo).then(resp => {
        if(resp) {
          this.evaluateVisible = false;
          this.$message({
            message:'评价成功',
            type:'success'
          });
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/config/personalCenter.css";
</style>
<style>
.el-tabs__item {
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  padding: 0 30px !important;
}
.el-tabs__content {
  padding-left: 5%;
}
.el-tag {
  margin: 5px 5px;
}
.el-upload {
  width: 100%;
}
.personalCenter_content_right .el-input,
.el-textarea {
  width: 300px;
}
.personalCenter_content_righ .el-input__inner {
  height: 35px;
}
</style>