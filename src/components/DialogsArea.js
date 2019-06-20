import React from 'react';

class DialogsArea extends React.Component{
  render(){
    const {dialogs, changeDialog, currentDialog} = this.props;
    let current;
    if (currentDialog && currentDialog.type ==='group'){
      current = currentDialog.title;
    }
    return (
      <div className='dialogs-area'>
        {
          dialogs.map(dialog => {
            return (
              <div className={dialog.title === current?'dialogs currentDialog':'dialogs'} key={dialog._id} onClick={() =>{changeDialog(dialog._id)}}>{dialog.title}</div>
            )
          })
        }
      </div>
    )
  }
}

export default DialogsArea;