export const saveUser = email => ({ type: 'SAVE_USER', payload: email });
export const deleteUser = () => ({ type: 'DELETE_USER' });

export const saveConnection = connection => ({ type: 'SAVE_CONNECTION', payload: connection });
export const deleteConnection = () => ({ type: 'DELETE_CONNECTION' });
