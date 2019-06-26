const initialState = {
  user: {
    email: '',
  },
  users: [],
  dialogs: [],
  connection: null,
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
