export const initialState = {
  user: null,
  cart: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      // do something to the user
      return {
        ...state,
        user: action.user,
      };
    case "SET_CART":
      // do something to the cart
      return {
        ...state,
        cart: action.cart,
      };
    default:
      // return the state as it is
      return state;
  }
}

export default reducer;
