<template>
	<!-- 为管理员设置专属的navbar(部分拷贝自views/index.vue) -->
	<div class="w-full navbar shadow-xl bg-blue-300">
		<div class="flex-none lg:hidden">
			<label for="my-drawer-2" class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-6 h-6 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				</svg>
			</label>
		</div>
		<div class="flex-1 px-2 mx-2">
			<router-link to="/admin" class="btn btn-ghost normal-case text-xl"
				>PC-Doctor 管理员后台</router-link
			>
		</div>
		<div class="flex-none hidden lg:block">
			<ul class="menu menu-horizontal">
				<!-- Navbar menu content here -->
				<li class="rounded-md">
					<router-link to="/">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						前台
					</router-link>
				</li>
			</ul>
		</div>
	</div>
	<!-- 页面主体部分，有一个侧边菜单栏 -->
	<div class="drawer drawer-mobile">
		<input v-model="pageInfo.ifShowDrawerSide" id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<!-- Page content here -->
      <router-view v-slot="{Component}">
        <transition enter-active-class="animate__animated animate__fadeIn">
          <component :is="Component" />
        </transition>
      </router-view>
		</div>
		<div class="drawer-side">
			<label for="my-drawer-2" class="drawer-overlay"></label>
			<ul class="menu p-4 overflow-y-auto w-72 bg-slate-200 text-base-content">
				<li><a @click="pushRouter('/dashboard')">面板</a></li>
				<li><a @click="pushRouter('/adminInfoEdit')">个人信息</a></li>
				<li><a @click="pushRouter('/adminGeneral')">通用(root)</a></li>
        <li><a>预约管理(root)</a></li>
        <!--        <li><router-link to="/adminDoctorMng">电医管理(root)</router-link></li>-->
        <li><a @click="pushRouter('/adminUserMng')">用户管理(root)</a></li>
        <li v-if="pageInfo.ifShowDrawerSide"><a @click="pushRouter('/')">回到前台</a>
        </li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const pageInfo = reactive({
  ifShowDrawerSide:false
})

const pushRouter = (path) => {
  router.push(path)
  pageInfo.ifShowDrawerSide = false
}
</script>
