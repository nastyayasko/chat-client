import React from 'react';
import {connect} from 'react-redux';
import {deleteUser, deleteConnection} from '../redux/actions';

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
    connection:{},
  }
  
  chatRef = React.createRef();
  
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
    this.state.connection.emit('chat', myMesage);
  }

  handleLogout = () => {
    this.props.deleteUser();
    this.state.connection.disconnect();
    this.props.deleteConnection();
    this.props.history.push('/');
    
  }
  handleConnect = (i) => {
    this.state.connection.emit('connect-user', i);
  }
  handleBlock = (i) => {
    this.state.connection.emit('block-user', i);
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
    this.state.connection.emit('change-dialog', dialog);
  }
  createGroup = (group) => {
    if (!group) {
      this.setState({status: "Some fields are empty"});
      return;
    }
    this.state.connection.emit('new-group', group);
    this.toggleModalAG();
  }
  scrollToBottom() {
    this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight - this.chatRef.current.clientHeight;
  }
  restoreUser = (i) => {
    this.state.connection.emit('restore-user', i);
  }
  componentDidMount() {
    const {email, connection} = this.props;
    this.setState({connection});
    if (!email) {
      this.props.history.push('/');
      return;
    }
    connection.emit('email', email);
    connection.emit('change-dialog', 'global');
    connection.on('chat', (data) => {
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
    connection.on('people-online', (data) => {
      const myEmails = data.filter(e => e !== email && !this.state.blackList.includes(e));
      this.setState({people:myEmails});
    })
    connection.on('clear', () => {
      this.setState({messages:[]});
    })
    connection.on('black-list', (blackList) => {
      this.setState({blackList});
    })
    connection.on('dialogs', (arr) => {
      const dialogs = arr.map(dialog => {
        if (dialog.type === 'individual') {
          const user = dialog.users.find(i => i !== email);
          return user;
        }
        return dialog.type;
      })
      this.setState({dialogs});
    })
    connection.on('messages',(messages) => {
      if(!messages){
        this.setState({messages:[]});
        this.scrollToBottom();
        return;
      }
      this.setState({messages});
      this.scrollToBottom();
    })
    connection.on('current-dialog', (currentDialog) => {
      this.setState({currentDialog});
    })
    
    connection.on('connect', () => {
      console.log('online');
    });

    connection.onclose = () => {
      console.log('offline');
    };
    
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
    email: state.user.email,
    img: state.user.img,
    connection: state.connection,
  }
}

export default connect (mapStateToProps, {deleteUser, deleteConnection})(Chat);
