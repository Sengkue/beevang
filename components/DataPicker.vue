<template>
  <v-menu v-model="menu" offset-y :close-on-content-click="false">
    <template #activator="{ on }">
      <v-icon color="primary" v-on="on">mdi-calendar</v-icon>
    </template>
    <v-date-picker v-model="picker" @click="menu = false" />
  </v-menu>
</template>
<script>
export default {
  name:"DataPicker",
  props: {
    value: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
    },
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    picker: {
      get() {
        return this.value;
      },
      set(val) {
        this.menu = false;
        this.$emit("input", val);
      },
    },
  },
};
</script>