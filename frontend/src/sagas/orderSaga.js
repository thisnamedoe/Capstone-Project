import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../service/orders';

const emailSelector = state => state.auth.loginMessage.email;

function* orderFetchTask(action) {
  try {
    const { payload } = action;

    if (res.status === 200) {
      yield put({
        type: 'FETCH_ORDERS_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_ORDERS_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    // console.log(e);
    yield put({
      type: 'FETCH_ORDERS_ERROR',
      payload: e.data,
    });
  }
}

function* orderTask(action) {
  try {
    const { payload } = action;

    const email = yield select(emailSelector);

    const res = yield call(API.createOrder, email, payload.items, restaurant_email, payload.total);

    if (res.status === 200) {
      yield put({
        type: 'CREATE_ORDER_SUCCESS',
        payload: res.data.order,
      });
    } else {
      yield put({
        type: 'CREATE_ORDER_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    // console.log(e);
    yield put({
      type: 'CREATE_ORDER_ERROR',
      payload: e.data,
    });
  }
}

function* orderSaga() {
  yield takeLatest('FETCH_ORDERS', orderFetchTask);
  yield takeLatest('CREATE_ORDER', orderTask);
}

export default orderSaga;