import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";






function DeleteModal(props) {
    
    // const [showModal, setShow] = useState(true);
    
    function deleteEvent() {
        axios.delete(`https://localhost:44359/api/Events/${props.eventchosen}`);
        props.onHide();
        
    }
    
    return (
        
        <Modal
        show={props.show} onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure you want to Delete this Item?</h4>
                {props.eventchosen}


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {  deleteEvent()}}>Delete</Button>
                <Button onClick={props.onHide} variant="secondary">Cancel</Button>
            </Modal.Footer>
        </Modal>
      
    )
}


export default DeleteModal;