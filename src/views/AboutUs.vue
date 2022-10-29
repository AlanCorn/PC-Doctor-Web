<template>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src="../assets/image/Icon/QQ_Image_1659623849364.jpg" class="max-w-xs rounded-lg shadow-2xl " />
      <div>
        <div class="title-about">关于我们</div>
        <p class="my-3 lg:text-2xl"><span
            class="font-bold text-xl lg:text-3xl">X计算机协会</span>成立于1995年，是一个面向全校、以营造校园科技文化氛围，推广计算机应用操作为宗旨的学术科技类社团。经过长达27年的发展和探索，计协从成立初的稚嫩，走向今天的成熟。
        </p>
        <p class="mb-5 lg:text-2xl"><span
            class="font-bold text-xl lg:text-3xl">电脑医院</span>隶属于浙江工商大学计计算机协会，旨在为在校师生提供免费、专业、便捷的IT技术支援活动
        </p>
        <button class="btn btn-sm btn-primary mx-1" @click="smoothScrollTo('offlineActivity')">线下维修活动</button>
        <button class="btn btn-sm btn-primary mx-1" @click="smoothScrollTo('socialService')">下社区活动</button>
        <button class="btn btn-sm btn-primary mx-1" @click="smoothScrollTo('ourGroup')">对外交流群</button>
      </div>
    </div>
  </div>
  <div class="hero min-h-screen" id="offlineActivity">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src="../assets/image/Photo/waichang.jpeg" class="max-w-xs lg:max-w-xl rounded-lg shadow-2xl" />
      <div>
        <div class="title-about">线下维修活动</div>
        <div class="lg:text-2xl py-6">
          <div class="text-2xl lg:text-3xl mb-2 font-bold">
            师生之家值班活动
          </div>
          <div>
            <div class="inline font-bold">地点：</div>
            师生之家17号窗口对面专场服务
          </div>
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
          <div>
            <div class="inline font-bold">地点：</div>
            行云广场/流水广场
          </div>
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
      <img src="../assets/image/Photo/xiashequ.jpg" class="max-w-xs lg:max-w-md rounded-lg shadow-2xl" />
      <div class="px-6 lg:mr-10">
        <div class="title-about">下社区活动</div>
        <p class="lg:text-2xl my-5">X计算机协会通过青年志愿队与周边社区合作，定期前往社区进行公益维修，科普电脑知识的公益活动，为社区居民提供便利，获得一致好评。
        </p>
      </div>
    </div>
  </div>
  <div class="hero min-h-screen" id="ourGroup">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div>
        <div class="text-3xl lg:text-5xl font-bold">电脑医院对外交流二群</div>
        <div class="lg:text-2xl py-6">线上答疑，电脑故障讨论，维修技术交流，欢迎你的加入！</div>
      </div>
      <img src="../assets/image/QRCode/QQdwq_2.png" class="max-w-xs lg:max-w-sm rounded-lg shadow-2xl" />
    </div>
  </div>
</template>

<script setup>
const smoothScrollTo = (id) => {
  // 获取DOM元素
  let target = document.querySelector(`#${id}`);
  console.log("使页面滚动到指定锚点", target, id)
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth'
    })
  }
};
</script>

<style scoped>
.title-about {
  @apply text-3xl text-primary lg: text-5xl font-bold mt-20
}
</style>