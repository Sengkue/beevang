export const state = () => ({
  dataPatients: [],
  singleData: [],
  dataId:'',
  status:[],
})
export const mutations = {
  getPatient(state, data) {
    state.dataPatients = data
  },
  getStatus(state, data) {
    state.status = data
  }
  ,
  getsingleData(state, data) {
    state.singleData = data
  },
  getDataId(state, data) {
    state.dataId = data
  }
}

export const actions = {
  // post data
  async postData({ commit }, form) {
    await this.$axios
      .post('http://localhost:7000/create-patients', form)
      .then(() => {
        this.$toast.success('ບັນທືກຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      }).catch(() => {
        this.$toast.error('ບັນທືກບໍ່ຂໍ້ມູນສຳເລັດ?', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  // get data
  async patientInfo({ commit }) {
    await this.$axios
      .get('http://localhost:7000/get-patients')
      .then((patients) => {
        commit('getPatient', patients.data)
      })
  },
  async patientStatus({ commit }) {
    await this.$axios
      .get('http://localhost:7000/get-status')
      .then((status) => {
        commit('getStatus', status.data)
        console.log("data?????", status.data)
      })
  },
  // delete data
  async deleteData({ commit }, id) {
    await this.$axios
      .delete(`http://localhost:7000/delete-patients/${id}`)
      .then(() => {
        this.$toast.success('ລືບຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
  },
  // update data
  async updateData({ commit }, dataPatients) {
    const data1 = dataPatients.data
    const id = dataPatients.id
    await this.$axios
      .put(`http://localhost:7000/update-patients/${id}`, data1)
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
  },
}
