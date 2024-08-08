import axiosInstance from '@/plugins/axios'

const url = '/Employees'

const employeeApi = {
  createNewEmployeeCode() {
    return axiosInstance.get(`${url}/newEmployeeCode`)
  },
  getEmployees() {
    return axiosInstance.get(url)
  },
  getFilteredEmployees(params) {
    return axiosInstance.get(`${url}/filter`, {
      params
    })
  },
  addEmployee(body) {
    return axiosInstance.post(url, body)
  },
  updateEmployee(employeeId, body) {
    return axiosInstance.put(`${url}/${employeeId}`, body)
  },
  deleteEmployee(employeeId) {
    return axiosInstance.delete(`${url}/${employeeId}`)
  }
}

export default employeeApi
