<template>
  <div
      class="card border bg-white shadow-md px-3 py-2 my-3 max-w-md flex-row gap-3"
  >
    <MyAvatar :imgSrc="props.doctorInfo.avatar" :name="props.doctorInfo.user_name"/>
    <div class="flex flex-col justify-center">
      <div class="flex">
        <div class="inline font-bold mr-1">
          {{ props.doctorInfo.user_name }}
        </div>
        <SexIcon sex="男"/>
      </div>
      <div>
        {{ props.doctorInfo.contact_details }}
      </div>
      <!--				<div class="rating rating-sm">-->
      <!--					<input-->
      <!--						type="radio"-->
      <!--						name="rating-6"-->
      <!--						class="mask mask-star-2 bg-orange-400"-->
      <!--					/>-->
      <!--					<input-->
      <!--						type="radio"-->
      <!--						name="rating-6"-->
      <!--						class="mask mask-star-2 bg-orange-400"-->
      <!--						checked-->
      <!--					/>-->
      <!--					<input-->
      <!--						type="radio"-->
      <!--						name="rating-6"-->
      <!--						class="mask mask-star-2 bg-orange-400"-->
      <!--					/>-->
      <!--					<input-->
      <!--						type="radio"-->
      <!--						name="rating-6"-->
      <!--						class="mask mask-star-2 bg-orange-400"-->
      <!--					/>-->
      <!--					<input-->
      <!--						type="radio"-->
      <!--						name="rating-6"-->
      <!--						class="mask mask-star-2 bg-orange-400"-->
      <!--					/>-->
      <!--				</div>-->
    </div>

    <div class="absolute top-2 right-3 badge">
      {{ grade }}
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import SexIcon from "./SexIcon.vue";
import MyAvatar from "./MyAvatar.vue";

const props = defineProps({
  doctorInfo: {
    type: Object,
    default: {
      user_id: "2012190330",
      user_name: "杨志文",
      level: "1",
      contact_details: "QQ:1561206831",
      user_description: "",
      user_picture: ""
    }
  }
})


const grade = computed(() => {
  switch (props.doctorInfo.level) {
    case '0':
      return '普通用户'
    case '1':
      return '电医'
    case '2':
      return '管理员'
  }
})

// const infoForm = {
//   // avatar: "https://s.gravatar.com/avatar/059edf8a64b449e8ad399de39c3309aa?s=80",
//   name: "杨志文",
//   sex: "男",
//   contact: "QQ:1561206831",
//   grade: "电医", // 职位
//   score: "89", // 评分
// };
</script>