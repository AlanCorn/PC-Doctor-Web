<template>
  <div class="flex flex-col items-center">
    <div class="w-full relative md:card md:w-11/12 md:w-3/4 lg:w-2/3 md:my-10">
      <div v-if='isAdmin' class="absolute top-5 right-5">
        <div class="flex gap-1.5">
          <button class="btn btn-primary btn-sm" @click="handleEdit">
            编辑
          </button>
          <button class="btn btn-error btn-sm btn-circle btn-outline" @click="pageInfo.ifShowModel = true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <v-md-preview :text="text"></v-md-preview>
    </div>
  </div>
  <!-- 点击删除-显示对话框 -->
  <input v-model="pageInfo.ifShowModel" type="checkbox" id="confirmUpdateModal" class="modal-toggle" />
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="font-bold text-2xl">确认删除文档？</div>
      <div class="font-light text-xl mt-3">本文档的所有信息将丢失</div>
      <div class="modal-action">
        <label for="confirmUpdateModal" class="btn btn-primary" @click="confirmDelete">确认</label>
        <label for="confirmUpdateModal" class="btn">取消</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import adminApi from "@/api/adminApi";
import { notify } from "@kyvg/vue3-notification";

const route = useRoute()
const router = useRouter()
const store = useStore()

const pageInfo = reactive({
  ifShowModel: false
})

// 获取文章
store.dispatch('queryDocById', route.query.id)

const isAdmin = computed(() => store.state.user.level === '2')
// 预览文本
const text = computed(() => store.state.doc.nowDocText)

function handleEdit() {
  router.push({ name: 'Edit', params: { text: text.value } })
}

const confirmDelete = () => {
  adminApi.deleteDocument(route.query.id).then(res => {
    if (res.data.code === 0) {
      router.push('/document')
      notify({
        type: 'success',
        title: '删除成功'
      });
    }
  })
}
</script>