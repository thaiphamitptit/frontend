import axios from 'axios'

const baseUrl = 'https://cukcuk.manhnv.net/api/v1'

class Axios {
  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const axiosInstance = new Axios().instance
export default axiosInstance
