<template>
  <div class="flex items-center flex-col">
    <div class="w-11/12 py-10">
      <OrderCardPages v-for="(each, index) in orderCardPagesData.titles" :key="index" :title="each"
        :list="adminOrderList(each).value" />
    </div>
  </div>

</template>

<script setup>
import DoctorCard from "../../components/DoctorCard.vue";
import OrderCardPages from '../../components/OrderCardPages.vue'
import { computed, onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";


const store = useStore()

const adminOrderList = (type) => computed(() => store.getters.adminOrderListGetter(type))
const doctorInfo = computed(() => store.getters.getUserInfo)


// 列表数据
const orderCardPagesData = reactive({
  titles: ['正在处理', '待接单', '已完成'],
})
// 筛选与查询参数
const orderCardPagesParams = reactive({
  filterType: ['setProcessingList', 'setWaitingList', 'setFinishedList'],
  filterParams: [{
    page: 1,
    status: 1,
    doctor_id: computed(() => store.state.user.user_id)
  }, {
    page: 1,
    status: 0,
  }, {
    page: 1,
    status: 2,
    doctor_id: computed(() => store.state.user.user_id)
  }],
})


onBeforeMount(() => {
  orderCardPagesParams.filterType.forEach((each, index) => {
    store.dispatch('getAdminOrderList', {
      params: orderCardPagesParams.filterParams[index],
      type: each
    })
  })
})
</script>
