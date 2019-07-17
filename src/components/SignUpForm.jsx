/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { connect } from 'react-redux';
import { setLoginStatus, signUp, deleteLoginStatus } from '../redux/actions';

class SignUpForm extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    robot: false,
    img: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.deleteLoginStatus();
  }

  checkedBoxes = (e) => {
    this.setState({ robot: e.target.checked });
  }

  getFile = (e) => {
    this.setState({ img: e.target.files[0] });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      firstName,
      lastName,
      password,
      robot,
      img,
    } = this.state;
    if (!email || !firstName || !lastName || !password || !robot) {
      this.props.setLoginStatus('Some fields are empty');
      return;
    }
    const user = {
      email,
      firstName,
      lastName,
      password,
    };
    this.props.signUp(user, img);
  }

  render() {
    const { status } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="status">{status}</div>
        <div className="form-group">
          <div>First name</div>
          <input type="text" className="form-control" placeholder="First name" onChange={this.handleChange} name="firstName" />
          <div className="mt-1">Last name</div>
          <input type="text" className="form-control" placeholder="Last name" onChange={this.handleChange} name="lastName" />
          <div className="mt-1">Email</div>
          <input type="email" className="form-control" placeholder="Email" onChange={this.handleChange} name="email" />
          <div className="mt-1">Password</div>
          <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange} name="password" />
          <div className="mt-1">Photo</div>
          <input type="file" className="mt-2" onChange={this.getFile} />
          <div className="form-check mt-3 mb-1">
            <input className="form-check-input" type="checkbox" onChange={this.checkedBoxes} />
            <div className="form-check-label">I'm not a robot!</div>
          </div>
        </div>
        <button className="btn-creater" type="submit">Sign up</button>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  status: state.loginStatus,
});
export default connect(mapStateToProps, { setLoginStatus, signUp, deleteLoginStatus })(SignUpForm);
