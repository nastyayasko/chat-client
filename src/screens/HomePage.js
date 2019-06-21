import React from 'react';
import {connect} from 'react-redux';
import {saveUser, saveConnection} from '../redux/actions'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import '../styles/HomePage.css';

import Modal from '../components/Modal';
import SignUpForm from '../components/SignUpForm';


class HomePage extends React.Component {
  state = {
    email: '',
    password: '',
    url: 'http://192.168.0.154:3020/api/auth',
    loginURL: 'http://192.168.0.154:3020/api/log-in',
    isModalOpen: false,
    status:''
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value, status:''});
  }
  loginSuccess = (user) => {
    this.props.saveUser(user);
    const localUser = JSON.stringify(user);
    localStorage.setItem("myKey", localUser);
    this.props.history.push('/chat');
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {email,password, loginURL} = this.state;
    if (!email || !password) {
      this.setState({status: "Some fields are empty"});
      return;
    }
    const user = {email, password};
    axios.post(loginURL, user)
      .then(response => {
        if (response.data.new) {
          this.setState({status: "Invalid email or password."});
          return;
        }
        this.loginSuccess(response.data);
      })
 }
  toggleModal = ()=>{
    const {isModalOpen} = this.state;
    this.setState({isModalOpen: !isModalOpen});
  } 
  login = (user) => {
    this.toggleModal();
    this.loginSuccess(user);
  }
  
  responseGoogle = (response) => {
    const data = {
      email: response.w3.U3,
      firstName: response.w3.ofa,
      lastName: response.w3.wea,
      img: response.w3.Paa,
      token: response.tokenObj.access_token,
    }
    axios.post(this.state.url, data)
    .then(resp => {
      this.loginSuccess(resp.data);
    })
    
  }

  responseFacebook = (response) => {
    const data = {
      email: response.email,
      firstName: response.name.split(' ')[0],
      lastName: response.name.split(' ')[1],
      img: response.picture.data.url,
      token: response.accessToken,
    }
    axios.post(this.state.url, data)
    .then(resp => {
      this.loginSuccess(resp.data);
    })
  }
  componentDidMount(){
    if (localStorage.getItem('myKey')){
      const user = JSON.parse(localStorage.myKey);
      this.loginSuccess(user);
    }
  }

  render() {
    const {email, password, isModalOpen, status} = this.state;

    return(
      <div>
        <Modal isModalOpen={isModalOpen} toggle={this.toggleModal} name='Sign Up'>
          <SignUpForm login={this.login}/>
        </Modal>
        <div className="my-container">
          <div id='auth'className="mt-5">
            <div className='login pt-5'>LOGIN</div>
            <form className="login-form pt-4" onSubmit={this.handleSubmit}>
              <div className='status'>{status}</div>
              <div className="form-group">
                <label className='label'>Email</label>
                <input type='email' className='my-input mb-2' placeholder='email' value={email} name='email' onChange={this.handleChange}/>
                <label className='label mt-3'>Password</label>
                <input type='password' className='my-input mb-2' placeholder='password' value={password} name='password' onChange={this.handleChange}/>
                <button type='submite' className='login-btn mt-4'>LOGIN</button>
              </div>
            </form>
            <div className='sign-up' onClick={this.toggleModal}>Don't have an account? Sign up</div>
            <div className='login-buttons'>
              <GoogleLogin
              clientId="191604032064-8keqk7pfclokcoc6n4un67cmpm49agn1.apps.googleusercontent.com"
              render={renderProps => (
                <div className='google mb-3' onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fab fa-google"></i>Login with Google</div>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'} />
              <div className='fb-cover'>
                <FacebookLogin
              appId="385892928702080"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook} 
              cssClass="facebook"
              icon={<div className='facebook' ><i className="fab fa-facebook-f"></i></div>} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )  
  }
  
}

export default connect (null, {saveUser, saveConnection})(HomePage);