const initialState = {
  user: {
    email: 'test@test.com'
  }
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
    default:
      return state;
    }
}