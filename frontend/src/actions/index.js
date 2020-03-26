export const authLogin = (email, password) => ({
  type: 'AUTH_LOGIN',
  payload: {
    email,
    password,
  },
});

export const authRegister = (email, password) => ({
  type: 'AUTH_REGISTER',
  payload: {
    email: email,
    password: password,
  },
});
export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});

export const getRestaurantItems = (email) => ({
  type: 'GET_RESTAURANT_ITEMS',
  payload: {
    email,
  }
});

export const deleteRestaurantItems = (email, id) => ({
  type: 'DELETE_RESTAURANT_ITEMS',
  payload: {
    email,
    id,
  }
});

export const addRestaurantItem = (email, name, price, image) => ({
  type: 'ADD_RESTAURANT_ITEM',
  payload: {
    email,
    name,
    price,
    image
  }
});

export const updateRestaurantItem = (id, email, name, price, image) => ({
  type: 'EDIT_RESTAURANT_ITEM',
  payload: {
    id,
    email,
    name,
    price,
    image
  }
});

export const fetchOrders = () => ({
  type: 'FETCH_ORDERS',
});

export const doCancelOrder = () => ({
  type: 'CANCEL_ORDER',
});

export const createOrder = (tableNumber, items, total) => ({
  type: 'CREATE_ORDER',
  payload: {
    tableNumber,
    items,
    total,
  },
});