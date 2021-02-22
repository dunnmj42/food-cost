// Reducer for details and edit view
const detailsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MEAL_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

// details will be on redux store
// at store.details
export default detailsReducer;
