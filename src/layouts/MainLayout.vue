<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import { ref } from 'vue'
const isSidebarCollapsed = ref(false)
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <div class="wrapper">
    <HeaderComponent @toggle-sidebar="toggleSidebar" />
    <div class="container">
      <SidebarComponent :collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar" />
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
