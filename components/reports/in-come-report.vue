<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-dialog
              ref="startDialog"
              v-model="modalStart"
              :return-value.sync="startDate"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  clearable
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalStart = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startDialog.save(startDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <div class="mt-8">>>>></div>
          <v-col cols="12" sm="6" md="4">
            <v-dialog
              ref="endDialog"
              v-model="modalEnd"
              :return-value.sync="endDate"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="End Date"
                  prepend-icon="mdi-calendar"
                  clearable
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalEnd = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.endDialog.save(endDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-card class="pa-3">
          <strong>ລວມເງິນທັງໝົດ:</strong> {{ totalKipSum.toLocaleString() }} ກີບ
        </v-card>
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
      <template #[`item.createdAt`]="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
      <template #[`item.updatedAt`]="{ item }">
        {{ formatDate(item.updatedAt) }}
      </template>
      <template #[`item.Totalkip`]="{ item }">
        {{ formatPrice(item.Totalkip) }} ກີບ
      </template>
      <!-- <template #[`item.actions`]="{ item }">
        <v-btn small text @click="review(item)">
          <v-icon color="primary">mdi-eye</v-icon>
        </v-btn>
      </template> -->
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
        { text: 'ລຳດັບ', value: 'index', align: 'start', width: '50' },
        { text: 'ຊື່ພະນັກງານ', value: 'employeeFirst_name', align: 'start' },
        { text: 'ຊື່ລູກຄ້າ', value: 'customerFname', align: 'start' },
        // { text: 'ຈຳນວນຂາຍ', value: 'totalQuantity', align: 'start' },
        { text: 'ເງິນ', value: 'Totalkip', align: 'start' },
        // { text: 'ເບິ່ງ', value: 'actions', align: 'start' },
      ],
    }
  },
  computed: {
    totalKipSum() {
      // Use reduce to sum the Totalkip values in the filteredIncome array
      return this.filteredIncome.reduce((sum, item) => sum + item.Totalkip, 0)
    },
  },
  watch: {
    startDate(newStartDate, oldStartDate) {
      if (newStartDate !== oldStartDate) {
        this.fetchIncome(newStartDate, this.endDate)
      }
    },
    endDate(newEndDate, oldEndDate) {
      if (newEndDate !== oldEndDate) {
        this.fetchIncome(this.startDate, newEndDate)
      }
    },
  },
  created() {
    this.setInitialDateRange()
  },
  methods: {
    setInitialDateRange() {
      // Get the current date and subtract 7 days to set the start date as 1 week ago
      const currentDate = new Date()
      const startDate = new Date(currentDate)
      startDate.setDate(currentDate.getDate() - 1)

      // Set the default start and end dates
      this.startDate = startDate.toISOString().slice(0, 10)
      this.endDate = currentDate.toISOString().slice(0, 10)

      // Fetch data with default date range
      this.fetchIncome(this.startDate, this.endDate)
    },
    fetchIncome(startDate, endDate) {
      this.$axios
        .get(
          `http://localhost:2023/sale/date/range?startDate=${startDate}&endDate=${endDate}`
        )
        .then((response) => {
          this.income = response.data.rows
          this.filteredIncome = response.data.rows.map((item, index) => {
            return {
              index: index + 1,
              ...item,
            }
          })
        })
        .catch(() => {
          this.filteredIncome = []
        })
    },
  },
}
</script>

<style>
/* Add any custom styles for the component here */
</style>
