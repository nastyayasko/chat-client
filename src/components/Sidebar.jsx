/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import UserPhoto from './UserPhoto';

function Sidebar(props) {
  const {
    img, toggleModalAG, handleLogout, choose,
  } = props;
  return (
    <div className="sidebar">
      <UserPhoto img={img} />
      <div className="new-buttons">
        <i className="fas fa-users" onClick={() => choose('users')} />
        <i className="fas fa-comment" onClick={() => choose('dialogs')} />
      </div>
      <i className="fas fa-comment-medical" onClick={toggleModalAG} />
      <i className="fas fa-power-off" onClick={handleLogout} />
    </div>
  );
}

export default Sidebar;
