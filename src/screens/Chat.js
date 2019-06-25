import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {saveUser, saveConnection, deleteUser, deleteConnection} from '../redux/actions';
import '../styles/Chat.css';

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
    isModalOpenAG: false,
    dialogs: [],
    currentDialog: null,
    dialogName: 'WELCOME!'
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
    const {people} = this.state;
    const person = people.find(user => user._id === i);
    this.connection.emit('connect-user', i);
    this.setState({status:'', dialogName: `${person.firstName} ${person.lastName}`});
  }
  toggleModalAG = ()=>{
    const {isModalOpenAG} = this.state;
    this.setState({isModalOpenAG: !isModalOpenAG, status:''});
  } 
  changeDialog = (id) => {
    this.connection.emit('change-dialog', id);
    const {dialogs} = this.state;
    const dialog = dialogs.find(d => d._id === id);
    this.setState({status:'', dialogName: dialog.title});
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
  getUsers = () => {
    axios('http://localhost:3020/api/all-users')
    .then(resp => {
        const {user} = this.props;
        const people = resp.data.filter(person => person._id !== user._id);
        this.setState({people});
      })
      .catch(err => {throw err;})
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
    this.getUsers();
    
    this.connection.on('chat', (data) => {
      const {messages, currentDialog} = this.state;
      if (currentDialog && currentDialog._id === data.currentDialog){
        messages.push(data);
        this.setState({messages});
        this.scrollToBottom();
      }
    })
    
    this.connection.on('dialogs', (dialogs) => {
      console.log(dialogs);
      this.setState({dialogs});
    })
    this.connection.on('all-users', (users) => {
      this.getUsers();
    })
    this.connection.on('messages',(messages) => {
      this.setState({messages});
      this.scrollToBottom();
    })
    this.connection.on('current-dialog', (currentDialog) => {
      this.setState({currentDialog});
    })
  }

  componentWillUnmount(){
    this.connection.disconnect();
  }

  render (){
    const {email, img, user} = this.props;
    const {message, messages, people, status, isModalOpenAG, dialogs, title, currentDialog, dialogName} = this.state;
    return (
      <div className='my-container clearfix'>
        <Modal isModalOpen={isModalOpenAG} toggle={this.toggleModalAG} name='Create a new group'>
          <GroupForm people={people} user={user} title={title} createGroup={this.createGroup} status={status} email={email}/>
        </Modal>
        
        <div className='chat-area' >
          <div className='sidebar'>
            <UserPhoto img={img}/>
            <i className="fas fa-comment-medical" onClick={this.toggleModalAG}></i>
            <i className="fas fa-power-off" onClick={this.handleLogout}></i>
          </div>

          <div className='list-area'>
            <div className='list-name'>Friends</div>
            <ListArea people={people} currentDialog={currentDialog} user={user} handleConnect={this.handleConnect}/>
          </div>

          <div className='messages'>
            <div className='dialog-name'>{dialogName}<div className='status-chat mt-3'>{status}</div></div>
            <ChatArea messages={messages}  email={email} chatRef={this.chatRef}/>
            <div className='message-area'>
              <form onSubmit={this.handleSubmit} className='message-form'>
                <input type="text" autoFocus onChange={this.handleChange} name = 'message' value={message} className="input-message" placeholder="Message"/>
                <button className='send-message'><i className="fas fa-paper-plane"></i></button>
              </form>
            </div>
          </div>
          <div className='list-area'>
            <div className='list-name'>Dialogs</div>
            <DialogsArea dialogs={dialogs} email={email} currentDialog={currentDialog} changeDialog={this.changeDialog}/>
          </div>
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
