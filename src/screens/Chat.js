import React from 'react';
import {connect} from 'react-redux';
import {saveUser, saveConnection, deleteUser, deleteConnection} from '../redux/actions';

import ChatArea from '../components/ChatArea';
import ListArea from '../components/ListArea';
import DialogsArea from '../components/DialogsArea';
import Modal from '../components/Modal';
import BlackList from '../components/BlackList';
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
    currentDialog: {type:'global'},
    connection: null,
  }
  
  chatRef = React.createRef();
  toConnect = () => {
    const {email} = this.props;
    this.connection = window.io.connect('http://192.168.0.235:3020', {reconnection:false});
    this.props.saveConnection(this.connection);
    this.connection.emit('email', email);
    this.connection.emit('change-dialog', 'global');
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
    const time = new Date().toString().split(' ');
    const newTime = `${time[2]} ${time[1]} ${time[3]} ${time[4]}`;
    let type = currentDialog.type;
    if (currentDialog.type === 'individual') {
      type = currentDialog.users.find(i => i !== email);
    }
    const myMesage = {email, message, time: newTime, currentDialog: type};
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
  }
  handleBlock = (i) => {
    this.connection.emit('block-user', i);
  }
  toggleModalBL = ()=>{
    const {isModalOpenBL} = this.state;
    this.setState({isModalOpenBL: !isModalOpenBL});
  } 
  toggleModalAG = ()=>{
    const {isModalOpenAG} = this.state;
    this.setState({isModalOpenAG: !isModalOpenAG});
  } 
  changeDialog = (dialog) => {
    this.connection.emit('change-dialog', dialog);
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
  restoreUser = (i) => {
    this.connection.emit('restore-user', i);
  }
  componentDidMount() {
    console.log('did mount');
    if (localStorage.getItem('myKey')){
      const user = JSON.parse(localStorage.myKey);
      this.props.saveUser(user);
      console.log('ЮЗЕР ИЗ localStorage');
      this.toConnect();
    } else {
      this.props.history.push('/');
      return;
    }
    const {email} = this.props;
    
    // this.connection.emit('email', email);
    // this.connection.emit('change-dialog', 'global');
    this.connection.on('chat', (data) => {
      const {messages, currentDialog} = this.state;
      if (currentDialog.type === data.currentDialog){
        messages.push(data);
        this.setState({messages});
        this.scrollToBottom();
      } else {
        if (currentDialog.type === 'individual' && currentDialog.users.includes(data.currentDialog)){
          messages.push(data);
          this.setState({messages});
          this.scrollToBottom();
        }
      }
    })
    this.connection.on('people-online', (data) => {
      const myEmails = data.filter(e => e && e !== email && !this.state.blackList.includes(e));
      this.setState({people:myEmails});
    })
    this.connection.on('clear', () => {
      this.setState({messages:[]});
    })
    this.connection.on('black-list', (blackList) => {
      this.setState({blackList});
    })
    this.connection.on('dialogs', (arr) => {
      const dialogs = arr.map(dialog => {
        if (dialog.type === 'individual') {
          const user = dialog.users.find(i => i !== email);
          return user;
        }
        return dialog.type;
      })
      this.setState({dialogs});
    })
    this.connection.on('messages',(messages) => {
      if(!messages){
        this.setState({messages:[]});
        this.scrollToBottom();
        return;
      }
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
    const {email, img} = this.props;
    const {message, messages, people, status, isModalOpenBL, isModalOpenAG, blackList, dialogs, title, currentDialog} = this.state;
    return (
      <div className='container clearfix'>
        <Modal isModalOpen={isModalOpenBL} toggle={this.toggleModalBL} name='Black List'>
          <BlackList list={blackList} restoreUser={this.restoreUser}/>
        </Modal>
        <Modal isModalOpen={isModalOpenAG} toggle={this.toggleModalAG} name='Create a new group'>
          <GroupForm list={people} title={title} createGroup={this.createGroup} status={status} email={email}/>
        </Modal>
        <div className='clearfix'>
          <div style={{float:'right'}} >
            <button className='btn btn-danger mt-3 mr-3' onClick={this.toggleModalAG}>Add Group</button>
            <button className='btn btn-dark mt-3 mr-3' onClick={this.toggleModalBL}>Black List</button>
            <button className='btn btn-danger mt-3 mr-3' onClick={this.handleLogout}>LogOut</button>
          </div>
        </div>
        <div className='chat-area clearfix mb-3' >
          <ChatArea messages={messages}  email={email} chatRef={this.chatRef}/>
          <div className='list-area mt-3'>
            <ListArea people={people} handleBlock={this.handleBlock} handleConnect={this.handleConnect}/>
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
