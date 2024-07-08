<script setup>
import homeIcon from '../assets/icons/home.png'
import reportIcon from '../assets/icons/report.png'
import employeeIcon from '../assets/icons/employee.png'
import settingIcon from '../assets/icons/setting.png'
import arrowLeftIcon from '../assets/icons/arrow-left.svg'
import arrowRightIcon from '../assets/icons/arrow-right.svg'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['toggle-sidebar'])
const sidebarItems = [
  {
    id: 1,
    route: '/',
    icon: homeIcon,
    text: 'Trang chủ',
    tooltip: 'Trang chủ',
    alt: 'home icon'
  },
  {
    id: 2,
    route: '/reports',
    icon: reportIcon,
    text: 'Báo cáo',
    tooltip: 'Báo cáo',
    alt: 'report icon'
  },
  {
    id: 3,
    route: '/employees',
    icon: employeeIcon,
    text: 'Nhân viên',
    tooltip: 'Nhân viên',
    alt: 'employee icon'
  },
  {
    id: 4,
    route: '/settings',
    icon: settingIcon,
    text: 'Cài đặt',
    tooltip: 'Cài đặt',
    alt: 'setting icon'
  }
]

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>

<template>
  <div class="wrapper">
    <div :class="['container', { collapsed: props.collapsed }]">
      <div class="sidebar">
        <ul class="sidebar-menu">
          <li v-for="sidebarItem in sidebarItems" :key="sidebarItem.id" class="sidebar-menu__item">
            <router-link class="sidebar-menu__link" :to="sidebarItem.route">
              <div class="sidebar-menu__icon">
                <img :src="sidebarItem.icon" :alt="sidebarItem.alt" />
              </div>
              <span v-if="!props.collapsed" class="sidebar-menu__text">{{ sidebarItem.text }}</span>
            </router-link>
            <div v-if="props.collapsed" class="sidebar-menu__tooltip">{{ sidebarItem.tooltip }}</div>
          </li>
        </ul>
        <button class="collapse-btn" @click="toggleSidebar">
          <div class="collapse-btn__icon">
            <img :src="props.collapsed ? arrowRightIcon : arrowLeftIcon" alt="arrow icon" />
          </div>
          <span v-if="!props.collapsed" class="collapse-btn__text">Thu gọn</span>
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
    position: relative;
    margin: 4px 0;
    border-radius: 4px;

    &:hover {
      background: #dfe5e8;

      img {
        transform: scale(1.2);
      }

      .sidebar-menu__tooltip {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .router-link-exact-active {
      background: #a0b1ba;
      border-radius: 4px;
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

  &__tooltip {
    position: absolute;
    display: none;
    top: 50%;
    left: calc(100% + 16px);
    transform: translateY(-50%);
    background: #a0b1ba;
    padding: 8px 12px;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 10;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
      border-width: 4px;
      border-style: solid;
      border-color: transparent #a0b1ba transparent transparent;
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
