<template>
  <div class="flex items-center flex-col">
    <div class="w-11/12 pt-10">
      <!-- 编辑信息 -->
      <div class="text-primary text-4xl font-bold">更新信息</div>
      <!-- 一条提示 -->
      <div class="alert bg-base-100">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="stroke-current flex-shrink-0 w-6 h-6 text-primary">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>请认真填写个人信息，信息对委托人可见</span>
        </div>
      </div>
      <div>

        <el-form :model="formData" label-width="70px">
          <el-form-item label="头像">
            <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
                v-model="formData.user_name"
                placeholder="尽量使用真实姓名"
                class="name"
            />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="formData.sex">
              <el-radio label="男"/>
              <el-radio label="女"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系方式" class="contactItem">
            <div>
              <el-radio-group style="display: block" v-model="formData.radio">
                <el-radio label="QQ">QQ</el-radio>
                <el-radio label="WeChat">WeChat</el-radio>
                <el-radio label="Phone">Phone</el-radio>
              </el-radio-group>
              <el-input
                  v-model="formData.contact_details"
                  class="contact"
                  placeholder="请输入联系方式(推荐使用QQ)"
              />
            </div>
          </el-form-item>
          <el-form-item label="简介">
            <div class="w-1/2">
              <el-input
                  v-model="formData.user_description"
                  type="textarea"
                  autosize
                  placeholder="简单的自我介绍"
                  class="name"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <button class="btn btn-primary" @click="onSubmit">确认更新</button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onBeforeMount, reactive, ref} from "vue";
import { Plus } from '@element-plus/icons-vue'
import { useStore } from 'vuex'


const store = useStore()

// 个人信息初始化
const user_name = computed(() => store.state.user.user_name)
const contact_details = computed(() => store.state.user.contact_details)

const formData = reactive({
  user_name: "",
  sex:"",
  radio: "",
  contact_details: "",
  user_description:"",
  user_picture:""     // 头像
});

onBeforeMount(() => {
  formData.user_name = user_name.value
  const splitIndex = contact_details.value.indexOf(':')
  formData.radio = contact_details.value.slice(0, splitIndex)
  formData.contact_details = contact_details.value.slice(splitIndex + 1)
})

// 查询模块



//
const imageUrl = ref('')

// const handleAvatarSuccess: UploadProps['onSuccess'] = (
//     response,
//     uploadFile
// ) => {
//   imageUrl.value = URL.createObjectURL(uploadFile.raw!)
// }
//
// const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
//   if (rawFile.type !== 'image/jpeg') {
//     ElMessage.error('Avatar picture must be JPG format!')
//     return false
//   } else if (rawFile.size / 1024 / 1024 > 2) {
//     ElMessage.error('Avatar picture size can not exceed 2MB!')
//     return false
//   }
//   return true
// }


const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 300px;
}

// .contactItem /deep/ .el-form-item__content{
//   flex-direction: column;
// }


.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.avatar-uploader {
  border: 1px dashed var(--el-border-color);
}
.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
