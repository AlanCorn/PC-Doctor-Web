<template>
  <div class="flex items-center flex-col">
    <div class="hero min-h-screen" style="background-image: url(https://w.wallhaven.cc/full/dp/wallhaven-dpo38l.jpg);">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold hover:animate-bounce">欢迎使用电医预约！</h1>
          <p class="mb-5">校级社团，专业团队，提供最优质的服务！</p>
          <div class="flex items-center flex-col">
            <button class="btn btn-primary my-1 w-48">立即预约</button>
            <a @click="clickHistory" class="btn btn-primary my-1 w-48">预约历史</a>
          </div>
        </div>
      </div>
    </div>



    <div class="align-center">
      <div class="h-8 leading-8 inline">
        显示已完成预约：
      </div>
      <input type="checkbox" class="toggle toggle-md" checked />
    </div>
    <!-- 使用grid布局  -->
    <div id="orderHistory" class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 w-11/12">
      <!-- 信息卡片： -->
      <OrderCard class="transition duration-500 ease-in-out hover:bg-primary transform hover:-translate-y-1 hover:scale-100"
                 v-for="(cardInfo,index) of cardList" :cardInfo="cardInfo" :index="index">
      </OrderCard>
    </div>
  </div>
</template>

<script setup>
import OrderCard from '../components/OrderCard.vue'
import { useStore } from 'vuex'
import {computed} from "vue";

const store = useStore()
// 使页面滚动到history锚点
const clickHistory = () => {
  // 获取DOM元素
  console.log("获取DOM元素")
  let target = document.querySelector('#orderHistory');
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth'
    })
  }
};

const whichToShow = "已完成"
const cardList = computed(() => store.state.order.orderList)
console.log(cardList.value)
</script>
