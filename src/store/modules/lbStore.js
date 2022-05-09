
import data from "../../assets/data.json"
const state = {
    users: data.users,
    groups: data.groups,
    user: {
        "user_id": 1,
        "user_name": "Rajesh",
        "user_email": "rajesh.kola@gmail.com"
    }
};
const mutations = {
    SET_USER(state, userObj) {
        state.user = Object.assign({}, userObj);
    },
    ADD_EXPENSE(state, data) {
        //paid user != logged in user
        if (state.user.user_id == data.paidBy) {
            Object.keys(data.userShareVal).map(function (user) {
                let paidByUser = state.users.find(u => u.user_id == data.paidBy);
                console.log(paidByUser.user_owe[user]);
                console.log(data.userShareVal[user]);
                if (Object.keys(paidByUser.user_owe).includes(String(user)) && Number(paidByUser.user_owe[user]) < Number(data.userShareVal[user])) {
                    console.log("less")
                    state.users.find(u => u.user_id == data.paidBy).user_owed = { ...state.users.find(u => u.user_id == data.paidBy)?.user_owed, [user]: (Number(data.userShareVal[user]) - Number(paidByUser.user_owe[user])) }
                    state.users.find(u => u.user_id == data.paidBy).user_owe = { ...state.users.find(u => u.user_id == data.paidBy)?.user_owe, [user]: 0 }
                    // state.users.find(u => u.user_id == data.paidBy).user_owe = { ...state.users.find(u => u.user_id == data.paidBy)?.user_owe, [user]: (Number(data.userShareVal[user]) - Number(paidByUser.user_owe[user])) }
                } else if (Object.keys(paidByUser.user_owe).includes(String(user)) && Number(paidByUser.user_owe[user]) > Number(data.userShareVal[user])) {
                    console.log("greate")
                    state.users.find(u => u.user_id == data.paidBy).user_owe = { ...state.users.find(u => u.user_id == data.paidBy)?.user_owe, [user]: Number(paidByUser.user_owe[user]) - Number(data.userShareVal[user]) }
                } else {
                    state.users.find(u => u.user_id == data.paidBy).user_owed = { ...state.users.find(u => u.user_id == data.paidBy)?.user_owed, [user]: ((Number(paidByUser.user_owed[user]) || 0) + Number(data.userShareVal[user])) }
                }
                let borrowedUser = state.users.find(u => u.user_id == user);
                if (Object.keys(borrowedUser.user_owed).includes(String(data.paidBy))) {
                    state.users.find(u => u.user_id == user).user_owed = { ...state.users.find(u => u.user_id == user)?.user_owed, [data.paidBy]: Math.abs(Number(data.userShareVal[user]) - Number(borrowedUser.user_owed[data.paidBy])) }
                } else {
                    state.users.find(u => u.user_id == user).user_owe = { ...state.users.find(u => u.user_id == user)?.user_owe, [data.paidBy]: ((Number(data.userShareVal[user])) + Number(borrowedUser.user_owe[user]) || 0) };
                }
            })
        } else {
            let currentUser = state.users.find(u => u.user_id == state.user.user_id);
            state.users.find(u => u.user_id == state.user.user_id).user_owe = { ...state.users.find(u => u.user_id == state.user.user_id)?.user_owe, [data.paidBy]: Math.abs(Number(data.userShareVal[state.user.user_id]) + (Number(currentUser.user_owe[data.paidBy]) || 0) - (Number(currentUser.user_owed[data.paidBy]) || 0)) }
            if(Object.keys(currentUser.user_owed).includes(String(data.paidBy)) && Number(currentUser.user_owed[data.paidBy]) <= Number(data.userShareVal[state.user.user_id])){
                state.users.find(u => u.user_id == state.user.user_id).user_owed = { ...state.users.find(u => u.user_id == state.user.user_id)?.user_owed, [data.paidBy]: 0 }
            }else if(Object.keys(currentUser.user_owed).includes(String(data.paidBy)) && Number(currentUser.user_owed[data.paidBy]) > Number(data.userShareVal[state.user.user_id])){
                state.users.find(u => u.user_id == state.user.user_id).user_owed = { ...state.users.find(u => u.user_id == state.user.user_id)?.user_owed, [data.paidBy]: ((Number(data.userShareVal[state.user.user_id])) - Number(currentUser.user_owed[data.paidBy]) || 0) };
            }
            
        }
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
    getterUser: (state) => {
        return state.user
    },
    getterUsers: (state) => {
        return state.users;
    },
    getterUserName: (state) => (user_id) => {
        return state.users.find(user => user.user_id == user_id)?.user_name;
    },
    getterUserOweAmount: (state) => (user_id) => {
        return Object.values(state.users.find((user) => user.user_id == user_id)?.user_owe).reduce((acc, amnt) => acc + amnt,
            0)
    },
    getterUserOwedAmount: (state) => (user_id) => {
        return Object.values(state.users.find((user) => user.user_id == user_id)?.user_owed).reduce((acc, amnt) => acc + amnt,
            0)
    },
    getterUserOweList: (state) => (user_id) => {
        return state.users.find(user => user.user_id == user_id)?.user_owe || [];
    },
    getterUserOwedList: (state) => (user_id) => {
        return state.users.find(user => user.user_id == user_id)?.user_owed || [];
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}