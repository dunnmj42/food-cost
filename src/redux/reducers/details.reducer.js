const detailsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_MEAL_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default detailsReducer;