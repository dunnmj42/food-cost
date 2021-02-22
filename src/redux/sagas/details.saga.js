import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// details worker saga fires on FETCH_DETAILS
function* fetchDetails(action) {
  try {
    const details = yield axios.get(`/api/details/${action.payload}`); // fire GET
    yield put({ type: "SET_MEAL_DETAILS", payload: details.data }); // put to SET
  } catch (error) {
    console.error(error);
  }
}

function* detailsSaga() {
  yield takeEvery("FETCH_DETAILS", fetchDetails);
}

export default detailsSaga;
