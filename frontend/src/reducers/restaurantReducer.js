const initialState = {
  restaurantItems: [],
  restaurantLoading: false,
  restaurantError: null,
  addItem: null,
  addItemLoading: false,
  addItemError: false,
  deleteItem: null,
  deleteItemLoading: false,
  deleteItemError: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_RESTAURANT_ITEMS_SUCCESS':
      return {
        ...state,
        restaurantItems: payload,
        restaurantError: null,
      };
    case 'FETCH_RESTAURANT_ITEMS_LOADING':
      return {
        ...state,
        restaurantLoading: true,
      };
    case 'FETCH_RESTAURANT_ERROR':
      return {
        ...state,
        restaurantError: true,
      };
    case 'ADD_RESTAURANT_ITEM_SUCCESS':
      return {
        ...state,
        addItem: payload,
      };
    case 'ADD_RESTAURANT_ITEM_LOADING':
      return {
        ...state,
        addItemLoading: true,
      };
    case 'ADD_RESTAURANT_ITEM_ERROR':
      return {
        ...state,
        addItemError: true,
      };
    case 'DELETE_RESTAURANT_ITEM_SUCCESS':
      return {
        ...state,
        deleteItem: payload,
      }
    case 'DELETE_RESTAURANT_ITEM_LOADING':
      return {
        ...state,
        deleteItemLoading: true,
      }
    case 'DELETE_RESTAURANT_ITEM_ERROR':
      return {
        ...state,
        deleteItemError: true,
      }
    case 'EDIT_RESTAURANT_ITEM_SUCCESS':
      return {
        ...state,
        editItem: payload,
      };
    case 'EDIT_RESTAURANT_ITEM_LOADING':
      return {
        ...state,
        editItemLoading: true,
      };
    case 'EDIT_RESTAURANT_ITEM_ERROR':
      return {
        ...state,
        editItemError: true,
      };
    default:
      return state;
  }
};
