<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <tree-tool :departs="company" :isRoot="true"></tree-tool>
        <el-tree
          :data="departs"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <template v-slot="{ data }">
            <tree-tool :departs="data"></tree-tool>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTool from './components/treeTools.vue'
export default {
  components: {
    treeTool,
  },
  data() {
    return {
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name',
      },
      company: { name: '总裁办', manager: '张三' },
    }
  },

  created() {},

  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
  },
}
</script>

<style scoped lang="less"></style>
