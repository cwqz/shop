<template>
  <div class="role">
    <div class="operation" />
    <el-table
      :data="houseTable"
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
      <el-table-column
        label="ID"
        prop="id"
        width="160"
        show-overflow-tooltip=""
      />
      <el-table-column label="房间类型" prop="title" width="130" />
      <el-table-column label="图片" width="120">
        <template slot-scope="scope" v-if="scope.row.img">
          <el-avatar shape="square" :size="65" :src="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column label="会员价(￥)" prop="memberPrice" width="120" />
      <el-table-column label="标准价(￥)" prop="price" width="120" />
      <el-table-column label="可入住人数" prop="peopleNum" width="100" />
      <el-table-column label="房间号" prop="position" width="130" />
      <el-table-column label="状态" width="140">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">空闲，可入住</span>
          <span v-if="scope.row.status == 1">有人预定</span>
          <span v-if="scope.row.status == 2">有人入住</span>
          <span v-if="scope.row.status == 3">维修</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editHouse(scope.row)" v-if="scope.row.status === 0 || scope.row.status === 3"
            >修改信息</el-button
          >
          <el-button type="text" size="mini" @click="editHouse(scope.row)" v-else :disabled="true"
            >修改信息</el-button
          >
          <el-button
            type="text"
            size="mini"
            v-if="scope.row.status === 0 || scope.row.status === 3"
            @click="updateHouseStatus(scope.row)"
            >修改状态</el-button
          >
          <el-button
            type="text"
            size="mini"
            v-else
            :disabled="true"
            >修改状态</el-button
          >
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
    <!-- 编辑 -->
    <el-dialog
      title="编辑房源信息"
      center
      width="33%"
      :visible="addHouseVisible"
      :before-close="addHouseClose"
    >
      <el-form :model="editHoseForm" label-width="90px">
        <el-form-item label="房间类型">
          <el-input v-model="editHoseForm.title" />
        </el-form-item>
        <el-form-item label="会员价">
          <el-input v-model="editHoseForm.memberPrice" />
        </el-form-item>
        <el-form-item label="标准价">
          <el-input v-model="editHoseForm.price" />
        </el-form-item>
        <el-form-item label="可入住人数">
          <el-input v-model="editHoseForm.peopleNum" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button type="primary" size="small" @click="submitAddHouse()"
          >确认</el-button
        >
        <el-button size="small" @click="addHouseClose">取消</el-button>
      </span>
    </el-dialog>
    <!-- 修改状态 -->
    <el-dialog
      title="修改房间状态"
      center
      width="33%"
      :visible="updateHouseVisible"
      :before-close="updateHouseClose"
    >
      <el-form :model="updateHouseForm">
        <el-form-item label="选择状态" style="margin-left: 12%">
          <el-select v-model="updateHouseForm.status">
            <el-option label="空闲，可入住" :value="0" />
            <el-option label="维修" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button type="primary" size="small" @click="submitUpdateHouse()"
          >确认</el-button
        >
        <el-button type="danger" size="small" @click="updateHouseClose">取消</el-button>
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
      houseTable: [],
      //   分页
      page_current: 1,
      page_total: 0,
      page_size: 10,
      loading: true,
      // 编辑
      editHoseForm: {},
      addHouseVisible: false,
      //   修改状态
      updateHouseForm: {},
      updateHouseVisible: false,
    };
  },
  created() {
    this.houseManagementInit();
  },
  methods: {
    //   页面初始化
    houseManagementInit() {
      this.getRequest(
        "/house/page?current=" +
          this.page_current +
          "&pageSize=" +
          this.page_size
      ).then((resp) => {
        if (resp) {
          this.loading = false;
          this.houseTable = resp.data.records;
          this.page_total = resp.data.total;
        }
      });
    },
    // 编辑
    editHouse(val) {
      this.addHouseVisible = true;
      this.editHoseForm = val;
    },
    addHouseClose() {
      this.addHouseVisible = false;
    },
    submitAddHouse() {
      this.putRequest("/house/update", this.editHoseForm).then((resp) => {
        if (resp.code == 200) {
          this.addHouseVisible = false;
          this.$message({
            message: "修改房源信息成功！",
            type: "success",
          });
          this.houseManagementInit();
        } else {
          this.$message.error("修改房源信息失败，请检查后重新提交！");
        }
      });
    },
    // 修改状态
    updateHouseStatus(val) {
      this.updateHouseVisible = true;
      this.updateHouseForm = val;
    },
    updateHouseClose() {
      this.updateHouseVisible = false;
    },
    submitUpdateHouse() {
      this.putRequest("/house/update", this.updateHouseForm).then((resp) => {
        if (resp.code == 200) {
          this.updateHouseVisible = false;
          this.$message({
            message: "修改房间状态成功！",
            type: "success",
          });
          this.houseManagementInit();
        } else {
          this.$message.error("修改房间状态失败，请检查后重新提交！");
        }
      });
    },
    // 页码改变
    currentChange(val1) {
      this.page_current = val1;
      this.houseManagementInit();
    },
    // 每页条数改变
    sizeChange(val2) {
      this.page_size = val2;
      this.houseManagementInit();
    },
  },
};
</script>
<style lang="less" scoped>
</style>
