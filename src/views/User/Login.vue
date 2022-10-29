<template>
  <div class="container max-w-full mx-auto py-24 px-6">
    <div class="max-w-sm mx-auto px-6">
      <div class="relative flex flex-wrap">
        <div class="w-full relative">
          <div class="mt-6">
            <div class="mx-auto max-w-lg">
              <div class="text-3xl text-primary font-bold">登录</div>
              <form>
                <div class="py-2">
                  <label class="px-1 text-sm text-gray-600">帐号</label>
                  <el-input v-model="loginForm.username" type="text" placeholder="请输入帐号" size="large" maxlength="16" />
                </div>
                <div class="py-2">
                  <label class="px-1 text-sm text-gray-600">密码</label>
                  <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" size="large" maxlength="30"
                    show-password />
                </div>
                <div class="flex justify-between">
                  <label class="block text-gray-500 font-bold my-2 flex items-center">
                    <input type="checkbox" v-model="loginForm.isRemember" class="leading-loose text-pink-600" />
                    <span class="py-2 text-sm text-gray-600 leading-snug">
                      记住我
                    </span>
                  </label>
                  <div class="flex gap-2">
                    <label class="block text-gray-500 font-bold my-2 flex items-center" @click="showTipInfo">
                      <span>忘记密码？</span>
                    </label>
                    <label class="block text-gray-500 font-bold my-2 flex items-center">
                      <router-link to="/register"
                        class="cursor-pointer tracking-tighter text-primary border-b-2 border-gray-200 hover:border-gray-400">
                        <span>注册</span>
                      </router-link>
                    </label>
                  </div>
                </div>
              </form>
              <button class="btn mt-3 text-lg w-full" type="submit" @click="loginSubmit">
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import { reactive } from "vue";
import userApi from "@/api/userApi";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter()
const store = useStore()

const showTipInfo = () => {
  notify({
    title: '请联系管理员重置密码',
    text: '联系QQ:1561206831进行人工验证身份，也可以另外创建一个帐号'
  })
}

const loginForm = reactive({
  username: "",
  password: "",
  isRemember: false
});

const loginSubmit = () => {
  userApi.userLogin({
    name: loginForm.username,
    password: loginForm.password,
  }).then((res) => {
    if (res.data.code === 0) {
      if (loginForm.isRemember) {
        sessionStorage.clear()
        localStorage.setItem("token", res.data.session_id);
      } else {
        localStorage.clear()
        sessionStorage.setItem("token", res.data.session_id);
      }
      store.dispatch('updateState')
      router.replace('/')
      notify({
        type: 'success',
        title: '登录成功',
      })
    }
  }).catch((err) => {
    console.log(err)
  })
};
</script>
