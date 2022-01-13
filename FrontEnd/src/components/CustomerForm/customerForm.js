import React, {useState} from "react";
import { Form, Col, Row, Card, Button } from "react-bootstrap";
import classes from "./CustomerForm.module.css";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import  "./CustomerForm.module.css";
function CustomerForm() {

    const [startDate, setStartDate] = useState(null);

function RegisterCustomer(e){
    e.preventDefault();
        let registerCustCredentials = {
            FirstName: e.target[0].value,
            LastName: e.target[1].value,
            Email : e.target[2].value,
            Password : e.target[3].value,
            Confirmpassword: e.target[4].value,
            DateOfBirth: e.target[5].value
        }
        axios.post("https://localhost:44359/api/account/register/customer",( registerCustCredentials)
    
        ).then(res =>{
            console.log(res);
            return true;
        }).catch(err =>{
            console.log(err);
            return true;

        });
}

    return (
        <div className={classes.customerBoxForm}>
        <Card style={{ width: '500px', height: '500px' }} >
            <div className={classes.customerForm}>
                <Card.Title className={classes.title}>Become A Customer</Card.Title>
                <Form onSubmit={RegisterCustomer}>
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
                    <Form.Floating style={{ margin: "15px 0" }}>
                         <Form.Control
                            id="dateOfBirth"
                            type="date"
                            placeholder="Date Of Birth"
                        /> 
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                    </Form.Floating>
                    <div className={classes.customerButton}>
                        <button className={classes.filledButton}>Register</button>
                    </div>
                </Form >
            </div>
        </Card>
        </div>
    )
}


export default CustomerForm;