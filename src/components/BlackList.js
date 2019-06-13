import React from 'react';


function BlackList(props){
  const {list, restoreUser} = props;
  return (
    <div className='black-list no-display'>
      {
        list.map(user => {
          return(
            <div className='blocked-person mb-1' key={user}>
              <div className='m-2 email'>{user}</div>
              <button className='btn btn-success' onClick={() => {restoreUser(user)}}>Restore</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default BlackList;