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
  allEmployees: {
    type: Array,
    required: true
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
  employeeCode: [
    {
      ruleName: 'required',
      errorMessage: 'Mã nhân viên không được để trống'
    },
    {
      ruleName: 'isUnique',
      errorMessage: 'Mã nhân viên đã tồn tại',
      arrayValues: props.allEmployees.map((employee) => employee.employeeCode)
    }
  ],
  fullName: [
    {
      ruleName: 'required',
      errorMessage: 'Họ tên không được để trống'
    }
  ],
  dateOfBirth: [
    {
      ruleName: 'isDateValid',
      errorMessage: 'Ngày sinh không hợp lệ'
    }
  ],
  identityNumber: [
    {
      ruleName: 'required',
      errorMessage: 'Số CMTND không được để trống'
    }
  ],
  identityDate: [
    {
      ruleName: 'isDateValid',
      errorMessage: 'Ngày cấp CMTND không hợp lệ'
    }
  ],
  email: [
    {
      ruleName: 'required',
      errorMessage: 'Email không được để trống'
    },
    {
      ruleName: 'isEmail',
      errorMessage: 'Email không hợp lệ'
    }
  ],
  phoneNumber: [
    {
      ruleName: 'required',
      errorMessage: 'Số điện thoại không được để trống'
    }
  ]
})

const createNewEmployeeCode = async () => {
  try {
    const response = await employeeApi.createNewEmployeeCode()
    employeeCode.value = response.data.metadata.employeeCode
  } catch (err) {
    console.log(err)
  }
}

const fetchDepartments = async () => {
  try {
    const response = await departmentApi.getDepartments()
    departments.value = response.data.metadata.departments
  } catch (err) {
    console.log(err)
  }
}

const fetchPositions = async () => {
  try {
    const response = await positionApi.getPositions()
    positions.value = response.data.metadata.positions
  } catch (err) {
    console.log(err)
  }
}

const resetEmployeeModal = async () => {
  if (props.mode === 'add') {
    await createNewEmployeeCode()
    formData.value = {
      employeeCode: employeeCode.value,
      gender: 0,
      dateOfBirth: null,
      identityDate: null,
      departmentId: departments.value[0].departmentId,
      positionId: positions.value[0].positionId
    }
  } else {
    formData.value = {
      ...props.employee,
      dateOfBirth: props.employee.dateOfBirth ? props.employee.dateOfBirth.split('T')[0] : null,
      identityDate: props.employee.identityDate ? props.employee.identityDate.split('T')[0] : null
    }
  }
  errors.value = {}
  isFormValid.value = false
}

const getEmployeeCodes = () => {
  formRules.value.employeeCode[1].arrayValues = props.allEmployees.map((employee) => employee.employeeCode)
}

onMounted(() => {
  fetchDepartments()
  fetchPositions()
  createNewEmployeeCode()
  resetEmployeeModal()
})

watch(
  () => positions.value,
  (newPositions) => {
    if (newPositions.length > 0 && props.mode === 'add') {
      formData.value.positionId = newPositions[0].positionId
    }
  }
)

watch(
  () => departments.value,
  (newDepartments) => {
    if (newDepartments.length > 0 && props.mode === 'add') {
      formData.value.departmentId = newDepartments[0].departmentId
    }
  }
)

