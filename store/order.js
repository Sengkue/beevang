export const state = () => ({
    dataMedicines: [],
  })
  export const mutations = {
    getMedicines(state, data) {
      state.dataMedicines = data
    }
  }
  
  export const actions = {
    async getAll({ commit }) {
      await this.$axios.get(`http://localhost:7000/getMedicines`).then((medicines) => {
        commit('getMedicines', medicines.data)
        console.log('>>>>>>>>>>>>',medicines.data)
      })
    },
  }
  