<template>
  <!--  步骤条-->
  <OrderSteps :onStep="formData.status + 1"></OrderSteps>
  <div class="flex items-center flex-col">
    <div class="py-5 space-y-6 w-11/12 lg:w-3/4 xl:w-1/2">
      <!-- 不属于自己的订单 - 仅供预览 -->
      <div class="alert shadow-lg bg-base-200"
           v-if="formData.status === '0' && !isMyOwnOrder">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="stroke-current flex-shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>该预约不属于你哦，仅供预览</span>
        </div>
      </div>
      <!-- 属于自己的订单 - 正在排队提示 -->
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
      <!-- 预约已完成的提示 -->
      <div class="flex items-center justify-center flex-col"
           v-if="formData.status === 2">
        <div class="grid items-center grid-cols-1 md:grid-cols-2">
          <el-image style="width: 200px; height: 200px"
                    :src="getImageUrl('icon-5.6s-250px.png')"
                    fit="fill"/>
          <div class="text-4xl font-bold text-center">
            已完成！
          </div>
        </div>
        <div class="flex my-5">
          <div class="text-2xl font-bold text-center mr-1">
            评分
          </div>
          <div class="rating gap-1 items-center">
            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400"/>
            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400" checked/>
            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400"/>
            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400"/>
            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400"/>
          </div>
        </div>

      </div>
      <!-- 预约信息 -->
      <div class="flex flex-col">
        <div class="title-info"> 预约信息</div>
        <div>
          <div class="ml-2 text-lg lg:text-xl">{{ formData.problem_description }}</div>
          <div class="ml-2 badge badge-lg mx-0.5 my-3" v-for="(each,index) in cateList" :key="index">{{ each }}</div>
          <div class="flex px-1">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"></path>
            </svg>
            <div>{{ createTime }}</div>
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
          todo:电医名片:接单数量，回复消息条数和及时程度，评价等
          <!--            @todo:是否要为电医制作名片？还是仅展示基本信息-->
        </div>
      </div>
      <!-- 状态消息 -->
      <div class="flex flex-col"
           v-if="formData.status > 0">
        <div class="title-info"> 状态消息</div>
        <ul class="steps steps-vertical">
          <li class="step"
              v-for="(each,index) in statusMessage"
              :key="each.id">
            <div class="text-left">
              <div><span class="font-bold">{{ each.user_name }} </span> 发送于：{{ sendTime(each.time) }}</div>
              <div class="flex items-center">
                <div class="text-center">{{ each.message }}</div>
                <button class="btn btn-ghost border-base-200 btn-sm ml-2"
                        v-if="each.picture.length > 0"
                        @click="handleMsgPicPreview(each,index)">查看图片
                </button>
              </div>
            </div>
          </li>
          <li class="step" data-content="">
            <div>
              <label for="addMessageDialog" class="btn border-base-200 mx-1">添加消息</label>
            </div>
          </li>
        </ul>
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
  <!-- 图片预览 -->
  <el-image-viewer
      @close="handleViewerClose"
      :url-list="pictureWallPreview"
      v-if="pictureWall.previewVisible"
      :initial-index="pictureWall.previewIndex">
  </el-image-viewer>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {Picture as IconPicture} from '@element-plus/icons-vue'

import {notify} from "@kyvg/vue3-notification";
import {Plus} from '@element-plus/icons-vue'
// axios请求接口
import fileApi from "@/api/file"
import userApi from "@/api/userApi"
import {getOnlineImageUrl, timeFormatter, getImageUrl} from "@/utils"
import OrderSteps from "./OrderSteps.vue"
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()

function pushRouter(path) {
  router.push(path)
}

// 1. 预约详情信息
let formData = computed(() => store.state.order.orderFormData)
const cateList = computed(() => {
  return formData.value.problem_category.split(',')
})
const createTime = computed(() => timeFormatter(formData.value.create_time))
const imageUrls = computed(() => store.getters.getOrderFormDataImagesUrls)
// 检验是否是属于用户的订单
const isMyOwnOrder = computed(() => formData.value.user_id ===  store.state.user.user_id)

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
    fileApi.uploadFile(options).then(res => {
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
    sendingStatusMessage.pictures.push(res.data);
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
  console.log(formData.value.id)
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