import { Nav, Row, Container, Col, Image, Button, Badge} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import classes from './NavigationBar.module.css';
import { useRef } from "react";


function NavigationBar() {


    
    return (
        <header>
            <div>
                <Nav.Item>
                    <Container>
                        <Row>

                            <Col xs={6} md={4}>
                                <LinkContainer to='/'>
                                    <Image src={require("../../images/logo-mpez.png")} roundedCircle className={classes.LogoImage} />
                                </LinkContainer>
                            </Col>

                        </Row>
                    </Container>
                </Nav.Item>
            </div>
            <div className={classes.navLinks}>
                <Nav.Item>
                    <LinkContainer to='/'>
                        <Nav.Link>About Us</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/events/mainpage'>
                        <Nav.Link>Events</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/contact'>
                        <Nav.Link>Contact us</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to='/createnewevent'>
                        <Nav.Link>Create Event</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </div>
            <div>
                <Nav.Item className={classes.navButtons}>
                    <button className={classes.outlineButton}>Log in</button>
                    <button className={classes.filledButton}>Register</button>
                    <div className="cart">
                        <LinkContainer to ='#'>
                            <Image src={require("../../images/cart2.png")} className={classes.CartImage} />
                        </LinkContainer>
                        <div className={classes.badge}>1</div>
                    </div>
                </Nav.Item>
                
            </div>   
           
          

        </header>


    )
}


export default NavigationBar;