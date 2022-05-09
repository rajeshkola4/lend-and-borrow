<template>
  <v-container fluid pa-0>
    <v-row no-gutters>
      <v-col col="12">
        <v-card height="500px">
          <v-card-title class="headline text-center">
            <span>{{ transactionType == "owe" ? "YOU OWE" : "YOU ARE OWED" }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-center" v-if="trasactionList.length != 0">
            <v-list subheader two-line>
              <v-list-item
                v-for="(transaction, i) in trasactionList"
                :key="transactionType + '_transaction' + i"
              >
                <transaction-list-item
                  :userName="transaction.userName"
                  :transactionType="transactionType"
                  :transactionValue="transaction.transactionValue"
                  :amountTextColor="amountTextColor"
                >
                </transaction-list-item>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-text class="text-center" v-else>
            <span>{{ transactionType == "owe" ? "Hurray! You owe nothing" : "Hmm. No one owes you anything" }} </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TransactionListItem from "@/components/home/transaction/TransactionListItem.vue";
export default {
  name: "TransactionList",
  components: { TransactionListItem },
  props: {
    transactionType: {
      type: String,
      default: function () {
        return "";
      },
    },
    trasactionList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    amountTextColor: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
  computed: {},
  methods: {},
};
</script>
