<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear" @change="updateChange">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
            >{{ item }}
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="currentMonth" @change="updateChange">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentData">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)" class="isWeek">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      years: [],
      currentData: '',
    }
  },

  created() {
    this.initCurrentData()
  },

  methods: {
    initCurrentData() {
      const data = new Date()
      this.currentYear = data.getFullYear()
      this.currentMonth = data.getMonth() + 1
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, index) => item + index)
      this.currentData = data
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    updateChange() {
      this.currentData = this.currentYear + '-' + this.currentMonth
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none;
  }
  .cell-box {
    color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .isWeek {
    color: #fff;
    border-radius: 50%;
    background: #fa7c4d;
    font-size: 12px;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    display: inline-block;
  }
}
</style>
