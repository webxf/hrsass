<template>
  <div ref="main" class="echars">雷达图</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    var myChart = echarts.init(this.$refs.main)
    myChart.setOption({
      backgroundColor: '#000',
      title: {
        text: '绩效统计表',
        textStyle: {
          color: 'green',
        },
      },
      legend: {
        data: ['张三', '李四'],
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },

      radar: {
        // shape: 'circle',
        indicator: [
          { name: '技术', max: 100 },
          { name: 'bug修复', max: 100 },
          { name: '考勤', max: 100 },
          { name: '任务完成度', max: 100 },
          { name: '工作数量', max: 100 },
          { name: '上班情况', max: 100 },
        ],
        splitLine: {
          lineStyle: {
            color: ['grey', '#000'].reverse(),
          },
        },
        splitArea: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'green',
          },
        },
      },

      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [80, 30, 50, 40, 60, 100],
              name: '张三',
            },
            {
              value: [70, 80, 20, 100, 90, 80],
              name: '李四',
            },
          ],
        },
      ],
    })
  },

  methods: {},
}
</script>

<style scoped lang="scss">
.echars {
  width: 700px;
  height: 500px;
}
</style>
