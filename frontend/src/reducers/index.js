import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authReducer from './authReducer';
import restaurantReducer from './restaurantReducer';
import cartReducer from './cart';
import ordersReducer from './ordersReducer';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['loginMessage'],
  stateReconciler: autoMergeLevel2,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartData'],
  stateReconciler: autoMergeLevel2,
};

const restaPersistConfig = {
  key: 'restaurant',
  storage,
  blacklist: [],
  stateReconciler: autoMergeLevel2,
};

const orderPersistConfig = {
  key: 'orders',
  storage,
  whitelist: ['ordersList'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  restaurant: persistReducer(restaPersistConfig, restaurantReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  orders: persistReducer(orderPersistConfig, ordersReducer),
});

export default rootReducer;
