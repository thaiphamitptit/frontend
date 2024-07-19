<script setup>
import { ref, onMounted, watch } from 'vue'
import employeeApi from '@/apis/employee.api'
import departmentApi from '@/apis/department.api'
import positionApi from '@/apis/position.api'
import { fieldValidator, formValidator } from '@/utils/validator'

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
    default: () => ({})
  },
  employees: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['close-employee-modal', 'show-toast', 'employee-updated'])
const formData = ref({})
const departments = ref([])
const positions = ref([])
const employeeCode = ref('')
const genders = ref([
  { id: 0, name: 'Nam' },
  { id: 1, name: 'Nữ' },
  { id: 2, name: 'Khác' }
])
const errors = ref({})
const isFormValid = ref(false)
const formRules = ref({
  EmployeeCode: [
    {
      ruleName: 'required',
      errorMessage: 'Mã nhân viên không được để trống'
    },
    {
      ruleName: 'isUnique',
      errorMessage: 'Mã nhân viên đã tồn tại',
      arrayValues: props.employees.map((employee) => employee.EmployeeCode)
    }
  ],
  FullName: [
    {
      ruleName: 'required',
      errorMessage: 'Họ tên không được để trống'
    }
  ],
  DateOfBirth: [
    {
      ruleName: 'isDateValid',
      errorMessage: 'Ngày sinh không hợp lệ'
    }
  ],
  IdentityNumber: [
    {
      ruleName: 'required',
      errorMessage: 'Số CMTND không được để trống'
    }
  ],
  IdentityDate: [
    {
      ruleName: 'isDateValid',
      errorMessage: 'Ngày cấp CMTND không hợp lệ'
    }
  ],
  Email: [
    {
      ruleName: 'required',
      errorMessage: 'Email không được để trống'
    },
    {
      ruleName: 'isEmail',
      errorMessage: 'Email không hợp lệ'
    }
  ],
  PhoneNumber: [
    {
      ruleName: 'required',
      errorMessage: 'Số điện thoại không được để trống'
    }
  ]
})

const createNewEmployeeCode = async () => {
  try {
    const response = await employeeApi.createNewEmployeeCode()
    employeeCode.value = response.data
  } catch (err) {
    console.log(err)
  }
}

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

const resetEmployeeModal = async () => {
  if (props.mode === 'add') {
    await createNewEmployeeCode()
    formData.value = {
      EmployeeCode: employeeCode.value,
      FullName: '',
      DateOfBirth: null,
      Gender: 0,
      IdentityNumber: '',
      IdentityDate: null,
      IdentityPlace: '',
      Address: '',
      PhoneNumber: ''
    }
  } else {
    formData.value = {
      ...props.employee,
      DateOfBirth: props.employee.DateOfBirth ? props.employee.DateOfBirth.split('T')[0] : null,
      IdentityDate: props.employee.IdentityDate ? props.employee.IdentityDate.split('T')[0] : null
    }
  }
  errors.value = {}
  isFormValid.value = false
}

const getEmployeeCodes = () => {
  formRules.value.EmployeeCode[1].arrayValues = props.employees.map((employee) => employee.EmployeeCode)
}

onMounted(() => {
  createNewEmployeeCode()
  resetEmployeeModal()
  fetchDepartment()
  fetchPosition()
})

watch(() => props.mode, resetEmployeeModal)
watch(() => props.employee, resetEmployeeModal, { immediate: true })
watch(() => props.employees, getEmployeeCodes, { immediate: true })
watch(() => props.employees, createNewEmployeeCode, { immediate: true })

const closeEmployeeModal = () => {
  resetEmployeeModal()
  emit('close-employee-modal')
}

const showToast = (toastType, toastDesc) => {
  emit('show-toast', toastType, toastDesc)
}

const handleBlur = (field) => {
  errors.value[field] = fieldValidator(formData.value[field], formRules.value[field])
}

