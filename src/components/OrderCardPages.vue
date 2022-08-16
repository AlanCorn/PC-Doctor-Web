<template>
  <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2">
    <input type="checkbox" class="peer"/>
    <div class="collapse-title text-primary text-2xl font-bold">{{ props.title }}</div>
    <div class="collapse-content">
      <div class="grid grid-cols-1 my-5 lg:grid-cols-2 2xl:grid-cols-3"
        v-if="props.list.length > 0">
        <!-- 信息卡片： -->
        <OrderCard
            v-for="(cardInfo) of props.list"
            :key="cardInfo.id"
            :cardInfo="cardInfo">
        </OrderCard>
      </div>
      <div v-if="props.list.length === 0"
      class="flex h-20 items-center justify-center ">
        <div class="text-xl ">暂无相关预约条目😊</div>
      </div>
<!--      <button class="btn btn-primary">加载更多？</button>-->
    </div>
  </div>

</template>

<script setup>
import OrderCard from './OrderCard.vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {computed, reactive} from "vue";

const store = useStore()
const router = useRouter()

const props = defineProps({
  title:String,
  list:Array
})
</script>

<style lang='scss' scoped>

</style>