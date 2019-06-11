import React from 'react';
import axios from 'axios';

class SignUpForm extends React.Component {
  state ={
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    robot: false,
    status:'',
    url: 'http://localhost:3020/api/sign-up',
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
  checkedBoxes = (e) => {
    this.setState({robot:e.target.checked}); 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {login} =this.props;
    const {email, firstName, lastName, password, robot, url} = this.state;
    if(!email || !firstName || !lastName || !password || !robot){
      this.setState({status: "Some fields are empty"});
      return;
    }
    const user = {email, firstName, lastName, password}
    axios.post(url, user)
      .then(response => {
        console.log(response.data);
        if (response.data.client) {
          this.setState({status: "User with this email already exists."});
          return;
        }
        login(response.data);
      })

    console.log('OK')
    
  }
  render(){
    const {status} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
          <div className='status'>{status}</div>
        <div className="form-group">
          <label >First name</label>
          <input type="text" className="form-control" placeholder="First name" onChange={this.handleChange} name = 'firstName'/>
          <label className='mt-1'>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" onChange={this.handleChange} name = 'lastName'/>
          <label className='mt-1'>Email</label>
          <input type="email" className="form-control" placeholder="Email" onChange={this.handleChange} name = 'email'/>
          <label className='mt-1'>Password</label>
          <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange} name = 'password'/>
          <div className="form-check mt-3 mb-1">
            <input className="form-check-input" type="checkbox" onChange={this.checkedBoxes}/>
            <label className="form-check-label">I'm not a robot!</label>
          </div>
        </div>
        <button className='btn btn-danger' type='submit'>Sign up</button>
      </form>
    )
  }
}

export default SignUpForm;