import React from "react";
import { Form, Col, Row, Card, Button } from "react-bootstrap";
import classes from "./CustomerForm.module.css";



function CustomerForm() {
    return (
        <div className={classes.customerBoxForm}>
        <Card style={{ width: '500px', height: '500px' }} >
            <div className={classes.customerForm}>
                <Card.Title className={classes.title}>Sign Up</Card.Title>
                <Form>
                    <Row>
                        <Col>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingFirstNameCustom"
                                    type="text"
                                    placeholder="First name" />
                                <label htmlFor="floatingFirstNameCustom">First Name</label>
                            </Form.Floating>
                        </Col>
                        <Col>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingLastNameCustom"
                                    type="text"
                                    placeholder="Last name" />
                                <label htmlFor="floatingFirstNameCustom">Last name</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInputCustom">Email address</label>
                    </Form.Floating>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="floatingPasswordCustom"
                            type="password"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPasswordCustom">Password</label>
                    </Form.Floating>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="confirmPasswordCustom"
                            type="password"
                            placeholder="confirmPassword"
                        />
                        <label htmlFor="confirmPasswordCustom">Confirm Password</label>
                    </Form.Floating>
                    <div  className={classes.customerButton}>
                        <button className={classes.filledButton}>Register</button>
                    </div>
                </Form >
            </div>
        </Card>
        </div>
    )
}


export default CustomerForm;