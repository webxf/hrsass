<template>
  <el-row type="flex" style="width: 100%">
    <el-col>{{ departs.name }}</el-col>
    <el-col :span="5">
      <el-row type="flex">
        <el-col>{{ departs.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('add', departs)"
                >添加子部门</el-dropdown-item
              >
              <template v-if="!isRoot">
                <el-dropdown-item @click.native="$emit('edit', departs)"
                  >编辑部门</el-dropdown-item
                >
                <el-dropdown-item @click.native="remove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDeptsApi } from '@/api/department'
export default {
  props: {
    departs: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {
    async remove() {
      try {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await delDeptsApi(this.treeNode.id)
        this.$message.success('删除成功')
        this.$emit('remove')
      } catch (err) {}
    },
  },
}
</script>

<style scoped></style>
