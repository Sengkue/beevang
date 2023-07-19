<template>
  <v-app class="color">
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" md="6" sm="12" class="mx-auto">
        <v-card class="pa-4" elevation="5">
          <div class="d-flex justify-center align-center">
            <div>
              <v-img
                class="images mx-auto"
                :src="require(`../assets/logo.svg`)"
                alt="logo_clinic"
              />
            </div>
            <div class="ml-3" style="color: #9155fd">ຄີຣນິກ ດຣ ສະຖຽນ</div>
          </div>
          <div class="d-flex justify-center">
            <v-card-title style="color: #9155fd">ລົງທະບຽນ !</v-card-title>
          </div>
            <v-card-text>
              <v-text-field
                v-model="staffData.name"
                outlined
                dense
                append-icon="mdi-account-outline"
                type="text"
                label="ຊື່ຜູ້ໃຊ້"
                required
                color="#9155fd"
              />
              <v-select
                v-model="staffData.gender"
                :items="['ຊາຍ', 'ຍິງ']"
                outlined
                dense
                type="text"
                label="ເພດ"
                required
                color="#9155fd"
              />
              <v-text-field
                v-model="staffData.address"
                outlined
                dense
                append-icon="mdi-map-marker-outline"
                label="ທີ່ຢູ່"
                required
                color="#9155fd"
              />
              <v-text-field
                v-model="staffData.position"
                outlined
                dense
                append-icon="mdi-account-star-outline"
                label="ຕຳເເໜ່ງ"
                required
                color="#9155fd"
              />
              <v-text-field
                v-model="staffData.tel"
                outlined
                dense
                append-icon="mdi-email-outline"
                label="ເບີໂທລະສັບ"
                placeholder="02054116077"
                required
                color="#9155fd"
                hide-details="auto"
              />
                <div style="color:red" class="mb-3">*ເບີໂທລະສັບໃຊ້ເຂົ້າສູ່ລະບົບ</div>
              <v-text-field
                v-model="staffData.password"
                :type="hidePassword ? 'text' : 'password'"
                label="ລະຫັດຜ່ານ"
                outlined
                dense
                hide-details="auto"
                required
                color="#9155fd"
              >
                <template #append>
                  <v-btn
                    icon
                    style="color: #9155fd"
                    @click="hidePassword = !hidePassword"
                  >
                    <v-icon class="pb-2">{{
                      hidePassword ? "mdi-eye" : "mdi-eye-off"
                    }}</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
              <div style="color:red">*ລະຫັດຜ່ານໃຊ້ເຂົ້າສູ່ລະບົບ</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn block type="submit" color="#9155fd" @click="onSignUp">
                <span class="white--text px-8">ລົງທະບຽນ</span>
              </v-btn>
            </v-card-actions>
            <div class="d-flex justify-end">
              <div class="text">
                ມີບັນຊີເເລ້ວ ?
                <v-btn text style="color: #9155fd; cursor: pointer" to="/login"
                  >ເຂົ້າສູ່ລະບົບ</v-btn
                >
              </div>
            </div>
        </v-card>
      </v-col>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "SignUpPages",
  layout: "blank",
  data() {
    return {
      hidePassword: false,
      staffData: {
        name: "",
        gender: "",
        tel: "",
        password: "",
        address: "",
        position: "",
      },
    };
  },
  methods: {
    onSignUp() {
      this.$store.dispatch("signUp/register", {...this.staffData});
    },
  },
};
</script>
<style>
* {
  font-family: 'Noto Sans Lao';
}
</style>