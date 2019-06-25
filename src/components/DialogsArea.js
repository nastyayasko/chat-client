import React from 'react';

function DialogsArea(props) {
  const {dialogs, changeDialog, currentDialog} = props;
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

export default DialogsArea;