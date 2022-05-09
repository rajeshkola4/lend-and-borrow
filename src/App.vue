<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style lang="sass">
.dialog-card
  background-color: #f4f6f9 !important

.theme--dark.dialog-card
  background-color: #f4f6f9 !important

.theme--dark.dialog-card
  background-color: black !important
</style>