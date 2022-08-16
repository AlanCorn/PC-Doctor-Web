<template>
  <div class="card bg-base-100 shadow-xl m-2 border border-solid border-2 transition duration-500 hover:ring"
    @click="pushRouter('/preview')">
    <div class="card-body p-4 lg:p-6">
      <div
          class=" title card-title text-gray-700 lg:text-2xl transition duration-500 ease-in-out hover:text-primary">
        Markdown基本语法
      </div>
      <div class="divider my-0"></div>
      <div class="text-gray-500">电脑医院</div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

function pushRouter(path) {
  router.push(path)
}
</script>

<style lang='scss' scoped>
</style>