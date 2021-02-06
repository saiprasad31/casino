import * as actonTypes from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case actonTypes.LOGIN:
      return {
        ...state,
        loggedIn: true,
        name: action.payload,
        showLoginDialog: false,
      };
    case actonTypes.LOGOUT:
      return { ...state, loggedIn: false, name: null };
    case actonTypes.SHOWLOGIN:
      return { ...state, showLoginDialog: true };
    case actonTypes.HIDELOGIN:
      return { ...state, showLoginDialog: false };
    case actonTypes.UPDATEBALANCE:
      return { ...state, balance: action.payload };
    case actonTypes.UPDATERESULTS:
      return { ...state, results: [...action.payload] };
    case actonTypes.OPENGAME:
      return { ...state, showGameDialog: true };
    case actonTypes.HIDEGAME:
      return { ...state, showGameDialog: false, slots: [0, 0, 0] };
    case actonTypes.FAKESPIN:
      return { ...state, slots: [7, 7, 7] };
    case actonTypes.SPIN:
      return {
        ...state,
        slots: [...action.slots],
        balance: action.balance,
        results: [
          ...state.results,
          { slots: [...action.slots], time: new Date() },
        ],
      };
    default:
      throw new Error();
  }
};

export default reducer;
