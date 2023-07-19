<template>
  <v-app class="background">
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" md="6" sm="12" class="mx-auto">
        <v-card class="pa-4" elevation="5">
          <div class="d-flex justify-center align-center">
            <div>
              <v-img
                class="images mx-auto"
                :src="require(`../assets/store1.png`)"
                alt="logo_store"
              />
            </div>
            <div class="ml-3">ຮ້ານ LM Computer</div>
          </div>
          <div class="d-flex justify-center">
            <v-card-title
              >ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ !</v-card-title
            >
          </div>
          <!-- <v-form > -->
            <v-card-text>
              <v-text-field
                v-model="signInData.tel"
                :rules="[() => !!signInData.tel]"
                outlined
                dense
                append-icon="mdi-phone-outline"
                type="text"
                label="ເບີໂທລະສັບ"
                placeholder="02054116088"
                required
              />
              <v-text-field
                v-model="signInData.password"
                :rules="[() => !!signInData.password]"
                :type="hidePassword ? 'text' : 'password'"
                label="ລະຫັດຜ່ານ"
                outlined
                dense
                hide-details="auto"
                required
              >
                <template #append>
                  <v-btn
                    icon
                    @click="hidePassword = !hidePassword"
                  >
                    <v-icon class="pb-2">{{
                      hidePassword ? 'mdi-eye' : 'mdi-eye-off'
                    }}</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn block type="submit" color="success" @click="onLogin">
                <span class="white--text px-8">ເຂົ້າສູ່ລະບົບ</span>
              </v-btn>
            </v-card-actions>
            <div class="d-flex justify-end">
              <div class="text">
                ບໍ່ມີບັນຊີ ?
                <v-btn text style=" cursor: pointer" to="/signUp"
                  >ລົງທະບຽນ</v-btn
                >
              </div>
            </div>
          <!-- </v-form> -->
        </v-card>
      </v-col>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'LoginPages',
  layout: 'blank',
  //  middleware: 'onlogin',
  //  middleware: 'auth',
  data() {
    return {
      hidePassword: false,
      signInData: {
        tel: '02077975212',
        password: '123456',
      },
    }
  },
  methods: {
    onLogin() {
    this.$store.dispatch("login/signIn", {...this.signInData});
    }
  },
}
</script>
<style  scoped>
* {
  font-family: 'Noto Sans Lao';
}
.text {
  font-size: 16px;
}
.pointer {
  cursor: pointer;
  color: #9155fd;
}
.images {
  width: 60px;
  height: 60px;
}
</style>>
  
</style>