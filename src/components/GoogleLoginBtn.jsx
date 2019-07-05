/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import GoogleLogin from 'react-google-login';

function GoogleLoginBtn(props) {
  const { responseGoogle } = props;
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_ID}
      render={renderProps => (
        <div className="google mb-3" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <i className="fab fa-google" />
        Login with Google
        </div>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
}

export default GoogleLoginBtn;
