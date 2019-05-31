import React from 'react';
import Message from './Message';

const ChatArea = ({ messages, email, chatRef }) => {
  
  return (<div className="chat-window clearfix mt-3" ref = {chatRef}>
    {messages.map((message, i) => {
      return (
        <Message
          className={`${
            message.email === email ? "my-message m-3" : "message m-3"
          }`}
          key={i}
          message={message}
        />
      );
    })}
  </div>)
};

export default ChatArea;