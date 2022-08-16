<template>
  <div class="flex flex-col items-center">
    <div class="card w-11/12 md:w-3/4 lg:w-2/3 my-10">
      <div class="absolute top-5 right-5">
        <button class="btn btn-primary btn-sm" @click="handleEdit">
          编辑
        </button>
      </div>
      <v-md-preview :text="text"></v-md-preview>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
// 预览文本
const text = ref('# **电医预约**\n' +
    '> 这里是电医预约的文档页面\n' +
    '\n' +
    '## 预览\n' +
    '### 链接\n' +
    '[电医预约](http://116.62.129.37)\n' +
    '### 图片预览\n' +
    '![Description](https://w.wallhaven.cc/full/3z/wallhaven-3zygdy.png)\n' +
    '\n' +
    '### 这是一个表格\n' +
    '\n' +
    '|column1|column2|column3|\n' +
    '|-|-|-|\n' +
    '|content1|content2|content3| \n' +
    '\n' +
    '### 列表\n' +
    '1. 有序列表\n' +
    '\n' +
    '- 无序列表\n' +
    '\n' +
    '### \n' +
    '\n' +
    '### 代码块\n' +
    '```sudo rm -rf```\n' +
    'or\n' +
    '``` \n' +
    'sudo rm -rf /\n' +
    '```\n')


function handleEdit() {
  router.push({ name: 'Edit', params: { text: text.value } })
}

</script>