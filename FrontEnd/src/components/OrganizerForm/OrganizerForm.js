import axios from "axios";
import React from "react";
import { Form, Col, Row, Card } from "react-bootstrap";
import "./OrganizerForm.css";



function OrganizerForm() {
    function registerOrganizer(e){
        e.preventDefault();
        let registerOrgCredentials = {
            FirstName: e.target[0].value,
            LastName: e.target[1].value,
            Email : e.target[2].value,
            Password : e.target[3].value,
            Confirmpassword: e.target[4].value
        }
        axios.post("https://localhost:44359/api/account/register",( registerOrgCredentials)
    
        ).then(res =>{
            return true;
        }).catch(err =>{
            console.log(err);
            return true;

        });
    }
    return (
        <div className="organizerBoxForm">
        <Card style={{ width: '500px', height: '500px' }} >
            <div className="organizerForm">
                <Card.Title className="organizertitle">Become A Partner</Card.Title>
                <Form onSubmit={registerOrganizer}>
                    <Row>
                        <Col>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingFirstNameOrg"
                                    type="text"
                                    placeholder="First name" />
                                <label htmlFor="floatingFirstNameOrg">First Name</label>
                            </Form.Floating>
                        </Col>
                        <Col>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingLastNameOrg"
                                    type="text"
                                    placeholder="Last name" />
                                <label htmlFor="floatingLastNameOrg">Last name</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="floatingInputOrg"
                            type="email"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInputOrg">Email address</label>
                    </Form.Floating>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="floatingPasswordOrg"
                            type="password"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPasswordOrg">Password</label>
                    </Form.Floating>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="confirmPasswordOrg"
                            type="password"
                            placeholder="confirmPassword"
                        />
                        <label htmlFor="confirmPasswordOrg">Confirm Password</label>
                    </Form.Floating>
                    <div  className="organizerButton">
                        <button className="organizerfilledButton">Register</button>
                    </div>
                </Form >
            </div>
        </Card>
        </div>
    )
}


export default OrganizerForm;