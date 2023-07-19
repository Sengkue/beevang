<template>
  <div>
    <div class="d-flex justify-space-between">
      <h3>ລາຍງານ >> ລາຍງານລູກຄ້າ</h3>
      <v-btn color="error" to="/reports/reportTable"><v-icon >mdi-arrow-left-circle</v-icon> ກັບ</v-btn>

    </div>

    <v-data-table :headers="headers" :items="customers" :search="search" class="elevation-1">
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>ລາຍການລູກຄ້າ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="ຄົ້ນຫາ" single-line hide-details></v-text-field>
        </v-toolbar>
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
export default {
  data() {
    return {
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່ລູກຄ້າ', value: 'fullname' },
        { text: 'ເພດ', value: 'gender' },
        { text: 'ບ້ານ', value: 'village' },
        { text: 'ແຂວງ', value: 'province' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ອີເມລ', value: 'email' },
        { text: 'ວັນທີລົງທະບຽນ', value: 'createdAt' },
        { text: 'ວັນທີປັບປຸງ', value: 'updatedAt' },
      ],
      customers: [],
      search: '',
    };
  },
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      this.$axios
        .get('http://localhost:2023/reports/customer')
        .then((response) => {
          this.customers = response.data.map((item, index) => {
            return {
              index: index + 1,
              fullname: `${item.Fname} ${item.Lname}`,
              ...item,
            };
          });
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    formatDate(date) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
    },
  },
};
</script>

<style scoped>
/* Add any custom styling for the table here */
</style>
