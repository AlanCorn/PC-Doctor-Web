<template>
  <div class="flex items-center flex-col">
    <div class="w-11/12 pt-10">
      <div class="text-primary text-4xl font-bold">用户管理</div>
      <div class="mt-3">
        <el-row :gutter="20">
          <el-col :span="8">
            <!-- 搜索与添加区域 -->
            <el-input placeholder="请输入内容">
              <template #append>
                <el-icon>
                  <Search/>
                </el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">添加用户</el-button>
          </el-col>
        </el-row>
      </div>

      <!-- el-pagination 分页组件 -->
      <div class="mt-1">
        <el-pagination :current-page="queryInfo.pageNum"
                       page-size="10" layout="total, prev, pager, next, jumper"
                       :total="total" @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <!-- 用户列表区域  -->
      <div class="card mt-2 mb-10">
        <el-table :data="userList" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="帐号" prop="user_id" width="180px"></el-table-column>
          <el-table-column label="姓名" prop="user_name" width="200px"></el-table-column>
          <el-table-column label="角色" prop="level" width="100px"></el-table-column>
          <el-table-column label="联系方式" prop="contact_details"></el-table-column>
          <el-table-column label="操作" width="130px" fixed="right">
            <template v-slot="scope">
              <el-button type="danger" size="mini">
                <el-icon>
                  <Delete/>
                </el-icon>
              </el-button>
              <el-button type="primary" size="mini">
                <el-icon>
                  <Setting/>
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Delete, Setting } from '@element-plus/icons-vue';
import { computed, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore()


const queryInfo = reactive({
  query: '', // 查询参数
  pageNum: 1, // 当前页码
},)

store.dispatch('getUserList',{
  page:queryInfo.pageNum
})
// 用户列表
let userList = computed(() => store.state.admin.userList.list)
// 总数据条数
let total = computed(() => store.state.admin.userList.size)



// 监听 页码值 改变的事件
function handleCurrentChange(newPage) {
  queryInfo.pageNum = newPage
  console.log(newPage)
  store.dispatch('getUserList',{
    page:queryInfo.pageNum
  })
}
</script>