<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      width="290"
    >
    
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="'A' + i"
          :to="item.to"
          router
          exact
          color="success"
          class="pa-3"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="(group, index) in menuItems"
          :key="'E' + index"
          :value="group.active"
          :prepend-icon="group.icon"
          no-action
          color="success"
          class="mb-2"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>{{
                group.title
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(item, i) in group.nestMenu"
            :key="i"
            :to="item.to"
            router
            exact
            class="rounded-xl"
            color="success"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-for="(item, i) in sale"
          :key="'B' + i"
          :to="item.to"
          router
          exact
          color="success"
          class="pa-3"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="(group, index) in menuList2"
          :key="'J' + index"
          :value="group.active"
          :prepend-icon="group.icon"
          no-action
          color="success"
          class="pt-3"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="pt-1">{{
                group.title
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(item, i) in group.nestList2"
            :key="i"
            :to="item.to"
            router
            exact
            class="rounded-xl"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          v-for="(group, index) in menuList3"
          :key="'F' + index"
          :value="group.active"
          :prepend-icon="group.icon"
          no-action
          class="pt-3"
          color="success"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="pt-1">{{
                group.title
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(item, i) in group.nestList3"
            :key="i"
            :to="item.to"
            router
            exact
            class="rounded-xl"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-for="(item, i) in search"
          :key="'K' + i"
          :to="item.to"
          router
          exact
          color="priamary"
          class="pa-3"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in reports"
          :key="'L' + i"
          :to="item.to"
          router
          exact
          color="primary"
          class="pa-3"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app elevation="1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <div v-ripple class="text-center px-3 cursor-pointer">
        <!-- <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              color="#9155FD"
              dark
              style="font"
              text
              rounded
              v-bind="attrs"
              v-on="on"
            >
              <v-badge color="success" dot>
                <span class="btn"
                  >ຜູ້ເຂົ້າໃໍຊ້ລະບົບ : {{ $cookies.get('name') }}</span
                >
              </v-badge>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar color="#9155FD">
                  <v-icon color="white">mdi-account-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>{{
                  $cookies.get('name')
                }}</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <div class="container">
                <v-list-item-title
                  >ເພດ : {{ $cookies.get('gender') }}</v-list-item-title
                >
                <v-list-item-title
                  >ທີ່ຢຸູ : {{ $cookies.get('address') }}</v-list-item-title
                >
                <v-list-item-title
                  >ເບີໂທລະສັບ : {{ $cookies.get('tel') }}</v-list-item-title
                >
                <v-list-item-title
                  >ຕຳເເໜ່ງ : {{ $cookies.get('position') }}</v-list-item-title
                >
                <v-list-item-title
                  >ສິດທິ : {{ $cookies.get('role') }}</v-list-item-title
                >
              </div>
            </v-list>
            <v-divider></v-divider>
            <div class="container d-flex justify-end">
              <v-btn color="#9155FD">
                <span style="color: white">ຕັ້ງຄ່າ</span>
                <v-icon color="white">mdi-cog-outline</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-menu> -->
      </div>
      <div v-ripple class=" text-center px-3 cursor-pointer">
        <v-btn text rounded @click="showDialog">
          <v-icon class="cyan accent-4 white--text"> mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main class="bgcolor">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer :absolute="!fixed" app class="d-flex justify-center">
      <span>ລະບົບຈັດການຮ້ານ LM Computer</span>
    </v-footer> -->

    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="cyan accent-4 white--text  ">
            <div class="text-center">ອອກຈາກລະບົບ!!!</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="text-center">
            <v-card-title class="text-center">
              ທ່ານຕ້ອງການອອກຈາກລະບົບບໍ ?
            </v-card-title>
          </div>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="error" @click="signOut">
              <v-icon color="white">mdi-power</v-icon>
              <span > ອອກຈາກລະບົບ</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'auth',
  data() {
    return {
      sun: false,
      clipped: true,
      drawer: false,
      fixed: false,
      show: false,
      dialog: false,
      showMemu: '',
      dataCheck: '',
      staffData: '',
      doctorData: '',

      menuList2: [
        {
          icon: 'mdi-cart-percent',
          title: 'ຈັດຊື້',
          nestList2: [
            { title: 'ກວດສອບຂໍ້ມູນສິນຄ້າ', to: '/orders' },
            { title: 'ປະຫວັດຈັດຊື້ຂໍ້ມູນສິນຄ້າ', to: '/orders/historyOrder' },
          ],
        },
      ],
      menuList3: [
        {
          icon: 'mdi-import',
          title: 'ນຳເຂົ້າ',
          nestList3: [
            { title: 'ກວດສອບນຳເຂົ້າ', to: '/import' },
            { title: 'ປະຫວັດນຳເຂົ້າສິນຄ້າ', to: '/import/historyImport' },
          ],
        },
      ],
      menuItems: [
        {
          icon: 'mdi-cogs',
          title: 'ຈັດການຂໍ້ມູນ',
          nestMenu: [
            { title: 'ຈັດການຂໍ້ມູນປະເພດສິນຄ້າ', to: '/manage/productType' },
            {
              title: 'ຈັດການຂໍ້ມູນສິນຄ້າ',
              to: '/manage/product',
            },
            {
              title: 'ຈັດການຂໍ້ມູນພະນັກງານຂາຍ',
              to: '/manage/manage_information_staff',
            },
            { title: 'ຈັດການຂໍ້ມູນຜູ້ສະໜອງ', to: '/manage/Manage_supplier' },
            {
              title: 'ຈັດການຂໍ້ມູນຫົວໜ່ວຍ',
              to: '/manage/unit',
            },
            {
              title: 'ຈັດການຂໍ້ມູນອັດຕາແລກປ່ຽນ',
              to: '/manage/manage_checklists',
            }
          ],
        },
      ],
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'ໜ້າຫຼັກ',
          to: '/',
        },
      ],
      sale: [
        {
          icon: 'mdi-currency-usd',
          title: 'ຂາຍສິນຄ້າ',
          to: '/sale',
        },
      ],
      search: [
        {
          icon: 'mdi-magnify',
          title: 'ຄົ້ນຫາ',
          to: '/search',
        },
      ],
      reports: [
        {
          icon: 'mdi-poll',
          title: 'ລາຍງານ',
          to: '/reports/reportTable',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ລະບົບຈັດການຮ້ານ LM Computer',
    }
  },
  mounted() {
    const check = this.$cookies.get('role')
    if (check === 'doctor' || check === 'staff') {
      this.dataCheck = check
    }
  },
  methods: {
    showDialog() {
      this.dialog = true
    },
    signOut() {
      this.$cookies.remove('token')
      this.$router.push('/login')
      this.$cookies.remove('name')
      this.$toast.success('ອອກຈາກລະບົບສຳເລັດ', {
        duration: 2000,
        position: 'top-right',
        iconPack: 'mdi',
        icon: 'check',
      })
    },
  },
}
</script>
<style >
* {
  font-family: 'Noto Sans Lao', serif;
}
.cursor-pointer {
  cursor: pointer !important;
}
.bgcolor {
  background-color: #eff3f6;
}
.btn {
  text-transform: inherit;
}
.appbarcolor {
  background: linear-gradient(
    68.6deg,
    rgb(252, 165, 241) 1.8%,
    rgb(181, 255, 255) 100.5%
  );
}
</style>
