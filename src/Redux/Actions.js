import types from './Constants';
export const setLogin = data => {
  return {
    type: types.LOGGEDIN,
    payload: data,
  };
};
