<template>
  <div class="flex items-center flex-col">
    <div class="hero min-h-screen" style="background-image: url(https://w.wallhaven.cc/full/dp/wallhaven-dpo38l.jpg);">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold hover:animate-bounce">欢迎使用电医预约！</h1>
          <p class="mb-5">校级社团，专业团队，提供最优质的服务！</p>
          <div class="flex items-center flex-col">
            <a @click="pushRouter('/addOrder')" class="btn btn-primary my-1 w-48">立即预约</a>
            <a @click="clickHistory" class="btn btn-primary my-1 w-48">预约历史</a>
          </div>
        </div>
      </div>
    </div>

<!--    @todo 筛选功能-->
<!--    <div class="align-center">-->
<!--      <div class="h-8 leading-8 inline">-->
<!--        显示已完成预约：-->
<!--      </div>-->
<!--      <input type="checkbox" class="toggle toggle-md" checked />-->
<!--    </div>-->
    <!-- 使用grid布局  -->
    <div id="orderHistory" class="grid grid-cols-1 my-5 lg:grid-cols-2 2xl:grid-cols-3 w-11/12">
      <!-- 信息卡片： -->
      <OrderCard class="transition duration-500 ease-in-out hover:bg-primary transform hover:-translate-y-1 hover:scale-100"
                 v-for="(cardInfo,index) of cardList"
                 :cardInfo="cardInfo"
                 :index="index">
      </OrderCard>
    </div>
<!--    @todo 加载动画-->
    <div class="flex items-center min-h-screen text-5xl font-bold justify-center"
         v-if="!isOrderListLoaded">
      <div class="flex items-center">
        <img
            src="../../assets/image/SVG/Rolling-1s-200px.svg"
            class="w-10 h-10"
        />
        <div class="text-2xl">
          正在加载
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import OrderCard from '../../components/OrderCard.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {computed,onMounted} from "vue";

const store = useStore()
const router = useRouter()

function pushRouter(path){
  router.push(path)
}

// 使页面滚动到history锚点
const clickHistory = () => {
  // 获取DOM元素
  console.log("使页面滚动到history锚点")
  let target = document.querySelector('#orderHistory');
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth'
    })
  }
};

const cardList = computed(() => store.state.order.orderList)
const isOrderListLoaded = computed(() => store.getters.isOrderListLoaded)

onMounted(() => {
  store.dispatch('getUserOrderList',{
    page:1
  })
})
</script>
