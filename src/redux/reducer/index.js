const initialState = {
  email: 'admin@test.com'
}


export default function reducers(state = initialState, action){
  switch(action.type){
    case 'SAVE_EMAIL':
      return {
        ...state, 
        email: action.payload,
    };
    case 'DELETE_EMAIL':
      return {
        ...state, 
        email: action.payload,
    };
    default:
      return state;
    }
}