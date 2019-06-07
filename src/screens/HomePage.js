import React from 'react';
import {connect} from 'react-redux';
import {saveEmail} from '../redux/actions'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


class HomePage extends React.Component {
  state = {
    email: '',
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email} = this.state;
    if (!email) return;
    this.props.saveEmail(email);
    this.setState({email:''});
    this.props.history.push('/chat');
  }
  render() {
    const {email} = this.state;

    const responseGoogle = (response) => {
      console.log(response);
    }

    const responseFacebook = (response) => {
      console.log(response);
    }
    const componentClicked = () => {
      console.log('hello');
    }

    return(
      <div>
        <h1 className="welcome-head">Welcom To Our Chat</h1>
        <div className="my-container">
          <div id='auth'>
            <div className='sign-in'>Enter your e-mail</div>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <div className="form-group col-md-8">
                <input type='email' className='form-control m-2' placeholder='Enter e-mail' value={email} name='email' onChange={this.handleChange}/>
                <button type='submite' className='btn btn-danger m-2'>Start Chat!</button>
              </div>
            </form>
            <div className='sign-in'>or Sign in with:</div>
            <div className='buttons'>
              <GoogleLogin
              clientId="191604032064-8keqk7pfclokcoc6n4un67cmpm49agn1.apps.googleusercontent.com"
              render={renderProps => (
                <div className='google' onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fab fa-google"></i></div>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'} />
            
              <FacebookLogin
              appId="385892928702080"
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook} 
              cssClass="facebook"
              icon={<div className='facebook' ><i className="fab fa-facebook-f"></i></div>} />
            </div>
          </div>
        </div>
      </div>
    )  
  }
  
}

export default connect (null, {saveEmail})(HomePage);