<template>
  <div>
    <v-card
      class="cyan accent-4 white--text white--text mb-5 font-weight-bold d-flex justify-center"
    >
      <div class="py-2">
        <h2>ຈັດການຂໍ້ມູນຜູ້ສະໜອງ</h2>
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
              color="success"
            />
          </v-card-title>
        </v-col>
        <v-col cols="12" md="2" sm="3" class="d-flex justify-end">
          <v-btn
            style="width: 100"
            class="cyan accent-4 white--text"
            @click="showAddDialog = !showAddDialog"
            ><span style="color: white">ເພີ່ມຂໍ້ມູນຜູ້ສະໜອງ</span>
            <v-icon color="white">mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="supplier.rows"
        :items-per-page="5"
        color="success"
        :search="searchTerm"
      >
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="showSupplier(item)">
                <v-icon color="error">mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="showEdit(item)">
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
    <v-dialog v-model="showDailog" width="540" activator="parent" persistent>
      <v-card>
        <v-toolbar dark class="cyan accent-4 white--text">
          <v-card-title>ທ່ານເເນ່ໃຈບໍ ?</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon :loading="loading" @click="showDailog = !showDailog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-2 col-12">
          <div class="d-flex align-center justify-space-between text-center">
            <v-card-text class="mb-2"
              >ຊື່ <br />
              {{ showData.name }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ທີ່ຢູ່ <br />
              {{ showData.address }}
            </v-card-text>
          </div>
          <div class="d-flex align-center text-center">
            <v-card-text class="mb-2"
              >ເບີໂທລະສັບ<br />
              {{ showData.tel }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ອີເມວ<br />
              {{ showData.email }}
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="cyan accent-4 white--text"
            width="100"
            :loading="loading"
            @click="deleteData(showData.id)"
          >
            <div class="white--text">ລຶບ</div>
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
          <v-toolbar dark class="cyan accent-4 white--text">
            <div>ແກ້ໄຂຂໍ້ມູນຜູ້ສະໜອງ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="supplierUpdate.name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierUpdate.address"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierUpdate.tel"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierUpdate.email"
              outlined
              dense
              hide-details
              label="ອີເມວ"
              color="success"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              :loading="loading"
              width="100"
              class="cyan accent-4 white--text white--text"
              @click="editData(showEditData.id)"
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
          <v-toolbar dark class="cyan accent-4 white--text">
            <div>ເພີ່ມຂໍ້ມູນ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="showAddDialog = !showAddDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="supplierInfo.name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierInfo.address"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierInfo.tel"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierInfo.email"
              outlined
              dense
              hide-details
              label="ອີເມວ"
              color="success"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              width="100"
              class="cyan accent-4 white--text white--text"
              :loading="loading"
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
  name: 'ManageSupplier',
  data() {
    return {
      loading: false,
      supplierInfo: {
        name: '',
        address: '',
        tel: '',
        email: '',
      },
      supplierUpdate: {
        name: '',
        address: '',
        tel: '',
        email: '',
      },
      searchTerm: '',
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      showData: {},
      showEditData: {},
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ອີເມວ', value: 'email' },
        { text: 'actions', value: 'action' },
      ],
    }
  },
  computed: {
    supplier() {
      return this.$store.state.supplier.suppliersData
    },
  },
  async mounted() {
    await this.$store.dispatch('supplier/getAllData')
  },
  methods: {
    showSupplier(data) {
      this.showData = data
      this.showDailog = true
    },
    async deleteData(id) {
      this.loading = true
      await this.$store.dispatch('supplier/deleteData', id)
      await this.$store.dispatch('supplier/getAllData')
      this.showDailog = false
      this.loading = false
    },
    showEdit(dataEdit) {
      this.showEditData = dataEdit
      this.dialog = true
      if (this.supplierInfo) {
        this.supplierUpdate.name = this.showEditData.name
        this.supplierUpdate.address = this.showEditData.address
        this.supplierUpdate.tel = this.showEditData.tel
        this.supplierUpdate.email = this.showEditData.email
      }
    },
    async editData(id) {
      this.loading = true
      const data = this.supplierUpdate
      await this.$store.dispatch('supplier/updateData', { data, id })
      await this.$store.dispatch('supplier/getAllData')
      this.dialog = false
      this.loading = false
    },
    async addData() {
      this.loading = true
      await this.$store.dispatch('supplier/postData', { ...this.supplierInfo })
      this.supplierInfo.name = ''
      this.supplierInfo.tel = ''
      this.supplierInfo.email = ''
      this.supplierInfo.address = ''
      await this.$store.dispatch('supplier/getAllData')
      this.showAddDialog = false
      this.loading = false
    },
  },
}
</script>
