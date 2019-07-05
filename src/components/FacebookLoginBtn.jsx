import React from 'react';
import FacebookLogin from 'react-facebook-login';

function FacebookLoginBtn(props) {
  const { responseFacebook } = props;
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FB_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass="facebook"
      icon={<div className="facebook"><i className="fab fa-facebook-f" /></div>}
    />
  );
}

export default FacebookLoginBtn;
