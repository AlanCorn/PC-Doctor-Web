<template>
  <div class="flex items-center flex-col">
    <div class="w-11/12 pt-10">
      <div class="text-primary text-4xl font-bold">问题类别</div>
      <!-- 一条提示 -->
      <div class="alert bg-base-100">
        <div>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>管理用户在创建预约时可选择的问题类别</span>
        </div>
      </div>
      <div class="flex flex-row gap-2">
        <input
            type="text"
            placeholder="输入一个新的类别"
            class="input input-bordered w-full max-w-xs"
            v-model="data.inputCate"
        />
        <button class="btn" @click="addCate">添加</button>
      </div>

      <div class="flex gap-2 mt-8 flex-wrap">
        <div v-for="(each, index) in cates" :key="index" class="indicator">
          <div class="indicator-item">
            <button class="btn btn-circle btn-xs">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="card border text-xl bg-white px-3 py-2 shadow-md animate-pulse">
            {{ each }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {notify} from "@kyvg/vue3-notification";
import {computed, reactive} from "vue";
import {useStore} from "vuex";

const store = useStore();

const data = reactive({
  inputCate: "",
});

const cates = computed(() => store.state.order.cateList);

// 添加一个类别
const addCate = () => {
  console.log(data.inputCate)
  if (data.inputCate.length === 0) {
    notify({
      type: "warn",
      title: "请输入类别名",
    });
  }
  // 调用接口
}

// 删除一个类别
const deleteCate = (cateId) => {
  console.log(cateId)

}
</script>
