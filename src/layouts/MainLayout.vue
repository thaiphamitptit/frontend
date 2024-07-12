<script setup>
import { ref } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import EmployeeModalComponent from '@/components/EmployeeModalComponent.vue'
import EmployeeDialogComponent from '@/components/EmployeeDialogComponent.vue'
import ToastComponent from '@/components/ToastComponent.vue'

const isSidebarCollapsed = ref(false)
const isEmployeeModalVisible = ref(false)
const isEmployeeDialogVisible = ref(false)
const selectedEmployee = ref({})
const isToastVisible = ref(false)
const toastType = ref('')
const toastDesc = ref('')
const toastDuration = ref(2000)
const name = 'Đỗ Thu Hà'
const dob = '06/19/2002'
const gender = 'Nữ'
const email = 'dothuha.ftu@gmail.com'
const address = 'Phan Đình Phùng, Ba Đình, Hà Nội'
const employees = ref([])
for (let i = 1; i <= 1000; i++) {
  employees.value.push({ id: `NV-${i}`, name, dob, gender, email, address })
}
const positions = ref([
  { id: 1, name: '' },
  { id: 2, name: 'Trưởng phòng' },
  { id: 3, name: 'Nhân viên' }
])
const departments = ref([
  { id: 1, name: '' },
  { id: 2, name: 'Phòng nhân sự' },
  { id: 3, name: 'Phòng tài chính, kế toán' },
  { id: 4, name: 'Phòng marketing' },
  { id: 5, name: 'Phòng kỹ thuật, công nghệ' }
])
const branchs = [
  { id: 1, name: 'Chi nhánh Hà Nội' },
  { id: 2, name: 'Chi nhánh Đà Nẵng' },
  { id: 3, name: 'Chi nhánh TP HCM' }
]
const limits = ref([10, 20, 50, 100])

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const showAddEmployeeModal = () => {
  selectedEmployee.value = {}
  isEmployeeModalVisible.value = true
}

const showUpdateEmployeeModal = (employee) => {
  selectedEmployee.value = employee
  isEmployeeModalVisible.value = true
}

const showDeleteEmployeeDialog = (employee) => {
  selectedEmployee.value = employee
  isEmployeeDialogVisible.value = true
}

const showToast = (type, desc) => {
  isToastVisible.value = true
  toastType.value = type
  toastDesc.value = desc
  setTimeout(() => {
    isToastVisible.value = false
  }, toastDuration.value)
}

const closeEmployeeModal = () => {
  isEmployeeModalVisible.value = false
}

const closeEmployeeDialog = () => {
  isEmployeeDialogVisible.value = false
}

const closeToast = () => {
  isToastVisible.value = false
}
</script>

<template>
  <div class="wrapper">
    <HeaderComponent :branchs="branchs" @toggle-sidebar="toggleSidebar" />
    <div class="container">
      <SidebarComponent :collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar" />
      <div class="content">
        <router-view
          :employees="employees"
          :limits="limits"
          @show-add-employee-modal="showAddEmployeeModal"
          @show-update-employee-modal="showUpdateEmployeeModal"
          @show-delete-employee-dialog="showDeleteEmployeeDialog"
        ></router-view>
      </div>
    </div>
    <EmployeeModalComponent
      :visible="isEmployeeModalVisible"
      :employee="selectedEmployee"
      :departments="departments"
      :positions="positions"
      @close-employee-modal="closeEmployeeModal"
      @show-toast="showToast"
    />
    <EmployeeDialogComponent
      :visible="isEmployeeDialogVisible"
      :employee="selectedEmployee"
      @close-employee-dialog="closeEmployeeDialog"
      @show-toast="showToast"
    />
    <ToastComponent :visible="isToastVisible" :type="toastType" :desc="toastDesc" @close-toast="closeToast" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  width: 100%;
  display: flex;
}
.content {
  flex-grow: 1;
}
</style>
