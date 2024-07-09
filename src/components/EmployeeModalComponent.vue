<script setup>
import { watch, ref } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  employee: {
    type: Object,
    required: true
  },
  departments: {
    type: Array,
    required: true
  },
  positions: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['close-employee-modal'])
const employeeData = ref({})

const closeEmployeeModal = () => {
  emit('close-employee-modal')
}

watch(
  () => props.employee,
  (newEmployee) => {
    employeeData.value = { ...newEmployee }
  },
  { immediate: true }
)

const handleSubmit = () => {
  closeEmployeeModal()
}
</script>

<template>
  <div v-if="props.visible" class="wrapper" @click.self="closeEmployeeModal">
    <div class="container @click.stop">
      <form class="employee" @submit.prevent="handleSubmit">
        <div class="header">
          <h1 class="title">Thông tin nhân viên</h1>
          <button type="button" class="cancel-btn" @click="closeEmployeeModal">
            <img src="../assets/icons/close.png" alt="close icon" />
          </button>
        </div>
        <div class="form-control">
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="employee-id">Mã nhân viên</label>
                <input id="employee-id" v-model="employeeData.id" type="text" autofocus />
              </div>
              <div class="form-group">
                <label for="employee-name">Họ và tên</label>
                <input id="employee-name" v-model="employeeData.name" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-dob">Ngày sinh</label>
                <input id="employee-dob" v-model="employeeData.dob" type="date" />
              </div>
              <div class="form-group">
                <label for="employee-gender">Giới tính</label>
                <div class="input-group">
                  <div class="input-group__item">
                    <input id="male" name="gender" value="Nam" type="radio" />
                    <label for="male">Nam</label>
                  </div>
                  <div class="input-group__item">
                    <input id="female" name="gender" value="Nữ" type="radio" />
                    <label for="female">Nữ</label>
                  </div>
                  <div class="input-group__item">
                    <input id="other" name="gender" value="Khác" type="radio" />
                    <label for="other">Khác</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="employee-position">Vị trí</label>
                <select id="employee-position" name="employee-position" class="custom-select">
                  <option v-for="position in props.positions" :key="position.id" :value="position.name">
                    {{ position.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-cid">CMTND</label>
                <input id="employee-cid" type="text" />
              </div>
              <div class="form-group">
                <label for="employee-dor">Ngày cấp</label>
                <input id="employee-dor" type="date" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="employee-department">Phòng ban</label>
                <select id="employee-department" name="employee-department" class="custom-select">
                  <option v-for="department in props.departments" :key="department.id" :value="department.name">
                    {{ department.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-por">Nơi cấp</label>
                <input id="employee-por" type="text" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="employee-address">Địa chỉ</label>
                <input id="employee-address" v-model="employeeData.address" type="text" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="employee-phone">ĐT Di động</label>
                <input id="employee-phone" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-telephone">ĐT Cố định</label>
                <input id="employee-telephone" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-email">Email</label>
                <input
                  id="employee-email"
                  v-model="employeeData.email"
                  type="email"
                  placeholder="VD: dothuha.ftu@gmail.com"
                />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="employee-bank-account">Tài khoản ngân hàng</label>
                <input id="employee-bank-account" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-bank-name">Tên ngân hàng</label>
                <input id="employee-bank-name" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-branch">Chi nhánh</label>
                <input id="employee-branch" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <div class="cta-group">
            <button type="button" class="cta-group__clear-btn">Huỷ</button>
            <button type="submit" class="cta-group__submit-btn">Lưu</button>
          </div>
        </div>
      </form>
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
}
.container {
  width: 100%;
  max-width: 1280px;
  background: #ffffff;
  border-radius: 4px;
}
.employee {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 32px;
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  .title {
    margin: 0;
    font-size: 3rem;
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
      width: 32px;
      height: 32px;
    }
  }
}
.form-control {
  width: 100%;
  margin: 0 32px;

  .form-row {
    display: flex;
    margin: 24px 0;
    column-gap: 12px;

    .form-group {
      width: 100%;

      .input-group {
        height: 36px;
        display: flex;
        align-items: center;
        margin: 8px 12px;
        column-gap: 24px;

        &__item {
          display: flex;
          align-items: center;
          column-gap: 8px;

          label {
            cursor: pointer;
          }
        }
      }
    }

    .form-col {
      width: 100%;
      display: flex;
      column-gap: 12px;
    }
  }
}
.actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;

  .cta-group {
    display: flex;
    column-gap: 12px;

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
input:not([type='radio']),
select {
  width: 100%;
  height: 36px;
  margin-top: 8px;
  padding: 0 12px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
}
select {
  cursor: pointer;
}
input[type='radio'] {
  width: 16px;
  height: 16px;
  border: 2px solid #e0e0e0;
  cursor: pointer;
}
</style>
