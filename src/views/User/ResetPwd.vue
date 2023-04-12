<template>
  <div class="flex items-center flex-col">
    <div class="w-11/12 pt-10">
      <!-- 编辑信息 -->
      <div class="text-primary text-4xl font-bold">设置密码</div>
      <div class="mt-10">
        <el-form label-width="70px" class="w-fit">
          <el-form-item label="帐号">
            <el-input disabled v-model="pageInfo.account" type="text" placeholder="请输入帐号" size="large" maxlength="16" />
          </el-form-item>
          <div class="flex justify-end inline text-sm font-thin text-red-500 ml-2"
            v-show="!checkPwdValid || pageInfo.pwd === ''">10～30位的字母、数字、小数点
          </div>
          <el-form-item label="新密码">
            <el-input v-model="pageInfo.brandPwd" type="password" placeholder="请输入新的密码" size="large" maxlength="30"
              show-password />
          </el-form-item>
          <div class="flex justify-end inline text-sm font-light text-red-500 ml-2" v-show="!checkPwdAgain">密码不一致
          </div>
          <el-form-item label="确认密码" class="contactItem">
            <el-input v-model="pageInfo.repeatBrandPwd" type="password" placeholder="请再次输入密码" size="large"
              show-password />
          </el-form-item>
          <el-form-item>
            <label for="resetPwdModal" class="btn btn-primary">确认更新</label>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <input type="checkbox" id="resetPwdModal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-2xl">确认修改密码？</h3>
      <div class="modal-action">
        <label for="resetPwdModal" class="btn btn-primary" @click="confirmResetPwd">确认</label>
        <label for="resetPwdModal" class="btn">取消</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import userApi from "@/api/userApi";
import { notify } from "@kyvg/vue3-notification";
import { useStore } from "vuex";

const store = useStore()

//密码正则，10到30位（字母，数字，小数点）
const pPattern = /^[a-zA-Z0-9.]{10,30}$/;
const pErrorMsg = "密码必须由10到30位的字母、数字、小数点组成";


// 检验密码合法性
const checkPwdValid = computed(() => pPattern.test(pageInfo.brandPwd));
// 再次输入密码
const checkPwdAgain = computed(() => pageInfo.brandPwd === pageInfo.repeatBrandPwd);

const pageInfo = reactive({
  account: computed(() => store.state.user.user_id),
  brandPwd: '',          // 新密码
  repeatBrandPwd: ''
})

// 提交重设密码请求
const confirmResetPwd = () => {
  const showInfo = (text) => {
    notify({
      type: 'warn',
      title: text
    });
  }
  if (!checkPwdValid.value) showInfo(pErrorMsg)
  else if (!checkPwdAgain.value) showInfo('密码不一致')
  else {
    userApi.userResetPwd({
      user_id: pageInfo.account,
      password: pageInfo.brandPwd
    }).then(res => {
      if (res.data.code === 0) {
        store.commit('offToken')
        router.replace('login')
        notify({
          type: 'success',
          title: '修改成功',
          text: '请重新登录',
        });
      }
    }).catch(err => {
      notify({
        type: 'info',
        title: '密码不符合要求或与原密码相同',
      });
    })
  }
}
</script>

<style lang='scss' scoped>
.el-input {
  width: 225px;
}
</style>