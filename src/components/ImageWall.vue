<!-- @@@ 未使用的组件，有封装的想法，但还不太会-->

<template>
  <el-upload
      v-model:file-list="pictureWall.fileList"
      :action="url"
      :accept="acceptFiletype"
      list-type="picture-card"
      :before-upload="beforeUploadFile"
      :http-request="uploadFile"
      :on-preview="handlePictureCardPreview"
      :before-remove="handleBeforeRemove"
      :on-remove="handleRemove"
      :on-exceed="handleCountExceed"
      :limit="10"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-image-viewer
      @close="pictureWall.previewVisible = false"
      :url-list="pictureWallPreview"
      v-if="pictureWall.previewVisible"
      :initial-index="pictureWall.previewIndex">
  </el-image-viewer>
</template>

<script setup>
import { computed, reactive } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { Plus } from '@element-plus/icons-vue'
// axios请求接口
import baseUrl from "@/api/urls"
import fileApi from "@/api/file"
import { getOnlineImageUrl } from "../utils";

import { useStore } from "vuex";
import { useRouter } from "vue-router";


const store  = useStore()
const router = useRouter()

// Element Plus 照片墙数据
const pictureWall = reactive({
  fileList:[],
  previewVisible :false,
  previewIndex : 0
})
// 照片墙预览 urls
const pictureWallPreview = computed(() => getOnlineImageUrl(formData.problem_picture.toString()))
// 得到照片墙中某个文件的索引
const currentIndex = (file) => pictureWall.fileList.findIndex((checkItem) => checkItem.name === file.name)
// 接受的文件类型
const acceptFiletype = '.jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PBG,.GIF'
// 照片墙上传api地址
const url = baseUrl.testUrl + '/upload'
// 照片墙钩子
const handleBeforeRemove = (uploadFile,uploadFiles) => {
  // 删除某张图片
  const deleteIndex = currentIndex(uploadFile)
  console.log('uploadFile在fileList中的index',deleteIndex)
  formData.problem_picture = formData.problem_picture.filter((checkItem,index) => index !== deleteIndex)
}
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePictureCardPreview = (file) => {
  pictureWall.previewIndex = pictureWall.fileList.findIndex((checkItem) => checkItem.name === file.name)
  pictureWall.previewVisible = true
}
const beforeUploadFile = (file) => {
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
  const whiteList = ["jpg", "jpeg", "png", "gif"];
  // 文件类型检验
  if (whiteList.indexOf(fileSuffix) === -1) {
    notify({
      type:'warn',
      title: "上传失败",
      text:"请上传jpg/jpeg/png/gif/bmp格式的文件"
    })
    return false;
  }

  const isLt10M = file.size / 1024 / 1024 < 10;

  if (!isLt10M) {
    notify({
      type:'warn',
      title: "上传失败",
      text:"文件大小不能超过 10MB"
    })
    return false;
  }
}
const uploadFile = (options) => {
  return new Promise((resolve) => {
    fileApi.uploadFile(options.file).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      notify({
        type:'error',
        title: "上传失败！",
        text: "请联系管理员解决"
      });
    })
  }).then(res => {
    // 成功上传到服务器
    formData.problem_picture.push(res.data.file_name);
  })
}
const handleCountExceed = () => {
  notify({
    type:'warn',
    title: "上传失败",
    text:"图片上限为10张"
  });
}
</script>

<style lang='scss' scoped>

</style>