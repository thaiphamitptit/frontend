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
      <div class="employee-detail">
        <div class="header">
          <h1 class="header__title">Thông tin nhân viên</h1>
          <router-link to="/employees" class="header__cancel-btn"
            ><img src="../assets/icons/close.png" alt="close icon"
          /></router-link>
        </div>
        <div class="form">
          <form class="form-control">
            <div class="row row-base">
              <div class="row row-2">
                <div class="row-2">
                  <label for="employee-id"> <span>Mã nhân viên</span></label>
                  <input id="employee-id" type="text" autofocus />
                </div>
                <div class="row-2">
                  <label for="employee-name"><span>Họ và tên</span></label>
                  <input id="employee-name" type="text" />
                </div>
              </div>
              <div class="row row-2">
                <div class="row-2-5">
                  <label for="employee-dob"><span>Ngày sinh</span></label>
                  <input id="employee-dob" type="date" />
                </div>
                <div class="row-1-6">
                  <label for="employee-gender"><span>Giới tính</span></label>
                  <div class="input-group">
                    <div class="input-group__item">
                      <input id="male" name="gender" value="Nam" type="radio" />
                      <label for="male"><span>Nam</span></label>
                    </div>
                    <div class="input-group__item">
                      <input id="female" name="gender" value="Nữ" type="radio" />
                      <label for="female"><span>Nữ</span></label>
                    </div>
                    <div class="input-group__item">
                      <input id="other" name="gender" value="Khác" type="radio" />
                      <label for="other"><span>Khác</span></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row row-base">
              <div class="row-2">
                <div class="employee-position">
                  <label for="employee-position"><span>Vị trí</span></label>
                  <select id="employee-position" name="employee-position">
                    <option v-for="position in positions" :key="position.id" :value="position.name">
                      {{ position.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row row-2">
                <div class="row-1-6">
                  <label for="employee-cmtnd"><span>CMTND</span></label>
                  <input id="employee-cmtnd" type="text" />
                </div>
                <div class="row-2-5">
                  <label for="employee-date-release"><span>Ngày cấp</span></label>
                  <input id="employee-date-release" type="date" />
                </div>
              </div>
            </div>
            <div class="row row-base">
              <div class="row-2">
                <label for="employee-department"> <span>Phòng ban</span></label>
                <select id="employee-department" name="employee-department">
                  <option v-for="department in departments" :key="department.id" :value="department.name">
                    {{ department.name }}
                  </option>
                </select>
              </div>
              <div class="row-2">
                <label for="employee-where"><span>Nơi cấp</span></label>
                <input id="employee-where" type="text" />
              </div>
            </div>
            <div class="row row-base">
              <div class="row-1">
                <label for="employee-address"> <span>Địa chỉ</span></label>
                <input id="employee-address" type="text" />
              </div>
            </div>
            <div class="row-base">
              <div class="row">
                <div class="row-3">
                  <label for="employee-telephone"> <span>ĐT Cố định</span></label>
                  <input id="employee-telephone" type="text" />
                </div>
                <div class="row-3">
                  <label for="employee-phone"> <span>ĐT Di động</span></label>
                  <input id="employee-phone" type="text" />
                </div>
                <div class="row-3">
                  <label for="employee-email"> <span>Email</span></label>
                  <input id="employee-email" type="email" />
                </div>
              </div>
            </div>
            <div class="row-base">
              <div class="row">
                <div class="row-3">
                  <label for="employee-bank-account"> <span> Tài khoản ngân hàng</span></label>
                  <input id="employee-bank-account" type="text" />
                </div>
                <div class="row-3">
                  <label for="employee-bank-name"> <span>Tên ngân hàng</span></label>
                  <input id="employee-bank-name" type="text" />
                </div>
                <div class="row-3">
                  <label for="employee-branch"> <span>Chi nhánh</span></label>
                  <input id="employee-branch" type="text" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="footer">
          <div class="actions">
            <button class="actions__cancel">Huỷ</button>
            <button class="actions__submit">Xác nhận</button>
          </div>
        </div>
      </div>
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
}
.employee-detail {
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

  &__title {
    margin: 0;
    font-size: 3rem;
  }

  &__cancel-btn {
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
.form {
  width: 100%;
  margin: 0 32px;
}
.row {
  display: flex;
  column-gap: 12px;
}
.row-base {
  margin: 24px 0;
  column-gap: 24px;
}
.row-1 {
  flex-basis: 100%;
}
.row-2 {
  flex-basis: 50%;
}
.row-3 {
  flex-basis: 33.3%;
}
.row-2-5 {
  flex-basis: 40%;
}
.row-1-6 {
  flex-basis: 60%;
}
.input-group {
  height: 36px;
  display: flex;
  align-items: center;
  column-gap: 24px;
  margin-top: 8px;
  margin-left: 8px;

  &__item {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
}
input[type='text'],
input[type='date'],
input[type='email'],
select {
  width: 100%;
  height: 36px;
  display: block;
  margin-top: 8px;
  padding: 0 12px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
}
input[type='radio'] {
  width: 16px;
  height: 16px;
}
.footer {
  width: calc(100% + 64px);
  display: flex;
  justify-content: flex-end;
  padding: 16px 32px;
  background: #eeeeee;
}
.actions {
  display: flex;
  column-gap: 12px;

  &__cancel,
  &__submit {
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

  &__cancel {
    color: #000000;
    background: #ffffff;
  }
}
</style>
