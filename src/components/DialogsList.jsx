/* eslint-disable max-len */
import React from 'react';
import DialogsArea from './DialogsArea';

function DialogsList(props) {
  const {
    dialogs, currentDialog, email, changeDialog, menu, choose,
  } = props;
  const groupDialogs = dialogs.filter(dialog => dialog.type === 'group');
  return (
    <div className={menu === 'dialogs' ? 'list-area dialogs-list' : 'list-area dialogs-list non-display'}>
      <div className="list-name">Dialogs</div>
      <DialogsArea
        dialogs={groupDialogs}
        email={email}
        currentDialog={currentDialog}
        changeDialog={changeDialog}
        choose={choose}
      />
    </div>
  );
}

export default DialogsList;
