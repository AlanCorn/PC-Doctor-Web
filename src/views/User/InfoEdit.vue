<template>
  <div class="flex items-center flex-col">
    <div class="w-11/12 pt-10">
      <!-- 编辑信息 -->
      <div class="text-primary text-4xl font-bold">更新信息</div>
      <!-- 一条提示 -->
      <div class="alert bg-base-100" v-if="route.name === 'AdminInfoEdit'">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="stroke-current flex-shrink-0 w-6 h-6 text-primary">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>请认真填写个人信息，信息对委托人可见</span>
        </div>
      </div>
      <div class="mt-10">
        <el-form :model="formData" label-width="70px">
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" :show-file-list="false" :http-request="uploadFile"
              :before-upload="beforeAvatarUpload">
              <img v-if="ImageUrl" :src="ImageUrl" class="el-avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formData.user_name" placeholder="尽量使用真实姓名" class="name" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="formData.sex">
              <el-radio label="男" />
              <el-radio label="女" />
              <el-radio label="未知" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系方式" class="contactItem">
            <div>
              <el-radio-group style="display: block" v-model="formData.radio">
                <el-radio label="QQ">QQ</el-radio>
                <el-radio label="WeChat">WeChat</el-radio>
                <el-radio label="Phone">Phone</el-radio>
              </el-radio-group>
              <el-input v-model="formData.contact_details" class="contact" placeholder="请输入联系方式(推荐使用QQ)" />
            </div>
          </el-form-item>
          <el-form-item label="简介">
            <div class="w-11/12 lg:w-3/4 xl:w-1/2">
              <el-input v-model="formData.user_description" type="textarea" autosize maxlength="50"
                placeholder="简单的自我介绍" class="name" />
            </div>
          </el-form-item>
          <el-form-item>
            <label for="submitModal" class="btn btn-primary">确认更新</label>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <input type="checkbox" id="submitModal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-2xl">确认更新个人信息？</h3>
      <div class="modal-action">
        <label for="submitModal" class="btn btn-primary" @click="onSubmit">确认</label>
        <label for="submitModal" class="btn">取消</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { Plus } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router/dist/vue-router";
import { notify } from "@kyvg/vue3-notification";
import { getOnlineImageUrl } from '@/utils'
import fileApi from "@/api/file";
import userApi from "@/api/userApi";
import { useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()
const store = useStore()

// 个人信息初始化
const user_info = computed(() => store.getters.getUserInfo)

const formData = reactive({
  user_name: "",
  sex: "",
  radio: "",
  contact_details: "",
  user_description: "",
  user_picture: ""     // 头像
});

// 1. 头像
const ImageUrl = ref('')
// 文件上传前的检验
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    notify({
      type: "warn",
      title: "文件格式错误",
      text: "请上传 .jpg或.png 格式文件",
    })
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    notify({
      type: "warn",
      title: "文件大小错误",
      text: "请上传5MB以内图像文件",
    })
    return false
  }
  return true
}
// 上传文件方法
const uploadFile = (options) => {
  return new Promise((resolve) => {
    fileApi.uploadFile(options.file, 'user_pic').then(res => {
      resolve(res)
    }).catch(err => {
      notify({
        type: 'error',
        title: "上传失败！",
        text: "请联系管理员解决"
      });
    })
  }).then(res => {
    if (res.data.code === 0) {
      // 成功上传到服务器
      notify({
        type: 'success',
        title: "上传成功",
      });
      formData.user_picture = res.data.file_name;
      ImageUrl.value = getOnlineImageUrl(formData.user_picture, 'user_pic')[0]
    }
  })
}

// 2. 表单提交方法
const onSubmit = () => {
  console.log("submit!", formData)
  // 判空处理
  const showInfo = (text) => {
    notify({
      type: 'warn',
      title: text
    });
  }
  if (!formData.user_name) showInfo('请输入姓名')
  else if (!formData.contact_details) showInfo('请输入联系方式')
  else if (formData.user_description.length > 50) showInfo('个人简介不得超过50字')
  else {
    // 通过非空判断
    const formObj = new FormData();
    formObj.append('user_id', formData.user_id);
    formObj.append('user_name', formData.user_name);
    formObj.append('sex', formData.sex);
    formObj.append('contact_details', formData.radio + ":" + formData.contact_details);
    formObj.append('user_description', formData.user_description)
    formObj.append('user_picture', formData.user_picture)
    userApi.userUpdateDetailInfo(formObj).then(res => {
      store.dispatch('updateState')
      notify({
        type: 'success',
        title: "修改成功",
      })
    }).catch(err => {
      console.log(err)
    })
  }
};


onBeforeMount(() => {
  // 使用原有信息填充表单
  formData.user_id = user_info.value.user_id
  formData.user_name = user_info.value.user_name
  formData.sex = user_info.value.sex
  const splitIndex = user_info.value.contact_details.indexOf(':')
  formData.radio = user_info.value.contact_details.slice(0, splitIndex)
  formData.contact_details = user_info.value.contact_details.slice(splitIndex + 1)
  formData.user_description = user_info.value.user_description
  formData.user_picture = user_info.value.user_picture
  ImageUrl.value = getOnlineImageUrl(formData.user_picture, 'user_pic')[0]
})
</script>

<style lang="scss" scoped>
.el-input {
  width: 160px;
}

// .contactItem /deep/ .el-form-item__content{
//   flex-direction: column;
// }


.avatar-uploader .el-avatar {
  width: 96px;
  height: 96px;
  display: block;
}

.avatar-uploader {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  border: 2px solid var(--el-border-color);
  background: white;
}

.avatar-uploader:hover {
  border: 2px solid var(--tw-ring-color);
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 98px;
  height: 98px;
  text-align: center;
}
</style>
