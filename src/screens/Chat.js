import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {saveUser, saveConnection, deleteUser, deleteConnection} from '../redux/actions';

import ChatArea from '../components/ChatArea';
import ListArea from '../components/ListArea';
import DialogsArea from '../components/DialogsArea';
import Modal from '../components/Modal';
import GroupForm from '../components/GroupForm';
import UserPhoto from '../components/UserPhoto'

class Chat extends React.Component {
  state = {
    message: '',
    messages: [],
    people: [],
    status: '',
    isModalOpenBL: false,
    isModalOpenAG: false,
    blackList: [],
    dialogs: [],
    currentDialog: null,
    connection: null,
  }
  
  chatRef = React.createRef();
  
  toConnect = (user) => {
    this.connection = window.io.connect('http://localhost:3020', {reconnection:false});
    this.props.saveConnection(this.connection);
    this.connection.emit('user', user);
  }
  
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email} = this.props;
    const {message, currentDialog} = this.state;
    if (!message) return;
    if (!currentDialog) {
      this.setState({status:'Choose the dialog'});
      return;
    }
    const time = new Date().toString().split(' ');
    const newTime = `${time[2]} ${time[1]} ${time[3]} ${time[4]}`;
    const myMesage = {email, message, time: newTime, currentDialog: currentDialog._id};
    this.setState({message:''});
    this.connection.emit('chat', myMesage);
  }

  handleLogout = () => {
    this.props.deleteUser();
    this.connection.disconnect();
    this.props.deleteConnection();
    localStorage.removeItem('myKey');
    this.props.history.push('/');
    
  }
  handleConnect = (i) => {
    this.connection.emit('connect-user', i);
    this.setState({status:''});
  }
  toggleModalAG = ()=>{
    const {isModalOpenAG} = this.state;
    this.setState({isModalOpenAG: !isModalOpenAG, status:''});
  } 
  changeDialog = (id) => {
    this.connection.emit('change-dialog', id);
    this.setState({status:''});
  }
  createGroup = (group) => {
    if (!group) {
      this.setState({status: "Some fields are empty"});
      return;
    }
    this.connection.emit('new-group', group);
    this.toggleModalAG();
  }
  scrollToBottom() {
    this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight - this.chatRef.current.clientHeight;
  }
  componentDidMount() {
    if (localStorage.getItem('myKey')){
      const user = JSON.parse(localStorage.myKey);
      this.props.saveUser(user);
      this.toConnect(user);
    } else {
      this.props.history.push('/');
      return;
    }
    axios('http://localhost:3020/api/all-users')
    .then(resp => {
        const {user} = this.props;
        const people = resp.data.filter(person => person._id !== user._id);
        this.setState({people});
      })
      .catch(err => {throw err;})
    
    
    this.connection.on('chat', (data) => {
      const {messages, currentDialog} = this.state;
      if (currentDialog && currentDialog._id === data.currentDialog){
        messages.push(data);
        this.setState({messages});
        this.scrollToBottom();
      }
    })
    
    this.connection.on('dialogs', (dialogs) => {
      this.setState({dialogs});
    })
    this.connection.on('messages',(messages) => {
      this.setState({messages});
      this.scrollToBottom();
    })
    this.connection.on('current-dialog', (currentDialog) => {
      this.setState({currentDialog});
    })
    
    this.connection.on('connect', () => {
      console.log('online');
    });

    this.connection.onclose = () => {
      console.log('offline');
    };
    
  }
  componentWillUnmount(){
    this.connection.disconnect();
  }

  render (){
    const {email, img, user} = this.props;
    const {message, messages, people, status, isModalOpenAG, dialogs, title, currentDialog} = this.state;
    return (
      <div className='container clearfix'>
        <Modal isModalOpen={isModalOpenAG} toggle={this.toggleModalAG} name='Create a new group'>
          <GroupForm people={people} user={user} title={title} createGroup={this.createGroup} status={status} email={email}/>
        </Modal>
        <div className='clearfix'>
          <div className='status-chat mt-3'>{status}</div>
          <div style={{float:'right'}} >
            <button className='btn btn-danger mt-3 mr-3' onClick={this.toggleModalAG}>Add Group</button>
            <button className='btn btn-danger mt-3 mr-3' onClick={this.handleLogout}>LogOut</button>
          </div>
        </div>
        <div className='chat-area clearfix mb-3' >
          <ChatArea messages={messages}  email={email} chatRef={this.chatRef}/>
          <div className='list-area mt-3'>
            <ListArea people={people} currentDialog={currentDialog} user={user} handleConnect={this.handleConnect}/>
            <DialogsArea dialogs={dialogs} email={email} currentDialog={currentDialog} changeDialog={this.changeDialog}/>
          </div> 
        </div>
        <div className='message-area mb-3'>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row mx-auto mt-3">
              <UserPhoto img={img}/>
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
    user: state.user,
    email: state.user.email,
    img: state.user.img,
    connection: state.connection,
  }
}

export default connect (mapStateToProps, {saveUser, saveConnection, deleteUser, deleteConnection})(Chat);
