import React from 'react';

class DialogsArea extends React.Component{
  render(){
    const {dialogs, changeDialog} = this.props;
    return (
      <div className='dialogs-area'>
        {
          dialogs.map(dialog => {
            return (
              <div className='dialogs' key={dialog} onClick={() =>{changeDialog(dialog)}}>{dialog}</div>
            )
          })
        }
        
        
      </div>
    )
  }
}

export default DialogsArea;