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
  display: flex;
  width: 100%;
  max-width: 1280px;
}
.content {
  flex-grow: 1;
}
</style>
