import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


function ModalBL (props) {
    const {isModalOpen, toggle} = props;
    return (
        <Modal isOpen={isModalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Black List</ModalHeader>
          <ModalBody>
            {props.children}
          </ModalBody>
          
        </Modal>
    )
}

export default ModalBL;