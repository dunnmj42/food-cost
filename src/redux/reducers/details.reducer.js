const detailsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MEAL_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default detailsReducer;