watch(() => props.mode, resetEmployeeModal)
watch(() => props.employee, resetEmployeeModal, { immediate: true })
watch(() => props.allEmployees, getEmployeeCodes, { immediate: true })
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
      await updateEmployee(props.employee.employeeId, formData.value)
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
                  v-model="formData.employeeCode"
                  :class="[{ error: errors.employeeCode }, { valid: !errors.employeeCode && formData.employeeCode }]"
                  name="employeeCode"
                  type="text"
                  autofocus
                  @blur="handleBlur('employeeCode')"
                />
                <span class="error-message">{{ errors.employeeCode }}</span>
              </div>
              <div class="form-group">
                <label for="fullName">Họ và tên</label>
                <span class="icon">*</span>
                <input
                  id="fullName"
                  v-model="formData.fullName"
                  :class="[{ error: errors.fullName }, { valid: !errors.fullName && formData.fullName }]"
                  name="fullName"
                  type="text"
                  @blur="handleBlur('fullName')"
                />
                <span v-show="errors.fullName" class="error-message">{{ errors.fullName }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="dateOfBirth">Ngày sinh</label>
                <input
                  id="dateOfBirth"
                  v-model="formData.dateOfBirth"
                  :class="[{ error: errors.dateOfBirth }, { valid: !errors.dateOfBirth && formData.dateOfBirth }]"
                  name="dateOfBirth"
                  type="date"
                  @blur="handleBlur('dateOfBirth')"
                />
                <span v-show="errors.dateOfBirth" class="error-message">{{ errors.dateOfBirth }}</span>
              </div>
              <div class="form-group">
                <label for="gender">Giới tính</label>
                <div class="input-group">
                  <div v-for="gender in genders" :key="gender.id" class="input-group__item">
                    <input :id="gender.id" v-model="formData.gender" :value="gender.id" name="gender" type="radio" />
                    <label :for="gender.id">{{ gender.name }}</label>
                  </div>
                </div>
                <span v-show="errors.gender" class="error-message">{{ errors.gender }}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="positionId">Vị trí</label>
                <select id="positionId" v-model="formData.positionId" name="positionId" class="custom-select">
                  <option v-for="position in positions" :key="position.positionId" :value="position.positionId">
                    {{ position.positionName }}
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
                  v-model="formData.identityNumber"
                  :class="[
                    { error: errors.identityNumber },
                    { valid: !errors.identityNumber && formData.identityNumber }
                  ]"
                  name="identityNumber"
                  type="text"
                  @blur="handleBlur('identityNumber')"
                />
                <span v-show="errors.identityNumber" class="error-message">{{ errors.identityNumber }}</span>
              </div>
              <div class="form-group">
                <label for="identityDate">Ngày cấp</label>
                <input
                  id="identityDate"
                  v-model="formData.identityDate"
                  :class="[{ error: errors.identityDate }, { valid: !errors.identityDate && formData.identityDate }]"
                  name="identityDate"
                  type="date"
                  @blur="handleBlur('identityDate')"
                />
                <span v-show="errors.identityDate" class="error-message">{{ errors.identityDate }}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="departmentId">Phòng ban</label>
                <select id="departmentId" v-model="formData.departmentId" name="departmentId" class="custom-select">
                  <option
                    v-for="department in departments"
                    :key="department.departmentId"
                    :value="department.departmentId"
                  >
                    {{ department.departmentName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="identityPlace">Nơi cấp</label>
                <input
                  id="identityPlace"
                  v-model="formData.identityPlace"
                  :class="[{ error: errors.identityPlace }, { valid: !errors.identityPlace && formData.identityPlace }]"
                  name="identityPlace"
                  type="text"
                  @blur="handleBlur('identityPlace')"
                />
                <span v-show="errors.identityPlace" class="error-message">{{ errors.identityPlace }}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input
                  id="address"
                  v-model="formData.address"
                  :class="[{ error: errors.address }, { valid: !errors.address && formData.address }]"
                  name="address"
                  type="text"
                  @blur="handleBlur('address')"
                />
                <span v-show="errors.address" class="error-message">{{ errors.address }}</span>
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
                  v-model="formData.phoneNumber"
                  :class="[{ error: errors.phoneNumber }, { valid: !errors.phoneNumber && formData.phoneNumber }]"
                  name="phoneNumber"
                  type="text"
                  @blur="handleBlur('phoneNumber')"
                />
                <span v-show="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="telephoneNumber">ĐT Cố định</label>
                <input
                  id="telephoneNumber"
                  v-model="formData.telephoneNumber"
                  :class="[
                    { error: errors.telephoneNumber },
                    { valid: !errors.telephoneNumber && formData.telephoneNumber }
                  ]"
                  name="telephoneNumber"
                  type="text"
                  @blur="handleBlur('telephoneNumber')"
                />
                <span v-show="errors.telephoneNumber" class="error-message">{{ errors.telephoneNumber }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="email">Email</label>
                <span class="icon">*</span>
                <input
                  id="email"
                  v-model="formData.email"
                  :class="[{ error: errors.email }, { valid: !errors.email && formData.email }]"
                  name="email"
                  type="email"
                  @blur="handleBlur('email')"
                />
                <span v-show="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="bankAccount">Tài khoản ngân hàng</label>
                <input
                  id="bankAccount"
                  v-model="formData.bankAccount"
                  :class="[{ error: errors.bankAccount }, { valid: !errors.bankAccount && formData.bankAccount }]"
                  name="bankAccount"
                  type="text"
                  @blur="handleBlur('bankAccount')"
                />
                <span v-show="errors.bankAccount" class="error-message">{{ errors.bankAccount }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="bankName">Tên ngân hàng</label>
                <input
                  id="bankName"
                  v-model="formData.bankName"
                  :class="[{ error: errors.bankName }, { valid: !errors.bankName && formData.bankName }]"
                  name="bankName"
                  type="text"
                  @blur="handleBlur('bankName')"
                />
                <span v-show="errors.bankName" class="error-message">{{ errors.bankName }}</span>
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="branch">Chi nhánh</label>
                <input
                  id="branchs"
                  v-model="formData.branch"
                  :class="[{ error: errors.branch }, { valid: !errors.branch && formData.branch }]"
                  name="branchs"
                  type="text"
                  @blur="handleBlur('branch')"
                />
                <span v-show="errors.branch" class="error-message">{{ errors.branch }}</span>
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
