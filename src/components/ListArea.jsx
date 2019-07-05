/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function ListArea(props) {
  const {
    people, handleConnect, currentDialog, user, choose,
  } = props;
  let current;
  const photo = process.env.REACT_APP_USER_PIC;
  if (currentDialog && currentDialog.type === 'individual') {
    current = currentDialog.users.find(person => person !== user._id);
  }
  return (
    <div className="people-online-area">
      <div className="people-online">
        {
          people.map(person => (
            <div
              className={person._id === current ? 'person m-1 currentPerson' : 'person m-1'}
              onClick={() => {
                handleConnect(person._id);
                choose('messages');
              }}
              key={person._id}
            >
              <div>
                <img className="photo-m mr-1" src={person.img ? person.img : photo} alt="faces" />
              </div>
              <div className="m-1 email">{`${person.firstName} ${person.lastName}`}</div>
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default ListArea;
