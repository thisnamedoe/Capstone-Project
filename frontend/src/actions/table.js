export const getTableNumber = () => ({
    type: 'FETCH_TABLE_NUMBER',
});

export const updateTableNumber = (tableNumber) => ({
    type: 'UPDATE_TABLE_NUMBER',
    payload: {
        tableNumber,
    },
});