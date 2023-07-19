<template>
  <div>
    <v-card
      class="cyan accent-4 white--text mb-5 font-weight-bold d-flex justify-center"
    >
      <div class="py-2">
        <h2>ຈັດການຂໍ້ມູນພະນັກງານ</h2>
      </div>
    </v-card>
    <v-card>
      <!-- search button------------------------------- -->
      <v-row class="d-flex align-center col-12">
        <v-col cols="12" md="10" sm="12">
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
        <v-col cols="12" md="2" sm="12">
          <v-btn
            dark
            color="cyan accent-4 white--text"
            block
            @click="showAddDialog = !showAddDialog"
          >
            <span>ເພີ່ມຂໍ້ມູນພະນັກງານ</span>
            <v-icon>mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="staff.rows"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.actions`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="error" @click="deleteInfo(item)"
                  >mdi-trash-can-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="cyan accent-4 white--text">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="infoUpdate(item)">
                <v-icon color="#9155FD">mdi-pencil-outline</v-icon>
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

    <v-dialog v-model="deleteDialog" width="540" activator="parent" persistent>
      <v-card>
        <v-toolbar dark color="cyan accent-4 white--text">
          <v-card-title>ທ່ານເເນ່ໃຈບໍ ?</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="deleteDialog = !deleteDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-2 col-12">
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ຊື່ <br />
              {{ deleteData.first_name }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ທີ່ຢູ່ <br />
              {{ deleteData.address }}</v-card-text
            >
          </div>
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ເບີໂທລະສັບ<br />
              {{ deleteData.tel }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ເພດ <br />
              {{ deleteData.gender }}
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="cyan accent-4 white--text"
            width="100"
            @click="removeData(deleteData.id)"
          >
            <div class="text--white">ລຶບ</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-dialog
        v-model="editDialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="cyan accent-4 white--text">
            <div>ແກ້ໄຂຂໍ້ມູນພະນັກງານ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="editDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="updateInfo.first_name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="updateInfo.last_name"
              outlined
              dense
              hide-details="auto"
              label="ນາມສະກຸນ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="updateInfo.gender"
              outlined
              dense
              hide-details="auto"
              label="ເພດ"
              color="#9155FD"
              :items="['ຊາຍ', 'ຍິງ']"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="updateInfo.address"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="updateInfo.tel"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="cyan accent-4 white--text"
              width="100"
              class="white--text"
              @click="updateData(editData.id)"
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
          <v-toolbar dark color="cyan accent-4 white--text">
            <div>ເພີ່ມຂໍ້ມູນພະນັກງານ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="showAddDialog = !showAddDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="statffData.first_name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="sucess"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="statffData.last_name"
              outlined
              dense
              hide-details="auto"
              label="ນາມສະກຸນ"
              color="sucess"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="statffData.gender"
              :items="['ຊາຍ', 'ຍິງ']"
              outlined
              dense
              hide-details
              label="ເພດ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="statffData.address"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="statffData.tel"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="statffData.password"
              outlined
              dense
              hide-details
              label="ລະຫັດຜ່ານ"
              color="success"
            />
          </v-col>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              color="cyan accent-4 white--text"
              width="100"
              @click="addStaffData"
              :disabled="loading"
            >
              <span v-if="loading">Loading...</span>
              <span v-else>ບັນທືກ</span>
            </v-btn>

          </v-col>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'ManageInformationStaff',
  data() {
    return {
      loading:false,
      searchTerm: '',
      showDailog: false,
      deleteDialog: false,
      showAddDialog: false,
      editDialog: false,
      statffData: {
        first_name: '',
        last_name: '',
        gender: '',
        tel: '',
        address: '',
        password: '',
      },
      deleteData: '',
      editData: '',
      updateInfo: {
        first_name: '',
        last_name: '',
        gender: '',
        tel: '',
        address: '',
        password: '',
      },
      headers: [
        { text: 'ລະຫັດພະນັກງານ', value: 'id' },
        { text: 'ຊື່', value: 'first_name' },
        { text: 'ນາມສະກຸນ', value: 'last_name' },
        { text: 'ເພດ', value: 'gender' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'actions', value: 'actions' },
      ],
    }
  },
  computed: {
    staff() {
      return this.$store.state.staff.dataStaff
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('staff/staffInfo')
    } catch (error) {
      console.error(error)
      // Handle the error gracefully, e.g., show an error message or fallback content
    }
  },

  methods: {
    async addStaffData() {
      this.loading = true
      await this.$store.dispatch('staff/postData', { ...this.statffData })
      this.statffData.first_name = ''
      this.statffData.last_name = ''
      this.statffData.gender = ''
      this.statffData.address = ''
      this.statffData.tel = ''
      this.statffData.password = ''
      await this.$store.dispatch('staff/staffInfo')
      this.showAddDialog = false
      this.loading = false
    },
    deleteInfo(data) {
      this.deleteData = data
      this.deleteDialog = true
    },
    async removeData(id) {
      this.loading = true
      await this.$store.dispatch('staff/deleteData', id)
      await this.$store.dispatch('staff/staffInfo')
      this.deleteDialog = false
      this.loading = false
    },
    infoUpdate(data) {
      this.loading = true
      this.editData = data
      this.editDialog = true
      if (this.editData) {
        this.updateInfo.first_name = this.editData.first_name
        this.updateInfo.last_name = this.editData.last_name
        this.updateInfo.gender = this.editData.gender
        this.updateInfo.address = this.editData.address
        this.updateInfo.tel = this.editData.tel
      }
      this.loading = false
    },
    async updateData(id) {
      this.loading = true
      const data = this.updateInfo
      await this.$store.dispatch('staff/updateData', { data, id })
      await this.$store.dispatch('staff/staffInfo')
      this.editDialog = false
      this.loading = false
    },
  },
}
</script>
