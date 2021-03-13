<template>
  <div class="personalCenter">
    <div class="personalCenter_content">
      <div class="personalCenter_content_left">
        <el-upload
          action="#"
          :http-request="upLoad"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <el-avatar
            :src="src"
            v-if="src"
            class="personalCenter_content_left_img"
          />
        </el-upload>
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
        </el-tabs>
      </div>
    </div>
    <div class="personalCenter_order">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
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
      // 用户头像
      src: this.$store.state.currentUser.avatar,
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  created() {
    this.order();
  },
  methods: {
    order() {
      this.getRequest(
        "/order/queryByUserId?userId=" + this.$store.state.currentUser.id
      ).then((resp) => {
        if (resp) {
          console.log(resp.data);
        }
      });
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
    // 文件上传前的判断
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传头像图片只能是 JPG, PNG, GIF格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return (isJPG || isPNG || isGIF) && isLt1M;
    },
    // 上传文件到后台
    upLoad(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      this.postRequest(
        "/workbench-system/user/changeAvatar?oldAvatar=" +
          this.$store.state.currentUser.avatar,
        formData
      ).then((resp) => {
        if (resp) {
          this.src = resp.data;
          this.$store.state.currentUser.avatar = resp.data;
          this.reload();
        }
      });
    },
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