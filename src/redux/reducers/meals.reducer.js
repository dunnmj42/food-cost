// Reducer for all meals
const mealsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MEALS":
      return action.payload;
    default:
      return state;
  }
};

// meals will be on redux store
// at store.meals
export default mealsReducer;
