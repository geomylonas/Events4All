import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import EventInfo from "../../pages/events/EventInfo";
import { propTypes } from 'react';
import { render } from "@testing-library/react";
import "./Cart.css"

export default function Cart(props) {

    let cartText;
    if (props.chosenproducts.length == 0) {
        cartText = <h5> Your cart is Empty</h5>
    }
    else if (props.chosenproducts.length == 1) {
        cartText = <h5>You have {props.chosenproducts.length} product in your Cart</h5>
    }
    else {
        cartText = <h5>You have {props.chosenproducts.length} products in your Cart</h5>
    }

    function addQuantity(num){
        console.log("fff");
        num++;
        
    }


    return (
        <>
            <Modal 
                show={props.show} onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your selected Events
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {cartText}
                    {
                        props.chosenproducts.map(p => (
                            <div className="cartitem" key={p.eventId}>

                                <div>
                                    <p>Quantity</p>
                                    <div id="cartbuttons">
                                        <button onClick={() => props.subtractquantity(p)}>-</button>
                                        {p.count}
                                        <button  onClick={() => props.addquantity(p)}>+</button>
                                    </div>
                                </div>
                                <div>
                                    <p>Title</p>
                                    <p>{p.eventTitle}</p>
                                </div>
                                <div>
                                    <p>Category</p>
                                    <p>{p.ticketCategory}</p>
                                </div>
                                <div>
                                    <p>Price</p>
                                    <p>{p.ticketPrice} &euro;</p>
                                </div>
                                <hr/>
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