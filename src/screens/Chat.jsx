/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  saveUser, saveConnection, deleteUser, deleteConnection,
} from '../redux/actions';
import '../styles/Chat.css';

import Sidebar from '../components/Sidebar';
import FriendsList from '../components/FriendsList';
import MessageArea from '../components/MessageArea';
import DialogsList from '../components/DialogsList';
import Modal from '../components/Modal';
import GroupForm from '../components/GroupForm';

class Chat extends React.Component {
  state = {
    message: '',
    messages: [],
    people: [],
    status: '',
    isModalOpenAG: false,
    dialogs: [],
    currentDialog: null,
    dialogName: 'WELCOME!',
  }

  chatRef = React.createRef();

  toConnect = (user) => {
    this.connection = window.io.connect('http://localhost:3020', { reconnection: false });
    this.props.saveConnection(this.connection);
    this.connection.emit('user', user);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.props;
    const { message, currentDialog } = this.state;
    if (!message) return;
    if (!currentDialog) {
      this.setState({ status: 'Choose the dialog' });
      return;
    }
    const time = new Date().toString().split(' ');
    const newTime = `${time[2]} ${time[1]} ${time[3]} ${time[4]}`;
    const myMesage = {
      email, message, time: newTime, currentDialog: currentDialog._id,
    };
    this.setState({ message: '' });
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
    const { people } = this.state;
    const person = people.find(user => user._id === i);
    this.connection.emit('connect-user', i);
    this.setState({ status: '', dialogName: `${person.firstName} ${person.lastName}` });
  }

  toggleModalAG = () => {
    const { isModalOpenAG } = this.state;
    this.setState({ isModalOpenAG: !isModalOpenAG, status: '' });
  }

  changeDialog = (id) => {
    this.connection.emit('change-dialog', id);
    const { dialogs } = this.state;
    const dialog = dialogs.find(d => d._id === id);
    this.setState({ status: '', dialogName: dialog.title });
  }

  createGroup = (group) => {
    if (!group) {
      this.setState({ status: 'Some fields are empty' });
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
      .then((resp) => {
        const { user } = this.props;
        const people = resp.data.filter(person => person._id !== user._id);
        if (people && people.length) {
          this.setState({ people });
        }
      })
      .catch((err) => { throw err; });
  }

  getDialogs = (id) => {
    axios(`http://localhost:3020/api/dialogs/${id}`)
      .then((resp) => {
        if (resp.data && resp.data.length) {
          this.setState({ dialogs: resp.data });
        }
      })
      .catch((err) => { throw err; });
  }

  componentDidMount() {
    let currentUser;
    if (localStorage.getItem('myKey')) {
      currentUser = JSON.parse(localStorage.myKey);
      this.props.saveUser(currentUser);
      this.toConnect(currentUser);
    } else {
      this.props.history.push('/');
      return;
    }
    this.getUsers();
    this.getDialogs(currentUser._id);

    this.connection.on('chat', (data) => {
      const { messages, currentDialog } = this.state;
      if (currentDialog && currentDialog._id === data.currentDialog) {
        messages.push(data);
        this.setState({ messages });
        this.scrollToBottom();
      }
    });

    this.connection.on('dialogs', () => {
      const { user } = this.props;
      this.getDialogs(user._id);
    });
    this.connection.on('all-users', () => {
      this.getUsers();
    });
    this.connection.on('messages', (messages) => {
      this.setState({ messages });
      this.scrollToBottom();
    });
    this.connection.on('current-dialog', (currentDialog) => {
      this.setState({ currentDialog });
    });
  }

  componentWillUnmount() {
    this.connection.disconnect();
  }

  render() {
    const { email, user } = this.props;
    const {
      message, messages, people, status, isModalOpenAG, dialogs, title, currentDialog, dialogName,
    } = this.state;
    return (
      <div className="my-container clearfix">
        <Modal isModalOpen={isModalOpenAG} toggle={this.toggleModalAG} name="Create a new group">
          <GroupForm people={people} user={user} title={title} createGroup={this.createGroup} status={status} email={email} />
        </Modal>

        <div className="chat-area">
          <Sidebar img={user.img} toggleModalAG={this.toggleModalAG} handleLogout={this.handleLogout} />
          <FriendsList people={people} currentDialog={currentDialog} user={user} handleConnect={this.handleConnect} />
          <MessageArea
            dialogName={dialogName}
            messages={messages}
            email={email}
            status={status}
            chatRef={this.chatRef}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            message={message}
          />
          <DialogsList dialogs={dialogs} email={email} currentDialog={currentDialog} changeDialog={this.changeDialog} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  email: state.user.email,
  connection: state.connection,
});

export default connect(mapStateToProps, {
  saveUser, saveConnection, deleteUser, deleteConnection,
})(Chat);
