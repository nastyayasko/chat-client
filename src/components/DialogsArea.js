import React from 'react';

class DialogsArea extends React.Component{
  render(){
    const {dialogs, changeDialog, currentDialog, email} = this.props;
    const current = currentDialog.type === 'individual'? currentDialog.users.find(i => i !== email):currentDialog.type;
    
    return (
      <div className='dialogs-area'>
        {
          dialogs.map(dialog => {
            return (
              <div className={dialog === current?'dialogs currentDialog':'dialogs'} key={dialog} onClick={() =>{changeDialog(dialog)}}>{dialog}</div>
            )
          })
        }
        
        
      </div>
    )
  }
}

export default DialogsArea;