<template>
  <div>
    <v-btn
      :class="{
        'success white--text': data.Guanranted,
        'red white--text': !data.Guanranted,
      }"
      width="100%"
      @click="showDialogAndClickButton"
    >
      <v-icon>{{ data.Guanranted ? 'mdi-check' : '' }}</v-icon>
      {{ data.Guanranted ? 'ຮັບປະກັນ' : 'ບໍ່ຮັບປະກັນ' }}
    </v-btn>
    <!-- Show dialog -->
    <v-dialog v-model="dialogVisible">
      <v-card>
        <v-card-title>
          <span>ລາຍບະອຽດຮັບປະການ</span>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="saveDateAndCloseDialog()">
            Close
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-switch
                  v-model="data.Guanranted"
                  label="ລະບົບປະກັນ"
                  :label-position="data.Guanranted ? 'left' : 'right'"
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Picker in dialog"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.dialog.save(date)
                        saveDateAndCloseDialog()
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                  <!-- Add close button here -->
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'BeevangFrondEndGuanranted',
  data() {
    return {
      dialogVisible: false,
      modal: false,
      date: new Date().toISOString().substr(0, 10),
      data: {
        Guanranted: false,
        Date_expired: null,
      },
    }
  },
  methods: {
    saveDateAndCloseDialog() {
      this.data.Date_expired = this.date
      this.dialogVisible = false
      this.$store.commit('sale/setGuanranted', this.data)
    },
    showDialogAndClickButton() {
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
/* Add your scoped styles here */
</style>
