<template>
  <div class="flex items-center flex-col">
    <div class="w-11/12 pt-10">
      <!-- 编辑信息 -->
      <div class="text-primary text-4xl font-bold">更新信息</div>
      <!-- 一条提示 -->
      <div class="alert bg-base-100">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="stroke-current flex-shrink-0 w-6 h-6 text-primary">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>请认真填写个人信息，信息对委托人可见</span>
        </div>
      </div>
      <div>
        <el-form :model="form" label-width="70px">
          <el-form-item label="姓名">
            <el-input
                v-model="form.name"
                placeholder="尽量使用真实姓名"
                class="name"
            />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"/>
              <el-radio label="女"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系方式" class="contactItem">
            <div>
              <el-radio-group style="display: block" v-model="form.radio">
                <el-radio label="QQ">QQ</el-radio>
                <el-radio label="WeChat">WeChat</el-radio>
                <el-radio label="Phone">Phone</el-radio>
              </el-radio-group>
              <el-input
                  v-model="form.contact"
                  class="contact"
                  placeholder="请输入联系方式(推荐使用QQ)"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <button class="btn btn-sm" @click="onSubmit">确认更新</button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import SexIcon from "../../components/SexIcon.vue";

const infoForm = reactive({
  avatar: "https://s.gravatar.com/avatar/059edf8a64b449e8ad399de39c3309aa?s=80",
  name: "杨志文",
  sex: "男",
  contact: "QQ:1561206831",
  grade: "电医", // 职位
  score: "89", // 评分
});

const form = reactive({
  avatar: "",
  name: "",
  sex: "",
  radio: "",
  contact: "",
  grade: "", // 职位
  score: "", // 评分
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 300px;
}

// .contactItem /deep/ .el-form-item__content{
//   flex-direction: column;
// }
</style>
