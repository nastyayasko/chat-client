import React from 'react';
import DialogsArea from './DialogsArea';

function DialogsList(props) {
  const {
    dialogs, currentDialog, email, changeDialog,
  } = props;
  return (
    <div className="list-area">
      <div className="list-name">Dialogs</div>
      <DialogsArea dialogs={dialogs} email={email} currentDialog={currentDialog} changeDialog={changeDialog} />
    </div>
  );
}

export default DialogsList;
