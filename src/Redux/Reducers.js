import types from './Constants';
const initialState = {
  getUserData: {},
  getCartItems: [],
  getWishList: [],
  userAddress: '',
};
const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_DATA:
      return {...state, getUserData: action.payload};
    case types.CART:
      return {...state, getCartItems: action.payload};
    case types.WISHLIST:
      return {...state, getWishList: action.payload};
    case types.ADDRESS:
      return {...state, userAddress: action.payload};
    default:
      return initialState;
  }
};
export default Reducers;
