<template>
  <div class="flex flex-col items-center">
    <div>
      data里的数字：{{count}}
      计算属性：{{computedCount}}
    </div>
    <button class="btn btn-primary w-30" @click="addData">点我增加</button>
  </div>
</template>

<script>
export default {
  name: "Help",
  data(){
    return{
      count : 1,
    }
  },
  computed:{
    computedCount(){
      return this.count * 2
    }
  },
  methods:{
    addData(){
      this.count  += 1
    }
  }
}
</script>

<style scoped>

</style>