<template>
  <div>
    <v-card>
      <v-toolbar color="#9155FD">
        <v-toolbar-title style="color: white" class="ml-6"
          >ກວດການັດໝາຍ</v-toolbar-title
        >
      </v-toolbar>
      <v-row v-if="doctorData" class="col-12 container">
        <!-- <v-col cols="12" md="4" sm="12">
          <div class="mt-1 mb-2 text-center">ລາຍການນັດໝໍທັງໝົດ</div>
          <div>
            <v-card>
              <v-col cols="12" md="12" sm="12">
                <v-col cols="12" md="12" sm="12">
                  <v-text-field
                    v-model="search"
                    outlined
                    dense
                    label="ຄົ້ນຫາ"
                    prepend-inner-icon="mdi-magnify"
                  />
                </v-col>
              </v-col>
              <v-data-table
                :headers="headers1"
                :items-per-page="5"
                color="#9155FD"
                :search="search"
              >
                <template slot="item.pk" scope="props">{{
                  props.index + 1
                }}</template>
              </v-data-table>
            </v-card>
          </div>
        </v-col> -->
        <v-divider vertical></v-divider>
        <v-col cols="12" md="12" sm="12">
          <div class="mt-1 mb-2 text-center">ລາຍການບັນທຶກຂໍ້ມູນຄົນເຈັບ</div>
          <div>
            <v-card>
              <v-col cols="12" md="12" sm="12" class="d-flex justify-end">
                <v-col sm="12" cols="12" md="10">
                  <v-text-field
                    v-model="search1"
                    outlined
                    dense
                    label="ຄົ້ນຫາ"
                    prepend-inner-icon="mdi-magnify"
                  />
                </v-col>
                <v-col sm="12" cols="12" md="2">
                  <v-btn text small fab color="#9155FD">
                    <v-badge
                      :content="showListCheck.count ? showListCheck.count : '0'"
                      color="error"
                    >
                      <v-icon>mdi-bell-plus-outline</v-icon>
                    </v-badge></v-btn
                  >
                </v-col>
              </v-col>
              <v-data-table
                :headers="headers"
                :items="showListCheck.rows"
                :items-per-page="5"
                color="#9155FD"
                :search="search1"
              >
                <template slot="item.pk" scope="props">
                  {{ props.index + 1 }}
                </template>
                <template #[`item.action`]="{ item }">
                  <v-tooltip top color="success">
                    <template #activator="{ on, attrs }">
                      <v-btn icon color="#9155FD" v-bind="attrs" v-on="on">
                        <v-icon @click="showDetails(item)"
                          >mdi-eye-check-outline</v-icon
                        >
                      </v-btn>
                    </template>
                    <span>ກວດ</span>
                  </v-tooltip>
                </template>
                <template #[`item.createdAt`]="{ item }">
                  {{ $moment(item.createdAt).format('DD-MM-YYYY') }}
                </template>

                <!-- <template #[`item.createdAt`]>
                  {{$moment(createdAt).format('DD-MM-YYY ') }}
                </template> -->
              </v-data-table>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <v-row v-else class="col-12 container">
        <v-col cols="12" md="12" sm="12">
          <div class="mt-1 mb-2 text-center">ລາຍການບັນທຶກຂໍ້ມູນຄົນເຈັບ</div>
          <div>
            <v-card>
              <v-col cols="12" md="12" sm="12" class="d-flex justify-end">
                <v-col cols="12" md="12" sm="12">
                  <v-text-field
                    v-model="search"
                    outlined
                    dense
                    label="ຄົ້ນຫາ"
                    prepend-inner-icon="mdi-magnify"
                  />
                </v-col>
              </v-col>
              <v-data-table
                :headers="headers"
                :items="showListCheck.rows"
                :items-per-page="5"
                color="#9155FD"
                :search="search"
              >
                <template slot="item.pk" scope="props">{{
                  props.index + 1
                }}</template>

              </v-data-table>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CheckAppointment',
  data() {
    return {
      search: '',
      search1: '',
      tab: null,
      staffData: '',
      doctorData: '',
      list_items: ['ລາຍການນັດໝໍ', 'ນັດໝາຍໝໍ'],
      check_appointment: false,
      headers: [
        { text: 'ລຳດັບ', value: 'pk' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ລາຍລະອຽດ', value: 'details' },
        { text: 'ວັນທີ່', value: 'createdAt' },
        { text: 'actions', value: 'action' },
      ],
      headers1: [
        { text: 'ລຳດັບ', value: 'pk' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
      ],
    }
  },
  computed: {
    showListCheck() {
      return this.$store.state.patient.dataPatients
    },
  },
  async mounted() {
    await this.$store.dispatch('patient/patientInfo')
    const check = this.$cookies.get('role')
    if (check === 'doctor' || check === 'admin') {
      this.doctorData = check
    }
    if (check === 'staff') {
      this.staffData = check
    }
  },
  methods: {
    showDetails(data) {
      this.$store.commit('patient/getDataId', data)
      this.$router.push('/treat/basic_record')
    },
  },
}
</script>