import { fetchData } from './network/getData'

export default {
  async getUploadedVideos () {
    return fetchData('GET', '/video_cert/list')
  },
  async uploadedNewVideo (vid) {
    return fetchData('POST', `/video_cert/store?video_id=${vid}`)
  },
  async deleteVideoById (vid) {
    return fetchData('DELETE', `/video_cert/${vid}`)
  }
}
