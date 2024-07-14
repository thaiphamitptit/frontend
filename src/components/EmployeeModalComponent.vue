<script setup>
import { ref, onMounted, watch } from 'vue'
import employeeApi from '@/apis/employee.api'
import departmentApi from '@/apis/department.api'
import positionApi from '@/apis/position.api'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  employee: {
    type: Object,
    default: () => ({
      EmployeeCode: '',
      FullName: '',
      DateOfBirth: new Date().toISOString().split('T')[0],
      Gender: 'Nữ',
      IdentityNumber: '',
      IdentityDate: new Date().toISOString().split('T')[0],
      IdentityPlace: '',
      Address: '',
      PhoneNumber: '',
      TelephoneNumber: '',
      Email: '',
      BankAccount: '',
      BankName: '',
      Branch: ''
    })
  }
})
const emit = defineEmits(['close-employee-modal', 'show-toast', 'employee-updated'])
const employeeData = ref({})
const departments = ref([])
const positions = ref([])
const genders = ref([
  { id: 0, name: 'Nam' },
  { id: 1, name: 'Nữ' },
  { id: 2, name: 'Khác' }
])

const fetchDepartment = async () => {
  try {
    const response = await departmentApi.getDepartments()
    departments.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const fetchPosition = async () => {
  try {
    const response = await positionApi.getPositions()
    positions.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const resetEmployeeModal = () => {
  if (props.mode === 'add') {
    employeeData.value = {
      EmployeeCode: '',
      FullName: '',
      DateOfBirth: new Date().toISOString().split('T')[0],
      Gender: 0,
      IdentityNumber: '',
      IdentityDate: new Date().toISOString().split('T')[0],
      IdentityPlace: '',
      Address: '',
      PhoneNumber: '',
      TelephoneNumber: '',
      Email: '',
      BankAccount: '',
      BankName: '',
      Branch: ''
    }
  } else {
    employeeData.value = {
      ...props.employee,
      DateOfBirth: props.employee.DateOfBirth.split('T')[0],
      IdentityDate: props.employee.IdentityDate.split('T')[0]
    }
  }
}

onMounted(() => {
  fetchDepartment()
  fetchPosition()
  resetEmployeeModal()
})

watch(() => props.mode, resetEmployeeModal)
watch(() => props.employee, resetEmployeeModal, { immediate: true })

const closeEmployeeModal = () => {
  resetEmployeeModal()
  emit('close-employee-modal')
}

const showToast = (toastType, toastDesc) => {
  emit('show-toast', toastType, toastDesc)
}

const handleSubmit = async () => {
  if (props.mode === 'add') {
    await addEmployee(employeeData.value)
  } else {
    await updateEmployee(props.employee.EmployeeId, employeeData.value)
  }
  emit('employee-updated')
  closeEmployeeModal()
}

const addEmployee = async (body) => {
  try {
    await employeeApi.addEmployee(body)
    showToast('success', 'Nhân viên đã được thêm vào hệ thống')
  } catch (err) {
    console.error(err)
    showToast('error', 'Đã có lỗi xảy ra, vui lòng thử lại')
  }
}

const updateEmployee = async (employeeId, body) => {
  try {
    await employeeApi.updateEmployee(employeeId, body)
    showToast('success', 'Nhân viên đã được cập nhật vào hệ thống')
  } catch (err) {
    console.error(err)
    showToast('error', 'Đã có lỗi xảy ra, vui lòng thử lại')
  }
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
                <label for="employeeCode">Mã nhân viên</label>
                <input
                  id="employeeCode"
                  v-model="employeeData.EmployeeCode"
                  name="employeeCode"
                  type="text"
                  autofocus
                />
              </div>
              <div class="form-group">
                <label for="fullName">Họ và tên</label>
                <input id="fullName" v-model="employeeData.FullName" name="fullName" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="dateOfBirth">Ngày sinh</label>
                <input id="dateOfBirth" v-model="employeeData.DateOfBirth" name="dateOfBirth" type="date" />
              </div>
              <div class="form-group">
                <label for="gender">Giới tính</label>
                <div class="input-group">
                  <div v-for="gender in genders" :key="gender.id" class="input-group__item">
                    <input
                      :id="gender.id"
                      v-model="employeeData.Gender"
                      :value="gender.id"
                      name="gender"
                      type="radio"
                    />
                    <label for="male">{{ gender.name }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="positionId">Vị trí</label>
                <select id="positionId" v-model="employeeData.PositionId" name="positionId" class="custom-select">
                  <option v-for="position in positions" :key="position.PositionId" :value="position.PositionId">
                    {{ position.PositionName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="identityNumber">CMTND</label>
                <input id="identityNumber" v-model="employeeData.IdentityNumber" name="identityNumber" type="text" />
              </div>
              <div class="form-group">
                <label for="identityDate">Ngày cấp</label>
                <input id="identityDate" v-model="employeeData.IdentityDate" name="identityDate" type="date" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="departmentId">Phòng ban</label>
                <select id="departmentId" v-model="employeeData.DepartmentId" name="departmentId" class="custom-select">
                  <option
                    v-for="department in departments"
                    :key="department.DepartmentId"
                    :value="department.DepartmentId"
                  >
                    {{ department.DepartmentName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="identityPlace">Nơi cấp</label>
                <input id="identityPlace" v-model="employeeData.IdentityPlace" name="identityPlace" type="text" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input id="address" v-model="employeeData.Address" name="address" type="text" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="phoneNumber">ĐT Di động</label>
                <input id="phoneNumber" v-model="employeeData.PhoneNumber" name="phoneNumber" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="telephone">ĐT Cố định</label>
                <input id="telephone" v-model="employeeData.TelephoneNumber" name="telephone" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" v-model="employeeData.Email" name="email" type="email" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="bankAccount">Tài khoản ngân hàng</label>
                <input id="bankAccount" v-model="employeeData.BankAccount" name="bankAccount" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="bankName">Tên ngân hàng</label>
                <input id="bankName" v-model="employeeData.BankName" name="bankName" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="branch">Chi nhánh</label>
                <input id="branch" v-model="employeeData.Branch" name="branch" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <div class="cta-group">
            <button type="button" class="cta-group__clear-btn" @click="resetEmployeeModal">Huỷ</button>
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
  padding: 0 8px;
  cursor: pointer;
}

input[type='radio'] {
  width: 16px;
  height: 16px;
  border: 2px solid #e0e0e0;
  cursor: pointer;
}
</style>
