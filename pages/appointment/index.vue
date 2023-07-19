<template>
  <div class="mt-5">
    <v-card width="1000" class="ml-16">
      <div class="container font-weight-bold " style="color:#9155fd">{{title}}</div>
     <v-row>
      <v-col cols="12" sm="12" md="6">
        
      </v-col>
      <v-col cols="12" sm="12" md="6"></v-col>
     </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "AppointmentPages",
  data() {
    return {
      title: "ນັດໝາຍ",
      // headers: [
      //   { text: "ລຳດັບ", value: "pk" },
      //   { text: "xouaya", value: "ລາຍການກວດ" },
      //   { text: "ລາຄາ", value: "ລາຄາ" },
      //   { text: "ຈຳນວນຄັ້ງກວດ", value: "ຈຳນວນຄັ້ງກວດ" },
      //   { text: "ລາຄາລວມ", value: "ລາຄາລວມ" },
      // ],

    };
  },
};
</script>
<style>
</style>