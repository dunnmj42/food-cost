import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchDetails(action) {
  try {
    const details = yield axios.get(`/api/details/${action.payload}`);
    console.log("get details:", details.data);
    yield put({ type: "SET_MEAL_DETAILS", payload: details.data});
  } catch (error) {
    console.error(error);
  }
}

function* detailsSaga() {
  yield takeEvery("FETCH_DETAILS", fetchDetails);
}

export default detailsSaga;