import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Login.css";





function LoginModal(props) {
    
    const [email,setEmail]=useState(''); 
    const [password,setPassword]=useState(''); 

    function login(e) {
        e.preventDefault();
        console.log("ccc");
        setEmail(e.target[0].value);
        setPassword(e.target[1].value);
        const loginCredentials= {grant_type:"password", username: email, password: password}
        axios.post("https://localhost:44359/token",{
            loginCredentials
        }).then(response =>{
            console.log(response);
        })
    }



    return (

        <Modal  id="loginmodalbody"
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

                    <Modal.Header closeButton>

                    </Modal.Header>
            <Form onSubmit={login}>
                <Modal.Body id="loginmodal">

                    <Form.Floating>
                        <Form.Control
                            id="floatingLoginEmail"
                            type="email"
                            placeholder="Email" 
                            />
                        <label htmlFor="floatingLoginEmail" >Email</label>
                    </Form.Floating>

                    <Form.Floating>
                        <Form.Control
                            id="floatingLoginPassword"
                            type="password"
                            placeholder="Password" />
                        <label htmlFor="floatingLoginPassword">Password</label>
                    </Form.Floating>


                </Modal.Body>
                <Modal.Footer>
                    <input type="submit" value="Login" className="loginbutton" />
                </Modal.Footer>
            </Form>
        </Modal>

    )
}


export default LoginModal;