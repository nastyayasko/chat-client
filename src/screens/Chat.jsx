/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import {
  saveUser, saveConnection, deleteUser, deleteConnection, getUsers, getDialogs, checkToken,
} from '../redux/actions';
import '../styles/Chat.css';

import Sidebar from '../components/Sidebar';
import FriendsList from '../components/FriendsList';
import MessageArea from '../components/MessageArea';
import DialogsList from '../components/DialogsList';
import Modal from '../components/Modal';
import GroupForm from '../components/GroupForm';
import createConnection from '../functions';

class Chat extends React.Component {
  state = {
    message: '',
    messages: [],
    status: '',
    isModalOpenAG: false,
    currentDialog: null,
    dialogName: 'WELCOME!',
    menu: 'messages',
  }

  chatRef = React.createRef();

  toConnect = () => {
    const { user } = this.props;
    const connection = createConnection(this, user);
    connection.emit('user', user);
    this.props.saveConnection(connection);
    this.props.getUsers();
    this.props.getDialogs(user._id);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.props.user;
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
    this.props.connection.emit('chat', myMesage);
  }

  handleLogout = () => {
    this.props.deleteUser();
    this.props.connection.disconnect();
    this.props.deleteConnection();
    localStorage.removeItem('myToken');
    this.props.history.push('/');
  }

  handleConnect = (i) => {
    const { people } = this.props;
    const person = people.find(user => user._id === i);
    this.props.connection.emit('connect-user', i);
    this.chooseMenu('messages');
    this.setState({ status: '', dialogName: `${person.firstName} ${person.lastName}` });
  }

  toggleModalAG = () => {
    const { isModalOpenAG } = this.state;
    this.setState({ isModalOpenAG: !isModalOpenAG, status: '' });
  }

  changeDialog = (id) => {
    this.props.connection.emit('change-dialog', id);
    const { dialogs } = this.props;
    const dialog = dialogs.find(d => d._id === id);
    this.chooseMenu('messages');
    this.setState({ status: '', dialogName: dialog.title });
  }

  createGroup = (group) => {
    if (!group) {
      this.setState({ status: 'Some fields are empty' });
      return;
    }
    this.props.connection.emit('new-group', group);
    this.toggleModalAG();
  }

  chooseMenu = (menu) => {
    this.setState({ menu });
  }

  componentDidMount() {
    if (this.props.user.email) {
      this.toConnect();
    } else if (!this.props.user.email && localStorage.getItem('myToken')) {
      this.props.checkToken(localStorage.getItem('myToken'));
    } else {
      this.props.history.push('/');
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      this.toConnect();
    }
  }

  componentWillUnmount() {
    this.props.connection.disconnect();
    this.props.deleteConnection();
  }

  render() {
    const {
      user, people, dialogs,
    } = this.props;
    const {
      message, messages, status, isModalOpenAG, title, currentDialog, dialogName, menu,
    } = this.state;
    return (
      <div className="my-container clearfix">
        <Modal isModalOpen={isModalOpenAG} toggle={this.toggleModalAG} name="Create a new group">
          <GroupForm people={people} user={user} title={title} createGroup={this.createGroup} status={status} email={user.email} />
        </Modal>

        <div className="chat-area">
          <Sidebar
            img={user.img}
            toggleModalAG={this.toggleModalAG}
            handleLogout={this.handleLogout}
            choose={this.chooseMenu}
          />
          <FriendsList
            people={people}
            currentDialog={currentDialog}
            user={user}
            handleConnect={this.handleConnect}
            menu={menu}
          />
          <MessageArea
            dialogName={dialogName}
            messages={messages}
            email={user.email}
            status={status}
            chatRef={this.chatRef}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            message={message}
            menu={menu}
          />
          <DialogsList
            dialogs={dialogs}
            email={user.email}
            currentDialog={currentDialog}
            changeDialog={this.changeDialog}
            menu={menu}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  people: state.users,
  dialogs: state.dialogs,
  connection: state.connection,
});

export default connect(mapStateToProps, {
  saveUser, saveConnection, deleteUser, deleteConnection, getUsers, getDialogs, checkToken,
})(Chat);
