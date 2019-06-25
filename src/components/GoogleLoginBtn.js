import React from 'react';
import GoogleLogin from 'react-google-login';

function GoogleLoginBtn(props) {
  const {responseGoogle} = props;
  return (
    <GoogleLogin
      clientId="191604032064-8keqk7pfclokcoc6n4un67cmpm49agn1.apps.googleusercontent.com"
      render={renderProps => (
        <div className='google mb-3' onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fab fa-google"></i>Login with Google</div>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'} />
  )
}

export default GoogleLoginBtn;