<template>
  <div class="card bg-base-100 shadow-xl m-2 border border-solid border-2 transition duration-500 hover:ring"
       @click="posCardClick">
    <div class="card-body p-4 lg:p-6">
      <div
          class=" title card-title text-gray-700 lg:text-2xl transition duration-500 ease-in-out hover:text-primary">
        {{ props.doc.title }}
      </div>
      <div class="divider my-0"></div>
      <div class="flex gap-1.5">
        <div class="flex px-1 items-center text-gray-500">
          <svg t="1660738795170" class="fill-current h-6 w-6 text-pink-300" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="1810" width="128" height="128">
            <path
                d="M782.208 530.72L724.288 448l57.92-82.72a32 32 0 0 0-20.672-49.856l-99.456-17.536-17.536-99.456a32 32 0 0 0-49.856-20.672L512 235.712l-82.72-57.92a32 32 0 0 0-49.856 20.672l-17.536 99.456-99.456 17.504a32 32 0 0 0-20.672 49.856L299.712 448l-57.92 82.72a32 32 0 0 0 20.672 49.856l99.456 17.536 17.536 99.456a32 32 0 0 0 49.856 20.672L512 660.288l82.72 57.92a32 32 0 0 0 49.856-20.672l17.536-99.456 99.456-17.536a31.968 31.968 0 0 0 20.64-49.824z m-123.2-64.352l41.952 59.904-72.032 12.704a32 32 0 0 0-25.952 25.952l-12.704 72.032-59.904-41.952a32 32 0 0 0-36.704 0l-59.904 41.952-12.704-72.032a32 32 0 0 0-25.952-25.952l-72.032-12.704 41.952-59.904a32 32 0 0 0 0-36.704l-41.952-59.904 72.032-12.704a32 32 0 0 0 25.952-25.952l12.704-72.032 59.904 41.952a32 32 0 0 0 36.704 0l59.904-41.952 12.704 72.032a32 32 0 0 0 25.952 25.952l72.032 12.704-41.952 59.904a32 32 0 0 0 0 36.704z"
                p-id="1811"></path>
            <path
                d="M512 34.912c-243.008 0-440 196.992-440 440a438.72 438.72 0 0 0 133.344 315.552 32 32 0 1 0 44.608-45.888 374.752 374.752 0 0 1-113.952-269.664c0-207.648 168.352-376 376-376s376 168.352 376 376c0 99.136-38.496 192.096-106.144 261.824a32 32 0 1 0 45.92 44.576 438.56 438.56 0 0 0 124.224-306.4c0-243.008-196.992-440-440-440z"
                p-id="1812"></path>
            <path
                d="M704 761.088a32 32 0 0 0-32 32v107.104l-142.24-94.848-0.064-0.032a32 32 0 0 0-11.552-4.736c-2.048-0.416-4.096-0.032-6.144-0.032s-4.096-0.352-6.144 0.032c-4.096 0.8-8 2.4-11.552 4.736l-0.064 0.032L352 900.224V800a32 32 0 0 0-64 0v160c0 0.992 0.48 1.856 0.576 2.848a32.256 32.256 0 0 0 3.712 12.224c0.48 0.864 0.544 1.856 1.088 2.688 0.576 0.896 1.504 1.344 2.176 2.144a31.36 31.36 0 0 0 21.472 11.488c1.024 0.096 1.92 0.608 2.976 0.608 0.992 0 1.856-0.48 2.848-0.576a32.256 32.256 0 0 0 12.256-3.712c0.864-0.48 1.856-0.544 2.688-1.088L512 870.464l174.24 116.16c14.688 9.792 34.56 5.824 44.384-8.864a31.584 31.584 0 0 0 4.768-21.664c0.096-1.056 0.608-1.952 0.608-3.04v-159.968a32 32 0 0 0-32-32z"
                p-id="1813"></path>
          </svg>
          电脑医院
        </div>
        <div class="flex px-1 items-center text-gray-500">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"></path>
          </svg>
          <div>{{ fmtTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {timeFormatter} from "@/utils"
import {computed} from "vue";

const router = useRouter()

const props = defineProps({
  doc: {
    type: Object,
    default: {
      id: -1,
      create_time: "2022-08-31T23:34:36",
      title: "Template Tittle",
      summary: "Summary",
      file: "1661960076941.md"
    }
  }
})

const fmtTime = computed(() => timeFormatter(props.doc.create_time))

const posCardClick = () => {
  if (props.doc.id !== -1){
    router.push({ path: '/preview', query: { id : props.doc.id } })
  }
}
</script>

<style lang='scss' scoped>
</style>