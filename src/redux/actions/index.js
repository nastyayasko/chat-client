import axios from 'axios';

export const saveUser = email => ({ type: 'SAVE_USER', payload: email });
export const deleteUser = () => ({ type: 'DELETE_USER' });

export const saveConnection = connection => ({ type: 'SAVE_CONNECTION', payload: connection });
export const deleteConnection = () => ({ type: 'DELETE_CONNECTION' });

const getUsersSuccess = users => ({ type: 'GET_USERS_SUCCESS', payload: users });
const getUsersError = error => ({ type: 'GET_USERS_ERROR', payload: error });

export const getUsers = () => (dispatch) => {
  axios('http://localhost:3020/api/all-users')
    .then(({ data }) => dispatch(getUsersSuccess(data)))
    .catch(error => dispatch(getUsersError(error)));
};

const getDialogsSuccess = users => ({ type: 'GET_DIALOGS_SUCCESS', payload: users });
const getDialogsError = error => ({ type: 'GET_DIALOGS_ERROR', payload: error });

export const getDialogs = id => (dispatch) => {
  axios(`http://localhost:3020/api/dialogs/${id}`)
    .then(({ data }) => dispatch(getDialogsSuccess(data)))
    .catch(error => dispatch(getDialogsError(error)));
};
