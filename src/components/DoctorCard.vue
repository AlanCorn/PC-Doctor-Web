<template>
		<div
			class="card border bg-white shadow-md px-3 py-2 my-3 max-w-md flex-row gap-3"
		>
			<div class="avatar flex-col justify-center">
				<div class="w-20 h-20 lg:w-24 lg:h-24 rounded-full">
					<img :src="infoForm.avatar" />
				</div>
			</div>
			<div class="flex flex-col justify-center">
				<div class="flex">
					<div class="inline font-bold mr-1">
						{{ infoForm.name }}
					</div>
					<SexIcon :sex="infoForm.sex" />
				</div>
				<div>
					{{ infoForm.contact }}
				</div>
				<div class="rating rating-sm">
					<input
						type="radio"
						name="rating-6"
						class="mask mask-star-2 bg-orange-400"
					/>
					<input
						type="radio"
						name="rating-6"
						class="mask mask-star-2 bg-orange-400"
						checked
					/>
					<input
						type="radio"
						name="rating-6"
						class="mask mask-star-2 bg-orange-400"
					/>
					<input
						type="radio"
						name="rating-6"
						class="mask mask-star-2 bg-orange-400"
					/>
					<input
						type="radio"
						name="rating-6"
						class="mask mask-star-2 bg-orange-400"
					/>
				</div>
			</div>

			<div class="absolute top-2 right-3 badge">
				{{ infoForm.grade }}
			</div>
		</div>
</template>

<script setup>
import { reactive } from "vue";
import SexIcon from "./SexIcon.vue";

const infoForm = {
	avatar: "https://s.gravatar.com/avatar/059edf8a64b449e8ad399de39c3309aa?s=80",
	name: "杨志文",
	sex: "男",
	contact: "QQ:1561206831",
	grade: "电医", // 职位
	score: "89", // 评分
};
</script>