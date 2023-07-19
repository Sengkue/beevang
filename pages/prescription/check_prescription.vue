<template>
  <div class="mt-2 ml-2">
    <!-- {{prescrition_data}} -->
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">ຈ່າຍຢາ</div>
    <v-card class="mt-3 text-center">
      <v-row class="col-12">
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            id="sale"
            v-model="treatId"
            name="sale"
            label="ລະຫັດບາໂຄດ"
            prepend-inner-icon="mdi-barcode"
            outlined
            dense
            @keydown.enter="getPrescrition"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="prescrition_data">
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format('DD-MM-YYYY h:mm:ss a') }}
        </template>
        <template #[`item.price`] = "{item}">
          <span style="color:red">{{toCurrencyString(item.price)}}</span>
        </template>
      </v-data-table>
      <v-row class="col-12 mt-3">
        <v-col cols="12" class="text-end">
          <v-btn color="success" class="ml-5" @click="saveSale"
            ><span style="color: white">ບັນທຶກຂາຍຢາ</span>
            <v-icon color="white">mdi-content-save-check-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  data() {
    return {
      treatId: '',
      headers: [
        { text: 'ປະເພດຢາ', value: 'type_name' },
        { text: 'ຊື່ຢາ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ວັນທີ່', value: 'created_at' },
      ],
    }
  },
  computed: {
    prescrition_data() {
      return this.$store.state.sale.prescrition
    },
  },
  mounted() {},
  methods: {
    getPrescrition(e) {
      const id = e.target.value
      this.$store.dispatch('sale/getPrescrition', id)
    },
    async saveSale() {
      const data = {
        treat_id: this.treatId,
        item: this.prescrition_data,
      }
      await this.$store.dispatch('sale/saveSale', data)
      location.reload()
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
  },
}
</script>

<style>
</style>