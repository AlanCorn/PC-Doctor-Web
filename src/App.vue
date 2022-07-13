<script setup>
</script>

<template>
  <router-view></router-view>
  <notifications position="top center" classes="customNotify"/>
</template>

<style lang="scss">
.customNotify {
  // styling
  margin: 10px 5px 0 5px;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;
  // style for title line
  .notification-title {
    font-size: 18px;
    font-weight: bold;
  }

  // style for content
  .notification-content {
    font-size: 15px;
  }
  // default (blue)
  background: #44a4fc;
  border-left: 5px solid #187fe7;
  border-radius: 0.25rem;

  // types (green, amber, red)
  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
