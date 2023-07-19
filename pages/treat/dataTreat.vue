<template>
  <div class="mt-3">
    <!-- <div>{{ dataTreat }}</div> -->
    <v-card>
      <div class="pa-2 ml-1 font-weight-bold" style="color: #9155fd">
        ລາຍການບັນທຶກຂໍ້ມູນປີ່ນປົວ
      </div>
      <v-data-table :headers="headers" :items="dataTreat.rows">
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template>
        <template #[`item.action`]="{ item }">
          <v-tooltip left color="success">
            <template #activator="{ on, attrs }">
              <v-btn
                color="#9155FD"
                v-bind="attrs"
                v-on="on"
                @click="showDetails(item)"
              >
                <v-icon color="white">mdi-check-outline</v-icon>
              </v-btn>
            </template>
            <span>ກວດ</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- dialog show treat -->
    <template>
      <!-- <div>{{showDiseas}}</div> -->
      <v-row justify="center" class="col-12">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="#9155FD">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>ປີ່ນປົວ</v-toolbar-title>
            </v-toolbar>
            <!-- {{showDiseas.rows}} -->
            <v-row class="mt-2">
              <v-col cols="12" md="6" sm="12">
                <v-list>
                  <div class="font-weight-bold container">ຂໍ້ມູນລາຍການກວດ</div>
                  <div class="container">
                    <v-row>
                      <v-col>
                        <v-select
                          v-model="diseaseId"
                          label="ເລືອກລາຍການກວດ"
                          multiple
                          outlined
                          dense
                          color="#9155FD"
                          :items="showDiseas.rows"
                          item-text="name"
                          return-object
                          hide-details="auto"
                        />
                        <div style="color: red">*ກະລຸນາເລືອກລາຍການກວດ</div>
                      </v-col>
                    </v-row>
                  </div>
                </v-list>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="12" md="6" sm="12">
                <v-list>
                  <v-row class="container mb-5">
                    <v-col>
                      <span class="font-weight-bold">ຂໍ້ມູນປີ່ນປົວ</span></v-col
                    >
                    <v-col>
                      <span
                        >ອາການເບື້ອງຕົ້ນ : {{ storeData.details }}</span
                      ></v-col
                    >
                  </v-row>
                  <v-list-item>
                    <v-row class="d-flex align-center">
                      <v-col md="6">
                        <div>ຊື່ : {{ storeData.name }}</div>
                      </v-col>
                      <v-col md="6">
                        <div>ເບີໂທລະສັບ : {{ storeData.tel }}</div>
                      </v-col>
                      <v-col md="6">
                        <div>ທີ່ຢູ່ : {{ storeData.address }}</div>
                      </v-col>
                      <v-col md="6">
                        <div>ນໍ້າໜັກ : {{ storeData.weight }} Kg</div>
                      </v-col>
                      <v-col md="6">
                        <div>ລວງສູງ : {{ storeData.height }} Cm</div>
                      </v-col>
                      <v-col md="6">
                        <div>
                          <!-- {{diseaseId}} -->
                          ລາຄາລວມ :
                          <span style="color: red" class="font-weight-bold">{{
                            toCurrencyString(
                              diseaseId.reduce(
                                (sum, data) => data.price + sum,
                                0
                              )
                            )
                          }}</span>
                        </div>
                      </v-col>
                      <v-col md="6">
                        <div>
                          ລາຍການທີ່ເລືອກກວດ :

                          <div v-for="data in diseaseId" :key="data.id">
                            <ul>
                              <li>
                                {{ data.name }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-col class="d-flex justify-end">
                  <v-btn large color="#9155FD"
                    ><span style="color: white" @click="save">ບັນທືກ</span>
                    <v-icon color="white"
                      >mdi-content-save-check-outline</v-icon
                    >
                  </v-btn>
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogBill"
          persistent
          max-width="900px"
          transition="dialog-transition"
        >
          <v-card class="pa-5">
            <div class="text-center font-weight-bold" style="font-size: 20px">
              ໃບບິນ
            </div>
            <!-- <v-row>
              <v-col md="6">asdf</v-col>
              <v-col md="6">ຄີຣນິກ ດຣ ມົວວ່າງ ເຊຍປາວ</v-col>
            </v-row> -->
            <v-row class="d-flex justify-space-between">
              <v-col md="6">ຄີຣນິກ ດຣ ມົວວ່າງ ເຊຍປາວ</v-col>
              <v-col md="6" class="text-end"
                >ລະຫັດໃບບີນ : {{ bill.billNumber }}
              </v-col>
            </v-row>
            <v-divider class="mb-8 mt-2" style="color: red"></v-divider>
            <v-card-text
              class="col-12 d-flex justify-space-between"
              
            >
              <div class="col-md-6">
                <p class="font-weight-bold">ຊື່: {{ bill.name }}</p>
                <p class="font-weight-bold">ທີ່ຢຸູ: {{ bill.address }}</p>
                <p class="font-weight-bold">
                  ລາຄາລວມ:
                  <span style="color: red">{{
                   toCurrencyString(parseInt(bill.total_price))
                  }}</span>
                </p>
              </div>
              <div class="col-md-6 font-weight-bold" >
                ລາຍການກວດພະຍາດ:
                <div v-for="data in bill.rows" :key="data.id">
                  <ul>
                    <li>
                      {{ data.details }}
                    </li>
                  </ul>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" dark @click="dialogBill = false"
                >ຍົກເລີກ</v-btn
              >
              <v-btn color="blue" dark @click="route">ພິມໃບບິນ</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'DataTreat',
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      selectedDiseases: [],
      diseaseId: [],
      storeData: '',
      firstcheckid: '',
      dialogBill: false,
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ລາຍລະອຽດ', value: 'details' },
        { text: 'ນໍ້າໜັກ', value: 'weight' },
        { text: 'ລວງສູງ', value: 'height' },
        { text: 'ຊິບພະຈອນ', value: 'chip_life' },
        { text: 'action', value: 'action' },
      ],
    }
  },
  computed: {
    dataTreat() {
      return this.$store.state.firstcheck.dataStore
    },
    showDiseas() {
      return this.$store.state.disease.dataDisase
    },
    bill() {
      return this.$store.state.treat.bill
    },
  },
  async mounted() {
    await this.$store.dispatch('disease/getAll')
    await this.$store.dispatch('firstcheck/getAll')
    // await this.$store.dispatch('')
  },
  methods: {
    route() {
      this.$router.push('/treat/pay')
      // console.log( this.firstcheckid)
      // this.$router.push(
      //   `/treat/data?bill=${data.id}&treat_id=${this.firstcheckid}`
      // )
    },
    showDetails(data) {
      console.log(data.id)
      this.firstcheckid = data.id
      this.storeData = data
      this.dialog = true
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async save() {
      const testData = []
      await this.diseaseId.map((res) => {
        return testData.push({ disease_id: res.disease_id, details: res.name })
      })

      const data = {
        firstcheck_id: this.firstcheckid,
        item: testData,
        total_price: this.diseaseId.reduce((sum, res) => res.price + sum, 0),
      }

      await this.$store.dispatch('treat/createTreat', { ...data })
      this.dialog = false
      this.dialogBill = true
    },
  },
}
</script>
