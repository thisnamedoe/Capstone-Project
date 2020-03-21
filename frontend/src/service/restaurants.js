import request from './request';
import { RESTAURANT_FOODS_URL } from './api_constants';

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


export default {
  getRestaurantFoods
};
