<template>
  <div class="flex flex-col items-center">
    <!--    <el-page-header :icon="ArrowLeft" content="文档" />-->
    <div class="card w-11/12 my-10">
      <v-md-editor
          v-model="pageInfo.text"
          height="800px"
          left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link tip image code | save"
          :disabled-menus="[]"
          @save="handleClickSave"
          @upload-image="handleUploadImage"
      ></v-md-editor>
    </div>
  </div>
  <!-- 点击保存-显示对话框 -->
  <input v-model="pageInfo.ifShowModel" type="checkbox" id="confirmUpdateModal" class="modal-toggle"/>
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="font-bold text-2xl">确认修改？</div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">标题</span>
        </label>
        <input v-model="pageInfo.formData.title" type="text" placeholder="请输入标题" class="input input-bordered w-full max-w-xs" />
        <label class="label">
          <span class="label-text">简介</span>
        </label>
        <textarea  v-model="pageInfo.formData.summary" class="textarea textarea-bordered h-24" placeholder="请输入简介(50字以内)"></textarea>
      </div>
      <div class="modal-action">
        <label for="confirmUpdateModal" class="btn btn-primary" @click="confirmUpdate">确认</label>
        <label for="confirmUpdateModal" class="btn">取消</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
// import { ArrowLeft } from '@element-plus/icons-vue'
import fileApi from "../../api/file";
import adminApi from "@/api/adminApi";

import {getOnlineImageUrl} from "@/utils"
import {notify} from "@kyvg/vue3-notification";


const pageInfo = reactive({
  formData:{
    title:'',       // 文档标题
    summary:'',     // 文档简介
    file:''         // 服务器上的文件名
  },
  text:'',          // 文档编辑内容
  ifShowModel:false   // 对话框显示与隐藏
})

// 上传图片相关的回调函数
const handleBeforeUpload = (file) => {
  // 文件后缀检验
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
  const whiteList = ["jpg", "jpeg", "png", "gif"];
  // 文件类型检验
  if (whiteList.indexOf(fileSuffix) === -1) {
    notify({
      type: 'warn',
      title: "上传失败",
      text: "请上传jpg/jpeg/png/gif格式的文件"
    })
    return false;
  }

  const isLt15M = file.size / 1024 / 1024 < 15;

  if (!isLt15M) {
    notify({
      type: 'warn',
      title: "上传失败",
      text: "文件大小不能超过 15MB"
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
          url: getOnlineImageUrl(res.data.file_name, 'doc_pic'),
          desc: res.data.file_name,
          width: '500',
          height: 'auto',
        })
      }).catch(err => {
        notify({
          type: 'warn',
          title: "上传失败",
          text: "服务器连接错误，请联系管理员解决"
        })
      })
    }
  })

}

// 保存文档相关代码

const handleClickSave = (text, html) => {
  pageInfo.ifShowModel = true
  pageInfo.text = text
}
// 确认保存文档或确认修改
const confirmUpdate = () => {
  // 包装文件
  const file = new File([pageInfo.text], "Markdown基本语法.md", {
    type: "text/plain",
  });
  new Promise((resolve) => {
    fileApi.uploadFile(file,'doc').then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      notify({
        type: 'error',
        title: "上传失败！",
        text: "请联系管理员解决"
      });
    })
  }).then(res => {
    if (res.data.code === 0) {
      pageInfo.formData.file = res.data.file_name
      // 文件已上传成功，提交表单
      adminApi.addDocument(pageInfo.formData).then(res => {
        console.log(res)
      })
    }
  })
}
</script>
