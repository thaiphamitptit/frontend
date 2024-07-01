<script setup></script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="sidebar">
        <ul class="sidebar-menu">
          <li class="sidebar-menu__item">
            <router-link class="sidebar-menu__action" to="/">
              <div class="sidebar-menu__action__icon">
                <img src="../assets/icons/home.png" alt="home icon" />
              </div>
              <span class="sidebar-menu__action__text">Trang chủ</span>
            </router-link>
          </li>
          <li class="sidebar-menu__item">
            <router-link class="sidebar-menu__action" to="/reports">
              <div class="sidebar-menu__action__icon">
                <img src="../assets/icons/report.png" alt="report icon" />
              </div>
              <span class="sidebar-menu__action__text">Báo cáo</span>
            </router-link>
          </li>
          <li class="sidebar-menu__item">
            <router-link class="sidebar-menu__action" to="/employees">
              <div class="sidebar-menu__action__icon">
                <img src="../assets/icons/employee.png" alt="employee icon" />
              </div>
              <span class="sidebar-menu__action__text">Nhân viên</span>
            </router-link>
          </li>
          <li class="sidebar-menu__item">
            <router-link class="sidebar-menu__action" to="/settings">
              <div class="sidebar-menu__action__icon">
                <img src="../assets/icons/setting.png" alt="setting icon" />
              </div>
              <span class="sidebar-menu__action__text">Cài đặt</span>
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
      background: #e0e0e0;
    }

    &:hover img {
      transform: scale(1.2);
    }

    .router-link-exact-active {
      background: #bdbdbd;
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
