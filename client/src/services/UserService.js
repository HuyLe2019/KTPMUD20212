export default {
  async getUser(axios, id) {
    const res = await axios.get(`/api/v1/admin/user/${id}`)
    return res.data
  },
  async getAllUser(axios) {
    const res = await axios.get(`/api/v1/admin/user`)
    return res.data
  },
  async editUser(axios, id, data) {
    const res = await axios.put(`/api/v1/admin/user/${id}`, data)
    return res.data
  },
  async addUser(axios, data) {
    const res = await axios.post(`/api/v1/admin/user`, data)
    return res.data
  },
  async deleteUser(axios, id) {
    const res = await axios.delete(`/api/v1/admin/user/${id}`)
    return res.data
  },
}
