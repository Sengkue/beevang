export const state = () => ({
  setDataResult:[],
  dataId:'',
  dataHistory:[]
})

export const mutations = {
  setResult(state,data){
    state.setDataResult = data
  },
  getDataId(state,data) {
    state.dataId = data
  },
  setHistory(state,data) {
    state.dataHistory = data
  }
}

export const actions = {
  async createResult({ commit }, data) {
    const token = this.$cookies.get('token')
    try {
      await this.$axios
        .post('http://localhost:7000/create-result', data, {
          headers: {
            Authorization: `CLINIC ${token}`,
          },
        })
        .then((res) => {
          this.$toast.success('ປ້ອນຜົນກວດສຳເລັດ', {
            duration: 3000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'check',
          })
        })
        .catch(() => {
          this.$toast.error('ປ້ອນຜົນກວດບໍ່ສຳເລັດ', {
            duration: 3000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'close',
          })
        })
    } catch (error) {
      console.log(error)
    }
  },
  async getAll({commit}) {
    try {
      await this.$axios.get('http://localhost:7000/get-result').then((data) => {
        commit('setResult', data.data)
        console.log("resultData",data.data)
      })
    } catch (error) {
      console.log(error)
    }
  },
  async getHistory({commit}) {
    try {
      await this.$axios.get('http://localhost:7000/history-result').then((data) => {
        commit('setHistory', data.data)
        // console.log("resultData",data.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
}
