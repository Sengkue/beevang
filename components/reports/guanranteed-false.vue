<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-menu offset-y>
              <template #activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Exports
                </v-btn>
              </template>
              <v-list class="py-0">
                <v-btn block text color="success" @click="exportToExcel">
                  <v-icon left>mdi-microsoft-excel</v-icon> excel
                </v-btn>
                <v-btn block text color="primary" @click="printOut">
                  <v-icon>mdi-printer</v-icon> print
                </v-btn>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="filteredIncome"
      item-key="id"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20, -1],
        showCurrentPage: true,
        showFirstLastPage: true,
      }"
    >
      <template #[`item.Totalkip`]="{ item }">
        {{ formatPrice(item.Totalkip) }} ກີບ
      </template>
      <!-- <template #[`item.Date_expired`]="{ item }">
        {{ formatAndCalculateDaysToExpiration(item.Date_expired) }}
      </template> -->
      <template #[`item.Sale_detail_date`]="{ item }">
        {{ formatDateLo(item.Sale_detail_date) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: null,
      endDate: null,
      modalStart: false,
      modalEnd: false,
      income: [],
      filteredIncome: [],
      headers: [
      
        { text: 'ລຳດັບ', value: 'index', align: 'start' },
        { text: 'ສິນຄ້າ', value: 'productIdName', align: 'start' }, // Added column for productIdName
        { text: 'ລະຫັດສິນຄ້າ', value: 'productId', align: 'start' }, // Added column for productId
        { text: 'ເງິນ', value: 'Totalkip', align: 'start' },


        { text: 'ວັນທີຊື້', value: 'Sale_detail_date', align: 'start' },
        // { text: 'ຮັບປະກັນຮອດວັນທີ', value: 'Date_expired', align: 'start' }
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.get('http://localhost:2023/sale_detail/guanranteed/product?guaranteed=false');
        this.income = response.data;
        this.filteredIncome = response.data.map((item, index)=>{
          return {
            index: index + 1,
            ...item
          }
        });
      } catch (error) {
        this.$log.error('Error fetching data:', error);
      }
    },
    // ... (your other methods) ...
  },
};
</script>
