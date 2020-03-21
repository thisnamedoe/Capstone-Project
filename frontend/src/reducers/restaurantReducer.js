const initialState = {
  fullList: [],
  restaurantInfo: null,
  error: null,
  cuisineRestaurants: [],
  cuisineRestaurantError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_RESTAURANT_ITEMS_SUCCESS':
      return {
        ...state,
        restaurantItems: payload,
        error: null,
      };
    case 'FETCH_RESTAURANT_ERROR':
    default:
      return state;
  }
};
