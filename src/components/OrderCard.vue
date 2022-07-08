<template>
  <div class="shadow-md my-2 mx-1 card bg-base-200 shadow-xl">
    <div class="flex flex-row card-body ">
      <div class="w-72">
        <div>问题描述：{{time}}</div>
        <div>类别：{{time}}</div>
        <div>预约时间：{{time}}</div>
        <div>预约地点：{{time}}</div>
        <div>状态：{{time}}</div>
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
</script>

<style scoped>

</style>