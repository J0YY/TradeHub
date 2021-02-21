
export const initialState = {
    // cashAmount = 10000,
    user: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    TRANSACTION: "TRANSACTION"
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        // case actionTypes.TRANSACTION:
        //     return {
        //         ...state,
        //         cashAmount: 
        //     }

        default:
            return state;
    }
};

export default reducer;