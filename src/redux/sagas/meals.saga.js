import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchMeals() {
  try {
    const meals = yield axios.get("/api/meals");
    yield put({ type: "SET_MEALS", payload: meals.data });
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

function* editMeal(action) {
  try {
    const editBatch = action.payload;
    yield axios.put("/api/meals", editBatch);
    yield put({ type: "FETCH_DETAILS", payload: action?.payload?.meal?.id });
    yield put({ type: "FETCH_MEALS" });
  } catch (error) {
    console.error(error);
  }
}

function* removeMeal(action) {
  try {
    const removalTarget = yield axios.delete(`/api/meals/${action.payload}`);
    yield put({ type: "FETCH_MEALS" });
  } catch (error) {
    console.error(error);
  }
}

function* mealsSaga() {
  yield takeEvery("FETCH_MEALS", fetchMeals);
  yield takeEvery("NEW_MEAL", newMeal);
  yield takeEvery("EDIT_MEAL", editMeal);
  yield takeEvery("REMOVE_MEAL", removeMeal);
}

export default mealsSaga;
