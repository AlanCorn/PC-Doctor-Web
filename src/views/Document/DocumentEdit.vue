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

const route = useRoute()

const text = ref(route.params.text)

const handleUploadImage = (event, insertImage, files) => {
  console.log('files', files)
  files.forEach((file_item) => {
    fileApi.uploadFile(file_item, 'doc_pic').then(res => {
      console.log(res)
      // 插入图片api 文档：https://code-farmer-i.github.io/vue-markdown-editor/zh/senior/upload-image.html
      insertImage({
        url: getOnlineImageUrl(res.data.file_name,'doc_pic'),
        desc: res.data.file_name,
        width: '500',
        height: 'auto',
      })
    }).catch(err => {
      console.log(err)
    })
  })

}
</script>
