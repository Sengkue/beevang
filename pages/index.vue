<template>
  <div>
    <v-row>
      <v-col cols="4" class="ma-0">
        <v-card height="70" class="pa-2 d-flex justify-space-between pr-5" elevation="0"
          >ສິນຄ້າໃກ້ໝົດສະຕ໊ອກ
              <v-btn text small fab color="success">
                <v-badge :content="sell" color="error">
                  <v-icon>mdi-bell-plus-outline</v-icon>
                </v-badge></v-btn
              >
        </v-card>
      </v-col>
      <v-col cols="4" class="ma-0">
        <v-card height="70" class="pa-2 d-flex justify-space-between" elevation="0"
          >ຍອດຂາຍທັງໝົດຂອງເດືອນ {{selectedMonth }} ໃນປີ {{  selectedYear }}
              <v-btn class="cyan accent-4 white--text mt-5" rounded
                ><span style="color: white"
                  >{{ formatPrice(topSell? topSell.totalSalePrice : '0') }}ກີບ</span
                ></v-btn
              >
        </v-card>
      </v-col>
      <v-col cols="4" class="ma-0">
        <v-card height="70" class="pa-2 d-flex justify-space-between" elevation="0"
          >ຍອດຂາຍທັງໝົດຂອງປີ {{ selectedYear }}
              <v-btn class="cyan accent-4 white--text mt-5" rounded
                ><span style="color: white"
                  >{{ formatPrice(topSellYear ? topSellYear.totalSalePrice : '0') }}ກີບ</span
                ></v-btn
              >
        </v-card>
      </v-col>
      <v-col cols="4" class="ma-0">
        <v-card height="70" class="pa-2 d-flex justify-space-between" elevation="0"
          >ພະນັກງານທັງໝົດ
              <v-btn class="cyan accent-4 white--text mt-5" rounded
                ><span style="color: white"
                  >{{ staff.count ? staff.count : '0' }}ຄົນ</span
                ></v-btn
              >
        </v-card>
      </v-col>
      <v-col cols="4" class="ma-0">
        <v-card
          height="70"
          class=" pa-2 d-flex justify-space-between"
          elevation="0"
        >
          <div>ລູກຄ້າ</div>
          <v-btn class="cyan accent-4 white--text mt-5" rounded>{{ customer.length }}ຄົນ</v-btn>
        </v-card>
      </v-col>
      <v-col cols="4" class="ma-0">
        <v-card
          height="70"
          class="pa-2 d-flex justify-space-between"
          elevation="0"
          style="cursor: pointer"
          >ປະເພດສິນຄ້າທັງໝົດ
          <v-btn class="cyan accent-4 white--text mt-5" rounded
            ><span style="color: white">{{
              getProductType.count ? getProductType.count : '0'
            }}ປະເພດ</span></v-btn
          >
        </v-card>
      </v-col>
      <v-col cols="6">
        <home-top-product-graph-year />
      </v-col>
      <v-col cols="6">
        <home-top-product-graph />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'Homepages',
  middleware: 'auth',
  data() {
    return {
      interval: {},
      value: 0,
      topSell:null,
      selectedYear:null,
      selectedMonth:null,
      topSellYear:null,
      sell:null
    }
  },
  // beforeUnmount() {
  //   clearInterval(this.interval)
  // },
  computed: {
    getProductType() {
      return this.$store.state.productType.productTypeData
    },
    staff() {
      return this.$store.state.staff.dataStaff
    },
    customer() {
      return this.$store.state.customer.all
    },
    // countShow() {
    //  return this.$store.state.user.dataCount
    // },
    // showPatients() {
    //   return this.$store.state.user.Patients
    // },
    // showPatiented() {
    //   return this.$store.state.user.Patiented
    // }
  },
  mounted() {
    this.$store.dispatch('staff/staffInfo')
    this.$store.dispatch('productType/getAll')
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
    this.$store.dispatch('customer/selectAll')
    const currentDate = new Date()
    this.selectedMonth = currentDate.getMonth() + 1
    this.selectedYear = currentDate.getFullYear()
    this.$axios.get(`http://localhost:2023/sale_detail/summary/month?month=${this.selectedMonth}&year=${this.selectedYear}&limit=10`).then((res)=>{
      this.topSell = res.data.overallSum
    })
    this.$axios.get(`http://localhost:2023/sale_detail/sale-details/summary?year=${this.selectedYear}&limit=10`).then((res)=>{
      this.topSellYear = res.data.overallSum
    })
    this.$axios.get(`http://localhost:2023/product/almost-out-of-stock`).then((res)=>{
      this.sell = res.data.count
    })
    // await this.$store.dispatch('user/getPatiented')
  },
}
</script>
