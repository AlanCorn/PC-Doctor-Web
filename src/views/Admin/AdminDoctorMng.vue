<template>
  <div class="flex items-center flex-col">
    <div class="w-11/12 pt-10">
    <div class="text-primary text-4xl font-bold">电医管理</div>

    <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
      <DoctorCard v-for="index in 10" key="index" class="m-2"/>
    </div>
    <div class="btn-group">
      <button class="btn btn-sm">1</button>
      <button class="btn btn-sm btn-active">2</button>
      <button class="btn btn-sm">3</button>
      <button class="btn btn-sm">4</button>
    </div>
    </div>
  </div>

</template>

<script setup>
import DoctorCard from "../../components/DoctorCard.vue";

const infoForm = {
  avatar: "https://s.gravatar.com/avatar/059edf8a64b449e8ad399de39c3309aa?s=80",
  name: "杨志文",
  sex: "男",
  contact: "QQ:1561206831",
  grade: "电医", // 职位
  score: "89", // 评分
};
</script>