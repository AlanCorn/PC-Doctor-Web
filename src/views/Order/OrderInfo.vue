<template>
  <!--  步骤条-->
  <OrderSteps :onStep="statusToNum"></OrderSteps>
  <div class="flex items-center flex-col">
    <div class="py-5 space-y-6 w-11/12 lg:w-3/4 xl:w-1/2">
      <!-- tip 1： 不属于自己的订单 - 仅供预览 -->
      <div class="alert shadow-lg bg-base-200"
           v-if="formData.status === '0' && !isMyOwnOrder && !isPCDoctor">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="stroke-current flex-shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>该预约不属于你哦，仅供预览</span>
        </div>
      </div>
      <!-- tip 2： 属于自己的订单 - 正在排队提示 -->
      <div class="alert shadow-lg bg-base-200"
           v-if="formData.status === '0' && isMyOwnOrder">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="stroke-current flex-shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>已创建预约，请耐心等待</span>
        </div>
        <div class="flex-none">
          <button class="btn btn-sm btn-ghost" @click="withdrawThisOrder">撤销</button>
        </div>
      </div>
      <!-- tip 3： 电医 - 接单说明 -->
      <div class="alert shadow-lg bg-base-200"
           v-if="formData.status === '0' && isPCDoctor">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="stroke-current flex-shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>电脑医生请合理安排，适量接单</span>
        </div>
      </div>
      <!-- 预约已完成的提示 -->
      <div class="flex items-center justify-center flex-col"
           v-if="formData.status === '2'">
        <div class="grid items-center grid-cols-1 md:grid-cols-2">
          <el-image style="width: 150px; height: 150px"
                    :src="getImageUrl('icon-5.6s-250px.png')"
                    fit="fill"/>
          <div class="text-3xl font-bold text-center">
            已完成！
          </div>
        </div>
<!--        <div class="flex my-5">-->
<!--          <div class="text-2xl font-bold text-center mr-1">-->
<!--            评分-->
<!--          </div>-->
<!--          <div class="rating gap-1 items-center">-->
<!--            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400"/>-->
<!--            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400" checked/>-->
<!--            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400"/>-->
<!--            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400"/>-->
<!--            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400"/>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <!-- 预约信息 -->
      <div class="flex flex-col">
        <div class="title-info"> 预约信息</div>
        <div>
          <div class="ml-2 text-xl lg:text-2xl">{{ formData.problem_description }}</div>
          <div>
            <div class="ml-2 text-md font-thin lg:text-lg">{{ formData.available_time }}</div>
          </div>
          <div class="ml-2 badge bg-secondary text-base-100 border-none badge-lg mx-0.5 my-3" v-for="(each,index) in cateList" :key="index">{{ each }}</div>
          <div class="flex px-1 gap-4 flex-wrap">
            <div class="flex">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"></path>
              </svg>
              <div>{{ createTime }}</div>
            </div>
            <!-- 预约人信息仅自己与电医可见 -->
            <div v-if="isMyOwnOrder || isPCDoctor || isAdmin" class="flex gap-5 flex-wrap">
              <div><div class="inline font-bold">预约人:</div>{{ formData.user_name }}</div>
              <div>{{ formData.contact_details }}</div>
            </div>
          </div>
        </div>
        <!-- 图片 -->
        <div class="pictures grid gap-2 grid-cols-4 lg:grid-cols-5 mt-5">
          <el-image
              v-for="(each,index) in imageUrls"
              :src="each"
              :key="each.id"
              :preview-src-list="imageUrls"
              :initial-index="index"
          >
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <icon-picture/>
                </el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </div>
      <!-- 接单电医信息 -->
      <div class="flex flex-col"
           v-if="formData.status > 0">
        <div class="title-info"> 接单电医</div>
        <div>
          <DoctorCard :doctorInfo="orderDoctor"></DoctorCard>
        </div>
      </div>
      <!-- 状态消息 -->
