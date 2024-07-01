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
        <div class="content">
          <div class="actions">
            <form class="actions__search">
              <input type="text" class="actions__search__input" placeholder="Tìm kiếm theo mã, họ tên" />
              <div class="actions__search__icon">
                <img src="../assets/icons/search.png" alt="search icon" />
              </div>
            </form>
            <div class="actions__group">
              <button class="actions__group__export-file">
                <img src="../assets/icons/export-file.png" alt="export icon" />
              </button>
              <button class="actions__group__refresh">
                <img src="../assets/icons/refresh.png" alt="refresh icon" />
              </button>
            </div>
          </div>
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
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 24px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

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
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 1px 1px #e0e0e0;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin: 12px;

  &__search {
    position: relative;

    &__input {
      padding: 0 12px;
      border: 2px solid #e0e0e0;
      border-radius: 4px;
      height: 36px;
    }

    &__icon {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      top: 50%;
      right: 0px;
      transform: translateY(-50%);
      pointer-events: none;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__group {
    display: flex;
    column-gap: 8px;

    &__export-file {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 20px;
        height: 20px;
      }
    }

    &__refresh {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
