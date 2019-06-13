const initialState = {
  user: {
    email: ''
  },
  connection: {}
}


export default function reducers(state = initialState, action){
  switch(action.type){
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