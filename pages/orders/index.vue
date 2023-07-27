<template>
  <div>
    <v-card
      class="cyan accent-4 white--text mb-2 d-flex justify-center font-weight-bold container"
    >
      <h2>ກວດສອບຂໍ້ມູນສິນຄ້າ</h2>
    </v-card>
    <v-card class="pa-10">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchTerm"
            prepend-inner-icon="mdi-magnify"
            label="ຄົ້ນຫາ"
            outlined
            hide-details
            dense
            small
            color="#9155FD"
            class="mb-2"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="supId"
            :items="supData"
            item-text="name"
            item-value="id"
            outlined
            dense
            hide-details="auto"
            label="ຜູ້ສະໜອງ"
            return-object
            color="success"
          ></v-select>
        </v-col>
      </v-row>

      <v-col>
        <v-data-table
          v-model="selectedItems"
          :items="orderData"
          :headers="headers"
          show-select
          :search="searchTerm"
          item-key="id"
        >
          <template #[`item.indx`]="{ index }">
            {{ index + 1 }}
          </template>
          <template #[`item.sale_price`]="{ item }">
            <span style="color: red">{{
              toCurrencyString(item.sale_price)
            }}</span>
          </template>
        </v-data-table>
      </v-col>

      <v-divider></v-divider>
    </v-card>
    <v-row class="mt-3 mb-8">
      <v-col cols="12" class="text-end">
        <v-btn
          color="cyan accent-4 white--text"
          :loading="loading"
          @click="getSelectedItems"
        >
          <span>ບັນທຶກການສັ່ງຊື້</span>
          <v-icon>mdi-content-save-check-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="800px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> ລາຍການສັ່ງຊື້ສິນຄ້າ </v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="selectedItems">
            <template #[`item.indx`]="{ index }">
              {{ index + 1 }}
            </template>
            <template #[`item.quatity`]="{ item }">
              <v-text-field
                v-model="item.quatity"
                type="number"
                hide-details="auto"
                dense
                style="width: 50px"
              ></v-text-field>
            </template>
            <template #[`item.price`]="{ item }">
              <span style="color: red">{{ toCurrencyString(item.price) }}</span>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red "
            :loading="loading"
            outlined
            @click="dialog = false"
            >ຍົກເລີກ</v-btn
          >
          <v-btn color="cyan accent-4 white--text" @click="order">ບັນທຶກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'OrderPages',
  data() {
    return {
      loading: false,
      supId: '',
      token: this.$cookies.get('token'),
      amount: [],
      selectedItems: [],
      orderData: [],
      supData: [],
      value: null,
      value1: null,
      searchTerm: '',
      dialog: false,
      showAddDialog: false,
      search: '',
      data: [],
    }
  },
  computed: {
    headers() {
      return [
        { text: 'ລຳດັບ', value: 'indx' },
        { text: 'ປະເພດສິນຄ້າ ', value: 'product_type_name' },
        { text: 'ຊື່ສິນຄ້າ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'quatity' },
        { text: 'ລາຄາຂາຍ', value: 'sale_price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit_name' },
      ]
    },
    TotalAmount() {
      return this.selectedItems.reduce(
        (num, item) => num + item.price * item.quatity,
        0
      )
    },
    TotalQuantity() {
      return this.selectedItems.reduce(
        (num, item) => num + parseInt(item.quatity),
        0
      )
    },
  },
  async mounted() {
    await this.$axios.get('http://localhost:2023/Product').then((res) => {
      this.orderData = res.data
    })

    await this.$axios.get('http://localhost:2023/supplier').then((res) => {
      this.supData = res.data.rows
    })
  },
  methods: {
    async order() {
      if (this.supId === null || this.supId === '') {
        this.$toast.error('ເລືອກຂໍ້ມູນຜູ້ສະໜອງກ່ອນ!')
        return
      }
      this.loading = true
      const orderItems = this.selectedItems.map((item) => {
        return {
          // order_id: '',
          product_id: item.id,
          order_qty: parseInt(item.quatity),
          total_price: item.price,
          order_details_date: new Date().toISOString(),
        }
      })
      const data = {
        supllier_id: this.supId.id,
        order_qty: this.TotalQuantity,
        total_price: this.TotalAmount,
        item: orderItems,
      }
      await this.$axios
        .post('http://localhost:2023/order', data, {
          headers: {
            Authorization: `LMCOMPUTER ${this.token}`,
          },
        })
        .then((res) => {
          // this.$router.push('/orders/historyOrder')
          this.$toast.success('ສັ່ງຊື້ສຳເລັດ')
        })
        .catch(() => {
          this.$toast.error('ສັ່ງຊື້ບໍ່ສຳເລັດ')
        })
      this.loading = false
      this.dialog = false
      this.selectedItems = []
      this.supId = null
    },
    // onAmountEdit(item) {
    //   console.log(`Edited amount value: ${item.amount}`)
    // },
    showData() {
      this.dialog = false
      this.$refs.anyName.reset()
    },
    getSelectedItems() {
      this.dialog = this.toCurrencyString
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
  },
}
</script>
<style scoped>
.font {
  font-family: 'Noto Serif Lao', serif;
}
</style>
