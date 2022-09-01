<template>
  <div class="flex flex-col items-center">
    <div class="card w-11/12 md:w-3/4 lg:w-2/3 my-10">
      <div v-if='isAdmin' class="absolute top-5 right-5">
        <button class="btn btn-primary btn-sm" @click="handleEdit">
          编辑
        </button>
      </div>
      <v-md-preview :text="text"></v-md-preview>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

const route = useRoute()
const router = useRouter()
const store = useStore()

// 获取文章
store.dispatch('queryDocById',route.query.id)

const isAdmin = computed(() => store.state.user.level === '2')
// 预览文本
const text = computed(() => store.state.doc.nowDocText)

function handleEdit() {
  router.push({ name: 'Edit', params: { text: text.value } })
}

</script>