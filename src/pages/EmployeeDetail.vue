<script setup>
import { ref } from 'vue'
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
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <form class="employee">
        <div class="header">
          <h1 class="title">Thông tin nhân viên</h1>
          <router-link to="/employees" class="cancel-btn"
            ><img src="../assets/icons/close.png" alt="close icon"
          /></router-link>
        </div>
        <div class="form-control">
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="employee-id">Mã nhân viên</label>
                <input id="employee-id" type="text" autofocus />
              </div>
              <div class="form-group">
                <label for="employee-name">Họ và tên</label>
                <input id="employee-name" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-dob">Ngày sinh</label>
                <input id="employee-dob" type="date" />
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
                  <option v-for="position in positions" :key="position.id" :value="position.name">
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
                  <option v-for="department in departments" :key="department.id" :value="department.name">
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
                <input id="employee-address" type="text" />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="form-group">
                <label for="employee-telephone">ĐT Cố định</label>
                <input id="employee-telephone" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-phone">ĐT Di động</label>
                <input id="employee-phone" type="text" />
              </div>
            </div>
            <div class="form-col">
              <div class="form-group">
                <label for="employee-email">Email</label>
                <input id="employee-email" type="email" placeholder="VD: dothuha.ftu@gmail.com" />
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
            <button class="cta-group__cancel-btn">Huỷ</button>
            <button class="cta-group__submit-btn">Xác nhận</button>
          </div>
        </div>
      </form>
    </div>
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
  max-width: 1280px;
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

  .title {
    margin: 0;
    font-size: 3rem;
  }

  .cancel-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
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
  width: calc(100% + 64px);
  display: flex;
  justify-content: flex-end;
  padding: 16px 32px;
  background: #eeeeee;

  .cta-group {
    display: flex;
    column-gap: 12px;

    &__cancel-btn,
    &__submit-btn {
      min-width: 80px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      padding: 0 16px;
      background: #4d646f;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &__cancel-btn {
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
input[type='radio'] {
  width: 16px;
  height: 16px;
  border: 2px solid #e0e0e0;
}
</style>
