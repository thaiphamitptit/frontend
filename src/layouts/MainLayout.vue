<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
</script>

<template>
  <div class="wrapper">
    <HeaderComponent />
    <div class="container">
      <SidebarComponent />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  width: 100%;
  display: flex;
}
.content {
  flex-grow: 1;
}
</style>
