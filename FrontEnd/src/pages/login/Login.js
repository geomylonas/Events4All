import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import QueryString from "qs";





function LoginModal(props) {
    var QueryString = require('qs');
    


    function login(e) {
        e.preventDefault();
        axios({
        method: 'post',
        url: 'https://localhost:44359/token',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: QueryString.stringify({'grant_type':'password', 'username': e.target[0].value, 'password': e.target[1].value})
        }).then(response => {
            if (response.data.access_token){
                {localStorage.setItem("token", JSON.stringify(response.data.access_token));}
                console.log(JSON.stringify(response.data.access_token));
                axios.get("https://localhost:44359/api/account/details",{
                headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
            }
            ).then(res => {
                {localStorage.setItem("username", JSON.stringify(res.data.FirstName + " " + res.data.LastName));}
                {localStorage.setItem("userRole", JSON.stringify(res.data.UserRole));}
            }).then(res=>window.location.reload(true))
            }
            props.onHide();
            
        return response.data})
        .catch(error=>{
            console.log(error);
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