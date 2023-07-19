<template>
  <div>
    <v-text-field
      v-model="search"
      label="Search"
      clearable
      solo-inverted
      @input="filterEmployees"
    />
    <v-data-table :headers="headers" :items="filteredEmployees" item-key="id">
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
      employees: [],
      filteredEmployees: [],
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Gender', value: 'gender' },
        { text: 'Address', value: 'address' },
        { text: 'Telephone', value: 'tel' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Updated At', value: 'updatedAt' },
      ],
    }
  },
  created() {
    this.fetchEmployees()
  },
  methods: {
    fetchEmployees() {
      this.$axios
        .get('http://localhost:2023/search/search-employee')
        .then((response) => {
          this.employees = response.data
          this.filteredEmployees = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    filterEmployees() {
      this.filteredEmployees = this.employees.filter((employee) => {
        const searchLower = this.search.toLowerCase()
        return (
          employee.first_name.toLowerCase().includes(searchLower) ||
          employee.last_name.toLowerCase().includes(searchLower) ||
          employee.address.toLowerCase().includes(searchLower) ||
          employee.tel.toLowerCase().includes(searchLower)
        )
      })
    },
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
  },
}
</script>

<style>
/* Add any custom styles for the component here */
</style>
