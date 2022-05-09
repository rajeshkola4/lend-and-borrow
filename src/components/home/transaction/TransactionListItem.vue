<template>
<v-row no-gutters>
  <v-col cols="12">
    <v-list-item class="text-left">
   <v-avatar color="#839299" size="40" class="mr-2">
            <span class="white--text text-h5">{{
              userName[0] != null && userName[0] != undefined
                ? userName[0].toUpperCase()
                : ""
            }}</span>
          </v-avatar>
    <v-list-item-content class="text-left mx-4">
      <v-list-item-title v-text="userName"></v-list-item-title>
      <v-list-item-subtitle>
        <span>{{ transactionType == "owe" ? "you owe" : "owes you" }} </span>
        <span :class="amountTextColor+'--text'">{{ transactionValue }}</span>
      </v-list-item-subtitle>
    </v-list-item-content>
    </v-list-item>
    <v-divider inset></v-divider>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: "TransactionListItem",
  components: {},
  props: {
    userName: {
      type: String,
      default: function () {
        return "";
      },
    },
    transactionType: {
      type: String,
      default: function () {
        return "";
      },
    },
    transactionValue: {
      type: Number,
      default: function () {
        return 0;
      },
    },
    amountTextColor:{
       type: String,
      default: function () {
        return "";
      },
    }
  },
  computed: {},
};
</script>
