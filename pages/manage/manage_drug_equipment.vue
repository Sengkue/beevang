<template >
      <div>
    <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">ຈັດການຂໍ້ມູນຢາ ເເລະ ອຸປະກອນ</div>
    <v-card>
      <!-- search button------------------------------- -->
      <v-row  class="d-flex align-center col-12">
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
          <v-btn  style="width:100" color="#9155FD" @click="showAddDialog = !showAddDialog"
            ><span style="color:white">ເພີ່ມຂໍ້ມູນ</span>
            <v-icon color="white">mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.action`]>
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="error" @click="showDailog = !showDailog"
                  >mdi-trash-can-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#9155FD" @click="dialog = !dialog"
                  >mdi-pencil-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ເເກ້ໄຂ</span>
          </v-tooltip>
        </template>
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
              XOUAYANG
            </v-card-text>
            <v-card-text class="mb-2"
              >ທີ່ຢູ່ <br />
              XAYSOMBOUN</v-card-text
            >
          </div>
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ເບີໂທລະສັບ<br />
              02054116066
            </v-card-text>
            <v-card-text class="mb-2"
              >ວັນ ເດືອນ ປີ ເກີດ <br />
              04/12/2000
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" width="100" @click="showDailog = false">
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
            <div>ແກ້ໄຂຂໍ້ມູນຄົນເຈັບ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
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
              @click="dialog = false"
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
   name:"ManageDrugEquipment" ,
   data() {
    return {
      searchTerm: "",
      showDailog: false,
      dialog: false,
      showAddDialog : false,
      headers: [
        { text: "ລະຫັດ", value: "ລະຫັດ" },
        { text: "ຊື່", value: "ຊື່" },
        { text: "ຈຳນວນ", value: "ຈຳນວນ" },
        { text: "ລາຄາ", value: "ລາຄາ" },
        { text: "Actions", value: "action" },
      ],
      items: [
        {
          ລະຫັດ: "1",
          ຊື່: "XOUAYANG",
          ຈຳນວນ: "1000",
          ລາຄາ: "100000",
        },
        {
          ລະຫັດ: "2",
          ຊື່: "XOUAYANG",
          ຈຳນວນ: "400",
          ລາຄາ: "104500",
        },
        
      ],
    };
  },  
}
</script> 