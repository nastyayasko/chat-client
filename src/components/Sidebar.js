import React from 'react';
import UserPhoto from './UserPhoto';

function Sidebar(props) {
  const {img, toggleModalAG, handleLogout} = props;
  return (
    <div className='sidebar'>
      <UserPhoto img={img}/>
      <i className="fas fa-comment-medical" onClick={toggleModalAG}></i>
      <i className="fas fa-power-off" onClick={handleLogout}></i>
    </div>
  )
};

export default Sidebar;