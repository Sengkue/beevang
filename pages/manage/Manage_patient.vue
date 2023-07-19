<template >
  <div>
    <div class="mt-3 mb-3 ml-2 font-weight-bold mb-6">ຈັດການຂໍ້ມູນຄົນເຈັບ</div>
    <v-card>
      <!-- search button------------------------------- -->
      <v-row class="d-flex align-center col-12">
        <v-col cols="12" md="12" sm="12">
          <v-card-title>
            <v-text-field
              v-model="searchTerm"
              prepend-inner-icon="mdi-magnify"
              label="ຄົ້ນຫາ"
              outlined
              hide-details
              dense
              small
              color="#9155FD"
            />
          </v-card-title>
        </v-col>
        <!-- <v-col cols="12" md="2" sm="3" class="d-flex justify-end">
          <v-btn
            style="width: 100"
            color="#9155FD"
            @click="showAddDialog = !showAddDialog"
            ><span style="color: white">ເພີ່ມຂໍ້ມູນຄົນເຈັບ</span>
            <v-icon color="white">mdi-plus-outline</v-icon>
          </v-btn>
        </v-col> -->
      </v-row>

      <v-data-table
        :headers="headers"
        :items="Status.rows"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="error" @click="showPatient(item)"
                  >mdi-trash-can-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#9155FD" @click="showEdit(item)"
                  >mdi-pencil-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ເເກ້ໄຂ</span>
          </v-tooltip>
        </template>
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="showDailog" width="540" activator="parent" persistent>
      <v-card>
        <v-toolbar dark color="#9155FD">
          <v-card-title>ທ່ານເເນ່ໃຈບໍ ?</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDailog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-2 col-12">
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ຊື່<br />
              {{ data.name }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ທີ່ຢູ່ <br />
              {{ data.address }}</v-card-text
            >
          </div>
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ເບີໂທລະສັບ<br />
              {{ data.tel }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ວັນ ເດືອນ ປີ ເກີດ <br />
              {{ data.birtday }}
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" width="100" @click="deletePatient(data.id)">
            <div class="text--white">ລຶບ</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- edit -->
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ແກ້ໄຂຂໍ້ມູນຄົນເຈັບ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="storePatients.name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="storePatients.address"
              :value="data1.address"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="storePatients.tel"
              :value="data1.tel"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="storePatients.birtday"
              :value="data1.birtday"
              outlined
              dense
              hide-details
              label="ວັນ ເດືອນ ປີ ເກີດ "
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="updateData(data1.id)"
              >ບັນທືກ</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-dialog
        v-model="showAddDialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ເພີ່ມຂໍ້ມູນຄົນເຈັບ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="showAddDialog = !showAddDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              placeholder="XOUAYANG"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              placeholder="XOUAYANG"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              placeholder="XOUAYANG"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              placeholder="XOUAYANG"
              outlined
              dense
              hide-details
              label="ວັນ ເດືອນ ປີ ເກີດ "
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="showAddDialog = false"
              >ບັນທືກ</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'PatientPages',
  data() {
    return {
      searchTerm: '',
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      data: {},
      data1: {},
      storePatients: {
        name: '',
        address: '',
        tel: '',
        birtday: '',
      },
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ວັນ ເດືອນ ປີ ເກີດ', value: 'birtday' },
        { text: 'Actions', value: 'action' },
      ],
    }
  },
  computed: {
    patient() {
      return this.$store.state.patient.dataPatients
    },
    Status() {
     return this.$store.state.patient.status
    }
  },
  async mounted() {
    await this.$store.dispatch('patient/patientStatus')
    await this.$store.dispatch('patient/patientInfo')
  },
  methods: {
    showPatient(data) {
      this.data = data
      this.showDailog = true
    },
    showEdit(data1) {
      this.data1 = data1
      if (this.data1) {
        this.storePatients.name = this.data1.name
        this.storePatients.address = this.data1.address
        this.storePatients.tel = this.data1.tel
        this.storePatients.birtday = this.data1.birtday
      }
      this.dialog = true
    },
    async updateData(id) {
      const data = this.storePatients
      await this.$store.dispatch('patient/updateData', { data, id })
      await this.$store.dispatch('patient/patientInfo')
      this.dialog = false
    },
    async deletePatient(id) {
      await this.$store.dispatch('patient/deleteData', id)
      this.showDailog = false
      this.$store.dispatch('patient/patientInfo')
    },
  },
}
</script>
<style scoped>
.font {
  font-family: 'Noto Serif Lao', serif;
}
</style>
