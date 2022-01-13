import React from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./contactUs.module.css";


function ContactUs() {
  return (
    
    <div className={classes.ContactUs}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>First Name</Form.Label>
          <Form.Control size="lg" type="text" />
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Last Name</Form.Label>
          <Form.Control size="lg" type="text" />
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" size="lg" placeholder="name@example.com" />
          
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control style={{maxHeight: "150px" }} as="textarea" rows={6} />
            
        </Form.Group>
      </Form>
      <div>
      <button className={classes.detailsButton}>Submit</button>
      </div>
    </div>


  )
 }



export default ContactUs;