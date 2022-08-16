<template>
  <div class="flex flex-col items-center">
    <div class="w-11/12">
      <div>
        <CateTabs :cateList="cateList" :onChangeState="onChangeState" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
      </div>
    </div>
  </div>
<!--  <DocumentPreview :text="text"/>-->
<!--  <DocumentEdit/>-->
</template>

<script setup>
import { ref,reactive } from 'vue'
import DocumentPreview from "./DocumentPreview.vue";
import DocumentEdit from "./DocumentEdit.vue";
import DocumentCard from "@/components/DocumentCard.vue";
import CateTabs from "@/components/CateTabs.vue";


// 1. 文档分类逻辑
const cateList = ['全部', '联网教程', '重装系统教程', '常见问题',]
const onChangeState = (index) => {
  console.log(index)
}





</script>
