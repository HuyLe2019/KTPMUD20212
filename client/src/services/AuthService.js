export default {
  async login(axios, acount) {
    const res = await axios.post('/api/v1/login', acount)
    return res.data
  },
  async signUp(axios, acount) {
    const res = await axios.post('/api/v1/signup', acount)
    return res.data
  },
}
