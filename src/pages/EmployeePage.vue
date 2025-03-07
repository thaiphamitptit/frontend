<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  employees: {
    type: Array,
    required: true
  },
  limits: {
    type: Array,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  totalRecords: {
    type: Number,
    required: true
  }
})

const emit = defineEmits([
  'show-add-employee-modal',
  'show-update-employee-modal',
  'show-delete-employee-dialog',
  'filter-employees'
])
const router = useRouter()
const route = useRoute()

const isLoading = ref(false)
const employeeFilter = ref(route.query.employeeFilter || '')
const pageSize = ref(Number(route.query.pageSize) || props.limits[0])
const pageNumber = ref(Number(route.query.pageNumber) || 1)

const employeeQueryParams = ref({
  employeeFilter: employeeFilter.value,
  pageSize: pageSize.value,
  pageNumber: pageNumber.value
})

const toggleStatus = () => {
  if (props.totalRecords === 0) {
    isLoading.value = true
  } else {
    isLoading.value = false
  }
}

const handleSubmit = () => {
  employeeQueryParams.value.employeeFilter = employeeFilter.value
  employeeQueryParams.value.pageNumber = 1
  updateEmployeeQueryParams()
}

const handleChangePageSize = () => {
  employeeQueryParams.value.pageSize = pageSize.value
  employeeQueryParams.value.pageNumber = 1
  updateEmployeeQueryParams()
}

const handleChangePageNumber = (direction) => {
  if (direction === 'prev' && pageNumber.value > 1) {
    pageNumber.value -= 1
  }
  if (direction === 'next' && pageNumber.value < props.totalPages) {
    pageNumber.value += 1
  }
  employeeQueryParams.value.pageNumber = pageNumber.value
  updateEmployeeQueryParams()
}

const updateEmployeeQueryParams = () => {
  const newEmployeeQueryParams = { ...employeeQueryParams.value }
  emit('filter-employees', newEmployeeQueryParams)
  router.push({ query: newEmployeeQueryParams })
  employeeFilter.value = ''
}

const showAddEmployeeModal = () => {
  emit('show-add-employee-modal')
}

const showUpdateEmployeeModal = (employee) => {
  emit('show-update-employee-modal', employee)
}

const showDeleteEmployeeDialog = (employee) => {
  emit('show-delete-employee-dialog', employee)
}

watch(() => props.employees, toggleStatus, { immediate: true })

watch([pageSize, pageNumber], () => {
  employeeQueryParams.value.pageSize = pageSize.value
  employeeQueryParams.value.pageNumber = pageNumber.value
  updateEmployeeQueryParams()
})

watch(
  () => route.query,
  (newQuery) => {
    employeeFilter.value = newQuery.employeeFilter || employeeFilter.value
    pageSize.value = Number(newQuery.pageSize) || pageSize.value
    pageNumber.value = Number(newQuery.pageNumber) || pageNumber.value
    updateEmployeeQueryParams()
  },
  { immediate: true }
)
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="employees">
        <div class="header">
          <h1 class="title">Quản lý Nhân viên</h1>
          <button class="add-btn" @click="showAddEmployeeModal">
            <div class="add-btn__icon"><img src="../assets/icons/add.png" alt="add icon" /></div>
            <span class="add-btn__text">Thêm mới</span>
          </button>
        </div>
        <div class="content">
          <div class="toolbars">
            <div class="quick-filters">
              <form class="search-form" @submit.prevent="handleSubmit">
                <input
                  v-model="employeeFilter"
                  type="text"
                  class="search-form__input"
                  placeholder="Tìm kiếm theo mã, họ tên"
                />
                <button class="search-form__icon">
                  <img src="../assets/icons/search.png" alt="search icon" />
                </button>
              </form>
            </div>
            <div class="actions-bar">
              <button class="actions-bar__export-btn">
                <img src="../assets/icons/export-file.png" alt="export icon" />
              </button>
              <button class="actions-bar__refresh-btn">
                <img src="../assets/icons/refresh.png" alt="refresh icon" />
              </button>
            </div>
          </div>
          <div class="table-container">
            <table class="table">
              <thead>
                <tr class="table-row">
                  <th class="table-cell col-heading">STT</th>
                  <th class="table-cell col-heading">Mã NV</th>
                  <th class="table-cell col-heading">Họ và tên</th>
                  <th class="table-cell col-heading">Ngày sinh</th>
                  <th class="table-cell col-heading">Giới tính</th>
                  <th class="table-cell col-heading">Email</th>
                  <th class="table-cell col-heading">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="rows in Array.from({ length: 20 }, (_, index) => index + 1)"
                  v-show="isLoading"
                  :key="rows"
                  class="table-row"
                >
                  <td
                    v-for="cols in Array.from({ length: 7 }, (_, index) => index + 1)"
                    :key="cols"
                    class="table-cell col-data"
                  >
                    <div class="skeleton"></div>
                  </td>
                </tr>
                <tr
                  v-for="(employee, index) in props.employees"
                  v-show="!isLoading"
                  :key="employee.employeeId"
                  class="table-row"
                >
                  <td class="table-cell col-data">{{ index + 1 }}</td>
                  <td class="table-cell col-data">{{ employee.employeeCode }}</td>
                  <td class="table-cell col-data">{{ employee.fullName }}</td>
                  <td class="table-cell col-data">
                    {{ employee.dateOfBirth ? employee.dateOfBirth.split('T')[0] : null }}
                  </td>
                  <td class="table-cell col-data">{{ employee.gender }}</td>
                  <td class="table-cell col-data">{{ employee.email }}</td>
                  <td class="table-cell col-group">
                    {{ employee.address }}
                    <div class="cta-group">
                      <button class="cta-group__update-btn" @click="showUpdateEmployeeModal(employee)">
                        <img src="../assets/icons/pencil.png" alt="pencil icon" />
                      </button>
                      <button class="cta-group__duplicate-btn">
                        <img src="../assets/icons/duplicate.png" alt="duplicate icon" />
                      </button>
                      <button class="cta-group__delete-btn" @click="showDeleteEmployeeDialog(employee)">
                        <img src="../assets/icons/close.png" alt="close icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination">
            <span class="summary">{{ `Tổng: ${props.totalRecords}` }}</span>
            <div class="actions">
              <label for="limit">Số bản ghi/trang</label>
              <select id="limit" v-model="pageSize" name="limit" class="custom-select" @change="handleChangePageSize">
                <option v-for="limit in props.limits" :key="limit" :value="limit">{{ limit }}</option>
              </select>
              <div class="cta-group">
                <div class="cta-group__prev-page-btn" @click="handleChangePageNumber('prev')">
                  <img src="../assets/icons/btn-prev-page.svg" alt="prev page icon" />
                </div>
                <div class="cta-group__next-page-btn" @click="handleChangePageNumber('next')">
                  <img src="../assets/icons/btn-next-page.svg" alt="next page icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: calc(100vh - 48px);
  background: #eeeeee;
  box-shadow: 0 1px 1px #e0e0e0;
}

