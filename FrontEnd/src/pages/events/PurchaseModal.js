import React from "react";
import { Modal, Button, Form } from "react-bootstrap";



function PurchaseModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Payment Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Card details</h4>

                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control type="text" placeholder="Normal text" />
                        <br />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Cardholder Name</Form.Label>
                        <Form.Control type="text" placeholder="Normal text" />
                        <br />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Expire Date</Form.Label>
                        <Form.Control type="text" placeholder="Normal text" />
                        <br />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" variant="success">Proceed to Payment</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default PurchaseModal;