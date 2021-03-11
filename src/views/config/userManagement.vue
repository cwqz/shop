<template>
  <div class="role">
    <div class="operation">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="addUser()"
        >添加</el-button
      >
    </div>
    <el-table
      :data="userTable"
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
      <el-table-column label="用户名" prop="username" width="110" />
      <el-table-column label="头像" width="110">
        <template slot-scope="scope" v-if="scope.row.avatar">
          <el-avatar shape="square" :size="50" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="nickName" width="120" />
      <el-table-column label="邮箱" prop="email" width="180" />
      <el-table-column label="性别" prop="sex" width="110">
        <template slot-scope="scope">
          <svg
            v-if="scope.row.sex === '0'"
            t="1610001805786"
            class="icon"
            viewBox="0 0 1024 1024"
            width="30"
            height="30"
          >
            <path
              d="M512 64C264 64 64 264 64 512s200 448 448 448 448-200 448-448S760 64 512 64z m208 555.2"
              fill="#FFA6CE"
            />
            <path
              d="M720 302.4c-88-88-230.4-88-318.4 0-80 81.6-86.4 211.2-14.4 300.8l-32 32-80-80c-9.6-8-24-8-32 0-8 9.6-8 24 0 32l80 80-46.4 46.4c-8 9.6-8 24 0 32 9.6 8 24 8 32 0l44.8-49.6 80 80c9.6 8 24 9.6 32 0s8-24 0-32l-80-80 32-32c89.6 73.6 219.2 67.2 300.8-14.4 89.6-84.8 89.6-225.6 1.6-315.2z m-30.4 286.4c-72 68.8-185.6 68.8-254.4 0-68.8-72-68.8-185.6 0-254.4 70.4-68.8 184-68.8 254.4 0 68.8 72 68.8 185.6 0 254.4z"
              fill="#FFFFFF"
            />
          </svg>
          <svg
            v-else-if="scope.row.sex === '1'"
            t="1610002178259"
            class="icon"
            viewBox="0 0 1024 1024"
            width="30"
            height="30"
          >
            <path
              d="M455.48638 431.983595c-93.377714 0-169.346943 75.969229-169.346943 169.347966s75.969229 169.346943 169.346943 169.346943c93.378737 0 169.346943-75.968206 169.346943-169.346943s-75.968206-169.347966-169.346943-169.347966z"
              fill="#3498db"
            />
            <path
              d="M511.999488 66.605977c-245.984391 0-445.394023 199.409632-445.394023 445.394023s199.409632 445.394023 445.394023 445.394023 445.394023-199.409632 445.394023-445.394023-199.409632-445.394023-445.394023-445.394023z m282.185894 367.93486c0 14.128789-11.453866 25.582655-25.582655 25.582655s-25.582655-11.453866-25.582655-25.582655V327.993173L622.958626 457.863009c34.31862 39.934524 53.040007 90.261747 53.040007 143.468552 0 58.901505-22.937408 114.276696-64.585971 155.926282-41.649586 41.648562-97.024777 64.585971-155.926282 64.585971s-114.276696-22.937408-155.926282-64.585971c-41.649586-41.649586-64.586994-97.024777-64.586994-155.926282s22.937408-114.276696 64.586994-155.926282c41.649586-41.649586 97.024777-64.586994 155.926282-64.586994 47.354518 0 92.422969 14.836917 129.918955 42.293245l124.706233-134.895293H596.695472c-14.129812 0-25.582655-11.453866-25.582654-25.582655s11.452843-25.582655 25.582654-25.582655H768.63445a25.484418 25.484418 0 0 1 16.745382 6.269798 25.580608 25.580608 0 0 1 3.371794 3.548825 25.462928 25.462928 0 0 1 5.383614 14.166651c0.036839 0.586354 0.053212 1.171686 0.049119 1.757017v171.747619z"
              fill="#3498db"
            />
          </svg>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120">
        <template slot-scope="scope">
          <div
            class="user_role"
            v-for="(item, index) in scope.row.roles"
            :key="index"
          >
            <div>{{ item.description }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-badge
            class="tab-status"
            is-dot
            v-if="scope.row.status === 1"
            type="success"
            >启用</el-badge
          >
          <el-badge class="tab-status" is-dot v-else>停用</el-badge>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        width="180"
        :formatter="formatDate"
      />
      <el-table-column
        label="最后一次修改时间"
        prop="editTime"
        width="180"
        :formatter="formatDate"
      />
      <el-table-column
        label="备注"
        prop="note"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column label="操作" fixed="right" width="130">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="updateUserStatus(scope.row)"
            >{{ scope.row.status ? "停用" : "启用" }}</el-button
          >
          <el-button type="text" size="mini" @click="assignmentRole(scope.row)">
            分配角色
          </el-button>
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
    <!-- 新增用户 -->
    <el-dialog
      title="新增用户"
      center
      width="35%"
      :visible="addUserVisible"
      :before-close="addUserClose"
    >
      <el-form :model="addUserForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="addUserForm.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUserForm.password" show-password />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button type="primary" size="small" @click="submitAddUser()"
          >确认</el-button
        >
        <el-button size="small" @click="addUserClose">取消</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-drawer
      title="分配角色"
      :visible="userRoleVisible"
      :before-close="userRoleClose"
      size="20%"
    >
      <el-tree
        ref="tree"
        :data="roleData"
        node-key="id"
        show-checkbox
        highlight-current
        empty-text="暂无数据"
        :props="defaultProps"
        :default-expand-all="true"
        @check="getCheckedKeys()"
        :default-checked-keys="defaultRloeIds"
        class="roleMenuTree"
      />
      <div class="roleMenuDiv">
        <el-button type="primary" size="small" @click="submitUserRole()"
          >保存</el-button
        >
        <el-button size="small" @click="userRoleClose">关闭</el-button>
      </div>
    </el-drawer>
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
      userTable: [],
      //   分页
      page_current: 1,
      page_total: 0,
      page_size: 10,
      loading: true,
      // 新增用户
      addUserForm: {
        username: "",
        password: "",
      },
      addUserVisible: false,
      // 分配角色
      roleData: [],
      userRoleVisible: false,
      defaultProps: {
        children: "children",
        label: "description",
      },
      userId: "",
      roleIds: [],
      defaultRloeIds: [],
    };
  },
  created() {
    this.userManagementInit();
  },
  methods: {
    //   页面初始化
    userManagementInit() {
      this.getRequest(
        "/workbench-system/user/page?current=" +
          this.page_current +
          "&pageSize=" +
          this.page_size
      ).then((resp) => {
        if (resp) {
          this.loading = false;
          this.userTable = resp.data.records;
          this.page_total = resp.data.total;
        }
      });
    },
    // 新增用户
    addUser() {
      this.addUserVisible = true;
    },
    addUserClose() {
      this.addUserVisible = false;
    },
    submitAddUser() {
      this.postRequest(
        "/workbench-system/main/register",
        this.addUserForm
      ).then((resp) => {
        if (resp) {
          this.addUserVisible = false;
          this.$message({
            message: "新增用户成功！",
            type: "success",
          });
          this.userManagementInit();
        } else {
          this.$message.error("新增用户失败，请检查后重新提交！");
        }
      });
    },
    // 分配角色
    assignmentRole(val) {
      this.userRoleVisible = true;
      this.userId = val.id;
      //   默认角色列表
      val.roles.forEach((e) => {
        this.defaultRloeIds.push(e.id);
      });
      //   获取所有角色列表
      if (this.roleData.length === 0) {
        this.roleList();
      } else {
        this.roleData;
      }
    },
    userRoleClose() {
      this.userRoleVisible = false;
    },
    roleList() {
      this.getRequest("/workbench-system/role/queryRoleList").then((resp) => {
        if (resp) {
          this.roleData = resp.data;
        }
      });
    },
    getCheckedKeys() {
      this.roleIds = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
    },
    submitUserRole() {
      this.postRequest(
        "/workbench-system/role/changeUserRole?userId=" + this.userId,
        this.roleIds
      ).then((resp) => {
        if (resp) {
          this.userRoleVisible = false;
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.userManagementInit();
        }
      });
    },
    // 修改用户状态
    updateUserStatus(val) {
      var userStatus = Math.pow(0, val.status);
      this.$confirm("确认修改角色状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.postRequest(
            "/workbench-system/user/changeUserStatus?status=" +
              userStatus +
              "&userId=" +
              val.id
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.userManagementInit();
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
    // 页码改变
    currentChange(val1) {
      this.page_current = val1;
      this.userManagementInit();
    },
    // 每页条数改变
    sizeChange(val2) {
      this.page_size = val2;
      this.userManagementInit();
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
