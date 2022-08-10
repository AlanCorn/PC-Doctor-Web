<template>
  <div class="flex items-center flex-col">
    <div class="w-11/12 pt-10">
      <div class="text-primary text-4xl font-bold">用户管理</div>
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
      <!-- 页面区域 -->
      <el-pagination :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]"
                     :page-size="queryInfo.pagesize" layout="total, prev, pager, next, jumper"
                     :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      >
      </el-pagination>
      <div class="btn-group">
        <button class="btn btn-sm">1</button>
        <button class="btn btn-sm btn-active">2</button>
        <button class="btn btn-sm">3</button>
        <button class="btn btn-sm">4</button>
      </div>
      <!-- 用户列表区域  -->
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
</template>

<script setup>
import {Search, Delete, Setting} from '@element-plus/icons-vue';
import {reactive} from "vue";

const queryInfo = reactive({
  query: '', // 查询参数
  pageNum: 1, // 当前页码
  pageSize: 10 // 每页显示条数
},)
// 用户列表
let userList = [
  {
    "user_id": "13216751322",
    "user_name": "ZC",
    "level": "0",
    "contact_details": "QQ:631981700"
  },
  {
    "user_id": "1620211863",
    "user_name": "goldenking",
    "level": "0",
    "contact_details": "QQ:1620211863"
  },
  {
    "user_id": "2012190330",
    "user_name": "杨志文234",
    "level": "0",
    "contact_details": "QQ:1561206831"
  },
  {
    "user_id": "20121903303",
    "user_name": "yzw",
    "level": "0",
    "contact_details": "QQ:5367125673"
  },
  {
    "user_id": "admin123",
    "user_name": "admin123",
    "level": "2",
    "contact_details": "qq:313521996"
  },
  {
    "user_id": "ejjfuhejfue56278",
    "user_name": "ehjf hi sjx",
    "level": "0",
    "contact_details": "QQ:dbf7ne"
  },
  {
    "user_id": "mdd",
    "user_name": "mdd3135",
    "level": "0",
    "contact_details": "QQ:313521996"
  },
  {
    "user_id": "mdd3135",
    "user_name": "mdd",
    "level": "0",
    "contact_details": "QQ:313521996"
  },
  {
    "user_id": "Shiroha",
    "user_name": "Shiroha",
    "level": "0",
    "contact_details": "QQ:1239179654"
  },
  {
    "user_id": "test123",
    "user_name": "test123",
    "level": "0",
    "contact_details": "qq:12335"
  }
]

// 总数据条数
let total = 0

async function getUserList() {
  const {data: res} = await this.$http.get('users', {
    params: queryInfo
  })
  if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
  userList = res.data.users
  total = res.data.total
  console.log(res)
}


// 监听 页码值 改变的事件
function handleCurrentChange(newPage) {
  queryInfo.pagenum = newPage
  getUserList()
}
</script>