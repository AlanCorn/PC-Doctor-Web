<template>
  <div class="avatar flex-col justify-center">
    <div class="w-20 h-20 lg:w-22 lg:h-22 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
         v-if="!ifSrc"
    >
      <img :src="props.imgSrc"/>
    </div>
    <div class="avatar flex-col justify-center placeholder"
         v-if="ifSrc">
      <div class="w-20 h-20 lg:w-22 lg:h-22 rounded-full bg-accent-content/50">
        <span class="text-2xl">{{ props.name.slice(0,1) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  imgSrc: {
    type:String,
    default:""
  },
  name: {
    type:String,
    default:"无"
  }
})

// 判断是否传递了imgSrc参数
const ifSrc = computed(() => props.imgSrc === "")


</script>

<style lang='scss' scoped>

</style>