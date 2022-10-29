<template>
  <div class="tabs tabs-boxed bg-base-100 text-2xl items-start mt-5">
    <a v-for="(each, index) in cateList" :key="index"
      :class="{ 'tab transition duration-500 rounded-md': true, 'tab-active': index === activeCateIndex }"
      @click="(activeCateIndex = index) && onChangeState(index)">
      {{ each }}
    </a>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  cateList: Array,
  onChangeState: Function
})

const activeCateIndex = ref(0)
</script>

<style lang='scss' scoped>

</style>