<script setup></script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="employees">
        <div class="header">
          <h1 class="header__title">Quản lý Nhân viên</h1>
          <router-link to="#" class="header__add-employee-btn">
            <div class="header__add-employee-btn__icon"><img src="../assets/icons/add.png" alt="add icon" /></div>
            <span class="header__add-employee-btn__text">Thêm mới</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  background: #e0e0e0;
  height: calc(100vh - 48px);
}
.container {
  width: 100%;
  height: 100%;
}
.employees {
  margin: 24px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    margin: 0;
    font-size: 2.5rem;
  }

  &__add-employee-btn {
    min-width: 80px;
    height: 36px;
    display: flex;
    align-items: center;
    background: #4d646f;
    border-radius: 4px;
    cursor: pointer;
  }

  &__add-employee-btn__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 12px;

    img {
      width: 20px;
      height: 20px;
    }
  }

  &__add-employee-btn__text {
    color: #ffffff;
    padding: 4px;
    margin-right: 12px;
  }
}
</style>
