<template>
  <div>
    <div class="d-flex justify-space-between">
      <h3>ລາຍງານ >> ຂໍ້ມູນສິນຄ້າທີຂາຍໄດ້ຫຼາຍ</h3>
      <v-btn color="error" to="/reports/reportTable">
        <v-icon>mdi-arrow-left-circle</v-icon> ກັບ
      </v-btn>
    </div>
    <v-card>
      <v-tabs v-model="tab" background-color="cyan accent-4" dark>
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item key="ລາຍຮັບ">
          <v-card flat>
            <v-card-text>
              <Reports-in-come-report />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item key="ລາຍຈ່າຍ">
          <v-card flat>
            <v-card-text>
              <Reports-out-come-report />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: 'ລາຍຮັບ', content: 'Customer Tab' },
        { tab: 'ລາຍຈ່າຍ', content: 'Employee Tab' },
      ],
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped>
/* Add any custom styling for the table here */
</style>
