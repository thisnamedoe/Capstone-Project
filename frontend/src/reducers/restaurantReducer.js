const initialState = {
  restaurantItems: [],
  restaurantLoading: false,
  restaurantError: null,
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
    default:
      return state;
  }
};
