<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  employee: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['close-employee-dialog'])

const closeEmployeeDialog = () => {
  emit('close-employee-dialog')
}
</script>

<template>
  <div v-if="props.visible" class="wrapper" @click.self="closeEmployeeDialog">
    <div class="container" @click.stop>
      <div class="dialog">
        <div class="header">
          <h1 class="title">Xoá nhân viên</h1>
          <button class="cancel-btn" @click="closeEmployeeDialog">
            <img src="../assets/icons/close.png" alt="close icon" />
          </button>
        </div>
        <span class="desc">{{ `Bạn có chắc chắn muốn xóa nhân viên ${props.employee.id} không ?` }}</span>
        <div class="actions">
          <div class="cta-group">
            <button class="cta-group__clear-btn" @click="closeEmployeeDialog">Không</button>
            <button class="cta-group__submit-btn">Có</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  display: none;
}
.container {
  min-width: 450px;
  max-width: 650px;
  background: #ffffff;
  border-radius: 4px;
}
.dialog {
  display: flex;
  flex-direction: column;
  margin: 24px;
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    margin: 0;
    font-size: 2rem;
  }

  .cancel-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    cursor: pointer;

    &:hover img {
      transform: scale(1.2);
    }

    img {
      transition: transform 0.3s ease;
      width: 24px;
      height: 24px;
    }
  }
}
.desc {
  margin: 24px 0;
}
.actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;

  .cta-group {
    display: flex;
    column-gap: 8px;

    &__clear-btn,
    &__submit-btn {
      min-width: 80px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 16px;
      color: #ffffff;
      background: #4d646f;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &__clear-btn {
      border: 2px solid #e0e0e0;
      color: #000000;
      background: #ffffff;
    }
  }
}
</style>
