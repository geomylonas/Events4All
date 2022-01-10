import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import EventInfo from "../../pages/events/EventInfo";
import { propTypes } from 'react';
import { render } from "@testing-library/react";


export default function Cart(props) {
          
          console.log(props.chosenproducts)
          return (
               <>
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
                <h4>Cart</h4>
                <h6>You have {props.chosenproducts.length} products in your Cart</h6>
                {
                     props.chosenproducts.map(p=>(
                          <div key={p.id}>
                               {p.id}<br/>
                               {p.title}
                               </div>
                     ))
                }
               
                

            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => console.log(props.chosenproducts)}>Proceed to Payment</Button>
                <Button variant="danger" onClick={props.emptyitems}>Empty Items</Button>
            </Modal.Footer>
        </Modal>
          </>
     )




}