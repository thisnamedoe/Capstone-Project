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

function* restaurantSaga() {
  yield takeLatest('GET_RESTAURANT_ITEMS', restaurantTask);
}

export default restaurantSaga;
