<template>
  <div class="absolute bottom-16 alert alert-info shadow-lg">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>页面建设中...</span>
    </div>
  </div>
  <ul class="menu bg-base-100">
    <!-- Sidebar content here -->

    <IndexNavigation :pushRouter="pushRouter"/>
  </ul>
</template>

<script setup>
import IndexNavigation from "../../components/IndexNavigation.vue";
import {useRouter} from "vue-router";

const router = useRouter()

function pushRouter(path){
  router.push(path)
}

</script>

<style lang='scss' scoped>

</style>