<template>
  <div class="flex flex-col items-center my-10">
    <div class="sm:mx-1 md:w-11/12">
      <div class="mx-4 my-2 flex gap-0.5">
        <input type="text" v-model="pageInfo.searchStr" placeholder="输入内容以搜索"
          class="input input-bordered input-primary w-full max-w-xs" />
        <button class="btn btn-primary" @click="handleSearchDoc">搜索文档</button>
        <button v-if="isAdmin" class="btn btn-secondary" @click="handleClickCreateDoc">新建文档</button>
      </div>
      <!--        文章分类-->
      <!--        <div>-->
      <!--          <CateTabs :cateList="cateList" :onChangeState="onChangeState" />-->
      <!--        </div>-->
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div v-for="(each) in doc_list" :key="each.id">
          <DocumentCard :doc="each" />
        </div>
      </div>
    </div>
  </div>
  <!--  <DocumentPreview :text="text"/>-->
  <!--  <DocumentEdit/>-->
</template>

<script setup>
import DocumentCard from "@/components/DocumentCard.vue";
import CateTabs from "@/components/CateTabs.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, reactive } from "vue";

const pageInfo = reactive({
  searchStr: ''
})

const router = useRouter()
const store = useStore()

store.dispatch('queryDocList')

const doc_list = computed(() => store.state.doc.docList)


// 1. 文档分类逻辑
const cateList = ['全部', '联网教程', '重装系统教程', '常见问题',]
const onChangeState = (index) => {
  console.log(index)
}

const isAdmin = computed(() => store.state.user.level === '2')

const handleSearchDoc = () => {
  store.dispatch('queryDocList', {
    title: pageInfo.searchStr
  })
}

const handleClickCreateDoc = () => {
  store.commit('offNowDoc')
  router.push('edit')
}
</script>
