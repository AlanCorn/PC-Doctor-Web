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
                  <el-input
                      v-model="loginForm.username"
                      type="text"
                      placeholder="请输入帐号"
                      size="large"
                      maxlength="16"
                  />
                </div>
                <div class="py-2">
                  <label class="px-1 text-sm text-gray-600">密码</label>
                  <el-input
                      v-model="loginForm.password"
                      type="password"
                      placeholder="请输入密码"
                      size="large"
                      maxlength="30"
                      show-password
                  />
                </div>
                <div class="flex justify-between">
                  <label class="block text-gray-500 font-bold my-4">
                    <input
                        type="checkbox"
                        v-model="loginForm.isRemember"
                        class="leading-loose text-pink-600"/>
                    <span class="py-2 text-sm text-gray-600 leading-snug">
											记住我
										</span>
                  </label>
                  <label class="block text-gray-500 font-bold my-4">
                    <router-link
                        to="/register"
                        class="cursor-pointer tracking-tighter text-black border-b-2 border-gray-200 hover:border-gray-400"
                    ><span>没有帐号？立即注册</span>
                    </router-link>
                  </label>
                </div>
              </form>
              <button
                  class="btn mt-3 text-lg w-full"
                  type="submit"
                  @click="loginSubmit"
              >
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
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()

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
    if (res.data === "PWD ERROR") {
      notify({
        type: 'error',
        title: '密码错误',
      })
    } else if (res.data === "NO SUCH ACCOUNT") {
      notify({
        type: 'error',
        title: '帐号未注册',
      })
    } else {
      if (loginForm.isRemember) {
        sessionStorage.clear()
        localStorage.setItem("token", res.data);
      } else {
        localStorage.clear()
        sessionStorage.setItem("token", res.data);
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
