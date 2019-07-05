import React from 'react';

function UserPhoto(props) {
  let { img } = props;
  if (!img) {
    img = process.env.REACT_APP_USER_PIC;
  }
  return (
    <div className="user-photo">
      <img className="photo m-1" src={img} alt="user-pic" />
    </div>
  );
}

export default UserPhoto;
