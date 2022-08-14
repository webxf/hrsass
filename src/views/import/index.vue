<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></upload-excel>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
import { importEmployee } from '@/api/empioyee'
import { formateTime } from '../../filters/index.js'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('上传文件需为xlsx类型')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        //定义一个新的对象
        const obj = {}
        //通过for in来循环mapKeyPath
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formateTime[date]
          } else {
            //将属性添加到obj里面即可
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEmployee(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
