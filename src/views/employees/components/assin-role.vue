<template>
  <el-dialog title="分配角色" :visible="visible" @close="close" @open="open">
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item.id" v-for="item in role" :key="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialogy-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="assinRole">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoles } from '@/api/role'
import { getUserImg } from '@/api/user'
import { assignRoles } from '@/api/empioyee'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    roleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      checkList: [],
      role: [],
    }
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    //发送请求，获取角色列表数据
    async getRoleList() {
      const { rows } = await getRoles()
      this.role = rows
    },
    //页面一打开就会触发这个事件
    open() {
      //调用这个方法
      this.getRoleList()
      this.getemployees()
    },
    async getemployees() {
      //因为需要传id，所以需要从父组件那里拿
      const { roleIds } = await getUserImg(this.roleId)
      this.checkList = roleIds
    },
    async assinRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({
        id: this.roleId,
        roleIds: this.checkList,
      })
      this.$message.success('修改成功')
      this.close()
    },
  },
}
</script>

<style scoped></style>
