<template>
  <div class="role">
    <div class="systemLog_operation">
      <el-form :inline="true" v-model="systemLogForm" class="form">
        <el-form-item>
          <el-date-picker
            placeholder="选择日期"
            type="date"
            size="small"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="systemLogForm.startTime"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="checkLog()"
            icon="el-icon-search"
            size="small"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="deleteSystemLog()"
            >清空一个月前日志</el-button
          >
        </el-form-item>
      </el-form>
      <el-row class="row">
        <el-button
          icon="el-icon-download"
          size="mini"
          circle
          @click="systemLogExport()"
        />
        <el-button icon="el-icon-printer" size="mini" circle />
        <el-button
          icon="el-icon-refresh"
          size="mini"
          circle
          @click="systemLogRefresh()"
        />
        <el-button icon="el-icon-s-grid" size="mini" circle />
      </el-row>
    </div>
    <el-table
      :data="systemLogTable"
      border
      height="85%"
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ 'text-align': 'center', background: '#f1f2f6' }"
      :cell-style="{ 'text-align': 'center' }"
      :row-style="{ height: 45 + 'px' }"
    >
      <el-table-column type="selection" width="45" align="center" />
      <el-table-column label="序号" type="index" width="80" fixed>
        <template scope="scope">
          <span>{{ (page_current - 1) * page_size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作名称"
        prop="description"
        show-overflow-tooltip
        width="120"
      />
      <el-table-column label="操作用户" prop="username" width="100" />
      <el-table-column label="请求类型" prop="method" width="100" />
      <el-table-column
        label="操作URL"
        prop="url"
        show-overflow-tooltip
        width="160"
      />
      <el-table-column
        label="请求参数"
        prop="parameter"
        show-overflow-tooltip
        width="160"
      />
      <el-table-column
        label="操作结果"
        prop="result"
        show-overflow-tooltip
        width="160"
      />
      <el-table-column label="耗时(ms)" prop="spendTime" width="100" />
      <el-table-column
        label="创建时间"
        prop="startTime"
        width="180"
        :formatter="formatDate"
      />
      <el-table-column label="IP地址" prop="ip" width="140" />
      <el-table-column label="操作系统" prop="os" width="120" />
      <el-table-column label="浏览器类型" prop="browser" width="120" />
      <el-table-column
        label="异常信息"
        prop="exception"
        show-overflow-tooltip
        width="160"
      />
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button
            @click="systemLogDetails(scope.row)"
            type="text"
            size="mini"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 日志详情 -->
    <el-dialog
      title="操作日志详情"
      width="56%"
      center
      :visible="systemLogDetailsVisible"
      :before-close="systemLogDetailsClose"
    >
      <el-form :model="systemLogDetailsData" label-width="90px">
        <fieldset class="systemLog_doc">
          <legend>基础信息</legend>
          <el-row>
            <el-col :span="8">
              <el-form-item label="操作名称">
                <el-input v-model="systemLogDetailsData.description" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作用户">
                <el-input v-model="systemLogDetailsData.username" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作系统">
                <el-input v-model="systemLogDetailsData.os" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="耗时(ms)">
                <el-input v-model="systemLogDetailsData.spendTime" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="创建时间">
                <el-input v-model="systemLogDetailsData.startTime" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="浏览器类型">
                <el-input v-model="systemLogDetailsData.browser" />
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset class="systemLog_doc">
          <legend>请求信息</legend>
          <el-row>
            <el-col :span="12">
              <el-form-item label="请求类型">
                <el-input v-model="systemLogDetailsData.method" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="IP地址">
                <el-input v-model="systemLogDetailsData.ip" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="操作URL">
            <el-input v-model="systemLogDetailsData.url" />
          </el-form-item>
          <el-form-item label="请求参数">
            <el-input
              v-model="systemLogDetailsData.parameter"
              type="textarea"
              autosize
            />
          </el-form-item>
        </fieldset>
        <fieldset class="systemLog_doc">
          <legend>响应信息</legend>
          <el-form-item label="操作结果">
            <el-input
              v-model="systemLogDetailsData.result"
              type="textarea"
              autosize
            />
          </el-form-item>
          <el-form-item label="异常信息">
            <el-input
              v-model="systemLogDetailsData.exception"
              type="textarea"
              autosize
            />
          </el-form-item>
        </fieldset>
      </el-form>
    </el-dialog>
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
      // 表单
      systemLogForm: {
        startTime: null,
      },
      systemLogTable: [],
      //   分页
      page_current: 1,
      page_total: 0,
      page_size: 10,
      //   加载动画
      loading: true,
      //   表格多选
      selectData: [],
      //   查看详情
      systemLogDetailsVisible: false,
      systemLogDetailsData: {},
    };
  },
  created() {
    this.systemLogInit();
  },
  methods: {
    //   页面初始化
    systemLogInit() {
      this.getRequest(
        "/workbench-system/web-log/page?current=" +
          this.page_current +
          "&pageSize=" +
          this.page_size
      ).then((resp) => {
        if (resp) {
          this.loading = false;
          this.systemLogTable = resp.data.records;
          this.page_total = resp.data.total;
        }
      });
    },
    // 条件查询
    checkLog() {
      this.getRequest(
        "/workbench-system/web-log/page/date?createTime=" +
          this.systemLogForm.startTime +
          "&current=" +
          this.page_current +
          "&pageSize=" +
          this.page_size
      ).then((resp) => {
        if (resp) {
          this.systemLogTable = resp.data.records;
          this.page_total = resp.data.total;
        }
      });
    },
    // 清空一个月前日志
    deleteSystemLog() {
      var myDate = new Date();
      var time = myDate.toLocaleDateString().split("/").join("-");
      this.$confirm("确认清空一个月前的日志吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest(
            "/workbench-system/web-log/date?deadline=" + time
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.systemLogInit();
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
    // 表格多选
    handleSelectionChange(val) {
      this.selectData = JSON.parse(JSON.stringify(val));
      for (var i = 0; i < this.selectData.length; i++) {
        this.selectData[i].startTime = this.timeFormat(
          this.selectData[i].startTime
        );
      }
    },
    // 时间戳格式化
    timeFormat(val) {
      var date = new Date(val);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
    // 文件下载
    systemLogExport() {
      const { export_json_to_excel } = require("@/vendor/Export2Excel");
      const tHeader = [
        "操作名称",
        "操作用户",
        "请求类型",
        "操作URL",
        "请求参数",
        "操作结果",
        "耗时(ms)",
        "创建时间",
        "IP地址",
        "操作系统",
        "浏览器类型",
        "异常信息",
      ];
      const filterVal = [
        "description",
        "username",
        "method",
        "url",
        "parameter",
        "result",
        "spendTime",
        "startTime",
        "ip",
        "os",
        "browser",
        "exception",
      ];
      const list = this.selectData;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel(tHeader, data, "操作日志");
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    // 页面刷新
    systemLogRefresh() {
      this.page_current = 1;
      this.page_size = 10;
      this.systemLogInit();
    },
    // 查看详情
    systemLogDetails(val) {
      this.systemLogDetailsData = val;
      this.systemLogDetailsVisible = true;
      this.systemLogDetailsData.startTime = this.timeFormat(
        this.systemLogDetailsData.startTime
      );
    },
    systemLogDetailsClose() {
      this.systemLogDetailsVisible = false;
    },
    // 页码改变
    currentChange(val1) {
      this.page_current = val1;
      this.systemLogInit();
    },
    // 每页条数改变
    sizeChange(val2) {
      this.page_size = val2;
      this.systemLogInit();
    },
  },
};
</script>
<style lang="less" scoped>
.systemLog_operation {
  width: 100%;
  height: 8%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.systemLog_operation .el-form-item {
  margin-bottom: 0;
}
.systemLog_doc {
  width: 94%;
  height: 10%;
  color: #2670f7;
  font-size: 14px;
  border: 1px solid #ebeef5;
  margin: 0 3% 1% 3%;
}
</style>
