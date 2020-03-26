import request from './request';
import { ORDER_URL } from './api_constants';

function getOrders(userId, headers) {
  const params = {
    userId,
  };
  return request({
    url: ORDER_URL, method: 'POST', params, headers,
  });
}

function createOrder(userId, cartItems, totalAmount, headers) {
  const data = {
    userId,
    items: cartItems,
    totalCost: totalAmount,
  };
  return request({
    url: ORDER_URL, method: 'POST', data, headers,
  });
}


export default {
  getOrders,
  createOrder,
};
