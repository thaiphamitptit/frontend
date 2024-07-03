<script setup>
import homeIcon from '../assets/icons/home.png'
import reportIcon from '../assets/icons/report.png'
import employeeIcon from '../assets/icons/employee.png'
import settingIcon from '../assets/icons/setting.png'

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
    <div class="container">
      <div class="sidebar">
        <ul class="sidebar-menu">
          <li v-for="sidebarItem in sidebarItems" :key="sidebarItem.id" class="sidebar-menu__item">
            <router-link class="sidebar-menu__action" :to="sidebarItem.route">
              <div class="sidebar-menu__action__icon">
                <img :src="sidebarItem.icon" :alt="sidebarItem.alt" />
              </div>
              <span class="sidebar-menu__action__text">{{ sidebarItem.text }}</span>
            </router-link>
          </li>
        </ul>
        <button class="sidebar-hide-btn">
          <div class="sidebar-hide-btn__icon"><img src="../assets/icons/arrow-left.svg" alt="arrow icon" /></div>
          <span class="sidebar-hide-btn__text">Thu gọn</span>
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
    }

    &:hover img {
      transform: scale(1.2);
    }

    .router-link-exact-active {
      background: #a0b1ba;
    }
  }

  &__action {
    display: flex;
    align-items: center;

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
}
.sidebar-hide-btn {
  display: flex;
  align-items: center;
  border-top: 1px solid #e0e0e0;
  background: #ffffff;
  cursor: pointer;

  &:hover img {
    transform: scale(1.2);
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
