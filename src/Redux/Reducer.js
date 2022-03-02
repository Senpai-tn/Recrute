const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  a: "d",
  b: "eee",
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "auth":
      console.log("auth");
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user };
    case "offer":
      console.log("offer " + new Date());
      return action;
    case "like":
      console.log("like " + new Date());
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user };
    default:
      return state;
  }
}
export default Reducer;
