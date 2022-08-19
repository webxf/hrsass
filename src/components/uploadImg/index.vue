<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :http-request="request"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
      :before-upload="beforeUpload"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="isShow">
      <img :src="imgSrc" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// id:AKIDa0A4h38yXidIhpfEXZKo2zf3C4ey1oKZ
// key:ziALEsEK8fwxsa3GCqELBk24pJVR6k7D
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDa0A4h38yXidIhpfEXZKo2zf3C4ey1oKZ',
  SecretKey: 'ziALEsEK8fwxsa3GCqELBk24pJVR6k7D',
})
console.log(cos)
export default {
  name: 'uploadImg',
  data() {
    return {
      fileList: [],
      imgSrc: '',
      isShow: false,
      loading: false,
    }
  },

  created() {},

  methods: {
    request(res) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'webxf-1313341686' /* 必须 */,
          Region: 'ap-nanjing' /* 存储桶所在地域，必须字段 */,
          Key: 'res.file.name' /* 必须 */,
          StorageClass: 'STANDARD',
          Body: res.file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        function (err, data) {
          console.log(err || data)
        },
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },

    onPreview(file) {
      console.log(file)
      this.isShow = true
      this.imgSrc = file.url
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('请上传' + types.join('、') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能超过2mb')
        return false
      }
      this.loading = false
    },
  },
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
