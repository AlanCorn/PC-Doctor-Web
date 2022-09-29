<template>
  <div class="flex items-center flex-col mb-10">
    <div class="w-11/12 pt-10">
      <div class="text-primary text-4xl font-bold">问题类别管理</div>
      <!-- 一条提示 -->
      <div class="alert bg-base-100 mt-3">
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
      <div class="flex flex-row gap-2 mt-5">
        <input
            type="text"
            placeholder="输入一个新的类别"
            class="input input-bordered w-full max-w-xs"
            v-model="data.inputCate"
        />
        <button class="btn btn-primary" @click="addCate">添加</button>
      </div>
      <div class="flex gap-2 mt-8 flex-wrap">
        <div v-for="(each, index) in cateList" :key="index" class="indicator">
          <div class="indicator-item">
            <!-- 删除按钮 -->
            <button class="btn btn-circle btn-xs"
                    @click="deleteCate(each)">
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
    <div class="w-11/12 pt-10">
      <div class="text-primary text-4xl font-bold">预约通知群修改</div>
      <div class="alert bg-base-100 mt-3">
        预约通知将发送至QQ群: {{ groupID }}
      </div>
      <div class="flex flex-row gap-2 my-5">
        <input
            type="text"
            placeholder="想将通知发送到哪个群？"
            class="input input-bordered w-full max-w-xs"
            v-model="data.inputGroupId"
        />
        <button class="btn btn-primary" @click="updateGroupID">修改</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {notify} from "@kyvg/vue3-notification";
import {computed, reactive} from "vue";
import {useStore} from "vuex";
import adminApi from "@/api/adminApi";

const store = useStore();

const data = reactive({
  inputCate: "",
  inputGroupId:""
});

store.dispatch('getProblemCate')

// store里的类别表
const  cateList = computed(() => store.getters.getFmtCateList)

// 添加一个类别
const addCate = () => {
  console.log(data.inputCate)
  if (data.inputCate === "") {
    notify({
      type: "warn",
      title: "请输入类别名",
    });
  } else {
    adminApi.addProblemCate({
      cate:data.inputCate
    }).then(res => {
      if (res.data.code === 0){
        notify({
          type: "success",
          title: "添加成功",
        });
        store.dispatch('getProblemCate')
      }
    })
  }
  // 调用接口
}

// 删除一个类别
const deleteCate = (cate) => {
  console.log(cate)
  adminApi.deleteProblemCate({
    cate:data.inputCate
  }).then(res => {
    if (res.data.code === 0){
      notify({
        type: "success",
        title: "删除成功",
      });
      store.dispatch('getProblemCate')
    }
  })
}

// 预约通知群号
const groupID = computed(() => store.state.admin.informGroupID)
store.dispatch('getInformGroupID')

// 预约通知群号修改
const updateGroupID = async () => {
  const res = await adminApi.updateInformGroupID(data.inputGroupId)
  if (res.data.code === 0) {
    notify({
      type: "success",
      title: "修改成功",
    });
    await store.dispatch('getInformGroupID')
  }
}
</script>
