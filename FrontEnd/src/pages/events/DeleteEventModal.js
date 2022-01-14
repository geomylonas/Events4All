import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function DeleteModal(props) {
    const navigate = useNavigate();
    
    function deleteEvent() {
        axios.delete(`https://localhost:44359/api/Events/${props.eventchosen}`, {
            headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        }
        ).then(res => {
           alert("Deleted Successfully");
            
        }).then(r=>{
            navigate('/myeventsorganizer');
            window.location.reload();
        }).catch(er =>{
            
        });
        
        
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
                

            </Modal.Body>
            <Modal.Footer>
            
                <Button onClick={() => { deleteEvent()}}>Delete</Button>
                <Button onClick={props.onHide} variant="secondary">Cancel</Button>
            </Modal.Footer>
        </Modal>
      
    )
}


export default DeleteModal;