<template>
  <div>
    <v-card
      class="cyan accent-4 white--text mb-2 d-flex justify-center font-weight-bold container"
    >
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
        <v-text-field
          v-model="search"
          label="ຄົ້ນຫາ"
          outlined
          dense
          hide-details
          placeholder="Enter date/time or bill order"
        ></v-text-field>
      </template>
      <template #[`item.order_date`]="{ value }">
        <div>{{ formatDateLo(value) }}</div>
      </template>
      <template #[`item.order_details_price`]="{ value }">
        {{ formatPrice(value) }} ກີບ
      </template>
      <template #[`item.status`]="{ value }">
        <div v-if="value === 1" class="red--text">ລໍຖ້ານຳເຂົ້າ...</div>
      </template>
      <template #[`item.actions`]="{ item }">
        <div>
          <v-btn text icon @click="review(item)"
            ><v-icon>mdi-eye</v-icon></v-btn
          >
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="openDetail" max-width="600px">
      <v-card class="pa-5">
        <div>
          <!-- <div><strong>ລະຫັດສິນຄ້າ:</strong> {{ detailData.product_id }}</div> -->
          <div class="d-flex justify-space-between">
            <div><strong>ເລກທີບິນ:</strong> {{ detailData.bill_number }}</div>
            <div>
              <strong>ສະຖານະ:</strong>
              <span v-if="detailData.status === 1" class="red--text"
                >ລໍຖ້ານຳເຂົ້າ...</span
              >
            </div>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex justify-space-between">
            <div>
              <strong>ຊື່ພະນັກງານ:</strong> {{ detailData.employee_name }}
            </div>
            <div>
              <strong>ຊື່ຜູ້ສະໜອງ:</strong> {{ detailData.supplier_name }}
            </div>
          </div>
          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-space-between">
            <div><strong>ສິນຄ້າ:</strong> {{ detailData.name }}</div>
            <div><strong>ປະເພດສິນຄ້າ:</strong> {{ detailData.type_name }}</div>
          </div>
          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-space-between">
            <div><strong>ຈຳນວນ</strong> {{ detailData.qty_small }}</div>

            <div><strong>ຫົວໜ່ວຍ:</strong> {{ detailData.unit_name }}</div>
          </div>
          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-space-between">
            <div>
              <strong>ວັນທີ່ສັ່ງຊື້:</strong>
              {{ formatDate(detailData.order_date) }}
            </div>
          </div>
          <!-- <div class="d-flex justify-space-between">
            <div>
              <strong>ລາຄາລວມ:</strong>
              {{ formatPrice(detailData.order_details_price) }} ກີບ
            </div>
            <div>
              <strong>ລວມທັງໝົດ:</strong>
              {{ formatPrice(detailData.total_price) }} ກີບ
            </div>
          </div> -->
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="openDetail = false">
            <v-icon>mdi-close</v-icon> ປິດ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      detailData: {},
      openDetail: false,
      orders: [],
      headers: [
        { text: 'ໃບບິນ', value: 'bill_number' },
        { text: 'ພະນັກງາຍ', value: 'employee_name' },
        { text: 'ຜູ້ສະໜອງ', value: 'supplier_name' },
        // { text: 'ສີນຄ້າ', value: 'name' },
        // { text: 'ຈຳນວນສັ່ງຊື້', value: 'order_qty' },
        // { text: 'ຫົວໜ່ວຍ', value: 'unit_name' },
        // { text: 'ລາຄາ', value: 'order_details_price' },
        { text: 'ສະຖານະ', value: 'status' },
        {
          text: 'ວັນທີ່ສັ່ງຊື້',
          value: 'order_date',
          align: 'center',
          sortable: false,
        },
        { text: 'ຈັດການ', value: 'actions' },
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
    review(item) {
      this.detailData = item
      this.openDetail = true
    },
    async fetchOrders() {
      try {
        this.loading = true
        const response = await axios.get('http://localhost:2023/order', {
          params: {
            search: this.search,
          },
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

