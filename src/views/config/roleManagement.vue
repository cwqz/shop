<template>
  <div class="role">
    <div class="operation">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="add()"
        >添加</el-button
      >
    </div>
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
            v-if="scope.row.status"
            type="success"
            >启用</el-badge
          >
          <el-badge class="tab-status" is-dot v-else>停用</el-badge>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="mini"
            >编辑</el-button
          >
          <el-button
            @click="updateRoleStatus(scope.row)"
            type="text"
            size="mini"
            >{{ scope.row.status ? "停用" : "启用" }}</el-button
          >
          <br />
          <el-button type="text" size="mini" @click="assignmentMenu(scope.row)"
            >分配菜单</el-button
          >
          <el-button type="text" size="mini" @click="assignmentApi(scope.row)"
            >分配资源</el-button
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
    <!-- 角色编辑 -->
    <el-dialog
      title="角色编辑"
      :visible="roleEditVisible"
      width="35%"
      :before-close="editRoleClose"
      center
    >
      <el-form :model="editRole" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="editRole.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editRole.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="editRoleClose" size="small">取消</el-button>
        <el-button @click="submitRoleEdit()" type="primary" size="small"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 角色新增 -->
    <el-dialog
      title="角色新增"
      width="35%"
      center
      :visible="roleAddVisible"
      :before-close="addRoleClose"
    >
      <el-form :model="addRole" label-width="80px">
        <el-form-item label="角色名称:">
          <el-input v-model="addRole.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="描述:">
          <el-input v-model="addRole.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="addRoleClose" size="small">取消</el-button>
        <el-button @click="submitRoleAdd()" type="primary" size="small"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 分配菜单 -->
    <el-drawer
      title="分配菜单"
      :visible="roleMenuVisible"
      :before-close="roleMenuClose"
      size="20%"
    >
      <el-tree
        :data="menuData"
        show-checkbox
        empty-text="暂无数据"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :default-expand-all="true"
        :check-strictly="checkStr"
        node-key="id"
        @check="getCheckedKeys()"
        :default-checked-keys="defaultMenuIds"
        class="roleMenuTree"
      />
      <div class="roleMenuDiv">
        <el-button type="primary" size="small" @click="submitRoleMenu()"
          >保存</el-button
        >
        <el-button size="small" @click="roleMenuClose">关闭</el-button>
      </div>
    </el-drawer>
    <!-- 分派权限 -->
    <el-drawer
      title="分配资源"
      size="20%"
      :visible="roleApiVisible"
      :before-close="roleApiClose"
    >
      <el-tree
        ref="apiTree"
        node-key="id"
        :data="apiData"
        show-checkbox
        highlight-current
        empty-text="暂无数据"
        class="roleMenuTree"
        :props="apiDefaultProps"
        :default-expand-all="true"
        @check="apiGetCheckedNodes()"
        :default-checked-keys="defaultApiIds"
      />
      <div class="roleMenuDiv">
        <el-button type="primary" size="small" @click="submitRoleApi()"
          >保存</el-button
        >
        <el-button size="small" @click="roleApiClose">关闭</el-button>
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
      roleTable: [],
      //   分页
      page_current: 1,
      page_total: 0,
      page_size: 10,
      //   加载动画
      loading: true,
      // 编辑角色
      editRole: {},
      roleEditVisible: false,
      // 新增角色
      addRole: {
        description: "",
        name: "",
      },
      roleAddVisible: false,
      //   分配菜单
      roleMenuVisible: false,
      checkStr: true,
      menuData: [],
      menuIds: [],
      defaultMenuIds: [],
      roleId: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
      //   分配资源
      roleApiVisible: false,
      roleAipId: "",
      roleName: "",
      apiData: [],
      apiDefaultProps: {
        children: "children",
        label: "title",
      },
      defaultApiIds: [],
      apiIds: [],
    };
  },
  created() {
    this.roleInit();
  },
  methods: {
    //   页面初始化
    roleInit() {
      this.getRequest(
        "/workbench-system/role/page?current=" +
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
    // 编辑角色
    edit(row) {
      this.roleEditVisible = true;
      this.editRole = row;
    },
    // 角色编辑后提交
    submitRoleEdit() {
      this.postRequest("/workbench-system/role/updateRole", this.editRole).then(
        (resp) => {
          if (resp) {
            this.roleEditVisible = false;
            this.$message({
              message: "角色编辑成功",
              type: "success",
            });
          } else {
            this.$message.error("角色编辑失败，请检查后重新提交");
          }
        }
      );
    },
    // 关闭编辑对话框
    editRoleClose() {
      this.roleEditVisible = false;
      this.editRole = {};
    },
    // 新增角色
    add() {
      this.roleAddVisible = true;
      this.addRole = {};
    },
    // 新增角色后提交
    submitRoleAdd() {
      this.putRequest("/workbench-system/role/addRole", this.addRole).then(
        (resp) => {
          if (resp) {
            this.roleAddVisible = false;
            this.$message({
              message: "角色新增成功",
              type: "success",
            });
            this.roleInit();
          } else {
            this.$message.error("角色新增失败，请检查后重新提交");
          }
        }
      );
    },
    // 关闭新增对话框
    addRoleClose() {
      this.roleAddVisible = false;
    },
    // 修改角色状态
    updateRoleStatus(val) {
      var status = Math.pow(0, val.status);
      this.$confirm("确认修改角色状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.postRequest(
            "/workbench-system/role/changeStatus?roleId=" +
              val.id +
              "&status=" +
              status
          ).then((resp) => {
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
    // 分配菜单
    assignmentMenu(val) {
      this.roleMenuVisible = true;
      if (this.menuData.length === 0) {
        this.menuList();
      } else {
        this.menuData;
      }
      this.roleId = val.id;
      this.defaultMenuList(val.id);
    },
    menuList() {
      this.getRequest("/workbench-system/menu/list").then((resp) => {
        if (resp) {
          this.menuData = resp.data;
        }
      });
    },
    defaultMenuList(val) {
      this.checkStr = true;
      this.getRequest(
        "/workbench-system/menu/queryMenuIdsByRoleId?roleId=" + val
      ).then((resp) => {
        if (resp) {
          this.defaultMenuIds = resp.data;
          this.$refs.tree.setCheckedKeys(this.defaultMenuIds); // 设置回显
          this.checkStr = false; // 回显完成后，再次设置互相关联
        }
      });
    },
    roleMenuClose() {
      this.roleMenuVisible = false;
    },
    getCheckedKeys() {
      this.menuIds = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
    },
    submitRoleMenu() {
      this.putRequest(
        "/workbench-system/menu/addRoleMenus?roleId=" + this.roleId,
        this.menuIds
      ).then((resp) => {
        if (resp) {
          this.roleMenuVisible = false;
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        }
      });
    },
    // 分配资源
    assignmentApi(val) {
      this.roleApiVisible = true;
      this.roleAipId = val.id;
      this.roleName = val.name;
      //   所有资源列表
      if (this.apiData.length === 0) {
        this.apiList();
      } else {
        this.apiData;
      }
    },
    apiList() {
      this.getRequest("/workbench-system/resource/queryResourceList").then(
        (resp) => {
          if (resp) {
            this.apiData = resp.data;
          }
        }
      );
    },
    apiGetCheckedNodes() {
      let apiArr = [];
      let newApiArr = [];
      apiArr = this.$refs.apiTree.getCheckedNodes();
      if (apiArr.length == 0) {
        apiArr = [];
        return;
      } else {
        for (let i = 0; i < apiArr.length; i++) {
          if (apiArr[i].path == null && apiArr[i].length != 0) {
            apiArr.splice(i, 1);
          }
          newApiArr.push({
            resourceId: apiArr[i].id,
            resourcePath: apiArr[i].path,
          });
        }
        // 删除数组中重复的对象
        let hash = {};
        this.apiIds = newApiArr.reduce((item, next) => {
          hash[next.resourceId]
            ? ""
            : (hash[next.resourceId] = true && item.push(next));
          return item;
        }, []);
        for (let j = 0; j < this.apiIds.length; j++) {
          if (this.apiIds[j].resourcePath == null) {
            this.apiIds.splice(j, 1);
          }
        }
      }
    },
    roleApiClose() {
      this.roleApiVisible = false;
    },
    submitRoleApi() {
      this.putRequest(
        "/workbench-system/resource/addRoleResources?roleId=" +
          this.roleAipId +
          "&roleName=" +
          this.roleName,
        this.apiIds
      ).then((resp) => {
        if (resp) {
          this.roleApiVisible = false;
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        }
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