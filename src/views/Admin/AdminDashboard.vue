<template>
	<div class="container p-10">
		<div class="text-primary text-4xl font-bold">我的名片</div>
    <DoctorCard/>
		<div class="text-primary text-4xl font-bold">待接单</div>
		<div class="text-primary text-4xl font-bold">正在处理</div>
		<div class="text-primary text-4xl font-bold">已完成</div>
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
