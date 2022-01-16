import axios from "axios";
import React from "react";
import { Form, Col, Row, Card, Popover, OverlayTrigger } from "react-bootstrap";
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
    const popoverName = (
        
        <Popover id="popover-basic">
          <Popover.Header as="h3">Name</Popover.Header>
          <Popover.Body>
               Only Letters Allowed         
          </Popover.Body>
        </Popover>
      );
    
    const popoverPassword = (
            
        <Popover id="popover-basic">
          <Popover.Header as="h3">Password</Popover.Header>
          <Popover.Body>
                Password must contain at least 6 characters<br/>
                Must contain 1 number<br/>
                Must contain 1 Capital<br/>
                Must contain 1 Symbol          
          </Popover.Body>
        </Popover>
      );
      const popoverConfirmPassword = (
            
        <Popover id="popover-basic">
          <Popover.Header as="h3">Confirm Password</Popover.Header>
          <Popover.Body>
               The two Passwords must be identical  
          </Popover.Body>
        </Popover>
      );

    const popoverEmail = (
        
        <Popover id="popover-basic">
          <Popover.Header as="h3">Email</Popover.Header>
          <Popover.Body>
               Please Input a valid Email  
          </Popover.Body>
        </Popover>
      );
    
    



    return (
        <div className="organizerBoxForm">
        <Card style={{ width: '500px', height: '500px' }} >
            <div className="organizerForm">
                <Card.Title className="organizertitle">Become A Partner</Card.Title>
                <Form onSubmit={registerOrganizer}>
                    <Row>
                        <Col>
                        <OverlayTrigger trigger="focus" placement="left" overlay={popoverName}>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingFirstNameOrg"
                                    type="text"
                                    placeholder="First name" />
                                <label htmlFor="floatingFirstNameOrg">First Name</label>
                            </Form.Floating>
                            </OverlayTrigger>
                        </Col>
                        <Col>
                        <OverlayTrigger trigger="focus" placement="right" overlay={popoverName}>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingLastNameOrg"
                                    type="text"
                                    placeholder="Last name" />
                                <label htmlFor="floatingLastNameOrg">Last name</label>
                            </Form.Floating>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <OverlayTrigger trigger="focus" placement="right" overlay={popoverEmail}>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="floatingInputOrg"
                            type="email"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInputOrg">Email address</label>
                    </Form.Floating>
                    </OverlayTrigger>
                    <OverlayTrigger trigger="focus" placement="right" overlay={popoverPassword}>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="floatingPasswordOrg"
                            type="password"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPasswordOrg">Password</label>
                    </Form.Floating>
                    </OverlayTrigger>
                    <OverlayTrigger trigger="focus" placement="right" overlay={popoverConfirmPassword}>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="confirmPasswordOrg"
                            type="password"
                            placeholder="confirmPassword"
                        />
                        <label htmlFor="confirmPasswordOrg">Confirm Password</label>
                    </Form.Floating>
                    </OverlayTrigger>
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