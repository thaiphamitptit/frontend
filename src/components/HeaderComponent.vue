<script setup></script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="header-control">
          <button class="header-control__toggle-btn">
            <img src="../assets/icons/toggle.png" alt="toggle icon" />
          </button>
          <router-link to="/" class="header-control__logo-link">
            <img src="../assets/imgs/logo.png" alt="logo img" />
          </router-link>
        </div>
        <div class="header-profile">
          <div class="header-profile__info">
            <div class="header-profile__avatar">
              <img src="../assets/imgs/avatar.jpg" alt="avatar img" />
            </div>
            <span class="header-profile__username">Đỗ Thu Hà</span>
          </div>
          <button class="header-profile__option-btn">
            <img src="../assets/icons/option.png" alt="option icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 48px;
  display: flex;
  box-shadow: 0 1px 1px #e0e0e0;
}
.container {
  width: 1280px;
  height: 100%;
  display: flex;
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-control {
  display: flex;
  align-items: center;
  margin: 0 12px;
  padding: 4px;
  column-gap: 12px;

  &__toggle-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }

    img {
      transition: transform 0.3s ease;
      width: 24px;
      height: 24px;
    }
  }

  &__logo-link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;

    img {
      height: 32px;
    }
  }
}
.header-profile {
  display: flex;
  align-items: center;
  margin: 0 12px;
  padding: 4px;
  column-gap: 12px;

  &__info {
    display: flex;
    align-items: center;
    column-gap: 12px;
    cursor: pointer;
  }

  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;

    img {
      width: 32px;
      height: 32px;
      border: 1px solid #e0e0e0;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 1px 1px #e0e0e0;
    }
  }

  &__username {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__option-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border: none;
    background: none;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
