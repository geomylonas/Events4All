import React, { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";



function CartModal() {

    return (


        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Your selected Events
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure you want to Delete this Item?</h4>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => console.log(props.productchosen)}>Proceed to Payment</Button>
                <Button variant="danger">Empty Items</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default CartModal;