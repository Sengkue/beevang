export const state = () => ({
  dataDisase: [],
  datas:[]
})
export const mutations = {
  getDiseas(state, data) {
    state.dataDisase = data
  },
  getSingData(state, data) {
    state.datas = data
  }
}

export const actions = {
  async postDiseas({ commit }, form) {
    await this.$axios
      .post('http://localhost:7000/create', form)
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
    await this.$axios.get(`http://localhost:7000/get-all`).then((diseas) => {
      commit('getDiseas', diseas.data)
      console.log('>>>>>>>>>>>>',diseas.data.rows)
    })
  },
  async getSingData({ commit }) {
    await this.$axios.get(`http://localhost:7000/get-all`).then((diseas) => {
       commit('getSingData', diseas.data.rows)
       console.log('>>>>>>>>>>>>',diseas.data.rows)
    })
  },
  async deleteData({ commit }, id) {
    await this.$axios
      .delete(`http://localhost:7000/delete/${id}`)
      .then(() => {
        this.$toast.success('ລືບຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ລືບບໍ່ຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async updateData({commit},dataDisease) {
    const data1 = dataDisease.data
    const id = dataDisease.id
    await this.$axios
      .put(`http://localhost:7000/update/${id}`, data1)
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
