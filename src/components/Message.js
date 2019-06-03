import React from 'react';

class Message extends React.Component{
    
    render(){
        const {className, message} = this.props;
        
        return(
            <div className='one-message clearfix'>
                <div className={className}>
                    <div className='user-name m-1'>{message.email}<br/><span>({message.time})</span></div>
                    <div className='m-1'>{message.message}</div>
                </div>
            </div>
        )
    }
}

export default Message;