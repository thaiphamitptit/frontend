import axiosInstance from '@/plugins/axios'

const url = '/Positions'

const positionApi = {
  getPositions() {
    return axiosInstance.get(url)
  }
}

export default positionApi
