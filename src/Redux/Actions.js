import types from './Constants';
export const setUserData = data => {
  return {
    type: types.USER_DATA,
    payload: data,
  };
};
export const setCartItems = data => {
  return {
    type: types.CART,
    payload: data,
  };
};
export const setWishList = data => {
  return {
    type: types.WISHLIST,
    payload: data,
  };
};
export const setUserAddress = data => {
  return {
    type: types.ADDRESS,
    payload: data,
  };
};
