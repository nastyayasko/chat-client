/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import {
  saveUser, saveConnection, setLoginStatus, deleteLoginStatus, auth,
} from '../redux/actions';

import '../styles/HomePage.css';

import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import FacebookLoginBtn from '../components/FacebookLoginBtn';


class HomePage extends React.Component {
  state = {
    isModalOpen: false,
  }

  loginSuccess = (user) => {
    const localUser = JSON.stringify(user);
    localStorage.setItem('myKey', localUser);
    this.props.history.push('/chat');
  }

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  }

  responseGoogle = (response) => {
    const user = {
      email: response.w3.U3,
      firstName: response.w3.ofa,
      lastName: response.w3.wea,
      img: response.w3.Paa,
      token: response.tokenObj.access_token,
    };
    this.props.auth(user);
  }

  responseFacebook = (response) => {
    const user = {
      email: response.email,
      firstName: response.name.split(' ')[0],
      lastName: response.name.split(' ')[1],
      img: response.picture.data.url,
      token: response.accessToken,
    };
    this.props.auth(user);
  }

  componentDidMount() {
    if (localStorage.getItem('myKey')) {
      const user = JSON.parse(localStorage.myKey);
      this.props.saveUser(user);
      this.props.history.push('/chat');
    }
  }

  render() {
    const { isModalOpen } = this.state;
    const { user } = this.props;
    if (user.email) {
      this.loginSuccess(user);
    }
    return (
      <div className="my-container">
        <Modal isModalOpen={isModalOpen} toggle={this.toggleModal} name="Sign Up">
          <SignUpForm />
        </Modal>
        <div id="auth" className="mt-5">
          <LoginForm />
          <div className="sign-up" onClick={this.toggleModal}>Don't have an account? Sign up</div>
          <div className="login-buttons">
            <GoogleLoginBtn responseGoogle={this.responseGoogle} />
            <div className="fb-cover">
              <FacebookLoginBtn responseFacebook={this.responseFacebook} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  saveUser, saveConnection, setLoginStatus, deleteLoginStatus, auth,
})(HomePage);
