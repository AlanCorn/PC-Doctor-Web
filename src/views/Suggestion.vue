<template>
  <div class="flex items-center flex-col">
    <div class="hero min-h-screen">
      <div class="hero-overlay bg-opacity-10 gradient-title">意见</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Suggestion"
}
</script>

<style scoped>
.gradient-title {
  font-size: 72px;
  background: rgb(238, 174, 202);
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 195, 233, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>