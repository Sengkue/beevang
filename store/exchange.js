export const state = () => ({
  exchange: [],
})

export const mutations = {
  setExchange(state, data) {
    state.exchange = data
  },
}

export const actions = {
  async getExchange({ commit }) {
    await this.$axios.get('http://localhost:2023/exchange').then((res) => {
      commit('setExchange', res.data)
    })
  },
}
