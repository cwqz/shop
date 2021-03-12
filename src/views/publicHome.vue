<template>
  <el-container class="container">
    <el-header class="header">
      <div class="header_all">
        <div class="header_title">欢迎来到星期天酒店！</div>
        <div class="header_menu">
          <router-link :to="{ name: 'login' }">登录</router-link>
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
              value-format=" yyyy-MM-dd HH:mm"
            />
            <el-button
              class="search_btn"
              icon="el-icon-search"
              @click="searcHouse()"
              >搜索</el-button
            >
          </div>
        </div>
      </div>
      <el-divider class="divider" />
      <!-- 内容展示 -->
      <div class="product">
        <div class="product_type">
          <el-row>
            <el-col :span="3">
              <span class="el-icon-arrow-right product_type_name"> 类别:</span>
              <span @click="setFlagAll()">全部</span>
            </el-col>
            <el-col :span="2">
              <span @click="setFlag0()">标准间</span>
            </el-col>
            <el-col :span="2">
              <span @click="setFlag1()">单人间</span>
            </el-col>
            <el-col :span="2">
              <span @click="setFlag2()">大床房</span>
            </el-col>
            <el-col :span="2">
              <span @click="setFlag3()">钟点房</span>
            </el-col>
            <el-col :span="2">
              <span @click="setFlag4()">豪华总统房</span>
            </el-col>
            <el-col :span="2">
              <span @click="setFlag5()">标准套间</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row :gutter="6" class="product_list" v-if="flag == 0">
            <el-col
              v-for="(item, index) in publicHomeTable"
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
          <el-row :gutter="6" class="product_list" v-if="flag == 1">
            <el-col
              v-for="(item, index) in newPublicHomeTable[0]"
              :key="index"
              :span="3"
              :offset="2"
            >
              <el-card
                class="product_item"
                shadow="always"
                @click="Details(item)"
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
          <el-row :gutter="6" class="product_list" v-if="flag == 2">
            <el-col
              v-for="(item, index) in newPublicHomeTable[1]"
              :key="index"
              :span="3"
              :offset="2"
            >
              <el-card
                class="product_item"
                shadow="always"
                @click="Details(item)"
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
          <el-row :gutter="6" class="product_list" v-if="flag == 3">
            <el-col
              v-for="(item, index) in newPublicHomeTable[2]"
              :key="index"
              :span="3"
              :offset="2"
            >
              <el-card
                class="product_item"
                shadow="always"
                @click="Details(item)"
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
          <el-row :gutter="6" class="product_list" v-if="flag == 4">
            <el-col
              v-for="(item, index) in newPublicHomeTable[3]"
              :key="index"
              :span="3"
              :offset="2"
            >
              <el-card
                class="product_item"
                shadow="always"
                @click="Details(item)"
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
          <el-row :gutter="6" class="product_list" v-if="flag == 5">
            <el-col
              v-for="(item, index) in newPublicHomeTable[4]"
              :key="index"
              :span="3"
              :offset="2"
            >
              <el-card
                class="product_item"
                shadow="always"
                @click="Details(item)"
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
          <el-row :gutter="6" class="product_list" v-if="flag == 6">
            <el-col
              v-for="(item, index) in newPublicHomeTable[5]"
              :key="index"
              :span="3"
              :offset="2"
            >
              <el-card
                class="product_item"
                shadow="always"
                @click="Details(item)"
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
            class="contact_item"
            effect="dark"
            content="1776857122"
            placement="left"
          >
            <img src="../assets/images/QQ.png" alt="QQ" />
          </el-tooltip>
          <el-tooltip
            class="contact_item"
            effect="dark"
            content="18192180979"
            placement="left"
          >
            <img src="../assets/images/wechart.png" alt="微信" />
          </el-tooltip>
          <el-tooltip
            class="contact_item"
            effect="dark"
            content="19802928252"
            placement="left"
          >
            <img src="../assets/images/phone.png" alt="电话" />
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
      newPublicHomeTable: {},
      value1: "",
      flag: 0,
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
          this.publicHomeTable.forEach((e) => {
            if (
              Object.keys(this.newPublicHomeTable).indexOf("" + e.type) === -1
            ) {
              this.newPublicHomeTable[e.type] = [];
            }
            this.newPublicHomeTable[e.type].push(e);
          });
          console.log(this.newPublicHomeTable);
        }
      });
    },
    // 根据日期搜索房间
    searcHouse() {
      console.log(this.value1);
      this.getRequest(
        "/house/queryByTime?inTime=" +
          this.value1[0] +
          "&outTime=" +
          this.value1[1]
      ).then((resp) => {
        if (resp) {
          console.log(resp.data);
        }
      });
    },
    setFlagAll() {
      this.flag = 0;
    },
    setFlag0() {
      this.flag = 1;
    },
    setFlag1() {
      this.flag = 2;
    },
    setFlag2() {
      this.flag = 3;
    },
    setFlag3() {
      this.flag = 4;
    },
    setFlag4() {
      this.flag = 5;
    },
    setFlag5() {
      this.flag = 6;
    },
    // 详情页
    Details(val) {
      var arr = JSON.stringify(val);
      this.$router.push("/houseDetails?obj=" + encodeURIComponent(arr));
    },
    toIndex() {
      if (this.$store.state.currentUser === null) {
        this.$router.replace("/login");
        this.$store.commit("CHANGE_IS_SALE", true);
      } else {
        this.$router.replace("/index");
      }
    },
    toPersonalCenter() {
      if (this.$store.state.currentUser === null) {
        this.$router.replace("/login");
        this.$store.commit("CHANGE_IS_PERSONAL", true);
      } else {
        this.$router.replace("/personalCenter");
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