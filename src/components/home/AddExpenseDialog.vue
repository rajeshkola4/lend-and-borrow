<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="2"
          v-bind="attrs"
          v-on="on"
          color="primary"
          class="white--text"
          block
          x-large
          @click="openDialog()"
          >Add Expense</v-btn
        >
      </template>
      <span>Add Expense</span>
    </v-tooltip>

    <v-dialog v-model="showDialog" max-width="600">
      <v-card class="dialog-card">
        <v-card-title class="headline text-center">
          <span>Add Expense</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-center">
          <v-container fluid pa-0>
            <v-row no-gutters class="my-2">
              <v-col cols="4" class="text-left pr-2 align-self-center">
                <span>Paid By</span>
              </v-col>
              <v-col cols="8">
                <v-select
                  solo
                  flat
                  v-model="exp.paidBy"
                  :items="users"
                  :menu-props="{ offsetY: true }"
                  :rules="[rules.isRequired]"
                  label="Select paid by"
                  item-text="user_name"
                  item-value="user_id"
                  hide-details="auto"
                  single-line
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row no-gutters class="my-2">
              <v-col cols="4" class="text-left pr-2 align-self-center">
                <span>Description</span>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  solo
                  flat
                  maxLength="200"
                  :rules="[rules.isRequired]"
                  hide-details="auto"
                  v-model="exp.desc"
                >
                </v-text-field>
              </v-col>
              <v-row no-gutters class="my-2">
                <v-col cols="4" class="text-left pr-2 align-self-center">
                  <span>Amount</span>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    solo
                    flat
                    type="number"
                    :rules="[rules.isRequired]"
                    hide-details="auto"
                    v-model="exp.amnt"
                    @input="changeExpAmnt"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row
                no-gutters
                class="my-2"
                v-show="exp.amnt != '' && exp.amnt != null"
              >
                <v-col cols="12" class="text-left pr-2 align-self-center">
                  <span>Shares</span>
                </v-col>
                <v-col
                  cols="12"
                  class="my-1"
                  v-for="user in users"
                  :key="user.user_id"
                >
                  <v-row no-gutters>
                    <v-col cols="4" class="align-self-center">
                      <p class="mb-0">{{ user.user_name }}</p>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        solo
                        flat
                        type="number"
                        hide-details="auto"
                        v-model="userShareValue[user.user_id]"
                        @input="
                          changeShareValue(
                            user.user_id,
                            userShareValue[user.user_id]
                          )
                        "
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="showDialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            class="elevation-0"
            :disabled="disableSaveExpenseBtn"
            @click="saveExpense"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import rules from "@/utils/rules";
export default {
  name: "AddExpenseDialog",
  components: {},
  data: () => ({
    shareValueMatch: false,
    rules: rules,
    showDialog: false,
    exp: {
      paidBy: "",
      desc: "",
      amnt: null,
    },
    userShareValue: {},
  }),
  props: {
    card_text: {
      type: String,
      default: function () {
        return "";
      },
    },
    amount_value: {
      type: Number,
      default: function () {
        return 0;
      },
    },
    amount_text_color: {
      type: String,
      default: function () {
        return "black";
      },
    },
  },
  watch: {
    userShareValue: {
      handler(val) {
        if (Object.keys(val).length > 0) {
          this.shareValueMatch =
            Math.ceil(
              Number(
                Object.values(this.userShareValue).reduce(
                  (a, b) => Number(a) + Number(b),
                  0
                )
              )
            ) == Math.ceil(this.exp.amnt)
              ? true
              : false;
        }
      },
      deep: true,
    },
  },
  computed: {
    disableSaveExpenseBtn() {
      let isDisabled =
        Object.values(this.exp).includes("") ||
        Object.values(this.exp).includes(null);
      isDisabled = isDisabled || !this.shareValueMatch;
      return isDisabled;
    },
  },
  methods: {
    cancel() {
      this.showDialog = false;
    },
    openDialog() {
      this.showDialog = true;
    },
    checkShareAmnt() {
      let totalShareValue = Object.entries(this.userShareValue);
      return totalShareValue;
    },
    changeExpAmnt() {
      if (this.exp.amnt != null && this.exp.amnt != "") {
        this.users.map((user) => {
          Object.assign(this.userShareValue, {
            [user.user_id]: (Number(this.exp.amnt) / this.users.length).toFixed(
              2
            ),
          });
        });
        this.shareValueMatch = true;
      }
    },
    changeShareValue(user_id, val) {
      this.userShareValue = Object.assign({}, this.userShareValue, {
        [user_id]: Number(val),
      });
    },
    saveExpense(){
      let shareVal = Object.assign({},this.userShareValue);
      delete shareVal[this.exp.paidBy];
      this.$store.commit("lbStore/ADD_EXPENSE", {userShareVal: shareVal, paidBy:this.exp.paidBy});
      this.cancel()
    }
  },
};
</script>
