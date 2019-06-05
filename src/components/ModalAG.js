import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


function ModalAG (props) {
    const {isModalOpen, toggle} = props;
    return (
        <Modal isOpen={isModalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Create a new group</ModalHeader>
          <ModalBody>
            {props.children}
          </ModalBody>
          
        </Modal>
    )
}

export default ModalAG;