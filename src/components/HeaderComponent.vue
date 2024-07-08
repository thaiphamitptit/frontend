<script setup>
const props = defineProps({
  branchs: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['toggle-sidebar'])

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="navbar">
          <button class="toggle-btn" @click="toggleSidebar">
            <img src="../assets/icons/toggle.png" alt="toggle icon" />
          </button>
          <router-link to="/" class="home-link">
            <img src="../assets/imgs/logo.png" alt="logo img" />
          </router-link>
          <select id="branch" name="branch" class="custom-select">
            <option v-for="branch in props.branchs" :key="branch.id" :value="branch">{{ branch.name }}</option>
          </select>
        </div>
        <div class="profile">
          <div class="info">
            <div class="avatar">
              <img src="../assets/imgs/avatar.jpg" alt="avatar img" />
            </div>
            <span class="username">Đỗ Thu Hà</span>
          </div>
          <button class="option-btn">
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
  width: 100%;
  height: 100%;
  display: flex;
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar {
  display: flex;
  align-items: center;
  margin: 0 12px;
  padding: 4px;
  column-gap: 12px;

  .toggle-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border: none;
    background: none;
    cursor: pointer;

    :hover {
      transform: scale(1.2);
    }

    img {
      transition: transform 0.3s ease;
      width: 24px;
      height: 24px;
    }
  }

  .home-link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;

    img {
      height: 32px;
    }
  }

  .custom-select {
    height: 36px;
    margin: 24px;
    cursor: pointer;
  }
}
.profile {
  display: flex;
  align-items: center;
  margin: 0 12px;
  padding: 4px;
  column-gap: 12px;

  .info {
    display: flex;
    align-items: center;
    column-gap: 12px;
    cursor: pointer;

    .avatar {
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

    .username {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .option-btn {
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
