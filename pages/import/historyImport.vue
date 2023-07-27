<template>
  <div>
    <v-card
      class="cyan accent-4 white--text mb-3 d-flex justify-center font-weight-bold container"
    >
      <h2>ປະຫວັດຂໍ້ມູນສັ່ງຊື້ສິນຄ້າ - ການນຳເຂົ້າສິນຄ້າ</h2>
      <!-- Modified header title -->
    </v-card>
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
      <v-data-table :headers="headers" :items="getStory" :search="search">
        <template #[`item.order_date`]="{ value }">
          <div>
            {{ formatDateBill(value) }}
          </div>
        </template>
        <template #[`item.actions`]>
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on }">
              <v-btn text small v-on="on" @click="review()">
                <v-icon color="primary">mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>ເບິ່ງລາຍລະອຽດ</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'HistoryImportS',
  data() {
    return {
      getStory: [],
      token: this.$cookies.get('token'),
      search: '',
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'id' },
        // { text: 'ຊື່ສິນຄ້າ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'import_total_kip' },
        { text: 'ລາຄາ', value: 'import_total_kip' },
        // { text: 'ຫົວໜ່ວຍ', value: 'unit_name' },
        { text: 'ວັນເດືອນປີສັ່ງຊື້', value: 'order_date' },
        { text: 'ເບິ່ງ', value: 'actions' },
      ],
    }
  },
  async mounted() {
    await this.$axios
      .get('http://localhost:2023/imports', {
        headers: {
          Authorization: `LMCOMPUTER ${this.token}`,
        },
      })
      .then((res) => {
        this.getStory = res.data
      })
      .catch(() => {
        this.$toast.error('ສັ່ງຊື້ບໍ່ສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
}
</script>
