<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="ສິນຄ້າ">
        <v-card flat>
          <v-card-text>
            <search-Product-component />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item key="ລູກຄ້າ">
        <v-card flat>
          <v-card-text>
            <search-customer-component />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item key="ພະນັກງານ">
        <v-card flat>
          <v-card-text>
            <search-employee-component />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: 'ສິນຄ້າ', content: 'Product Tab' },
        { tab: 'ລູກຄ້າ', content: 'Customer Tab' },
        { tab: 'ພະນັກງານ', content: 'Employee Tab' }
      ]
    };
  }
};
</script>

