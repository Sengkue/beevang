export const state = () => ({
  dataStaff: [],
})
export const mutations = {
  getStaff(state, data) {
    state.dataStaff = data
  },
}

export const actions = {
  async staffInfo({ commit }) {
    await this.$axios
      .get('http://localhost:2023/employee')
      .then((statffData) => {
        commit('getStaff', statffData.data)
        console.log(statffData.data)
      })
  },
  async deleteData({ commit }, id) {
    await this.$axios
      .delete(`http://localhost:2023/employee/${id}`)
      .then(() => {
        this.$toast.success('ລືບຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ລືບບໍ່ສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async postData({ commit }, form) {
    await this.$axios
      .post('http://localhost:2023/employee', form)
      .then((data) => {
        this.$toast.success('ບັນທືກຂໍ້ມູນສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ກະລຸນາປ້ອນຂໍ້ມູນ?', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async updateData({commit},info) {
    const data = info.data
    const id = info.id
    await this.$axios
      .put(`http://localhost:2023/employee/${id}`, data)
      .then(() => {
        this.$toast.success('ເເກ້ໄຂຂໍ້ມູນສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ບໍ່ສາມາດເເກ້ໄຂຂໍ້ມູນ?', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  }
}
