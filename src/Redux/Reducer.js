const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isLoading: false,
  offer: {},
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
    case "setUser":
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user };
    case "addOffer":
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user };
    case "OfferToUpdate":
      return { ...state, offer: action.offer };
    default:
      return state;
  }
}
export default Reducer;
