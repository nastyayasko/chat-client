const initialState = {
  user: {},
  users: [],
  dialogs: [],
  connection: null,
  loginStatus: '',
};


export default function reducers(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'DELETE_USER':
      return {
        ...state,
        user: {},
      };
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
      };
    case 'GET_DIALOGS_SUCCESS':
      return {
        ...state,
        dialogs: action.payload,
      };
    case 'SET_LOGINSTATUS':
      return {
        ...state,
        loginStatus: action.payload,
      };
    case 'DELETE_LOGINSTATUS':
      return {
        ...state,
        loginStatus: '',
      };
    case 'LOGIN_SUCCESS':
      if (action.payload.status) {
        return {
          ...state,
          loginStatus: action.payload.status,
        };
      }
      return {
        ...state,
        loginStatus: '',
        user: action.payload,
      };
    case 'SIGNUP_SUCCESS':
      if (action.payload.status) {
        return {
          ...state,
          loginStatus: action.payload.status,
        };
      }
      return {
        ...state,
        loginStatus: '',
        user: action.payload,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };
    case 'SAVE_CONNECTION':
      return {
        ...state,
        connection: action.payload,
      };
    case 'DELETE_CONNECTION':
      return {
        ...state,
        connection: {},
      };
    default:
      return state;
  }
}
