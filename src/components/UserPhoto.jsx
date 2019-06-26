import React from 'react';

function UserPhoto(props) {
  let { img } = props;
  if (!img) {
    img = 'https://www.achievesuccesstutoring.com/wp-content/uploads/2019/05/no-photo-icon-22.jpg.png';
  }
  return (
    <div className="user-photo">
      <img className="photo m-1" src={img} alt="user-pic" />
    </div>
  );
}

export default UserPhoto;
