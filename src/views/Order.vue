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
            <a @click="clickSilder" class="btn btn-primary my-1 w-48">预约历史</a>
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
    <!-- 使用grid布局-->
    <div id="orderHistory" class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 w-11/12">
      <!-- 信息卡片： -->
      <OrderCard class="transition duration-500 ease-in-out hover:bg-primary transform hover:-translate-y-1 hover:scale-100" v-for="n in 11" ></OrderCard>
    </div>
    <!-- 使用flex布局-->
<!--    <div id="orderHistory" class="flex flex-wrap">-->
<!--      &lt;!&ndash; 信息卡片： &ndash;&gt;-->
<!--      <OrderCard v-for="n in 11" ></OrderCard>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import OrderCard from '../components/OrderCard.vue'
const clickSilder = () => {
  // 获取DOM元素
  console.log("获取DOM元素")
  let target = document.querySelector('#orderHistory');
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth'
    })
  }
};
</script>

<style scoped>

</style>