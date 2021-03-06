import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// meals worker sage gets meals and sets meals store 
// fires on FETCH_MEALS
function* fetchMeals() {
  try {
    const meals = yield axios.get("/api/meals"); // fire
    yield put({ type: "SET_MEALS", payload: meals.data });
  } catch (error) {
    console.error(error);
  }
}

// worker saga for adding meal -- fires on NEW_MEAL
function* newMeal(action) {
  try {
    const mealToAdd = action.payload;
    yield axios.post("/api/meals", mealToAdd);
    yield put({ type: "FETCH_MEALS" }); // GET meals on add
  } catch (error) {
    console.error(error);
  }
}

// edit worker saga -- fires on EDIT_MEAL -- maybe I should be in details?
function* editMeal(action) {
  try {
    const editBatch = action.payload;
    yield axios.put("/api/meals", editBatch); // send PUT
    yield put({ type: "FETCH_DETAILS", payload: action?.payload?.meal?.id });
    yield put({ type: "FETCH_MEALS" }); // reGET details and meals after PUT
  } catch (error) {
    console.error(error);
  }
}

// remove meal worker saga -- fires on REMOVE_MEAL -- maybe I should be in details?
function* removeMeal(action) {
  try {
    const removalTarget = yield axios.delete(`/api/meals/${action.payload}`);
    yield put({ type: "FETCH_MEALS" }); // reGET after delete
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