<!--      <div class="flex flex-col"-->
<!--           v-if="formData.status === '1' || statusMessage.length > 0 && formData.status === '2'">-->
<!--        <div class="title-info"> 状态消息</div>-->
<!--        <ul class="steps steps-vertical">-->
<!--          <li class="step"-->
<!--              v-for="(each,index) in statusMessage"-->
<!--              :key="each.id">-->
<!--            <div class="text-left">-->
<!--              <div><span class="font-bold">{{ each.user_name }} </span> 发送于：{{ sendTime(each.time) }}</div>-->
<!--              <div class="flex items-center">-->
<!--                <div class="text-center">{{ each.message }}</div>-->
<!--                <button class="btn btn-ghost border-base-200 btn-sm ml-2"-->
<!--                        v-if="each.picture.length > 0"-->
<!--                        @click="handleMsgPicPreview(each,index)">查看图片-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </li>-->
<!--          <li class="step"-->
<!--              v-if="formData.status === '1'"-->
<!--          >-->
<!--            <div>-->
<!--              <label for="addMessageDialog" class="btn border-base-200 mx-1">添加消息</label>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
      <div class="flex justify-center gap-1.5">
        <!-- 操作按钮 接单按钮 status：排队中 电医可见 -->
        <div class="btn btn-primary" @click="takeOrder" v-if="formData.status === '0' && isPCDoctor">接单</div>
        <!-- 操作按钮 标记完成 status：正在处理 “接单的那个”电医与用户可见 -->
        <div class="btn btn-primary" @click="finishOrder" v-if="formData.status === '1' && (isOrderPCDoctor || isMyOwnOrder)">预约完成</div>
        <!-- 操作按钮 删除预约 status：all -->
        <label for="deleteConfirmDialog" class="btn btn-error" v-if="isAdmin">删除</label>
        <div class="btn" @click="backRouter">返回</div>
      </div>
    </div>
  </div>
  <!-- 对话框-添加消息 -->
  <input type="checkbox" id="addMessageDialog" class="modal-toggle"/>
  <div class="modal">
    <div class="modal-box p-5">
      <div class="font-bold text-2xl">添加消息</div>
      <div class="my-3">
        <el-input
            v-model="sendingStatusMessage.message"
            :rows="2"
            type="textarea"
            autosize
            placeholder="请输入要发送的消息"
        />
      </div>
      <div>
        <el-upload
            v-model:file-list="pictureWall.fileList"
            :accept="acceptFiletype"
            list-type="picture-card"
            :before-upload="beforeUploadFile"
            :http-request="uploadFile"
            :on-preview="handlePictureCardPreview"
            :before-remove="handleBeforeRemove"
            :on-exceed="handleCountExceed"
            :limit="10"
        >
          <el-icon>
            <Plus/>
          </el-icon>
        </el-upload>
      </div>
      <div class="modal-action">
        <label for="addMessageDialog"
               class="btn"
               @click="addMessageConfirm">
          确认
        </label>
        <label for="addMessageDialog" class="btn">取消</label>
      </div>
    </div>
  </div>
  <!-- 对话框-管理员删除确认 -->
  <input type="checkbox" id="deleteConfirmDialog" class="modal-toggle"/>
  <label for="deleteConfirmDialog" class="modal cursor-pointer">
    <div class="modal-box p-5">
      <div class="font-bold text-2xl">确认删除？</div>
      <div class="font-light text-md mt-3">确认删除该预约？操作将不可反悔</div>
      <div class="modal-action">
        <label for="deleteConfirmDialog"
               class="btn btn-error"
               @click="confirmDeleteOrder">
          确认
        </label>
        <label for="deleteConfirmDialog" class="btn">取消</label>
      </div>
    </div>
  </label>
  <!-- 图片预览 -->
  <el-image-viewer
      @close="handleViewerClose"
      :url-list="pictureWallPreview"
      v-if="pictureWall.previewVisible"
      :initial-index="pictureWall.previewIndex">
  </el-image-viewer>
</template>

<script setup>
import { computed, reactive } from "vue";
import { Picture as IconPicture } from '@element-plus/icons-vue'

import { notify } from "@kyvg/vue3-notification";
import { Plus } from '@element-plus/icons-vue'
// axios请求接口
import fileApi from "@/api/file"
import userApi from "@/api/userApi"
import adminApi from "@/api/adminApi"
import {getOnlineImageUrl, timeFormatter, getImageUrl} from "@/utils"
import OrderSteps from "./OrderSteps.vue"
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import DoctorCard from "../../components/DoctorCard.vue";

const store = useStore()
const router = useRouter()
const route = useRoute()

// 获取预约信息
store.dispatch('getOrderFormData',route.query.id)


function pushRouter(path) {
  router.push(path)
}

function backRouter() {
  router.back()
}
// 1. 预约详情信息
let formData = computed(() => store.state.order.orderFormData)
let orderDoctor = computed(() => store.state.order.orderDoctorInfo)
const cateList = computed(() => {
  if (formData.value.problem_category)  return formData.value.problem_category.split(',')
  else return []
})
const createTime = computed(() => timeFormatter(formData.value.create_time))
const imageUrls = computed(() => store.getters.getOrderFormDataImagesUrls)
// 检验是否是属于用户的订单
const isMyOwnOrder = computed(() => formData.value.user_id ===  store.state.user.user_id)
// 检验是否是电医
const isPCDoctor = computed(() => store.state.user.level === "1")
// 检验是否是管理员
const isAdmin = computed(() => store.state.user.level === "2")
// 检验是否是“接单的那个”电医
const isOrderPCDoctor = computed(() =>
    store.state.user.level === "1" && store.state.user.user_id === store.state.order.orderFormData.doctor_id
)
// 步骤条状态码计算属性
const statusToNum = computed(() => parseInt(formData.value.status) + 1)

