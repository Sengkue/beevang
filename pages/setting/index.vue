<template >
  <div>
    <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">ຕັ້ງຄ່າລະບົບ</div>
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
        <v-col cols="12" md="2" sm="3" class="d-flex justify-end">
          <v-btn
            style="width: 100"
            color="#9155FD"
            @click="showAddDialog = !showAddDialog"
            ><span style="color: white">ເພີ່ມຜູ້ໃຊ້</span>
            <v-icon color="white">mdi-plus-outline</v-icon>
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
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="error" @click="showStaff(item)"
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
        <!-- <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template> -->
      </v-data-table>
    </v-card>
    <v-dialog v-model="showDailog" width="540" activator="parent" persistent>
      <v-card>
        <v-toolbar dark color="#9155FD">
          <v-card-title>ທ່ານເເນ່ໃຈບໍ ?</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDailog = !showDailog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-2 col-12">
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ຊື່ <br />
              {{ staffData.name }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ເພດ <br />
              {{ staffData.gender }}
            </v-card-text>
          </div>
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ທີ່ຢູ່ <br />
              {{ staffData.address }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ເບີໂທລະສັບ <br />
              {{ staffData.tel }}</v-card-text
            >
          </div>
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ຕຳເເໜ່ງ<br />
              {{ staffData.position }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ສິດທິເຂົ້າເຖິງຂໍ້ມູນ <br />
              {{ staffData.role }}
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" width="100" @click="deleteData(staffData.id)">
            <div class="text--white">ລຶບ</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ເເກ້ໄຂຜູ້ໃຊ້</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="dataEdit.name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="dataEdit.gender"
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
              v-model="dataEdit.tel"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="dataEdit.address"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="dataEdit.position"
              outlined
              dense
              hide-details
              label="ຕຳເເໜ່ງ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="dataEdit.role"
              outlined
              dense
              hide-details="auto"
              label="ສິດທິ"
              color="#9155FD"
              :items="['staff', 'doctor', 'admin']"
            />
            <div style="color: red">*ກະລຸນາກຳນົດສິດທິ</div>
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
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
          <v-toolbar dark color="#9155FD">
            <div>ເພິ່ມຜູ້ໃຊ້</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="showAddDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="dataInput.name"
              :rules="[() => !!dataInput.name]"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="dataInput.gender"
              :rules="[() => !!dataInput.gender]"
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
              v-model="dataInput.tel"
              :rules="[() => !!dataInput.tel]"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="dataInput.password"
              :rules="[() => !!dataInput.password]"
              outlined
              dense
              hide-details
              label="ລະຫັດຜ່ານ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="dataInput.address"
              :rules="[() => !!dataInput.address]"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="dataInput.position"
              :rules="[() => !!dataInput.position]"
              outlined
              dense
              hide-details
              label="ຕຳເເໜ່ງ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="dataInput.role"
              :rules="[() => !!dataInput.role]"
              outlined
              dense
              hide-details="auto"
              label="ສິດທິ"
              color="#9155FD"
              :items="['staff', 'doctor', 'admin']"
            />
            <div style="color: red">*ກະລຸນາກຳນົດສິດທິ</div>
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="addData"
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
  name: 'SettingPages',
  data() {
    return {
      searchTerm: '',
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      showPermission: false,
      staffData: {},
      editData: {},
      dataInput: {
        name: '',
        gender: '',
        tel: '',
        password: '',
        address: '',
        position: '',
        role: '',
      },
      dataEdit: {
        name: '',
        gender: '',
        tel: '',
        password: '',
        address: '',
        position: '',
        role: '',
      },
      headers: [
        { text: 'ລະຫັດພະນັກງານ', value: 'employee_id' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ເພດ', value: 'gender' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ຕຳເເໜ່ງ', value: 'position' },
        { text: 'ສິດທິເຂົ້າເຖິງຂໍ້ມູນ', value: 'role' },
        { text: 'ຈັດການສິດທິ', value: 'action' },
      ],
    }
  },
  computed: {
    staff() {
      return this.$store.state.staff.dataStaff
    },
  },
  async mounted() {
    await this.$store.dispatch('staff/staffInfo')
  },
  methods: {
    showStaff(data) {
      this.staffData = data
      this.showDailog = true
    },
    showEdit(data1) {
      this.editData = data1
      this.dialog = true
      if (this.editData) {
        this.dataEdit.name = this.editData.name
        this.dataEdit.gender = this.editData.gender
        this.dataEdit.tel = this.editData.tel
        this.dataEdit.password = this.editData.password
        this.dataEdit.address = this.editData.address
        this.dataEdit.position = this.editData.position
        this.dataEdit.role = this.editData.role
      }
    },
    async deleteData(id) {
      await this.$store.dispatch('staff/deleteData', id)
      this.showDailog = false
      await this.$store.dispatch('staff/staffInfo')
    },
    async addData() {
      await this.$store.dispatch('staff/postData', { ...this.dataInput })
      await this.$store.dispatch('staff/staffInfo')
      this.dataInput.name = ''
      this.dataInput.gender = ''
      this.dataInput.tel = ''
      this.dataInput.password = ''
      this.dataInput.address = ''
      this.dataInput.position = ''
      this.dataInput.role = ''
      this.showAddDialog = false
    },
    async updateData(id) {
      const ddd = this.dataEdit
      await this.$store.dispatch('staff/updateData', { ddd, id })
      await this.$store.dispatch('staff/staffInfo')
      this.dialog = false
    },
  },
}
</script>
