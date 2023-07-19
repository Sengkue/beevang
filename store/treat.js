export const state = () => ({
  bill: {},
  billData: {},
  medicinesType: [],
  medicines: [],
})

export const mutations = {
  setBill(state, data) {
    state.bill = data
  },
  setBillData(state, data) {
    state.billData = data
  },
  setMedicinesType(state, data) {
    state.medicinesType = data
  },
  setMedicines(state, data) {
    state.medicines = data
  },
}

export const actions = {
  async createTreat({ commit }, data) {
    const res = {
      firstcheck_id: data.firstcheck_id,
      total_price: data.total_price,
    }
    //   await console.log(res)
    const billId = await this.$axios
      .post('http://localhost:7000/create-bill', { ...res })
      .then((res) => {
        return res.data.id
      })
      .catch((err) => {
        console.log(err)
      })

    if (billId) {
      const itemBillId = {
        bill_id: billId,
        item: data.item,
      }
      console.log('bill id', itemBillId)
      await this.$axios
        .post('http://localhost:7000/post-data', itemBillId)
        .then((res) => {
          //   console.log(res.data)
        })

      await this.$axios
        .get(`http://localhost:7000/bill-data/${billId}`)
        .then((res) => {
          //   console.log(res.data)
          commit('setBill', res.data)
        })
    }
  },
  async getMedicines({ commit }, id) {
    await this.$axios
      .get(`http://localhost:7000/bill-data/${id}`)
      .then((res) => {
        // conso/le.log(res.data)
        commit('setBillData', res.data)
      })
  },
  async getMedicinesType({ commit }) {
    await this.$axios.get('http://localhost:7000/get-medicins').then((res) => {
      commit('setMedicinesType', res.data)
      console.log(res.data)
    })
  },
  async getMedicinesAllById({ commit }, id) {
    try {
      await this.$axios
        .get(`http://localhost:7000/get-id/${id}`)
        .then((res) => {
          // console.log(res.data)
          commit('setMedicines', res.data)
        })
    } catch (error) {
      console.log(error)
    }
  },
  async saveOffer({ commit }, data) {
    await this.$axios
      .post('http://localhost:7000/createOffer', data)
      .then(() => {
        this.$toast.success('ວາງຢາສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ວາງຢາບໍ່ສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
}
