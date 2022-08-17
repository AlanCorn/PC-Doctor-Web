<template>
  <div class="flex flex-col items-center">
    <!--    <el-page-header :icon="ArrowLeft" content="文档" />-->
    <div class="card w-11/12 my-10">
      <v-md-editor
          v-model="text"
          height="800px"
          :disabled-menus="[]"
          @upload-image="handleUploadImage"
      ></v-md-editor>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRoute} from "vue-router";
// import { ArrowLeft } from '@element-plus/icons-vue'
import fileApi from "../../api/file";
import { getOnlineImageUrl } from "../../utils"
import {notify} from "@kyvg/vue3-notification";

const route = useRoute()

const text = ref(route.params.text)

const handleBeforeUpload  = (file) => {
  // 文件后缀检验
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
  const whiteList = ["jpg", "jpeg", "png", "gif"];
  // 文件类型检验
  if (whiteList.indexOf(fileSuffix) === -1) {
    notify({
      type:'warn',
      title: "上传失败",
      text:"请上传jpg/jpeg/png/gif格式的文件"
    })
    return false;
  }

  const isLt10M = file.size / 1024 / 1024 < 15;

  if (!isLt10M) {
    notify({
      type:'warn',
      title: "上传失败",
      text:"文件大小不能超过 15MB"
    })
    return false;
  }
  return true
}
const handleUploadImage = (event, insertImage, files) => {
  console.log('files', files)
  files.forEach((file_item) => {
    if (handleBeforeUpload(file_item)) {
      fileApi.uploadFile(file_item, 'doc_pic').then(res => {
        // 插入图片api 文档：https://code-farmer-i.github.io/vue-markdown-editor/zh/senior/upload-image.html
        insertImage({
          url: getOnlineImageUrl(res.data.file_name,'doc_pic'),
          desc: res.data.file_name,
          width: '500',
          height: 'auto',
        })
      }).catch(err => {
        notify({
          type:'warn',
          title: "上传失败",
          text:"服务器连接错误，请联系管理员解决"
        })
      })
    }
  })

}


</script>
