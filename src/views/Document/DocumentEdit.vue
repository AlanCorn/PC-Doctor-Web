<template>
  <div class="flex flex-col items-center">
<!--    <el-page-header :icon="ArrowLeft" content="文档" />-->
    <div class="card w-11/12 my-10">
      <v-md-editor v-model="text" height="800px"></v-md-editor>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useRoute} from "vue-router";
// import { ArrowLeft } from '@element-plus/icons-vue'
const route = useRoute()

const text = ref(route.params.text)
</script>
