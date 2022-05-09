const state = {
    user: {}
};
const mutations = {
    SET_USER(state, userObj) {
        state.user = Object.assign({}, userObj);
    }
};
const actions = {
    // async login({ commit }, reqData) {
    //     try {
    //         // commit("lbStore/SET_LOADING_STATUS", { property: "LOGIN", pending: true }, { root: true });
    //         // return result;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
};
const getters = {
    getterLoginUser: (state) => {
        return state.user;
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}