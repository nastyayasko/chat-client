import React from 'react';
import {connect} from 'react-redux';
import {deleteEmail} from '../redux/actions'

import ChatArea from '../components/ChatArea';
import ListArea from '../components/ListArea';
import DialogsArea from '../components/DialogsArea';
import ModalBL from '../components/ModalBL';
import BlackList from '../components/BlackList';

class Chat extends React.Component {
  state = {
    message: '',
    messages: [],
    people: [],
    status: '',
    isModalOpen: false,
    blackList: [],
  }
  connection = window.io.connect('http://192.168.0.208:3020');
  chatRef = React.createRef();
  
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email} = this.props;
    const {message} = this.state;
    if (!message) return;
    const time = new Date().toString().split(' ');
    const newTime = `${time[2]} ${time[1]} ${time[3]} ${time[4]}`;
    const myMesage = {email, message,time: newTime};
    this.setState({message:''});
    this.connection.emit('chat', myMesage);
  }

  handleLogout = () => {
    this.props.deleteEmail();
    this.props.history.push('/');
    this.connection.disconnect();
  }
  handleConnect = (i) => {
    this.connection.emit('connect-user', i);
  }
  handleBlock = (i) => {
    this.connection.emit('block-user', i);
  }
  toggleModal = ()=>{
    const {isModalOpen} = this.state;
    this.setState({isModalOpen: !isModalOpen});
  } 
  toGlobalChat = () => {
    this.connection.emit('global');
  }
  toBlackList = () => {
    this.toggleModal();
  }
  scrollToBottom() {
    this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight - this.chatRef.current.clientHeight;
  }
  restoreUser = (i) => {
    this.connection.emit('restore-user', i);
  }
  componentDidMount() {
    const {email} = this.props;
    this.connection.emit('email', email);

    this.connection.on('chat', (data) => {
      const {messages} = this.state;
      messages.push(data);
      this.setState({messages});
      this.scrollToBottom();
    })
    this.connection.on('people-online', (data) => {
      const myEmails = data.filter(e => e !== email && !this.state.blackList.includes(e));
      this.setState({people:myEmails});
    })
    this.connection.on('status', (status) => {
      this.setState({status});
    })
    this.connection.on('clear', () => {
      this.setState({messages:[]});
    })
    this.connection.on('black-list', (blackList) => {
      this.setState({blackList});
    })
    
    this.connection.on('connect', () => {
        console.log('online');
      });

    this.connection.onclose = () => {
      console.log('offline');
    };
  }

  render (){
    const {email} = this.props;
    const {message, messages, people, status, isModalOpen, blackList} = this.state;
    return (
      <div className='container clearfix'>
        <ModalBL isModalOpen={isModalOpen} toggle={this.toggleModal}>
          <BlackList list={blackList} restoreUser={this.restoreUser}/>
        </ModalBL>
        <div className='clearfix'>
          <h2 className='chat-status mt-3 mr-3'style={{float:'left'}}>{status}</h2>
          <div style={{float:'right'}} >
            <button className='btn btn-dark mt-3 mr-3' onClick={this.toBlackList}>Black List</button>
            <button className='btn btn-danger mt-3 mr-3' onClick={this.toGlobalChat}>Global Chat</button>
            <button className='btn btn-danger mt-3 mr-3' onClick={this.handleLogout}>LogOut</button>
          </div>
        </div>
        <div className='chat-area clearfix mb-3' >
          <ChatArea messages={messages}  email={email} chatRef={this.chatRef}/>
          <div className='list-area mt-3'>
            <ListArea people={people} handleBlock={this.handleBlock} handleConnect={this.handleConnect}/>
            <DialogsArea />
          </div> 
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
