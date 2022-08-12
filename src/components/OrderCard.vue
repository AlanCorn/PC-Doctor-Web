<template>
  <div class="shadow-xl my-2 mx-1 card bg-blue-50 bg-blue-100 hover:bg-blue-200"
      @click="posCardClick">
    <div class="flex flex-row card-body p-5">
      <div class="flex flex-col justify-between">
        <!-- 显示文体描述与分类-->
        <div>
          <div class="card-title">{{ shortDescription }}</div>
          <div class="badge bg-secondary text-base-100 border-none mr-1" v-for="(each,index) in cateList" :key="index">{{ each }}</div>
        </div>
        <!-- 在卡片左下显示预约时间与状态-->
        <div class="mt-2">
          <div class="flex px-1 items-center text-success font-bold">
            <svg class="fill-current w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4284" width="128" height="128"><path d="M722.678 524.908c-59.267-46.975-132.445-74.779-211.678-74.78 106.324-0.003 192.516-86.196 192.516-192.521 0-106.327-86.195-192.521-192.522-192.521s-192.521 86.194-192.521 192.52c0 106.325 86.191 192.518 192.515 192.521-197.461 0.004-357.534 172.391-357.534 385.043h366.899c-1.404-11.512-2.348-23.161-2.348-35.053 0-129.959 86.298-239.655 204.673-275.209z" p-id="4285"></path><path d="M792.598 581.627c-105.659 0-191.313 85.654-191.313 191.313s85.654 191.313 191.313 191.313S983.911 878.6 983.911 772.94s-85.654-191.313-191.313-191.313z m73.582 230.672h-80.94c-17.673 0-32-14.327-32-32V662.567c0-17.673 14.327-32 32-32s32 14.327 32 32v85.731h48.939c17.673 0 32 14.327 32 32s-14.326 32.001-31.999 32.001z" p-id="4286"></path></svg>
            <div >{{ status }}</div>
          </div>
          <div class="flex px-1 items-center">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
            <div>{{ createTime }} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router";

import { timeFormatter } from "@/utils"

const store = useStore()
const router = useRouter()

const props = defineProps({
  cardInfo:Object
})

const data = props.cardInfo

// 计算属性
const cateList = computed(() => {
  return data.problem_category.split(',')
})
const shortDescription = computed(() => {
  return data.problem_description.length > 20 ? data.problem_description.slice(0,20)+"..." : data.problem_description
})
const status = computed(() => {
  switch (data.status) {
    case "0":
      return "排队中"
    case "1":
      return "正在处理"
    case "2":
      return "已完成"
  }
})
const createTime = computed(() => timeFormatter(data.create_time))

const posCardClick = () => {
  store.commit('setOrderFormData',data)
  router.push('/orderInfo')
}
</script>

<style scoped>

</style>