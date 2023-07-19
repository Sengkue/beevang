<template>
  <div class="mt-2 ml-2">
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">
      ລາຍການຊຳລະເງິນ (ລາຍການກວດພະຍາດ)
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
            <template #[`item.createdAt`]="{ item }">
              {{ $moment(item.createdAt).format('DD-MM-YYY') }}
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="bill" :search="search">
        <template #[`item.date`]="{ item }">
          {{ $moment(item.date).format('DD-MM-YYYY h:mm:ss a') }}
        </template>
        <template #[`item.total_price`]="{ item }">
          <span class="font-weight-bold" style="color: red">{{
            toCurrencyString(item.total_price)
          }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn rounded color="success" @click="updateId(item)">
            <v-icon>mdi-check</v-icon>
            <span style="color: white">ຢືນຢັນຊຳລະເງິນ</span>
          </v-btn>
          <v-btn rounded color="#9155fd" @click="details(item.id)">
            <v-icon color="white">mdi-eye-outline</v-icon>
            <span style="color: white">ລາຍລະອຽດ</span>
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" width="640" activator="parent" persistent>
        <v-card>
          <v-toolbar dark color="#9155FD">
            <v-card-title>ລາຍລະອຽດ</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = !dialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="d-flex justify-space-between container">
            <span> ຊື່:{{ data_by_id.name }}</span>
            <span> ລະຫັດໃບບິນ : {{ data_by_id.billNumber }}</span>
          </div>
          <div class="d-flex justify-space-between container">
            <span>ທີ່ຢຸູ:{{ data_by_id.address }}</span>
            <span>ເບີໂທລະສັບ:{{ data_by_id.tel }}</span>
          </div>
          <v-data-table :headers="headers1" :items="data_by_id.rows">
            <template #[`item.price`]="{ item }">
              <span style="color: red">{{ toCurrencyString(item.price) }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>
      <!-- update data id  -->
      <v-dialog v-model="updateDataId" width="440" persistent>
        <v-card>
          <v-toolbar dark color="#9155FD">
            <v-card-title>ຢືນຢັນ</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="updateDataId = !updateDataId">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="d-flex justify-space-around container">
            <span> ລາຄາລວມ:{{toCurrencyString(parseInt(sendData.total_price))}}</span>
            <span> ລະຫັດໃບບິນ : {{ sendData.bill_number }}</span>
          </div>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="#9155FD" @click="updaetStatus(sendData.id)">
                <span style="color:white">ຢືນຢັນ</span>
                <v-icon color="white">mdi-content-save-check-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  data() {
    return {
      search: '',
      dialog: false,
      updateDataId: false,
      sendData:'',
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ລາຍລະອຽດ', value: 'details' },
        { text: 'ລາຄາລວມ', value: 'total_price' },
        { text: 'ວັນທີ່', value: 'date' },
        { text: 'ສະຖານະ', value: 'actions' },
      ],
      headers1: [
        { text: 'ລາຍການກວດ', value: 'details' },
        { text: 'ລາຄາ', value: 'price' },
      ],
    }
  },
  computed: {
    bill() {
      return this.$store.state.user.billData
    },
    data_by_id() {
      return this.$store.state.user.dataById
    },
  },
  async mounted() {
    await this.$store.dispatch('user/getBill')
    // await this.$store.dispatch('user/getById')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async details(id) {
      await this.$store.dispatch('user/getById', id)
      this.dialog = true
    },
    updateId(item) {
      this.sendData = item
     this.updateDataId = true
    },
   async updaetStatus(id){
    await this.$store.dispatch('user/updateBill',id)
    await this.$store.dispatch('user/getBill')
    await this.$router.push('/treat/payed')
     this.updateDataId = false
    }
  },
}
</script>

<style>
</style>