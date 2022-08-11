<template>
  <div class="table-input">
    <Dialog
      title="新增人员"
      :businessIsShow="isShow"
      @close="onClose"
      @cancelBtn="onClose"
      @sureBtn="onaddBtn"
    >
      <el-form ref="form" :model="peopleInfo" label-width="80px">
        <el-form-item label="人员名称：">
          <el-input
            v-model="peopleInfo.userName"
            placeholder="请输入"
            maxlength="5"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-select v-model="peopleInfo.value" placeholder="请选择">
            <el-option
              v-for="item in this.roleList"
              :key="item.value"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input
            v-model="peopleInfo.mobile"
            placeholder="请输入"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="负责区域：">
          <el-select v-model="peopleInfo.value2" placeholder="请选择">
            <el-option
              v-for="item in this.areaList.currentPageRecords"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像：">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="peopleInfo.imageUrl"
              :src="peopleInfo.imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="info">支持扩展名：jpg、png，文件不得大于100kb</div>
        <el-form-item label="状态：" class="status">
          <el-radio-group v-model="peopleInfo.radio">
            <el-radio :label="true">是否启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
name: 'Dialogy'
import Dialog from '@/components/Dialog'
import { addPeopleApi } from '@/api/people'
import { mapState } from 'vuex'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Dialog,
  },
  data() {
    return {
      //新建人员信息
      peopleInfo: {
        value: 0,
        value2: '',
        imageUrl: '',
        radio: true,
        mobile: '',
        userName: '',
      },

      businessIsShow: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },

  created() {},
  computed: {
    //获取人员信息列表
    ...mapState('people', ['workList']),
    //获取角色列表
    ...mapState('people', ['roleList']),
    ...mapState('people', ['areaList']),
  },
  methods: {
    onClose() {
      this.$emit('update:isShow', false)
      console.log(this.roleList)
    },
    async onaddBtn() {
      await addPeopleApi(this.peopleInfo)
      this.$emit('save')
      this.onClose()
    },
    handleAvatarSuccess(res, file) {
      this.peopleInfo.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 < 100

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>

<style scoped lang="scss">
.table-input {
  .el-form-item {
    ::v-deep .el-form-item__label {
      width: 100px !important;
      font-size: 14px !important;
    }
  }
  .el-input {
    width: 80%;
    margin-left: 10px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
::v-deep .avatar-uploader-icon {
  width: 80px;
  height: 80px;
  background: #f3f6fb;
  line-height: 85px;
  margin-left: 10px;
}
.info {
  margin-left: 120px;
  color: #bac0cd;
}
.status {
  margin-top: 20px;
}
::v-deep .el-input--suffix {
  width: 190%;
  margin-left: 10px;
}
</style>



import request from "@/utils/request";
/**
 * 
 * @param {人员信息列表} params 
 * @returns promise
 */
export function getPeopleListApi(params) {
    return request({
      url: '/api/user-service/user/search',
      method: 'GET',
      params
    })
  }
  //人员工作量列表
  export function getWorkPeopleListApi(params) {
    return request({
      url: '/api/user-service/user/searchUserWork',
      method: 'GET',
      params
    })
  } 


  //工单汇总信息(人员统计头部信息)
  export function getPeopleCountApi(data) {
    return request({
      url: `/api/task-service/task/taskReportInfo/${start}/${end}`,
      method: 'GET',
      data
    })
  }

  //编辑修改人员信息
  export function editPeopleApi(data,id) {
    return request({
      url: '/api/user-service/user/'+ id,
      method:'PUT',
      data
    })
  }

  //删除人员列表
  export function delPeopleApi(id) {
    return request({
      url: '/api/user-service/user/'+ id,
      method: 'DELETE',
    })
  }

  //新增人员
  export function addPeopleApi(data) {
    return request({
      url: '/api/user-service/user',
      method: 'POST',
      data
    })
  }

  //角色名称
  export function rolePeopleApi(data) {
    return request({
      url: '/api/user-service/role',
      method: 'GET',
      data
    })
  }

  //区域列表
  export function areaPeopleApi(params) {
    return request({
      url: '/api/vm-service/region/search',
      method: 'GET',
      params
    })
  }