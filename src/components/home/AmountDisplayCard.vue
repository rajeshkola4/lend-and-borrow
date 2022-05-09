<template>
  <v-container fluid pa-0>
    <v-row no-gutters>
      <v-col col="12">
        <v-card class="pa-4">
          <p clas="mb-0">{{ card_text }}</p>
          <p class="mb-0" :class="amountTextColor+'--text'">{{ amountValue }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "AmountDisplyCard",
  components: {},
  props: {
    card_text: {
      type: String,
      default: function () {
        return "";
      },
    },
    amountValue: {
      type: Number,
      default: function () {
        return 0;
      },
    },
    amountTextColor: {
      type: String,
      default: function () {
        return "black";
      },
    },
  },
  computed: {},
};
</script>
