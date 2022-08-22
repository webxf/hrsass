<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            v-isHas="point.employees.import"
            >导入</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="importemploy"
            v-isHas="point.employees.export"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="addFn"
            v-isHas="point.employees.add"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employ">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgerror="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                alt=""
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                @click="erma(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatterOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="row">
              {{ row.timeOfEntry | formateTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="grey"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="assinRole(row)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delFn(row.id)"
                v-isHas="point.employees.del"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
        </el-row>
        <el-pagination
          layout="prev, pager, next"
          :page-size="pages.size"
          :current-page="pages.page"
          :total="total"
          @current-change="currentChange"
        >
        </el-pagination>
      </el-card>
    </div>
    <addEmployees :visible.sync="isShow"></addEmployees>
    <el-dialog :visible.sync="erShow" title="二维码">
      <canvas id="canvas"></canvas>
    </el-dialog>
    <!-- 分配角色 -->
    <assinRole :visible.sync="visible" :roleId="currentId"></assinRole>
  </div>
</template>

<script>
import { getUserInfoApi, delEmployee } from '@/api/empioyee'
import employees from '@/constant/employees'
import addEmployees from './components/addEmployees.vue'
const { exportExcelMapPath, hireType } = employees
import QRcode from 'qrcode'
import mixinspermissions from '@/mixins/permission'

import assinRole from './components/assin-role.vue'
export default {
  components: {
    addEmployees,
    assinRole,
  },
  data() {
    return {
      visible: false,
      employ: [],
      total: 0,
      pages: {
        page: 1,
        size: 5,
      },
      isShow: false,
      erShow: false,
      currentId: '',
      // point: permissionPoint,
    }
  },
  mixinspermissions: [employees],
  created() {
    this.getUserInfo()
  },
  methods: {
    erma(staffPhoto) {
      if (!staffPhoto) return this.$message.error('用户未登录')
      this.erShow = true
      this.$nextTick(() => {
        const canvas = document.querySelector('#canvas')
        QRcode.toCanvas(canvas, staffPhoto)
      })
    },
    async getUserInfo() {
      const { rows, total } = await getUserInfoApi(this.pages)
      this.employ = rows
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getUserInfo()
    },
    formatterOfEmployment(row, column, cellValue, index) {
      //通过映射，因为是一个数组，所以需要通过find来查找每一项，这样使得数据更灵活
      const findItem = employees.hireType.find((item) => (item.id = cellValue))
      return findItem ? findItem.value : '未知'
    },
    async delFn(id) {
      await this.$confirm('您确定删除该员工吗')
      await delEmployee(id)
      this.$message.success('删除成功')
      this.getUserInfo()
    },
    addFn() {
      this.isShow = true
    },
    async importemploy() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getUserInfoApi({
        page: 1,
        size: this.total,
      })

      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
    },
    assinRole(row) {
      this.currentId = row.id

      this.visible = true
    },
  },
}
</script>

<style scoped lang="less"></style>
