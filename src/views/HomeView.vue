<template>
  <v-container fluid pa-4>
    <v-row no-gutters>
      <v-col col="8">
        <v-row no-gutters>
          <v-col cols="6" class="px-4">
            <add-expense-dialog></add-expense-dialog>
          </v-col>
          <v-col cols="6" class="px-4">
            <v-btn
              elevation="2"
              color="#F55E5B"
              class="white--text"
              block
              x-large
              >Settle Up</v-btn
            >
          </v-col>
        </v-row>
        <v-row no-gutters class="my-3">
          <v-col cols="4" class="text-center px-4">
            <amount-display-card :card_text="'Total Balance'" :amountValue="userBalanceAmount" :amountTextColor="userBalanceColor"></amount-display-card>
          </v-col>
          <v-col cols="4" class="text-center px-4">
            <amount-display-card :card_text="'You Owe'" :amountValue="userOweAmount" :amountTextColor="'red'"></amount-display-card>
          </v-col>
          <v-col cols="4" class="text-center px-4">
            <amount-display-card :card_text="'You are owed'" :amountValue="userOwedAmount" :amountTextColor="'green'"></amount-display-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        {{ user }}
        {{ userOweAmount }}
        {{ userOwedAmount }}
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4" class=" pl-4 pr-1">
        <transaction-list :transactionType="'owe'" :trasactionList="userOweList" :amountTextColor="'red'"></transaction-list>
      </v-col>
      <v-col cols="4" class="pr-4 pl-1">
        <transaction-list :transactionType="'owed'" :trasactionList="userOwedList" :amountTextColor="'green'"></transaction-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import AmountDisplayCard from '@/components/home/AmountDisplayCard.vue'
import AddExpenseDialog from '@/components/home/AddExpenseDialog.vue'
import TransactionList from '@/components/home/TransactionList.vue'
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    AmountDisplayCard,
    AddExpenseDialog,
    TransactionList
  },
  computed: {
    ...mapGetters({
      user: "lbStore/getterUser",
    }),
    // userBalance(){
    //   return this.$store.getters["lbStore/getterUserBalance"](this.user.user_id)
    // },
    userOweAmount() {
      return this.$store.getters["lbStore/getterUserOweAmount"](
        this.user.user_id
      );
    },
    userOwedAmount() {
      return this.$store.getters["lbStore/getterUserOwedAmount"](
        this.user.user_id
      );
    },
    userBalanceAmount(){
      return Math.abs(this.userOwedAmount - this.userOweAmount)
    },
    userBalanceColor(){
     return (this.userOwedAmount - this.userOweAmount) > 0 ? "green" : "red"
    },
    userOweList(){
     let oweListObj =  this.$store.getters["lbStore/getterUserOweList"](
        this.user.user_id
      );
      let oweList = Object.keys(oweListObj).map((userId) =>Object.assign({},{"userName":this.$store.getters["lbStore/getterUserName"](userId), "transactionValue":oweListObj[userId]})).filter(a=> !(a.transactionValue == 0));
      return oweList;
    },
    userOwedList(){
      let owedListObj =  this.$store.getters["lbStore/getterUserOwedList"](
        this.user.user_id
      );
      let owedList = Object.keys(owedListObj).map((userId) =>Object.assign({},{"userName":this.$store.getters["lbStore/getterUserName"](userId), "transactionValue":owedListObj[userId]})).filter(a=> !(a.transactionValue == 0));
      return owedList
    }
  },
};
</script>
