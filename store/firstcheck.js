export const state = () => ({
    dataStore: [],
    datas:[]
  })
  export const mutations = {
    getData(state, data) {
      state.dataStore = data
    },
    // getSingData(state, data) {
    //   state.datas = data
    // }
  }
  
  export const actions = {
    async postData({ commit }, form) {
      await this.$axios
        .post('http://localhost:7000/create-firstCheck', form)
        .then(() => {
          this.$toast.success('ບັນທືກຂໍ້ມູນສຳເລັດ', {
            duration: 2000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'check',
          })
        })
        .catch(() => {
          this.$toast.error('ບັນທືກບໍ່ຂໍ້ມູນສຳເລັດ', {
            duration: 2000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'close',
          })
        })
    },
    async getAll({ commit }) {
      await this.$axios.get(`http://localhost:7000/get-firstCheck`).then((storeData) => {
        commit('getData', storeData.data)
      })
    },
  }
  