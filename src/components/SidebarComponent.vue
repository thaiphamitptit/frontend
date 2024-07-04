<script setup>
import { defineProps, defineEmits } from 'vue'
import homeIcon from '../assets/icons/home.png'
import reportIcon from '../assets/icons/report.png'
import employeeIcon from '../assets/icons/employee.png'
import settingIcon from '../assets/icons/setting.png'
import arrowLeftIcon from '../assets/icons/arrow-left.svg'
import arrowRightIcon from '../assets/icons/arrow-right.svg'
defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['toggle-sidebar'])
const toggleSidebar = () => {
  emit('toggle-sidebar')
}
const sidebarItems = [
  {
    id: 1,
    route: '/',
    icon: homeIcon,
    text: 'Trang chủ',
    alt: 'home icon'
  },
  {
    id: 2,
    route: '/reports',
    icon: reportIcon,
    text: 'Báo cáo',
    alt: 'report icon'
  },
  {
    id: 3,
    route: '/employees',
    icon: employeeIcon,
    text: 'Nhân viên',
    alt: 'employee icon'
  },
  {
    id: 4,
    route: '/settings',
    icon: settingIcon,
    text: 'Cài đặt',
    alt: 'setting icon'
  }
]
</script>

<template>
  <div class="wrapper">
    <div :class="['container', { collapsed: collapsed }]">
      <div class="sidebar">
        <ul class="sidebar-menu">
          <li v-for="sidebarItem in sidebarItems" :key="sidebarItem.id" class="sidebar-menu__item">
            <router-link class="sidebar-menu__link" :to="sidebarItem.route">
              <div class="sidebar-menu__icon">
                <img :src="sidebarItem.icon" :alt="sidebarItem.alt" />
              </div>
              <span v-if="!collapsed" class="sidebar-menu__text">{{ sidebarItem.text }}</span>
            </router-link>
          </li>
        </ul>
        <button class="collapse-btn" @click="toggleSidebar">
          <div class="collapse-btn__icon">
            <img :src="collapsed ? arrowRightIcon : arrowLeftIcon" alt="arrow icon" />
          </div>
          <span v-if="!collapsed" class="collapse-btn__text">Thu gọn</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: calc(100vh - 48px);
  background: #ffffff;
  box-shadow: 1px 1px 1px #e0e0e0;
}
.container {
  width: 200px;
  height: 100%;
  display: flex;
}
.collapsed {
  width: 100%;
}
.sidebar {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sidebar-menu {
  margin: 12px;

  &__item {
    margin: 4px 0;
    border-radius: 8px;
    overflow: hidden;

    &:hover {
      background: #dfe5e8;

      img {
        transform: scale(1.2);
      }
    }

    .router-link-exact-active {
      background: #a0b1ba;
    }
  }

  &__link {
    display: flex;
    align-items: center;
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    margin: 6px 8px;

    img {
      transition: transform 0.3s ease;
      width: 24px;
      height: 24px;
    }
  }
}
.collapse-btn {
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-top: 1px solid #e0e0e0;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    background: #dfe5e8;

    img {
      transform: scale(1.2);
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    margin: 6px 8px;

    img {
      transition: transform 0.3s ease;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
