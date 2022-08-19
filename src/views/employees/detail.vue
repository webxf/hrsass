<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="count">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="details.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="details.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="personal">
            <userInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job" />
          <jobInfo></jobInfo>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserImg, updateInfo } from '@/api/user'
import userInfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      details: {},
      activeName: Cookies.get('userInfo') || 'count',
    }
  },
  components: {
    userInfo,
    jobInfo,
  },
  created() {
    this.getUserDetail()
  },

  methods: {
    async getUserDetail() {
      const res = await getUserImg(this.$route.params.id)
      this.details = res
    },
    async updateInfo() {
      await updateInfo(this.details)
      this.$message.success('更新成功')
    },
    handleClick() {
      Cookies.set('userInfo', this.activeName)
    },
  },
}
</script>

<style scoped></style>
