<template>
  <!--  步骤条-->
  <OrderSteps :onStep="1"></OrderSteps>
  <div class="flex items-center flex-col">
    <div class="py-5 space-y-6 w-11/12 lg:w-3/4 xl:w-1/2">
      <!-- 预约信息 -->
      <div class="flex flex-col">
        <div class="block text-2xl font-bold "> 预约信息 </div>
        <div>
          <div class="ml-2 text-2xl">{{ formData.problem_description }}</div>
          <div class="ml-2 badge mx-0.5" v-for="(each,index) in cateList" :key="index">{{ each }}</div>
          <div class="flex px-1">
            <svg class="fill-current w-6 h-6 text-neutral" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4284" width="128" height="128"><path d="M722.678 524.908c-59.267-46.975-132.445-74.779-211.678-74.78 106.324-0.003 192.516-86.196 192.516-192.521 0-106.327-86.195-192.521-192.522-192.521s-192.521 86.194-192.521 192.52c0 106.325 86.191 192.518 192.515 192.521-197.461 0.004-357.534 172.391-357.534 385.043h366.899c-1.404-11.512-2.348-23.161-2.348-35.053 0-129.959 86.298-239.655 204.673-275.209z" p-id="4285"></path><path d="M792.598 581.627c-105.659 0-191.313 85.654-191.313 191.313s85.654 191.313 191.313 191.313S983.911 878.6 983.911 772.94s-85.654-191.313-191.313-191.313z m73.582 230.672h-80.94c-17.673 0-32-14.327-32-32V662.567c0-17.673 14.327-32 32-32s32 14.327 32 32v85.731h48.939c17.673 0 32 14.327 32 32s-14.326 32.001-31.999 32.001z" p-id="4286"></path></svg>
            <div>{{ status }}</div>
          </div>
          <div class="flex px-1">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
            <div>{{ createTime }} </div>
          </div>
        </div>
        <!-- 图片 -->
        <div class="pictures grid gap-2 grid-cols-3 lg:grid-cols-4">
          <el-image
              v-for="(each,index) in imageUrls"
              :src="each"
              :preview-src-list="imageUrls"
              :initial-index="index"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </div>
      <!-- 接单电医信息 -->
      <div class="flex flex-col">
        <div class="block text-2xl font-bold "> 接单电医 </div>
        <div>
            todo:是否要为电医制作名片？还是仅展示基本信息
        </div>
        <div>
          暂无
        </div>
      </div>
      <!-- 状态消息 -->
      <div class="flex flex-col">
        <div class="block text-2xl font-bold "> 状态消息 </div>
        <ul class="steps steps-vertical">
          <li class="step">
            <div>
              <div class="text-left font-bold">电医-杨志文</div>
              <div>可以换个视角再拍一张照片吗？</div>
            </div>
          </li>
          <li class="step">
            <div>
              <div class="text-left font-bold">委托人</div>
              <div>上传了一张照片 <button class="btn btn-ghost border-base-200">点击查看</button></div>
            </div>
          </li>
          <li class="step" data-content="">
            <div>
              <label for="addMessageDialog" class="btn btn-ghost border-base-200 mx-1">添加消息</label>
              <label for="addImageDialog" class="btn btn-ghost border-base-200 mx-1">上传图片</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 对话框-添加消息 -->
  <input type="checkbox" id="addMessageDialog" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box p-5">
      <div class="font-bold text-2xl">添加消息</div>
      <el-input
          v-model="inputMessage"
          :rows="2"
          type="textarea"
          autosize
          placeholder="请输入要发送的消息！"
      />
      <div class="modal-action">
        <label for="addMessageDialog" class="btn">确认</label>
        <label for="addMessageDialog" class="btn">取消</label>
      </div>
    </div>
  </div>
  <!-- 对话框-上传图片 -->
  <input type="checkbox" id="addImageDialog" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <div class="font-bold text-2xl">上传图片</div>
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
      </div>
      <div class="modal-action">
        <label for="addImageDialog" class="btn">确认</label>
        <label for="addImageDialog" class="btn">取消</label>
      </div>
    </div>
  </div>
  <!-- 图片预览 -->
  <div class="imagePreviewDialog">
    <el-dialog v-model="pictureWall.dialogVisible">
      <img :src="pictureWall.dialogImageUrl" alt="Preview Image"/>
    </el-dialog>
  </div>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import { Picture as IconPicture } from '@element-plus/icons-vue'

import { notify } from "@kyvg/vue3-notification";
import { Plus } from '@element-plus/icons-vue'
// axios请求接口
import baseUrl from "@/api/urls"
import fileApi from "@/api/file"
import userApi from "@/api/order"
import { timeFormatter } from "@/utils"

import { useStore } from "vuex";
import { useRouter } from "vue-router";

import OrderSteps from "./OrderSteps.vue"
import {rule} from "postcss";

const store  = useStore()
const router = useRouter()

function pushRouter(path) {
  router.push(path)
}

// 1. 预约详情信息
let formData = computed(() => store.state.order.orderFormData)
const cateList = computed(() => {
  return formData.value.problem_category.split(',')
})
const status = computed(() => {
  switch (formData.value.status) {
    case 0:
      return "待受理"
    case 1:
      return "已受理"
    case 2:
      return "已完成"
  }
})
const createTime = computed(() => timeFormatter(formData.value.create_time))
// @todo：测试url数据
const imageUrls = computed(() => store.getters.getOrderFormDataImagesUrls)



// 2. 发送消息的对话框
const inputMessage = ref()
const sendMessage = ref()

// 3. 发送图片的对话框
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
    // fileApi.uploadFile(options).then(res => {
    //   resolve(res)
    // }).catch(err => {
    //   console.log(err)
    //   notify({
    //     type:'error',
    //     title: "上传失败！",
    //     text: "请联系管理员解决"
    //   });
    // })
  }).then(res => {
    // @todo:成功上传到服务器
    // formData.problem_picture.push(res.data);
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
  .pictures .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }
</style>