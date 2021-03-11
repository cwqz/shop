<template>
  <div class="role">
    <div class="operation"></div>
    <el-table
      :data="roleTable"
      border
      height="86%"
      style="width: 100%"
      v-loading="loading"
      :header-cell-style="{ 'text-align': 'center', background: '#f1f2f6' }"
      :cell-style="{ 'text-align': 'center', padding: 6 + 'px' }"
    >
      <el-table-column label="序号" type="index" width="80">
        <template scope="scope">
          <span>{{ (page_current - 1) * page_size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" show-overflow-tooltip />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="描述" prop="description" />
      <el-table-column
        label="创建时间"
        prop="createTime"
        :formatter="formatDate"
      />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-badge
            class="tab-status"
            is-dot
            v-if="scope.row.status == '1'"
            type="success"
            >启用</el-badge
          >
          <el-badge class="tab-status" is-dot v-else>停用</el-badge>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="updateRoleStatus(scope.row)"
            v-if="scope.row.status == '1'"
            >停用</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="updateRoleStatus(scope.row)"
            v-if="scope.row.status == '0'"
            >启用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
      roleTable: [],
      //   分页
      page_current: 1,
      page_total: 0,
      page_size: 10,
      //   加载动画
      loading: true,
      //   修改状态
      roleStatus: {
        id: "",
        status: "",
      },
    };
  },
  created() {
    this.roleInit();
  },
  methods: {
    //   页面初始化
    roleInit() {
      this.getRequest(
        "/user/role?current=" +
          this.page_current +
          "&pageSize=" +
          this.page_size
      ).then((resp) => {
        if (resp) {
          this.loading = false;
          this.roleTable = resp.data.records;
          this.page_total = resp.data.total;
        }
      });
    },
    // 修改角色状态
    updateRoleStatus(val) {
      var status = Math.pow(0, val.status);
      this.roleStatus.id = val.id;
      this.roleStatus.status = status;
      this.$confirm("确认修改角色状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.putRequest("/user/role", this.roleStatus).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.roleInit();
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
      this.roleInit();
    },
    // 每页条数改变
    sizeChange(val2) {
      this.page_size = val2;
      this.roleInit();
    },
  },
};
</script>
<style lang="less" scoped>
</style>