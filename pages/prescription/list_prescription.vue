<template>
  <div class="mt-2 ml-2">
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">
      ລາຍການໃບສັ່ງຢາ
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
      <v-data-table
        :headers="headers"
        :items="prescrition_data"
        :search="search"
      >
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format('DD-MM-YYYY h:mm:ss a') }}
        </template>
        <template #[`item.price`]="{ item }">
          <span style="color: red">{{ toCurrencyString(item.price) }}</span>
        </template>
        <template #[`item.actions`] = "{item}">
          <div v-if="item.status === 1">
            <v-btn rounded color="error">
              <v-icon>mdi-dots-horizontal</v-icon>
              <span> ລໍຖ້າບັນທຶກຈ່າຍຢາ</span>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'treat_id' },
        { text: 'ປະເພດຢາ', value: 'type_name' },
        { text: 'ຊື່ຢາ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ວັນທີ່', value: 'created_at' },
        { text: 'ສະຖານະ', value: 'actions' },
      ],
    }
  },
  computed: {
    prescrition_data() {
      return this.$store.state.sale.statusData
    },
  },
  async mounted() {
    await this.$store.dispatch('sale/getDataStatus')
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