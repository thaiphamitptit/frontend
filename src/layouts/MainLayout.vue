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

<style scoped></style>
