<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="filteredCustomers"
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
            placeholder="ຄົ້ນຫາຂໍ້ມູນລູກຄ້າ"
          ></v-text-field>
        </template>
        <template #[`item.createdAt`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
        <template #[`item.updatedAt`]="{ item }">
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
        customers: [],
        filteredCustomers: [],
        search: '',
        headers: [
          { text: 'ຊື່ລູກຄ້າ', value: 'Fname' },
          { text: 'ນາມສະກຸນ', value: 'Lname' },
          { text: 'ເພດ', value: 'gender' },
          { text: 'ບ້ານ', value: 'village' },
          { text: 'ແຂວງ', value: 'province' },
          { text: 'ເບີໂທລະສັບ', value: 'tel' },
          { text: 'ອີເມວ', value: 'email' },
          { text: 'ວັນທີສ້າງ', value: 'createdAt' },
          { text: 'ວັນທີປັບປຸງ', value: 'updatedAt' }
        ]
      };
    },
    created() {
      this.fetchCustomers();
    },
    methods: {
      fetchCustomers() {
        axios
          .get('http://localhost:2023/search/search-customer')
          .then(response => {
            this.customers = response.data;
            this.filteredCustomers = response.data;
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
  