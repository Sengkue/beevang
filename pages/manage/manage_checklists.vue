<template>
  <div>
    <v-card
      class="cyan accent-4 white--text white--text mb-5 font-weight-bold d-flex justify-center"
    >
      <div class="py-2">
        <h2>ຈັດການຂໍ້ມູນອັດຕາການເເລກປ່ຽນ</h2>
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
        <v-col cols="12" md="2" sm="3" class="d-flex justify-end">
          <v-btn
            style="width: 100"
            class="cyan accent-4 white--text"
            @click="showAddDialog = !showAddDialog"
          >
            <span>ເພີ່ມຂໍ້ມູນລາຍການ</span>
            <v-icon>mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="showDiseas"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon
                  color="error"
                  :loading="loading"
                  @click="showDelete(item)"
                >
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon
                  color="#9155FD"
                  :loading="loading"
                  @click="dataEdit(item)"
                >
                  mdi-pencil-outline
                </v-icon>
              </v-btn>
            </template>
            <span>ເເກ້ໄຂ</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <!-- show delete data -->
    <v-dialog v-model="showDialog" width="540" activator="parent" persistent>
      <v-card>
        <v-toolbar class="cyan accent-4 white--text">
          <v-card-title>ທ່ານເເນ່ໃຈບໍ ?</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDialog = !showDialog">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-2 col-12">
          <div class="d-flex align-center justify-space-between text-center">
            <v-card-text class="mb-2">
              ລາຍການ :
              {{ storeDeleteData.name }}
            </v-card-text>
            <v-card-text class="mb-2">
              ໄລເປັນເງິນກີບ :
              {{ storeDeleteData.price }}
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            width="100"
            :loading="loading"
            @click="deleteData(storeDeleteData.id)"
          >
            <div class="text--white">ລຶບ</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- show edit data -->
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar class="cyan accent-4 white--text">
            <div>ແກ້ໄຂຂໍ້ມູນອັດຕາການເເລກປ່ຽນ</div>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="editInformation.name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່ອັດຕາ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editInformation.price"
              outlined
              dense
              hide-details
              label="ລາຄາ"
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              :loading="loading"
              width="100"
              class="cyan accent-4 white--text"
              @click="editInfo(storeEditData.id)"
            >
              ບັນທືກ
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- post data  -->
    <v-row>
      <v-dialog
        v-model="showAddDialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar class="cyan accent-4 white--text">
            <div>ເພີ່ມຂໍ້ມູນອັດຕາການແລກປ່ຽນ</div>
            <v-spacer></v-spacer>
            <v-btn icon @click="showAddDialog = !showAddDialog">
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="storeData.name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່ອັດຕາ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="storeData.bathtokip"
              outlined
              dense
              hide-details
              label="ລາຄາບາດໃນກີບ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="storeData.dollartokip"
              outlined
              dense
              hide-details
              label="ລາຄາໂດລາໃນກີບ"
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              width="100"
              class="cyan accent-4 white--text"
              :loading="loading"
              @click="addData"
            >
              ບັນທືກ
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageChecklistsPages',
  data() {
    return {
      loading: false,
      searchTerm: '',
      showDialog: false,
      dialog: false,
      showAddDialog: false,
      storeDeleteData: {},
      storeEditData: {},
      storeData: {
        name: '',
        bathtokip: '',
        dollartokip: '',
      },
      editInformation: {
        name: '',
        price: '',
      },
      headers: [
        { text: 'ຊື່', value: 'name' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'Actions', value: 'action' },
      ],
      showDiseas: [],
    };
  },
  mounted() {
    this.shoot();
  },
  methods: {
    async shoot() {
      try {
        const response = await axios.get('http://localhost:2023/exchange');
        const exchangeData = response.data;

        this.showDiseas = exchangeData.map((exchange) => {
          return {
            id: exchange.id,
            name: exchange.name,
            price: exchange.bathtokip || exchange.dollartokip,
          };
        });
      } catch (error) {
        this.$toast.error(error);
      }
    },
    async addData() {
      this.loading = true;
      try {
        await axios.post('http://localhost:2023/exchange', {
          name: this.storeData.name,
          bathtokip: this.storeData.bathtokip,
          dollartokip: this.storeData.dollartokip,
        });
        this.storeData.name = '';
        this.storeData.bathtokip = '';
        this.storeData.dollartokip = '';
        this.showAddDialog = false;
        this.loading = false;
      } catch (error) {
        this.$toast.error(error);
      }
      this.shoot();
    },
    showDelete(data) {
      this.storeDeleteData = data;
      this.showDialog = true;
    },
    async deleteData(id) {
      this.loading = true;
      try {
        await axios.delete(`http://localhost:2023/exchange/${id}`);

        const index = this.showDiseas.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.showDiseas.splice(index, 1);
        }

        this.loading = false;
        this.showDialog = false;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    dataEdit(data1) {
      this.storeEditData = data1;
      this.dialog = true;
      if (this.storeEditData) {
        this.editInformation.name = this.storeEditData.name;
        this.editInformation.price = this.storeEditData.price;
      }
    },
    async editInfo(id) {
      this.loading = true;
      try {
        const data = this.editInformation;
        await axios.put(`http://localhost:2023/exchange/${id}`, data);

        const index = this.showDiseas.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.showDiseas[index].name = data.name;
          this.showDiseas[index].price = data.price;
        }

        this.dialog = false;
        this.loading = false;
      } catch (error) {
        this.$toast.error(error);
      }
    },
  },
};
</script>
