import axiosInstance from '@/plugins/axios'

const url = '/Departments'

const departmentApi = {
  getDepartments() {
    return axiosInstance.get(url)
  }
}

export default departmentApi
