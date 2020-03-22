import request from './request';
import { RESTAURANT_FOODS_URL, DELETE_RESTAURANT_FOODS_URL, ADD_RESTAURANT_ITEMS_URL, EDIT_RESTAURANT_ITEMS_URL } from './api_constants';

function getRestaurantFoods(email = null) {
  let data = {};
  if (email != null) {
    data = {
      email,
    };
  }
  return request({
    url: RESTAURANT_FOODS_URL, method: 'POST', data
  });
}

function deleteRestaurantFood(email = null, item_id = null) {
  let data = {
    email,
    item_id,
  };
  return request({
    url: DELETE_RESTAURANT_FOODS_URL, method: 'POST', data
  });
}

function addRestaurantFoods(email = null, name = null, price = null, image = null) {
  let data = {
    email,
    name,
    price: parseFloat(price),
    image,
  };
  return request({
    url: ADD_RESTAURANT_ITEMS_URL, method: 'POST', data
  });
}

function editRestaurantFoods(email = null, name = null, price = null, image = null) {
  let data = {
    email,
    name,
    price: parseFloat(price),
    image,
  };
  return request({
    url: EDIT_RESTAURANT_ITEMS_URL, method: 'POST', data
  });
}


export default {
  getRestaurantFoods,
  deleteRestaurantFood,
  addRestaurantFoods,
  editRestaurantFoods
};
