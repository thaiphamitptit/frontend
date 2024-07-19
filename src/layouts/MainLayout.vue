<script setup>
import { onMounted, ref } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import EmployeeModalComponent from '@/components/EmployeeModalComponent.vue'
import EmployeeDialogComponent from '@/components/EmployeeDialogComponent.vue'
import ToastComponent from '@/components/ToastComponent.vue'
import employeeApi from '@/apis/employee.api'

const isSidebarCollapsed = ref(false)
const isEmployeeModalVisible = ref(false)
const employeeModalMode = ref('add')
const isEmployeeDialogVisible = ref(false)
const isToastVisible = ref(false)
const toastType = ref('')
const toastDesc = ref('')
const employees = ref([])
const selectedEmployee = ref({})
const limits = ref([10, 20, 50, 100])
const branchs = [
  { id: 0, name: 'Chi nhánh Hà Nội' },
  { id: 1, name: 'Chi nhánh Đà Nẵng' },
  { id: 2, name: 'Chi nhánh TP HCM' }
]

const fetchEmployees = async () => {
  try {
    const response = await employeeApi.getEmployees()
    employees.value = response.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchEmployees()
})

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const showAddEmployeeModal = () => {
  employeeModalMode.value = 'add'
  isEmployeeModalVisible.value = true
}

const showUpdateEmployeeModal = (employee) => {
  employeeModalMode.value = 'update'
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
  }, 2000)
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
      :mode="employeeModalMode"
      :employee="selectedEmployee"
      :employees="employees"
      @close-employee-modal="closeEmployeeModal"
      @show-toast="showToast"
      @employee-updated="fetchEmployees"
    />
    <EmployeeDialogComponent
      :visible="isEmployeeDialogVisible"
      :employee="selectedEmployee"
      @close-employee-dialog="closeEmployeeDialog"
      @show-toast="showToast"
      @employee-deleted="fetchEmployees"
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
