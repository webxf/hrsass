<template>
  <el-dropdown @command="clickLang">
    <span class="el-dropdown-link">
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(value, key) in messages"
        :key="key"
        :command="key"
        :disabled="key === $i18n.locale"
        >{{ value.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n/index'
import Cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages,
    }
  },

  created() {},

  methods: {
    clickLang(val) {
      this.$i18n.locale = val
      this.$router.go(0)
      Cookie.set('lang', val)
    },
  },
}
</script>

<style scoped lang="scss">
.el-dropdown {
  .el-icon-medal-1 {
    font-size: 20px;
    color: #fff;
    margin-top: 15px;
  }
}
</style>
