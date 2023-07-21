<template>
  <div>
    <div class="d-flex justify-space-between">
      <h3>ລາຍງານ >> ຂໍ້ມູນສິນຄ້າທີຂາຍໄດ້ຫຼາຍ</h3>
      <v-btn color="error" to="/reports/reportTable">
        <v-icon>mdi-arrow-left-circle</v-icon> ກັບ
      </v-btn>
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
      <template #[`item.Sale_qty`]="{ item }">
        {{ item.Sale_qty }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
      { text: 'ລຳດັບ', value: 'index', width: '50' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ປະເພດສິນຄ້າ', value: 'product_type_name' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit_name' },
        { text: 'ຈຳນວນຂາຍ', value: 'Sale_qty' },
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
        .get('http://localhost:2023/reports/top-sale')
        .then((response) => {
          this.products = response.data.map((item, index) => {
            return {
                index: index + 1,
              product_type_name: item.product_type_name,
              unit_name: item.unit_name,
              name: item.name,
              Sale_qty: item.Sale_qty,
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
