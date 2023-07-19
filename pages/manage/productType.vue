<template >
  <div>
    <v-card class="cyan accent-4 white--text white--text mb-5 font-weight-bold d-flex justify-center">
      <div class="py-2 ">
        <h2>
          ຈັດການຂໍ້ມູນປະເພດ
        </h2>
      </div>
    </v-card>
    <v-card>
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
          dark
            style="width: 100"
            class="cyan accent-4 white--text"
            @click="showAddDialog = !showAddDialog"
            ><span >ເພີ່ມຂໍ້ມູນປະເພດສິນຄ້າ</span>
            <v-icon >mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="productData.rows"
        :items-per-page="5"
        color="success"
        :search="searchTerm"
      >
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="showProductType(item)"
              >
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
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format('DD-MM-YYYY') }}
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="showDailog" width="540" activator="parent" persistent>
      <v-card>
        <v-toolbar class="cyan accent-4 white--text white--text">
          <v-card-title>ທ່ານເເນ່ໃຈບໍ ?</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDailog = !showDailog">
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-2 col-12">
          <div>
            <v-card-title>ຊື່ : {{ showData.name }} </v-card-title>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" width="100" @click="deleteData(showData.id)">
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
          <v-toolbar class="cyan accent-4 white--text">
            <div>ແກ້ໄຂຂໍ້ມູນປະເພດສິນຄ້າ</div>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="product_type_update.name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="success"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              dark
              width="100"
              class="cyan accent-4 white--text"
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
          <v-toolbar class="cyan accent-4 white--text white--text">
            <div>ເພີ່ມຂໍ້ມູນປະເພດສິນຄ້າ</div>
            <v-spacer></v-spacer>
            <v-btn icon  @click="showAddDialog = !showAddDialog">
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="product_type.name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່ປະເພດສິນຄ້າ"
              color="success"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              darj
              width="100"
              class="cyan accent-4 white--text"
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
  name: 'ManageProductType',
  data() {
    return {
      loading:false,
      product_type: {
        name: '',
      },
      product_type_update: {
        name: '',
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
        { text: 'ລະຫັດ', value: 'id' },
        { text: 'ຊື່ປະເພດສິນຄ້າ', value: 'name' },
        { text: 'ວັນທີ່', value: 'created_at' },
        { text: 'actions', value: 'action' },
      ],
    }
  },
  computed: {
    productData() {
      return this.$store.state.productType.productTypeData
    },
  },
  async mounted() {
    await this.$store.dispatch('productType/getAll')
  },
  methods: {
    showProductType(data) {
      this.showData = data
      this.showDailog = true
    },
    async deleteData(id) {
      await this.$store.dispatch('productType/deleteData', id)
      await this.$store.dispatch('productType/getAll')
      this.showDailog = false
    },
    showEdit(dataEdit) {
      this.showEditData = dataEdit
      this.dialog = true
      if (this.showEditData) {
        this.product_type_update.name = this.showEditData.name
      }
    },
    async editData(id) {
        const data = this.product_type_update
        await this.$store.dispatch('productType/updateData', { data, id })
        await this.$store.dispatch('productType/getAll')
        this.dialog = false
    },
    async addData() {
      this.loading = true
      await this.$store.dispatch('productType/createProductType', {
        ...this.product_type,
      })
      this.product_type.name = ''
      await this.$store.dispatch('productType/getAll')
      this.showAddDialog = false
      this.loading = false
    },
  },
}
</script>
