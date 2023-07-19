export const state = () => ({})
export const mutations = {}

export const actions = {
  async signIn({ commit }, form) {
    await this.$axios
      .post('http://localhost:2023/employee/signIn', form)
      .then((data) => {
        // console.log(data.data)
        const tokens = data.data.token
        const data1 = JSON.parse(
          Buffer.from(tokens.split('.')[1], 'base64').toString()
        )
        // console.log(data1)
        this.$cookies.set('first_name', data1.FIRST_NAME)
        this.$cookies.set('id', data1.id)
        this.$cookies.set('last_name', data1.LAST_NAME)
        this.$cookies.set('gender', data1.GENDER)
        this.$cookies.set('tel', data1.TEL)
        this.$cookies.set('address', data1.ADDRESS)
        this.$cookies.set('token', data.data.token)
        this.$router.push('/')
        this.$toast.success('ເຂົ້າສູ່ລະບົບສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ເບີໂທລະສັບ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
}
