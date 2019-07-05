/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import ChatArea from './ChatArea';

function MessageArea(props) {
  const {
    dialogName, messages, email, status, chatRef, handleSubmit, handleChange, message, menu,
  } = props;
  return (
    <div className={menu === 'messages' ? 'messages' : 'messages non-display'}>
      <div className="dialog-name">
        {dialogName}
        <div className="status-chat mt-3">{status}</div>
      </div>
      <ChatArea messages={messages} email={email} chatRef={chatRef} />
      <div className="message-area">
        <form onSubmit={handleSubmit} className="message-form">
          <input type="text" autoFocus onChange={handleChange} name="message" value={message} className="input-message" placeholder="Message" />
          <button type="submit" className="send-message"><i className="fas fa-paper-plane" /></button>
        </form>
      </div>
    </div>
  );
}

export default MessageArea;
