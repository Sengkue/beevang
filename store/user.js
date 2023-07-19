export const state = () => ({
  number: 10,
  suppliers: [],
  loading: false,
  datas: [],
  maleData: [],
  femaleData: [],
  dataCount: [],
  Patients: [],
  Patiented: [],
  historyData: [],
  importHistory: [],
  billData: [],
  dataById: [],
  dataStatus:[]
})
export const mutations = {
  changeNumber(state, data) {
    state.number = data
  },
  setUser(state, data) {
    state.suppliers = data
  },
  setLoading(state, data) {
    state.loading = data
  },
  setData(state, data) {
    state.datas = data
  },
  MaleDatas(state, data) {
    state.maleData = data
  },
  FeMaleDatas(state, data) {
    state.femaleData = data
  },
  setCount(state, data) {
    state.dataCount = data
  },
  setPatients(state, data) {
    state.Patients = data
  },
  setPatiented(state, data) {
    state.Patiented = data
  },
  setHistory(state, data) {
    state.historyData = data
  },
  setImportHistory(state, data) {
    state.importHistory = data
  },
  setBill(state, data) {
    state.billData = data
  },
  setBillDataById(state, data) {
    state.dataById = data
  },
  setStatus(state, data) {
    state.dataStatus = data
  },
}

export const actions = {
  async showUser({ commit }) {
    await this.$axios
      .get('http://localhost:7000/get-suppliers')
      .then((user) => {
        commit('setUser', user.data)
      })
  },

  async singleData({ commit }, params) {
    await this.$axios
      .get('http://localhost:7000/get-single', { params })
      .then((user) => {
        commit('datas', user.data)
      })
  },
  async male({ commit }) {
    await this.$axios.get('http://localhost:7000/statff-male').then((data) => {
      commit('MaleDatas', data.data)
    })
  },
  async female({ commit }) {
    await this.$axios
      .get('http://localhost:7000/statff-female')
      .then((data) => {
        commit('FeMaleDatas', data.data)
      })
  },
  async countType({ commit }) {
    await this.$axios.get('http://localhost:7000/count').then((data) => {
      commit('setCount', data.data)
    })
  },
  async getPatients({ commit }) {
    await this.$axios.get('http://localhost:7000/statusZero').then((data) => {
      commit('setPatients', data.data)
    })
  },
  async getPatiented({ commit }) {
    await this.$axios.get('http://localhost:7000/get-patients').then((data) => {
      commit('setPatiented', data.data)
    })
  },
  async getHistory({ commit }) {
    await this.$axios
      .get('http://localhost:7000/get-prescriptions')
      .then((data) => {
        commit('setHistory', data.data)
        //  console.log(data.data)
      })
  },
  async getImportHistory({ commit }) {
    await this.$axios
      .get('http://localhost:7000/get-import-history')
      .then((data) => {
        commit('setImportHistory', data.data)
      })
  },
  async getBill({ commit }) {
    await this.$axios.get('http://localhost:7000/get-bill').then((data) => {
      commit('setBill', data.data)
    })
  },
  // get data by id (bill_id)
  async getById({ commit }, id) {
    await this.$axios
      .get(`http://localhost:7000/bill-data/${id}`)
      .then((data) => {
        commit('setBillDataById', data.data)
        console.log("data" , data.data)
      })
  },
  // udpate status
  async updateBill({ commit }, id) {
    await this.$axios
      .put(`http://localhost:7000/update-bill/${id}`)
      .then(() => {
        this.$toast.success('ຢືນຢັນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ຢືນຢັນບໍ່ສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async getStatus({ commit }) {
    await this.$axios.get('http://localhost:7000/status-zero').then((data) => {
      commit('setStatus', data.data)
    })
  }
  
}
