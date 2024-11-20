import types from './Constants';
const initialState = {
  getLogin: false,
};
const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGGEDIN:
      return {...state, getLogin: action.payload};
    default:
      return initialState;
  }
};
export default Reducers;
