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

function* newMeal(action) {
  try {
    const mealToAdd = action.payload;
    yield axios.post("/api/meals", mealToAdd);
    yield put({ type: "FETCH_MEALS" });
  } catch (error) {
    console.error(error);
  }
}

function* mealsSaga() {
  yield takeEvery("FETCH_MEALS", fetchMeals);
  yield takeEvery("NEW_MEAL", newMeal);
}

export default mealsSaga;