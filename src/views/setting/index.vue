<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addFn">新增角色</el-button>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" type="index"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="name" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="success" size="small" @click="showSeting"
                  >分配权限</el-button
                >
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-sizes="[5, 10, 15, 20]"
            layout="sizes,prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
          <el-dialog title="新增角色" :visible.sync="dialogVisible" width="50%">
            <el-form
              ref="form"
              label-width="80px"
              :model="formdataRule"
              :rules="formRules"
              @close="dialogClose"
            >
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="formdataRule.name"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="formdataRule.region"></el-input>
              </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addForm">确 定</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="分配权限" :visible.sync="setlogVisible" width="30%">
        <el-tree
          :data="permissions"
          :props="{ label: 'name' }"
          node-key="id"
          default-expand-all
          :default-expanded-keys="defaultKeys"
          show-checkbox
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setlogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoles, addRolesApi } from '@/api/role'
import { getcomponey } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils/index'
export default {
  name: 'permission',
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 2,
      page: 1,
      dialogVisible: false,
      formdataRule: {
        name: '',
        region: '',
      },
      formRules: {
        name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
      },
      companyInfo: {},
      setlogVisible: false,
      permissions: [],
      defaultKeys: ['1', '2'],
    }
  },

  created() {
    this.getRoles()
    this.getComponeyInfo()
    this.getPermissions()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRoles({
        page: this.page,
        pagesize: this.pageSize,
      })
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    addFn() {
      this.dialogVisible = true
    },
    async addForm() {
      this.dialogVisible = false
      this.$refs.form.validate()
      await addRolesApi(this.formdataRule)
      this.$message.success('添加成功')
      this.getRoles()
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.formdataRule.region = ''
    },
    async getComponeyInfo() {
      const res = await getcomponey(this.$store.state.user.userInfo.companyId)
      console.log(res)
      this.companyInfo = res
    },
    showSeting() {
      this.setlogVisible = true
    },
    async getPermissions() {
      const res = await getPermissionList()
      const treePermission = transListToTree(res, '0')
      this.permissions = treePermission
    },
  },
}
</script>

<style scoped lang="less"></style>
