<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar bg-info">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2"><a class="btn btn-ghost normal-case text-xl">PC Doctor</a></div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <IndexNavigation :pushRouter="pushRouter"/>
          </ul>
        </div>
      </div>
<!--      router-view-->
      <router-view></router-view>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
        <!-- Sidebar content here -->
        <label for="my-drawer-3">
          <IndexNavigation :sideBarMenu="true" :pushRouter="pushRouter"/>
        </label>
      </ul>
    </div>
  </div>
</template>
<script setup>
  import IndexNavigation from "../components/IndexNavigation.vue";
  import {useRouter} from "vue-router/dist/vue-router";

  const router = useRouter()
  function pushRouter(path){
    router.push(path)
  }
</script>
<style scoped>
</style>