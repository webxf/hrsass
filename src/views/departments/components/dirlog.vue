<template>
  <div>
    <el-dialog
      :title="formTitle"
      :visible="visible"
      width="50%"
      @close="CloseBtn"
    >
      <el-form
        ref="form"
        label-width="100px"
        :model="formData"
        :rules="formRules"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input placeholder="1-50个字符" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input placeholder="1-50个字符" v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            placeholder="请选择负责人"
            style="width: 100%"
            v-model="formData.manager"
          >
            <el-option
              :label="item.username"
              :value="item.username"
              v-for="item in formList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            type="textarea"
            placeholder="输入部门介绍"
            v-model="formData.introduce"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CloseBtn">取 消</el-button>
        <el-button type="primary" @click="saveBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDeptsApi, addDepts, EditDepts, editDeptss } from '@/api/department'
import { getDeptsFormListApi } from '@/api/empioyee'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentData: {
      type: Object,
      required: true,
    },
  },
  data() {
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        //编辑  因为编辑，不能和兄弟部门同名，所以需要拿到兄弟部门，然后不能和他们同名
        const { depts } = await getDeptsApi()
        const filters = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id,
        )
        const repet = filters.some((item) => item.name === value)
        repet ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentData.children) return callback()
        const isRepet = this.currentData.children.some(
          (item) => item.name === value,
        )
        isRepet ? callback(new Error('部门重复')) : callback()
      }
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              const { depts } = await getDeptsApi()
              let isRepet
              if (this.formData.id) {
                //编辑部门
                isRepet = depts
                  .filter((item) => item.id !== this.formData.id)
                  .some((item) => item.code === value)
              } else {
                isRepet = depts.some((item) => item.code === value)
              }
              isRepet ? callback(new Error('部门重复')) : callback()
            },
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '请选择部门选择人', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
        ],
      },
      formList: [],
    }
  },
  computed: {
    formTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },
  created() {
    this.getDeptsFormList()
  },

  methods: {
    async getDeptsFormList() {
      const res = await getDeptsFormListApi()
      this.formList = res
    },
    CloseBtn() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      }
    },
    async saveBtn() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentData.id
      if (this.formData.id) {
        //编辑时候，因为点击确认的时候，
        await editDeptss(this.formData)
        this.$message.success('编辑成功')
        this.$emit('success')
        this.CloseBtn()
      } else {
        try {
          await addDepts(this.formData)
          this.$message.success('新增成功')
          this.$emit('success')
          this.CloseBtn()
        } catch (err) {
          this.$message.error('新增失败')
        }
      }
    },
    async getDeptById(id) {
      this.formData = await EditDepts(id)
    },
  },
}
</script>

<style scoped></style>
