import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchMeals() {
  try {
    const meals = yield axios.get("/api/meals");
    console.log("get all:", meals.data);
    yield put({ type: "SET_MEALS", payload: meals.data});
  } catch (error) {
    console.error(error);
  }
}

function* mealsSaga() {
  yield takeEvery("FETCH_MEALS", fetchMeals);
}

export default mealsSaga;