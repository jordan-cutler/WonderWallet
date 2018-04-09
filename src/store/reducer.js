import * as states from './constants/states';
import * as actionTypes from './constants/actions';
import * as constants from './constants/initial-state';

const reducer = (state = constants.initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INITIAL_STATE:
      return {
        ...state,
        screen: states.CREATION_STATE
      };
    case actionTypes.SET_CREATION_STATE:
      return {
        ...state,
        screen: states.UPLOAD_STATE
      };
    case actionTypes.SET_MAIN_STATE:
      return {
        ...state,
        screen: states.MAIN_STATE
      };
    case actionTypes.SET_PUBLIC_KEY:
      return {
        ...state,
        publicKey: action.payload
      };
    case actionTypes.SET_PRIVATE_KEY:
      return {
        ...state,
        privateKey: action.payload
      };
    case actionTypes.SET_ACCOUNT_BALANCE:
      return {
        ...state,
        accountBalance: action.payload
      };
    case actionTypes.SET_SIGN_TRANSACTION_FUNCTION:
      return {
        ...state,
        signTransactionFn: action.payload
      };
    case actionTypes.UPDATE_ACCOUNT_BALANCE:
      return {
        ...state,
        tokenBalances: {
          ...state.tokenBalances,
          [action.payload.name]: action.payload.balance
        }
      };
    case actionTypes.UPDATE_TOKENS_TO_USD:
      return {
        ...state,
        tokenToUsd: action.payload
      };
    case actionTypes.UPDATE_CURRENTLY_SELECTED_TOKEN:
      return {
        ...state,
        currentlySelectedToken: action.payload
      };
    case actionTypes.ADD_NEW_TOKEN:
      return {
        ...state,
        addedTokens: [...state.addedTokens, action.payload]
      };
    default:
      return state;
  }
};

export default reducer;
