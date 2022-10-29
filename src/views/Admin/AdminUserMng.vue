<template>
  <div>
    <div class="flex items-center flex-col">
      <div class="w-11/12 pt-10">
        <div class="text-primary text-4xl font-bold">用户管理</div>
        <div class="mt-3">
          <el-row :gutter="20">
            <el-col :span="8">
              <!-- 搜索与添加区域 -->
              <el-input placeholder="请输入帐号或用户名" v-model="queryInfo.params.search">
                <template #append>
                  <el-button @click="handleSearch">
                    <el-icon>
                      <Search />
                    </el-icon>
                  </el-button>
                </template>
              </el-input>
            </el-col>
            <!--          <el-col :span="4">-->
            <!--            <el-button type="primary">添加用户</el-button>-->
            <!--          </el-col>-->
          </el-row>
        </div>

        <div class="flex mt-1 gap-5">
          <!-- 简单的角色分类筛选 -->
          <el-radio-group v-model="queryInfo.params.level" @change="handleLevelChange">
            <el-radio :label="-1">全部</el-radio>
            <el-radio :label="0">普通用户</el-radio>
            <el-radio :label="1">电医</el-radio>
            <el-radio :label="2">管理员</el-radio>
          </el-radio-group>
        </div>
        <!-- 用户列表区域  -->
        <div class="card mt-2 my-1">
          <el-table :data="userList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="帐号" prop="user_id" width="180px"></el-table-column>
            <el-table-column label="姓名/昵称" prop="user_name" width="200px"></el-table-column>
            <el-table-column label="角色" prop="level" width="120px" align="center">
              <template #default="scope">
                <el-dropdown @command="handleLevelChangeCommand">
                  <span class="el-dropdown-link">
                    <div
                      :class="{ 'badge border-none': true, 'bg-primary text-white': scope.row.level === '1', 'bg-pink-400 text-white': scope.row.level === '2' }">
                      {{ grade(scope.row.level) }}
                    </div>
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <!-- 通过官方的command Api传对象给点击事件 -->
                      <el-dropdown-item :command="{
                        level: '0',
                        user_id: scope.row.user_id
                      }">
                        普通用户
                      </el-dropdown-item>
                      <el-dropdown-item :command="{
                        level: '1',
                        user_id: scope.row.user_id
                      }">
                        电医
                      </el-dropdown-item>
                      <el-dropdown-item :command="{
                        level: '2',
                        user_id: scope.row.user_id
                      }">
                        管理员
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
            <el-table-column label="联系方式" prop="contact_details"></el-table-column>
            <el-table-column label="操作" width="130px" fixed="right">
              <template v-slot="scope">
                <!-- 一个确认删除按钮，防止误操作 -->
                <div class="flex gap-1">
                  <el-dropdown trigger="click">
                    <el-button type="danger" size="small">
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="handleDeleteUser(scope.row.user_id)">
                          确认删除？
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <el-dropdown trigger="click">
                    <el-button type="primary" size="small">
                      <el-icon>
                        <Setting />
                      </el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="handleResetPwd(scope.row.user_id)">
                          重置密码
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination class="mt-3" :current-page="queryInfo.pageNum" @current-change="handleCurrentChange"
          :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Delete, Setting, ArrowDown } from '@element-plus/icons-vue';
import adminApi from "@/api/adminApi";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { notify } from "@kyvg/vue3-notification";

const store = useStore()

// 用户列表
let userList = computed(() => store.state.admin.userList.list)
// 总数据条数
let total = computed(() => store.state.admin.userList.size)
// 查询参数与其他信息
const queryInfo = reactive({
  params: {
    search: "",
    level: -1
  }, // 查询参数
  pageNum: 1, // 当前页码
},)

// 根据level值返回身份名称
const grade = (level) => {
  switch (level) {
    case '0':
      return '普通用户'
    case '1':
      return '电医'
    case '2':
      return '管理员'
  }
}
// 重载列表
const reloadList = () => {
  store.dispatch('getUserList', {
    level: queryInfo.params.level !== -1 ? queryInfo.params.level : null,
    page: queryInfo.pageNum
  })
}
// 初始化调用
reloadList()

// 1.查询操作：
const handleLevelChange = (level) => {
  queryInfo.params.level = level
  reloadList()
}

// 2. 分页：监听 页码值 改变的事件
function handleCurrentChange(newPage) {
  queryInfo.pageNum = newPage
  reloadList()
}

// 3. 表格操作：下拉菜单的点击事件，改变用户身份
const handleLevelChangeCommand = (command) => {
  // command是对象，当作params直接传即可
  adminApi.userUpdateLevel(command).then(res => {
    if (res.data.code === 0) {
      reloadList()
      notify({
        type: 'success',
        title: '操作成功'
      });
    }
  })
}
// 删除用户
const handleDeleteUser = (user_id) => {
  adminApi.deleteUser(user_id).then(res => {
    if (res.data.code === 0) {
      reloadList()
      notify({
        type: 'success',
        title: '操作成功'
      });
    }
  })
}
// 重置用户密码为123456 handleResetPwd
const handleResetPwd = (user_id) => {
  alert(`重置用户:${user_id} 密码为：123456`)
}

// 4. 搜索 (优先查找帐号，帐号没找到再调用接口模糊查询用户名)
const handleSearch = () => {
  queryInfo.params.level = -1
  queryInfo.pageNum = 1
  store.dispatch('getUserList', {
    user_id: queryInfo.params.search
  }).then((res) => {
    if (res.data.size === 0) {
      store.dispatch('getUserList', {
        user_name: queryInfo.params.search
      })
    }
  })
}
</script>