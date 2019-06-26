/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import UserPhoto from './UserPhoto';

function Sidebar(props) {
  const { img, toggleModalAG, handleLogout } = props;
  return (
    <div className="sidebar">
      <UserPhoto img={img} />
      <i className="fas fa-comment-medical" onClick={toggleModalAG} />
      <i className="fas fa-power-off" onClick={handleLogout} />
    </div>
  );
}

export default Sidebar;
