import React from 'react';

function UserPhoto (props) {
  const {img} = props;
  if (!img) return null;
  return (
    <div>
      <img className='photo ml-3' src={img} alt='faces'></img>
    </div>
  )
}

export default UserPhoto;