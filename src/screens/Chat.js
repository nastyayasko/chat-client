import React from 'react';
import {connect} from 'react-redux';
import {deleteEmail} from '../redux/actions'

import ChatArea from '../components/ChatArea';
import ListArea from '../components/ListArea';

class Chat extends React.Component {
  state = {
    message: '',
    messages: [],
  }
  connection = new WebSocket('ws://192.168.0.140:3010');

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email} = this.props;
    const {message} = this.state;
    if (!message) return;
    const time = new Date();
    const myMesage = {email, message,time};
    this.setState({message:''});
    this.connection.send(JSON.stringify(myMesage));
  }

  handleLogout = () => {
    this.props.deleteEmail();
    this.props.history.push('/');
  }
  componentDidMount() {
    const {messages} = this.state;
    const {email} = this.props;
    this.connection.onmessage = message => {
      const data = JSON.parse(message.data);
      messages.push(data);
      this.setState({messages});
    };
    this.connection.onopen = () => {
      console.log('online');
      this.connection.send(email);
    };
    this.connection.onclose = () => console.log('offline');
  }

  render (){
    const {email} = this.props;
    const {message, messages} = this.state;
    return (
      <div className='container clearfix'>
        <div className='clearfix'>
          <button className='btn btn-danger mt-3 mr-3' style={{float:'right'}} onClick={this.handleLogout}>LogOut</button>
        </div>
        <div className='chat-area clearfix mb-3'>
          <ChatArea messages={messages}  email={email}/>
          <ListArea />
        </div>
        <div className='message-area mb-3'>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row mx-auto mt-3">
              <label className="col-form-label m-2">{email}</label>
              <div className="col-sm-7">
              <input type="text" onChange={this.handleChange} name = 'message' value={message} className="form-control m-2" placeholder="Message"/>
              </div>
              <button type="submit" className="btn btn-danger m-2">Send</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.email,
  }
}

export default connect (mapStateToProps, {deleteEmail})(Chat);
