<template>
  <div>
    <div class="d-flex justify-space-between">
      <h3>ລາຍງານ >> ລາຍງານສິນຄ້າໃກ້ຈະໜົດ</h3>
      <v-btn color="error" to="/reports/reportTable"
        ><v-icon>mdi-arrow-left-circle</v-icon> ກັບ</v-btn
      >
    </div>
    <v-data-table
      :headers="headers"
      :items="products"
      :search="search"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>ລາຍການສິນຄ້າ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ຄົ້ນຫາ"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template #[`item.sale_price`]="{ item }">
        {{ formatPrice(item.sale_price) }}ກີບ
      </template>
      <template #[`item.price`]="{ item }">
        {{ formatPrice(item.price) }}ກີບ
      </template>
      <template #[`item.created_at`]="{ item }">
        {{ formatDateLo(item.created_at) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ຈຳນວນ', value: 'all_quatity' },
        { text: 'ລາຄາຂາຍ', value: 'sale_price' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ປະເພດສິນຄ້າ', value: 'product_type_name' },
        { text: 'ວັນທີສ້າງ', value: 'created_at' },
      ],
      products: [],
      search: '',
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      this.$axios
        .get('http://localhost:2023/reports/product')
        .then((response) => {
          this.products = response.data.map((item, index) => {
            return {
              index: index + 1,
              ...item,
            }
          })
        })
        .catch((error) => {
          this.$toast.error(error)
        })
    },
  },
}
</script>

<style scoped>
/* Add any custom styling for the table here */
</style>
