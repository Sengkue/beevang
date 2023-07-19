<template>
  <div>
    <div class="mt-2 mb-3 ml-2 font-weight-bold container">ກວດສອບນຳເຂົ້າ</div>
    <!-- <div>ກວດສອບນຳເຂົ້າ</div> -->
    <v-card>
      <v-row class="d-flex col-12">
        <v-col cols="6">
          <v-card-title>
            <v-text-field
              v-model="billId"
              prepend-inner-icon="mdi-barcode"
              label="ກວດສອບ"
              outlined
              hide-details
              dense
              small
              color="#9155FD"
              @keydown.enter="searchData"
            />
          </v-card-title>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="importData" color="#9155FD">
        <template #[`item.qty_small`]="{ item }">
          <v-text-field
            v-model="item.qty_small"
            type="number"
            hide-details="auto"
            dense
            style="width: 50px"
            :rules="greaterThanZeroRule"
          ></v-text-field>
        </template>
        <template #[`item.expired_date`]="{ item }">
          <v-text-field
            v-model="item.expired_date"
            hide-details="auto"
            dense
            style="width: 50px"
          ></v-text-field>
        </template>
        <template #[`item.createdAt`]="{ item }">
          {{ formatDateBill(item.createdAt) }}
        </template>
        <template #[`item.order_details_price`]="{ item }">
          <span style="color: red">
            {{ formatPrice(item.order_details_price) }}</span
          >
        </template>
      </v-data-table>
      <v-divider></v-divider>
    </v-card>
    <v-row class="mt-3">
      <v-col cols="12" class="text-end">
        <v-btn :loading="loading" class="cyan-accent-4 white--text" @click="saveImport">
          <span >ບັນທຶກການນຳເຂົ້າ</span>
          <v-icon color="white">mdi-content-save-check-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ນຳເຂົ້າຢາ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-form ref="anyName">
            <v-col cols="12">
              <v-text-field
                v-model="item.id"
                outlined
                dense
                hide-details="auto"
                label="ລະຫັດນຳເຂົ້າ"
                color="#9155FD"
                prepend-inner-icon="mdi-barcode"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.name"
                outlined
                dense
                hide-details="auto"
                label="ຊື່ຢາ"
                color="#9155FD"
                prepend-inner-icon="mdi-alpha-m-circle-outline"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="item.category"
                outlined
                dense
                hide-details
                label="ປະເພດຢາ"
                color="#9155FD"
                prepend-inner-icon="mdi-format-list-bulleted-type"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="item.unit"
                outlined
                dense
                hide-details
                label="ຫົວໜ່ວຍ"
                color="#9155FD"
                prepend-inner-icon="mdi-hours-24"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="value"
                outlined
                dense
                hide-details
                label="ວັນ ເດືອນ ປີ ໝົດອາຍຸ"
                color="#9155FD"
              >
                <template #append>
                  <DataPicker v-model="value" />
                </template>
              </v-text-field>
            </v-col>
          </v-form>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn class="cyan-accent-4 white--text" @click="showData"
              ><span >ບັນທຶກການນຳເຂົ້າ</span>
              <v-icon color="white">mdi-content-save-check-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'ImportPages',
  data() {
    return {
      loading: false,
      billId: '',
      importData: [],
      expired_date: '',
      token: this.$cookies.get('token'),
      value: null,
      value1: null,
      searchTerm: '',
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      search: '',
      data: [],
      greaterThanZeroRule: [
        (v) => !!v || 'Value is required',
        (v) => /^\d+$/.test(v) || 'Value must be a number',
        (v) => Number(v) > 0 || 'Value must be greater than zero',
        // (v) => this.noNegativeSign(v) || 'Value must not be negative',
      ],
      headers: [
        { text: 'ລະຫັດນຳເຂົ້າ ', value: 'bill_number' },
        { text: 'ປະເພດ', value: 'type_name' },
        { text: 'ຊື່ສິນຄ້າ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'qty_small' },
        { text: 'ລາຄາ', value: 'order_details_price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit_name' },
        { text: 'ວັນ ເດືອນ ປີ ສັ່ງຊື້', value: 'createdAt' },
        // { text: 'ວັນ ເດືອນ ປີ ໝົດອາຍຸ', value: 'expired_date' },
      ],
      item: {
        id: '',
        name: '',
        category: '',
        unit: '',
        expired_date: '',
      },
    }
  },
  computed: {
    TotalAmount() {
      return this.importData.reduce(
        (num, item) => num + item.order_details_price * item.qty_small,
        0
      )
    },
    TotalQuantity() {
      return this.importData.reduce(
        (num, item) => num + parseInt(item.qty_small),
        0
      )
    },
  },
  methods: {
    noNegativeSign(value) {
      if (value.includes('-') !== -1) {
        this.myNumber = value.replace('-', '')
        return false
      }
      return true
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    saveImport() {
      this.loading = true
      const dataIn = []
      this.importData?.map((el) => {
        const res = {
          import_qty: parseFloat(el.qty_small),
          pro_id: el.product_id,
          total_price: el.order_details_price,
        }
        return dataIn.push(res)
      })

      const data = {
        order_id: this.importData[0].id,
        import_quaty: this.TotalQuantity,
        import_total_kip: this.TotalAmount,
        // expire_date: this.expired_date,
        item: dataIn,
      }
      this.$axios
        .post('http://localhost:2023/imports', data, {
          headers: {
            Authorization: `LMCOMPUTER ${this.token}`,
          },
        })
        .then((res) => {
          // if (res.data.status === 400) {
          //   this.$toast.error('ລະຫັດໃບບິນນີ້ໄດ້ນຳເຂົ້າກ່ອນໜ້ານີເເລ້ວ', {
          //     duration: 2000,
          //     position: 'top-right',
          //     iconPack: 'mdi',
          //     icon: 'close',
          //   })
          // } else {
          this.loading = false
          this.importData = []
          this.expired_date = ''
          this.billId = ''
          this.$toast.success('ນຳເຂົ້າສຳເລັດ', {
            duration: 2000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'check',
          })
          this.$router.push('/import')
          // }
        })
    },
    // billId
    searchData(e) {
      this.$axios
        .get(`http://localhost:2023/order/${e.target.value}`, {
          headers: {
            Authorization: `LMCOMPUTER  ${this.token}`,
          },
        })
        .then((res) => {
          this.importData = res.data
        })
    },
    showData() {
      //  const id =  this.data.push(this.item.id)
      //   console.log(id)
      this.dialog = false
      this.$refs.anyName.reset()
    },
  },
}
</script>
<style scoped>
.font {
  font-family: 'Noto Serif Lao', serif;
}
</style>
