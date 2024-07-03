<script setup>
import { ref } from 'vue'
const name = 'Đỗ Thu Hà'
const dob = '19/06/2002'
const gender = 'Nữ'
const email = 'dothuha.ftu@gmail.com'
const address = 'Phan Đình Phùng, Ba Đình, Hà Nội'
const employees = ref([])
const limits = ref([10, 20, 50, 100])
for (let i = 1; i <= 100; i++) {
  employees.value.push({ id: i, name, dob, gender, email, address })
}
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="employees">
        <div class="header">
          <h1 class="header__title">Quản lý Nhân viên</h1>
          <router-link to="/employees/detail" class="header__add-employee-btn">
            <div class="header__add-employee-btn__icon"><img src="../assets/icons/add.png" alt="add icon" /></div>
            <span class="header__add-employee-btn__text">Thêm mới</span>
          </router-link>
        </div>
        <div class="content">
          <div class="actions">
            <form class="actions__search">
              <input type="text" class="actions__search__input" placeholder="Tìm kiếm theo mã, họ tên" />
              <div class="actions__search__icon">
                <img src="../assets/icons/search.png" alt="search icon" />
              </div>
            </form>
            <div class="actions__bar">
              <button class="actions__bar__export-file-btn">
                <img src="../assets/icons/export-file.png" alt="export icon" />
              </button>
              <button class="actions__bar__refresh-btn">
                <img src="../assets/icons/refresh.png" alt="refresh icon" />
              </button>
            </div>
          </div>
          <div class="table">
            <table class="employee-table">
              <thead>
                <tr>
                  <th class="col-id"><span>STT</span></th>
                  <th class="col-employee-id"><span>Mã NV</span></th>
                  <th class="col-name"><span>Họ và tên</span></th>
                  <th class="col-dob"><span>Ngày sinh</span></th>
                  <th class="col-gender"><span>Giới tính</span></th>
                  <th class="col-email"><span>Email</span></th>
                  <th class="col-address"><span>Địa chỉ</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="employee in employees" :key="employee.id">
                  <td>
                    <span>{{ employee.id }}</span>
                  </td>
                  <td>
                    <span>{{ `NV${employee.id}` }}</span>
                  </td>
                  <td>
                    <span>{{ employee.name }}</span>
                  </td>
                  <td>
                    <span>{{ employee.dob }}</span>
                  </td>
                  <td>
                    <span>{{ employee.gender }}</span>
                  </td>
                  <td>
                    <span>{{ employee.email }}</span>
                  </td>
                  <td class="cell-group">
                    <span>{{ employee.address }}</span>
                    <div class="cta">
                      <router-link to="/employees/detail" class="cta__update-btn">
                        <img src="../assets/icons/pencil.png" alt="pencil icon" />
                      </router-link>
                      <button class="cta__duplicate-btn">
                        <img src="../assets/icons/duplicate.png" alt="duplicate icon" />
                      </button>
                      <button class="cta__delete-btn">
                        <img src="../assets/icons/close.png" alt="close icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination">
            <span class="summary">{{ `Tổng: ${employees.length}` }}</span>
            <div class="pagination-control">
              <label for="limit">Số bản ghi/trang</label>
              <select id="limit" name="limit">
                <option v-for="limit in limits" :key="limit" :value="limit">{{ limit }}</option>
              </select>
              <div class="btn-group">
                <div class="btn-group__prev-page-btn">
                  <img src="../assets/icons/btn-prev-page.svg" alt="prev page icon" />
                </div>
                <div class="btn-group__next-page-btn">
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

  &__title {
    margin: 0;
    font-size: 3rem;
  }

  &__add-employee-btn {
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
  }

  &__add-employee-btn__icon {
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

  &__add-employee-btn__text {
    color: #ffffff;
    padding: 4px;
    margin-right: 12px;
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
}
.actions {
  display: flex;
  justify-content: space-between;
  margin: 16px;

  &__search {
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
      pointer-events: none;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__bar {
    display: flex;
    column-gap: 8px;

    &__export-file-btn,
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
.table {
  display: flex;
  margin: 0 16px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  border-collapse: collapse;

  &::-webkit-scrollbar {
    width: 6px;
    height: 300px;
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
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  height: 40px;
  padding: 0 12px;
  text-align: left;
  border: 1px solid #e0e0e0;
}
th {
  position: sticky;
  top: -1px;
  z-index: 1;
  background-color: #f5f5f5;
}
tr {
  &:hover {
    background: #dfe5e8;
  }

  &:hover .cta {
    position: absolute;
    right: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 4px;
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
.cell-group {
  position: relative;
  display: flex;
  align-items: center;

  .cta {
    display: none;
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
}
.pagination-control {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 12px;
}
.btn-group {
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
</style>
