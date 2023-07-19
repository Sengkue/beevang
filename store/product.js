export const state = () => ({
  productTypeData: [],
  unitData:[],
  supplierData:[],
  productData:[]
})

export const mutations = {
  setProductType(state, data) {
    state.productTypeData = data
  },
  setUnit(state, data) {
    state.unitData = data
  },
  setSuppliers(state, data) {
    state.supplierData = data
  },
  setProducts(state,data) {
    state.productData = data
  }
}

export const actions = {
  async createProduct({ commit }, data) {
    try {
      await this.$axios
        .post('http://localhost:2023/Product', data)
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
        .get('http://localhost:2023/productType')
        .then((data) => {
          commit('setProductType', data.data)
        })
    } catch (error) {
      console.log(error)
    }
  },
  async getUnit({ commit }) {
    try {
      await this.$axios.get('http://localhost:2023/Unit').then((data) => {
        commit('setUnit', data.data)
      })
    } catch (error) {
      console.log(error)
    }
  },
  async getAllData({ commit }) {
    await this.$axios
      .get(`http://localhost:2023/supplier`)
      .then((res) => {
        commit('setSuppliers', res.data)
        console.log(res.data)
      })
  },
  async getProductData({ commit }) {
    await this.$axios
      .get(`http://localhost:2023/Product`)
      .then((res) => {
        commit('setProducts', res.data)
      })
  },
  async deleteData({ commit }, id) {
    await this.$axios
      .delete(`http://localhost:2023/Product/${id}`)
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
  async updateData({ commit }, product) {
    const data = product.data
    const id = product.id
    await this.$axios
      .put(`http://localhost:2023/Product/${id}`, data)
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
