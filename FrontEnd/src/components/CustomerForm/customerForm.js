import React, {useState} from "react";
import { Form, Col, Row, Card, Button, Popover, OverlayTrigger, InputGroup } from "react-bootstrap";
import classes from "./CustomerForm.module.css";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import  "./CustomerForm.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye  } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";


function CustomerForm() {
    const navigate = useNavigate();
    const [fName, setFName] = useState(false);
    const [lName, setLName] = useState(false);
    const [letterMsg, setLetterMsg] = useState(null);
    const [numberMsg, setNumberMsg] = useState(null);
    const [symbolMsg, setSymbolMsg] = useState(null);
    

      


function RegisterCustomer(e){
    e.preventDefault();
    if(e.target[3].value == e.target[4].value){

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
            alert("You have been successfully registered!");
            navigate("/");
        }).catch(err =>{
            console.log(err);
            alert("Something went wrong! Try again");
        });
    }
    else{
        alert("Passwords must be identical");
    }
}


function checkFName(e){
    let check = /^[A-Za-z]+$/;
    if(!e.target.value.match(check) )setFName(true);   
    else setFName(false);   

    
}
function checkLName(e){
    let check = /^[A-Za-z]+$/;
    if(!e.target.value.match(check) )setLName(true);   
    else setLName(false);   

    
}
function checkPassword(e){
    
   
    
    let letterCheck = /[A-Za-z]/;
    let numCheck = /[0-9]/;
    let symbolCheck = /[$-/:-?{-~!"^_`\[\]]/;
    if(e.target.value.match(letterCheck)){
        setLetterMsg(null);
    }
    else{
        setLetterMsg("Your Password must contain at least 1 letter");
    }
    if(e.target.value.match(numCheck)){
        setNumberMsg(null);
    }
    else{
        setNumberMsg("Your Password must contain at least 1 number");
    }
    if(e.target.value.match(symbolCheck)){
        setSymbolMsg(null);
    }
    else{
        setSymbolMsg("Your Password must contain at least 1 symbol");
    }
    
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
  library.add(faEye );


    return (
        <div className={classes.customerBoxForm}>
        <Card style={{ width: '500px' }} >
            <div className={classes.customerForm}>
                <Card.Title className={classes.title}>Become A Customer</Card.Title>
                <Form onSubmit={RegisterCustomer}>
                    <Row>
                        <Col>
                        <OverlayTrigger trigger="focus" placement="left" overlay={popoverName}>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingFirstNameCustom"
                                    type="text"
                                    placeholder="First name"
                                    maxLength="20" 
                                    onChange={checkFName}/>
                                <label htmlFor="floatingFirstNameCustom">First Name</label>
                            </Form.Floating>
                            </OverlayTrigger>
                        </Col>
                        <Col>
                        <OverlayTrigger trigger="focus" placement="right" overlay={popoverName}>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingLastNameCustom"
                                    type="text"
                                    placeholder="Last name"
                                    maxLength="20" 
                                    onChange={checkLName}/>
                                <label htmlFor="floatingFirstNameCustom">Last name</label>
                            </Form.Floating>
                            </OverlayTrigger>                            
                        </Col>
                    </Row>
                    { (fName || lName) &&
                        <p>Name must contain only letters</p>
                    }
                    <OverlayTrigger trigger="focus" placement="left" overlay={popoverEmail}>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="name@example.com"
                            maxLength="256"
                           />
                        <label htmlFor="floatingInputCustom">Email address</label>
                    </Form.Floating>
                    </OverlayTrigger>
                    
                    <OverlayTrigger trigger="focus" placement="left" overlay={popoverPassword}>
                  
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="floatingPasswordCustom"
                            type="password"
                            placeholder="Password"
                            onChange={checkPassword}/> 
                        <label htmlFor="floatingPasswordCustom">Password</label>
                    </Form.Floating>
                    </OverlayTrigger>
                    <p>{letterMsg} {numberMsg} {symbolMsg}</p>
                    <OverlayTrigger trigger="focus" placement="left" overlay={popoverConfirmPassword}>
                    <Form.Floating style={{ margin: "15px 0" }}>
                        <Form.Control
                            id="confirmPasswordCustom"
                            type="password"
                            placeholder="confirmPassword"
                        />
                        <label htmlFor="confirmPasswordCustom">Confirm Password</label>
                    </Form.Floating>
                    </OverlayTrigger>
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