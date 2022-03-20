const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isLoading: false,
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "auth":
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user };
    case "offer":
      return action;
    case "like":
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user };
    case "loading":
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
export default Reducer;
