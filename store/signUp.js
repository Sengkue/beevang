export const state = () => ({
  dataPatients: [],
  singleData: [],
})
export const mutations = {
  getPatient(state, data) {
    state.dataPatients = data
  },
  getsingleData(state, data) {
    state.singleData = data
  },
}

export const actions = {
  async register({ commit }, form) {
    await this.$axios
      .post('http://localhost:7000/create-staff', form)
      .then((data) => {
        this.$router.redirect('login')
          this.$toast.success('ລົງທະບຽນສຳເລັດ', {
            duration:3000,
            position:'top-right',
            iconPack:'mdi',
            icon:'check'
          })
      })
      .catch(() => {
        this.$toast.error('ກະລຸນາປ້ອນຂໍ້ມູນ?',{
          duration:3000,
          position:'top-right',
          iconPack:'mdi',
          icon:'close'
        })
      })
  },
}
