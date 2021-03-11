<template>
  <div class="role">
    <div class="operation">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="addTopMenu()"
        >添加</el-button
      >
    </div>
    <el-table
      :data="menuTable"
      row-key="id"
      border
      height="90%"
      style="width: 100%"
      v-loading="loading"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :header-cell-style="{ 'text-align': 'center', background: '#f1f2f6' }"
      :cell-style="{ 'text-align': 'center', padding: 6 + 'px' }"
      :row-style="{ height: 45 + 'px' }"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="菜单名称" prop="name" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="路径" prop="path" />
      <el-table-column
        label="组件路径"
        prop="component"
        show-overflow-tooltip
      />
      <el-table-column label="排序" prop="sequence" width="70" />
      <el-table-column label="是否隐藏" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.keepAlive === 1">否</span>
          <span v-if="scope.row.keepAlive === 0">是</span>
        </template>
      </el-table-column>
      <el-table-column label="图标" width="70">
        <template slot-scope="scope">
          <i :class="scope.row.iconCls" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="addMenu(scope.row)"
            >添加下级</el-button
          >
          <el-button type="text" size="mini" @click="editMenu(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="mini" @click="deleteMenu(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <el-dialog
      title="菜单编辑"
      width="45%"
      center
      :visible="menuEditVisible"
      :before-close="menuEditClose"
    >
      <el-form :model="menuEditForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input v-model="menuEditForm.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称">
              <el-input v-model="menuEditForm.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="路径">
              <el-input v-model="menuEditForm.path" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组件路径">
              <el-input v-model="menuEditForm.component" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图标">
          <el-input v-model="menuEditForm.iconCls">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-select v-model="menuEditForm.keepAlive">
            <el-option label="否" :value="1" />
            <el-option label="是" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button size="small" type="primary" @click="submitMenuEdit()"
          >确定</el-button
        >
        <el-button size="small" @click="menuEditClose">取消</el-button>
      </span>
    </el-dialog>
    <!-- 添加下级菜单 -->
    <el-dialog
      title="添加下级菜单"
      width="45%"
      center
      :visible="menuAddVisible"
      :before-close="menuAddClose"
    >
      <el-form :model="menuAddForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input v-model="menuAddForm.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称">
              <el-input v-model="menuAddForm.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="路径">
              <el-input v-model="menuAddForm.path" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组件路径">
              <el-input v-model="menuAddForm.component" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图标">
          <el-input v-model="menuAddForm.iconCls">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-select v-model="menuAddForm.keepAlive">
            <el-option label="否" :value="1" />
            <el-option label="是" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button size="small" type="primary" @click="submitMenuAdd()"
          >确定</el-button
        >
        <el-button size="small" @click="menuAddClose">取消</el-button>
      </span>
    </el-dialog>
    <!-- 添加顶级菜单 -->
    <el-dialog
      title="添加顶级菜单"
      width="45%"
      center
      :visible="topMenuAddVisible"
      :before-close="topMenuAddClose"
    >
      <el-form :model="topMenuAddForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input v-model="topMenuAddForm.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称">
              <el-input v-model="topMenuAddForm.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="路径">
              <el-input v-model="topMenuAddForm.path" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组件路径">
              <el-input v-model="topMenuAddForm.component" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图标">
          <el-input v-model="topMenuAddForm.iconCls">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-select v-model="topMenuAddForm.keepAlive">
            <el-option label="否" :value="1" />
            <el-option label="是" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button size="small" type="primary" @click="submitTopMenuAdd()"
          >确定</el-button
        >
        <el-button size="small" @click="topMenuAddClose">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 菜单表格
      menuTable: [],
      // 加载动画
      loading: true,
      // 编辑
      menuEditVisible: false,
      menuEditForm: {},
      // 添加下级菜单
      menuAddForm: {
        name: "",
        title: "",
        path: "",
        component: "",
        keepAlive: "",
        iconCls: "",
        parentId: "",
      },
      menuAddVisible: false,
      //   添加顶级菜单
      topMenuAddForm: {
        name: "",
        title: "",
        path: "",
        component: "",
        keepAlive: "",
        iconCls: "",
        parentId: -1,
      },
      topMenuAddVisible: false,
    };
  },
  created() {
    this.menuInit();
  },
  methods: {
    menuInit() {
      this.getRequest("/workbench-system/menu/list").then((resp) => {
        if (resp) {
          this.loading = false;
          this.menuTable = resp.data;
        }
      });
    },
    // 菜单编辑
    editMenu(val) {
      this.menuEditVisible = true;
      this.menuEditForm = val;
    },
    menuEditClose() {
      this.menuEditVisible = false;
    },
    submitMenuEdit() {
      this.postRequest(
        "/workbench-system/menu/updateMenu",
        this.menuEditForm
      ).then((resp) => {
        if (resp) {
          this.menuEditVisible = false;
          this.$message({
            message: "菜单编辑成功",
            type: "success",
          });
        } else {
          this.$message.error("菜单编辑失败，请检查后重新提交");
        }
      });
    },
    // 添加下级菜单
    addMenu(val) {
      this.menuAddVisible = true;
      this.menuAddForm.parentId = val.id;
      console.log(val);
    },
    menuAddClose() {
      this.menuAddVisible = false;
    },
    submitMenuAdd() {
      this.putRequest("/workbench-system/menu/addMenu", this.menuAddForm).then(
        (resp) => {
          if (resp) {
            this.menuAddVisible = false;
            this.menuInit();
            this.$message({
              message: "成功添加下级菜单",
              type: "success",
            });
          } else {
            this.$message.error("添加下级菜单失败，请检查后重新提交");
          }
        }
      );
    },
    // 添加顶级菜单
    addTopMenu() {
      this.topMenuAddVisible = true;
    },
    topMenuAddClose() {
      this.topMenuAddVisible = false;
    },
    submitTopMenuAdd() {
      this.putRequest(
        "/workbench-system/menu/addMenu",
        this.topMenuAddForm
      ).then((resp) => {
        if (resp) {
          this.topMenuAddVisible = false;
          this.menuInit();
          this.$message({
            message: "成功添加顶级菜单",
            type: "success",
          });
        } else {
          this.$message.error("添加顶级菜单失败，请检查后重新提交");
        }
      });
    },
    // 删除菜单
    deleteMenu(val) {
      this.$confirm("确认删除菜单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("" + val.id).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.menuInit();
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
  },
};
</script> 
<style lang="less" scoped>
</style>