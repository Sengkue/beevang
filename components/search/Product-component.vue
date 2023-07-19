<template>
  <div>
    <v-text-field v-model="searchQuery" type="text" placeholder="Search" outlined hide-details dense />
    <table>
      <thead>
        <tr>
          <th>ຊື່ສິນຄ້າ</th>
          <th>ຈຳນວນ</th>
          <th>ລາຄາຂາຍ</th>
          <th>Barcode</th>
          <th>ລາຄາ</th>
          <th>ສ້າງ</th>
          <th>ປະເພດ</th>
          <th>ຫົວໜ່ວຍ</th>
          <th>ຜູ້ສະໜອງ</th>
          <th>ທີຢູ່</th>
          <th>ເບີ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.quatity }}</td>
          <td>{{ product.sale_price }}</td>
          <td>{{ product.barcode }}</td>
          <td>{{ product.price }}</td>
          <td>{{ formatDateBill(product.createdAt) }}</td>
          <td>{{ product.product_type_name }}</td>
          <td>{{ product.unit_name }}</td>
          <td>{{ product.supplier_name }}</td>
          <td>{{ product.address }}</td>
          <td>{{ product.tel }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="showFooter">
      <button  :disabled="currentPage === 1" @click="previousPage">ກັບໜ້າ</button>
      <button  :disabled="currentPage === totalPages" @click="nextPage">ໜ້າທັກໄປ</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10, // Set the number of items per page
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    showFooter() {
      return this.filteredProducts.length > this.itemsPerPage;
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetch('http://localhost:2023/Product')
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        })
        .catch((error) => {
          this.$toast.success('Error fetching products:', error);
        });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
/* Add any necessary styles here */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

input[type='text'] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  margin: 5px;
}
</style>