const handleSubmit = async () => {
  errors.value = { ...formValidator(formData.value, formRules.value) }
  if (!Object.keys(errors.value).length) {
    isFormValid.value = true
  }
  if (isFormValid.value) {
    if (props.mode === 'add') {
      await addEmployee(formData.value)
    } else {
      await updateEmployee(props.employee.EmployeeId, formData.value)
    }
    emit('employee-updated')
    closeEmployeeModal()
  }
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
                <span class="icon">*</span>
                <input
                  id="employeeCode"
                  v-model="formData.EmployeeCode"
                  :class="[{ error: errors.EmployeeCode }, { valid: !errors.EmployeeCode && formData.EmployeeCode }]"
                  name="employeeCode"
                  type="text"
                  autofocus
                  @blur="handleBlur('EmployeeCode')"
                />
                <span class="error-message">{{ errors.EmployeeCode }}</span>
              </div>
              <div class="form-group">
                <label for="fullName">Họ và tên</label>
                <span class="icon">*</span>
                <input
                  id="fullName"
                  v-model="formData.FullName"
                  :class="[{ error: errors.FullName }, { valid: !errors.FullName && formData.FullName }]"
                  name="fullName"
                  type="text"
                  @blur="handleBlur('FullName')"
                />
                <span v-show="errors.FullName" class="error-message">{{ errors.FullName }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="dateOfBirth">Ngày sinh</label>
                <input
                  id="dateOfBirth"
                  v-model="formData.DateOfBirth"
                  :class="[{ error: errors.DateOfBirth }, { valid: !errors.DateOfBirth && formData.DateOfBirth }]"
                  name="dateOfBirth"
                  type="date"
                  @blur="handleBlur('DateOfBirth')"
                />
                <span v-show="errors.DateOfBirth" class="error-message">{{ errors.DateOfBirth }}</span>
              </div>
              <div class="form-group">
                <label for="gender">Giới tính</label>
                <div class="input-group">
                  <div v-for="gender in genders" :key="gender.id" class="input-group__item">
                    <input :id="gender.id" v-model="formData.Gender" :value="gender.id" name="gender" type="radio" />
                    <label :for="gender.id">{{ gender.name }}</label>
                  </div>
                </div>
                <span v-show="errors.Gender" class="error-message">{{ errors.Gender }}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="positionId">Vị trí</label>
                <select id="positionId" v-model="formData.PositionId" name="positionId" class="custom-select">
                  <option v-for="position in positions" :key="position.PositionId" :value="position.PositionId">
                    {{ position.PositionName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="identityNumber">CMTND</label>
                <span class="icon">*</span>
                <input
                  id="identityNumber"
                  v-model="formData.IdentityNumber"
                  :class="[
                    { error: errors.IdentityNumber },
                    { valid: !errors.IdentityNumber && formData.IdentityNumber }
                  ]"
                  name="identityNumber"
                  type="text"
                  @blur="handleBlur('IdentityNumber')"
                />
                <span v-show="errors.IdentityNumber" class="error-message">{{ errors.IdentityNumber }}</span>
              </div>
              <div class="form-group">
                <label for="identityDate">Ngày cấp</label>
                <input
                  id="identityDate"
                  v-model="formData.IdentityDate"
                  :class="[{ error: errors.IdentityDate }, { valid: !errors.IdentityDate && formData.IdentityDate }]"
                  name="identityDate"
                  type="date"
                  @blur="handleBlur('IdentityDate')"
                />
                <span v-show="errors.IdentityDate" class="error-message">{{ errors.IdentityDate }}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="departmentId">Phòng ban</label>
                <select id="departmentId" v-model="formData.DepartmentId" name="departmentId" class="custom-select">
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
                <input
                  id="identityPlace"
                  v-model="formData.IdentityPlace"
                  :class="[{ error: errors.IdentityPlace }, { valid: !errors.IdentityPlace && formData.IdentityPlace }]"
                  name="identityPlace"
                  type="text"
                  @blur="handleBlur('IdentityPlace')"
                />
                <span v-show="errors.IdentityPlace" class="error-message">{{ errors.IdentityPlace }}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input
                  id="address"
                  v-model="formData.Address"
                  :class="[{ error: errors.Address }, { valid: !errors.Address && formData.Address }]"
                  name="address"
                  type="text"
                  @blur="handleBlur('Address')"
                />
                <span v-show="errors.Address" class="error-message">{{ errors.Address }}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="phoneNumber">ĐT Di động</label>
                <span class="icon">*</span>
                <input
                  id="phoneNumber"
                  v-model="formData.PhoneNumber"
                  :class="[{ error: errors.PhoneNumber }, { valid: !errors.PhoneNumber && formData.PhoneNumber }]"
                  name="phoneNumber"
                  type="text"
                  @blur="handleBlur('PhoneNumber')"
                />
                <span v-show="errors.PhoneNumber" class="error-message">{{ errors.PhoneNumber }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="telephoneNumber">ĐT Cố định</label>
                <input
                  id="telephoneNumber"
                  v-model="formData.TelephoneNumber"
                  :class="[
                    { error: errors.TelephoneNumber },
                    { valid: !errors.TelephoneNumber && formData.TelephoneNumber }
                  ]"
                  name="telephoneNumber"
                  type="text"
                  @blur="handleBlur('TelephoneNumber')"
                />
                <span v-show="errors.TelephoneNumber" class="error-message">{{ errors.TelephoneNumber }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="email">Email</label>
                <span class="icon">*</span>
                <input
                  id="email"
                  v-model="formData.Email"
                  :class="[{ error: errors.Email }, { valid: !errors.Email && formData.Email }]"
                  name="email"
                  type="email"
                  @blur="handleBlur('Email')"
                />
                <span v-show="errors.Email" class="error-message">{{ errors.Email }}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="bankAccount">Tài khoản ngân hàng</label>
                <input
                  id="bankAccount"
                  v-model="formData.BankAccount"
                  :class="[{ error: errors.BankAccount }, { valid: !errors.BankAccount && formData.BankAccount }]"
                  name="bankAccount"
                  type="text"
                  @blur="handleBlur('BankAccount')"
                />
                <span v-show="errors.BankAccount" class="error-message">{{ errors.BankAccount }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="bankName">Tên ngân hàng</label>
                <input
                  id="bankName"
                  v-model="formData.BankName"
                  :class="[{ error: errors.BankName }, { valid: !errors.BankName && formData.BankName }]"
                  name="bankName"
                  type="text"
                  @blur="handleBlur('BankName')"
                />
                <span v-show="errors.BankName" class="error-message">{{ errors.BankName }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="branchs">Chi nhánh</label>
                <input
                  id="branchs"
                  v-model="formData.Branchs"
                  :class="[{ error: errors.Branchs }, { valid: !errors.Branchs && formData.Branchs }]"
                  name="branchs"
                  type="text"
                  @blur="handleBlur('Branchs')"
                />
                <span v-show="errors.Branchs" class="error-message">{{ errors.Branchs }}</span>
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
      height: 88px;

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

      .icon {
        color: #e60000;
        margin: 0 4px;
      }

      .error-message {
        color: #e60000;
      }

      .error {
        color: #e60000;
        border: 2px solid #e60000;
      }

      .valid {
        color: #067933;
        border: 2px solid #067933;
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

input,
select {
  width: 100%;
  height: 36px;
  margin: 8px 0 4px;
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
