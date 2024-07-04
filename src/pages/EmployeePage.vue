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
          <h1 class="title">Quản lý Nhân viên</h1>
          <router-link to="/employees/detail" class="add-btn">
            <div class="add-btn__icon"><img src="../assets/icons/add.png" alt="add icon" /></div>
            <span class="add-btn__text">Thêm mới</span>
          </router-link>
        </div>
        <div class="content">
          <div class="toolbars">
            <div class="quick-filters">
              <form class="search-form">
                <input type="text" class="search-form__input" placeholder="Tìm kiếm theo mã, họ tên" />
                <div class="search-form__icon">
                  <img src="../assets/icons/search.png" alt="search icon" />
                </div>
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
                <tr>
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
                <tr v-for="employee in employees" :key="employee.id" class="table-row">
                  <td class="table-cell col-data">{{ employee.id }}</td>
                  <td class="table-cell col-data">{{ `NV${employee.id}` }}</td>
                  <td class="table-cell col-data">{{ employee.name }}</td>
                  <td class="table-cell col-data">{{ employee.dob }}</td>
                  <td class="table-cell col-data">{{ employee.gender }}</td>
                  <td class="table-cell col-data">{{ employee.email }}</td>
                  <td class="table-cell col-group">
                    {{ employee.address }}
                    <div class="cta-group">
                      <button class="cta-group__update-btn">
                        <img src="../assets/icons/pencil.png" alt="pencil icon" />
                      </button>
                      <button class="cta-group__duplicate-btn">
                        <img src="../assets/icons/duplicate.png" alt="duplicate icon" />
                      </button>
                      <button class="cta-group__delete-btn">
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
            <div class="actions">
              <label for="limit">Số bản ghi/trang</label>
              <select id="limit" name="limit" class="custom-select">
                <option v-for="limit in limits" :key="limit" :value="limit">{{ limit }}</option>
              </select>
              <div class="cta-group">
                <div class="cta-group__prev-page-btn">
                  <img src="../assets/icons/btn-prev-page.svg" alt="prev page icon" />
                </div>
                <div class="cta-group__next-page-btn">
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
          pointer-events: none;

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

    .table {
      border-collapse: collapse;
      width: 100%;
    }

    .table-cell {
      height: 40px;
      padding: 0 12px;
      text-align: left;
      border: 1px solid #e0e0e0;
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
        display: flex;
        align-items: center;

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
