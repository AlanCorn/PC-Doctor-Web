<template>
  <div
      class="card border bg-white shadow-md px-3 py-2 my-3 max-w-md flex-row gap-3"
  >
    <MyAvatar :imgSrc="imgUrl" :name="props.doctorInfo.user_name"/>
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

    <div :class="{'absolute top-2 right-3 badge border-none':true,'bg-primary text-white':grade === '电医','bg-pink-400 text-white':grade === '管理员'}">
      {{ grade }}
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import SexIcon from "./SexIcon.vue";
import MyAvatar from "./MyAvatar.vue";
import { getOnlineImageUrl } from '@/utils'


const props = defineProps({
  doctorInfo: {
    type: Object,
    default: {
      user_id: "",
      user_name: "未匹配到电医",
      level: "1",
      contact_details: "QQ:123456789",
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

const imgUrl = computed(() => getOnlineImageUrl(props.doctorInfo.user_picture,'user_pic')[0])
</script>