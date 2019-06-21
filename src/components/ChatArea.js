import React from 'react';
import Message from './Message';

const ChatArea = ({ messages, email, chatRef }) => {
  
  return (<div className="chat-window clearfix" ref = {chatRef}>
    {messages.map(message => {
      return (
        <Message
          className={`${
            message.email === email ? "my-message message" : "message"
          }`}
          key={message._id}
          message={message}
        />
      );
    })}
  </div>)
};

export default ChatArea;