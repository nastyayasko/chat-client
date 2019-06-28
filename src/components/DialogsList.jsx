/* eslint-disable max-len */
import React from 'react';
import DialogsArea from './DialogsArea';

function DialogsList(props) {
  const {
    dialogs, currentDialog, email, changeDialog,
  } = props;
  const groupDialogs = dialogs.filter(dialog => dialog.type === 'group');
  return (
    <div className="list-area">
      <div className="list-name">Dialogs</div>
      <DialogsArea dialogs={groupDialogs} email={email} currentDialog={currentDialog} changeDialog={changeDialog} />
    </div>
  );
}

export default DialogsList;
