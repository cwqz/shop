<template>
  <div class="role">
    <div class="operation">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="addApi()"
        >添加</el-button
      >
    </div>
    <el-table
      :data="apiTable"
      border
      height="86%"
      style="width: 100%"
      v-loading="loading"
      :header-cell-style="{ 'text-align': 'center', background: '#f1f2f6' }"
      :cell-style="{ 'text-align': 'center', padding: 10 + 'px' }"
      :row-style="{ height: 45 + 'px' }"
    >
      <el-table-column label="序号" type="index" width="80">
        <template scope="scope">
          <span>{{ (page_current - 1) * page_size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" width="180" show-overflow-tooltip />
      <el-table-column label="接口名称" prop="title" show-overflow-tooltip />
      <el-table-column
        label="接口URL"
        prop="path"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        label="创建时间"
        prop="createTime"
        :formatter="formatDate"
        width="180"
      />
      <el-table-column label="接口类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 0">Feign接口</span>
          <span v-if="scope.row.type === 1">REST接口</span>
        </template>
      </el-table-column>
      <el-table-column label="所属服务">
        <template slot-scope="scope">
          <span v-if="scope.row.moduleType === 0">系统管理</span>
          <span v-if="scope.row.moduleType === 1">认证中心</span>
          <span v-if="scope.row.moduleType === 2">对象存储</span>
          <span v-if="scope.row.moduleType === 3">websocket</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editApi(scope.row)" type="text" size="mini"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="updateApiStatus(scope.row)"
          >
            {{ scope.row.status ? "停用" : "启用" }}
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
    <!-- 新增 -->
    <el-dialog
      title="新增用户"
      center
      width="35%"
      :visible="addApiVisible"
      :before-close="addApiClose"
    >
      <el-form :model="addApiForm" label-width="80px">
        <el-form-item label="接口名称">
          <el-input v-model="addApiForm.title" />
        </el-form-item>
        <el-form-item label="接口URL">
          <el-input v-model="addApiForm.path" />
        </el-form-item>
        <el-form-item label="接口类型">
          <el-select v-model="addApiForm.type">
            <el-option label="Feign接口" :value="0" />
            <el-option label="REST接口" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型">
          <el-select v-model="addApiForm.moduleType">
            <el-option label="系统管理" :value="0" />
            <el-option label="认证中心" :value="1" />
            <el-option label="对象存储" :value="2" />
            <el-option label="websocket" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button type="primary" size="small" @click="submitAddApi()"
          >确认</el-button
        >
        <el-button size="small" @click="addApiClose">取消</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑API"
      width="35%"
      center
      :visible="editApiVisible"
      :before-close="editApiClose"
    >
      <el-form :model="editApiForm" label-width="80px">
        <el-form-item label="接口名称">
          <el-input v-model="editApiForm.title" />
        </el-form-item>
        <el-form-item label="接口URL">
          <el-input v-model="editApiForm.path" />
        </el-form-item>
        <el-form-item label="接口类型">
          <el-select v-model="editApiForm.type">
            <el-option label="Feign接口" :value="0" />
            <el-option label="REST接口" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型">
          <el-select v-model="editApiForm.moduleType">
            <el-option label="系统管理" :value="0" />
            <el-option label="认证中心" :value="1" />
            <el-option label="对象存储" :value="2" />
            <el-option label="websocket" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitEditApi()"
          >确认</el-button
        >
        <el-button size="small" @click="editApiClose">取消</el-button>
      </span>
    </el-dialog>
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
      apiTable: [],
      //   分页
      page_current: 1,
      page_total: 0,
      page_size: 10,
      loading: true,
      // 新增
      addApiForm: {
        title: "",
        path: "",
        type: "",
        moduleType: "",
      },
      addApiVisible: false,
      // 编辑
      editApiVisible: false,
      editApiForm: {},
      //   修改状态
      updateApiForm: {
        id: "",
        status: "",
      },
    };
  },
  created() {
    this.apiManagementInit();
  },
  methods: {
    //   页面初始化
    apiManagementInit() {
      this.getRequest(
        "/workbench-system/resource/page?current=" +
          this.page_current +
          "&pageSize=" +
          this.page_size
      ).then((resp) => {
        if (resp) {
          this.loading = false;
          this.apiTable = resp.data.records;
          this.page_total = resp.data.total;
        }
      });
    },
    // 新增用户
    addApi() {
      this.addApiVisible = true;
      this.addApiForm = {};
    },
    addApiClose() {
      this.addApiVisible = false;
    },
    submitAddApi() {
      this.putRequest(
        "/workbench-system/resource/addResource",
        this.addApiForm
      ).then((resp) => {
        if (resp) {
          this.addApiVisible = false;
          this.$message({
            message: "新增API成功！",
            type: "success",
          });
          this.apiManagementInit();
        } else {
          this.$message.error("新增API失败，请检查后重新提交！");
        }
      });
    },
    // 编辑
    editApi(val) {
      this.editApiVisible = true;
      this.editApiForm = val;
    },
    editApiClose() {
      this.editApiVisible = false;
    },
    submitEditApi() {
      this.postRequest(
        "/workbench-system/resource/updateResource",
        this.editApiForm
      ).then((resp) => {
        if (resp) {
          this.editApiVisible = false;
          this.$message({
            message: "API编辑成功",
            type: "success",
          });
        } else {
          this.$message.error("API编辑失败，请检查后重新提交");
        }
      });
    },
    // 修改状态
    updateApiStatus(val) {
      this.updateApiForm.status = Math.pow(0, val.status);
      this.updateApiForm.id = val.id;
      this.$confirm("确认修改API状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.postRequest(
            "/workbench-system/resource/updateResource",
            this.updateApiForm
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.apiManagementInit();
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
      this.apiManagementInit();
    },
    // 每页条数改变
    sizeChange(val2) {
      this.page_size = val2;
      this.apiManagementInit();
    },
  },
};
</script>
<style lang="less" scoped>
</style>
