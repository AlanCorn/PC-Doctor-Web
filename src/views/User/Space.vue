<template>
  <div class="md:w-4/5 flex flex-wrap gap-10 items-start mx-auto py-10">
    <!-- 个人信息 -->
    <div id="profile"
         class="flex-shrink w-full lg:w-1/4 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white mx-6 lg:mx-0">
      <div class="p-4 md:p-12 text-center lg:text-left">
        <div class="lg:flex lg:items-center lg:gap-3 lg:flex-wrap">
          <MyAvatar :imgSrc="imgUrl" :name="userInfo.user_name"/>
          <h1 class="text-2xl min-w-fit font-bold pt-8 lg:pt-0 opacity-75">{{ userInfo.user_name }}</h1>
        </div>
        <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-primary opacity-25"></div>
        <p class="pt-8 text-sm">{{ userInfo.user_description }}</p>
        <div class="flex w-full max-w-xs py-4 opacity-75">
          <ul class="flex flex-col w-full">
            <!-- Dashboard -->
            <li v-if="isLogin && level === '2'" class="my-px hover:cursor-pointer">
              <a class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100"
                 @click="pushRouter('/dashboard')">
                <span class="flex items-center justify-center text-lg text-gray-500">
                  <svg fill="none"
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                       class="h-6 w-6">
                    <path
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </span>
                <span class="ml-3 min-w-fit">Dashboard</span>
              </a>
            </li>
            <!-- 账户 -->
            <li class="my-px">
              <span class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">账户</span>
            </li>
            <li class="my-px hover:cursor-pointer">
              <a class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-200"
                 @click="pushRouter('/profile')">
						    <span class="flex items-center justify-center text-lg text-gray-500">
                  <svg fill="none"
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                       class="h-6 w-6">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </span>
                <span class="ml-3 min-w-fit">个人信息</span>
              </a>
            </li>
            <li class="my-px hover:cursor-pointer">
              <a class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-200"
                 @click="pushRouter('/resetPwd')">
                <span class="flex items-center justify-center text-lg text-gray-500">
                  <svg fill="none"
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                       class="h-6 w-6">
                    <path
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </span>
                <span class="ml-3 min-w-fit">设置密码</span>
              </a>
            </li>
            <li class="my-px hover:cursor-pointer">
              <label for="logoutModal">
                <a class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-200">
                  <span class="flex items-center justify-center text-lg text-red-400">
                    <svg fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         stroke-width="2"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                         class="h-6 w-6">
                      <path
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                    </svg>
                  </span>
                  <div class="ml-3 min-w-fit">退出登录</div>
                </a>
              </label>
            </li>
            <!-- 管理 -->
            <li v-if="isLogin && level === '2'" class="my-px">
              <span class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">管理员</span>
            </li>
            <li v-if="isLogin && level === '2'" class="my-px hover:cursor-pointer">
              <a class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-200"
                 @click="pushRouter('/adminGeneral')">
                <span class="flex items-center justify-center text-lg text-gray-500">
                  <svg fill="none"
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                       class="h-6 w-6">
                    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                  </svg>
                </span>
                <span class="ml-3 min-w-fit">通用</span>
              </a>
            </li>
            <li v-if="false" class="my-px hover:cursor-pointer">
              <a class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-200"
                 @click="pushRouter('/adminDoctorMng')">
                <span class="flex items-center justify-center text-lg text-gray-500">
                  <svg fill="none"
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                       class="h-6 w-6">
                    <path
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </span>
                <span class="ml-3 min-w-fit">电医管理</span>
              </a>
            </li>
            <li v-if="isLogin && level === '2'" class="my-px hover:cursor-pointer">
              <a class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-200"
                 @click="pushRouter('/adminUserMng')">
                <span class="flex items-center justify-center text-lg text-gray-500">
                  <svg fill="none"
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                       class="h-6 w-6">
                    <path
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </span>
                <span class="ml-3 min-w-fit">用户管理</span>
              </a>
            </li>
            <!-- 其他 -->
            <li class="my-px">
              <span class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">其他</span>
            </li>
            <li class="my-px hover:cursor-pointer">
              <a class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-200">
                <span class="flex items-center justify-center text-lg text-gray-500">
                  <svg fill="none"
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                       class="h-6 w-6">
                    <path
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </span>
                <span class="ml-3 min-w-fit">帮助</span>
              </a>
            </li>
            <li class="my-px hover:cursor-pointer">
              <a class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-200"
                 @click="pushRouter('/about')">
						<span class="flex items-center justify-center text-lg text-gray-500">
							<svg fill="none"
                   stroke-linecap="round"
                   stroke-linejoin="round"
                   stroke-width="2"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                   class="h-6 w-6">
								<path
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
							</svg>
						</span>
                <span class="ml-3 min-w-fit">关于我们</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="content"
         class="flex-grow w-full md:w-8/12 overflow-auto rounded-lg min-h-full lg:rounded-l-lg lg:rounded-l-none shadow-2xl bg-white mx-6 lg:mx-0">
<!--      <component :is="pageInfo.currentTab"></component>-->
      <router-view></router-view>
    </div>
  </div>
  <!-- 确认对话框 -->
  <input type="checkbox" id="logoutModal" class="modal-toggle"/>
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-2xl">确认退出登录？</h3>
      <div class="modal-action">
        <label for="logoutModal" class="btn btn-primary" @click="logout">确认</label>
        <label for="logoutModal" class="btn">取消</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, reactive} from "vue";
import {getOnlineImageUrl} from "@/utils";
import {notify} from "@kyvg/vue3-notification";
import MyAvatar from "@/components/MyAvatar.vue";

import InfoEditor from "@/views/User/InfoEdit.vue";
import ResetPwd from "@/views/User/ResetPwd.vue";


const router = useRouter()
const store = useStore()


const userInfo = computed(() => store.getters.getUserInfo)
const imgUrl = computed(() => getOnlineImageUrl(userInfo.value.user_picture, 'user_pic')[0])
const level = computed(() => store.state.user.level)
const isLogin = computed(() => store.state.user.isLogin)

async function pushRouter(path) {
  await router.push(path)
  let target = document.querySelector('#content');
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

const logout = () => {
  store.commit("offToken")
  router.push('/')
  notify({
    type: 'success',
    title: '已成功退出',
  })
}


notify({
  type: 'warn',
  title: '提示',
  text: '本页面尚未完工，部分功能缺失'
})


</script>

<style lang='scss' scoped>

</style>