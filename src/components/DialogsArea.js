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
              <div className='dialog' key={dialog._id} onClick={() =>{changeDialog(dialog._id)}}>
                <div>
                    <img className='photo-m mr-1' src={dialog.img} alt='faces'></img>
                  </div>
                <div className={dialog.title === current?'dialogs currentDialog':'dialogs'}>{dialog.title}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default DialogsArea;