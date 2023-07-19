export const state = () => ({
  suppliersData:[]
})
export const mutations = {
  setSuppliers(state, data) {
    state.suppliersData = data
  }
}

export const actions = {
  // post
  async postData({ commit }, form) {
    await this.$axios
      .post(`http://localhost:2023/supplier`, form)
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
  // get data
  async getAllData({ commit }) {
    await this.$axios
      .get(`http://localhost:2023/supplier`)
      .then((res) => {
        commit('setSuppliers', res.data)
        console.log(res.data)
      })
  },
  // delete data
  async deleteData({ commit }, id) {
    await this.$axios
      .delete(`http://localhost:2023/supplier/${id}`)
      .then(() => {
        this.$toast.success('ລືບຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ລືບຂໍ້ມູນບໍ່ສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async updateData({ commit }, dataSupplier) {
    const data = dataSupplier.data
    const id = dataSupplier.id
    await this.$axios
      .put(`http://localhost:2023/supplier/${id}`,data)
      .then(() => {
        this.$toast.success('ແກ້ໄຂຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ແກ້ໄຂບໍ່ຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
}
