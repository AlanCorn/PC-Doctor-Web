<template>
  <div class="flex items-center flex-col">
    <div class="hero min-h-screen" :style="'background-image:' + imgUrl" id="bgContainer">
      <div class="hero-overlay bg-opacity-10"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-4xl font-bold text-base-100 order-title-shadow">欢迎使用电医预约</h1>
          <p class="mb-5 text-xl text-base-200 order-title-shadow">——致力于提供最优质的公益维修服务</p>
          <div class="flex items-center flex-col">
            <a @click="pushRouter('/addOrder')" class="btn btn-primary my-1 w-48">立即预约</a>
            <a @click="clickHistory" class="btn btn-info my-1 w-48">预约记录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="min-h-screen w-11/12">
      <div class="pt-14" id="orderHistory">
        <h1 class="text-primary">
          预约记录
        </h1>
        <div class="tabs tabs-boxed bg-base-100 text-2xl items-start mt-5">
          <a v-for="(each, index) in cateList" :key="index"
            :class="{ 'tab transition duration-500 rounded-md': true, 'tab-active': index === filterParams.cate }"
            @click="changeState(index)">
            {{ each }}
          </a>
        </div>
        <!-- 是否只显示与我相关 -->
        <div class="form-control mt-1 ml-3 w-fit">
          <label class="label cursor-pointer justify-start  gap-2 ">
            <span class="label-text text-gray-500">仅查看我的记录</span>
            <input @click="changeBelong" v-model="filterParams.isOnlyShowMine" type="checkbox"
              class="toggle toggle-sm" />
          </label>
        </div>
      </div>
      <div v-if="isOrderListLoaded">
        <!-- 使用grid布局卡片  -->
        <div class="grid grid-cols-1 my-2 lg:grid-cols-2 2xl:grid-cols-3" v-if="cardList.length > 0">
          <!-- 信息卡片： -->
          <OrderCard v-for="(cardInfo) of cardList" :key="cardInfo.id" :cardInfo="cardInfo">
          </OrderCard>
        </div>
        <div class="flex justify-center">
          <div class="btn btn-link" v-if="isCardListEnds" @click="queryMoreOrder">🔎加载更多...</div>
        </div>
        <div v-if="cardList.length === 0" class="flex items-center justify-center h-96">
          <div class="text-xl">暂无相关预约条目😊</div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer footer-center p-4 text-base-content">
    <div>
      <p>Copyright © 2022 - <a href="http://beian.miit.gov.cn/" class="link">浙ICP备2022031774号</a></p>
    </div>
  </div>
</template>

<script setup>
import OrderCard from '../../components/OrderCard.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onBeforeMount, reactive } from "vue";

const store = useStore()
const router = useRouter()

function pushRouter(path) {
  router.push(path)
}

const user_id = computed(() => store.state.user.user_id)
const cardList = computed(() => store.state.order.orderList)
const isCardListEnds = computed(() => store.state.order.orderList.length < store.state.order.orderListSize)
const isOrderListLoaded = computed(() => store.getters.isOrderListLoaded)

// 对预约记录进行简单分类
const cateList = ['全部', '排队中', '正在处理', '已完成',]
// 筛选功能
// const filterParams = reactive({
//   cate: 0,   // 默认状态为 0 ：全部， 1：排队中 ,2:正在处理 3:已完成
//   page: 1,
//   isOnlyShowMine:false
// })
const filterParams = computed(() => store.state.user.filterParams)
const changeState = (index) => {
  store.commit('setFilterParams', {
    cate: index,
    page: 1,
    isOnlyShowMine: false
  })
  store.state.order.isOrderListLoaded = false
  store.dispatch('getUserOrderList', getQueryParams())
}
// 仅显示与我提交的订单
const changeBelong = () => {
  store.commit('setFilterParams', {
    cate: filterParams.value.cate,
    page: 1,
    isOnlyShowMine: !filterParams.value.isOnlyShowMine
  })
  store.state.order.isOrderListLoaded = false
  store.dispatch('getUserOrderList', getQueryParams())
}
// 加载更多订单
const queryMoreOrder = () => {
  filterParams.page += 1
  store.commit('setFilterParamsNextPage')
  store.dispatch('appendUserOrderList', getQueryParams())
}
const getQueryParams = () => {
  return {
    page: filterParams.value.page,
    status: filterParams.value.cate > 0 ? filterParams.value.cate - 1 : null,
    user_id: filterParams.value.isOnlyShowMine ? user_id.value : null
  }
}

// 使页面滚动到history锚点
const clickHistory = () => {
  // 获取DOM元素
  let target = document.querySelector('#orderHistory');
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth'
    })
  }
};


const imgUrlList = [
  'http://116.62.129.37:8080/file/doc_pic/1667046908713.jpg',
  // 'https://w.wallhaven.cc/full/pk/wallhaven-pkogdp.jpg',
]

const imgUrl = computed(() => {
  const index = Math.floor(Math.random() * imgUrlList.length);
  return `url('${imgUrlList[index]}')`
})

onBeforeMount(() => {
  // 默认查询状态为 0 (正在排队/待受理) 的记录
  console.log(cardList.value)
  if (cardList.value.length === 0) {
    store.commit('setFilterParamsFirstPage')
    store.dispatch('getUserOrderList', getQueryParams())
  }
})

let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
console.log('height', height)
</script>


<style scoped>
.order-title-shadow {
  text-shadow: 1px 1px 20px rgba(59, 130, 246, 1);
}
</style>