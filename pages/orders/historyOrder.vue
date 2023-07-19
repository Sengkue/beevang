<template>
  <div>
    <v-card class="cyan accent-4 white--text mb-2 d-flex justify-center font-weight-bold container">
      <h2>ປະຫວັດຂໍ້ມູນສັ່ງຊື້ສິນຄ້າ</h2>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="orders"
      :search="search"
      class="elevation-1"
      :footer-props="{ 'items-per-page-options': [10, 20, 30] }"
      :loading="loading"
      :no-results-text="noResultsText"
    >
    <template #top>
      <v-text-field v-model="search" label="ຄົ້ນຫາ" outlined dense hide-details placeholder="Enter date/time or bill order"></v-text-field>
    </template>
      <template #[`item.order_date`]="{ value }">
        <div>{{ formatDateLo(value) }}</div>
      </template>
      <template #[`item.status`]="{ value }">
        <div v-if="value === 1" class="red--text">ລໍຖ້ານຳເຂົ້າ...</div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      orders: [],
      headers: [
        { text: 'ໃບບິນ', value: 'bill_number' },
        { text: 'ສີນຄ້າ', value: 'name' },
        { text: 'ຈຳນວນສັ່ງຊື້', value: 'order_qty' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit_name' },
        { text: 'ລາຄາ', value: 'order_details_price' },
        { text: 'ສະຖານະ', value: 'status' },
        { text: 'ວັນທີ່ສັ່ງຊື້', value: 'order_date', align: 'center', sortable: false },
      ],
      search: '',
      loading: false,
      noResultsText: 'ບໍ່ມີຂໍ້ມູນທີ່ຄົ້ນຫາ',
    }
  },
  mounted() {
    this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      try {
        this.loading = true
        const response = await axios.get('http://localhost:2023/order', {
          params: {
            search: this.search
          }
        })
        this.orders = response.data
      } catch (error) {
        this.$toast.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style>
/* Your table styles go here */
</style>
