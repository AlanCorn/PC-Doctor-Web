<template>
  <div class="shadow-md my-2 mx-1 card bg-base-200 shadow-xl">
    <div class="flex flex-row card-body ">
      <div class="w-72">
        <div>问题描述：{{data.problem}}</div>
        <div>类别：{{data.cate}}</div>
        <div>预约时间：{{data.orderTime}}</div>
        <div>预约地点：{{data.orderLocation}}</div>
        <div>状态：{{data.status}}</div>
      </div>
      <!-- 堆叠图片,靠右对齐 -->
      <div class="w-36 stack ml-auto">
        <img class="mask mask-square shadow-md rounded" src="https://placeimg.com/160/160/arch" />
        <img class="mask mask-square shadow rounded" src="https://placeimg.com/160/160/arch" />
        <img class="mask mask-square shadow rounded" src="https://placeimg.com/160/160/arch" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardInfo:Object
})

const data = props.cardInfo


</script>

<style scoped>

</style>