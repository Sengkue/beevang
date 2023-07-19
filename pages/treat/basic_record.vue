<template>
  <div>
    <v-card class="container">
      <div
        class="font-weight-blod ml-3"
        style="color: #9155fd; font-size: 18px"
      >
        ບັນທຶກຂໍ້ມູນພື້ນຖານ (ຂໍ້ມູນຄົນເຈັບ)
      </div>
      <v-row class="d-flex align-center col-12">
        <v-row class="container col-12">
          <v-col md="6" sm="12">
            <v-text-field
              v-model="firstCheck.name"
              label="ຊື່"
              outlined
              dense
              color="#9155FD"
              hide-details="auto"
            />
          </v-col>
          <v-col md="6" sm="12">
            <v-text-field
              v-model="firstCheck.address"
              label="ທີ່ຢູ່"
              outlined
              dense
              color="#9155FD"
              hide-details="auto"
            />
          </v-col>
          <v-col md="6" sm="12">
            <v-text-field
              v-model="firstCheck.tel"
              label="ເບີໂທລະສັບ"
              outlined
              dense
              color="#9155FD"
              hide-details="auto"
            />
          </v-col>
          <v-col md="6" sm="12">
            <v-text-field
              v-model="firstCheck.details"
              label="ອາການເບື້ອງຕົ້ນ"
              outlined
              dense
              color="#9155FD"
              hide-details="auto"
            />
          </v-col>
          <v-col md="6" sm="12">
            <v-text-field
              v-model="firstCheck.weight"
              label="ນໍ້າໜັກ"
              outlined
              dense
              color="#9155FD"
              hide-details="auto"
            />
          </v-col>
          <v-col md="6" sm="12">
            <v-text-field
              v-model="firstCheck.height"
              label="ລວງສູງ"
              outlined
              dense
              color="#9155FD"
              hide-details="auto"
            />
          </v-col>
          <v-col md="12" sm="12">
            <v-text-field
              v-model="firstCheck.chip_life"
              label="ຊິບພະຈອນ"
              outlined
              dense
              color="#9155FD"
              hide-details="auto"
            />
          </v-col>
        </v-row>
      </v-row>
      <v-row class="col-12">
        <v-col cols="12" md="12" sm="12" class="d-flex justify-end">
          <div class="pr-6">
            <v-btn large color="error" @click="clearData">
              <span style="color: white">ລ້າງຂໍ້ມູນ</span>
              <v-icon color="white">mdi-backspace-outline</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn large color="#9155FD" @click="dataFirstcheck">
              <span style="color: white">ບັນທຶກຂໍ້ມູນ</span>
              <v-icon color="white">mdi-content-save-check-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <div></div>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'BasicRecordPages',
  data() {
    return {
      firstCheck: {
        name: '',
        address: '',
        details: '',
        tel: '',
        height: '',
        weight: '',
        chip_life: '',
      },
    }
  },
  computed: {
    // diseases() {
    //   return this.$store.state.disease.datas.map((disease) => ({
    //     id: disease.disease_id,
    //     name: disease.name,
    //   }))
    // },
    // showDatId() {
    //   return this.$store.state.patient.dataId
    // },
  },
  async mounted() {
    // await this.$store.dispatch('disease/getSingData')
    // const check = this.$cookies.get('role')
    // if (check === 'doctor' || check === 'admin') {
    //   this.doctorData = check
    // }
    // if (check === 'staff') {
    //   this.staffData = check
    // }
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async dataFirstcheck() {
      await this.$store.dispatch('firstcheck/postData', { ...this.firstCheck })
      await this.$router.push('/treat/dataTreat')
    },
    clearData() {
      this.firstCheck.name = ''
      this.firstCheck.address = ''
      this.firstCheck.details = ''
      this.firstCheck.tel = ''
      this.firstCheck.height = ''
      this.firstCheck.weight = ''
      this.firstCheck.chip_life = ''
    },
  },
}
</script>
<style>
</style>