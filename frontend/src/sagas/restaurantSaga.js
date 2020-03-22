import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../service/restaurants';

function* restaurantTask(action) {
  try {
    yield put({
      type: 'FETCH_RESTAURANT_ITEMS_LOADING',
    });
    const { payload } = action;
    const res = yield call(API.getRestaurantFoods, payload.email);

    if (res.status === 200) {
      yield put({
        type: 'FETCH_RESTAURANT_ITEMS_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_RESTAURANT_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    yield put({
      type: 'FETCH_RESTAURANT_ERROR',
      payload: e.data,
    });
  }
}

function* deleteRestaurantItemsTask(action) {
  try {
    yield put({
      type: 'DELETE_RESTAURANT_ITEM_LOADING',
    });
    const { payload } = action;
    const res = yield call(API.deleteRestaurantFood, payload.email, payload.id);

    if (res.status === 200) {
      yield put({
        type: 'DELETE_RESTAURANT_ITEM_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'DELETE_RESTAURANT_ITEM_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    yield put({
      type: 'DELETE_RESTAURANT_ITEM_ERROR',
      payload: e.data,
    });
  }
}

function* addRestaurantItemTask(action) {
  try {
    yield put({
      type: 'ADD_RESTAURANT_ITEM_LOADING',
    });
    const { payload } = action;
    console.log(payload);
    const res = yield call(API.addRestaurantFoods, payload.email, payload.name, payload.price, payload.image);
    console.log('res', res);
    if (res.status === 200) {
      yield put({
        type: 'ADD_RESTAURANT_ITEM_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'ADD_RESTAURANT_ITEM_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    yield put({
      type: 'ADD_RESTAURANT_ITEM_ERROR',
      payload: e.data,
    });
  }
}

function* editRestaurantItemTask(action) {
  try {
    yield put({
      type: 'EDIT_RESTAURANT_ITEM_LOADING',
    });
    const { payload } = action;
    console.log(payload);
    const res = yield call(API.editRestaurantFoods, payload.email, payload.name, payload.price, payload.image);
    if (res.status === 200) {
      yield put({
        type: 'EDIT_RESTAURANT_ITEM_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'EDIT_RESTAURANT_ITEM_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    yield put({
      type: 'EDIT_RESTAURANT_ITEM_ERROR',
      payload: e.data,
    });
  }
}

function* restaurantSaga() {
  yield takeLatest('GET_RESTAURANT_ITEMS', restaurantTask);
  yield takeLatest('DELETE_RESTAURANT_ITEMS', deleteRestaurantItemsTask);
  yield takeLatest('ADD_RESTAURANT_ITEM', addRestaurantItemTask);
  yield takeLatest('EDIT_RESTAURANT_ITEM', editRestaurantItemTask);
}

export default restaurantSaga;