.container {
  width: 100%;
  height: 100%;
}

.employees {
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .title {
    margin: 0;
    font-size: 3rem;
  }

  .add-btn {
    min-width: 80px;
    height: 36px;
    display: flex;
    align-items: center;
    background: #4d646f;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;

      img {
        transform: scale(1.2);
      }
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 12px;

      img {
        transition: transform 0.3s ease;
        width: 20px;
        height: 20px;
      }
    }

    &__text {
      color: #ffffff;
      padding: 4px;
      margin-right: 12px;
    }
  }
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 1px 1px #e0e0e0;

  .toolbars {
    display: flex;
    justify-content: space-between;
    margin: 16px;

    .quick-filters {
      .search-form {
        position: relative;

        &__input {
          width: 300px;
          height: 36px;
          padding: 0 12px;
          border: 2px solid #e0e0e0;
          border-radius: 4px;
        }

        &__icon {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px;
          top: 50%;
          right: 0px;
          transform: translateY(-50%);
          background: none;
          cursor: pointer;

          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .actions-bar {
      display: flex;
      column-gap: 8px;

      &__export-btn,
      &__refresh-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        cursor: pointer;

        &:hover img {
          transform: scale(1.2);
        }

        img {
          transition: transform 0.3s ease;
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .table-container {
    display: flex;
    margin: 0 16px;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
    overflow-x: auto;
    border: 1px solid #e0e0e0;
    border-collapse: collapse;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #bdbdbd;
    }

    .table {
      border-collapse: collapse;
      width: 100%;
    }

    .table-row {
      height: 40px;
    }

    .table-cell {
      height: 40px;
      padding: 0 12px;
      text-align: left;
      border: 1px solid #e0e0e0;

      .skeleton {
        width: 100%;
        height: 16px;
        background: #eeeeee;
        border-radius: 4px;
      }
    }

    .col-heading {
      position: sticky;
      top: -1px;
      z-index: 1;
      background-color: #eff2f4;
    }

    .table-row {
      .col-group {
        position: relative;

        .cta-group {
          display: none;
        }
      }

      &:hover {
        background: #dfe5e8;
      }

      &:hover .cta-group {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 4px;
        z-index: 10;
        cursor: pointer;

        &__update-btn,
        &__duplicate-btn,
        &__delete-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
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
      }
    }
  }

  .pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: calc(100% - 32px);
    height: 36px;
    margin: 16px;

    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 12px;

      .custom-select {
        height: 36px;
        cursor: pointer;
      }

      .cta-group {
        display: flex;
        justify-content: center;
        align-items: center;

        &__prev-page-btn,
        &__next-page-btn {
          display: flex;
          justify-content: center;
          align-items: baseline;
          padding: 4px;
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
    }
  }
}
</style>
