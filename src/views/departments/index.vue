<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <tree-tool
          :departs="company"
          :isRoot="true"
          @add="showAdd"
          @edit="showEdit"
        ></tree-tool>
        <el-tree
          :data="departs"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <template v-slot="{ data }">
            <tree-tool
              :departs="data"
              @remove="getDepts"
              @add="showAdd"
              @edit="showEdit"
            ></tree-tool>
          </template>
        </el-tree>
      </el-card>
    </div>
    <dirlog
      :visible.sync="dialogVisible"
      :currentData="currentData"
      @success="getDepts"
      ref="dirlog"
    />
  </div>
</template>

<script>
import treeTool from './components/treeTools.vue'
import { getDeptsApi } from '@/api/department'
import { transListToTree } from '@/utils/index'
import dirlog from './components/dirlog.vue'
export default {
  components: {
    treeTool,
    dirlog,
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
      dialogVisible: false,
      currentData: {},
    }
  },

  created() {
    this.getDepts()
  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async getDepts() {
      const res = await getDeptsApi()
      this.departs = transListToTree(res.depts, '')
      console.log(res)
      this.dialogVisible = false
    },
    showAdd(val) {
      this.dialogVisible = true
      console.log(val)
      this.currentData = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.dirlog.getDeptById(val.id)
    },
  },
}
</script>

<style scoped lang="less"></style>
