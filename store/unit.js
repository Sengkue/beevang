export const state = () => ({
    UnitData: [],
  })
  
  export const mutations = {
    setUnit(state, data) {
      state.UnitData = data
    }
  }
  
  export const actions = {
    async createUnit({ commit }, data) {
      try {
        await this.$axios
          .post('http://localhost:2023/Unit', data)
          .then((res) => {
            this.$toast.success('ບັນທຶກສຳເລັດ', {
              duration: 3000,
              position: 'top-right',
              iconPack: 'mdi',
              icon: 'check',
            })
          })
          .catch(() => {
            this.$toast.error('ບັນທຶກບໍ່ສຳເລັດ', {
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
    async getAll({ commit }) {
      try {
        await this.$axios
          .get('http://localhost:2023/Unit')
          .then((data) => {
            commit('setUnit', data.data)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteData({ commit }, id) {
      await this.$axios
        .delete(`http://localhost:2023/Unit/${id}`)
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
    async updateData({ commit }, dataUnit) {
      const data = dataUnit.data
      const id = dataUnit.id
      await this.$axios
        .put(`http://localhost:2023/Unit/${id}`, data)
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
  