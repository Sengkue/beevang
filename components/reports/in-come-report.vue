<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="filteredIncome"
        item-key="id"
        :search="search"
        :footer-props="{
          itemsPerPageOptions: [5, 10, 20, -1],
          showCurrentPage: true,
          showFirstLastPage: true
        }"
      >
        <template #top>
          <v-text-field
            v-model="search"
            label="ຄົ້ນຫາ"
            clearable
            solo-inverted
            hide-details
            placeholder="ຄົ້ນຫາຂໍ້ມູນລາຍຮັບ"
          ></v-text-field>
        </template>
        <template #[`item.createdAt`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
        <template #[`item.updatedA`]="{ item }">
          {{ formatDate(item.updatedAt) }}
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        income: [],
        filteredIncome: [],
        search: '',
        headers: [
        { text: 'ລຳດັບ', value: 'index', align: 'start', width: '50' },
        { text: 'ຊື່', value: 'productName', align: 'start', },
        { text: 'ຈຳນວນຂາຍ', value: 'totalQuantity', align: 'start', },
        { text: 'ເງິນ', value: 'totalSalePrice', align: 'start'}
        ]
      };
    },
    created() {
      this.fetchIncome();
    },
    methods: {
      fetchIncome() {
        axios
          .get('http://localhost:2023/sale_detail/summaryAllTime?limit=1000')
          .then(response => {
            this.income = response.data;
            this.filteredIncome = response.data.result.map((item, index)=>{
              return {
                index: index + 1,
                ...item
              }
            });
          })
          .catch(error => {
            this.$toast.error(error);
          });
      },
      formatDate(date) {
        return new Date(date).toLocaleString();
      }
    }
  };
  </script>
  
  <style>
  /* Add any custom styles for the component here */
  </style>
  