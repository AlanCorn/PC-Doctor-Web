<template>
  <div class="flex flex-col items-center ">
    <div class="w-11/12 mt-10">
      <div class="mx-4 my-2 flex gap-0.5">
        <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" />
        <button class="btn btn-primary">搜索文档</button>
        <button class="btn btn-secondary">新建文档</button>
      </div>
      <!--        文章分类-->
      <!--        <div>-->
      <!--          <CateTabs :cateList="cateList" :onChangeState="onChangeState" />-->
      <!--        </div>-->
      <div class="grid grid-cols-1 md:grid-cols-2">
        <DocumentCard/>
        <DocumentCard/>
        <DocumentCard/>
        <DocumentCard/>
      </div>
    </div>
  </div>
  <!--  <DocumentPreview :text="text"/>-->
  <!--  <DocumentEdit/>-->
</template>

<script setup>
import DocumentCard from "@/components/DocumentCard.vue";
import CateTabs from "@/components/CateTabs.vue";


// 1. 文档分类逻辑
const cateList = ['全部', '联网教程', '重装系统教程', '常见问题',]
const onChangeState = (index) => {
  console.log(index)
}


</script>
