import React from 'react';
import FacebookLogin from 'react-facebook-login';

function FacebookLoginBtn(props) {
  const {responseFacebook} = props;
  return (
    <FacebookLogin
      appId="385892928702080"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook} 
      cssClass="facebook"
      icon={<div className='facebook' ><i className="fab fa-facebook-f"></i></div>} />
  )
}

export default FacebookLoginBtn;