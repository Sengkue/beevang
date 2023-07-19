<template>
  <div class="mt-2 ml-2">
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">
      ປະຫວັດລາຍການກວດທັງໝົດ
    </div>
    <v-card class="mt-3 text-center">
      <v-row class="col-12">
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            v-model="search"
            name="sale"
            label="ຄົ້ນຫາ"
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="resultData" :search="search">
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format('DD-MM-YYYY h:mm:ss a') }}
        </template>
        <template #[`item.total_price`]="{ item }">
          <span class="font-weight-bold" style="color: red">{{
            toCurrencyString(item.total_price)
          }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <div v-if="item.status == 3" class="mr-2">
              <v-btn text rounded color="success">
                <v-icon>mdi-check</v-icon>
                <span>ຊຳລະເງິນເເລ້ວ</span>
              </v-btn>
            </div>
            <div v-if="item.status == 3" class="mr-2">
              <v-btn text rounded color="success">
                <v-icon>mdi-check</v-icon>
                <span>ວາງຢາເເລ້ວ</span>
              </v-btn>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'Checked_Pages',
  data() {
    return {
      search: '',
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ຜົນກວດ', value: 'result' },
        { text: 'ລາຄາລວມທີ່ຊຳລະເເລ້ວ', value: 'total_price' },
        { text: 'ວັນທີ່', value: 'created_at' },
        { text: 'ສະຖານະ', value: 'actions' },
      ],
    }
  },
  computed: {
    resultData() {
      return this.$store.state.result.dataHistory
    },
  },
  async mounted() {
    await this.$store.dispatch('result/getHistory')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
  },
}
</script>

<style>
</style>