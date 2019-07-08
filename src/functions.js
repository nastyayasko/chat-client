/* eslint-disable no-underscore-dangle */

function scrollToBottom(ref) {
	ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
}

export default function createConnection(context, user) {
  const connection = window.io.connect(`http://${process.env.REACT_APP_HOST}:3020`, { reconnection: false });
  connection.on('chat', (data) => {
    const { messages, currentDialog } = context.state;
    if (currentDialog && currentDialog._id === data.currentDialog) {
      messages.push(data);
      context.setState({ messages });
      scrollToBottom(context.chatRef);
    }
  });

  connection.on('dialogs', () => {
    context.props.getDialogs(user._id);
  });
  connection.on('all-users', () => {
    context.props.getUsers();
  });
  connection.on('messages', (messages) => {
    context.setState({ messages });
    scrollToBottom(context.chatRef);
  });
  connection.on('current-dialog', (currentDialog) => {
    context.setState({ currentDialog });
  });

  return connection;
}
