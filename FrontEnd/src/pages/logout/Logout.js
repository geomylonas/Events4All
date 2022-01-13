import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Logout.css";
import { useNavigate  } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";





function LogoutModal(props) {
    
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate('/');
    }



    return (

        <Modal  id="logoutmodalbody"
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

                    <Modal.Header closeButton>

                    </Modal.Header>
            <Form onSubmit={logout}>
                <Modal.Body id="loginmodal">

                    <h6>Are you sure you want to logout?</h6>


                </Modal.Body>
                <Modal.Footer>
                    <input type="submit" value="Confirm" className="loginbutton" />
                </Modal.Footer>
            </Form>
        </Modal>

    )
}


export default LogoutModal;