/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function DialogsArea(props) {
  const {
    dialogs, changeDialog, currentDialog, choose,
  } = props;
  let current;
  if (currentDialog && currentDialog.type === 'group') {
    current = currentDialog.title;
  }
  return (
    <div className="dialogs-area">
      {
        dialogs.map(dialog => (
          <div className="dialog" key={dialog._id} onClick={() => { changeDialog(dialog._id); choose('messages'); }}>
            <div>
              <img className="photo-m mr-1" src={dialog.img} alt="faces" />
            </div>
            <div className={dialog.title === current ? 'dialogs currentDialog' : 'dialogs'}>{dialog.title}</div>
          </div>
        ))
      }
    </div>
  );
}

export default DialogsArea;
