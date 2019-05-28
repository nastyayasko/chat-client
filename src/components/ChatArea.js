import React from 'react';
import {connect} from 'react-redux';
import Message from './Message';

class ChatArea extends React.Component {
  
  render(){
    const {messages, email} = this.props;
    console.log('Render ChatArea');
    return (
      <div className='chat-window clearfix mt-3'>
        {
          messages.map((message, i) => {
            return (
              <Message className={`${message.email === email ? 'my-message m-3' : 'message m-3'}`} key={i} message={message}/>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.email,
  }
}

export default connect (mapStateToProps)(ChatArea);