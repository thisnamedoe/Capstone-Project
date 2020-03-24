const initialState = {
    tableNumber: 1,
};

/**
 Store the data for the cart and its details
 */

export default (state = initialState, { type, payload = {} }) => {
    switch (type) {
        case 'UPDATED_TABLE_NUMBER':
            return {
                ...state,
                tableNumber: payload,
            };
        default:
            return state;
    }
};
