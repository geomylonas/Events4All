import React from "react";
import { Nav, Row, Container, Col, Image, Button, Badge } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import classes from './NavigationBar.module.css';
import Cart from "../Cart/Cart";


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
         cartModal: false
        };
      }

      openCartModal = () =>{
          this.setState({cartModal: true});
      }

      onCloseCartModal  = () =>{
          this.setState({cartModal: false});
      }

    render() {
        const cartAttributes ={
            chosenproducts: this.props.chosenproducts,
            emptyitems: this.props.emptycart,
            addquantity: this.props.addquantity,
            subtractquantity: this.props.subtractquantity
        }

        let badge;
        if(this.props.chosenproducts.length > 0)
        {
            badge = <div className={classes.badge}>{this.props.chosenproducts.length}</div>
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
                            <img src={require("../../images/cart2.png")} className={classes.CartImage} onClick={this.openCartModal}/>
                            {badge}
                            
                        </div>
                    </Nav.Item>
                    <Cart show={this.state.cartModal} onHide={this.onCloseCartModal} {...cartAttributes}/>
                </div>

                

            </header>


        )
    }
}


export default NavigationBar;