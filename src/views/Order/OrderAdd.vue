<template>
  <!--  步骤条-->
  <OrderSteps :onStep="0"></OrderSteps>
  <div class="flex items-center flex-col">
    <div class="py-5 space-y-6 w-11/12 lg:w-3/4 xl:w-1/2">
      <div>
        <label class="block text-2xl font-bold "> 姓名 </label>
        <el-input v-model="formData.name" placeholder="请输入姓名" />
      </div>
      <div>
        <label class="block text-2xl font-bold "> 联系方式 </label>
        <el-radio-group style="display:block" v-model="formData.radio">
          <el-radio label="QQ">QQ</el-radio>
          <el-radio label="WeChat">WeChat</el-radio>
          <el-radio label="Phone">Phone</el-radio>
        </el-radio-group>
        <el-input v-model="formData.contact_details" placeholder="请输入联系方式(QQ/微信/手机号)" />
      </div>
      <div>
        <label class="block text-2xl font-bold "> 问题描述 </label>
        <el-input
            v-model="formData.problem_description"
            :rows="2"
            type="textarea"
            autosize
            placeholder="描述你遇到的问题，并留下希望电脑医生帮助你解决问题的时间、地点。"
        />
      </div>
      <div>
        <label class="block text-2xl font-bold"> 问题分类 </label>
        <el-checkbox-group v-model="formData.problem_category" >
          <el-checkbox v-for="(each) in cateList" key="index" :label="each" />
        </el-checkbox-group>
      </div>
      <div>
        <label class="block text-2xl font-bold"> 图片 </label>
        <div>
          <el-upload
              v-model:file-list="pictureWall.fileList"
              :action="url"
              :accept="acceptFiletype"
              list-type="picture-card"
              :before-upload="beforeUploadFile"
              :http-request="uploadFile"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handlePictureUploadSuccess"
              :on-exceed="handleCountExceed"
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
      <label for="my-modal" class="btn modal-button mx-1" >提交</label>
      <button class="btn mx-1 btn-accent" @click="pushRouter('/order')">取消</button>
    </div>
  </div>
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-2xl">是否确认提交预约表单？</h3>
      <div class="modal-action">
        <label for="my-modal" class="btn" @click="submitForm">确认</label>
        <label for="my-modal" class="btn btn-accent">取消</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { Plus } from '@element-plus/icons-vue'
// axios请求接口
import baseUrl from "@/api/urls"
import fileApi from "@/api/file"
import userApi from "@/api/order"

import { useStore } from "vuex";
import { useRouter } from "vue-router";

import OrderSteps from "./OrderSteps.vue"

const store  = useStore()
const router = useRouter()

function pushRouter(path) {
  router.push(path)
}

// 表单数据
let formData = reactive({
  name:'',
  radio:'QQ',
  contact_details:'',
  problem_description:'',
  problem_category:[],
  problem_picture:[],
})

// store里的类别表
const  cateList = computed(() => store.state.order.cateList)
// 提交预约表单方法
const submitForm = () => {
  console.log(formData)
  // 判空处理
  const showInfo = (text) => {
    notify({
      type:'warn',
      title:text
    });
  }
  if (!formData.name) showInfo('请输入姓名')
  else if (!formData.contact_details) showInfo('请输入联系方式')
  else if (!formData.problem_description) showInfo('请输入问题描述')
  else if (formData.problem_category.length === 0) showInfo('请选择问题类别')
  else if (formData.name.length > 20) showInfo('姓名长度大于20！')
  else if (formData.contact_details.length > 20) showInfo('联系方式长度大于20！')
  else if (formData.problem_description.length > 250) showInfo('问题描述长度大于250！')
  else {
    // 通过非空判断，提交表单
    userApi.submitOrder(formData).then(res => {
      console.log(res)
      store.commit('updateOrderFormData',formData)
      router.push('/orderInfo')
      notify({
        type:'success',
        title:"提交成功🎉",
        text:'已成功提交，请耐心等待'
      })
    }).catch(err => {
      console.log(err)
    })
  }
}

// Element Plus 照片墙数据
const pictureWall = reactive({
  fileList:[],
  dialogImageUrl :'',
  dialogVisible :false
})

// 照片墙钩子
const acceptFiletype = '.jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PBG,.GIF'
const url = baseUrl.testUrl + '/upload'
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePictureCardPreview = (file) => {
  pictureWall.dialogImageUrl = file.url
  console.log(pictureWall.dialogImageUrl)
  pictureWall.dialogVisible = true
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
    fileApi.uploadFile(options).then(res => {
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
    formData.problem_picture.push(res.data);
  })
}
const handleCountExceed = () => {
  notify({
    type:'warn',
    title: "上传失败",
    text:"图片上限为10张"
  });
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
