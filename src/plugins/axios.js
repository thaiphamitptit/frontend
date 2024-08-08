import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/v1'

class Axios {
  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const axiosInstance = new Axios().instance
export default axiosInstance
