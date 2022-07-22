<template>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src="https://placeimg.com/260/400/arch" class="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <div class="text-3xl lg:text-5xl font-bold">关于我们</div>
        <p class="py-6">电脑医院隶属于浙江工商大学计计算机协会，旨在为在校师生提供免费、专业、便捷的IT技术支援活动</p>
        <button class="btn btn-primary mx-1" @click="smoothScrollTo('offlineActivity')">线下维修活动</button>
        <button class="btn btn-primary mx-1" @click="smoothScrollTo('socialService')">下社区</button>
        <button class="btn btn-primary mx-1" @click="smoothScrollTo('ourGroup')">对外交流群</button>
      </div>
    </div>
  </div>
  <div class="hero min-h-screen" id="offlineActivity">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src="../assets/image/Photo/waichang.jpeg" class="max-w-xs lg:max-w-xl rounded-lg shadow-2xl" />
      <div>
        <div class="text-3xl lg:text-5xl font-bold">线下维修活动</div>
        <div class="lg:text-2xl py-6">
          <div class="text-2xl lg:text-3xl mb-2 font-bold">
            师生之家值班活动
          </div>
          <div><div class="inline font-bold">地点：</div>师生之家17号窗口对面专场服务</div>
          <div class="flex">
            <div class="inline font-bold">时间：</div>
            <div class="inline">
              <div>星期三 13:30-16:00</div>
              <div>星期六 9:00-11:30、13:30-16:00</div>
            </div>
          </div>
        </div>
        <div class="lg:text-2xl py-6">
          <div class="text-2xl lg:text-3xl mb-2 font-bold">
            电脑医院外场服务
          </div>
          <div><div class="inline font-bold">地点：</div>行云广场/流水广场</div>
          <div>
            <div class="inline font-bold">时间：</div>
            <div class="inline">星期六 9:00-11:30、13:30-16:00</div>
          </div>
        </div>
        <div class="text-gray-600">* 具体活动信息请留意QQ对外群公告，如遇考试周、天气恶劣则视情况取消活动</div>
      </div>
    </div>
  </div>
  <div class="hero min-h-screen" id="socialService">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src="https://placeimg.com/260/400/arch" class="max-w-xs lg:max-w-x rounded-lg shadow-2xl" />
      <div class="px-6">
        <div class="text-3xl lg:text-5x font-bold">下社区活动</div>
      </div>
    </div>
  </div>
  <div class="hero min-h-screen" id="ourGroup">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div>
        <div class="text-3xl lg:text-5xl font-bold">电脑医院对外交流二群</div>
        <div class="lg:text-2xl py-6">电脑故障讨论，维修技术交流，欢迎你的加入！</div>
      </div>
      <img src="../assets/image/QRCode/QQdwq_2.png" class="max-w-xs lg:max-w-sm rounded-lg shadow-2xl" />
    </div>
  </div>
</template>

<script setup>
const smoothScrollTo = (id) => {
  // 获取DOM元素
  let target = document.querySelector(`#${ id }`);
  console.log("使页面滚动到指定锚点",target,id)
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth'
    })
  }
};
</script>