<template>
  <div class="index">
    <div style="height: 20px; width: 100%"></div>
    <div class="index_one">
      <div class="index_one_left">
        <el-avatar
          :src="this.$store.state.currentUser.avatar"
          class="index_one_left_img"
        />
      </div>
      <div class="index_one_right">
        <div class="index_one_right_title">
          {{ this.time }}
          {{ this.$store.state.currentUser.username }}，祝你开心每一天！
        </div>
        <div class="index_one_right_text">
          作者寄语：静坐常思己过，闲谈不论人非，希望我们每个人无论过程怎样，结局都是美好的。
        </div>
      </div>
    </div>
    <div class="index_two">
      <div class="index_two_left">
        <div class="index_two_left_project">
          <div class="index_two_left_project_head">
            <div class="index_two_left_project_head_conduct">进行中的项目</div>
            <div class="index_two_left_project_head_all">
              <el-link type="primary"> 全部项目</el-link>
            </div>
          </div>
          <div class="index_two_left_project_content">
            <el-card
              class="box-card"
              v-for="(item, index) in this.projects"
              :key="index"
            >
              <div class="index_two_left_project_content_icon">
                <el-row>
                  <el-col :span="4">
                    <img
                      :src="item.img"
                      class="index_two_left_project_content_icon_img"
                    />
                  </el-col>
                  <el-col :span="18">
                    <el-link
                      :underline="false"
                      class="index_two_left_project_content_icon_name"
                      >{{ item.name }}</el-link
                    >
                  </el-col>
                </el-row>
              </div>
              <div class="index_two_left_project_content_text">
                {{ item.describe }}
              </div>
              <div class="index_two_left_project_content_icon">
                <el-link
                  :underline="false"
                  class="index_two_left_project_content_icon_team"
                  >{{ item.team }}</el-link
                >
              </div>
            </el-card>
          </div>
        </div>
        <div class="index_two_left_news">
          <div class="index_two_left_news_head">动态</div>
          <div class="index_two_left_news_content">
            <div
              class="index_two_left_news_content_item"
              v-for="(item, index) in 4"
              :key="index"
            >
              <img
                src="../../assets/images/logo.png"
                class="index_two_left_news_content_item_img"
              />
              <div class="index_two_left_news_content_item_dec">
                <el-link :underline="false" type="primary"> cwqz </el-link> 修改
                <el-link :underline="false" type="primary">
                  小鱼的一天系统
                </el-link>
                首页布局、模块划分及内容调整
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index_two_right">
        <div class="index_two_right_nav">
          <div class="index_two_right_nav_head">快速开始/便捷导航</div>
          <div class="index_two_right_nav_content">
            <el-link
              :underline="false"
              v-for="(item, index) in 6"
              :key="index"
              class="index_two_right_nav_content_link"
              >操作一</el-link
            >
          </div>
        </div>
        <div class="index_two_right_table">
          <div class="index_two_right_table_head">技术栈</div>
          <div class="index_two_right_table_content">
            <table border="1" class="index_two_right_table_content_table">
              <tr>
                <td>vue</td>
                <td>4.4.6</td>
                <td>@vue/cli</td>
                <td>4.4.6</td>
              </tr>
              <tr>
                <td>vuex</td>
                <td>^3.6.0</td>
                <td>vue-router</td>
                <td>^3.4.9</td>
              </tr>
              <tr>
                <td>element-ui</td>
                <td>^2.14.1</td>
                <td>axios</td>
                <td>^0.21.1</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="index_two_right_nav">
          <div class="index_two_right_nav_head">团队</div>
          <div class="index_two_right_nav_team">
            <div class="index_two_right_nav_team_left">
              <el-row>
                <el-col :span="4">
                  <img
                    src="../../assets/images/logo.png"
                    class="index_two_right_nav_team_left_img"
                  />
                </el-col>
                <el-col :span="20">
                  <span class="index_two_right_nav_team_left_name"
                    >Agricultural helper</span
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <img
                    src="../../assets/images/logo.png"
                    class="index_two_right_nav_team_left_img"
                  />
                </el-col>
                <el-col :span="20">
                  <span class="index_two_right_nav_team_left_name"
                    >Agricultural helper</span
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <img
                    src="../../assets/images/logo.png"
                    class="index_two_right_nav_team_left_img"
                  />
                </el-col>
                <el-col :span="20">
                  <span class="index_two_right_nav_team_left_name"
                    >Agricultural helper</span
                  >
                </el-col>
              </el-row>
            </div>
            <div class="index_two_right_nav_team_right">
              <el-row>
                <el-col :span="4">
                  <img
                    src="../../assets/images/logo.png"
                    class="index_two_right_nav_team_left_img"
                  />
                </el-col>
                <el-col :span="20">
                  <span class="index_two_right_nav_team_left_name"
                    >Agricultural helper</span
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <img
                    src="../../assets/images/logo.png"
                    class="index_two_right_nav_team_left_img"
                  />
                </el-col>
                <el-col :span="20">
                  <span class="index_two_right_nav_team_left_name"
                    >Agricultural helper</span
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <img
                    src="../../assets/images/logo.png"
                    class="index_two_right_nav_team_left_img"
                  />
                </el-col>
                <el-col :span="20">
                  <span class="index_two_right_nav_team_left_name"
                    >Agricultural helper</span
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 时间
      time: "",
      // 项目信息
      projects: [
        {
          img: require("../../assets/images/logo.png"),
          name: "Agricultural helper",
          describe: " 那是一种内在的东西，他们到达不了，也无法触及的",
          team: "冠军团队",
        },
        {
          img: require("../../assets/images/logo.png"),
          name: "Shop",
          describe: " 那是一种内在的东西，他们到达不了，也无法触及的",
          team: "冠军团队",
        },
        {
          img: require("../../assets/images/logo.png"),
          name: "Agriculture-app",
          describe: " 那是一种内在的东西，他们到达不了，也无法触及的",
          team: "冠军团队",
        },
        {
          img: require("../../assets/images/logo.png"),
          name: "Finance",
          describe: " 那是一种内在的东西，他们到达不了，也无法触及的",
          team: "冠军团队",
        },
        {
          img: require("../../assets/images/logo.png"),
          name: "Finance-web",
          describe: " 那是一种内在的东西，他们到达不了，也无法触及的",
          team: "冠军团队",
        },
        {
          img: require("../../assets/images/logo.png"),
          name: "Mall",
          describe: " 那是一种内在的东西，他们到达不了，也无法触及的",
          team: "冠军团队",
        },
      ],
    };
  },
  created() {
    this.getTime();
  },
  methods: {
    // 获取时间
    getTime() {
      const date = new Date();
      if (date.getHours() >= 0 && date.getHours() < 12) {
        this.time = "上午好";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        this.time = "下午好";
      } else {
        this.time = "晚上好";
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home/index.css";
</style>
<style>
.index .el-card {
  width: 31%;
  height: 45%;
  margin: 1% 1%;
  display: flex;
  flex-direction: column;
}
.index .el-card__body {
  padding: 0;
}
</style>