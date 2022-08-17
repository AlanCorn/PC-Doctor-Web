<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div id="app">
      <!--方法一-->
      <transition
          appear-active-class="animate__fadeIn"
          leave-active-class="animate__fadeOut"
      >
        <h1 v-show="visible" class="animate__animated">Animate.css</h1>
      </transition>
      <!--方法二-->
      <transition
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutLeft"
      >
        <h1 v-show="visible">Animate.css</h1>
      </transition>
      <!--方法三-->
      <transition-group
          enter-active-class="animate__fadeInRight"
          leave-active-class="animate__fadeOutRight"
      >
        <h1 v-show="visible" class="animate__animated" :key="1">Animate.css</h1>
        <h2 v-show="visible" class="animate__animated" :key="2">Just-add-water CSS animations</h2>
      </transition-group>
    </div>
    <button class="btn" @click="toggleVisible">transition</button>

    <div class="text-5xl">todo:帮助</div>
  </div>
</template>

<script>
export default {
  name: "Help",
  data() {
    return {
      visible: true
    }
  },
  computed: {
    computedCount() {
      return this.count * 2
    }
  },
  methods: {
    toggleVisible () {
      this.visible = !this.visible
    }
  }
}
</script>