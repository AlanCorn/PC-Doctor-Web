<template>
  <div class="container max-w-full mx-auto py-24 px-6">
    <div class="max-w-sm mx-auto px-6">
      <div class="relative flex flex-wrap">
        <div class="w-full relative">
          <div class="mt-6">
            <div class="">
              <div class="text-3xl text-primary font-bold">个人信息</div>
              <form>
                <div class="py-2">
                  <label class="px-1 text-md text-gray-600">昵称</label>
                  <el-input v-model="formData.user_name" placeholder="请输入昵称" maxlength="20"/>
                </div>
                <div class="py-2">
                  <label class="px-1 text-md text-gray-600"> 联系方式 </label>
                  <el-radio-group
                      style="display: block"
                      v-model="formData.radio"
                  >
                    <el-radio label="QQ">QQ</el-radio>
                    <el-radio label="WeChat">WeChat</el-radio>
                    <el-radio label="Phone">Phone</el-radio>
                  </el-radio-group>
                  <el-input
                      v-model="formData.contact_details"
                      placeholder="请输入联系方式(QQ/微信/手机号)"
                      maxlength="25"
                  />
                </div>
              </form>
              <button
                  class="btn btn-primary mt-3 text-lg w-full"
                  type="submit"
              >
                确认
              </button>
              <button
                  class="btn mt-3 text-lg w-full"
                  @click="logout"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import { computed,reactive,onBeforeMount} from "vue";
import { useStore } from "vuex";
import router from "../../router";

const store = useStore()

const user_name = computed(() => store.state.user.user_name)
const contact_details = computed(() => store.state.user.contact_details)
console.log(user_name)

const formData = reactive({
  user_name: "",
  radio: "",
  contact_details: "",
});

onBeforeMount(() => {
  formData.user_name = user_name.value
  const splitIndex = contact_details.value.indexOf(':')
  formData.radio = contact_details.value.slice(0,splitIndex)
  formData.contact_details = contact_details.value.slice(splitIndex + 1)
})


const logout = () => {
  store.commit("offToken")
  router.replace('/')
  notify({
    type: 'success',
    title: '已成功退出',
  })
}
</script>

<style lang='scss' scoped>

</style>