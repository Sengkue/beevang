export const state = () => ({
  prescrition: [],
  statusData: [],
  saleDetail:[],
  sale:{},
  guanranted:{},
})

export const mutations = {
  setPrescrition(state, data) {
    state.prescrition = data
  },
  setOrderStatus(state, data) {
    state.statusData = data
  },
  setBySaleId(state, data){
    state.saleDetail = data
  },
  setSale(state, data){
    state.sale = data
  },
  setGuanranted(state, data){
    state.guanranted = data
  },
}

export const actions = {
  async getPrescrition({ commit }, id) {
    await this.$axios
      .get(`http://localhost:7000/get-offerrId/${id}`)
      .then((res) => {
        commit('setPrescrition', res.data)
      })
  },
  async saveSale({ commit }, data) {
    const token = this.$cookies.get('token')
    try {
      await this.$axios
        .post('http://localhost:7000/create-saleDetails', data, {
          headers: {
            Authorization: `CLINIC ${token}`,
          },
        })
        .then(() => {
          this.$toast.success('ບັນທຶກສຳເລັດ', {
            duration: 3000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'check',
          })
        })
    } catch (error) {
      this.$toast.error('ບັນທຶກບໍ່ສຳເລັດ', {
        duration: 3000,
        position: 'top-right',
        iconPack: 'mdi',
        icon: 'close',
      })
    }
  },
  async getDataStatus({ commit }) {
    await this.$axios
      .get(`http://localhost:7000/get-offer-status`)
      .then((res) => {
        commit('setOrderStatus', res.data)
      })
  },
  async getBysaleId({commit},id){
    await this.$axios.get(`http://localhost:2023/sale_detail/sale-id/${id}`).then((res)=>{
      commit('setBySaleId', res.data)
    })
  },
  async selectSale({commit},id){
    await this.$axios.get(`http://localhost:2023/sale/details/${id}`).then((res)=>{
      commit('setSale', res.data.result)
    })
  }
}
