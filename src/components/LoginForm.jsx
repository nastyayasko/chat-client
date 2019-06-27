/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { login, setLoginStatus, deleteLoginStatus } from '../redux/actions';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.deleteLoginStatus();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.props.setLoginStatus('Some fields are empty');
      return;
    }
    const user = { email, password };
    this.props.login(user);
  }

  render() {
    const { email, password } = this.state;
    const { status } = this.props;
    return (
      <div>
        <div className="login pt-5">LOGIN</div>
        <form className="login-form pt-4" onSubmit={this.handleSubmit}>
          <div className="status">{status}</div>
          <div className="form-group">
            <div className="label">Email</div>
            <input type="email" className="my-input mb-2" placeholder="email" value={email} name="email" onChange={this.handleChange} />
            <div className="label mt-3">Password</div>
            <input type="password" className="my-input mb-2" placeholder="password" value={password} name="password" onChange={this.handleChange} />
            <button type="submit" className="login-btn mt-4">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  status: state.loginStatus,
});
export default connect(mapStateToProps, { login, setLoginStatus, deleteLoginStatus })(LoginForm);
