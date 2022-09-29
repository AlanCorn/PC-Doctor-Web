<template>
  <div class="container max-w-full mx-auto py-24 px-6">
    <div class="max-w-sm mx-auto px-6">
      <div class="relative flex flex-wrap">
        <div class="w-full relative">
          <div class="mt-6">
            <div class="">
              <div class="text-3xl text-primary font-bold">注册</div>
              <form>
                <div class="py-2">
                  <label class="px-1 text-md text-gray-600">昵称</label>
                  <el-input v-model="formData.user_name" placeholder="请输入昵称" maxlength="20"/>
                </div>
                <div class="py-2">
                  <label class="px-1 text-md text-gray-600"> 联系方式 </label>
                  <el-radio-group
                      style="display: block"
                      v-model="formData.radio"
                  >
                    <el-radio label="QQ">QQ</el-radio>
                    <el-radio label="WeChat">WeChat</el-radio>
                    <el-radio label="Phone">Phone</el-radio>
                  </el-radio-group>
                  <el-input
                      v-model="formData.contact_details"
                      placeholder="请输入联系方式(QQ/微信/手机号)"
                      maxlength="25"
                  />
                </div>
                <div class="py-2">
                  <div class="px-1 mb-1 text-md text-gray-600">帐号
                    <div class="inline font-light text-red-500 ml-2"
                         v-show="!checkIdValid || formData.user_id === ''">6~16位字母、数字、下划线
                    </div>
                  </div>
                  <el-input
                      v-model="formData.user_id"
                      type="text"
                      placeholder="请输入帐号"
                      size="large"
                      maxlength="16"
                  />
                </div>
                <div class="py-2">
                  <div class="px-1 mb-1 text-md text-gray-600">密码
                    <div class="inline font-light text-red-500 ml-2"
                         v-show="!checkPwdValid || formData.password === ''">10～30位的字母、数字、小数点
                    </div>
                  </div>
                  <el-input
                      v-model="formData.password"
                      type="password"
                      placeholder="请输入密码"
                      size="large"
                      maxlength="30"
                      show-password
                  />
                </div>
                <div class="py-2">
                  <div class="px-1 mb-1 text-md text-gray-600">确认密码*
                    <div class="inline font-light text-red-500 ml-2"
                         v-show="!checkPwdAgain">密码不一致
                    </div>
                  </div>
                  <el-input
                      v-model="formData.repeatPassword"
                      type="password"
                      placeholder="请再次输入密码"
                      size="large"
                      show-password
                  />
                </div>
              </form>
              <button
                  class="btn mt-3 text-lg w-full"
                  type="submit"
                  @click="submitRegister"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive} from "vue";
import {notify} from "@kyvg/vue3-notification";
import userApi from "@/api/userApi";
import {useRouter} from "vue-router";

const router = useRouter()

//帐号正则，6到16位（字母，数字，下划线）
const uPattern = /^[a-zA-Z0-9_]{6,16}$/;
const uErrorMsg = "帐号必须由6到16位的字母，数字或下划线组成";
//密码正则，10到30位（字母，数字，小数点）
const pPattern = /^[a-zA-Z0-9.]{10,30}$/;
const pErrorMsg = "密码必须由10到30位的字母、数字、小数点组成";

const formData = reactive({
  user_name: "",
  radio: "QQ",
  contact_details: "",
  user_id: "",
  password: "",
  repeatPassword: ""
});

// 检验用户id合法性
const checkIdValid = computed(() => uPattern.test(formData.user_id));
// 检验密码合法性
const checkPwdValid = computed(() => pPattern.test(formData.password));
// 再次输入密码
const checkPwdAgain = computed(() => formData.password === formData.repeatPassword);

// 提交注册请求
const submitRegister = () => {
  if (!formData.user_name) showInfo('请输入昵称')
  else if (!formData.contact_details) showInfo('请输入联系方式')
  else if (!checkIdValid.value) showInfo(uErrorMsg)
  else if (!checkPwdValid.value) showInfo(pErrorMsg)
  else if (!checkPwdAgain.value) showInfo('密码不一致')
  else {
    userApi.userRegister(formData).then(res => {
      if (res.data.code === 0) {
        router.replace('login')
        notify({
          type: 'success',
          title: '注册成功',
          text: '请登录',
        });
      }
    }).catch(err => {
      notify({
        type: 'error',
        title: '失败，请联系管理员解决',
      });
    })
  }
}

const showInfo = (text) => {
  notify({
    type: 'warn',
    title: text
  });
}
</script>
