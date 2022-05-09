import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters({
            user: "lbStore/getterUser",
            users: "lbStore/getterUsers",
        })
    }
};