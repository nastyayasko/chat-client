import React from 'react';

class Message extends React.Component{
    
    render(){
        const {className, message} = this.props;
        const fullDate = message.time.split('T');
        const day = fullDate[0];
        const time = fullDate[1].split('.');
        return(
            <div className='one-message clearfix'>
                <div className={className}>
                    <div className='user-name m-1'>{message.email}<br/><span>({day} {time[0]})</span></div>
                    <div className='m-1'>{message.message}</div>
                </div>
            </div>
        )
    }
}

export default Message;