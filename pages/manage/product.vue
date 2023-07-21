<template>
  <div>
    <v-card
      class="cyan accent-4 white--text white--text mb-5 font-weight-bold d-flex justify-center"
    >
      <div class="py-2">
        <h2>ຈັດການຂໍ້ມູນສິນຄ້າ</h2>
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
            style="width: 100"
            class="cyan accent-4 white--text"
            @click="showAddDialog = !showAddDialog"
            ><span>ເພີ່ມຂໍ້ມູນສິນຄ້າ</span>
            <v-icon>mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="productData"
        :items-per-page="5"
        color="success"
        :search="searchTerm"
      >
      <template #[`item.profile`]="{value}">
        <v-img :src="value" width="60"></v-img>
      </template>
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
        <template #[`item.sale_price`]="{ item }">
          {{ toCurrencyString(item.sale_price) }}
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="showDailog" width="540" activator="parent" persistent>
      <v-card>
        <v-toolbar class="cyan accent-4 white--text">
          <h3 color="black">ທ່ານເເນ່ໃຈບໍ ?</h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDailog = !showDailog">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-2 col-12">
          <div class="d-flex justify-space-between">
            <v-card-text>barcode : {{ showData.barcode }} </v-card-text>
            <v-card-text>ຊື່ສິນຄ້າ : {{ showData.name }} </v-card-text>
          </div>
          <div class="d-flex justify-space-between">
            <v-card-text
              >ປະເພດສິນຄ້າ : {{ showData.product_type_name }}
            </v-card-text>
            <v-card-text
              >ລາຄາ : {{ toCurrencyString(parseInt(showData.sale_price)) }}
            </v-card-text>
          </div>
          <div class="d-flex justify-space-between">
            <v-card-text>ຈຳນວນ : {{ showData.quatity }} </v-card-text>
            <v-card-text>ຫົວໜ່ວຍ : {{ showData.unit_name }} </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            width="100"
            :loading="loading"
            @click="deleteData(showData.id)"
          >
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
              <v-icon color="error">mdi-close</v-icon>
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
          <v-col cols="12">
            <v-text-field
              v-model="product_type_update.quatity"
              outlined
              dense
              hide-details="auto"
              label="ຈຳນວນ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="product_type_update.sale_price"
              outlined
              dense
              hide-details="auto"
              label="ລາຄາຂາຍ"
              color="success"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              width="100"
              class="cyan accent-4 white--text"
              :loading="loading"
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
          <v-toolbar class="cyan accent-4 white--text">
            <div>ເພີ່ມຂໍ້ມູນສິນຄ້າ</div>
            <v-spacer></v-spacer>
            <v-btn icon @click="showAddDialog = !showAddDialog">
              <v-icon color="error">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <!-- <div>{{unitInfo.rows}}</div> -->
          <v-col cols="12">
            <v-select
              v-model="product_type_id"
              :items="productTypeData.rows"
              item-text="name"
              item-value="id"
              return-object
              outlined
              dense
              hide-details="auto"
              label="ຊື່ປະເພດສິນຄ້າ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="unit_id"
              :items="unitInfo.rows"
              item-text="name"
              item-value="id"
              outlined
              dense
              return-object
              hide-details="auto"
              label="ຫົວໜ່ວຍ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="supplier_id"
              :items="supplierInfo.rows"
              item-text="name"
              item-value="id"
              outlined
              dense
              hide-details="auto"
              label="ຜູ້ສະໜອງ"
              return-object
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່ສິນຄ້າ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="quatity"
              type="number"
              outlined
              dense
              hide-details="auto"
              label="ຈຳນວນ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="sale_price"
              type="number"
              outlined
              dense
              hide-details="auto"
              label="ລາຄາຂາຍ"
              color="success"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="price"
              type="number"
              outlined
              dense
              hide-details="auto"
              label="ລາຄາ"
              color="success"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" class="">
            <div class="justify-center text-center mt-5">
              <div>
                <v-avatar
                  size="130"
                  style="
                    border-radius: 10%;
                    border: 3px solid teal;
                    box-shadow: 12px;
                  "
                >
                  <v-img v-if="url" :src="url"></v-img>
                  <v-img v-else src="/images/logo.png"></v-img>
                </v-avatar>
              </div>
              <v-file-input
                id="file"
                v-model="file"
                :rules="imageRules"
                label="Image"
                class="d-none"
                prepend-icon="mdi-camera"
                @change="onFileChange"
              ></v-file-input>
              <!-- Upload button -->
              <v-btn class="mt-2" color="primary" small @click="upload">
                <v-icon>mdi-tray-arrow-up</v-icon>
                Upload
              </v-btn>
            </div>
          </v-col>

          <div class="d-flex justify-end pa-4">
            <v-btn
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
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'ManageProductType',
  data() {
    return {
      urlImage:null,
      file: null,
      url: null,
      imageRules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Image size should be less than 2 MB!',
        (value) =>
          !value ||
          ['image/jpeg', 'image/png'].includes(value.type) ||
          'Only JPEG/PNG images are allowed!',
      ],
      loading: false,
      product_type: {
        name: '',
      },
      product_type_update: {
        name: '',
        quatity: '',
        sale_price: '',
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
      supplier_id: '',
      unit_id: '',
      product_type_id: '',
      name: '',
      quatity: 0,
      sale_price: 0,
      price: 0,

      headers: [
        { text: 'ລະຫັດ', value: 'barcode' },
        { text: 'ຮູບ', value: 'profile' },
        { text: 'ຊື່ສິນຄ້າ', value: 'name' },
        { text: 'ປະເພດສິນຄ້າ', value: 'product_type_name' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit_name' },
        { text: 'ລາຄາຂາຍ', value: 'sale_price' },
        { text: 'ຈຳນວນ', value: 'quatity' },
        { text: 'ຜູ້ສະໜອງ', value: 'supplier_name' },
        { text: 'ວັນທີ່', value: 'created_at' },
        { text: 'actions', value: 'action' },
      ],
    }
  },
  computed: {
    productTypeData() {
      return this.$store.state.product.productTypeData
    },
    unitInfo() {
      return this.$store.state.product.unitData
    },
    supplierInfo() {
      return this.$store.state.product.supplierData
    },
    productData() {
      return this.$store.state.product.productData
    },
  },
  async mounted() {
    await this.$store.dispatch('product/getAll')
    await this.$store.dispatch('product/getUnit')
    await this.$store.dispatch('product/getAllData')
    await this.$store.dispatch('product/getProductData')
  },
  methods: {
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e)
      }
    },

    upload() {
      document.getElementById('file').click()
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    showProductType(data) {
      this.showData = data
      this.showDailog = true
    },
    async deleteData(id) {
      this.loading = true
      await this.$store.dispatch('product/deleteData', id)
      await this.$store.dispatch('product/getProductData')
      this.showDailog = false
      this.loading = false
    },
    showEdit(dataEdit) {
      this.showEditData = dataEdit
      this.dialog = true
      if (this.showEditData) {
        this.product_type_update.name = this.showEditData.name
        this.product_type_update.quatity = this.showEditData.quatity
        this.product_type_update.sale_price = this.showEditData.sale_price
      }
    },
    async editData(id) {
      this.loading = true
      const data = this.product_type_update
      await this.$store.dispatch('product/updateData', { data, id })
      await this.$store.dispatch('product/getProductData')
      this.dialog = false
      this.loading = false
    },
    async addData() {
      const file = this.file
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        try {
          const response = await this.$axios.post(
            'http://localhost:2023/upload/single',
            formData
          )
          this.urlImage = response?.data?.url
        } catch (error) {
          this.$toast.error('File upload failed', error)
        }
      }
      this.loading = true
      const data = {
        name: this.name,
        profile:this.urlImage,
        quatity: this.quatity,
        sale_price: this.sale_price,
        price: this.price,
        supplier_id: this.supplier_id.id,
        unit_id: this.unit_id.id,
        product_type_id: this.product_type_id.id,
      }
      await this.$store.dispatch('product/createProduct', { ...data })
      this.name = ''
      this.quatity = ''
      this.sale_price = ''
      this.price = ''
      this.supplier_id = ''
      this.unit_id = ''
      this.product_type_id = ''
      await this.$store.dispatch('product/getProductData')
      this.showAddDialog = false
      this.loading = false
    },
  },
}
</script>
