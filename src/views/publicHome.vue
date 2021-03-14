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
      <!-- 搜索框 -->
      <div class="main_search">
        <img class="search_img" src="../assets/images/logo.png" />
        <div class="serach_all">
          <div class="main_search_input">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="入住时间"
              end-placeholder="离店时间"
              value-format=" yyyy-MM-dd"
            />
            <el-button
              class="search_btn"
              icon="el-icon-search"
              @click="searcHouse()"
              >选择日期</el-button
            >
          </div>
        </div>
      </div>
      <el-divider class="divider" />
      <!-- 内容展示 -->
      <div class="product">
        <el-tabs class="type-tabs" v-model="activeName" @tab-click="changeType">
          <el-tab-pane label="全部" name="first" />
          <el-tab-pane label="标准间" name="second" />
          <el-tab-pane label="单人间" name="third" />
          <el-tab-pane label="大床房" name="fourth" />
          <el-tab-pane label="钟点房" name="five" />
          <el-tab-pane label="标准套间" name="six" />
          <el-tab-pane label="豪华总统房" name="seven" />
        </el-tabs>
        <div>
          <el-row :gutter="6" class="product_list">
            <el-col
              v-for="(item, index) in typeTable"
              :key="index"
              :span="3"
              :offset="2"
            >
              <el-card
                class="product_item"
                shadow="always"
                @click.native="Details(item)"
              >
                <img class="product_img" :src="item.img" alt="loading..." />
                <div class="product_description">
                  <span style="color: blue; font-size: 10px">{{
                    item.title
                  }}</span>
                  <span>可入住人数：{{ item.peopleNum }} </span>
                  <span>标准价格(￥)：{{ item.price }}</span>
                  <span>会员价格(￥)：{{ item.memberPrice }}</span>
                  <span>房间号：{{ item.position }} </span>
                  <span>描述：{{ item.description }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
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
      publicHomeTable: [],
      //   分类好的
      newPublicHomeTable: [],
      typeTable: [],
      value1: "",
      activeName: 'first',
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
    this.publicHomeInit();
  },
  methods: {
    publicHomeInit() {
      this.getRequest("/house/list").then((resp) => {
        if (resp) {
          this.publicHomeTable = resp.data;
          this.typeTable = resp.data;
          this.publicHomeTable.forEach((e) => {
            if (
              Object.keys(this.newPublicHomeTable).indexOf("" + e.type) === -1
            ) {
              this.newPublicHomeTable[e.type] = [];
            }
            this.newPublicHomeTable[e.type].push(e);
          });
        }
      });
    },
    // 根据日期搜索房间
    searcHouse() {
      if (this.$store.state.currentUser === null) {
        this.$message({
            type: "error",
            message: "暂未登录，请先登录再进行预定",
        });
      } else {
        this.publicHomeTable = [];
        this.newPublicHomeTable = {};
        this.getRequest(
          "/house/queryByTime?inTime=" +
            this.value1[0] +
            "&outTime=" +
            this.value1[1]
        ).then((resp) => {
          if (resp) {
            this.publicHomeTable = resp.data;
            this.typeTable = resp.data;
            this.activeName = 'first';
            this.publicHomeTable.forEach((e) => {
              if (
                Object.keys(this.newPublicHomeTable).indexOf("" + e.type) === -1
              ) {
                this.newPublicHomeTable[e.type] = [];
              }
              this.newPublicHomeTable[e.type].push(e);
            });
          }
        });
      }
    },
    changeType(tab) {
      if(tab.index === '0') {
        this.typeTable = this.publicHomeTable
      } else if(tab.index === '1') {
        this.typeTable = this.newPublicHomeTable[0]
      } else if(tab.index === '2') {
        this.typeTable = this.newPublicHomeTable[1]
      } else if(tab.index === '3') {
        this.typeTable = this.newPublicHomeTable[2]
      } else if(tab.index === '4') {
        this.typeTable = this.newPublicHomeTable[3]
      } else if(tab.index === '5') {
        this.typeTable = this.newPublicHomeTable[5]
      } else if(tab.index === '6') {
        this.typeTable = this.newPublicHomeTable[4]
      }
    },
    // 详情页
    Details(val) {
      val["time"] = this.value1;
      var arr = JSON.stringify(val);
      this.$router.push("/houseDetails?obj=" + encodeURIComponent(arr));
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
  },
};
</script>

<style lang="less">
@import "../assets/css/publicHome.css";
</style>
<style >
.el-range-editor.el-input__inner {
  height: 100%;
  border-radius: 0;
  border: solid 2px #dd4545;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>