import React from 'react';
import ListArea from './ListArea';

function FriendsList(props) {
  const {people, currentDialog, user, handleConnect} = props;
  return (
    <div className='list-area'>
      <div className='list-name'>Friends</div>
      <ListArea people={people} currentDialog={currentDialog} user={user} handleConnect={handleConnect}/>
    </div>
  )
};

export default FriendsList;