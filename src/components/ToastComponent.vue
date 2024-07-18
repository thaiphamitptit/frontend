<script setup>
import { ref, watch } from 'vue'
import infoIcon from '../assets/icons/info.png'
import successIcon from '../assets/icons/success.png'
import warningIcon from '../assets/icons/warning.png'
import errorIcon from '../assets/icons/error.png'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
    default: false
  },
  type: {
    type: String,
    default: 'info'
  },
  desc: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['close-toast'])
const animation = ref('')
const toasts = {
  info: {
    message: 'Thông tin!',
    icon: infoIcon,
    alt: 'info icon'
  },
  success: {
    message: 'Thành công!',
    icon: successIcon,
    alt: 'success icon'
  },
  warning: {
    message: 'Cảnh báo!',
    icon: warningIcon,
    alt: 'warning icon'
  },
  error: {
    message: 'Lỗi!',
    icon: errorIcon,
    alt: 'error icon'
  }
}

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      animation.value = 'slide-in'
    } else {
      animation.value = 'slide-out'
    }
  }
)

const closeToast = () => {
  emit('close-toast')
}
</script>

<template>
  <div v-if="props.visible" :class="['wrapper', animation]">
    <div class="container">
      <div class="toast">
        <div class="toast__icon"><img :src="toasts[props.type].icon" :alt="toasts[props.type].alt" /></div>
        <span class="toast__messsage" :class="props.type">{{ toasts[props.type].message }}</span>
        <span class="toast__desc">{{ props.desc }}</span>
      </div>
      <button class="close-btn" @click="closeToast">
        <img src="../assets/icons/close.png" alt="close icon" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  top: 24px;
  right: 24px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  z-index: 10;
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;

  &.slide-in {
    animation: slideIn 0.3s forwards;
  }

  &.slide-out {
    animation: slideOut 0.3s forwards;
  }
}

.container {
  min-width: 450px;
  max-width: 650px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px;
  padding: 8px 0;
}

.toast {
  display: flex;
  align-items: center;
  column-gap: 8px;

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    img {
      width: 24px;
      height: 24px;
    }
  }
}

.close-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: #ffffff;
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

.info {
  color: #0062cc;
}

.success {
  color: #409330;
}

.warning {
  color: #cc7a00;
}

.error {
  color: #b80000;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
