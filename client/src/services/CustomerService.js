export default {
  async getCustomer(axios, id) {
    const res = await axios.get(`/api/v1/admin/customer/${id}`)
    return res.data
  },
  async getAllCustomer(axios) {
    const res = await axios.get(`/api/v1/admin/customer`)
    return res.data
  },
  async editCustomer(axios, id, data) {
    const res = await axios.put(`/api/v1/admin/customer/${id}`, data)
    return res.data
  },
  async addCustomer(axios, data) {
    const res = await axios.post(`/api/v1/admin/customer`, data)
    return res.data
  },
  async deleteCustomer(axios, id) {
    const res = await axios.delete(`/api/v1/admin/customer/${id}`)
    return res.data
  },
  async search(store, axios, query) {
    const qr = []
    qr.push(`page=${store.state.page}&limit=${store.state.limit}`)
    if (query.keyword) {
      qr.push(`keyword=${query.keyword}`)
    }
    const res = await axios.get(`/api/v1/admin/customer/search${qr.length > 0 ? `?${qr.join('&')}` : ''}`)
    return res.data
  },
}
