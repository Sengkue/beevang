export const state = () => ({
    all: [],
    customer_id:null
 
  })
  
  export const mutations = {
    setAll(state, data) {
      state.all = data
    },
    setCustomer_id(state, data){
        state.customer_id = data
    }
  }
  
  export const actions = {
    async selectAll({ commit }) {
      try {
        await this.$axios
          .get('http://localhost:2023/customer')
          .then((data) => {
            commit('setAll', data.data.rows)
            console.log('setAll', data.data)
          })
      } catch (error) {
        console.log(error)
      }
    }}
  