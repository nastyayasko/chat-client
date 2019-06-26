/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


function ModalWindow(props) {
  const { isModalOpen, toggle, name } = props;
  return (
    <Modal isOpen={isModalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{name}</ModalHeader>
      <ModalBody>
        {props.children}
      </ModalBody>

    </Modal>
  );
}

export default ModalWindow;
