<template>
  <div class="shadow-xl my-2 mx-1 card bg-white transition duration-500 hover:ring" @click="posCardClick">
    <div class="flex flex-row card-body p-5">
      <div class="flex flex-col justify-between">
        <!-- 显示文体描述与分类 -->
        <div>
          <div class="card-title">{{ shortDescription }}</div>
          <!-- 预约类别标签 -->
          <div class="badge bg-secondary text-base-100 border-none mr-1" v-for="(each, index) in cateList" :key="index">
            {{ each }}
          </div>
        </div>
        <!-- 在卡片左下显示预约时间与状态-->
        <div class="mt-2">
          <!-- 预约状态 -->
          <div>
            <div class="flex px-1 items-center text-success font-bold" v-if="status === '已完成'">
              <svg class="fill-current w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2704" width="128" height="128">
                <path
                  d="M613.648 32a51.388 51.388 0 0 1 34.785 14.908c8.979 9.036 13.665 21.12 12.989 33.488 1.41 24.96-18.92 46.474-45.742 48.338H401.092c-27.388-1.298-48.396-22.927-47.04-48.338-1.356-25.412 19.652-47.098 46.984-48.396h212.611z m232.376 56.47l-0.169 0.17c79.793 0 117.91 45.403 117.91 111.078v650.146c0 79.06-40.716 109.948-124.405 109.948H174.87c-83.915 0-114.07-39.53-114.692-109.948V199.548C60.235 134.042 81.525 88.47 167.812 88.47h108.197c-1.129 5.252-1.693 10.618-1.807 15.982 0 40.66 31.06 80.752 71.548 80.752h326.006c37.722 0 69.515-40.094 69.515-80.752a79.94 79.94 0 0 0-1.638-15.982h106.39zM296.847 550.908l146.71 146.71a37.722 37.722 0 0 0 51.953 0l264.113-263.716a36.536 36.536 0 0 0 0-52.292 36.536 36.536 0 0 0-51.84 0L469.535 619.182 349.252 499.069a36.932 36.932 0 0 0-51.896 0 36.197 36.197 0 0 0-0.566 51.84z"
                  p-id="2705"></path>
              </svg>
              <div>{{ status }}</div>
            </div>
            <div class="flex px-1 items-center text-primary/80 font-bold" v-if="status === '排队中'">
              <svg class="fill-current w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4284" width="128" height="128">
                <path
                  d="M722.678 524.908c-59.267-46.975-132.445-74.779-211.678-74.78 106.324-0.003 192.516-86.196 192.516-192.521 0-106.327-86.195-192.521-192.522-192.521s-192.521 86.194-192.521 192.52c0 106.325 86.191 192.518 192.515 192.521-197.461 0.004-357.534 172.391-357.534 385.043h366.899c-1.404-11.512-2.348-23.161-2.348-35.053 0-129.959 86.298-239.655 204.673-275.209z"
                  p-id="4285"></path>
                <path
                  d="M792.598 581.627c-105.659 0-191.313 85.654-191.313 191.313s85.654 191.313 191.313 191.313S983.911 878.6 983.911 772.94s-85.654-191.313-191.313-191.313z m73.582 230.672h-80.94c-17.673 0-32-14.327-32-32V662.567c0-17.673 14.327-32 32-32s32 14.327 32 32v85.731h48.939c17.673 0 32 14.327 32 32s-14.326 32.001-31.999 32.001z"
                  p-id="4286"></path>
              </svg>
              <div>{{ status }}</div>
            </div>
            <div class="flex px-1 items-center text-pink-300 font-bold" v-if="status === '正在处理'">
              <svg class="fill-current w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="10347" width="128" height="128">
                <path
                  d="M872.28416 731.70944l-214.09792-211.3536c13.06624-31.72352 20.21376-66.49856 20.21376-102.85056C678.4 266.15808 554.06592 143.36 400.5888 143.36c-48.20992 0-93.51168 12.14464-133.07904 33.3824l158.55616 156.4672a26.56256 26.56256 0 0 1 0 37.92896l-72.45824 71.49568a27.4432 27.4432 0 0 1-38.44096 0l-158.45376-156.3648A269.80352 269.80352 0 0 0 122.88 417.5872c0 151.3472 124.33408 274.14528 277.8112 274.14528 42.57792 0 82.80064-9.46176 118.8864-26.33728l210.04288 207.2576c38.44096 37.94944 101.21216 37.94944 139.65312 0l3.09248-3.05152a96.95232 96.95232 0 0 0-0.08192-137.89184z"
                  p-id="10348"></path>
              </svg>
              <div>{{ status }}</div>
            </div>
          </div>
          <!-- 预约创建时间 -->
          <div class="flex px-1 items-center text-gray-500">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"></path>
            </svg>
            <div>{{ createTime }}</div>
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
  cardInfo: Object
})

const data = props.cardInfo

// 计算属性
const cateList = computed(() => {
  return data.problem_category.split(',')
})
const shortDescription = computed(() => {
  return data.problem_description.length > 20 ? data.problem_description.slice(0, 20) + "..." : data.problem_description
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
  // store.commit('setOrderFormData', data)
  router.push({ path: '/orderInfo', query: { id: data.id } })
}
</script>

<style scoped>

</style>