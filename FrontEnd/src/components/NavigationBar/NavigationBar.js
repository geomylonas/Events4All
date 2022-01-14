import React from "react";
import { Nav, Row, Container, Col, Image, Button, Badge } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import classes from './NavigationBar.module.css';
import Cart from "../Cart/Cart";
import LoginModal from "../../pages/login/Login";
import LogoutModal from "../../pages/logout/Logout";


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartModal: false,
            loginModal: false,
            logoutModal: false
        };
    }

    loginrefresh = () =>{
        this.setState({ loginModal: false});
    }

    openLogoutModal = () => {
        this.setState({ logoutModal: true })
    }

    openLoginModal = () => {
        this.setState({ loginModal: true });
    }

    openCartModal = () => {
        this.setState({ cartModal: true });
    }

    onCloseCartModal = () => {
        this.setState({ cartModal: false, loginModal: false, logoutModal: false });
    }

    render() {
        const cartAttributes = {
            chosenproducts: this.props.chosenproducts,
            emptyitems: this.props.emptycart,
            addquantity: this.props.addquantity,
            subtractquantity: this.props.subtractquantity,
            removeproduct: this.props.removeproduct,
            proceedtopayment: this.props.proceedtopayment
        }


        let CreateEventLink;
        if (localStorage.getItem("userRole") == JSON.stringify("Organizer")){
            CreateEventLink =
            <Nav.Item>
                <LinkContainer to='/myeventsorganizer'>
                    <Nav.Link>My Events</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        }
           
        else if (localStorage.getItem("userRole") == JSON.stringify("Customer")) {
            CreateEventLink =
                <Nav.Item>
                    <LinkContainer to='/mytickets'>
                        <Nav.Link>My Events</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
        }
        else {
            CreateEventLink =
                <Nav.Item>
                    <LinkContainer to='/register'>
                        <Nav.Link>My Events</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
        }

        let badge;
        if ( localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")).length > 0) {
            badge = <div className={classes.badge}>{JSON.parse(localStorage.getItem("cart")).length}</div>
        }

        let logButtons;
        if((localStorage.getItem("userRole") != JSON.stringify("Organizer")) && (localStorage.getItem("userRole") != JSON.stringify("Customer"))) {
            logButtons=
            <div className="cart">
            <LinkContainer to='/register'>
                <img src={require("../../images/cart2.png")} className={classes.CartImage} />
            </LinkContainer>
        </div>
        }
        else if((localStorage.getItem("userRole") == JSON.stringify("Organizer")) || (localStorage.getItem("userRole") == JSON.stringify("Customer"))) {
            logButtons=
        <div className="cart">
            <img src={require("../../images/cart2.png")} className={classes.CartImage} onClick={this.openCartModal} />
            { badge}

        </div>
    }
        

        let registerbuttons;
        if(!localStorage.getItem("token")) {
            registerbuttons=
        <LinkContainer to='/register'>
            <button className={classes.filledButton}>Register</button>
        </LinkContainer>
        }

    
        let logInOut;
      if(!localStorage.getItem("token"))   {
        logInOut=
        <button className={classes.outlineButton} onClick={this.openLoginModal} >Log in</button>
    }
    
       if(localStorage.getItem("token"))  {
        logInOut=
        <button className={classes.outlineButton} onClick={this.openLogoutModal}>Log out</button>
    }

    let welcomeMessage;
    if(localStorage.getItem('token')){
        welcomeMessage = <span id={classes.welcomeMessage}>Welcome {JSON.parse(localStorage.getItem("username"))}</span>
    }



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

                    {CreateEventLink}

                </div>
                <div>
                    <Nav.Item className={classes.navButtons}>
                       
                        {welcomeMessage}

                        {logInOut}

                       {registerbuttons}

                       {logButtons}
                        

                    </Nav.Item>
                    <Cart show={this.state.cartModal} onHide={this.onCloseCartModal} {...cartAttributes} />
                </div>
                <LoginModal show={this.state.loginModal} loginrefresh={this.loginrefresh} onHide={this.onCloseCartModal} />
                <LogoutModal show={this.state.logoutModal} onHide={this.onCloseCartModal} />

            </header>


        )
    }
}


export default NavigationBar;