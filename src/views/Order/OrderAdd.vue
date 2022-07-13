<template>
  <div class="flex items-center flex-col ">
      <ul class="steps steps-horizontal my-10 w-11/12 md:w-1/2">
        <li v-for="(each,index) in steps" key="index"
            :class="{'step':true,'step-primary':isActive(index)}">
          {{ each }}
        </li>
      </ul>
  </div>
  <div class="flex items-center flex-col">
    <div class="px-4 py-5 space-y-6 sm:p-6">
      <div>
        <label class="block text-2xl font-medium "> 姓名 </label>
        <el-input v-model="formData.name" placeholder="请输入姓名" />
      </div>
      <div>
        <label class="block text-2xl font-medium "> 联系方式 </label>
        <el-radio-group style="display:block" v-model="formData.radio">
          <el-radio label="QQ">QQ</el-radio>
          <el-radio label="WeChat">WeChat</el-radio>
          <el-radio label="Phone">Phone</el-radio>
        </el-radio-group>
        <el-input v-model="formData.contact_details" placeholder="请输入联系方式(QQ/微信/手机号)" />
      </div>
      <div>
        <label class="block text-2xl font-medium "> 问题描述 </label>
        <el-input
            v-model="formData.problem_description"
            :rows="2"
            type="textarea"
            placeholder="描述你遇到的问题，并留下希望电脑医生帮助你解决问题的时间、地点。"
        />
      </div>
      <div>
        <label class="block text-2xl font-medium"> 问题分类 </label>
        <el-checkbox-group v-model="formData.problem_category" >
          <el-checkbox v-for="(each,index) in cateList" key="index" :label="each" />
        </el-checkbox-group>
      </div>
      <div>
        <label class="block text-2xl font-medium"> 图片 </label>
        <div class="">
          <el-upload
              v-model:file-list="pictureWall.fileList"
              :action="url"
              accept="image"
              list-type="picture-card"
              :http-request="uploadFile"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handlePictureUploadSuccess"
              :limit="10"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="pictureWall.dialogVisible">
            <img :src="pictureWall.dialogImageUrl" alt="Preview Image"/>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="my-5 px-4 py-3  text-right sm:px-6">
      <button class="btn mx-1" @click="submitForm">提交</button>
      <button class="btn mx-1 btn-accent" @click="pushRouter('/order')">取消</button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { notify } from "@kyvg/vue3-notification";
import { Plus } from '@element-plus/icons-vue'
import baseUrl from "@/api/urls"
import fileApi from "@/api/file"
import {useRouter} from "vue-router";

const store  = useStore()
const router = useRouter()

function pushRouter(path) {
  router.push(path)
}
// 进度条
const steps = ['填写表单','提交表单','正在处理','已完成']
const onStep = 1
const isActive = (index) => {
  return index < onStep;
}

// 表单数据
let formData = reactive({
  name:'',
  radio:'QQ',
  contact_details:'',
  problem_description:'',
  problem_category:[],
  problem_picture:[],
  problem_video:[]
})

// store里的类别表
const  cateList = computed(() => store.state.order.cateList)
// 提交预约表单方法
const submitForm = () => {
  notify({
    type:'warn',
    title: "Vue 3 notification",
    text:"hhhhhhhhhhhhhhh"
  });
}

// Element Plus 照片墙数据
const pictureWall = reactive({
  fileList:[],
  dialogImageUrl :'',
  dialogVisible :false
})

// 照片墙钩子
const url = baseUrl.testUrl + '/upload'
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePictureCardPreview = (file) => {
  pictureWall.dialogImageUrl = file.url
  console.log(pictureWall.dialogImageUrl)
  pictureWall.dialogVisible = true
}
const uploadFile = (options) => {
  return new Promise((resolve,reject) => {
    console.log(options)
    fileApi.uploadFile(options).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  }).then(res => {
    notify({
      type:'success',
      title: "上传成功🎉",
    });
    console.log(res)
  })
}
const handlePictureUploadSuccess = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
</script>

<style lang="scss" scoped>
  .el-input {
    width: 300px
  }
</style>
