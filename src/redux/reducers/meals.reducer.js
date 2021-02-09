const mealsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MEALS":
      return action.payload;
    default:
      return state;
  }
};

export default mealsReducer;