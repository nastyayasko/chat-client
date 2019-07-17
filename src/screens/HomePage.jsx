/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { auth, checkToken, deleteLoginStatus } from '../redux/actions';

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

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
    this.props.deleteLoginStatus();
  }

  responseGoogle = (response) => {
    const user = {
      email: response.w3.U3,
      firstName: response.w3.ofa,
      lastName: response.w3.wea,
      img: response.w3.Paa,
    };
    this.props.auth(user);
  }

  responseFacebook = (response) => {
    const user = {
      email: response.email,
      firstName: response.name.split(' ')[0],
      lastName: response.name.split(' ')[1],
      img: response.picture.data.url,
    };
    this.props.auth(user);
  }

  componentDidMount() {
    if (localStorage.getItem('myToken')) {
      this.props.checkToken(localStorage.getItem('myToken'));
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      localStorage.setItem('myToken', user.token);
      this.props.history.push('/chat');
    }
  }

  render() {
    const { isModalOpen } = this.state;
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

export default connect(mapStateToProps, { auth, checkToken, deleteLoginStatus })(HomePage);
