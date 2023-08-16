<template>
  <div>
    <div class="d-flex justify-space-between">
      <h3>ລາຍງານ >> ຂໍ້ມູນຮັບປະກັນ</h3>
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
        <v-tab-item key="ຮັບປະການ">
          <v-card flat>
            <v-card-text>
              <Reports-guanranteed-true />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item key="ບໍ່ຮັບປະການ">
          <v-card flat>
            <v-card-text>
              <Reports-guanranteed-false />
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
        { tab: 'ຮັບປະການ', content: 'ຮັບປະການ Tab' },
        { tab: 'ບໍ່ຮັບປະການ', content: 'ບໍ່ຮັບປະການ Tab' },
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
