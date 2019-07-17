/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React from 'react';
import ListArea from './ListArea';

function FriendsList(props) {
  const {
    people, currentDialog, user, handleConnect, menu,
  } = props;
  const users = people.filter(i => i._id !== user._id);
  return (
    <div className={menu === 'users' ? 'list-area list-friends' : 'list-area list-friends non-display'}>
      <div className="list-name">Friends</div>
      <ListArea people={users} currentDialog={currentDialog} user={user} handleConnect={handleConnect} />
    </div>
  );
}

export default FriendsList;
