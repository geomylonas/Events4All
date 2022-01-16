import React, { useEffect, useState } from "react";
import { Modal, Form, Popover, OverlayTrigger } from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";




function LoginModal(props) {
    var QueryString = require('qs');
    
    const [fail,setFail] = useState(false);
    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();
        setFail(false);
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
                axios.get("https://localhost:44359/api/account/details",{
                headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
            }
            ).then(res => {
                {localStorage.setItem("username", JSON.stringify(res.data.FirstName + " " + res.data.LastName));}
                {localStorage.setItem("userRole", JSON.stringify(res.data.UserRole));}
                {localStorage.setItem("cart", JSON.stringify([]));}
                
                
            }).then(res=>{
                navigate("/");
                window.location.reload(true);
            })
            }
            props.loginrefresh();
            })
            .catch(error=>{
                console.log(error);
                setFail(true);

            })
            
        
    }


    const popover = (
        
        <Popover id="popover-basic">
          <Popover.Header as="h3">Login Failed</Popover.Header>
          <Popover.Body>
                Invalid Email or Password. Please try again            
          </Popover.Body>
        </Popover>
        
      );



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
                            onFocus={()=>setFail(false)}/>
                        <label htmlFor="floatingLoginEmail" >Email</label>
                    </Form.Floating>

                    <Form.Floating>
                        <Form.Control
                            id="floatingLoginPassword"
                            type="password"
                            placeholder="Password"
                            onFocus={()=>setFail(false)} />
                        <label htmlFor="floatingLoginPassword">Password</label>
                    </Form.Floating>

                </Modal.Body>
                <Modal.Footer>
                <OverlayTrigger show={fail} trigger="click" placement="bottom" overlay={popover}>
                    <button type="submit" value="Login" className="loginbutton" >Log In</button>
                </OverlayTrigger>
                </Modal.Footer>
            </Form>
        </Modal>

    )
}


export default LoginModal;