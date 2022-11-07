<template>
  <div>
    <router-view></router-view>
  </div>
  <notifications position="top center" classes="customNotify" />
  <!-- 底部导航栏 -->
  <div :class="{ 'h-16, md:hidden': isInGroup }">
    <div v-if="isInGroup" class="btm-nav md:hidden">
      <a :class="{ 'btn-nav-default transition duration-500': true, 'btm-nav-active': pageInfo.group === 'Order' }"
        @click="handleBtmNavClick('Order')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="btm-nav-label">电医预约</span>
      </a>
      <a :class="{ 'btn-nav-default transition duration-500': true, 'btm-nav-active': pageInfo.group === 'Document' }"
        @click="handleBtmNavClick('Document')">
        <svg t="1657108472758" class="fill-current h-5 w-5" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="4348" width="128" height="128">
          <path
            d="M270.515523 966.80173c-86.312299 0-156.539897-70.115621-156.539897-156.351936V213.341248c0-86.186325 70.227598-156.352935 156.539897-156.352935h355.698054a42.435297 42.435297 0 0 1 30.220803 12.487439l241.930385 241.668439a42.891204 42.891204 0 0 1 12.447447 30.144818v469.160785c0 86.236315-70.176608 156.351936-156.539897 156.351936z m-71.150408-753.460482v597.108546a71.159407 71.159407 0 0 0 71.149408 71.085422h483.757792a71.126414 71.126414 0 0 0 71.149409-71.085422V398.149348H612.023487a42.698244 42.698244 0 0 1-42.720239-42.632257V142.252827H270.515523a71.225393 71.225393 0 0 0-71.150408 71.088421z m455.327622 99.543586H779.320178L654.693737 188.361371zM384.334181 739.361373a42.658252 42.658252 0 1 1 0-85.315504h256.119476a42.658252 42.658252 0 1 1 0 85.315504z m0-170.580018a42.658252 42.658252 0 1 1 0-85.315503h256.119476a42.658252 42.658252 0 1 1 0 85.315503z"
            p-id="4349"></path>
        </svg>
        <span class="btm-nav-label">文档</span>
      </a>
      <a :class="{ 'btn-nav-default transition duration-500': true, 'btm-nav-active': pageInfo.group === 'Space' }"
        @click="handleBtmNavClick('Space')">
        <svg t="1659410683382" class="fill-current h-4 w-4" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="2599" width="128" height="128">
          <path
            d="M819.292 623.785c-40.844-40.844-88.387-72.547-140.151-94.102 69.587-51.392 114.809-133.97 114.809-226.921 0-155.467-126.483-281.951-281.951-281.951s-281.951 126.483-281.951 281.951c0 92.95 45.221 175.529 114.809 226.921-51.762 21.555-99.308 53.26-140.151 94.102-82.080 82.080-127.284 191.213-127.284 307.292 0 32.174 26.082 58.254 58.254 58.254s58.254-26.080 58.254-58.254c0-175.385 142.685-318.068 318.068-318.068 175.385 0 318.068 142.685 318.068 318.068 0 32.174 26.080 58.254 58.254 58.254s58.254-26.080 58.254-58.254c0-116.081-45.204-225.211-127.284-307.292zM512 137.32c91.225 0 165.442 74.218 165.442 165.442s-74.218 165.442-165.442 165.442-165.442-74.218-165.442-165.442 74.218-165.442 165.442-165.442z"
            p-id="2600"></path>
        </svg>
        <span class="btm-nav-label">我的</span>
      </a>
    </div>
  </div>
  <el-backtop :right="30" :bottom="100" />
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, reactive } from "vue";

const route = useRoute()
const router = useRouter()
const store = useStore()

const pageInfo = reactive({
  group: computed(() => route.meta.group),
})

const groupList = ['Order', 'Document', 'Space']
// 对路由分组，控制底部导航栏显示
const isInGroup = computed(() => groupList.indexOf(pageInfo.group) >= 0)

const handleBtmNavClick = (name) => {
  router.push({ name })
}

store.dispatch('updateState')
</script>

<style lang="scss">
.customNotify {
  // styling
  margin: 10px 5px 0 5px;
  padding: 10px;
  font-size: 12px;
  color: #000000;
  // default (blue)
  background: #44a4fc;
  border-left: 5px solid #187fe7;
  border-radius: 0.25rem;

  // style for title line
  .notification-title {
    font-size: 18px;
    font-weight: bold;
  }

  // style for content
  .notification-content {
    font-size: 15px;
  }

  // types (green, amber, red)
  &.success {
    color: #ffffff;
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    color: #ffffff;
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    color: #ffffff;
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