// 2. 状态消息
const statusMessage = computed(() => store.state.order.orderStatusMessage)
const sendTime = (time) => timeFormatter(time)
if (formData.value.status > 0) store.dispatch('getOrderStatusMessage', formData.value.id)
const handleMsgPicPreview = (msg, index) => {
  pictureWall.type = 1
  pictureWall.indexOfMsg = index
  pictureWall.previewVisible = true
}

// 3. el-image-viewer的关闭钩子
const handleViewerClose = () => {
  pictureWall.previewVisible = false
  // 将预览来源重新设置为预览消息对话框中上传的图片
  if (pictureWall.type === 1) pictureWall.type = 0
}
// 4. 发送消息的对话框
const sendingStatusMessage = reactive({
  message: '',
  pictures: []
})

const addMessageConfirm = () => {
  if (!sendingStatusMessage.message && sendingStatusMessage.pictures.length === 0) {
    notify({
      type: 'warn',
      title: '消息不能为空'
    });
  } else {
    let message
    sendingStatusMessage.message ? message = sendingStatusMessage.message : message = "发送了图片消息"
    userApi.addOrderMessage({
      id: formData.value.id,
      name: formData.value.name,
      message: message,
      picture: sendingStatusMessage.pictures
    }).then(res => {
      notify({
        type: 'success',
        title: "成功🎉",
      })
      store.dispatch('getOrderStatusMessage', formData.value.id)
    })
  }
}

// Element Plus 照片墙数据
const pictureWall = reactive({
  fileList: [],
  previewVisible: false,
  previewIndex: 0, // 从哪一张图片开始预览
  type: 0,  // 0 预览消息对话框中上传的图片，1 预览来自消息的图片
  indexOfMsg: 0  // 若type为1,那么要预览哪条消息里的图片
})
// 照片墙预览 urls
const pictureWallPreview = computed(() => {
  if (pictureWall.type === 0) {
    return getOnlineImageUrl(sendingStatusMessage.pictures.toString())
  } else {
    return getOnlineImageUrl(statusMessage.value[pictureWall.indexOfMsg].picture.toString())
  }
})
// 得到照片墙中某个文件的索引
const currentIndex = (file) => pictureWall.fileList.findIndex((checkItem) => checkItem.name === file.name)
// 接受的文件类型
const acceptFiletype = '.jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PBG,.GIF'
// 照片墙钩子
const handleBeforeRemove = (uploadFile) => {
  // 删除某张图片
  const deleteIndex = currentIndex(uploadFile)
  console.log('uploadFile在fileList中的index', deleteIndex)
  sendingStatusMessage.pictures = sendingStatusMessage.pictures.filter((checkItem, index) => index !== deleteIndex)
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
      type: 'warn',
      title: "上传失败",
      text: "请上传jpg/jpeg/png/gif/bmp格式的文件"
    })
    return false;
  }

  const isLt10M = file.size / 1024 / 1024 < 10;

  if (!isLt10M) {
    notify({
      type: 'warn',
      title: "上传失败",
      text: "文件大小不能超过 10MB"
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
        type: 'error',
        title: "上传失败！",
        text: "请联系管理员解决"
      });
    })
  }).then(res => {
    // 成功上传到服务器，向表单中添加数据
    sendingStatusMessage.pictures.push(res.data.file_name);
  })
}
const handleCountExceed = () => {
  notify({
    type: 'warn',
    title: "上传失败",
    text: "图片上限为10张"
  });
}

// 其他方法
// 1. 撤销预约
const withdrawThisOrder = () => {
  userApi.withdrawOrder(formData.value.id).then(res => {
    pushRouter('/order')
    notify({
      type: 'success',
      title: "已撤销预约",
    })
  }).catch(err => {
    notify({
      type: 'fail',
      title: "撤销失败",
    })
  })
}
// 2. 删除预约
const confirmDeleteOrder = () => {
  adminApi.deleteOrder(formData.value.id).then(res => {
    if (res.data.code === 0) {
      pushRouter('/order')
      notify({
        type: 'success',
        title: "已删除预约",
      })
    }
  }).catch(err => {
    notify({
      type: 'fail',
      title: "撤销失败",
    })
  })
}
// 3. 电医接单
const takeOrder = () => {
  userApi.takeOrder(formData.value.id, store.state.user.user_id).then(res => {
    if (res.data.code === 0) {
      store.dispatch('getOrderFormData',formData.value.id)
      notify({
        type: 'success',
        title: "已成功接单",
      })
    }
  }).catch(err => {
    notify({
      type: 'error',
      title: "失败",
    })
    console.log(err)
  })
}
// 4. 标记完成
const finishOrder = () => {
  userApi.finishOrder(formData.value.id).then(res => {
    if (res.data.code === 0) {
      store.dispatch('getOrderFormData',formData.value.id)
      notify({
        type: 'success',
        title: "预约订单完成",
      })
    }
  }).catch(err => {
    notify({
      type: 'error',
      title: "修改失败",
    })
    console.log(err)
  })
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