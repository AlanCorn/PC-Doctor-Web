<template>
  <!-- Navbar -->
  <div class="w-full navbar shadow-xl bg-blue-300">
    <!-- 顶部栏左侧下拉菜单 -->
    <div class="flex-none lg:hidden">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
        <ul id="navMenuList" tabindex="0" class="dropdown-content p-2 bg-base-100 rounded-box w-36">
          <IndexNavigation :pushRouter="pushRouter" :isUseAvatar="false" />
        </ul>
      </div>
    </div>
    <div class="flex-1 px-2 mx-2">
      <router-link class="btn btn-ghost normal-case text-xl" to="/">PC Doctor</router-link>
    </div>
    <div class="flex-none hidden lg:block">
      <ul class="menu-horizontal">
        <!-- Navbar menu content here -->
        <IndexNavigation :pushRouter="pushRouter" />
      </ul>
    </div>
  </div>
  <!-- router-view-->
  <router-view></router-view>
</template>
<script setup>
import IndexNavigation from "../components/IndexNavigation.vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const router = useRouter()

const pageInfo = reactive({
  tabIndex: 0
})

function pushRouter(path) {
  // 失去焦点毛，即让下拉菜单隐藏
  const navMenu = document.querySelector('#navMenuList')
  navMenu.blur()
  router.push(path)
}
</script>
<style scoped>

</style>