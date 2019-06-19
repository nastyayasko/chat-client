import React from 'react';

class DialogsArea extends React.Component{
  render(){
    const {dialogs, changeDialog, currentDialog} = this.props;
    let current;
    if (currentDialog && currentDialog.type !=='individual'){
      current = currentDialog.type;
    }
    return (
      <div className='dialogs-area'>
        {
          dialogs.map(dialog => {
            return (
              <div className={dialog.type === current?'dialogs currentDialog':'dialogs'} key={dialog._id} onClick={() =>{changeDialog(dialog._id)}}>{dialog.type}</div>
            )
          })
        }
        
        
      </div>
    )
  }
}

export default DialogsArea;