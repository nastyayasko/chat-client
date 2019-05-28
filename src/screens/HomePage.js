import React from 'react';
import {connect} from 'react-redux';
import {saveEmail} from '../redux/actions'



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
              <div className='google'><i className="fab fa-google"></i></div>
              <div className='facebook' ><i className="fab fa-facebook-f"></i></div>
            </div>
          </div>
        </div>
      </div>
    )  
  }
  
}

export default connect (null, {saveEmail})(HomePage);