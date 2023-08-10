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
      <!-- {{ getStory }} -->
      <v-data-table :headers="headers" :items="getStory" :search="search">
        <template #[`item.order_date`]="{ value }">
          <div>
            {{ formatDateBill(value) }}
          </div>
        </template>
        <template #[`item.import_total_kip`]="{ value }">
          <div>{{ formatPrice(value) }} ກີບ</div>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-tooltip bottom color="primary">
            <template #activator="{ on }">
              <v-btn text small v-on="on" @click="review(item)">
                <v-icon color="primary">mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>ເບິ່ງລາຍລະອຽດ</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="openDetail" max-width="600px">
      <v-card class="pa-5">
        <div>
          <div class="d-flex justify-space-between">
            <div><strong>ລະຫັດສິນຄ້າ:</strong> {{ detailData.barcode }}</div>
            <div>
              <strong>ວັນທີ່ນຳເຂົ້າ:</strong>
              {{ formatDate(detailData.import_date) }}
            </div>
          </div>
          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-space-between">
            <div>
              <strong>ຊື່ພະນັກງານ:</strong> {{ detailData.employee_name }}
            </div>
            <div>
              <strong>ຊື່ຜູ້ສະໜອງ:</strong> {{ detailData.supplier_name }}
            </div>
          </div>
          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-space-between">
            <div><strong>ຊື່ສິນຄ້າ:</strong> {{ detailData.product_name }}</div>
            <div>
              <strong>ປະເພດ:</strong> {{ detailData.product_type_name }}
            </div>
          </div>
          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-space-between">
            <div><strong>ຫົວໜ່ວຍ:</strong> {{ detailData.unit_name }}</div>
            <div><strong>ຈຳນວນ:</strong> {{ detailData.details_qty }}</div>
          </div>
          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-space-between">
            <div>
              <strong>ລາຄາຕົ້ນທືນ:</strong>
              {{ formatPrice(detailData.total_price) }} ກີບ
            </div>
            <div>
              <strong>ລາຄາຂາຍ:</strong>
              {{ formatPrice(detailData.sale_price) }} ກີບ
            </div>
          </div>
          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-space-between">
            <div>
              <strong>ລວມລາຄາທັງໝົກ:</strong>
              {{ formatPrice(detailData.import_total_kip) }} ກີບ
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="openDetail = false"
            ><v-icon>mdi-close</v-icon> ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'HistoryImportS',
  data() {
    return {
      detailData: {},
      openDetail: false,
      getStory: [],
      token: this.$cookies.get('token'),
      search: '',
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'barcode' },
        { text: 'ຊື່ພະນັກງານ', value: 'employee_name' },
        { text: 'ຈຳນວນ', value: 'details_qty' },
        { text: 'ລາຄາ', value: 'total_price' },
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
  methods: {
    review(item) {
      this.detailData = item
      this.openDetail = true
    },
  },
}
</script>
