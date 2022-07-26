<template>
  <div class="flex items-center flex-col ">
    <ul class="steps steps-horizontal my-10 w-11/12 lg:w-3/4 xl:w-1/2">
      <li v-for="(each,index) in steps" key="index"
          :class="{'step':true,'step-primary':isActive(index)}">
        {{ each }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// 进度条
const steps = ['填写表单','排队中','正在处理','已完成']
const props = defineProps({
  onStep:{
    type:Number,
    default:0
  }
})
const isActive = (index) => {
  return index <= props.onStep;
}
</script>

<style lang='scss' scoped>

</style>