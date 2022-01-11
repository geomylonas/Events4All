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
    
    
    
    let totalPriceText;
    if(props.chosenproducts.reduce((c, p) => c + (p.count*p.ticketPrice), 0)){
        totalPriceText=<p>Total Price: {props.chosenproducts.reduce((c, p) => c + (p.count*p.ticketPrice), 0)} &euro;</p>
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
                <Modal.Body id="modalbody">
                    {cartText}
                    {
                        props.chosenproducts.map(p => (
                                
                            <div  className="cartitem" key={p.eventId + p.ticketCategory}>
                                            
                                <div className="quantity">
                                    <p>Quantity</p>
                                    <span id="cartbuttons">
                                        <p><button onClick={() => props.subtractquantity(p)}>-</button></p>
                                        <p>{p.count}</p>
                                        <p><button  onClick={() => props.addquantity(p)}>+</button></p>
                                    </span>
                                </div>
                                <div className="title">
                                    <p>Title</p>
                                    <p>{p.eventTitle}</p>
                                </div>
                                <div className="category">
                                    <p>Category</p>
                                    <p>{p.ticketCategory}</p>
                                </div>
                                <div className="price">
                                    <p>Price</p>
                                    <p>{p.ticketPrice} &euro;</p>
                                </div>
                                <div className="remove">
                                <button onClick={() => props.removeproduct(p)}>Remove</button>
                                </div>
                                <hr/>
                            </div>
                        
                        ))
                    }
                    <div id="totalPrice">
                        {totalPriceText} 
                    </div>
                    




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => console.log(props.chosenproducts)}>Proceed to Payment</Button>
                    <Button variant="danger" onClick={props.emptyitems}>Empty Items</Button>
                </Modal.Footer>
            </Modal>
        </>
    )




}